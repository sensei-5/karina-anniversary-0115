window.KARINA_CONFIG = {
  event: {
    title: '卡琳娜有一隻貓', titleLines: ['卡琳娜', '有一隻貓'], subtitle: '1 周年初配信',
    tagline: '這一回合，換你們認識新的我。',
    month: 12, day: 15, year: '', // 年份尚未確認；留空只顯示月／日。
    time: '待確認', years: 1
  },
  liveUrl: 'https://www.twitch.tv/karina__0115',
  // 以下網址依已提供帳號組成，發布前待核對。
  socialStatus: '發布前待核對',
  socials: [
    { label: 'Twitch', account: 'karina__0115', url: 'https://www.twitch.tv/karina__0115' },
    { label: 'YouTube', account: 'karina__0115TTV', url: 'https://www.youtube.com/@karina__0115TTV' },
    { label: 'Threads', account: 'karina__01.15', url: 'https://www.threads.net/@karina__01.15' }
  ],
  images: {
    hero: 'assets/web/profilepicture.jpg',
    heroAlt: '卡琳娜新頭像紅色線稿草圖',
    heroDraft: true, // 正式頭像完成後可關閉草圖標籤。
    heroDraftLabel: '草圖・待替換',
    profile: 'assets/vts_2026-11-02_00-52-25.png',
    // 正式人物設定圖完成後，替換此路徑即可。
    characterSheet: 'assets/vts_2026-11-02_00-52-25.png',
    characterSheetStatus: '人物設定圖待補，目前以新皮立繪佔位。'
  },
  maxMessage: 300,
  draw: {
    rules: {
      title: '抽獎規則',
      eligibility: '兩個獎池都必須追隨本頻道，才有抽獎資格。',
      subscriber: {
        title: '訂閱者獎池',
        entry: '擷取名單當下為本頻道自主訂閱者，自動參加，不需輸入指令。',
        tickets: [{ label: '層級 1', count: 1 }, { label: '層級 2', count: 2 }, { label: '層級 3', count: 6 }],
        ticketBasis: '以擷取名單當下的訂閱層級為準。'
      },
      participation: {
        title: '參加獎池', beforeCommand: '登記時間內，在聊天室輸入', command: '!抽獎',
        afterCommand: '即可參加，有沒有訂閱都可以。',
        duplicate: '同一帳號輸入多次只算一次。',
        ticketLabel: '每人一律', ticketCount: 1, ticketBasis: '不論是否訂閱、層級。',
        registrationLabel: '登記時間', registrationTime: '待補'
      },
      subscriptionDefinition: '自主訂閱＝自己付費訂閱本頻道；Prime 訂閱、收到別人贈訂都不算，送出贈訂也不會因此多拿抽獎券。',
      ticketRestriction: '抽獎券不能累加、轉讓或合併。'
    },
    subscriberPool: '訂閱者獎池', participationPool: '參加獎池',
    bonusAchieved: false, // 11 月積分達標後改為 true，大獎數量由 ×1 變成 ×2。
    bonusNote: '11 月積分達標加碼 +1', achievedNote: '11 月積分目標已達成，加碼 +1',
    subscriberPrizes: [
      { tier: '大獎', name: '紅玉玻璃滑鼠墊', quantity: 1, bonus: 1, image: 'assets/cutout/ruby-mousepad.png', rarity: 'grand' },
      { tier: '二獎', name: 'APEX 尼斯娃娃', quantity: 5, image: 'assets/cutout/apex-nessie.png', rarity: 'rare' },
      { tier: '三獎', name: 'VALORANT 盲盒', quantity: 6, image: 'assets/cutout/valorant-framed.png', rarity: 'standard', framed: true }
    ],
    participationPrize: { tier: '參加獎', name: 'MyCard 150 點', quantity: 5, points: 150 }
  },
  sections: [
    { label: 'READY UP', title: '周年開場', text: '這一回合，換你們認識新的我。', placeholder: '活動資訊與開場畫面，待風格確認後展開。', media: '' },
    { label: 'PLAYER PROFILE', title: '玩家檔案', text: '關於卡琳娜，還有家裡那隻貓。',
      fields: [ {label:'主播稱呼',value:['卡琳娜', 'Karina', '卡姐']}, {label:'粉絲稱呼',value:'待補'}, {label:'常玩的 FPS',value:'待補'}, {label:'遊戲定位或打法',value:'待補'}, {label:'開台風格',value:'待補'}, {label:'貓咪小檔案',value:'待補'}, {label:'除了打遊戲，我還喜歡',value:'待補'}, {label:'喜歡吃的東西',value:'待補'} ],
      media: '' },
    { label: 'MATCH HISTORY', title: '周年戰績回顧', text: '有些瞬間，值得再看一次。',
      memories: [
        { title: '第一次開台', copy: '', image: '', video: '', audioSrc: '' },
        { title: '我最想重播的一局', copy: '', image: '', video: '', audioSrc: '' },
        { title: '一個我到現在還記得的聊天室瞬間', copy: '', image: '', video: '', audioSrc: '' }
      ] },
    { label: 'STICKER WALL', title: '貼圖牆', text: '為了這身新皮，委託了一整排貼圖。' },
    { label: 'ASK & WISH', title: '觀眾提問箱', text: '問題也好，周年祝福也好，我都想聽。', placeholder: '登入後，每個帳號可送出一筆，送出後可以修改。', media: '' },
    { label: 'LUCKY DRAW', title: '周年抽獎', text: '這一回合，戰利品準備好了。' },
    { label: 'NEXT ROUND', title: '下一回合', text: '謝謝你們，陪我打到這一回合。', placeholder: '即日起開始在 YouTube 更新 Shorts。其餘新規劃，敬請期待。', media: '' }
  ]
};
// UPDATE #2: 以下全部為 mock 示範留言，並非觀眾真實投稿。
window.KARINA_CONFIG.ask = {
  title: '留一句話給卡琳娜',
  intro: '想問的問題，或想說的周年祝福，都可以留在這裡。',
  privacy: '送出後，你的暱稱、投稿類型與內文會公開展示在周年卡片牆，也可能出現在直播畫面。請勿填寫電話、地址或其他私人資料。每個帳號限一筆，登入後可以修改。'
};
window.KARINA_CONFIG.board = {
  source: 'auto', // auto：設定 Supabase 後讀取公開檢視表；未連線或讀取失敗時使用下列 mock。
  view: 'karina_question_board',
  askUrl: 'ask.html',
  qrImage: '', // 正式發布網址確認後，放入指向 ask.html 的 QR 圖片。
  mock: [
    { id: 'mock-01', kind: 'question', display_name: 'momo_aim', message: '最想重玩的那一局是哪場？' },
    { id: 'mock-02', kind: 'blessing', display_name: '奶茶不加冰_77', message: '一周年快樂！' },
    { id: 'mock-03', kind: 'question', display_name: 'cat_on_WASD', message: '貓咪會不會跑到鍵盤上？牠有幫你打贏過嗎？' },
    { id: 'mock-04', kind: 'blessing', display_name: '夜班小薯', message: '下班最喜歡打開妳的台，聽到熟悉的聲音就覺得今天終於可以放鬆了。謝謝妳陪我們度過那麼多普通的晚上，希望接下來妳也能照自己的步調開台，玩得開心最重要。' },
    { id: 'mock-05', kind: 'question', display_name: 'one_tap阿哲', message: '第一次開台前，最緊張的事情是什麼？' },
    { id: 'mock-06', kind: 'blessing', display_name: '布丁蹲點中', message: '貓貓也要快樂！' },
    { id: 'mock-07', kind: 'question', display_name: 'silver_社畜', message: '連輸的時候怎麼調整心態？我常常越想贏越打不好。' },
    { id: 'mock-08', kind: 'blessing', display_name: '小魚乾投遞員', message: '祝卡琳娜每次轉角都有好運，貓咪每餐都有小魚乾。下一年也一起看台！' },
    { id: 'mock-09', kind: 'question', display_name: 'RinRin_030', message: '有沒有哪一次原本只是想隨便開個台，最後卻變成妳到現在都很珍惜的回憶？我很好奇那些沒有剪成精華、只有當天聊天室才知道的小故事，周年想聽妳慢慢說。' },
    { id: 'mock-10', kind: 'question', display_name: '蹲角落的芋頭', message: '最喜歡哪張地圖？' },
    { id: 'mock-11', kind: 'blessing', display_name: 'peach_0115', message: '新皮好好看！紅色機能服超適合妳，期待更多 Shorts。' },
    { id: 'mock-12', kind: 'question', display_name: '鍵盤上的橘', message: '貓咪最常在什麼時候來找妳？' },
    { id: 'mock-13', kind: 'blessing', display_name: '海鹽拿鐵_tw', message: '一直都在。' },
    { id: 'mock-14', kind: 'question', display_name: 'aim_is_missing', message: '練槍會固定做哪些暖身？想跟著練看看！' },
    { id: 'mock-15', kind: 'blessing', display_name: '路過的糯米糰', message: '雖然平常比較常潛水，但每次看到妳認真打遊戲又突然被貓打斷，都會忍不住笑出來。謝謝妳讓聊天室有這麼舒服的氣氛，祝一周年快樂，之後也會繼續在角落幫妳加油。' },
    { id: 'mock-16', kind: 'question', display_name: '小白準星', message: '如果一整天不能打 FPS，妳會想做什麼？' },
    { id: 'mock-17', kind: 'blessing', display_name: 'Luna下班了', message: '下一回合也報到！' },
    { id: 'mock-18', kind: 'question', display_name: '不是外掛是貓掛', message: '貓咪有專屬的觀戰座位嗎？' },
    { id: 'mock-19', kind: 'question', display_name: '手滑丟閃光', message: '從剛開始開台到現在，妳覺得自己最大的改變是什麼？是比較敢講話、比較不怕失誤，還是終於能一邊認真打槍一邊接住聊天室的梗？有沒有想對第一天開台的自己說的話？' },
    { id: 'mock-20', kind: 'blessing', display_name: '甜辣醬半糖', message: '一周年快樂，謝謝每一次開台！記得喝水，也要好好休息。' },
    { id: 'mock-21', kind: 'question', display_name: 'Nessie抱緊緊', message: '有沒有最捨不得換掉的遊戲造型？' },
    { id: 'mock-22', kind: 'blessing', display_name: '喵的後勤組', message: '喵！' },
    { id: 'mock-23', kind: 'question', display_name: '耳機戴反了', message: '第一次被觀眾認出來，是什麼感覺？' },
    { id: 'mock-24', kind: 'blessing', display_name: '小熊餅乾_88', message: '希望新的一年有好多想打的遊戲、好多值得重播的瞬間，也有不用顧慮數字就能放鬆聊天的晚上。不管是精彩的一槍還是很普通的一天，都很開心能跟大家一起在這裡看見。' },
    { id: 'mock-25', kind: 'question', display_name: '今天也空大', message: '比較喜歡衝第一個，還是在後面幫隊友補槍？' },
    { id: 'mock-26', kind: 'blessing', display_name: '睡前最後一場', message: '明年也一起打下一回合。' },
    { id: 'mock-27', kind: 'question', display_name: '粉紅肉球研究員', message: '貓咪的名字有什麼故事？想聽完整版！' },
    { id: 'mock-28', kind: 'blessing', display_name: 'Karinya_fan', message: '祝新皮出場順利，周年快樂！' }
  ]
};

