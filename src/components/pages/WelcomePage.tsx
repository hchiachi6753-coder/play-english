'use client';

import { useGameStore } from '@/stores/gameStore';

export function WelcomePage() {
  const setPhase = useGameStore((state) => state.setPhase);

  return (
    <div style={{ textAlign: 'center' }}>
      {/* 主卡片 */}
      <div style={{
        background: 'white',
        borderRadius: '30px',
        padding: '40px 30px',
        boxShadow: '0 10px 40px rgba(0,0,0,0.15)',
        marginBottom: '20px',
      }}>
        {/* 遊戲圖標 */}
        <div style={{ fontSize: '80px', marginBottom: '10px' }}>🌟</div>
        
        {/* 標題 */}
        <h1 style={{
          fontSize: '42px',
          fontWeight: '900',
          color: '#FF6B35',
          margin: '0 0 10px 0',
        }}>
          Play English
        </h1>
        
        <p style={{
          fontSize: '22px',
          color: '#666',
          margin: 0,
        }}>
          英文單字小遊戲
        </p>
      </div>

      {/* 說明卡片 */}
      <div style={{
        background: 'white',
        borderRadius: '24px',
        padding: '24px',
        boxShadow: '0 8px 30px rgba(0,0,0,0.1)',
        marginBottom: '20px',
        textAlign: 'left',
      }}>
        <h2 style={{
          fontSize: '24px',
          fontWeight: '700',
          color: '#FF6B35',
          textAlign: 'center',
          marginBottom: '20px',
        }}>
          🎯 怎麼玩？
        </h2>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <span style={{ fontSize: '40px' }}>📝</span>
            <span style={{ fontSize: '20px', fontWeight: '500' }}>看題目，選答案！</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <span style={{ fontSize: '40px' }}>⭐</span>
            <span style={{ fontSize: '20px', fontWeight: '500' }}>答對得星星！</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <span style={{ fontSize: '40px' }}>🏆</span>
            <span style={{ fontSize: '20px', fontWeight: '500' }}>看你的英文程度！</span>
          </div>
        </div>
      </div>

      {/* 超大開始按鈕 - 帶動畫 */}
      <button
        onClick={() => setPhase('register')}
        className="cta-button"
        style={{
          width: '100%',
          padding: '24px',
          fontSize: '32px',
          fontWeight: '800',
          color: 'white',
          background: 'linear-gradient(135deg, #FF6B35 0%, #F7931E 100%)',
          border: 'none',
          borderRadius: '20px',
          cursor: 'pointer',
          boxShadow: '0 8px 0 #D4541E, 0 12px 20px rgba(0,0,0,0.2)',
          marginBottom: '16px',
        }}
      >
        🚀 開始玩！
      </button>

      {/* 底部文字 */}
      <p style={{
        fontSize: '18px',
        color: 'white',
        fontWeight: '600',
        textShadow: '1px 1px 3px rgba(0,0,0,0.3)',
      }}>
        適合 4-12 歲小朋友 ❤️
      </p>

    </div>
  );
}
