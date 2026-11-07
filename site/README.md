# 卡琳娜周年風格樣板（規格更新 #1）

在專案根目錄執行 `node site/serve.cjs`，開啟 http://127.0.0.1:8080 。
展示模式：http://127.0.0.1:8080/?present=1 。按左右鍵或 1–6 切章，輸入欄位內不攔截鍵盤。手機展示模式可在章節內往下捲動。

## 資料與圖片
純 HTML/CSS/JS，不用框架。活動日期 12/15、1 周年；時間待確認，年份以 config.event.year 留空管理，不擅自推定。
活動資料、各章節文案、人物圖、回顧圖片／影片／audioSrc、社群網址及抽獎獎項均集中於 config.js。
社群包含 Twitch、YouTube、Threads，頁面仍標示「發布前待核對」。目前確定「即日起開始在 YouTube 更新 Shorts」。
新皮兩張透明圖直接引用 assets 原檔，未改圖；以 CSS 裁掉周邊透明留白。人物設定圖目前用全身新皮佔位，可在 config.images.characterSheet 替換。
Noto Sans TC 由 Google Fonts 載入，離線時退回 Microsoft JhengHei / sans-serif。

## 抽獎展示
六章順序：READY UP → PLAYER PROFILE → MATCH HISTORY → ASK & WISH → LUCKY DRAW → NEXT ROUND。
兩池分區、大獎最醒目，獎項數量於 config.draw 管理。bonusAchieved 預設 false，大獎 ×1 並顯示「11 月積分達標加碼 +1」；改為 true 後顯示 ×2 與達成提示。
抽獎規則待確認。本階段僅獎品展示，沒有抽籤或抽獎動畫。

## 去背
原始圖片保持唯讀；qa/update1/original-hashes.json 留存處理前 SHA256，比對確認一致。
Python Pillow + numpy 腳本：tools/prepare_assets.py。只讀 assets 原檔、另寫 cutout；邊緣連通去白、去除白色混邊，尼斯娃娃額外修整地面陰影。若需重跑，在本機安裝 Pillow 與 numpy 後執行 `python site/tools/prepare_assets.py`。
- assets/cutout/ruby-mousepad.png：滑鼠墊透明去背。
- assets/cutout/apex-nessie.png：綠／紫兩隻尼斯娃娃透明去背，白色布料保留。
- assets/cutout/valorant-framed.png：本環境無 rembg；採規格允許的相框方案，僅微裁左右外緣，保留完整六隻主體、標誌及底部版權文字，不強行去背。
黑底／粉底邊緣對照：qa/update1/cutout-backgrounds.png。

## 提問箱
未設定時顯示「尚未連線」，不載入 SDK、不向 Supabase 發送請求。
啟用時先在獨立 Supabase 專案執行 ../supabase/001_karina_questions.sql，再填 supabase-config.js。
在 Supabase 啟用 Google／Twitch OAuth，登記正式站點與 callback / redirect URL。不要填 service_role key。
預留 PKCE、本人單筆讀取／新增／修改，未共用 4lianyun 表或金鑰。
預設問題上限 300 字；若修改 maxMessage，須同步 SQL check。實際 OAuth 與資料儲存待正式設定後驗證。

## 待補
- 活動年份、開播時間與時區。
- 三個社群網址及直播目的地發布前核對。
- 玩家詳細資料、貓咪資料與正式人物設定圖。
- 三張回顧卡文案、圖片／短片、語音檔（audioSrc 空值顯示「語音待補」）。
- 抽獎規則與 11 月積分達標結果。
- 更多直播新規劃與周年感謝正式文案。
- 正式 Supabase URL、publishable key、OAuth 設定、字數上限與收件規則。

## 驗證
2026-11-07：Playwright + Edge，1920×1080 與 375×812。
qa/update1/ 含兩種尺寸、六章的一般瀏覽／展示模式截圖、完整章節截圖、手機展示模式捲動截圖及加碼達成截圖。
results.json 記錄頁面錯誤、靜態資源失敗與橫向溢出檢查。數字鍵 1–6、方向鍵、前後按鈕、模式切換、預設 ×1／達標 ×2、各獎項數量、圖片載入、空音訊、YouTube 網址與未連線狀態均已驗證。
check.cjs / contact-sheet.cjs 的 Playwright / sharp 路徑為本環境 runtime，其他環境需替換 require 路徑。
初版技能 inspect.mjs 曾因 CDP 逾時失敗；本次以 Playwright 實際檢查與截圖為準。

