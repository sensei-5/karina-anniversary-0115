(() => {
  const items=window.KARINA_CONFIG.stickers;
  const grid=document.querySelector('#sticker-grid');
  const dialog=document.querySelector('#sticker-zoom');
  const motion=matchMedia('(prefers-reduced-motion: reduce)');
  const $=id=>document.getElementById(id);
  const source=item=>motion.matches?item.still:item.file;
  let active=0,origin=null;
  items.forEach((item,index)=>{
    const button=document.createElement('button');
    button.type='button';button.className='sticker-item';button.dataset.id=item.id;
    button.style.setProperty('--sticker-tilt',`${[-2,1.5,-1,2,0,-1.5,1][index%7]}deg`);
    button.setAttribute('aria-haspopup','dialog');button.setAttribute('aria-label',`放大貼圖：${item.label}`);
    const number=document.createElement('span');number.className='sticker-number';number.textContent=`#${String(index+1).padStart(2,'0')}`;
    const image=document.createElement('img');image.src=source(item);image.alt=item.label;image.width=512;image.height=512;image.decoding='sync';image.addEventListener('load',()=>image.decode().catch(()=>{}));
    const label=document.createElement('span');label.className='sticker-label';label.textContent=item.label;
    button.append(number,image,label);grid.append(button);
    button.addEventListener('click',()=>{origin=button;show(index);dialog.showModal();document.body.classList.add('zoom-open');$('sticker-zoom-close').focus({preventScroll:true})});
  });
  function show(index){
    active=Math.max(0,Math.min(items.length-1,index));
    const item=items[active];if(!item)return;
    $('sticker-zoom-name').textContent=item.label;
    $('sticker-zoom-image').src=source(item);$('sticker-zoom-image').alt=item.label;
    $('sticker-zoom-position').textContent=`${String(active+1).padStart(2,'0')} / ${String(items.length).padStart(2,'0')}`;
    $('sticker-zoom-prev').disabled=active===0;$('sticker-zoom-next').disabled=active===items.length-1;
  }
  $('sticker-zoom-close').onclick=()=>dialog.close();
  $('sticker-zoom-prev').onclick=()=>show(active-1);
  $('sticker-zoom-next').onclick=()=>show(active+1);
  dialog.addEventListener('close',()=>{document.body.classList.remove('zoom-open');$('sticker-zoom-image').removeAttribute('src');origin?.focus({preventScroll:true})});
  dialog.addEventListener('click',event=>{if(event.target!==dialog)return;const box=dialog.getBoundingClientRect();if(event.clientX<box.left||event.clientX>box.right||event.clientY<box.top||event.clientY>box.bottom)dialog.close()});
  document.addEventListener('keydown',event=>{
    if(!dialog.open)return;
    if(['ArrowLeft','ArrowRight','Escape'].includes(event.key)||/^[1-7]$/.test(event.key)){
      event.preventDefault();event.stopImmediatePropagation();
      if(event.key==='ArrowLeft')show(active-1);
      if(event.key==='ArrowRight')show(active+1);
      if(event.key==='Escape')dialog.close();
    }
  },true);
  motion.addEventListener('change',()=>{grid.querySelectorAll('img').forEach((img,index)=>img.src=source(items[index]));if(dialog.open)show(active)});
})();

