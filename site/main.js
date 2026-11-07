const config = window.KARINA_CONFIG;
const escapeHTML = value => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
const nav = document.querySelector('#chapters');
const rounds = document.querySelector('#rounds');
const socialLinks = () => `<div class="socials">${config.socials.map(s => `<a href="${escapeHTML(s.url)}" target="_blank" rel="noopener">${escapeHTML(s.label)} ↗ &nbsp; ${escapeHTML(s.account)}</a>`).join('')}</div>`;

const eventDate = [config.event.year, `${config.event.month}/${config.event.day}`].filter(Boolean).join(' / ');
function heroContent() {
  return `<div class="hero-grid"><div><h1>${config.event.titleLines.map(line=>'<span>'+escapeHTML(line)+'</span>').join('')}<span class="anniversary">${escapeHTML(config.event.subtitle)}</span></h1>
    <p class="lead">${escapeHTML(config.event.tagline)}</p>
    <div class="event"><div><strong>活動日期</strong>${escapeHTML(eventDate)}</div><div><strong>開播時間</strong>${escapeHTML(config.event.time)}</div><div><strong>周年年數</strong>${escapeHTML(config.event.years)} 周年</div></div>
    <div class="actions"><a class="button primary" href="${escapeHTML(config.liveUrl)}" target="_blank" rel="noopener">看直播 <span>↗</span></a><a class="button secondary" href="ask.html" target="_blank" rel="noopener">投問題 <span>↗</span></a></div></div>
    <div class="hero-art skin-art draft-art"><div class="art-bar"><span>KARINA’S CAT</span><span>1ST ANNIVERSARY</span></div>
      <div class="draft-photo"><img class="hero-skin" src="${escapeHTML(config.images.hero)}" alt="${escapeHTML(config.images.heroAlt)}" fetchpriority="high">${config.images.heroDraft ? `<span class="draft-label">${escapeHTML(config.images.heroDraftLabel)}</span>` : ''}</div>

      <div class="art-caption"><span>SWEET × SPICY</span><svg class="cat-sticker" aria-hidden="true"><use href="#cat"/></svg></div><div class="art-bottom"><span>陪你打到下一回合。</span><span>MEOW!</span></div></div></div>`;
}
function profileContent(section) {
  return `<div class="profile-layout"><div class="player-card"><div class="player-intro"><img src="${escapeHTML(config.images.profile)}" alt="卡琳娜紅色機能服全身新皮立繪"><dl>${section.fields.map(f=>`<div><dt>${escapeHTML(f.label)}</dt><dd>${escapeHTML(f.value)}</dd></div>`).join('')}</dl></div>
    <details class="speaking-notes"><summary>開場講稿與聊天起點</summary><p>${escapeHTML(section.opening)}</p><ul>${section.prompts.map(p=>`<li>${escapeHTML(p)}</li>`).join('')}</ul></details></div>
    <figure class="character-sheet"><figcaption>人物設定圖</figcaption><img src="${escapeHTML(config.images.characterSheet)}" alt="人物設定圖佔位：卡琳娜新皮全身立繪"><p>${escapeHTML(config.images.characterSheetStatus)}</p></figure></div>`;
}
function historyContent(section) {
  return `<div class="history-grid">${section.memories.map(m=>`<article class="memory-card"><div class="memory-media">${m.video ? `<video controls playsinline preload="none" src="${escapeHTML(m.video)}" aria-label="${escapeHTML(m.title)}影片"></video>` : m.image ? `<img src="${escapeHTML(m.image)}" alt="${escapeHTML(m.title)}">` : '<span>圖片／短片待補</span><svg aria-hidden="true"><use href="#paw"/></svg>'}</div>
    <h3>${escapeHTML(m.title)}</h3><p>${escapeHTML(m.copy || '回顧文案待補')}</p>${m.audioSrc ? `<audio controls preload="none" src="${escapeHTML(m.audioSrc)}" aria-label="${escapeHTML(m.title)}語音"></audio>` : '<p class="audio-placeholder">語音待補</p>'}</article>`).join('')}</div>`;
}
function questionsContent(section) {
  const board = config.board;
  return `<div class="board-heading"><div><h2>${escapeHTML(section.label)}<span>｜觀眾提問箱</span></h2><p class="board-count" id="board-count">共 0 則</p><p class="board-source" id="board-source" role="status">MOCK 示範資料 · 非真實投稿</p></div>
    <div class="board-entry"><a class="button primary" href="${escapeHTML(board.askUrl)}" target="_blank" rel="noopener">我要投問題 ↗</a><div class="qr-slot">${board.qrImage ? `<img src="${escapeHTML(board.qrImage)}" alt="掃描 QR code 前往提問表單">` : '<span aria-hidden="true">＋</span><span>QR code 待補</span>'}</div></div></div>
    <p class="board-help">點卡片放大閱讀 · Q 問題 / 爪印祝福</p><div class="board-cloud" id="board-cloud" aria-label="觀眾問題與祝福卡片牆"></div><p id="board-empty" hidden>還沒有投稿，歡迎留下第一句話。</p>`;
}
function stickersContent() {
  const total = config.stickers.length;
  const columns = total <= 14 ? 7 : 8;
  return `<p class="sticker-help">${total} 張已解鎖 · 點貼圖看大圖</p><div id="sticker-grid" class="sticker-grid" style="--sticker-cols:${columns};--sticker-rows:${Math.ceil(total / columns)}"></div>`;
}
function prizeContent(prize) {
  const quantity = prize.quantity + (prize.bonus && config.draw.bonusAchieved ? prize.bonus : 0);
  return `<article class="loot-card ${escapeHTML(prize.rarity)}${prize.framed ? ' framed' : ''}"><span class="loot-quantity" aria-label="數量 ${quantity}">×${quantity}</span><div class="loot-image"><img src="${escapeHTML(prize.image)}" alt="${escapeHTML(prize.name)}${prize.framed ? '商品參考圖' : '去背商品圖'}"></div><div class="loot-info"><p class="loot-tier">${escapeHTML(prize.tier)}</p><h4>${escapeHTML(prize.name)}</h4>${prize.bonus ? `<p class="bonus-note${config.draw.bonusAchieved ? ' achieved' : ''}">${escapeHTML(config.draw.bonusAchieved ? config.draw.achievedNote : config.draw.bonusNote)}</p>` : ''}</div></article>`;
}
function drawContent() {
  const entry = config.draw.participationPrize;
  return `<div class="loot-pools"><div class="subscriber-pool"><h3>${escapeHTML(config.draw.subscriberPool)}</h3><div class="subscriber-grid">${config.draw.subscriberPrizes.map(prizeContent).join('')}</div></div>
    <div class="participation-pool"><h3>${escapeHTML(config.draw.participationPool)}</h3><article class="loot-card participation"><span class="loot-quantity" aria-label="數量 ${entry.quantity}">×${entry.quantity}</span><div class="mycard-art" aria-hidden="true"><span>MyCard</span><strong>${escapeHTML(entry.points)}</strong><span>點</span></div><div class="loot-info"><p class="loot-tier">${escapeHTML(entry.tier)}</p><h4>${escapeHTML(entry.name)}</h4></div></article></div></div>
    <p class="draw-rules"><strong>抽獎規則</strong> ${escapeHTML(config.draw.rules)}</p>`;
}
config.sections.forEach((section, index) => {
  const n = String(index + 1).padStart(2, '0');
  nav.insertAdjacentHTML('beforeend', `<a href="#round-${index+1}" data-index="${index}"><span>${n}</span>${escapeHTML(section.label)}</a>`);
  let content;
  switch(section.label) {
    case 'READY UP': content = heroContent(); break;
    case 'PLAYER PROFILE': content = profileContent(section); break;
    case 'MATCH HISTORY': content = historyContent(section); break;
    case 'STICKER WALL': content = stickersContent(); break;
    case 'ASK & WISH': content = questionsContent(section); break;
    case 'LUCKY DRAW': content = drawContent(); break;
    default: content = `<div class="placeholder"><p>${escapeHTML(section.placeholder)}</p></div>${socialLinks()}<p class="social-status">社群網址：${escapeHTML(config.socialStatus)}</p>`;
  }
  if(index > 0 && section.label !== 'ASK & WISH') content = `<div class="section-content"><h2>${escapeHTML(section.title)}</h2><p class="lead">${escapeHTML(section.text)}</p>${content}</div>`;
  if(section.label === 'ASK & WISH') content = `<div class="section-content">${content}</div>`;
  rounds.insertAdjacentHTML('beforeend', `<section class="round ${section.label === 'LUCKY DRAW' ? 'draw-round' : section.label === 'ASK & WISH' ? 'board-round' : section.label === 'STICKER WALL' ? 'sticker-round' : ''}" id="round-${index+1}" aria-label="${escapeHTML(section.label)}"><div class="round-top"><span class="round-number"><i class="cross" aria-hidden="true"></i> ROUND ${n} / ${escapeHTML(section.label)}</span><span class="sample-note">STYLE PREVIEW</span></div>${content}<svg class="paw" aria-hidden="true"><use href="#paw"/></svg></section>`);
});
const sections = [...document.querySelectorAll('.round')];
let current = Math.max(0, sections.findIndex(s => '#'+s.id === location.hash));
let presenting = new URLSearchParams(location.search).get('present') === '1';
const modalOpen = () => !!document.querySelector('dialog[open]');
function select(index, scroll = false, edge = 'start') {
  const next = Math.max(0, Math.min(sections.length - 1, index));
  const changed = next !== current;
  current = next;
  sections.forEach((section,i) => {
    section.classList.toggle('active', i===current);
    if (presenting && i!==current) section.querySelectorAll('audio,video').forEach(media=>media.pause());
  });
  nav.querySelectorAll('a').forEach((link,i)=>link.setAttribute('aria-current', String(i===current)));
  document.querySelector('#position').textContent = `${String(current+1).padStart(2,'0')} / ${String(sections.length).padStart(2,'0')}`;
  if (presenting && changed) {
    [sections[current], ...sections[current].querySelectorAll('.board-cloud')].forEach(el=>el.scrollTop=edge==='end'?el.scrollHeight:0);
  }
  if (scroll && !presenting) sections[current].scrollIntoView({behavior:'instant'});
}
function measureFrame() {
  const height = document.querySelector('header').offsetHeight + nav.offsetHeight;
  document.documentElement.style.setProperty('--presentation-top', `${height}px`);
}
function setMode() {
  document.body.classList.toggle('present',presenting);
  document.querySelector('#present-toggle').setAttribute('aria-pressed',String(presenting));
  document.querySelector('.presentation-progress').hidden = !presenting;
  const url = new URL(location.href);
  if(presenting) url.searchParams.set('present','1'); else url.searchParams.delete('present');
  history.replaceState(null,'',url);
  measureFrame();
  select(current, !presenting);
  if(presenting) window.scrollTo(0,0);
}
document.querySelector('#present-toggle').addEventListener('click',()=>{presenting=!presenting;setMode()});
document.addEventListener('click',event=>{
  const link=event.target.closest('a[href^="#round-"]');
  if(!link)return;
  event.preventDefault();
  const index=sections.findIndex(s=>'#'+s.id===link.getAttribute('href'));
  if(index>=0){select(index,true);history.replaceState(null,'',location.pathname+location.search+link.getAttribute('href'));}
});
document.addEventListener('keydown',event=>{
  if(modalOpen() || !presenting || event.altKey || event.ctrlKey || event.metaKey || event.target.closest('input,textarea,select,[contenteditable=true]'))return;
  if(['ArrowRight','ArrowDown','PageDown'].includes(event.key)){event.preventDefault();select(current+1)}
  if(['ArrowLeft','ArrowUp','PageUp'].includes(event.key)){event.preventDefault();select(current-1)}
  const number = Number(event.key);
  if(/^[1-9]$/.test(event.key) && number<=sections.length){event.preventDefault();select(number-1)}
});
function scrollablePath(target) {
  const result=[];
  let element=target instanceof Element?target:null;
  while(element && element!==document.body) {
    if(element.scrollHeight>element.clientHeight+2 && /auto|scroll/.test(getComputedStyle(element).overflowY)) result.push(element);
    element=element.parentElement;
  }
  // Wheel over the header still respects any remaining active chapter content.
  if(!result.includes(sections[current]) && sections[current].scrollHeight>sections[current].clientHeight+2) result.push(sections[current]);
  return result;
}
const canScroll = (element, direction) => direction>0 ? element.scrollTop+element.clientHeight<element.scrollHeight-2 : element.scrollTop>2;
let wheelAt=0, wheelChangedAt=-1000, wheelLatched=false, wheelScrolled=false, wheelAmount=0, wheelDirection=0;
document.addEventListener('wheel',event=>{
  if(!presenting || modalOpen() || event.ctrlKey || event.altKey || Math.abs(event.deltaY)<Math.abs(event.deltaX))return;
  const delta=event.deltaY*(event.deltaMode===1?16:event.deltaMode===2?innerHeight:1);
  if(!delta)return;
  const now=performance.now(), direction=Math.sign(delta);
  // A gesture ends after 260ms of silence. Momentum cannot turn additional chapters.
  if(now-wheelAt>260){wheelLatched=false;wheelScrolled=false;wheelAmount=0;wheelDirection=direction}
  wheelAt=now;
  if(now-wheelChangedAt<700){wheelLatched=true;event.preventDefault();return}
  if(wheelLatched || wheelScrolled && !scrollablePath(event.target).some(el=>canScroll(el,direction))){event.preventDefault();return}
  if(scrollablePath(event.target).some(el=>canScroll(el,direction))){wheelScrolled=true;wheelAmount=0;return}
  event.preventDefault();
  if(wheelDirection!==direction){wheelAmount=0;wheelDirection=direction}
  wheelAmount+=delta;
  if(Math.abs(wheelAmount)>=60){wheelLatched=true;wheelChangedAt=now;select(current+direction,false,direction<0?'end':'start')}
},{passive:false});
let touch=null;
document.addEventListener('touchstart',event=>{
  if(!presenting || modalOpen() || event.touches.length!==1){touch=null;return}
  const point=event.touches[0];
  touch={x:point.clientX,y:point.clientY,index:current,scrollers:scrollablePath(event.target).map(el=>({el,top:el.scrollTop,max:el.scrollHeight-el.clientHeight}))};
},{passive:true});
document.addEventListener('touchend',event=>{
  const start=touch;touch=null;
  if(!start || !presenting || modalOpen() || current!==start.index || !event.changedTouches.length)return;
  const point=event.changedTouches[0], dy=start.y-point.clientY, dx=start.x-point.clientX;
  if(Math.abs(dy)<65 || Math.abs(dy)<Math.abs(dx)*1.2)return;
  const direction=Math.sign(dy);
  // A swipe that starts inside scrollable content is spent on reading that content.
  if(start.scrollers.some(s=>direction>0?s.top<s.max-2:s.top>2))return;
  select(current+direction,false,direction<0?'end':'start');
},{passive:true});
document.addEventListener('touchcancel',()=>touch=null,{passive:true});
const observer = new IntersectionObserver(entries=>{if(presenting)return;for(const e of entries)if(e.isIntersecting)select(sections.indexOf(e.target))},{threshold:.5});
sections.forEach(s=>observer.observe(s));
const frameObserver=new ResizeObserver(measureFrame);frameObserver.observe(nav);frameObserver.observe(document.querySelector('header'));
setMode();

