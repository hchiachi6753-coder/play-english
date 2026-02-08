// 填空題資料庫 - 全英文，適合 4-12 歲
// 干擾選項必須是「明顯錯誤」的（詞性不對或語意不通）

export interface FillBlankData {
  id: number;
  sentence: string;      // 有 ___ 的句子
  correctWord: string;   // 正確答案
  distractors: string[]; // 干擾選項（3個，詞性或語意明顯錯誤）
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
}

export const fillBlankQuestions: FillBlankData[] = [
  // ========== EASY 簡單 ==========
  
  // Animals 動物（名詞題 → 干擾用動詞/形容詞）
  { id: 1, sentence: "I have a ___.", correctWord: "dog", distractors: ["run", "happy", "eat"], difficulty: "easy", category: "Animals" },
  { id: 2, sentence: "The ___ says meow.", correctWord: "cat", distractors: ["swim", "jump", "sleep"], difficulty: "easy", category: "Animals" },
  { id: 3, sentence: "A ___ can fly.", correctWord: "bird", distractors: ["run", "swim", "walk"], difficulty: "easy", category: "Animals" },
  { id: 4, sentence: "The ___ lives in water.", correctWord: "fish", distractors: ["fly", "run", "jump"], difficulty: "easy", category: "Animals" },
  { id: 5, sentence: "I see a big ___.", correctWord: "elephant", distractors: ["run", "eat", "sleep"], difficulty: "easy", category: "Animals" },
  { id: 6, sentence: "The ___ can hop.", correctWord: "rabbit", distractors: ["swim", "fly", "drive"], difficulty: "easy", category: "Animals" },
  { id: 7, sentence: "A ___ has a long neck.", correctWord: "giraffe", distractors: ["run", "eat", "sleep"], difficulty: "easy", category: "Animals" },
  { id: 8, sentence: "The ___ is the king of animals.", correctWord: "lion", distractors: ["run", "jump", "swim"], difficulty: "easy", category: "Animals" },
  
  // Colors 顏色（形容詞題 → 干擾用名詞/動詞）
  { id: 9, sentence: "The apple is ___.", correctWord: "red", distractors: ["dog", "run", "book"], difficulty: "easy", category: "Colors" },
  { id: 10, sentence: "Grass is ___.", correctWord: "green", distractors: ["cat", "swim", "car"], difficulty: "easy", category: "Colors" },
  { id: 11, sentence: "The banana is ___.", correctWord: "yellow", distractors: ["fish", "jump", "pen"], difficulty: "easy", category: "Colors" },
  { id: 12, sentence: "Snow is ___.", correctWord: "white", distractors: ["bird", "run", "ball"], difficulty: "easy", category: "Colors" },
  { id: 13, sentence: "A panda is black and ___.", correctWord: "white", distractors: ["eat", "dog", "run"], difficulty: "easy", category: "Colors" },
  
  // Numbers 數字（數字題 → 干擾用其他詞性）
  { id: 14, sentence: "I have ___ eyes.", correctWord: "two", distractors: ["run", "dog", "happy"], difficulty: "easy", category: "Numbers" },
  { id: 15, sentence: "A spider has ___ legs.", correctWord: "eight", distractors: ["swim", "cat", "big"], difficulty: "easy", category: "Numbers" },
  { id: 16, sentence: "There are ___ fingers on one hand.", correctWord: "five", distractors: ["eat", "bird", "small"], difficulty: "easy", category: "Numbers" },
  { id: 17, sentence: "A triangle has ___ sides.", correctWord: "three", distractors: ["run", "fish", "red"], difficulty: "easy", category: "Numbers" },
  
  // Family 家人（名詞題 → 干擾用動詞/形容詞）
  { id: 18, sentence: "I love my ___.", correctWord: "mom", distractors: ["run", "big", "eat"], difficulty: "easy", category: "Family" },
  { id: 19, sentence: "My ___ goes to work.", correctWord: "dad", distractors: ["swim", "small", "jump"], difficulty: "easy", category: "Family" },
  { id: 20, sentence: "I play with my ___.", correctWord: "brother", distractors: ["run", "happy", "eat"], difficulty: "easy", category: "Family" },
  { id: 21, sentence: "My ___ is a baby.", correctWord: "sister", distractors: ["fly", "big", "swim"], difficulty: "easy", category: "Family" },
  
  // Food 食物（名詞題 → 干擾用動詞/形容詞）
  { id: 22, sentence: "I eat an ___.", correctWord: "apple", distractors: ["run", "happy", "swim"], difficulty: "easy", category: "Food" },
  { id: 23, sentence: "I like ___.", correctWord: "cake", distractors: ["jump", "big", "fly"], difficulty: "easy", category: "Food" },
  { id: 24, sentence: "I drink ___.", correctWord: "milk", distractors: ["run", "small", "eat"], difficulty: "easy", category: "Food" },
  { id: 25, sentence: "I want an ___.", correctWord: "orange", distractors: ["swim", "happy", "jump"], difficulty: "easy", category: "Food" },
  { id: 26, sentence: "I eat ___ for breakfast.", correctWord: "bread", distractors: ["run", "big", "fly"], difficulty: "easy", category: "Food" },
  
  // Body 身體（名詞題 → 干擾用動詞/形容詞）
  { id: 27, sentence: "I see with my ___.", correctWord: "eyes", distractors: ["run", "happy", "eat"], difficulty: "easy", category: "Body" },
  { id: 28, sentence: "I hear with my ___.", correctWord: "ears", distractors: ["swim", "big", "jump"], difficulty: "easy", category: "Body" },
  { id: 29, sentence: "I smell with my ___.", correctWord: "nose", distractors: ["fly", "small", "run"], difficulty: "easy", category: "Body" },
  { id: 30, sentence: "I clap my ___.", correctWord: "hands", distractors: ["eat", "happy", "swim"], difficulty: "easy", category: "Body" },
  { id: 31, sentence: "I walk with my ___.", correctWord: "feet", distractors: ["run", "big", "fly"], difficulty: "easy", category: "Body" },
  
  // Actions 動作（動詞題 → 干擾用名詞）
  { id: 32, sentence: "I can ___.", correctWord: "run", distractors: ["dog", "apple", "book"], difficulty: "easy", category: "Actions" },
  { id: 33, sentence: "I ___ to school.", correctWord: "go", distractors: ["cat", "ball", "pen"], difficulty: "easy", category: "Actions" },
  { id: 34, sentence: "I ___ breakfast.", correctWord: "eat", distractors: ["bird", "car", "desk"], difficulty: "easy", category: "Actions" },
  { id: 35, sentence: "I ___ a book.", correctWord: "read", distractors: ["fish", "hat", "cup"], difficulty: "easy", category: "Actions" },
  { id: 36, sentence: "I ___ in the pool.", correctWord: "swim", distractors: ["dog", "apple", "book"], difficulty: "easy", category: "Actions" },
  
  // ========== MEDIUM 中等 ==========
  
  // Daily Life 日常
  { id: 37, sentence: "I go to ___ every day.", correctWord: "school", distractors: ["run", "happy", "eat"], difficulty: "medium", category: "Daily" },
  { id: 38, sentence: "I sleep in my ___.", correctWord: "bed", distractors: ["swim", "big", "jump"], difficulty: "medium", category: "Daily" },
  { id: 39, sentence: "I brush my ___.", correctWord: "teeth", distractors: ["run", "happy", "fly"], difficulty: "medium", category: "Daily" },
  { id: 40, sentence: "I take a ___.", correctWord: "shower", distractors: ["eat", "big", "swim"], difficulty: "medium", category: "Daily" },
  { id: 41, sentence: "I watch ___.", correctWord: "TV", distractors: ["run", "happy", "jump"], difficulty: "medium", category: "Daily" },
  { id: 42, sentence: "I do my ___.", correctWord: "homework", distractors: ["swim", "big", "eat"], difficulty: "medium", category: "Daily" },
  
  // Places 地點
  { id: 43, sentence: "I play in the ___.", correctWord: "park", distractors: ["run", "happy", "eat"], difficulty: "medium", category: "Places" },
  { id: 44, sentence: "I swim in the ___.", correctWord: "pool", distractors: ["jump", "big", "fly"], difficulty: "medium", category: "Places" },
  { id: 45, sentence: "I live in a ___.", correctWord: "house", distractors: ["swim", "happy", "run"], difficulty: "medium", category: "Places" },
  { id: 46, sentence: "I buy food at the ___.", correctWord: "store", distractors: ["eat", "big", "jump"], difficulty: "medium", category: "Places" },
  { id: 47, sentence: "I read books in the ___.", correctWord: "library", distractors: ["run", "happy", "swim"], difficulty: "medium", category: "Places" },
  
  // Weather 天氣（形容詞題 → 干擾用名詞/動詞）
  { id: 48, sentence: "It is ___ today. The sun is out.", correctWord: "sunny", distractors: ["dog", "run", "book"], difficulty: "medium", category: "Weather" },
  { id: 49, sentence: "It is ___. I need an umbrella.", correctWord: "rainy", distractors: ["cat", "swim", "pen"], difficulty: "medium", category: "Weather" },
  { id: 50, sentence: "It is ___. I need a coat.", correctWord: "cold", distractors: ["bird", "jump", "ball"], difficulty: "medium", category: "Weather" },
  { id: 51, sentence: "It is ___. I need ice cream.", correctWord: "hot", distractors: ["fish", "run", "car"], difficulty: "medium", category: "Weather" },
  { id: 52, sentence: "It is ___. I cannot see far.", correctWord: "foggy", distractors: ["dog", "eat", "book"], difficulty: "medium", category: "Weather" },
  
  // Size/Adjectives（形容詞題 → 干擾用名詞/動詞）
  { id: 53, sentence: "An elephant is ___.", correctWord: "big", distractors: ["dog", "run", "apple"], difficulty: "medium", category: "Adjectives" },
  { id: 54, sentence: "An ant is ___.", correctWord: "small", distractors: ["cat", "swim", "book"], difficulty: "medium", category: "Adjectives" },
  { id: 55, sentence: "The rabbit is ___. It runs quickly.", correctWord: "fast", distractors: ["bird", "eat", "pen"], difficulty: "medium", category: "Adjectives" },
  { id: 56, sentence: "The turtle is ___. It walks slowly.", correctWord: "slow", distractors: ["fish", "jump", "ball"], difficulty: "medium", category: "Adjectives" },
  { id: 57, sentence: "The test is ___. I got 100!", correctWord: "easy", distractors: ["dog", "run", "car"], difficulty: "medium", category: "Adjectives" },
  
  // More Actions
  { id: 58, sentence: "I ___ a picture.", correctWord: "draw", distractors: ["dog", "apple", "book"], difficulty: "medium", category: "Actions" },
  { id: 59, sentence: "I ___ to music.", correctWord: "listen", distractors: ["cat", "ball", "pen"], difficulty: "medium", category: "Actions" },
  { id: 60, sentence: "I ___ with my friends.", correctWord: "play", distractors: ["bird", "car", "desk"], difficulty: "medium", category: "Actions" },
  { id: 61, sentence: "I ___ at night.", correctWord: "sleep", distractors: ["fish", "hat", "cup"], difficulty: "medium", category: "Actions" },
  { id: 62, sentence: "I ___ my mom.", correctWord: "help", distractors: ["dog", "apple", "book"], difficulty: "medium", category: "Actions" },
  
  // Time
  { id: 63, sentence: "Good ___! Time to wake up.", correctWord: "morning", distractors: ["run", "dog", "eat"], difficulty: "medium", category: "Time" },
  { id: 64, sentence: "Good ___! Time to sleep.", correctWord: "night", distractors: ["swim", "cat", "jump"], difficulty: "medium", category: "Time" },
  { id: 65, sentence: "I eat lunch at ___.", correctWord: "noon", distractors: ["fly", "bird", "run"], difficulty: "medium", category: "Time" },
  { id: 66, sentence: "I go to school on ___.", correctWord: "Monday", distractors: ["eat", "fish", "swim"], difficulty: "medium", category: "Time" },
  
  // ========== HARD 困難 ==========
  
  // Complex Daily
  { id: 67, sentence: "I ___ my teeth every morning.", correctWord: "brush", distractors: ["dog", "apple", "book"], difficulty: "hard", category: "Daily" },
  { id: 68, sentence: "My mom ___ dinner for us.", correctWord: "cooks", distractors: ["cat", "ball", "pen"], difficulty: "hard", category: "Daily" },
  { id: 69, sentence: "I ___ my hands before eating.", correctWord: "wash", distractors: ["bird", "car", "desk"], difficulty: "hard", category: "Daily" },
  { id: 70, sentence: "I ___ up at 7 o'clock.", correctWord: "wake", distractors: ["fish", "hat", "cup"], difficulty: "hard", category: "Daily" },
  
  // School
  { id: 71, sentence: "I ___ English at school.", correctWord: "learn", distractors: ["dog", "apple", "book"], difficulty: "hard", category: "School" },
  { id: 72, sentence: "The ___ teaches us.", correctWord: "teacher", distractors: ["run", "happy", "eat"], difficulty: "hard", category: "School" },
  { id: 73, sentence: "I write with a ___.", correctWord: "pencil", distractors: ["swim", "big", "jump"], difficulty: "hard", category: "School" },
  { id: 74, sentence: "I carry my books in my ___.", correctWord: "bag", distractors: ["fly", "small", "run"], difficulty: "hard", category: "School" },
  { id: 75, sentence: "I sit on a ___.", correctWord: "chair", distractors: ["eat", "happy", "swim"], difficulty: "hard", category: "School" },
  
  // Feelings（形容詞題 → 干擾用名詞/動詞）
  { id: 76, sentence: "I feel ___ when I play games.", correctWord: "happy", distractors: ["dog", "run", "book"], difficulty: "hard", category: "Feelings" },
  { id: 77, sentence: "I am ___ after running.", correctWord: "tired", distractors: ["cat", "swim", "pen"], difficulty: "hard", category: "Feelings" },
  { id: 78, sentence: "I feel ___ when I lose my toy.", correctWord: "sad", distractors: ["bird", "jump", "ball"], difficulty: "hard", category: "Feelings" },
  { id: 79, sentence: "I am ___ of the dark.", correctWord: "scared", distractors: ["fish", "run", "car"], difficulty: "hard", category: "Feelings" },
  
  // Transportation
  { id: 80, sentence: "I go to school by ___.", correctWord: "bus", distractors: ["run", "happy", "eat"], difficulty: "hard", category: "Transportation" },
  { id: 81, sentence: "My dad drives a ___.", correctWord: "car", distractors: ["swim", "big", "jump"], difficulty: "hard", category: "Transportation" },
  { id: 82, sentence: "I ride my ___.", correctWord: "bike", distractors: ["fly", "small", "run"], difficulty: "hard", category: "Transportation" },
  { id: 83, sentence: "The ___ flies in the sky.", correctWord: "airplane", distractors: ["eat", "happy", "swim"], difficulty: "hard", category: "Transportation" },
  
  // Nature
  { id: 84, sentence: "The ___ shines in the day.", correctWord: "sun", distractors: ["run", "happy", "eat"], difficulty: "hard", category: "Nature" },
  { id: 85, sentence: "The ___ shines at night.", correctWord: "moon", distractors: ["swim", "big", "jump"], difficulty: "hard", category: "Nature" },
  { id: 86, sentence: "I plant a ___ in the garden.", correctWord: "flower", distractors: ["fly", "small", "run"], difficulty: "hard", category: "Nature" },
  { id: 87, sentence: "The ___ falls from the tree.", correctWord: "leaf", distractors: ["eat", "happy", "swim"], difficulty: "hard", category: "Nature" },
  
  // Complex Actions
  { id: 88, sentence: "Please ___ the door.", correctWord: "open", distractors: ["dog", "apple", "book"], difficulty: "hard", category: "Actions" },
  { id: 89, sentence: "Please ___ the light.", correctWord: "turn", distractors: ["cat", "ball", "pen"], difficulty: "hard", category: "Actions" },
  { id: 90, sentence: "I ___ a song.", correctWord: "sing", distractors: ["bird", "car", "desk"], difficulty: "hard", category: "Actions" },
];

// 取得打亂的選項
export function getShuffledOptions(question: FillBlankData): string[] {
  const options = [question.correctWord, ...question.distractors];
  for (let i = options.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [options[i], options[j]] = [options[j], options[i]];
  }
  return options;
}

export const fillBlankStats = {
  total: fillBlankQuestions.length,
  easy: fillBlankQuestions.filter(q => q.difficulty === 'easy').length,
  medium: fillBlankQuestions.filter(q => q.difficulty === 'medium').length,
  hard: fillBlankQuestions.filter(q => q.difficulty === 'hard').length,
};
