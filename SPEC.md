# 卡琳娜有一隻貓｜周年初配信活動頁（SPEC，驗收依據）

專案路徑：E:\Vtuber_Platform\karina__0115（網站放在 `site/`）
純靜態 HTML/CSS/JS，不用框架；提問箱用 Supabase（比照下方參考）。

## 素材位置（原檔只讀，不要移動或修改；需要時複製進 site/assets/）
- 設計稿：E:\Videos\YT-shorts-auto\素材範例\設計稿.html
- 說明：E:\Videos\YT-shorts-auto\素材範例\說明.md
- WebM（3 秒直式上下裝飾，僅供看風格，不必使用）：
  - C:\Users\m1997\Desktop\16比9\top.webm（1080x600）、bottom.webm（1080x712）
  - C:\Users\m1997\Desktop\直向大畫面\top.webm（1080x300）、bottom.webm（1080x220）
  - 可用 ffmpeg 抽幾張畫面來看；另有 E:\Videos\YT-shorts-auto\素材範例\16比9 與 直向大畫面 的 top.png / bottom.png
- 提問箱參考：E:\Vtuber_Platform\4lianyun\site（wish.html / wish.js / wish.css / supabase-config.js / SPEC.md）與 supabase\001_wishes.sql
  - 登入（Google/Twitch OAuth，pkce）後才能送出；每人一筆可修改。請自建新資料表（例如 karina_questions）的 SQL 檔放 `supabase/`，
    不要直接共用或改動 4lianyun 的 wishes 資料表。supabase-config 先放可替換欄位（URL/key 用 placeholder，不要複製 4lianyun 的 key）。
    未設定 Supabase 時，頁面要能顯示「尚未連線」狀態且不報錯，方便預覽。

## 本階段目標：先定「整體風格」，內容細節先不管
做出一頁式的風格樣板，讓我審查視覺。章節先用簡單卡片佔位，風格確定後再設計內容呈現。

## 風格
- 底色黑 #0a0a0d、玫瑰粉 #ff86b8、淺粉 #ffb3d4；主要按鈕用亮桃紅 #ff3d9a。
- 延續設計稿：粉色網點、斜向細紋、霓虹邊線、貓咪、爪印、白色粗斜字配粉色錯位陰影（見設計稿 .title 的 text-shadow）。
- FPS 元素：小準星、回合編號（ROUND 01…）、戰績卡、觀戰框；貓咪與主播名字仍是主角，FPS 元素只做點綴。
- 字型：Noto Sans TC（粗斜字標題 + 好讀正文）。繁體中文。
- 貓咪、爪印等用 inline SVG / CSS 自繪即可，不依賴外部圖。

## 版面與裝置
- 手機優先（375px 不跑版、不橫向捲動）；桌機 16:9（1920x1080）供直播展示，文字要大到直播畫面可讀。
- 直播展示模式：章節可切換（按鈕、左右方向鍵、數字鍵 1–5），一次只顯示一章，全螢幕感；
  手機 / 一般瀏覽可正常往下捲。提供「展示模式」開關（網址 `?present=1` 也可進入）。
- 切章不閃爍、支援 prefers-reduced-motion。

## 章節（章節標籤用英文，內文繁中）
1. READY UP｜周年開場：主標「卡琳娜有一隻貓｜周年初配信」，副標「這一回合，換你們認識新的我。」
   活動日期與時間、[看直播]、[投問題] 按鈕。
2. PLAYER PROFILE｜玩家檔案：玩家卡，欄位：主播稱呼、常玩的 FPS、遊戲定位或打法、開台風格、貓咪小檔案、「除了打遊戲，我還喜歡」。
   三個講稿起點：我為什麼開台／FPS 最讓我上癮的是什麼／聊天室最常看到我哪一面。
   開場口白預設：「嗨，我是卡琳娜。平常你們可能比較常看到我在打槍，今天想趁周年，跟你們聊聊我怎麼開始開台、為什麼那麼喜歡 FPS，還有這段時間我最想記下來的幾個瞬間。當然，貓也有牠自己的出場時間。」
3. MATCH HISTORY｜周年戰績回顧：三張可替換回顧卡：「第一次開台」、「我最想重播的一局」、「一個我到現在還記得的聊天室瞬間」；
   每張留一句話、圖片或短片位置（placeholder）。
