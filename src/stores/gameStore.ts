import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// 填空題類型
export interface FillBlankQuestion {
  id: number;
  sentence: string;        // 有 ___ 的句子
  correctWord: string;     // 正確答案
  options: string[];       // 4 個選項
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
}

// 單題結果
export interface QuestionResult {
  questionId: number;
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
  isCorrect: boolean;
  timeSpent: number;
  selectedAnswer: string;
  correctAnswer: string;
}

// 小孩資料
export interface ChildInfo {
  name: string;
  age: number;
}

// 家長資料
export interface ParentInfo {
  name: string;
  phone: string;
  referralCode?: string;  // 這個用戶的分享碼
  referredBy?: string;    // 被誰分享來的（推薦碼）
  salesSource?: string;   // 業務來源（哪個業務的連結）
  referrerName?: string;  // 推薦人姓名（如果是客戶轉介紹）
}

// 程度報告
export interface LevelReport {
  totalQuestions: number;
  correctCount: number;
  accuracy: number;
  totalTime: number;
  difficultyBreakdown: {
    easy: { correct: number; total: number; accuracy: number };
    medium: { correct: number; total: number; accuracy: number };
    hard: { correct: number; total: number; accuracy: number };
  };
  categoryBreakdown: Record<string, { correct: number; total: number; accuracy: number }>;
  strengths: string[];
  weaknesses: string[];
  level: 'beginner' | 'elementary-1' | 'elementary-2' | 'elementary-3' | 'junior-high';
  levelLabel: string;
  recommendations: string[];
}

// 遊戲狀態
interface GameState {
  phase: 'welcome' | 'register' | 'playing' | 'parent-form' | 'report' | 'booking';
  childInfo: ChildInfo | null;
  parentInfo: ParentInfo | null;
  questions: FillBlankQuestion[];
  currentQuestionIndex: number;
  results: QuestionResult[];
  gameStartTime: number | null;
  questionStartTime: number | null;
  report: LevelReport | null;
  hasFilledParentForm: boolean;
  usedQuestionIds: number[];  // 追蹤同一用戶玩過的題目

  // Actions
  setPhase: (phase: GameState['phase']) => void;
  setChildInfo: (info: ChildInfo) => void;
  setParentInfo: (info: ParentInfo) => void;
  setQuestions: (questions: FillBlankQuestion[]) => void;
  startGame: () => void;
  startQuestion: () => void;
  submitAnswer: (answer: string) => void;
  nextQuestion: () => void;
  continueFromParentForm: () => void;
  generateReport: () => void;
  resetGame: () => void;
  continueWithNewQuestions: () => void;  // 同一用戶繼續玩（不重複題目）
  getUsedIds: () => number[];  // 取得已用過的題目 IDs
}

