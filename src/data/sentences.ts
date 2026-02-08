// 生活短句資料庫 - 最多 10 個單字，日常情境用語

export interface Sentence {
  id: number;
  english: string;
  chinese: string;
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
}

export const sentences: Sentence[] = [
  // ===== 簡單句（3-5 個單字）=====
  
  // 打招呼
  { id: 1, english: "Hello!", chinese: "你好！", difficulty: "easy", category: "Greetings" },
  { id: 2, english: "Good morning!", chinese: "早安！", difficulty: "easy", category: "Greetings" },
  { id: 3, english: "Good night!", chinese: "晚安！", difficulty: "easy", category: "Greetings" },
  { id: 4, english: "How are you?", chinese: "你好嗎？", difficulty: "easy", category: "Greetings" },
  { id: 5, english: "I am fine.", chinese: "我很好。", difficulty: "easy", category: "Greetings" },
  { id: 6, english: "Nice to meet you!", chinese: "很高興認識你！", difficulty: "easy", category: "Greetings" },
  { id: 7, english: "See you later!", chinese: "待會見！", difficulty: "easy", category: "Greetings" },
  { id: 8, english: "Goodbye!", chinese: "再見！", difficulty: "easy", category: "Greetings" },
  
  // 家庭
  { id: 9, english: "I love my mom.", chinese: "我愛我媽媽。", difficulty: "easy", category: "Family" },
  { id: 10, english: "I love my dad.", chinese: "我愛我爸爸。", difficulty: "easy", category: "Family" },
  { id: 11, english: "This is my sister.", chinese: "這是我姊姊/妹妹。", difficulty: "easy", category: "Family" },
  { id: 12, english: "This is my brother.", chinese: "這是我哥哥/弟弟。", difficulty: "easy", category: "Family" },
  { id: 13, english: "I have a baby.", chinese: "我有一個寶寶。", difficulty: "easy", category: "Family" },
  
  // 食物
  { id: 14, english: "I am hungry.", chinese: "我餓了。", difficulty: "easy", category: "Food" },
  { id: 15, english: "I am thirsty.", chinese: "我渴了。", difficulty: "easy", category: "Food" },
  { id: 16, english: "I like apples.", chinese: "我喜歡蘋果。", difficulty: "easy", category: "Food" },
  { id: 17, english: "I like bananas.", chinese: "我喜歡香蕉。", difficulty: "easy", category: "Food" },
  { id: 18, english: "I want milk.", chinese: "我要牛奶。", difficulty: "easy", category: "Food" },
  { id: 19, english: "I want water.", chinese: "我要水。", difficulty: "easy", category: "Food" },
  { id: 20, english: "It is yummy!", chinese: "好好吃！", difficulty: "easy", category: "Food" },
  
  // 動物
  { id: 21, english: "I have a dog.", chinese: "我有一隻狗。", difficulty: "easy", category: "Animals" },
  { id: 22, english: "I have a cat.", chinese: "我有一隻貓。", difficulty: "easy", category: "Animals" },
  { id: 23, english: "I like birds.", chinese: "我喜歡鳥。", difficulty: "easy", category: "Animals" },
  { id: 24, english: "The dog is big.", chinese: "這隻狗很大。", difficulty: "easy", category: "Animals" },
  { id: 25, english: "The cat is small.", chinese: "這隻貓很小。", difficulty: "easy", category: "Animals" },
  
  // 顏色
  { id: 26, english: "I like red.", chinese: "我喜歡紅色。", difficulty: "easy", category: "Colors" },
  { id: 27, english: "I like blue.", chinese: "我喜歡藍色。", difficulty: "easy", category: "Colors" },
  { id: 28, english: "It is green.", chinese: "它是綠色的。", difficulty: "easy", category: "Colors" },
  { id: 29, english: "It is yellow.", chinese: "它是黃色的。", difficulty: "easy", category: "Colors" },
  
  // 學校
  { id: 30, english: "I go to school.", chinese: "我去上學。", difficulty: "easy", category: "School" },
  { id: 31, english: "I like school.", chinese: "我喜歡學校。", difficulty: "easy", category: "School" },
  { id: 32, english: "This is my book.", chinese: "這是我的書。", difficulty: "easy", category: "School" },
  { id: 33, english: "This is my pen.", chinese: "這是我的筆。", difficulty: "easy", category: "School" },
  
  // 天氣
  { id: 34, english: "It is sunny.", chinese: "天氣晴朗。", difficulty: "easy", category: "Weather" },
  { id: 35, english: "It is rainy.", chinese: "下雨了。", difficulty: "easy", category: "Weather" },
  { id: 36, english: "It is hot.", chinese: "天氣很熱。", difficulty: "easy", category: "Weather" },
  { id: 37, english: "It is cold.", chinese: "天氣很冷。", difficulty: "easy", category: "Weather" },
  
  // 身體
  { id: 38, english: "I have two eyes.", chinese: "我有兩隻眼睛。", difficulty: "easy", category: "Body" },
  { id: 39, english: "I have two hands.", chinese: "我有兩隻手。", difficulty: "easy", category: "Body" },
  { id: 40, english: "My head hurts.", chinese: "我頭痛。", difficulty: "easy", category: "Body" },
  
  // ===== 中等句（5-7 個單字）=====
  
  // 日常活動
  { id: 41, english: "I wake up at seven.", chinese: "我七點起床。", difficulty: "medium", category: "Daily" },
  { id: 42, english: "I eat breakfast every day.", chinese: "我每天吃早餐。", difficulty: "medium", category: "Daily" },
  { id: 43, english: "I brush my teeth.", chinese: "我刷牙。", difficulty: "medium", category: "Daily" },
  { id: 44, english: "I take a shower.", chinese: "我洗澡。", difficulty: "medium", category: "Daily" },
  { id: 45, english: "I go to bed at nine.", chinese: "我九點上床睡覺。", difficulty: "medium", category: "Daily" },
  { id: 46, english: "I do my homework.", chinese: "我寫功課。", difficulty: "medium", category: "Daily" },
  { id: 47, english: "I watch TV at night.", chinese: "我晚上看電視。", difficulty: "medium", category: "Daily" },
  { id: 48, english: "I play games with friends.", chinese: "我和朋友玩遊戲。", difficulty: "medium", category: "Daily" },
  
  // 食物進階
  { id: 49, english: "Can I have some water?", chinese: "我可以喝水嗎？", difficulty: "medium", category: "Food" },
  { id: 50, english: "I want a hamburger, please.", chinese: "我要一個漢堡，謝謝。", difficulty: "medium", category: "Food" },
  { id: 51, english: "The pizza is very good.", chinese: "這個披薩很好吃。", difficulty: "medium", category: "Food" },
  { id: 52, english: "I like ice cream a lot.", chinese: "我很喜歡冰淇淋。", difficulty: "medium", category: "Food" },
  { id: 53, english: "Let's have lunch together.", chinese: "我們一起吃午餐吧。", difficulty: "medium", category: "Food" },
  { id: 54, english: "What do you want to eat?", chinese: "你想吃什麼？", difficulty: "medium", category: "Food" },
  
  // 學校進階
  { id: 55, english: "I like my teacher.", chinese: "我喜歡我的老師。", difficulty: "medium", category: "School" },
  { id: 56, english: "We have math class today.", chinese: "我們今天有數學課。", difficulty: "medium", category: "School" },
  { id: 57, english: "I sit next to my friend.", chinese: "我坐在朋友旁邊。", difficulty: "medium", category: "School" },
  { id: 58, english: "The teacher is very nice.", chinese: "老師人很好。", difficulty: "medium", category: "School" },
  { id: 59, english: "I read books in the library.", chinese: "我在圖書館看書。", difficulty: "medium", category: "School" },
  
  // 家庭進階
  { id: 60, english: "My mom cooks dinner.", chinese: "我媽媽煮晚餐。", difficulty: "medium", category: "Family" },
  { id: 61, english: "My dad goes to work.", chinese: "我爸爸去上班。", difficulty: "medium", category: "Family" },
  { id: 62, english: "We eat together as a family.", chinese: "我們全家一起吃飯。", difficulty: "medium", category: "Family" },
  { id: 63, english: "I help my mom at home.", chinese: "我在家幫媽媽。", difficulty: "medium", category: "Family" },
  { id: 64, english: "My grandma tells me stories.", chinese: "我阿嬤講故事給我聽。", difficulty: "medium", category: "Family" },
  
  // 休閒活動
  { id: 65, english: "I like to play basketball.", chinese: "我喜歡打籃球。", difficulty: "medium", category: "Hobbies" },
  { id: 66, english: "I like to draw pictures.", chinese: "我喜歡畫畫。", difficulty: "medium", category: "Hobbies" },
  { id: 67, english: "I listen to music every day.", chinese: "我每天聽音樂。", difficulty: "medium", category: "Hobbies" },
  { id: 68, english: "I like to ride my bike.", chinese: "我喜歡騎腳踏車。", difficulty: "medium", category: "Hobbies" },
  { id: 69, english: "I play the piano.", chinese: "我彈鋼琴。", difficulty: "medium", category: "Hobbies" },
  { id: 70, english: "I like to swim in summer.", chinese: "我喜歡夏天游泳。", difficulty: "medium", category: "Hobbies" },
  
  // 地點
  { id: 71, english: "I go to the park.", chinese: "我去公園。", difficulty: "medium", category: "Places" },
  { id: 72, english: "Let's go to the zoo.", chinese: "我們去動物園吧。", difficulty: "medium", category: "Places" },
  { id: 73, english: "I buy things at the store.", chinese: "我在商店買東西。", difficulty: "medium", category: "Places" },
  { id: 74, english: "We play in the playground.", chinese: "我們在遊樂場玩。", difficulty: "medium", category: "Places" },
  { id: 75, english: "I live in a big house.", chinese: "我住在一棟大房子。", difficulty: "medium", category: "Places" },
  
  // 感受
  { id: 76, english: "I am very happy today.", chinese: "我今天很開心。", difficulty: "medium", category: "Feelings" },
  { id: 77, english: "I feel a little sad.", chinese: "我有點難過。", difficulty: "medium", category: "Feelings" },
  { id: 78, english: "I am so excited!", chinese: "我好興奮！", difficulty: "medium", category: "Feelings" },
  { id: 79, english: "I am tired today.", chinese: "我今天很累。", difficulty: "medium", category: "Feelings" },
  { id: 80, english: "I am scared of the dark.", chinese: "我怕黑。", difficulty: "medium", category: "Feelings" },
  
  // ===== 困難句（7-10 個單字）=====
  
  // 日常活動進階
  { id: 81, english: "I usually wake up at seven in the morning.", chinese: "我通常早上七點起床。", difficulty: "hard", category: "Daily" },
  { id: 82, english: "After school, I play with my friends.", chinese: "放學後，我和朋友一起玩。", difficulty: "hard", category: "Daily" },
  { id: 83, english: "I always do my homework before dinner.", chinese: "我總是在晚餐前寫功課。", difficulty: "hard", category: "Daily" },
  { id: 84, english: "On weekends, I like to sleep late.", chinese: "週末的時候，我喜歡睡晚一點。", difficulty: "hard", category: "Daily" },
  { id: 85, english: "I help my mother clean the house.", chinese: "我幫媽媽打掃房子。", difficulty: "hard", category: "Daily" },
  
  // 學校進階
  { id: 86, english: "My favorite subject at school is English.", chinese: "我在學校最喜歡的科目是英文。", difficulty: "hard", category: "School" },
  { id: 87, english: "I study hard to get good grades.", chinese: "我努力讀書來得到好成績。", difficulty: "hard", category: "School" },
  { id: 88, english: "We have a test next Monday.", chinese: "我們下週一有考試。", difficulty: "hard", category: "School" },
  { id: 89, english: "The teacher gave us a lot of homework.", chinese: "老師給了我們很多功課。", difficulty: "hard", category: "School" },
  { id: 90, english: "I made a new friend at school today.", chinese: "我今天在學校交了一個新朋友。", difficulty: "hard", category: "School" },
  
  // 家庭進階
  { id: 91, english: "My family goes on a trip every summer.", chinese: "我們家每年夏天都會去旅行。", difficulty: "hard", category: "Family" },
  { id: 92, english: "We celebrate my birthday with a big cake.", chinese: "我們用一個大蛋糕慶祝我的生日。", difficulty: "hard", category: "Family" },
  { id: 93, english: "I love spending time with my grandparents.", chinese: "我喜歡和爺爺奶奶在一起。", difficulty: "hard", category: "Family" },
  { id: 94, english: "My sister and I share a room.", chinese: "我和姊姊/妹妹共用一個房間。", difficulty: "hard", category: "Family" },
  { id: 95, english: "We have dinner together every night.", chinese: "我們每天晚上一起吃晚餐。", difficulty: "hard", category: "Family" },
  
  // 休閒進階
  { id: 96, english: "I like to watch cartoons on TV.", chinese: "我喜歡看電視上的卡通。", difficulty: "hard", category: "Hobbies" },
  { id: 97, english: "My hobby is collecting stickers.", chinese: "我的嗜好是收集貼紙。", difficulty: "hard", category: "Hobbies" },
  { id: 98, english: "I want to learn how to play guitar.", chinese: "我想學彈吉他。", difficulty: "hard", category: "Hobbies" },
  { id: 99, english: "We play soccer in the park after school.", chinese: "我們放學後在公園踢足球。", difficulty: "hard", category: "Hobbies" },
  { id: 100, english: "I like to read books before I sleep.", chinese: "我喜歡睡前看書。", difficulty: "hard", category: "Hobbies" },
  
  // 未來/夢想
  { id: 101, english: "I want to be a doctor when I grow up.", chinese: "我長大想當醫生。", difficulty: "hard", category: "Dreams" },
  { id: 102, english: "I hope to travel around the world.", chinese: "我希望環遊世界。", difficulty: "hard", category: "Dreams" },
  { id: 103, english: "My dream is to become a teacher.", chinese: "我的夢想是當老師。", difficulty: "hard", category: "Dreams" },
  { id: 104, english: "I want to learn many languages.", chinese: "我想學很多語言。", difficulty: "hard", category: "Dreams" },
  { id: 105, english: "I will work hard to make my dream come true.", chinese: "我會努力讓夢想成真。", difficulty: "hard", category: "Dreams" },
  
  // 禮貌用語
  { id: 106, english: "Thank you very much for your help.", chinese: "非常感謝你的幫忙。", difficulty: "hard", category: "Manners" },
  { id: 107, english: "Excuse me, can you help me please?", chinese: "不好意思，你可以幫我嗎？", difficulty: "hard", category: "Manners" },
  { id: 108, english: "I am sorry for being late.", chinese: "抱歉我遲到了。", difficulty: "hard", category: "Manners" },
  { id: 109, english: "May I go to the bathroom, please?", chinese: "請問我可以去廁所嗎？", difficulty: "hard", category: "Manners" },
  { id: 110, english: "Could you please say that again?", chinese: "你可以再說一次嗎？", difficulty: "hard", category: "Manners" },
  
  // 描述
  { id: 111, english: "The weather is very nice today.", chinese: "今天天氣很好。", difficulty: "hard", category: "Description" },
  { id: 112, english: "This is the biggest dog I have ever seen.", chinese: "這是我見過最大的狗。", difficulty: "hard", category: "Description" },
  { id: 113, english: "My room is smaller than my sister's room.", chinese: "我的房間比姊姊的房間小。", difficulty: "hard", category: "Description" },
  { id: 114, english: "The red car is faster than the blue car.", chinese: "紅色的車比藍色的車快。", difficulty: "hard", category: "Description" },
  { id: 115, english: "This book is very interesting to read.", chinese: "這本書很有趣。", difficulty: "hard", category: "Description" },
  
  // 時間
  { id: 116, english: "What time is it now?", chinese: "現在幾點了？", difficulty: "medium", category: "Time" },
  { id: 117, english: "It is three o'clock in the afternoon.", chinese: "現在是下午三點。", difficulty: "hard", category: "Time" },
  { id: 118, english: "I have piano class every Wednesday.", chinese: "我每週三有鋼琴課。", difficulty: "hard", category: "Time" },
  { id: 119, english: "My birthday is in December.", chinese: "我的生日在十二月。", difficulty: "hard", category: "Time" },
  { id: 120, english: "We will go to the beach next month.", chinese: "我們下個月會去海邊。", difficulty: "hard", category: "Time" },
];

export const sentenceCategories = [
  "Greetings",
  "Family",
  "Food",
  "Animals",
  "Colors",
  "School",
  "Weather",
  "Body",
  "Daily",
  "Hobbies",
  "Places",
  "Feelings",
  "Dreams",
  "Manners",
  "Description",
  "Time",
];

// 統計
export const sentenceStats = {
  total: sentences.length,
  easy: sentences.filter(s => s.difficulty === 'easy').length,
  medium: sentences.filter(s => s.difficulty === 'medium').length,
  hard: sentences.filter(s => s.difficulty === 'hard').length,
};

console.log(`📝 句子資料庫已載入：共 ${sentenceStats.total} 句（簡單 ${sentenceStats.easy} / 中等 ${sentenceStats.medium} / 困難 ${sentenceStats.hard}）`);
