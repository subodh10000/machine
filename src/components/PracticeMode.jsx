import { useState, useMemo } from 'react';
import { QUESTIONS, shuffleArray, getQuestionsByTopic, getQuestionsBySubtopic } from '../data/questions';
import { TOPIC_LIST } from '../data/topics';
import { useQuiz } from '../context/QuizContext';

function PracticeMode() {
  const { answerQuestion, getWeakTopics } = useQuiz();
  const [filter, setFilter] = useState('all');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [started, setStarted] = useState(false);

  const questions = useMemo(() => {
    let qs;
    if (filter === 'all') {
      qs = QUESTIONS;
    } else if (filter === 'weak') {
      const weakTopics = getWeakTopics();
      const weakSubtopics = weakTopics.map(w => w.subtopic);
      qs = QUESTIONS.filter(q => weakSubtopics.includes(q.subtopic));
      if (qs.length === 0) qs = QUESTIONS;
    } else {
      qs = getQuestionsByTopic(filter);
    }
    return shuffleArray(qs);
  }, [filter, getWeakTopics]);

  const currentQuestion = questions[currentIndex];

  const handleSelect = (optionIndex) => {
    if (selected !== null) return;
    setSelected(optionIndex);
    setShowExplanation(true);
    const correct = optionIndex === currentQuestion.correct;
    setScore(prev => ({
      correct: prev.correct + (correct ? 1 : 0),
      total: prev.total + 1
    }));
    answerQuestion(currentQuestion.id, currentQuestion.subtopic, correct);
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelected(null);
      setShowExplanation(false);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelected(null);
    setShowExplanation(false);
    setScore({ correct: 0, total: 0 });
    setStarted(false);
  };

  if (!started) {
    return (
      <div className="practice-setup">
        <h2>Practice Mode</h2>
        <p className="mode-desc">Test yourself with conceptual and tricky MCQs. Get detailed explanations for every answer.</p>

        <div className="filter-section">
          <h3>Choose Topic</h3>
          <div className="filter-buttons">
            <button
              className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
              onClick={() => setFilter('all')}
            >
              All Topics ({QUESTIONS.length} Qs)
            </button>
            <button
              className={`filter-btn weak ${filter === 'weak' ? 'active' : ''}`}
              onClick={() => setFilter('weak')}
            >
              Weak Areas
            </button>
            {TOPIC_LIST.map(topic => (
              <button
                key={topic.id}
                className={`filter-btn ${filter === topic.id ? 'active' : ''}`}
                onClick={() => setFilter(topic.id)}
              >
                {topic.title} ({getQuestionsByTopic(topic.id).length} Qs)
              </button>
            ))}
          </div>
        </div>

        <button className="start-btn" onClick={() => setStarted(true)}>
          Start Practice ({questions.length} questions)
        </button>
      </div>
    );
  }

  if (currentIndex >= questions.length) {
    return (
      <div className="practice-complete">
        <h2>Practice Complete!</h2>
        <div className="score-display">
          <div className="score-big">{score.correct}/{score.total}</div>
          <div className="score-pct">{Math.round((score.correct / score.total) * 100)}%</div>
        </div>
        <button className="start-btn" onClick={handleRestart}>Practice Again</button>
      </div>
    );
  }

  return (
    <div className="practice-active">
      <div className="practice-header">
        <span className="q-counter">Q {currentIndex + 1} / {questions.length}</span>
        <span className="q-score">{score.correct}/{score.total} correct</span>
        <span className={`q-difficulty ${currentQuestion.difficulty}`}>{currentQuestion.difficulty}</span>
      </div>

      <div className="question-card">
        <h3 className="question-text">{currentQuestion.question}</h3>

        <div className="options-list">
          {currentQuestion.options.map((option, i) => {
            let optionClass = 'option-btn';
            if (selected !== null) {
              if (i === currentQuestion.correct) optionClass += ' correct';
              else if (i === selected && i !== currentQuestion.correct) optionClass += ' wrong';
            }
            if (selected === i) optionClass += ' selected';

            return (
              <button
                key={i}
                className={optionClass}
                onClick={() => handleSelect(i)}
                disabled={selected !== null}
              >
                <span className="option-letter">{String.fromCharCode(65 + i)}</span>
                <span className="option-text">{option}</span>
                {selected !== null && i === currentQuestion.correct && <span className="check">✓</span>}
                {selected === i && i !== currentQuestion.correct && <span className="cross">✗</span>}
              </button>
            );
          })}
        </div>

        {showExplanation && (
          <div className="explanation-box">
            <h4>{selected === currentQuestion.correct ? '✓ Correct!' : '✗ Incorrect'}</h4>
            <p className="main-explanation">{currentQuestion.explanation}</p>

            {currentQuestion.wrongExplanations && (
              <div className="wrong-explanations">
                <h5>Why other options are wrong:</h5>
                {currentQuestion.options.map((opt, i) => (
                  i !== currentQuestion.correct && (
                    <div key={i} className="wrong-exp-item">
                      <strong>{String.fromCharCode(65 + i)}:</strong> {currentQuestion.wrongExplanations[i > currentQuestion.correct ? i - 1 : i]}
                    </div>
                  )
                ))}
              </div>
            )}

            <button className="next-btn" onClick={handleNext}>
              {currentIndex < questions.length - 1 ? 'Next Question →' : 'See Results'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default PracticeMode;