export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      phase: 'welcome',
      childInfo: null,
      parentInfo: null,
      questions: [],
      currentQuestionIndex: 0,
      results: [],
      gameStartTime: null,
      questionStartTime: null,
      report: null,
      hasFilledParentForm: false,
      usedQuestionIds: [],

      setPhase: (phase) => set({ phase }),
      
      setChildInfo: (info) => set({ childInfo: info }),
      
      setParentInfo: (info) => set({ 
        parentInfo: info, 
        hasFilledParentForm: true 
      }),
      
      setQuestions: (questions) => set({ questions }),
      
      startGame: () => set({ 
        gameStartTime: Date.now(),
        currentQuestionIndex: 0,
        results: [],
        phase: 'playing'
      }),
      
      startQuestion: () => set({ 
        questionStartTime: Date.now() 
      }),
      
      submitAnswer: (answer) => {
        const state = get();
        const currentQuestion = state.questions[state.currentQuestionIndex];
        const timeSpent = state.questionStartTime 
          ? Date.now() - state.questionStartTime 
          : 0;
        
        const result: QuestionResult = {
          questionId: currentQuestion.id,
          difficulty: currentQuestion.difficulty,
          category: currentQuestion.category,
          isCorrect: answer === currentQuestion.correctWord,
          timeSpent,
          selectedAnswer: answer,
          correctAnswer: currentQuestion.correctWord,
        };
        
        set({ 
          results: [...state.results, result],
          questionStartTime: null
        });
      },
      
      nextQuestion: () => {
        const state = get();
        const nextIndex = state.currentQuestionIndex + 1;
        
        // 第 8 題後顯示家長表單（如果還沒填過）
        if (nextIndex === 8 && !state.hasFilledParentForm) {
          set({ 
            phase: 'parent-form',
            currentQuestionIndex: nextIndex  // 記住下一題位置
          });
          return;
        }
        
        // 遊戲結束
        if (nextIndex >= state.questions.length) {
          get().generateReport();
          set({ phase: 'report' });
          return;
        }
        
        set({ currentQuestionIndex: nextIndex });
      },

      // 從家長表單繼續遊戲
      continueFromParentForm: () => {
        set({ phase: 'playing' });
      },
      
      generateReport: () => {
        const state = get();
        const results = state.results;
        
        const totalQuestions = results.length;
        const correctCount = results.filter(r => r.isCorrect).length;
        const accuracy = totalQuestions > 0 ? (correctCount / totalQuestions) * 100 : 0;
        const totalTime = state.gameStartTime ? Date.now() - state.gameStartTime : 0;
        
        const difficultyBreakdown = {
          easy: { correct: 0, total: 0, accuracy: 0 },
          medium: { correct: 0, total: 0, accuracy: 0 },
          hard: { correct: 0, total: 0, accuracy: 0 },
        };
        
        results.forEach(r => {
          difficultyBreakdown[r.difficulty].total++;
          if (r.isCorrect) difficultyBreakdown[r.difficulty].correct++;
        });
        
        Object.keys(difficultyBreakdown).forEach(key => {
          const d = difficultyBreakdown[key as keyof typeof difficultyBreakdown];
          d.accuracy = d.total > 0 ? (d.correct / d.total) * 100 : 0;
        });
        
        const categoryBreakdown: Record<string, { correct: number; total: number; accuracy: number }> = {};
        
        results.forEach(r => {
          if (!categoryBreakdown[r.category]) {
            categoryBreakdown[r.category] = { correct: 0, total: 0, accuracy: 0 };
          }
          categoryBreakdown[r.category].total++;
          if (r.isCorrect) categoryBreakdown[r.category].correct++;
        });
        
        Object.keys(categoryBreakdown).forEach(key => {
          const c = categoryBreakdown[key];
          c.accuracy = c.total > 0 ? (c.correct / c.total) * 100 : 0;
        });
        
        const strengths = Object.entries(categoryBreakdown)
          .filter(([_, data]) => data.accuracy >= 80 && data.total >= 2)
          .map(([category]) => category);
        
        const weaknesses = Object.entries(categoryBreakdown)
          .filter(([_, data]) => data.accuracy < 50 && data.total >= 2)
          .map(([category]) => category);
        
        let level: LevelReport['level'];
        let levelLabel: string;
        
        if (accuracy >= 85 && difficultyBreakdown.hard.accuracy >= 70) {
          level = 'junior-high';
          levelLabel = '國中程度';
        } else if (accuracy >= 75 && difficultyBreakdown.medium.accuracy >= 70) {
          level = 'elementary-3';
          levelLabel = '國小高年級程度';
        } else if (accuracy >= 60 && difficultyBreakdown.easy.accuracy >= 80) {
          level = 'elementary-2';
          levelLabel = '國小中年級程度';
        } else if (accuracy >= 40) {
          level = 'elementary-1';
          levelLabel = '國小低年級程度';
        } else {
          level = 'beginner';
          levelLabel = '初學者';
        }
        
        const recommendations: string[] = [];
        if (weaknesses.length > 0) {
          recommendations.push(`建議加強「${weaknesses.slice(0, 3).join('、')}」相關單字`);
        }
        if (difficultyBreakdown.hard.accuracy < 50) {
          recommendations.push('可以多練習進階單字和句子');
        }
        if (accuracy < 60) {
          recommendations.push('建議從基礎單字開始，每天練習 10-15 分鐘');
        } else if (accuracy >= 80) {
          recommendations.push('表現優秀！可以挑戰更多進階內容');
        }
        recommendations.push('持續練習是進步的關鍵，加油！');
        
        set({
          report: {
            totalQuestions,
            correctCount,
            accuracy,
            totalTime,
            difficultyBreakdown,
            categoryBreakdown,
            strengths,
            weaknesses,
            level,
            levelLabel,
            recommendations,
          }
        });
      },
      
      resetGame: () => set({
        phase: 'welcome',
        childInfo: null,
        parentInfo: null,
        questions: [],
        currentQuestionIndex: 0,
        results: [],
        gameStartTime: null,
        questionStartTime: null,
        report: null,
        hasFilledParentForm: false,
        usedQuestionIds: [],  // 新用戶清空已用題目
      }),

      // 同一用戶繼續玩（記錄已用過的題目）
      continueWithNewQuestions: () => {
        const state = get();
        // 把這輪玩過的題目加入已用清單
        const newUsedIds = [
          ...state.usedQuestionIds,
          ...state.questions.map(q => q.id)
        ];
        set({
          usedQuestionIds: newUsedIds,
          questions: [],
          currentQuestionIndex: 0,
          results: [],
          gameStartTime: null,
          questionStartTime: null,
          report: null,
          // 保留 childInfo, parentInfo, hasFilledParentForm
        });
      },

      getUsedIds: () => get().usedQuestionIds,
    }),
    {
      name: 'play-english-game',
      // 不再 persist hasFilledParentForm，每次重新開始都要填表單
      // 這樣才能正常測試流程
      partialize: () => ({}),
    }
  )
);