4. ASK KARINA｜觀眾提問箱：表單，需登入，可填問題或周年祝福（字數上限可設定）。
5. NEXT ROUND｜下一回合：周年感謝、接下來的直播內容與新規劃（目前確定：YT shorts；其餘顯示「敬請期待」）、社群入口。

## 資料集中管理
所有可變資訊放單一檔 `site/config.js`：活動日期/時間、周年年數、直播網址、社群網址、各章節文案、圖片/影片路徑。
未確認的欄位用明顯的可替換 placeholder（例如「待確認」）。
社群帳號從設計稿.html 讀取：Twitch `karina__0115`、Threads `karina__01.15`。網址先組出來並在 config 註記「發布前待核對」。

## 驗收
- 以瀏覽器（Playwright 可用）在 1920x1080 與 375x812 截圖，逐章檢查；檢查展示模式切章與鍵盤操作；
  確認提問箱在未設定 Supabase 時的狀態。
- 完成後回報：修改的檔案、如何本機預覽（請提供一行指令，例如 `python -m http.server`）、待補資料清單。

## 規格更新 #1（UPDATE1.md，2026-11-07 併入）
以下取代上方相衝突的初版規格，其餘維持。

- 活動：12/15、1 周年；時間待確認。年份以 config.event.year 欄位管理，未確認留空，不自行推定年份。
- 社群：Twitch `karina__0115`（https://www.twitch.tv/karina__0115）、YouTube `karina__0115TTV`（https://www.youtube.com/@karina__0115TTV）、Threads `karina__01.15`（https://www.threads.net/@karina__01.15）。仍標註「發布前待核對」。
- 已確定規劃：「即日起開始在 YouTube 更新 Shorts」，其餘「敬請期待」。
- MATCH HISTORY 三張回顧卡，各有 config 文案、圖片／影片與 audioSrc 欄位；空 audioSrc 顯示「語音待補」，不得產生空音訊請求。
- PLAYER PROFILE 預留 config 可替換的「人物設定圖」，目前用新皮全身立繪佔位。
- 圖片位於 site/assets/，原檔唯讀：`vts_2026-11-02_00-51-59.png` 半身、`vts_2026-11-02_00-52-25.png` 全身（皆已透明），分別用於 READY UP 與 PLAYER PROFILE。
- Python（Pillow/numpy，或已有的 rembg）處理獎品去背，衍生成品置於 site/assets/cutout/，config 指向成品。白底圖須保留商品、乾淨邊緣、無白邊光暈。
  - 35678_S.webp：紅玉玻璃滑鼠墊，白底去背。
  - tw-11134207-820ld-msx36k90232f4e.jpg：APEX 尼斯娃娃，綠／紫兩隻，白底去背。
  - 瓦.jpg：VALORANT 盲盒，背景複雜；去背不合適時採主體裁切相框卡片，避免破邊。
- 新增 LUCKY DRAW｜周年抽獎，置於 ASK KARINA 與 NEXT ROUND 之間。現在共 6 章，展示模式支援按鈕、左右方向鍵與數字鍵 1–6。
- LUCKY DRAW 為獎品展示，本階段不做抽獎動畫或實際抽籤；規則以 config「待確認」管理，不自行編造。
  - 訂閱者獎池：大獎「紅玉玻璃滑鼠墊 ×1」，11 月積分達標再 +1，達標共 ×2；由 config.draw.bonusAchieved 切換，預設 false，顯示「11 月積分達標加碼 +1」。二獎「APEX 尼斯娃娃 ×5」。三獎「VALORANT 盲盒 ×6」。
  - 參加獎池：參加獎「MyCard 150 點 ×5」。
  - 戰利品／掉落物品欄風格，稀有度邊框、數量角標、大獎最大，兩池清楚分區。
- 驗收：1920×1080、375×812，六章逐章 Playwright 截圖；黑底／粉底檢視去背邊緣。回報修改檔案、cutout 檔、瓦.jpg 處理方式、待補資料與預覽指令。

