// Shared connection boundary. No SDK or requests are loaded with placeholder settings.
window.KarinaData = (() => {
  let clientPromise;
  function configured() {
    const cfg = window.KARINA_SUPABASE;
    return !!cfg && /^https:\/\//.test(cfg.url) && !!cfg.key && !cfg.key.includes('YOUR_');
  }
  async function client() {
    if (!configured()) return null;
    if (!clientPromise) clientPromise = import('https://esm.sh/@supabase/supabase-js@2').then(sdk => sdk.createClient(
      window.KARINA_SUPABASE.url, window.KARINA_SUPABASE.key,
      { auth: { flowType: 'pkce', detectSessionInUrl: true, persistSession: true } }
    ));
    return clientPromise;
  }
  async function readBoard() {
    const cfg = window.KARINA_CONFIG.board;
    if (cfg.source === 'mock' || !configured()) return { entries: cfg.mock, mock: true, note: 'MOCK 示範資料 · 非真實投稿' };
    try {
      const db = await client();
      const { data, error } = await db.from(cfg.view).select('id, display_name, kind, message, created_at').order('created_at', { ascending: true });
      if (error) throw error;
      return { entries: data || [], mock: false, note: '觀眾投稿' };
    } catch {
      return { entries: cfg.mock, mock: true, note: '暫時無法讀取投稿 · 以下為 MOCK 示範資料' };
    }
  }
  return { configured, client, readBoard };
})();
