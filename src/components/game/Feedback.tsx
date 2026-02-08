'use client';

import { useEffect, useState } from 'react';

interface FeedbackProps {
  isCorrect: boolean;
  correctAnswer: string;
  onComplete: () => void;
}

export function Feedback({ isCorrect, correctAnswer, onComplete }: FeedbackProps) {
  const [show, setShow] = useState(true);
  const [confetti, setConfetti] = useState<Array<{ id: number; left: number; delay: number; color: string }>>([]);

  useEffect(() => {
    // 答對時產生煙火效果
    if (isCorrect) {
      const particles = Array.from({ length: 30 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 0.5,
        color: ['#FFD700', '#FFA500', '#FF6347', '#FF69B4', '#00CED1', '#32CD32'][Math.floor(Math.random() * 6)],
      }));
      setConfetti(particles);
    }

    const timer = setTimeout(() => {
      setShow(false);
      setTimeout(onComplete, 200);
    }, 1500);

    return () => clearTimeout(timer);
  }, [isCorrect, onComplete]);

  const correctMessages = ['Great!', 'Excellent!', 'Awesome!', 'Amazing!', 'Fantastic!', 'Perfect!', 'Wonderful!', 'Super!', 'Brilliant!', 'Well Done!'];
  const incorrectMessages = ['Try Again!', 'Keep Going!', 'You Got This!', 'Almost!', 'So Close!', 'Nice Try!'];

  const message = isCorrect
    ? correctMessages[Math.floor(Math.random() * correctMessages.length)]
    : incorrectMessages[Math.floor(Math.random() * incorrectMessages.length)];

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 100,
      background: isCorrect
        ? 'linear-gradient(135deg, #FFD700 0%, #FFA500 50%, #FF8C00 100%)'
        : 'linear-gradient(135deg, #FF6B6B 0%, #EE5A5A 100%)',
      opacity: show ? 1 : 0,
      transition: 'opacity 0.2s ease',
    }}>
      {/* 煙火粒子 */}
      {isCorrect && confetti.map((particle) => (
        <div
          key={particle.id}
          style={{
            position: 'absolute',
            left: `${particle.left}%`,
            top: '-20px',
            width: '12px',
            height: '12px',
            borderRadius: '50%',
            background: particle.color,
            animation: `fall 1.5s ease-out ${particle.delay}s forwards`,
            boxShadow: `0 0 10px ${particle.color}`,
          }}
        />
      ))}

      {/* 中央內容 */}
      <div style={{
        textAlign: 'center',
        transform: show ? 'scale(1)' : 'scale(0.8)',
        transition: 'transform 0.2s ease',
      }}>
        {/* 大表情 */}
        <div style={{
          fontSize: '120px',
          marginBottom: '20px',
          animation: isCorrect ? 'bounce 0.5s ease infinite' : 'shake 0.5s ease',
          filter: 'drop-shadow(0 10px 30px rgba(0,0,0,0.3))',
        }}>
          {isCorrect ? '🎉' : '💪'}
        </div>

        {/* 文字 */}
        <h2 style={{
          fontSize: '48px',
          fontWeight: '900',
          color: 'white',
          margin: '0 0 10px 0',
          textShadow: '3px 3px 0 rgba(0,0,0,0.2)',
        }}>
          {message}
        </h2>

        {/* 星星裝飾 */}
        {isCorrect && (
          <div style={{ fontSize: '40px', marginBottom: '10px' }}>
            ⭐ ⭐ ⭐
          </div>
        )}

        {/* 答錯時顯示正確答案 */}
        {!isCorrect && (
          <div style={{
            background: 'rgba(255,255,255,0.2)',
            borderRadius: '16px',
            padding: '16px 24px',
            marginTop: '20px',
          }}>
            <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.8)', margin: '0 0 8px 0' }}>
              The answer is
            </p>
            <p style={{ fontSize: '28px', fontWeight: '700', color: 'white', margin: 0 }}>
              {correctAnswer}
            </p>
          </div>
        )}

        {/* 提示 */}
        <p style={{
          fontSize: '20px',
          color: 'rgba(255,255,255,0.8)',
          marginTop: '20px',
        }}>
          {isCorrect ? 'Next Question →' : 'Let\'s keep going!'}
        </p>
      </div>

      {/* CSS 動畫 */}
      <style jsx>{`
        @keyframes fall {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }
        @keyframes bounce {
          0%, 100% { transform: scale(1) rotate(-5deg); }
          50% { transform: scale(1.1) rotate(5deg); }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-10px); }
          75% { transform: translateX(10px); }
        }
      `}</style>
    </div>
  );
}
