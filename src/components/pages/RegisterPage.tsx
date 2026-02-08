'use client';

import { useState } from 'react';
import { useGameStore } from '@/stores/gameStore';

export function RegisterPage() {
  const { setChildInfo, setPhase, startGame } = useGameStore();
  const [name, setName] = useState('');
  const [age, setAge] = useState<number | null>(null);

  const handleStart = () => {
    if (name.trim() && age) {
      setChildInfo({ name: name.trim(), age });
      startGame();
    }
  };

  const ages = [4, 5, 6, 7, 8, 9, 10, 11, 12];
  const isValid = name.trim().length > 0 && age !== null;

  return (
    <div style={{ textAlign: 'center', paddingBottom: '20px' }}>
      {/* 標題 */}
      <div style={{ fontSize: '70px', marginBottom: '10px' }}>👋</div>
      <h1 style={{
        fontSize: '32px',
        fontWeight: '800',
        color: 'white',
        textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
        marginBottom: '20px',
      }}>
        你好呀！
      </h1>

      {/* 表單卡片 */}
      <div style={{
        background: 'white',
        borderRadius: '30px',
        padding: '30px',
        boxShadow: '0 10px 40px rgba(0,0,0,0.15)',
        marginBottom: '20px',
      }}>
        {/* 名字輸入 */}
        <div style={{ marginBottom: '30px' }}>
          <label style={{
            display: 'block',
            fontSize: '22px',
            fontWeight: '700',
            color: '#333',
            marginBottom: '12px',
          }}>
            <span style={{ fontSize: '30px', marginRight: '8px' }}>✏️</span>
            你叫什麼名字？
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="輸入名字"
            maxLength={10}
            style={{
              width: '100%',
              padding: '16px',
              fontSize: '24px',
              textAlign: 'center',
              border: '4px solid #E0E0E0',
              borderRadius: '16px',
              outline: 'none',
              boxSizing: 'border-box',
            }}
          />
        </div>

        {/* 年齡選擇 */}
        <div>
          <label style={{
            display: 'block',
            fontSize: '22px',
            fontWeight: '700',
            color: '#333',
            marginBottom: '16px',
          }}>
            <span style={{ fontSize: '30px', marginRight: '8px' }}>🎂</span>
            你幾歲了？
          </label>
          
          {/* 年齡按鈕網格 */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '12px',
          }}>
            {ages.map((a) => (
              <button
                key={a}
                onClick={() => setAge(a)}
                style={{
                  padding: '20px 0',
                  fontSize: '28px',
                  fontWeight: '700',
                  border: 'none',
                  borderRadius: '16px',
                  cursor: 'pointer',
                  transition: 'all 0.15s',
                  background: age === a 
                    ? 'linear-gradient(135deg, #2ECC71 0%, #27AE60 100%)'
                    : '#F0F0F0',
                  color: age === a ? 'white' : '#333',
                  boxShadow: age === a 
                    ? '0 4px 12px rgba(46,204,113,0.4)'
                    : 'none',
                  transform: age === a ? 'scale(1.05)' : 'scale(1)',
                }}
              >
                {a} 歲
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 按鈕區 */}
      <div style={{ display: 'flex', gap: '12px', paddingBottom: '16px' }}>
        <button
          onClick={() => setPhase('welcome')}
          style={{
            flex: 1,
            padding: '18px',
            fontSize: '20px',
            fontWeight: '700',
            background: 'white',
            color: '#666',
            border: 'none',
            borderRadius: '16px',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          }}
        >
          ← 返回
        </button>
        <button
          onClick={handleStart}
          disabled={!isValid}
          className={isValid ? 'cta-button-green' : ''}
          style={{
            flex: 2,
            padding: '18px',
            fontSize: '24px',
            fontWeight: '800',
            color: 'white',
            background: isValid 
              ? 'linear-gradient(135deg, #2ECC71 0%, #27AE60 100%)'
              : '#CCC',
            border: 'none',
            borderRadius: '16px',
            cursor: isValid ? 'pointer' : 'not-allowed',
            boxShadow: isValid ? '0 6px 0 #1E8449' : 'none',
          }}
        >
          開始！🎮
        </button>
      </div>
    </div>
  );
}
