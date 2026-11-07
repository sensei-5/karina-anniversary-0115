"""Generate derived images only. Originals are never written.
White-background removal: edge-connected flood fill, subpixel edge alpha,
then white-matte decontamination. VALORANT uses a conservative framed crop.
"""
from pathlib import Path
from collections import deque
from PIL import Image, ImageFilter, ImageDraw
import numpy as np

ROOT = Path(__file__).resolve().parents[1]
ASSETS = ROOT / 'assets'
OUT = ASSETS / 'cutout'
OUT.mkdir(exist_ok=True)

def remove_white(source, name, threshold):
    image = Image.open(ASSETS / source).convert('RGB')
    rgb = np.asarray(image).astype(np.float32)
    low, high = rgb.min(2), rgb.max(2)
    candidate = (low > threshold) & ((high-low) < 36)
    height, width = candidate.shape
    background = np.zeros(candidate.shape, dtype=bool)
    queue = deque()
    for x in range(width):
        for y in (0, height-1):
            if candidate[y,x]: background[y,x] = True; queue.append((y,x))
    for y in range(height):
        for x in (0, width-1):
            if candidate[y,x] and not background[y,x]: background[y,x] = True; queue.append((y,x))
    while queue:
        y,x = queue.popleft()
        for yy,xx in ((y-1,x),(y+1,x),(y,x-1),(y,x+1)):
            if 0 <= yy < height and 0 <= xx < width and candidate[yy,xx] and not background[yy,xx]:
                background[yy,xx] = True; queue.append((yy,xx))
    hard = Image.fromarray((~background).astype('uint8')*255)
    # Smooth just the silhouette, preserving opaque white fabric inside it.
    alpha = np.asarray(hard.filter(ImageFilter.GaussianBlur(.55))).astype(np.float32)/255
    edge = np.asarray(hard.filter(ImageFilter.MinFilter(3))) < 255
    # Estimate coverage from the darkest channel at the narrow white-matte edge.
    coverage = np.clip((255-low)/70,0,1)
    alpha = np.where(edge, np.minimum(alpha,coverage),alpha)
    alpha[background] = 0
    safe = np.maximum(alpha[...,None],.025)
    clean = np.clip((rgb-255*(1-safe))/safe,0,255)
    rgba = np.dstack([clean, alpha*255]).astype('uint8')
    if name == 'apex-nessie.png':
        # Clip the photographed floor shadows; keep the light fabric itself.
        floor = Image.new('L', (width*3,height*3))
        pen = ImageDraw.Draw(floor)
        contours = [
          [(0,0),(535,0),(535,651),(527,660),(514,666),(495,663),(473,655),(450,641),(426,625),(408,619),(390,623),(363,622),(340,620),(314,620),(288,621),(271,639),(254,655),(237,667),(219,670),(200,670),(182,663),(165,647),(147,626),(131,604),(116,581),(106,559),(97,533),(0,533)],
          [(535,0),(1016,0),(1016,584),(991,594),(974,605),(957,612),(930,616),(907,615),(887,615),(875,628),(878,651),(865,667),(847,677),(827,676),(808,668),(788,654),(768,641),(742,641),(714,636),(683,631),(654,624),(629,613),(605,602),(583,610),(561,612),(548,607),(535,598)]
        ]
        for points in contours: pen.polygon([(x*3,y*3) for x,y in points],fill=255)
        mask=np.asarray(floor.resize((width,height),Image.Resampling.LANCZOS))
        rgba[:,:,3]=np.minimum(rgba[:,:,3],mask)
    result = Image.fromarray(rgba)
    box=result.getbbox()
    result=result.crop((max(0,box[0]-3), max(0,box[1]-3), min(width,box[2]+3),min(height,box[3]+3)))
    result.save(OUT/name)
    print(name,result.size)

remove_white('35678_S.webp','ruby-mousepad.png',214)
remove_white('tw-11134207-820ld-msx36k90232f4e.jpg','apex-nessie.png',245)
# Keep the complete group, logos and copyright. Trim only the extreme side edges.
image=Image.open(ASSETS/'瓦.jpg').convert('RGB')
image.crop((12,0,image.width-12,image.height)).save(OUT/'valorant-framed.png')

# Contact sheet to inspect edges on both requested grounds.
canvas=Image.new('RGB',(1200,860))
draw=ImageDraw.Draw(canvas)
for row,color in enumerate(('#0a0a0d','#ff86b8')):
    draw.rectangle((0,row*430,1200,(row+1)*430),fill=color)
    for col,name in enumerate(('ruby-mousepad.png','apex-nessie.png','valorant-framed.png')):
        im=Image.open(OUT/name).convert('RGBA');im.thumbnail((370,360))
        canvas.paste(im,(col*400+(400-im.width)//2,row*430+40+(360-im.height)//2),im)
        draw.text((col*400+15,row*430+12),name,fill='#ffffff' if row==0 else '#0a0a0d')
canvas.save(ROOT/'qa/update1/cutout-backgrounds.png')



