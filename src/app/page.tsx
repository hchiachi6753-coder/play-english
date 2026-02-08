'use client';

import { useEffect } from 'react';
import { useGameStore } from '@/stores/gameStore';
import { generateQuestions } from '@/lib/questionGenerator';
import { WelcomePage } from '@/components/pages/WelcomePage';
import { RegisterPage } from '@/components/pages/RegisterPage';
import { GamePage } from '@/components/pages/GamePage';
import { ParentFormPage } from '@/components/pages/ParentFormPage';
import { ReportPage } from '@/components/pages/ReportPage';
import { BookingPage } from '@/components/pages/BookingPage';

export default function Home() {
  const { phase, setQuestions } = useGameStore();

  useEffect(() => {
    const questions = generateQuestions(30);
    setQuestions(questions);
  }, [setQuestions]);

  const renderPage = () => {
    switch (phase) {
      case 'welcome':
        return <WelcomePage />;
      case 'register':
        return <RegisterPage />;
      case 'playing':
        return <GamePage />;
      case 'parent-form':
        return <ParentFormPage />;
      case 'report':
        return <ReportPage />;
      case 'booking':
        return <BookingPage />;
      default:
        return <WelcomePage />;
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px 20px 40px 20px',
    }}>
      {/* 強制固定寬度 400px，模擬手機畫面 */}
      <div style={{
        width: '400px',
        maxWidth: '100%',
        overflow: 'visible',
      }}>
        {renderPage()}
      </div>
    </div>
  );
}