## 規格更新 #2：觀眾投稿與主播卡片牆
- 展示頁：http://127.0.0.1:8080/index.html?present=1#round-4
- 觀眾投稿：http://127.0.0.1:8080/ask.html
- index 不再載入登入／送出邏輯；首頁投問題及牆上入口開啟獨立 ask.html。
- 28 則假資料位於 config.board.mock；卡片牆與放大卡都明確標示 MOCK。設定 Supabase 後，config.board.source='auto' 會讀公開檢視表；失敗時以明確提示回退 mock，真實空表則顯示沒有投稿。
- 須在 001 後執行 supabase/002_question_board.sql，新增 kind、由伺服器填入的 display_name，以及僅投影公開展示欄位的 karina_question_board。底層表仍只允許登入者讀／改自己的那筆，不公開 user_id。既有資料的預設暱稱為「觀眾」，再次修改會更新為登入暱稱。
- data.js 共用連線界線；board.js 管卡片與放大，ask.js 管登入／類型／投稿及修改。未設定時不載入 SDK、不發資料請求，ask 表單與登入鈕停用並顯示「尚未連線」。
- PKCE 回跳網址現在是 ask.html；發布前更新 Supabase Redirect URLs 與 OAuth 設定。
- config.board.qrImage 預留正式 QR 圖片，目前顯示「QR code 待補」，不是可掃描的假 QR。
- 卡片牆公開顯示暱稱、類型與投稿內文；ask 頁已說明直播／公開展示並提示不要填個資。
- window.KarinaBoard.upsert(record) 是未來即時資料接入點：新增卡片帶入場動畫，不重啟其他卡片動畫；prefers-reduced-motion 關閉。現階段每次開頁讀取一次，未啟用 realtime 訂閱。
- 最新 Playwright 驗收：node site/qa/check.cjs。結果與截圖在 qa/update2/。SDK stub 僅驗證連線 UI 分支（登入回跳、新增／修改、類型、公開資料讀取與失敗回退），沒有操作真實服務；實際 OAuth 與 SQL 權限仍待正式專案驗證。
- 新增待補：正式 ask.html 網址與 QR 圖片、Supabase SQL 更新／公開展示政策核對、正式投稿資料。目前不是已上線的真實觀眾牆。

## 規格更新 #3：七章與貼圖牆
最新章節：READY UP → PLAYER PROFILE → MATCH HISTORY → STICKER WALL → ASK & WISH → LUCKY DRAW → NEXT ROUND。
- 展示頁：http://127.0.0.1:8080/index.html?present=1
- 貼圖牆：http://127.0.0.1:8080/index.html?present=1#round-4
- 提問卡片牆改為：http://127.0.0.1:8080/index.html?present=1#round-5
- 投稿頁仍為：http://127.0.0.1:8080/ask.html

已移除章節箭頭與右下快捷鍵提示，只保留小型進度。展示模式使用滾輪、觸控滑動、↑↓←→、PageUp/PageDown、數字鍵 1–7 與頂部導覽。滾輪使用 260ms 無事件視為手勢結束、700ms 最短切換間距，持續慣性最多換一章。長內容先捲動，到底／頂後的下一次手勢再換章。一般模式正常捲動，放大檢視開啟時不切章。

READY UP 使用淺粉相紙框呈現 profilepicture.jpeg 草圖，web JPEG 為 1200×1200、305370 bytes。config.images.hero、heroAlt、heroDraft、heroDraftLabel 可替換／關閉草圖標籤。新皮立繪仍在 PLAYER PROFILE。

貼圖原檔未改，web 版位於 assets/sticker-web/，程式為 stickers.js／stickers.css。
- 8 PNG：最長邊 500–512px（小圖不放大）。
- 2 個原超過 1MB 的 GIF：縮至 400×400，約 119KB、981KB；保留動畫與原總播放時長。
- 4 個原低於 1MB 的 GIF：原編碼另名複製，保留 200／500／700px 尺寸，約 150–519KB。
- 6 個 GIF 額外產生最長邊 200–400px 的靜態首幀，reduced-motion 與系統設定即時切換都使用靜態圖。
- 「再一把」縮小後相同連續畫格由 Pillow 合併（36 → 13 幀），總時長仍為 4320ms。其餘幀數不變。
- 14 個主要 web 檔合計 4529538 bytes；含額外靜態首幀的完整資訊見 qa/update3/assets.json。
- config.stickers 清單控制 id、file、label、still；14–24 項可直接增減，未實作分組。

素材可重建：`python site/tools/prepare_stickers.py`（需 Pillow）。腳本只處理衍生圖與 QA manifest，不覆寫原檔或主播改過的 config 標籤。
靜態伺服器增加 JPG／GIF 等 MIME，預設 8080；如需其他連接埠可設定環境變數 KARINA_PREVIEW_PORT。

最新驗收：`node site/qa/check.cjs`，截圖與結果位於 qa/update3/。QA 腳本使用本機 8081 測試伺服器，工具路徑為本環境 runtime；其他機器請調整。歷次 qa/update1、update2 等保留為歷史紀錄。
新增待補：正式頭像（替換草圖）、貼圖中文名稱／副標最終確認；活動時間年份、人物設定、回顧影音、抽獎規則、正式 QR 與 Supabase/OAuth 等既有待補維持。

## 驗收小修正
章節英文已統一為 ASK & WISH，中文仍為「觀眾提問箱」。放大卡片底部鍵盤提示移除，鍵盤功能保持。玩家卡新增「粉絲稱呼」「喜歡吃的東西」，都在 config.js 的 PLAYER PROFILE fields 內，預設「待確認」。此次截圖與自檢位於 qa/minor-fixes/。
