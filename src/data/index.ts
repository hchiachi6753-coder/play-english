// 單字資料庫索引
// 國小 300 字 (免費) + 國中進階 800 字 (需填表解鎖)

import { Word, elementaryWords, categories as elementaryCategories } from './elementary-words';
import { juniorHighWords, juniorHighCategories } from './junior-high-words';

export type { Word };

// 所有單字 (國小 + 國中)
export const allWords: Word[] = [...elementaryWords, ...juniorHighWords];

// 免費單字 (國小 300 字)
export const freeWords: Word[] = elementaryWords;

// 進階單字 (國中 800 字，需填表解鎖)
export const premiumWords: Word[] = juniorHighWords;

// 所有分類
export const allCategories = [...new Set([...elementaryCategories, ...juniorHighCategories])];

// 取得特定分類的單字
export function getWordsByCategory(category: string, includePremium: boolean = false): Word[] {
  const words = includePremium ? allWords : freeWords;
  return words.filter(w => w.category === category);
}

// 取得隨機單字
export function getRandomWords(count: number, includePremium: boolean = false): Word[] {
  const words = includePremium ? allWords : freeWords;
  const shuffled = [...words].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

// 取得指定難度的單字
export function getWordsByDifficulty(difficulty: 'easy' | 'medium' | 'hard', includePremium: boolean = false): Word[] {
  const words = includePremium ? allWords : freeWords;
  
  if (difficulty === 'easy') {
    // 簡單：3-5 字母的單字
    return words.filter(w => w.english.length >= 3 && w.english.length <= 5);
  } else if (difficulty === 'medium') {
    // 中等：6-8 字母的單字
    return words.filter(w => w.english.length >= 6 && w.english.length <= 8);
  } else {
    // 困難：9+ 字母的單字或片語
    return words.filter(w => w.english.length >= 9 || w.english.includes(' '));
  }
}

// 統計資訊
export const wordStats = {
  totalFree: freeWords.length,
  totalPremium: premiumWords.length,
  total: allWords.length,
  categoriesCount: allCategories.length,
};

console.log(`📚 單字資料庫已載入：免費 ${wordStats.totalFree} 字 + 進階 ${wordStats.totalPremium} 字 = 共 ${wordStats.total} 字`);
