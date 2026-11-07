"""UPDATE3 web derivatives. Read source assets; never overwrite originals."""
from pathlib import Path
from PIL import Image, ImageOps
import hashlib, json, shutil

ROOT=Path(__file__).resolve().parents[1]
ASSETS=ROOT/'assets'
OUT=ASSETS/'sticker-web'
OUT.mkdir(exist_ok=True)
records=[]
for index, source in enumerate(sorted((ASSETS/'sticker').iterdir(), key=lambda p:p.name),1):
    if source.suffix.lower() not in ('.png','.gif'): continue
    ident=f'sticker-{index:02}'
    with Image.open(source) as image:
        frames_count=getattr(image,'n_frames',1)
        original_size=image.size
        if source.suffix.lower()=='.gif':
            frames=[]; durations=[]
            for i in range(frames_count):
                image.seek(i)
                frame=image.convert('RGBA')
                frame.thumbnail((400,400),Image.Resampling.LANCZOS)
                # Reserve palette index 255 for transparent pixels, preventing black matte edges.
                palette=frame.convert('RGB').quantize(colors=255,method=Image.Quantize.MEDIANCUT)
                alpha=frame.getchannel('A')
                palette.paste(255,mask=alpha.point(lambda value:255 if value<128 else 0))
                palette.info['transparency']=255
                frames.append(palette)
                durations.append(image.info.get('duration',100))
                if i==0: frame.save(OUT/f'{ident}-still.png',optimize=True)
            target=OUT/f'{ident}.gif'
            frames[0].save(target,save_all=True,append_images=frames[1:],duration=durations,
                loop=image.info.get('loop',0),disposal=2,transparency=255,optimize=False)
            if source.stat().st_size <= 1_000_000:
                shutil.copyfile(source,target) # Already lightweight: preserve original encoding/animation.
            still=f'assets/sticker-web/{ident}-still.png'
        else:
            frame=image.convert('RGBA'); frame.thumbnail((512,512),Image.Resampling.LANCZOS)
            target=OUT/f'{ident}.png';frame.save(target,optimize=True)
            still=f'assets/sticker-web/{ident}.png'
    with Image.open(target) as result:
        record=dict(id=ident,source=source.name,source_sha256=hashlib.sha256(source.read_bytes()).hexdigest(),
                    source_bytes=source.stat().st_size,source_size=original_size,
                    file=f'assets/sticker-web/{target.name}',still=still,label=source.stem.replace('_',' '),
                    size=result.size,frames=getattr(result,'n_frames',1),bytes=target.stat().st_size)
        record['source_frames']=frames_count
        if frames_count>1 and record['frames']<2: raise RuntimeError('Animation lost')
        if source.suffix.lower()=='.gif':
            record['source_duration_ms']=sum(durations)
            record['duration_ms']=sum(result.seek(i) or result.info.get('duration',100) for i in range(result.n_frames))
            if record['duration_ms'] != record['source_duration_ms']: raise RuntimeError('Duration changed')
    records.append(record)
photo=ASSETS/'profilepicture.jpeg'
with Image.open(photo) as image:
    image=ImageOps.exif_transpose(image).convert('RGB');image.thumbnail((1200,1200),Image.Resampling.LANCZOS)
    image.save(ASSETS/'web/profilepicture.jpg',quality=88,optimize=True,progressive=True)
manifest={'profile':{'source_sha256':hashlib.sha256(photo.read_bytes()).hexdigest(), 'size':image.size,'bytes':(ASSETS/'web/profilepicture.jpg').stat().st_size},'stickers':records}
(ROOT/'qa/update3/assets.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2),encoding='utf-8')
print(json.dumps({'png_count':sum(r['file'].endswith('.png') for r in records),'gif_count':sum(r['file'].endswith('.gif') for r in records),'web_bytes':sum(r['bytes'] for r in records),'profile':manifest['profile']},ensure_ascii=True))

