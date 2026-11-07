(() => {
  const cloud = document.querySelector('#board-cloud');
  const dialog = document.querySelector('#card-zoom');
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  let entries = [], active = -1, origin = null;
  let isMock = true;
  const q = id => document.getElementById(id);
  const typeText = entry => entry.kind === 'blessing' ? '祝福' : '問題';
  function badge(entry) {
    const el = document.createElement('span');
    el.className = 'card-type';
    if (entry.kind === 'blessing') {
      el.innerHTML = '<svg aria-hidden="true"><use href="#paw"/></svg><span>祝福</span>';
    } else el.textContent = 'Q 問題';
    return el;
  }
  function card(entry, index, fresh = false) {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = `wall-card ${entry.kind === 'blessing' ? 'blessing' : 'question'}${fresh ? ' is-new' : ''}`;
    button.dataset.id = String(entry.id);
    button.setAttribute('aria-label', `${typeText(entry)}，${entry.display_name}：${entry.message}`);
    button.setAttribute('aria-haspopup', 'dialog');
    const length = [...entry.message].length;
    button.dataset.length = length <= 10 ? 'short' : length > 60 ? 'long' : 'medium';
    button.style.setProperty('--tilt', `${[-2, 1.4, -1, 2, -.7, 1][index % 6]}deg`);
    button.style.setProperty('--lift', `${[-2, 4, -1, 3, 0][index % 5]}px`);
    button.style.setProperty('--delay', `${-(index % 7) * .8}s`);
    const head = document.createElement('span'); head.className = 'wall-card-head';
    const avatar = document.createElement('span'); avatar.className = 'wall-avatar'; avatar.ariaHidden = 'true'; avatar.textContent = [...entry.display_name][0] || '喵';
    const name = document.createElement('span'); name.className = 'wall-name'; name.textContent = entry.display_name;
    head.append(avatar, name, badge(entry));
    const text = document.createElement('span'); text.className = 'wall-text'; text.textContent = entry.message;
    button.append(head, text);
    button.addEventListener('click', () => open(entries.findIndex(e => String(e.id) === String(entry.id)), button));
    return button;
  }
  function fit() {
    if (!cloud.getClientRects().length) return;
    const desktopPresent = document.body.classList.contains('present') && innerWidth > 700;
    let size = innerWidth > 700 ? Math.max(15, Math.min(21, innerWidth / 90)) : 18;
    cloud.style.setProperty('--board-fs', `${size}px`);
    if (desktopPresent) {
      while (cloud.scrollHeight > cloud.clientHeight + 2 && size > 13) {
        size -= .5;
        cloud.style.setProperty('--board-fs', `${size}px`);
      }
    }
  }
  function update() {
    q('board-count').textContent = `共 ${entries.length} 則`;
    q('board-empty').hidden = entries.length > 0;
    fit();
  }
  function render(list, mock) {
    entries = list.filter(e => e && typeof e.message === 'string').map(e => ({...e, display_name: String(e.display_name || '觀眾'), kind: e.kind === 'blessing' ? 'blessing' : 'question'}));
    isMock = mock;
    cloud.replaceChildren(...entries.map((entry,index) => card(entry,index)));
    update();
  }
  function show(index) {
    active = Math.max(0, Math.min(entries.length - 1, index));
    const entry = entries[active];
    if (!entry) { dialog.close(); return; }
    dialog.classList.toggle('blessing', entry.kind === 'blessing');
    q('zoom-type').replaceChildren(...badge(entry).childNodes);
    q('zoom-name').textContent = entry.display_name;
    q('zoom-avatar').textContent = [...entry.display_name][0] || '喵';
    q('zoom-text').textContent = entry.message;
    q('zoom-text').classList.toggle('long', [...entry.message].length > 60);
    q('zoom-position').textContent = `${active+1} / ${entries.length}${isMock ? ' · MOCK' : ''}`;
    q('zoom-prev').disabled = active === 0;
    q('zoom-next').disabled = active === entries.length - 1;
    dialog.scrollTop = 0;
  }
  function open(index, button) {
    if (index < 0) return;
    origin = button;
    show(index);
    dialog.showModal();
    document.body.classList.add('zoom-open');
    q('zoom-close').focus({preventScroll:true});
    if (!motion.matches) dialog.animate([{opacity:0,transform:'translateY(12px) scale(.97)'},{opacity:1,transform:'none'}],{duration:200,easing:'ease-out'});
  }
  q('zoom-close').onclick = () => dialog.close();
  q('zoom-prev').onclick = () => show(active-1);
  q('zoom-next').onclick = () => show(active+1);
  dialog.addEventListener('close', () => { document.body.classList.remove('zoom-open'); origin?.focus({preventScroll:true}); });
  dialog.addEventListener('click', event => {
    if (event.target !== dialog) return;
    const box = dialog.getBoundingClientRect();
    if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) dialog.close();
  });
  document.addEventListener('keydown', event => {
    if (!dialog.open) return;
    // Capture phase prevents chapter shortcuts from observing modal keys.
    if (['ArrowLeft','ArrowRight','Escape'].includes(event.key) || /^[1-7]$/.test(event.key)) {
      event.preventDefault(); event.stopImmediatePropagation();
      if (event.key === 'ArrowLeft') show(active-1);
      if (event.key === 'ArrowRight') show(active+1);
      if (event.key === 'Escape') dialog.close();
    }
  }, true);
  const observer = new ResizeObserver(() => requestAnimationFrame(fit));
  observer.observe(cloud);
  new MutationObserver(() => requestAnimationFrame(fit)).observe(document.body,{attributes:true,attributeFilter:['class']});
  new MutationObserver(() => requestAnimationFrame(fit)).observe(document.querySelector('.board-round'),{attributes:true,attributeFilter:['class']});
  document.fonts.ready.then(fit);
  // Future realtime hook: insert/update one record without restarting existing cards.
  window.KarinaBoard = {
    upsert(entry) {
      if (!entry || entry.id == null || typeof entry.message !== 'string') return;
      const normalized = {...entry, display_name:String(entry.display_name || '觀眾'),kind:entry.kind === 'blessing'?'blessing':'question'};
      const index = entries.findIndex(e => String(e.id) === String(entry.id));
      if (index >= 0) { entries[index] = normalized; cloud.children[index].replaceWith(card(normalized,index)); }
      else { entries.push(normalized); cloud.append(card(normalized,entries.length-1,true)); }
      update(); if (dialog.open) show(active);
    }
  };
  render(window.KARINA_CONFIG.board.mock, true);
  window.KarinaData.readBoard().then(result => {
    render(result.entries, result.mock);
    q('board-source').textContent = result.note;
  });
})();
