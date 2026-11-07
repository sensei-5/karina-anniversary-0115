(() => {
  const cfg = window.KARINA_CONFIG;
  const $ = id => document.getElementById(id);
  const form = $('question-form'), input = $('question'), submit = $('submit-question');
  const fields = $('question-fields'), status = $('connection');
  let user = null, saved = false, saving = false, db;
  $('ask-title').innerHTML = '<span class="ask-brand"></span><span class="ask-sub"></span>';
  $('ask-title').firstChild.textContent = cfg.ask.brand;
  $('ask-title').lastChild.textContent = cfg.ask.title;
  $('ask-intro').textContent = cfg.ask.intro;
  $('privacy-note').textContent = cfg.ask.privacy;
  function error(message) { $('ask-error').textContent = message; $('ask-error').hidden = !message; }
  function update() {
    const n = [...input.value.trim()].length;
    const kind = form.elements.kind.value;
    $('count').textContent = `${n} / ${cfg.maxMessage}`;
    $('count').classList.toggle('over', n > cfg.maxMessage);
    submit.disabled = !user || saving || n === 0 || n > cfg.maxMessage;
    submit.textContent = saving ? '儲存中…' : saved ? '更新我的投稿' : kind === 'blessing' ? '送出祝福' : '送出問題';
    document.querySelector('.message-label').textContent = kind === 'blessing' ? '周年祝福' : '想問的問題';
    input.placeholder = kind === 'blessing' ? '留一句周年祝福給卡琳娜。' : '例如：貓咪會不會跑到鍵盤上？';
  }
  input.addEventListener('input', () => { error(''); update(); });
  form.addEventListener('change', update);
  async function login(provider) {
    const buttons = document.querySelectorAll('.login-buttons button');
    buttons.forEach(button => button.disabled = true);
    try {
      const { error: failure } = await db.auth.signInWithOAuth({ provider, options: { redirectTo: location.origin + location.pathname } });
      if (failure) throw failure;
    } catch { error('登入失敗，請稍後再試。'); buttons.forEach(button => button.disabled = false); }
  }
  $('login-twitch').onclick = () => login('twitch');
  $('login-google').onclick = () => login('google');
  $('logout').onclick = async () => {
    const { error: failure } = await db.auth.signOut();
    if (failure) { error('登出失敗，請稍後再試。'); return; }
    location.reload();
  };
  form.addEventListener('submit', async event => {
    event.preventDefault();
    if (!user || saving || submit.disabled) return;
    const payload = { message: input.value.trim(), kind: form.elements.kind.value };
    saving = true; error(''); update();
    try {
      const query = saved ? db.from('karina_questions').update(payload).eq('user_id', user.id) : db.from('karina_questions').insert(payload);
      const { error: failure } = await query;
      if (failure) {
        if (failure.code === '23505') { saved = true; error('此帳號已有投稿；請確認內容後按「更新我的投稿」。'); }
        else throw failure;
      } else { saved = true; status.textContent = '已儲存，謝謝你！之後可以再回來修改。'; }
    } catch { error('儲存失敗，內容仍保留在輸入框，請稍後再試。'); }
    finally { saving = false; update(); }
  });
  async function init() {
    update();
    if (!window.KarinaData.configured()) return;
    status.textContent = '連線中…';
    try {
      db = await window.KarinaData.client();
      const { data, error: failure } = await db.auth.getSession();
      if (failure) throw failure;
      user = data.session?.user || null;
      if (new URLSearchParams(location.search).has('code')) history.replaceState(null, '', location.pathname);
      if (!user) {
        status.textContent = '登入後，留下問題或周年祝福。';
        document.querySelectorAll('.login-buttons button').forEach(button => button.disabled = false);
        return;
      }
      const { data: existing, error: loadFailure } = await db.from('karina_questions').select('message,kind').eq('user_id', user.id).maybeSingle();
      if (loadFailure) throw loadFailure;
      input.value = existing?.message || ''; saved = !!existing;
      form.elements.kind.value = existing?.kind === 'blessing' ? 'blessing' : 'question';
      const meta = user.user_metadata || {};
      $('ask-name').textContent = meta.nickname || meta.full_name || meta.name || meta.preferred_username || '觀眾';
      $('ask-user').hidden = false;
      document.querySelector('.login-buttons').hidden = true;
      $('login-explanation').hidden = true;
      fields.disabled = false;
      status.textContent = saved ? '已載入你的投稿，可以修改。' : '已登入 · 準備好就送出吧。';
      update();
    } catch {
      user = null; fields.disabled = true; update();
      status.textContent = '尚未連線 · 暫時無法使用提問箱';
      error('連線或資料讀取失敗，請稍後重新整理。');
      document.querySelectorAll('.login-buttons button').forEach(button => button.disabled = true);
    }
  }
  init();
})();
