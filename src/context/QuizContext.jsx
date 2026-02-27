import { createContext, useContext, useReducer, useCallback } from 'react';

const QuizContext = createContext();

const initialState = {
  // Weakness tracking
  wrongAnswers: {}, // { subtopicId: count }
  totalAnswered: {}, // { subtopicId: count }
  answeredQuestions: [], // [{ questionId, correct, subtopic, timestamp }]

  // Mock exam state
  examHistory: [], // [{ score, total, breakdown, timestamp }]
};

function loadState() {
  try {
    const saved = localStorage.getItem('quiz-prep-state');
    return saved ? { ...initialState, ...JSON.parse(saved) } : initialState;
  } catch {
    return initialState;
  }
}

function saveState(state) {
  try {
    localStorage.setItem('quiz-prep-state', JSON.stringify(state));
  } catch {
    // silent fail
  }
}

function reducer(state, action) {
  let newState;
  switch (action.type) {
    case 'ANSWER_QUESTION': {
      const { questionId, subtopic, correct } = action.payload;
      const wrongAnswers = { ...state.wrongAnswers };
      const totalAnswered = { ...state.totalAnswered };

      totalAnswered[subtopic] = (totalAnswered[subtopic] || 0) + 1;
      if (!correct) {
        wrongAnswers[subtopic] = (wrongAnswers[subtopic] || 0) + 1;
      }

      newState = {
        ...state,
        wrongAnswers,
        totalAnswered,
        answeredQuestions: [
          ...state.answeredQuestions,
          { questionId, correct, subtopic, timestamp: Date.now() }
        ]
      };
      break;
    }
    case 'SAVE_EXAM': {
      newState = {
        ...state,
        examHistory: [...state.examHistory, action.payload]
      };
      break;
    }
    case 'RESET_STATS': {
      newState = { ...initialState };
      break;
    }
    default:
      return state;
  }
  saveState(newState);
  return newState;
}

export function QuizProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, null, loadState);

  const answerQuestion = useCallback((questionId, subtopic, correct) => {
    dispatch({ type: 'ANSWER_QUESTION', payload: { questionId, subtopic, correct } });
  }, []);

  const saveExam = useCallback((examData) => {
    dispatch({ type: 'SAVE_EXAM', payload: { ...examData, timestamp: Date.now() } });
  }, []);

  const resetStats = useCallback(() => {
    dispatch({ type: 'RESET_STATS' });
  }, []);

  const getWeakTopics = useCallback(() => {
    const weakTopics = [];
    for (const [subtopic, total] of Object.entries(state.totalAnswered)) {
      const wrong = state.wrongAnswers[subtopic] || 0;
      const accuracy = ((total - wrong) / total) * 100;
      if (accuracy < 70) {
        weakTopics.push({ subtopic, accuracy: Math.round(accuracy), total, wrong });
      }
    }
    return weakTopics.sort((a, b) => a.accuracy - b.accuracy);
  }, [state.totalAnswered, state.wrongAnswers]);

  const getTopicStats = useCallback(() => {
    const stats = {};
    for (const [subtopic, total] of Object.entries(state.totalAnswered)) {
      const wrong = state.wrongAnswers[subtopic] || 0;
      stats[subtopic] = {
        total,
        correct: total - wrong,
        wrong,
        accuracy: Math.round(((total - wrong) / total) * 100)
      };
    }
    return stats;
  }, [state.totalAnswered, state.wrongAnswers]);

  return (
    <QuizContext.Provider value={{
      state,
      answerQuestion,
      saveExam,
      resetStats,
      getWeakTopics,
      getTopicStats
    }}>
      {children}
    </QuizContext.Provider>
  );
}

export function useQuiz() {
  const context = useContext(QuizContext);
  if (!context) throw new Error('useQuiz must be used within QuizProvider');
  return context;
}
