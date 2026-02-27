import { useState, useEffect, useRef, useMemo } from 'react';
import { QUESTIONS, shuffleArray } from '../data/questions';
import { useQuiz } from '../context/QuizContext';

const EXAM_TIME = 40 * 60; // 40 minutes in seconds
const EXAM_COUNT = 40;

function MockExam() {
  const { answerQuestion, saveExam } = useQuiz();
  const [phase, setPhase] = useState('setup'); // setup, exam, review
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(EXAM_TIME);
  const [examQuestions, setExamQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [results, setResults] = useState(null);
  const timerRef = useRef(null);

  const startExam = () => {
    const qs = shuffleArray(QUESTIONS).slice(0, Math.min(EXAM_COUNT, QUESTIONS.length));
    setExamQuestions(qs);
    setAnswers({});
    setTimeLeft(EXAM_TIME);
    setCurrentIndex(0);
    setPhase('exam');
  };

  useEffect(() => {
    if (phase !== 'exam') return;
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [phase]);

  useEffect(() => {
    if (timeLeft === 0 && phase === 'exam') {
      finishExam();
    }
  }, [timeLeft, phase]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const handleAnswer = (questionIndex, optionIndex) => {
    setAnswers(prev => ({ ...prev, [questionIndex]: optionIndex }));
  };

  const finishExam = () => {
    clearInterval(timerRef.current);

    let correct = 0;
    const breakdown = {};
    const subtopicBreakdown = {};

    examQuestions.forEach((q, i) => {
      const isCorrect = answers[i] === q.correct;
      if (isCorrect) correct++;

      // Track per topic
      if (!breakdown[q.topic]) breakdown[q.topic] = { correct: 0, total: 0 };
      breakdown[q.topic].total++;
      if (isCorrect) breakdown[q.topic].correct++;

      // Track per subtopic
      if (!subtopicBreakdown[q.subtopic]) subtopicBreakdown[q.subtopic] = { correct: 0, total: 0 };
      subtopicBreakdown[q.subtopic].total++;
      if (isCorrect) subtopicBreakdown[q.subtopic].correct++;

      // Record in context
      answerQuestion(q.id, q.subtopic, isCorrect);
    });

    const examResult = {
      score: correct,
      total: examQuestions.length,
      percentage: Math.round((correct / examQuestions.length) * 100),
      breakdown,
      subtopicBreakdown,
      timeUsed: EXAM_TIME - timeLeft
    };

    setResults(examResult);
    saveExam(examResult);
    setPhase('review');
  };

  if (phase === 'setup') {
    return (
      <div className="exam-setup">
        <h2>Mock Exam</h2>
        <p className="mode-desc">Simulate the real quiz with {Math.min(EXAM_COUNT, QUESTIONS.length)} timed MCQs. Test under pressure!</p>

        <div className="exam-info">
          <div className="info-item">
            <span className="info-label">Questions</span>
            <span className="info-value">{Math.min(EXAM_COUNT, QUESTIONS.length)}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Time Limit</span>
            <span className="info-value">{EXAM_TIME / 60} minutes</span>
          </div>
          <div className="info-item">
            <span className="info-label">Format</span>
            <span className="info-value">MCQ (4 options each)</span>
          </div>
        </div>

        <div className="exam-rules">
          <h3>Rules</h3>
          <ul>
            <li>You can navigate between questions freely</li>
            <li>You can change answers before submitting</li>
            <li>Unanswered questions count as wrong</li>
            <li>Timer auto-submits when time runs out</li>
          </ul>
        </div>

        <button className="start-btn exam-start" onClick={startExam}>
          Start Exam
        </button>
      </div>
    );
  }

  if (phase === 'review') {
    return <ExamReview results={results} questions={examQuestions} answers={answers} onRetake={startExam} />;
  }

  const currentQ = examQuestions[currentIndex];
  const answeredCount = Object.keys(answers).length;

  return (
    <div className="exam-active">
      <div className="exam-header">
        <div className={`exam-timer ${timeLeft < 300 ? 'warning' : ''} ${timeLeft < 60 ? 'critical' : ''}`}>
          {formatTime(timeLeft)}
        </div>
        <div className="exam-progress">
          {answeredCount}/{examQuestions.length} answered
        </div>
        <button className="submit-exam-btn" onClick={finishExam}>
          Submit Exam
        </button>
      </div>

      <div className="exam-nav-dots">
        {examQuestions.map((_, i) => (
          <button
            key={i}
            className={`nav-dot ${i === currentIndex ? 'current' : ''} ${answers[i] !== undefined ? 'answered' : ''}`}
            onClick={() => setCurrentIndex(i)}
          >
            {i + 1}
          </button>
        ))}
      </div>

      <div className="question-card exam-question">
        <div className="q-number">Question {currentIndex + 1} of {examQuestions.length}</div>
        <h3 className="question-text">{currentQ.question}</h3>

        <div className="options-list">
          {currentQ.options.map((option, i) => (
            <button
              key={i}
              className={`option-btn ${answers[currentIndex] === i ? 'selected' : ''}`}
              onClick={() => handleAnswer(currentIndex, i)}
            >
              <span className="option-letter">{String.fromCharCode(65 + i)}</span>
              <span className="option-text">{option}</span>
            </button>
          ))}
        </div>

        <div className="exam-q-nav">
          <button
            disabled={currentIndex === 0}
            onClick={() => setCurrentIndex(prev => prev - 1)}
          >
            ← Previous
          </button>
          <button
            disabled={currentIndex === examQuestions.length - 1}
            onClick={() => setCurrentIndex(prev => prev + 1)}
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  );
}

function ExamReview({ results, questions, answers, onRetake }) {
  const [showDetails, setShowDetails] = useState(false);

  const topicNames = {
    linear_models: 'Linear Models',
    knn_naive_bayes: 'KNN & Naïve Bayes',
    trees_svm: 'Decision Trees & SVM'
  };

  const grade = results.percentage >= 85 ? 'A' : results.percentage >= 70 ? 'B' : results.percentage >= 55 ? 'C' : 'F';

  return (
    <div className="exam-review">
      <h2>Exam Results</h2>

      <div className={`score-hero ${grade === 'A' ? 'excellent' : grade === 'B' ? 'good' : 'needs-work'}`}>
        <div className="score-big">{results.score}/{results.total}</div>
        <div className="score-pct">{results.percentage}%</div>
        <div className="score-grade">Grade: {grade}</div>
        <div className="score-time">Time used: {Math.floor(results.timeUsed / 60)}m {results.timeUsed % 60}s</div>
      </div>

      {results.percentage >= 85 ? (
        <div className="result-message success">You're ready for the quiz! Keep reviewing weak areas.</div>
      ) : results.percentage >= 70 ? (
        <div className="result-message okay">Good progress! Focus on the topics below to hit 85%+.</div>
      ) : (
        <div className="result-message needs-work">More study needed. Review the weak topics and retake.</div>
      )}

      <div className="breakdown-section">
        <h3>Score Breakdown by Topic</h3>
        <div className="breakdown-grid">
          {Object.entries(results.breakdown).map(([topicId, data]) => {
            const pct = Math.round((data.correct / data.total) * 100);
            return (
              <div key={topicId} className="breakdown-card">
                <div className="breakdown-name">{topicNames[topicId] || topicId}</div>
                <div className="breakdown-bar">
                  <div className="breakdown-fill" style={{ width: `${pct}%`, backgroundColor: pct >= 85 ? '#22c55e' : pct >= 70 ? '#eab308' : '#ef4444' }} />
                </div>
                <div className="breakdown-score">{data.correct}/{data.total} ({pct}%)</div>
              </div>
            );
          })}
        </div>
      </div>

      <button className="toggle-details-btn" onClick={() => setShowDetails(!showDetails)}>
        {showDetails ? 'Hide' : 'Show'} Question Details
      </button>

      {showDetails && (
        <div className="question-details">
          {questions.map((q, i) => {
            const userAnswer = answers[i];
            const isCorrect = userAnswer === q.correct;
            return (
              <div key={i} className={`detail-card ${isCorrect ? 'correct' : 'wrong'}`}>
                <div className="detail-header">
                  <span className="detail-num">Q{i + 1}</span>
                  <span className={`detail-result ${isCorrect ? 'correct' : 'wrong'}`}>
                    {isCorrect ? '✓ Correct' : '✗ Wrong'}
                  </span>
                </div>
                <p className="detail-question">{q.question}</p>
                {userAnswer !== undefined && !isCorrect && (
                  <p className="detail-your-answer">Your answer: {String.fromCharCode(65 + userAnswer)}. {q.options[userAnswer]}</p>
                )}
                {userAnswer === undefined && (
                  <p className="detail-your-answer">Not answered</p>
                )}
                <p className="detail-correct-answer">Correct: {String.fromCharCode(65 + q.correct)}. {q.options[q.correct]}</p>
                <p className="detail-explanation">{q.explanation}</p>
              </div>
            );
          })}
        </div>
      )}

      <button className="start-btn" onClick={onRetake}>Retake Exam</button>
    </div>
  );
}

export default MockExam;
