import { useQuiz } from '../context/QuizContext';
import { getSubtopicById } from '../data/topics';
import { getQuestionsBySubtopic } from '../data/questions';

const SUBTOPIC_NAMES = {
  linear_regression: 'Linear Regression',
  logistic_regression: 'Logistic Regression',
  loss_functions: 'Loss Functions',
  gradient_descent: 'Gradient Descent',
  overfitting_underfitting: 'Overfitting vs Underfitting',
  regularization: 'Regularization',
  knn: 'K-Nearest Neighbors',
  curse_of_dimensionality: 'Curse of Dimensionality',
  naive_bayes: 'Naïve Bayes',
  bayes_components: 'Prior/Likelihood/Posterior',
  entropy_info_gain: 'Entropy & Info Gain',
  gini_index: 'Gini Index',
  tree_depth_pruning: 'Tree Depth & Pruning',
  svm: 'Support Vector Machines',
  hard_soft_margin: 'Hard vs Soft Margin',
  kernel_trick: 'Kernel Trick',
};

function WeaknessPanel() {
  const { getWeakTopics, getTopicStats, state, resetStats } = useQuiz();

  const weakTopics = getWeakTopics();
  const topicStats = getTopicStats();
  const totalAnswered = state.answeredQuestions.length;

  if (totalAnswered === 0) {
    return (
      <div className="weakness-panel">
        <h2>Weakness Detection</h2>
        <p className="mode-desc">Track your wrong answers and identify weak topics.</p>
        <div className="empty-state">
          <p>No data yet! Start practicing or take a mock exam to see your weak areas.</p>
        </div>
      </div>
    );
  }

  const totalCorrect = state.answeredQuestions.filter(a => a.correct).length;
  const overallAccuracy = Math.round((totalCorrect / totalAnswered) * 100);

  return (
    <div className="weakness-panel">
      <h2>Weakness Detection</h2>
      <p className="mode-desc">Your performance breakdown and areas that need more study.</p>

      <div className="overall-stats">
        <div className="stat-card">
          <div className="stat-value">{totalAnswered}</div>
          <div className="stat-label">Questions Answered</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{totalCorrect}</div>
          <div className="stat-label">Correct</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{overallAccuracy}%</div>
          <div className="stat-label">Accuracy</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{state.examHistory.length}</div>
          <div className="stat-label">Exams Taken</div>
        </div>
      </div>

      {weakTopics.length > 0 && (
        <div className="weak-topics-section">
          <h3>Weak Areas (below 70%)</h3>
          <p className="weak-hint">Focus your study here! Go to Practice Mode → Weak Areas to target these topics.</p>
          <div className="weak-list">
            {weakTopics.map(w => (
              <div key={w.subtopic} className="weak-card">
                <div className="weak-name">{SUBTOPIC_NAMES[w.subtopic] || w.subtopic}</div>
                <div className="weak-bar">
                  <div
                    className="weak-fill"
                    style={{
                      width: `${w.accuracy}%`,
                      backgroundColor: w.accuracy < 50 ? '#ef4444' : '#eab308'
                    }}
                  />
                </div>
                <div className="weak-stats">
                  {w.accuracy}% ({w.total - w.wrong}/{w.total} correct)
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="all-topics-section">
        <h3>All Topic Performance</h3>
        <div className="all-stats-grid">
          {Object.entries(topicStats)
            .sort(([, a], [, b]) => a.accuracy - b.accuracy)
            .map(([subtopic, stats]) => (
              <div key={subtopic} className="topic-stat-card">
                <div className="topic-stat-name">{SUBTOPIC_NAMES[subtopic] || subtopic}</div>
                <div className="topic-stat-bar">
                  <div
                    className="topic-stat-fill"
                    style={{
                      width: `${stats.accuracy}%`,
                      backgroundColor: stats.accuracy >= 85 ? '#22c55e' : stats.accuracy >= 70 ? '#eab308' : '#ef4444'
                    }}
                  />
                </div>
                <div className="topic-stat-detail">
                  {stats.accuracy}% ({stats.correct}/{stats.total})
                </div>
              </div>
            ))}
        </div>
      </div>

      {state.examHistory.length > 0 && (
        <div className="exam-history-section">
          <h3>Exam History</h3>
          <div className="exam-history-list">
            {state.examHistory.map((exam, i) => (
              <div key={i} className="exam-history-card">
                <div className="exam-hist-num">Exam #{i + 1}</div>
                <div className="exam-hist-score">{exam.score}/{exam.total} ({exam.percentage}%)</div>
                <div className="exam-hist-date">{new Date(exam.timestamp).toLocaleString()}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      <button className="reset-btn" onClick={() => {
        if (window.confirm('Reset all statistics? This cannot be undone.')) {
          resetStats();
        }
      }}>
        Reset All Statistics
      </button>
    </div>
  );
}

export default WeaknessPanel;
