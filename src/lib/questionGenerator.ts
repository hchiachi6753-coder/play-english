import { FillBlankQuestion } from '@/stores/gameStore';
import { fillBlankQuestions, getShuffledOptions, FillBlankData } from '@/data/fill-blank-questions';

// 打亂陣列
function shuffle<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// 計算題目使用次數
function countUsage(usedIds: number[]): Map<number, number> {
  const counts = new Map<number, number>();
  usedIds.forEach(id => {
    counts.set(id, (counts.get(id) || 0) + 1);
  });
  return counts;
}

// 生成 30 道填空題
// excludeIds: 已經玩過的題目 IDs（同一用戶連續玩時傳入）
// maxRepeat: 最多重複幾次（預設 2 次）
export function generateQuestions(
  totalQuestions: number = 30, 
  excludeIds: number[] = [],
  maxRepeat: number = 2
): FillBlankQuestion[] {
  
  // 計算每個題目被用過幾次
  const usageCount = countUsage(excludeIds);
  
  // 過濾掉用過太多次的題目
  const availableQuestions = fillBlankQuestions.filter(q => {
    const count = usageCount.get(q.id) || 0;
    return count < maxRepeat;
  });
  
  // 如果剩餘題目不夠，就重置（允許重複）
  const questionPool = availableQuestions.length >= totalQuestions 
    ? availableQuestions 
    : fillBlankQuestions;
  
  // 難度分佈：簡單 40%、中等 35%、困難 25%
  const easyCount = Math.floor(totalQuestions * 0.4);   // 12
  const mediumCount = Math.floor(totalQuestions * 0.35); // 10
  const hardCount = totalQuestions - easyCount - mediumCount; // 8
  
  // 按難度分類
  const easyQuestions = shuffle(questionPool.filter(q => q.difficulty === 'easy'));
  const mediumQuestions = shuffle(questionPool.filter(q => q.difficulty === 'medium'));
  const hardQuestions = shuffle(questionPool.filter(q => q.difficulty === 'hard'));
  
  // 選取題目
  const selectedEasy = easyQuestions.slice(0, easyCount);
  const selectedMedium = mediumQuestions.slice(0, mediumCount);
  const selectedHard = hardQuestions.slice(0, hardCount);
  
  // 前 5 題用簡單題（暖身 + 在家長表單前給小孩信心）
  const warmup = selectedEasy.slice(0, 5);
  const remainingEasy = selectedEasy.slice(5);
  
  // 剩餘題目混合
  const remaining = shuffle([...remainingEasy, ...selectedMedium, ...selectedHard]);
  
  // 組合並轉換格式
  const allQuestions: FillBlankData[] = [...warmup, ...remaining];
  
  return allQuestions.slice(0, totalQuestions).map((q) => ({
    id: q.id,  // 保留原始 ID，用於追蹤
    sentence: q.sentence,
    correctWord: q.correctWord,
    options: getShuffledOptions(q),
    difficulty: q.difficulty,
    category: q.category,
  }));
}
