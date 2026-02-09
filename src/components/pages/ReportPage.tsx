'use client';

import { useEffect, useState } from 'react';
import { useGameStore } from '@/stores/gameStore';
import { generateQuestions } from '@/lib/questionGenerator';

export function ReportPage() {
  const { childInfo, report, resetGame, setQuestions, setPhase, startGame, continueWithNewQuestions, getUsedIds } = useGameStore();
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const loadConfetti = async () => {
      const confetti = (await import('canvas-confetti')).default;
      const count = 200;
      const defaults = { origin: { y: 0.7 }, colors: ['#FFD700', '#FFA500', '#FF6347', '#FF69B4', '#00CED1'] };

      function fire(particleRatio: number, opts: object) {
        confetti({ ...defaults, ...opts, particleCount: Math.floor(count * particleRatio) });
      }

      fire(0.25, { spread: 26, startVelocity: 55 });
      fire(0.2, { spread: 60 });
      fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
      fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
      fire(0.1, { spread: 120, startVelocity: 45 });
    };
    loadConfetti();
  }, []);

  // 用 jsPDF 生成精美中文 PDF
  const handleDownloadPDF = async () => {
    if (!report || !childInfo) return;
    
    try {
      const { jsPDF } = await import('jspdf');
      const pdf = new jsPDF('p', 'mm', 'a4');
      
      // 載入中文字體
      const fontResponse = await fetch('/fonts/NotoSansTC-Regular.ttf');
      const fontBuffer = await fontResponse.arrayBuffer();
      const fontBase64 = btoa(
        new Uint8Array(fontBuffer).reduce((data, byte) => data + String.fromCharCode(byte), '')
      );
      
      pdf.addFileToVFS('NotoSansTC.ttf', fontBase64);
      pdf.addFont('NotoSansTC.ttf', 'NotoSansTC', 'normal');
      pdf.setFont('NotoSansTC');
      
      const pageWidth = 210;
      const pageHeight = 297;
      const margin = 15;
      const contentWidth = pageWidth - margin * 2;
      let y = 0;
      
      // ===== 頂部漸層標題區 =====
      pdf.setFillColor(102, 126, 234);
      pdf.rect(0, 0, pageWidth, 55, 'F');
      
      // 標題
      pdf.setFontSize(32);
      pdf.setTextColor(255, 255, 255);
      pdf.text('Play English', pageWidth / 2, 22, { align: 'center' });
      
      pdf.setFontSize(14);
      pdf.text('英文程度分析報告', pageWidth / 2, 32, { align: 'center' });
      
      // 日期
      pdf.setFontSize(10);
      pdf.text(`測驗日期：${new Date().toLocaleDateString('zh-TW')}`, pageWidth / 2, 45, { align: 'center' });
      
      y = 62;
      
      // ===== 學生資訊卡片 =====
      pdf.setFillColor(248, 249, 250);
      pdf.roundedRect(margin, y, contentWidth, 22, 4, 4, 'F');
      pdf.setDrawColor(180, 180, 180);
      pdf.roundedRect(margin, y, contentWidth, 22, 4, 4, 'S');
      
      pdf.setFontSize(16);
      pdf.setTextColor(20, 20, 20);  // 深色字體
      pdf.text(`${childInfo.name}`, margin + 10, y + 9);
      pdf.text(`${childInfo.age} 歲`, margin + 80, y + 9);
      
      const levelInfo = getLevelInfo();
      pdf.setFontSize(14);
      pdf.setTextColor(levelInfo.colorRGB[0], levelInfo.colorRGB[1], levelInfo.colorRGB[2]);
      pdf.text(`${levelInfo.label}`, margin + 10, y + 18);
      
      y += 28;
      
      // ===== 程度評估大卡片 =====
      pdf.setFillColor(levelInfo.colorRGB[0], levelInfo.colorRGB[1], levelInfo.colorRGB[2]);
      pdf.roundedRect(margin, y, contentWidth, 38, 6, 6, 'F');
      
      pdf.setFontSize(26);
      pdf.setTextColor(255, 255, 255);
      pdf.text(levelInfo.label, pageWidth / 2, y + 16, { align: 'center' });
      
      pdf.setFontSize(14);
      pdf.text(levelInfo.desc, pageWidth / 2, y + 27, { align: 'center' });
      
      // 星星
      pdf.setFontSize(14);
      const stars = '★'.repeat(levelInfo.star) + '☆'.repeat(5 - levelInfo.star);
      pdf.text(stars, pageWidth / 2, y + 36, { align: 'center' });
      
      y += 44;
      
      // ===== 成績三欄 =====
      const accuracy = Math.round(report.accuracy);
      const totalTime = Math.floor(report.totalTime / 1000);
      const minutes = Math.floor(totalTime / 60);
      const seconds = totalTime % 60;
      
      const boxWidth = (contentWidth - 10) / 3;
      const boxHeight = 28;
      
      // 答對題數
      pdf.setFillColor(255, 193, 7);
      pdf.roundedRect(margin, y, boxWidth, boxHeight, 4, 4, 'F');
      pdf.setFontSize(20);
      pdf.setTextColor(255, 255, 255);
      pdf.text(`${report.correctCount}/${report.totalQuestions}`, margin + boxWidth/2, y + 12, { align: 'center' });
      pdf.setFontSize(11);
      pdf.text('答對題數', margin + boxWidth/2, y + 23, { align: 'center' });
      
      // 正確率
      pdf.setFillColor(46, 204, 113);
      pdf.roundedRect(margin + boxWidth + 5, y, boxWidth, boxHeight, 4, 4, 'F');
      pdf.setFontSize(20);
      pdf.text(`${accuracy}%`, margin + boxWidth + 5 + boxWidth/2, y + 12, { align: 'center' });
      pdf.setFontSize(11);
      pdf.text('正確率', margin + boxWidth + 5 + boxWidth/2, y + 23, { align: 'center' });
      
      // 作答時間
      pdf.setFillColor(155, 89, 182);
      pdf.roundedRect(margin + (boxWidth + 5) * 2, y, boxWidth, boxHeight, 4, 4, 'F');
      pdf.setFontSize(20);
      pdf.text(`${minutes}:${seconds.toString().padStart(2, '0')}`, margin + (boxWidth + 5) * 2 + boxWidth/2, y + 12, { align: 'center' });
      pdf.setFontSize(11);
      pdf.text('作答時間', margin + (boxWidth + 5) * 2 + boxWidth/2, y + 23, { align: 'center' });
      
      y += 34;
      
      // ===== 難度分析 =====
      pdf.setFillColor(248, 249, 250);
      pdf.roundedRect(margin, y, contentWidth, 42, 4, 4, 'F');
      
      pdf.setFontSize(14);
      pdf.setTextColor(20, 20, 20);  // 深色字體
      pdf.text('難度分析', margin + 10, y + 11);
      
      const difficulties = [
        { label: '簡單題', data: report.difficultyBreakdown.easy, color: [46, 204, 113] },
        { label: '中等題', data: report.difficultyBreakdown.medium, color: [243, 156, 18] },
        { label: '挑戰題', data: report.difficultyBreakdown.hard, color: [231, 76, 60] },
      ];
      
      let barY = y + 18;
      const barWidth = contentWidth - 80;
      
      difficulties.forEach((d) => {
        pdf.setFontSize(10);
        pdf.setTextColor(20, 20, 20);  // 深色字體
        pdf.text(d.label, margin + 10, barY + 4);
        
        // 背景條
        pdf.setFillColor(200, 200, 200);
        pdf.roundedRect(margin + 38, barY - 1, barWidth, 7, 2, 2, 'F');
        
        // 進度條
        const pct = d.data.total > 0 ? d.data.correct / d.data.total : 0;
        pdf.setFillColor(d.color[0], d.color[1], d.color[2]);
        if (pct > 0) {
          pdf.roundedRect(margin + 38, barY - 1, barWidth * pct, 7, 2, 2, 'F');
        }
        
        // 數字
        pdf.setFontSize(10);
        pdf.setTextColor(20, 20, 20);  // 深色字體
        pdf.text(`${d.data.correct}/${d.data.total} (${Math.round(d.data.accuracy)}%)`, margin + 42 + barWidth, barY + 4);
        
        barY += 10;
      });
      
      y += 48;
      
      // ===== 學習建議 =====
      pdf.setFillColor(102, 126, 234);
      pdf.roundedRect(margin, y, contentWidth, 35, 4, 4, 'F');
      
      pdf.setFontSize(14);
      pdf.setTextColor(255, 255, 255);
      pdf.text('學習建議', margin + 10, y + 11);
      
      pdf.setFontSize(11);
      let recY = y + 20;
      report.recommendations.slice(0, 2).forEach((rec) => {
        pdf.text(`• ${rec}`, margin + 10, recY);
        recY += 8;
      });
      
      y += 40;
      
      // ===== OiKID 推廣 =====
      pdf.setFillColor(255, 107, 53);
      pdf.roundedRect(margin, y, contentWidth, 32, 6, 6, 'F');
      
      pdf.setFontSize(14);
      pdf.setTextColor(255, 255, 255);
      pdf.text(`想讓 ${childInfo.name} 口說英文更進步？`, pageWidth / 2, y + 12, { align: 'center' });
      
      pdf.setFontSize(12);
      pdf.text('OiKID 兒童線上英文 ｜ www.oikid.com', pageWidth / 2, y + 24, { align: 'center' });
      
      // ===== 頁尾 =====
      pdf.setFontSize(8);
      pdf.setTextColor(150, 150, 150);
      pdf.text('Play English by OiKID ｜ 本報告僅供參考', pageWidth / 2, pageHeight - 10, { align: 'center' });
      
      pdf.save(`${childInfo.name}_英文程度報告.pdf`);
    } catch (error) {
      console.error('PDF error:', error);
      alert('PDF 下載失敗，請稍後再試');
    }
  };

  const handlePlayAgain = () => {
    resetGame();
    const newQuestions = generateQuestions();
    setQuestions(newQuestions);
  };

  const handleContinuePlay = () => {
    const usedIds = getUsedIds();
    const allUsedIds = [...usedIds, ...useGameStore.getState().questions.map(q => q.id)];
    continueWithNewQuestions();
    const newQuestions = generateQuestions(30, allUsedIds, 2);
    setQuestions(newQuestions);
    startGame();
  };

  const handleBookTrial = () => {
    setPhase('booking');
  };

  // 分享功能 - 帶上分享碼
  const { parentInfo } = useGameStore();
  const referralCode = parentInfo?.referralCode || '';
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://play-english.oikid.com';
  const shareUrl = referralCode ? `${baseUrl}?ref=${referralCode}` : baseUrl;
  const shareText = `我在 Play English 測出了「${getLevelInfo().label}」的英文程度！快來測測你的英文有多厲害 🎮`;
  
  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      alert('複製失敗');
    }
  };

  const handleShareLine = () => {
    const lineUrl = `https://line.me/R/msg/text/?${encodeURIComponent(shareText + '\n' + shareUrl)}`;
    window.open(lineUrl, '_blank');
  };

  const handleShareFacebook = () => {
    const fbUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareText)}`;
    window.open(fbUrl, '_blank');
  };

  if (!report) return null;

  function getLevelInfo() {
    switch (report!.level) {
      case 'junior-high':
        return { emoji: '🏆', color: '#9B59B6', colorRGB: [155, 89, 182] as [number, number, number], label: '國中程度', labelEn: 'Junior High Level', desc: '英文能力非常優秀！', descEn: 'Excellent!', star: 5 };
      case 'elementary-3':
        return { emoji: '🥇', color: '#3498DB', colorRGB: [52, 152, 219] as [number, number, number], label: '國小高年級', labelEn: 'Upper Elementary', desc: '相當於 5-6 年級程度', descEn: 'Grade 5-6 Level', star: 4 };
      case 'elementary-2':
        return { emoji: '🥈', color: '#2ECC71', colorRGB: [46, 204, 113] as [number, number, number], label: '國小中年級', labelEn: 'Middle Elementary', desc: '相當於 3-4 年級程度', descEn: 'Grade 3-4 Level', star: 3 };
      case 'elementary-1':
        return { emoji: '🥉', color: '#F39C12', colorRGB: [243, 156, 18] as [number, number, number], label: '國小低年級', labelEn: 'Lower Elementary', desc: '相當於 1-2 年級程度', descEn: 'Grade 1-2 Level', star: 2 };
      default:
        return { emoji: '⭐', color: '#E74C3C', colorRGB: [231, 76, 60] as [number, number, number], label: '初學者', labelEn: 'Beginner', desc: '英文學習剛起步', descEn: 'Just Starting', star: 1 };
    }
  }

  const levelInfo = getLevelInfo();
  const accuracy = Math.round(report.accuracy);
  const totalTime = Math.floor(report.totalTime / 1000);
  const minutes = Math.floor(totalTime / 60);
  const seconds = totalTime % 60;

  return (
    <div>
      {/* 頂部祝賀 */}
      <div style={{ textAlign: 'center', marginBottom: '24px' }}>
        <div style={{ fontSize: '72px', marginBottom: '12px' }}>🎊</div>
        <h1 style={{ fontSize: '28px', fontWeight: '900', color: 'white', textShadow: '2px 2px 4px rgba(0,0,0,0.3)', margin: 0, lineHeight: 1.3 }}>
          恭喜 {childInfo?.name} 完成測驗！
        </h1>
      </div>

      {/* 程度卡片 */}
      <div style={{
        background: `linear-gradient(135deg, ${levelInfo.color} 0%, ${levelInfo.color}CC 100%)`,
        borderRadius: '28px', padding: '32px 24px', textAlign: 'center', color: 'white',
        marginBottom: '20px', boxShadow: '0 12px 40px rgba(0,0,0,0.25)', border: '4px solid rgba(255,255,255,0.3)',
      }}>
        <div style={{ fontSize: '80px', marginBottom: '12px' }}>{levelInfo.emoji}</div>
        <div style={{ fontSize: '18px', opacity: 0.9, marginBottom: '8px', letterSpacing: '2px' }}>✦ 英文程度評估 ✦</div>
        <div style={{ fontSize: '42px', fontWeight: '900', marginBottom: '8px', textShadow: '2px 2px 4px rgba(0,0,0,0.2)' }}>{levelInfo.label}</div>
        <div style={{ fontSize: '20px', opacity: 0.95 }}>{levelInfo.desc}</div>
        <div style={{ fontSize: '32px', marginTop: '16px', letterSpacing: '4px' }}>
          {'⭐'.repeat(levelInfo.star)}{'☆'.repeat(5 - levelInfo.star)}
        </div>
      </div>

      {/* 成績概覽 */}
      <div style={{ background: 'white', borderRadius: '24px', padding: '24px', marginBottom: '20px', boxShadow: '0 10px 30px rgba(0,0,0,0.12)' }}>
        <h3 style={{ fontSize: '22px', fontWeight: '800', color: '#333', textAlign: 'center', margin: '0 0 20px 0' }}>📊 成績總覽</h3>
        
        <div style={{ display: 'flex', gap: '16px', marginBottom: '20px' }}>
          <div style={{ flex: 1, background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)', borderRadius: '20px', padding: '20px 16px', textAlign: 'center', color: 'white', boxShadow: '0 4px 15px rgba(255,165,0,0.3)' }}>
            <div style={{ fontSize: '40px', fontWeight: '900', lineHeight: 1 }}>{report.correctCount}</div>
            <div style={{ fontSize: '12px', marginTop: '4px' }}>/ {report.totalQuestions}</div>
            <div style={{ fontSize: '16px', fontWeight: '600', marginTop: '8px' }}>答對題數</div>
          </div>
          <div style={{ flex: 1, background: 'linear-gradient(135deg, #2ECC71 0%, #27AE60 100%)', borderRadius: '20px', padding: '20px 16px', textAlign: 'center', color: 'white', boxShadow: '0 4px 15px rgba(46,204,113,0.3)' }}>
            <div style={{ fontSize: '40px', fontWeight: '900', lineHeight: 1 }}>{accuracy}</div>
            <div style={{ fontSize: '20px', marginTop: '4px' }}>%</div>
            <div style={{ fontSize: '16px', fontWeight: '600', marginTop: '8px' }}>正確率</div>
          </div>
          <div style={{ flex: 1, background: 'linear-gradient(135deg, #9B59B6 0%, #8E44AD 100%)', borderRadius: '20px', padding: '20px 16px', textAlign: 'center', color: 'white', boxShadow: '0 4px 15px rgba(155,89,182,0.3)' }}>
            <div style={{ fontSize: '40px', fontWeight: '900', lineHeight: 1 }}>{minutes}</div>
            <div style={{ fontSize: '12px', marginTop: '4px' }}>分 {seconds} 秒</div>
            <div style={{ fontSize: '16px', fontWeight: '600', marginTop: '8px' }}>作答時間</div>
          </div>
        </div>

        {/* 各難度表現 */}
        <div style={{ marginTop: '16px' }}>
          {[
            { key: 'easy', label: '😊 簡單題', color: '#2ECC71', data: report.difficultyBreakdown.easy },
            { key: 'medium', label: '🤔 中等題', color: '#F39C12', data: report.difficultyBreakdown.medium },
            { key: 'hard', label: '💪 挑戰題', color: '#E74C3C', data: report.difficultyBreakdown.hard },
          ].map(({ key, label, color, data }) => (
            <div key={key} style={{ marginBottom: '14px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '16px', fontWeight: '600' }}>
                <span style={{ color: '#555' }}>{label}</span>
                <span style={{ color }}>{data.correct}/{data.total} ({Math.round(data.accuracy)}%)</span>
              </div>
              <div style={{ height: '12px', background: '#E0E0E0', borderRadius: '6px', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${data.accuracy}%`, background: color, borderRadius: '6px', transition: 'width 0.5s ease' }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 學習建議 */}
      <div style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', borderRadius: '24px', padding: '24px', color: 'white', marginBottom: '20px', boxShadow: '0 8px 24px rgba(102,126,234,0.3)' }}>
        <h3 style={{ fontSize: '22px', fontWeight: '800', margin: '0 0 16px 0', textAlign: 'center' }}>💡 專屬學習建議</h3>
        <ul style={{ margin: 0, paddingLeft: '24px', fontSize: '17px', lineHeight: '1.8' }}>
          {report.recommendations.slice(0, 3).map((rec, i) => (
            <li key={i} style={{ marginBottom: '8px' }}>{rec}</li>
          ))}
        </ul>
      </div>

      {/* OiKID 推廣 */}
      <div style={{ background: 'white', borderRadius: '24px', padding: '24px', textAlign: 'center', marginBottom: '20px', border: '4px solid #FF6B35', boxShadow: '0 8px 24px rgba(255,107,53,0.2)' }}>
        <div style={{ fontSize: '24px', fontWeight: '800', color: '#FF6B35', marginBottom: '12px' }}>
          🌟 想讓 {childInfo?.name} 口說英文更進步？
        </div>
        <div style={{ fontSize: '18px', color: '#666', marginBottom: '16px', lineHeight: 1.6 }}>
          <strong>聽、說、讀、寫</strong> 全方面加強！<br/>
          OiKID 兒童線上英文，專業外師一對一教學
        </div>
        
        <div style={{ fontSize: '40px', marginBottom: '16px', animation: 'bounce 1s ease infinite' }}>👇</div>
        
        <button
          onClick={handleBookTrial}
          className="cta-button"
          style={{
            width: '100%', padding: '18px', fontSize: '22px', fontWeight: '800', color: 'white',
            background: 'linear-gradient(135deg, #FF6B35 0%, #F7931E 100%)', border: 'none',
            borderRadius: '16px', cursor: 'pointer', boxShadow: '0 6px 0 #D4541E',
          }}
        >
          🎁 免費試聽預約
        </button>
      </div>

      {/* 按鈕區 */}
      <div style={{ marginTop: '20px' }}>
        <button onClick={handleDownloadPDF} style={{
          width: '100%', padding: '18px', fontSize: '20px', fontWeight: '800', color: 'white',
          background: 'linear-gradient(135deg, #9B59B6 0%, #8E44AD 100%)', border: 'none',
          borderRadius: '16px', cursor: 'pointer', boxShadow: '0 6px 0 #6C3483', marginBottom: '12px',
        }}>
          📄 下載 PDF 報告
        </button>

        <button onClick={handleContinuePlay} style={{
          width: '100%', padding: '18px', fontSize: '20px', fontWeight: '800', color: 'white',
          background: 'linear-gradient(135deg, #2ECC71 0%, #27AE60 100%)', border: 'none',
          borderRadius: '16px', cursor: 'pointer', boxShadow: '0 6px 0 #1E8449', marginBottom: '12px',
        }}>
          🚀 繼續挑戰（新題目）
        </button>

        {/* 分享區塊 */}
        <div style={{
          background: 'linear-gradient(135deg, #00CED1 0%, #20B2AA 100%)',
          borderRadius: '20px', padding: '20px', marginTop: '8px', textAlign: 'center',
          boxShadow: '0 8px 24px rgba(0,206,209,0.3)',
        }}>
          <div style={{ fontSize: '18px', color: 'white', marginBottom: '16px', fontWeight: '600' }}>
            🎯 覺得好玩嗎？邀請朋友一起來！
          </div>
          
          {!showShareMenu ? (
            <button onClick={() => setShowShareMenu(true)} style={{
              width: '100%', padding: '18px', fontSize: '22px', fontWeight: '800', color: '#00CED1',
              background: 'white', border: 'none', borderRadius: '16px', cursor: 'pointer',
              boxShadow: '0 6px 0 rgba(0,0,0,0.1)',
            }}>
              📤 分享給其他小朋友
            </button>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <button onClick={handleShareLine} style={{
                width: '100%', padding: '14px', fontSize: '18px', fontWeight: '700', color: 'white',
                background: '#06C755', border: 'none', borderRadius: '12px', cursor: 'pointer',
              }}>
                💬 分享到 LINE
              </button>
              <button onClick={handleShareFacebook} style={{
                width: '100%', padding: '14px', fontSize: '18px', fontWeight: '700', color: 'white',
                background: '#1877F2', border: 'none', borderRadius: '12px', cursor: 'pointer',
              }}>
                📘 分享到 Facebook
              </button>
              <button onClick={handleCopyLink} style={{
                width: '100%', padding: '14px', fontSize: '18px', fontWeight: '700', color: '#333',
                background: 'white', border: 'none', borderRadius: '12px', cursor: 'pointer',
              }}>
                {copied ? '✅ 已複製！' : '🔗 複製連結'}
              </button>
              <button onClick={() => { setShowShareMenu(false); handlePlayAgain(); }} style={{
                width: '100%', padding: '14px', fontSize: '18px', fontWeight: '700', color: 'white',
                background: 'rgba(255,255,255,0.2)', border: 'none', borderRadius: '12px', cursor: 'pointer',
              }}>
                🎮 讓朋友直接玩（重新開始）
              </button>
            </div>
          )}
        </div>

        {/* 結束遊戲按鈕 */}
        <button onClick={handlePlayAgain} style={{
          width: '100%', padding: '16px', fontSize: '18px', fontWeight: '600', color: '#666',
          background: 'rgba(255,255,255,0.8)', border: '2px solid #ddd',
          borderRadius: '12px', cursor: 'pointer', marginTop: '12px',
        }}>
          🏠 結束遊戲
        </button>
      </div>

      <style jsx>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(10px); }
        }
      `}</style>
    </div>
  );
}
