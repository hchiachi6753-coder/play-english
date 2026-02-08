'use client';

import { Question } from '@/stores/gameStore';
import { cn } from '@/lib/utils';

interface QuestionCardProps {
  question: Question;
  className?: string;
}

export function QuestionCard({ question, className }: QuestionCardProps) {
  const isWordQuestion = question.type === 'word-en-to-zh' || question.type === 'word-zh-to-en';
  const isSentenceQuestion = question.type === 'sentence';

  // 題目文字
  const getQuestionText = () => {
    if (isWordQuestion && question.word) {
      if (question.type === 'word-en-to-zh') {
        return question.word.english;
      } else {
        return question.word.chinese;
      }
    }
    if (isSentenceQuestion && question.sentence) {
      return question.sentence.english;
    }
    return '';
  };

  // 提示文字
  const getHintText = () => {
    if (question.type === 'word-en-to-zh') {
      return '這個英文單字是什麼意思？';
    }
    if (question.type === 'word-zh-to-en') {
      return '這個中文怎麼說？';
    }
    if (question.type === 'sentence') {
      return '這句話是什麼意思？';
    }
    return '';
  };

  // 難度標籤
  const getDifficultyBadge = () => {
    const badges = {
      easy: { text: '簡單', color: 'bg-emerald-100 text-emerald-700' },
      medium: { text: '中等', color: 'bg-amber-100 text-amber-700' },
      hard: { text: '進階', color: 'bg-rose-100 text-rose-700' },
    };
    const badge = badges[question.difficulty];
    return (
      <span className={cn('px-3 py-1 rounded-full text-sm font-medium', badge.color)}>
        {badge.text}
      </span>
    );
  };

  return (
    <div
      className={cn(
        'bg-white rounded-3xl p-6 shadow-lg',
        'border-2 border-orange-100',
        className
      )}
    >
      {/* 上方資訊 */}
      <div className="flex items-center justify-between mb-4">
        {getDifficultyBadge()}
        <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
          {question.category}
        </span>
      </div>

      {/* 提示文字 */}
      <p className="text-gray-500 text-center mb-4 text-sm">
        {getHintText()}
      </p>

      {/* 題目文字 */}
      <div className="text-center">
        <p
          className={cn(
            'font-bold text-gray-800',
            isSentenceQuestion ? 'text-xl leading-relaxed' : 'text-3xl',
            question.type === 'word-zh-to-en' ? 'text-2xl' : ''
          )}
        >
          {getQuestionText()}
        </p>
      </div>
    </div>
  );
}
