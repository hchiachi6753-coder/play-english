'use client';

import { useState, useMemo } from 'react';
import { useGameStore } from '@/stores/gameStore';

export function BookingPage() {
  const { childInfo, parentInfo, setPhase } = useGameStore();
  
  // 預填資料
  const [parentName, setParentName] = useState(parentInfo?.name || '');
  const [phone, setPhone] = useState(parentInfo?.phone || '');
  const [childName, setChildName] = useState(childInfo?.name || '');
  
  // 日期和時段選擇
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // 生成未來 10 天的日期
  const dates = useMemo(() => {
    const result = [];
    const today = new Date();
    for (let i = 0; i < 10; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      const dateStr = date.toISOString().split('T')[0];
      const weekday = ['日', '一', '二', '三', '四', '五', '六'][date.getDay()];
      const month = date.getMonth() + 1;
      const day = date.getDate();
      result.push({
        value: dateStr,
        label: `${month}/${day}`,
        weekday: `週${weekday}`,
        isToday: i === 0,
      });
    }
    return result;
  }, []);

  const timeSlots = [
    { value: 'morning', label: '上午', time: '09:00-12:00', emoji: '🌅' },
    { value: 'afternoon', label: '下午', time: '14:00-17:00', emoji: '☀️' },
    { value: 'evening', label: '晚上', time: '19:00-21:00', emoji: '🌙' },
  ];

  const isValidPhone = /^09\d{8}$/.test(phone);
  const isValid = parentName.trim() && isValidPhone && childName.trim() && selectedDate && selectedTimeSlot;

  const handleSubmit = async () => {
    if (!isValid) return;
    
    setIsSubmitting(true);
    
    try {
      // 更新 leads 資料
      await fetch('/api/submit-lead', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone: phone.trim(),
          booking: {
            date: selectedDate,
            timeSlot: selectedTimeSlot,
            parentName: parentName.trim(),
            childName: childName.trim(),
            bookedAt: new Date().toISOString(),
          },
        }),
      });
      
      setSubmitted(true);
    } catch (error) {
      console.error('預約失敗:', error);
      alert('預約失敗，請稍後再試');
    }
    
    setIsSubmitting(false);
  };

  // 預約成功畫面
  if (submitted) {
    return (
      <div style={{ textAlign: 'center', padding: '20px 0' }}>
        <div style={{ fontSize: '100px', marginBottom: '20px' }}>🎉</div>
        <h1 style={{ fontSize: '32px', fontWeight: '900', color: 'white', textShadow: '2px 2px 4px rgba(0,0,0,0.3)', marginBottom: '16px' }}>
          預約成功！
        </h1>
        <div style={{ background: 'white', borderRadius: '24px', padding: '24px', marginBottom: '20px', boxShadow: '0 10px 30px rgba(0,0,0,0.15)' }}>
          <p style={{ fontSize: '18px', color: '#666', marginBottom: '16px' }}>
            我們將盡快與您聯繫確認試聽時間
          </p>
          <div style={{ background: '#F0F0F0', borderRadius: '16px', padding: '16px', textAlign: 'left' }}>
            <p style={{ margin: '0 0 8px 0', fontSize: '16px' }}><strong>小朋友：</strong>{childName}</p>
            <p style={{ margin: '0 0 8px 0', fontSize: '16px' }}><strong>家長：</strong>{parentName}</p>
            <p style={{ margin: '0 0 8px 0', fontSize: '16px' }}><strong>電話：</strong>{phone}</p>
            <p style={{ margin: '0 0 8px 0', fontSize: '16px' }}><strong>預約日期：</strong>{selectedDate}</p>
            <p style={{ margin: 0, fontSize: '16px' }}><strong>時段：</strong>{timeSlots.find(t => t.value === selectedTimeSlot)?.label}</p>
          </div>
        </div>
        <button
          onClick={() => setPhase('report')}
          style={{
            width: '100%', padding: '18px', fontSize: '20px', fontWeight: '800', color: 'white',
            background: 'linear-gradient(135deg, #2ECC71 0%, #27AE60 100%)', border: 'none',
            borderRadius: '16px', cursor: 'pointer', boxShadow: '0 6px 0 #1E8449',
          }}
        >
          ← 返回報告
        </button>
      </div>
    );
  }

  return (
    <div style={{ paddingBottom: '20px' }}>
      {/* 標題 */}
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <div style={{ fontSize: '60px', marginBottom: '10px' }}>🎁</div>
        <h1 style={{ fontSize: '28px', fontWeight: '900', color: 'white', textShadow: '2px 2px 4px rgba(0,0,0,0.3)', margin: 0 }}>
          免費試聽預約
        </h1>
        <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.9)', marginTop: '8px' }}>
          專業外師一對一，25分鐘體驗課
        </p>
      </div>

      {/* 表單卡片 */}
      <div style={{ background: 'white', borderRadius: '24px', padding: '24px', boxShadow: '0 10px 40px rgba(0,0,0,0.15)', marginBottom: '16px' }}>
        
        {/* 小孩暱稱 */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', fontSize: '18px', fontWeight: '700', color: '#333', marginBottom: '10px' }}>
            👶 小朋友暱稱
          </label>
          <input
            type="text"
            value={childName}
            onChange={(e) => setChildName(e.target.value)}
            placeholder="小朋友的名字"
            style={{
              width: '100%', padding: '14px', fontSize: '18px', border: '3px solid #E0E0E0',
              borderRadius: '12px', outline: 'none', boxSizing: 'border-box',
            }}
          />
        </div>

        {/* 家長姓名 */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', fontSize: '18px', fontWeight: '700', color: '#333', marginBottom: '10px' }}>
            👨‍👩‍👧 家長姓名
          </label>
          <input
            type="text"
            value={parentName}
            onChange={(e) => setParentName(e.target.value)}
            placeholder="您的姓名"
            style={{
              width: '100%', padding: '14px', fontSize: '18px', border: '3px solid #E0E0E0',
              borderRadius: '12px', outline: 'none', boxSizing: 'border-box',
            }}
          />
        </div>

        {/* 手機號碼 */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', fontSize: '18px', fontWeight: '700', color: '#333', marginBottom: '10px' }}>
            📱 聯絡電話
          </label>
          <input
            type="tel"
            inputMode="numeric"
            value={phone}
            onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
            placeholder="09XXXXXXXX"
            style={{
              width: '100%', padding: '14px', fontSize: '18px',
              border: `3px solid ${phone && !isValidPhone ? '#E74C3C' : '#E0E0E0'}`,
              borderRadius: '12px', outline: 'none', boxSizing: 'border-box',
            }}
          />
        </div>

        {/* 選擇日期 */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', fontSize: '18px', fontWeight: '700', color: '#333', marginBottom: '10px' }}>
            📅 選擇日期
          </label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '8px' }}>
            {dates.map((date) => (
              <button
                key={date.value}
                onClick={() => setSelectedDate(date.value)}
                style={{
                  padding: '12px 4px',
                  fontSize: '14px',
                  fontWeight: '600',
                  border: 'none',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  transition: 'all 0.15s',
                  background: selectedDate === date.value
                    ? 'linear-gradient(135deg, #FF6B35 0%, #F7931E 100%)'
                    : '#F5F5F5',
                  color: selectedDate === date.value ? 'white' : '#333',
                  boxShadow: selectedDate === date.value ? '0 4px 12px rgba(255,107,53,0.3)' : 'none',
                }}
              >
                <div style={{ fontSize: '16px', fontWeight: '700' }}>{date.label}</div>
                <div style={{ fontSize: '12px', opacity: 0.8 }}>
                  {date.isToday ? '今天' : date.weekday}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* 選擇時段 */}
        <div>
          <label style={{ display: 'block', fontSize: '18px', fontWeight: '700', color: '#333', marginBottom: '10px' }}>
            🕐 選擇時段
          </label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
            {timeSlots.map((slot) => (
              <button
                key={slot.value}
                onClick={() => setSelectedTimeSlot(slot.value)}
                style={{
                  padding: '16px 8px',
                  fontSize: '16px',
                  fontWeight: '600',
                  border: 'none',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  transition: 'all 0.15s',
                  background: selectedTimeSlot === slot.value
                    ? 'linear-gradient(135deg, #2ECC71 0%, #27AE60 100%)'
                    : '#F5F5F5',
                  color: selectedTimeSlot === slot.value ? 'white' : '#333',
                  boxShadow: selectedTimeSlot === slot.value ? '0 4px 12px rgba(46,204,113,0.3)' : 'none',
                }}
              >
                <div style={{ fontSize: '24px', marginBottom: '4px' }}>{slot.emoji}</div>
                <div style={{ fontWeight: '700' }}>{slot.label}</div>
                <div style={{ fontSize: '12px', opacity: 0.7 }}>{slot.time}</div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 按鈕區 */}
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
          marginBottom: '12px',
        }}
      >
        {isSubmitting ? '預約中...' : '✅ 確認預約'}
      </button>

      <button
        onClick={() => setPhase('report')}
        style={{
          width: '100%', padding: '16px', fontSize: '18px', fontWeight: '700', color: '#666',
          background: 'rgba(255,255,255,0.8)', border: 'none', borderRadius: '12px', cursor: 'pointer',
        }}
      >
        ← 返回報告
      </button>

      <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.7)', textAlign: 'center', marginTop: '12px' }}>
        🔒 資料僅用於預約聯繫
      </p>
    </div>
  );
}
