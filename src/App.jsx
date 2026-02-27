import { useState } from 'react';
import { QuizProvider } from './context/QuizContext';
import StudyMode from './components/StudyMode';
import PracticeMode from './components/PracticeMode';
import ReviewMode from './components/ReviewMode';
import MockExam from './components/MockExam';
import WeaknessPanel from './components/WeaknessPanel';
import './App.css';

const TABS = [
  { id: 'study', label: 'Study', icon: '📖' },
  { id: 'practice', label: 'Practice', icon: '✏️' },
  { id: 'review', label: 'Review', icon: '⚡' },
  { id: 'exam', label: 'Mock Exam', icon: '🎯' },
  { id: 'weakness', label: 'Weak Areas', icon: '📊' },
];

function App() {
  const [activeTab, setActiveTab] = useState('study');

  return (
    <QuizProvider>
      <div className="app">
        <header className="app-header">
          <h1>ML Quiz Prep</h1>
          <p className="subtitle">Supervised Learning — 40 MCQ Prep</p>
        </header>

        <nav className="tab-nav">
          {TABS.map(tab => (
            <button
              key={tab.id}
              className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <span className="tab-icon">{tab.icon}</span>
              <span className="tab-label">{tab.label}</span>
            </button>
          ))}
        </nav>

        <main className="main-content">
          {activeTab === 'study' && <StudyMode />}
          {activeTab === 'practice' && <PracticeMode />}
          {activeTab === 'review' && <ReviewMode />}
          {activeTab === 'exam' && <MockExam />}
          {activeTab === 'weakness' && <WeaknessPanel />}
        </main>
      </div>
    </QuizProvider>
  );
}

export default App;
