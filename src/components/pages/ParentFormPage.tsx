'use client';

import { useState, useEffect } from 'react';
import { useGameStore } from '@/stores/gameStore';

// 生成簡短的分享碼
function generateReferralCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = '';
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

export function ParentFormPage() {
  const { childInfo, setParentInfo, continueFromParentForm } = useGameStore();
  const [parentName, setParentName] = useState('');
  const [phone, setPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [referredBy, setReferredBy] = useState<string | null>(null);

  // 檢查 URL 是否有分享碼
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const ref = params.get('ref');
      if (ref) {
        setReferredBy(ref);
      }
    }
  }, []);

  const handleSubmit = async () => {
    if (!parentName.trim() || !phone.trim()) return;
    
    setIsSubmitting(true);
    
    // 生成這個用戶的分享碼
    const referralCode = generateReferralCode();
    
    setParentInfo({
      name: parentName.trim(),
      phone: phone.trim(),
      referralCode,
      referredBy: referredBy || undefined,
    });

    try {
      await fetch('/api/submit-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          childName: childInfo?.name,
          childAge: childInfo?.age,
          parentName: parentName.trim(),
          phone: phone.trim(),
          referralCode,
          referredBy: referredBy || null,
          timestamp: new Date().toISOString(),
        }),
      });
    } catch (error) {
      console.error('Failed to submit lead:', error);
    }

    continueFromParentForm();
    setIsSubmitting(false);
  };

  const isValidPhone = /^09\d{8}$/.test(phone);
  const isValid = parentName.trim().length > 0 && isValidPhone;

  return (
    <div style={{ textAlign: 'center' }}>
      {/* 頂部 */}
      <div style={{ fontSize: '60px', marginBottom: '10px' }}>🎉</div>
      <h1 style={{
        fontSize: '26px',
        fontWeight: '800',
        color: 'white',
        textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
        marginBottom: '16px',
      }}>
        太棒了！{childInfo?.name} 表現得很好！
      </h1>

      {/* 說明卡片 */}
      <div style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        borderRadius: '20px',
        padding: '20px',
        marginBottom: '16px',
        color: 'white',
        textAlign: 'left',
      }}>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
          <span style={{ fontSize: '36px' }}>📊</span>
          <div>
            <p style={{ fontSize: '20px', fontWeight: '700', margin: '0 0 8px 0' }}>
              接下來還有 5-10 分鐘的測驗
            </p>
            <p style={{ fontSize: '16px', margin: 0, opacity: 0.9 }}>
              完成全部題目後，我們會提供一份<strong>專屬的英文程度分析報告</strong>！
            </p>
          </div>
        </div>
      </div>

      {/* 表單卡片 */}
      <div style={{
        background: 'white',
        borderRadius: '24px',
        padding: '24px',
        boxShadow: '0 10px 40px rgba(0,0,0,0.15)',
        marginBottom: '16px',
        textAlign: 'left',
      }}>
        <div style={{
          textAlign: 'center',
          marginBottom: '20px',
        }}>
          <span style={{
            display: 'inline-block',
            background: '#FFF3E0',
            color: '#E65100',
            padding: '8px 16px',
            borderRadius: '20px',
            fontSize: '16px',
            fontWeight: '700',
          }}>
            👨‍👩‍👧 請家長填寫
          </span>
        </div>

        {/* 家長姓名 */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{
            display: 'block',
            fontSize: '18px',
            fontWeight: '700',
            color: '#333',
            marginBottom: '10px',
          }}>
            家長姓名
          </label>
          <input
            type="text"
            value={parentName}
            onChange={(e) => setParentName(e.target.value)}
            placeholder="請輸入姓名"
            maxLength={20}
            style={{
              width: '100%',
              padding: '16px',
              fontSize: '20px',
              border: '3px solid #E0E0E0',
              borderRadius: '14px',
              outline: 'none',
              boxSizing: 'border-box',
            }}
          />
        </div>

        {/* 手機號碼 */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{
            display: 'block',
            fontSize: '18px',
            fontWeight: '700',
            color: '#333',
            marginBottom: '10px',
          }}>
            手機號碼
          </label>
          <input
            type="tel"
            inputMode="numeric"
            value={phone}
            onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
            placeholder="09XXXXXXXX"
            style={{
              width: '100%',
              padding: '16px',
              fontSize: '20px',
              border: `3px solid ${phone && !isValidPhone ? '#E74C3C' : '#E0E0E0'}`,
              borderRadius: '14px',
              outline: 'none',
              boxSizing: 'border-box',
            }}
          />
          {phone && !isValidPhone && (
            <p style={{ color: '#E74C3C', fontSize: '14px', marginTop: '6px' }}>
              請輸入正確手機格式
            </p>
          )}
        </div>

        {/* 提示 */}
        <div style={{
          background: '#FFF8E1',
          borderRadius: '12px',
          padding: '14px',
          fontSize: '15px',
          color: '#F57C00',
        }}>
          📱 遊戲結束後，<strong>{childInfo?.name}</strong> 的報告將傳送給您！
        </div>
      </div>

      {/* 按鈕 */}
      <button
        onClick={handleSubmit}
        disabled={!isValid || isSubmitting}
        className={isValid && !isSubmitting ? 'cta-button-green' : ''}
        style={{
          width: '100%',
          padding: '20px',
          fontSize: '24px',
          fontWeight: '800',
          color: 'white',
          background: isValid && !isSubmitting
            ? 'linear-gradient(135deg, #2ECC71 0%, #27AE60 100%)'
            : '#CCC',
          border: 'none',
          borderRadius: '16px',
          cursor: isValid && !isSubmitting ? 'pointer' : 'not-allowed',
          boxShadow: isValid ? '0 6px 0 #1E8449' : 'none',
        }}
      >
        {isSubmitting ? '處理中...' : '繼續測驗 ➜'}
      </button>

      {/* 隱私 */}
      <p style={{
        fontSize: '13px',
        color: 'rgba(255,255,255,0.7)',
        marginTop: '12px',
      }}>
        🔒 資料僅用於傳送報告
      </p>
    </div>
  );
}