// UPDATE #3: 項目順序、名稱、圖片皆可改；新增至 24 張不需調整版型。
window.KARINA_CONFIG.stickers = [
  {
    "id": "sticker-01",
    "file": "assets/sticker-web/sticker-01.gif",
    "label": "Loading模板 020 卡姊寶",
    "still": "assets/sticker-web/sticker-01-still.png"
  },
  {
    "id": "sticker-02",
    "file": "assets/sticker-web/sticker-02.gif",
    "label": "scream 0.2s",
    "still": "assets/sticker-web/sticker-02-still.png"
  },
  {
    "id": "sticker-03",
    "file": "assets/sticker-web/sticker-03.png",
    "label": "不睡覺 貓",
    "still": "assets/sticker-web/sticker-03.png"
  },
  {
    "id": "sticker-04",
    "file": "assets/sticker-web/sticker-04.gif",
    "label": "再一把",
    "still": "assets/sticker-web/sticker-04-still.png"
  },
  {
    "id": "sticker-05",
    "file": "assets/sticker-web/sticker-05.png",
    "label": "卡寶親親獸",
    "still": "assets/sticker-web/sticker-05.png"
  },
  {
    "id": "sticker-06",
    "file": "assets/sticker-web/sticker-06.png",
    "label": "卡寶親親獸哭哭",
    "still": "assets/sticker-web/sticker-06.png"
  },
  {
    "id": "sticker-07",
    "file": "assets/sticker-web/sticker-07.png",
    "label": "卡寶親親獸白眼",
    "still": "assets/sticker-web/sticker-07.png"
  },
  {
    "id": "sticker-08",
    "file": "assets/sticker-web/sticker-08.gif",
    "label": "吃瓜 卡姊寶 換 動",
    "still": "assets/sticker-web/sticker-08-still.png"
  },
  {
    "id": "sticker-09",
    "file": "assets/sticker-web/sticker-09.png",
    "label": "小丑 卡姊寶 哭臉 高光",
    "still": "assets/sticker-web/sticker-09.png"
  },
  {
    "id": "sticker-10",
    "file": "assets/sticker-web/sticker-10.png",
    "label": "小丑 卡姊寶 笑臉 高光",
    "still": "assets/sticker-web/sticker-10.png"
  },
  {
    "id": "sticker-11",
    "file": "assets/sticker-web/sticker-11.png",
    "label": "怒怒 卡姊寶",
    "still": "assets/sticker-web/sticker-11.png"
  },
  {
    "id": "sticker-12",
    "file": "assets/sticker-web/sticker-12.gif",
    "label": "戳戳(小尺寸)",
    "still": "assets/sticker-web/sticker-12-still.png"
  },
  {
    "id": "sticker-13",
    "file": "assets/sticker-web/sticker-13.png",
    "label": "罵罵 卡姊寶",
    "still": "assets/sticker-web/sticker-13.png"
  },
  {
    "id": "sticker-14",
    "file": "assets/sticker-web/sticker-14.gif",
    "label": "踩踩(小尺寸)",
    "still": "assets/sticker-web/sticker-14-still.png"
  }
];
