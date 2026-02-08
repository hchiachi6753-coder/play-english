'use client';

import { useState, useEffect, useCallback } from 'react';
import { useGameStore } from '@/stores/gameStore';
import { Feedback } from '@/components/game/Feedback';

export function GamePage() {
  const {
    questions,
    currentQuestionIndex,
    childInfo,
    results,
    startQuestion,
    submitAnswer,
    nextQuestion,
  } = useGameStore();

  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];
  const correctCount = results.filter(r => r.isCorrect).length;

  useEffect(() => {
    startQuestion();
    setSelectedAnswer(null);
    setShowResult(false);
    setShowFeedback(false);
  }, [currentQuestionIndex, startQuestion]);

  const handleSelectAnswer = (answer: string) => {
    if (showResult) return;
    
    setSelectedAnswer(answer);
    setShowResult(true);
    
    const correct = answer === currentQuestion.correctWord;
    setIsCorrect(correct);
    
    submitAnswer(answer);
    
    setTimeout(() => {
      setShowFeedback(true);
    }, 400);
  };

  const handleFeedbackComplete = useCallback(() => {
    setShowFeedback(false);
    nextQuestion();
  }, [nextQuestion]);

  if (!currentQuestion) {
    return (
      <div style={{ textAlign: 'center', padding: '40px' }}>
        <div style={{ fontSize: '60px' }}>⏳</div>
        <p style={{ fontSize: '20px', color: 'white', marginTop: '16px' }}>Loading...</p>
      </div>
    );
  }

  // 把句子中的 ___ 高亮顯示
  const renderSentence = () => {
    const parts = currentQuestion.sentence.split('___');
    return (
      <span>
        {parts[0]}
        <span style={{
          display: 'inline-block',
          minWidth: '80px',
          borderBottom: '4px solid #FF6B35',
          margin: '0 4px',
          color: showResult ? '#FF6B35' : 'transparent',
          fontWeight: '700',
        }}>
          {showResult ? currentQuestion.correctWord : '____'}
        </span>
        {parts[1]}
      </span>
    );
  };

  return (
    <div>
      {/* 頂部資訊 */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '16px',
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          background: 'rgba(255,255,255,0.9)',
          padding: '8px 16px',
          borderRadius: '20px',
        }}>
          <span style={{ fontSize: '24px' }}>👋</span>
          <span style={{ fontSize: '18px', fontWeight: '700' }}>{childInfo?.name}</span>
        </div>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          background: 'linear-gradient(135deg, #FFD700, #FFA500)',
          padding: '8px 16px',
          borderRadius: '20px',
          color: 'white',
        }}>
          <span style={{ fontSize: '24px' }}>⭐</span>
          <span style={{ fontSize: '20px', fontWeight: '800' }}>{correctCount}</span>
        </div>
      </div>

      {/* 進度 */}
      <div style={{ marginBottom: '16px' }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: '8px',
          color: 'white',
          fontWeight: '700',
          fontSize: '16px',
          textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
        }}>
          <span>Question {currentQuestionIndex + 1}</span>
          <span>of {questions.length}</span>
        </div>
        <div style={{
          height: '12px',
          background: 'rgba(255,255,255,0.3)',
          borderRadius: '6px',
          overflow: 'hidden',
        }}>
          <div style={{
            height: '100%',
            width: `${((currentQuestionIndex + 1) / questions.length) * 100}%`,
            background: 'linear-gradient(90deg, #FFD700, #FF6B35, #FF69B4)',
            borderRadius: '6px',
            transition: 'width 0.3s ease',
          }} />
        </div>
      </div>

      {/* 題目卡片 */}
      <div style={{
        background: 'white',
        borderRadius: '24px',
        padding: '24px',
        marginBottom: '16px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
        textAlign: 'center',
      }}>
        {/* 難度標籤 */}
        <div style={{
          display: 'inline-block',
          padding: '6px 14px',
          borderRadius: '20px',
          fontSize: '14px',
          fontWeight: '700',
          marginBottom: '16px',
          background: currentQuestion.difficulty === 'easy' ? '#E8F5E9' 
            : currentQuestion.difficulty === 'medium' ? '#FFF3E0' 
            : '#FFEBEE',
          color: currentQuestion.difficulty === 'easy' ? '#2E7D32'
            : currentQuestion.difficulty === 'medium' ? '#E65100'
            : '#C62828',
        }}>
          {currentQuestion.difficulty === 'easy' ? '😊 Easy' 
            : currentQuestion.difficulty === 'medium' ? '🤔 Medium' 
            : '💪 Hard'}
        </div>

        {/* 指示 */}
        <p style={{ fontSize: '16px', color: '#666', marginBottom: '12px' }}>
          Choose the correct word:
        </p>

        {/* 句子 */}
        <p style={{
          fontSize: '28px',
          fontWeight: '600',
          color: '#333',
          lineHeight: '1.5',
        }}>
          {renderSentence()}
        </p>
      </div>

      {/* 選項 */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
        {currentQuestion.options.map((option, index) => {
          const isSelected = selectedAnswer === option;
          const isCorrectAnswer = option === currentQuestion.correctWord;
          
          let bgColor = 'white';
          let borderColor = '#E0E0E0';
          let textColor = '#333';
          
          if (showResult) {
            if (isCorrectAnswer) {
              bgColor = 'linear-gradient(135deg, #2ECC71, #27AE60)';
              borderColor = '#27AE60';
              textColor = 'white';
            } else if (isSelected && !isCorrectAnswer) {
              bgColor = 'linear-gradient(135deg, #E74C3C, #C0392B)';
              borderColor = '#C0392B';
              textColor = 'white';
            }
          }

          return (
            <button
              key={index}
              onClick={() => handleSelectAnswer(option)}
              disabled={showResult}
              style={{
                padding: '20px 16px',
                fontSize: '24px',
                fontWeight: '700',
                background: bgColor,
                color: textColor,
                border: `4px solid ${borderColor}`,
                borderRadius: '16px',
                cursor: showResult ? 'default' : 'pointer',
                transition: 'all 0.15s',
                boxShadow: showResult && isCorrectAnswer 
                  ? '0 4px 12px rgba(46,204,113,0.4)'
                  : '0 4px 0 #D0D0D0',
              }}
            >
              {option}
            </button>
          );
        })}
      </div>

      {/* 回饋動畫 */}
      {showFeedback && (
        <Feedback
          isCorrect={isCorrect}
          correctAnswer={currentQuestion.correctWord}
          onComplete={handleFeedbackComplete}
        />
      )}
    </div>
  );
}