## 規格更新 #2（UPDATE2.md 併入）
- index 為主播展示頁：04 ASK KARINA 改為「ASK KARINA｜觀眾提問箱」卡片牆，顯示「共 N 則」；不包含登入或投稿表單。
- 觀眾投稿獨立為 site/ask.html，手機優先。Google／Twitch PKCE 登入後可選「想問的問題」或「周年祝福」，每人一筆、可修改。沿用未連線狀態，加入公開展示隱私提示。
- 首頁投問題按鈕與卡片牆「我要投問題」入口連到 ask.html；牆上預留 QR 圖片欄位，正式網址確認後提供。
- 參考 4lianyun board.js、board.css、index.html 與 assets/card.png 的錯落卡片、微傾斜、長短句不同字級及放大閱讀方式，外觀改為本專案粉黑 FPS：深玫瑰黑底、霓虹粉邊、錯位粉陰影、首字圓形頭像、Q／爪印區分問題與祝福。
- config.board.mock 放 28 則繁中假問題／祝福，長短混合，明確標示 MOCK 示範資料而非真實投稿。
- 卡片可點擊放大，上下則按鈕與左右鍵切換、Esc／點外面關閉；放大時不觸發章節按鍵，關閉回復焦點。
- 桌機展示模式依卡片數量調整字級，盡量一屏放下；超出可捲動。手機用整齊單欄、不橫向溢出。微漂浮／新卡片進場支援 reduced-motion 關閉。不做保存圖片功能。
- 預留 Supabase 讀取介面；未設定或讀取失敗時回退明確標示的 mock。真實資料透過獨立公開檢視表僅提供暱稱、類型、內文等展示欄位；私人 user_id 仍保留原本本人 RLS。
- 驗收：Playwright 1920×1080 展示模式第 4 章與放大、375×812 ask.html 與卡片牆。確認離線表單、卡片快捷鍵與 1–6 章節切換。

## 規格更新 #3（UPDATE3.md 併入）
以下取代先前相衝突規格。
- 七章順序：01 READY UP、02 PLAYER PROFILE、03 MATCH HISTORY、04 STICKER WALL、05 ASK KARINA、06 LUCKY DRAW、07 NEXT ROUND。頂部導覽與數字鍵 1–7 同步。
- 移除左下上一章／下一章按鈕及右下操作提示，只留極小、不可點的章節進度。
- 展示模式：滾輪上下換章，連續事件／慣性視為單一手勢，最多換一章，另有防連續觸發節流。章內可捲動內容優先消耗手勢，到邊界後下一次手勢才切章。觸控上下滑同理。↑↓←→、PageUp/PageDown、數字鍵及頂部導覽可用。
- 非展示模式不攔截滾輪／觸控，維持一般捲動。任何放大卡／貼圖開啟時，不切換章節；方向鍵依放大檢視處理，滾輪只捲動放大內容。
- READY UP 改用 assets/profilepicture.jpeg 的 1200px web 衍生版 assets/web/profilepicture.jpg。原檔唯讀，白底紅線稿採淺粉相紙框；「草圖・待替換」標籤由 config.images.heroDraft 控制。PLAYER PROFILE 仍保留新皮全身立繪。
- STICKER WALL 放在 MATCH HISTORY 後、ASK KARINA 前。標題「貼圖牆」，副標於 config.sections 可替換。
- assets/sticker/ 共 14 個原檔保持唯讀；ASCII web 版另存 assets/sticker-web/。8 PNG 最長邊不超過 512px、不放大較小圖；原始超過 1MB 的 2 GIF 最長邊縮到 400px並保留動畫與總播放時長；其餘較小 GIF 保留原編碼另名複製。6 GIF 各產生靜態第一幀供 reduced-motion 使用。
- config.stickers 包含 id、file、label、still；中文名稱依原檔名去副檔名、底線轉空格，可由主播修改。結構可擴充其他欄位，現階段不分組。
- 貼圖牆使用微傾斜、略有大小差異的粉框收藏卡，貼圖主角、編號及名稱為輔；滑鼠移入／聚焦微放大，點開大圖，左右切貼圖，Esc／外側關閉。
- 桌機 1920×1080 展示模式一屏顯示 14 張，自動適應 14–24 張；手機兩欄、不橫向溢出。
- 驗收：指定兩種尺寸 READY UP／貼圖牆及桌機放大截圖；檢查滾輪節流、長內容捲動、實際觸控、七章鍵盤／導覽、放大模式隔離、一般捲動、GIF／靜態首幀、圖片載入、無頁面錯誤與橫向溢出。
