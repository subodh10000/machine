import { useState } from 'react';
import { FLASHCARDS, COMPARISON_TABLES, MCQ_TIPS } from '../data/flashcards';
import { getAllSubtopics } from '../data/topics';

function ReviewMode() {
  const [section, setSection] = useState('flashcards');

  return (
    <div className="review-mode">
      <h2>Rapid Review</h2>
      <p className="mode-desc">Night-before-quiz review — flashcards, formulas, comparison tables, and MCQ tips.</p>

      <div className="review-tabs">
        <button
          className={`review-tab ${section === 'flashcards' ? 'active' : ''}`}
          onClick={() => setSection('flashcards')}
        >
          Flashcards
        </button>
        <button
          className={`review-tab ${section === 'formulas' ? 'active' : ''}`}
          onClick={() => setSection('formulas')}
        >
          Key Formulas
        </button>
        <button
          className={`review-tab ${section === 'tables' ? 'active' : ''}`}
          onClick={() => setSection('tables')}
        >
          Comparisons
        </button>
        <button
          className={`review-tab ${section === 'tips' ? 'active' : ''}`}
          onClick={() => setSection('tips')}
        >
          MCQ Tips
        </button>
      </div>

      <div className="review-content">
        {section === 'flashcards' && <FlashcardsView />}
        {section === 'formulas' && <FormulasView />}
        {section === 'tables' && <TablesView />}
        {section === 'tips' && <TipsView />}
      </div>
    </div>
  );
}

function FlashcardsView() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [filter, setFilter] = useState('all');

  const cards = filter === 'all'
    ? FLASHCARDS
    : FLASHCARDS.filter(c => c.topic === filter);

  const card = cards[currentIndex];

  const handleNext = () => {
    setFlipped(false);
    setCurrentIndex(prev => (prev + 1) % cards.length);
  };

  const handlePrev = () => {
    setFlipped(false);
    setCurrentIndex(prev => (prev - 1 + cards.length) % cards.length);
  };

  return (
    <div className="flashcards-view">
      <div className="flash-filter">
        <button className={filter === 'all' ? 'active' : ''} onClick={() => { setFilter('all'); setCurrentIndex(0); setFlipped(false); }}>All</button>
        <button className={filter === 'linear_models' ? 'active' : ''} onClick={() => { setFilter('linear_models'); setCurrentIndex(0); setFlipped(false); }}>Linear Models</button>
        <button className={filter === 'knn_naive_bayes' ? 'active' : ''} onClick={() => { setFilter('knn_naive_bayes'); setCurrentIndex(0); setFlipped(false); }}>KNN & NB</button>
        <button className={filter === 'trees_svm' ? 'active' : ''} onClick={() => { setFilter('trees_svm'); setCurrentIndex(0); setFlipped(false); }}>Trees & SVM</button>
      </div>

      <div className="flash-counter">{currentIndex + 1} / {cards.length}</div>

      <div
        className={`flashcard ${flipped ? 'flipped' : ''}`}
        onClick={() => setFlipped(!flipped)}
      >
        <div className="flashcard-inner">
          <div className="flashcard-front">
            <p>{card.front}</p>
            <span className="flip-hint">Click to flip</span>
          </div>
          <div className="flashcard-back">
            <p>{card.back}</p>
          </div>
        </div>
      </div>

      <div className="flash-nav">
        <button onClick={handlePrev}>← Previous</button>
        <button onClick={handleNext}>Next →</button>
      </div>
    </div>
  );
}

function FormulasView() {
  const subtopics = getAllSubtopics();
  const allFormulas = subtopics
    .filter(s => s.formulas && s.formulas.length > 0)
    .map(s => ({ topic: s.parentTopic, subtopic: s.title, formulas: s.formulas }));

  return (
    <div className="formulas-view">
      {allFormulas.map((group, i) => (
        <div key={i} className="formula-group">
          <h3>{group.subtopic}</h3>
          <span className="formula-topic-label">{group.topic}</span>
          <div className="formulas-grid">
            {group.formulas.map((f, j) => (
              <div key={j} className="formula-card">
                <div className="formula-name">{f.name}</div>
                <div className="formula-math">{f.formula}</div>
                <div className="formula-explain">{f.explanation}</div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function TablesView() {
  return (
    <div className="tables-view">
      {COMPARISON_TABLES.map((table, i) => (
        <div key={i} className="comparison-table-wrapper">
          <h3>{table.title}</h3>
          <div className="table-scroll">
            <table className="comparison-table">
              <thead>
                <tr>
                  {table.headers.map((h, j) => (
                    <th key={j}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {table.rows.map((row, j) => (
                  <tr key={j}>
                    {row.map((cell, k) => (
                      <td key={k}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
}

function TipsView() {
  return (
    <div className="tips-view">
      <h3>If You See This → Think This</h3>
      <div className="tips-grid">
        {MCQ_TIPS.map((tip, i) => (
          <div key={i} className="tip-card">
            <div className="tip-trigger">
              <span className="tip-label">If you see:</span>
              <span className="tip-text">{tip.trigger}</span>
            </div>
            <div className="tip-think">
              <span className="tip-label">Think:</span>
              <span className="tip-text">{tip.think}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ReviewMode;
