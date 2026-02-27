import { useState } from 'react';
import { TOPIC_LIST } from '../data/topics';

function StudyMode() {
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [selectedSubtopic, setSelectedSubtopic] = useState(null);

  if (selectedSubtopic) {
    return (
      <div className="study-detail">
        <button className="back-btn" onClick={() => setSelectedSubtopic(null)}>
          ← Back to {selectedTopic.title}
        </button>

        <h2>{selectedSubtopic.title}</h2>

        <section className="concept-section">
          <h3>Concept</h3>
          <div className="concept-content">
            {selectedSubtopic.content.split('\n').map((line, i) => {
              if (line.startsWith('**') && line.endsWith('**')) {
                return <h4 key={i}>{line.replace(/\*\*/g, '')}</h4>;
              }
              if (line.startsWith('- **')) {
                const parts = line.match(/- \*\*(.+?)\*\*(.*)/) || [];
                return (
                  <div key={i} className="list-item">
                    <strong>{parts[1]}</strong>{parts[2]}
                  </div>
                );
              }
              if (line.startsWith('- ')) {
                return <div key={i} className="list-item">{line.substring(2)}</div>;
              }
              if (line.startsWith('**') && line.includes(':**')) {
                const parts = line.match(/\*\*(.+?):\*\*(.*)/) || [];
                return <p key={i}><strong>{parts[1]}:</strong>{parts[2]}</p>;
              }
              if (line.trim() === '') return <br key={i} />;
              return <p key={i}>{line.replace(/\*\*/g, '')}</p>;
            })}
          </div>
        </section>

        {selectedSubtopic.formulas && selectedSubtopic.formulas.length > 0 && (
          <section className="formulas-section">
            <h3>Key Formulas</h3>
            <div className="formulas-grid">
              {selectedSubtopic.formulas.map((f, i) => (
                <div key={i} className="formula-card">
                  <div className="formula-name">{f.name}</div>
                  <div className="formula-math">{f.formula}</div>
                  <div className="formula-explain">{f.explanation}</div>
                </div>
              ))}
            </div>
          </section>
        )}

        {selectedSubtopic.traps && selectedSubtopic.traps.length > 0 && (
          <section className="traps-section">
            <h3>Common MCQ Traps</h3>
            <div className="traps-list">
              {selectedSubtopic.traps.map((trap, i) => (
                <div key={i} className="trap-card">
                  <span className="trap-icon">⚠️</span>
                  <span>{trap}</span>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    );
  }

  if (selectedTopic) {
    return (
      <div className="study-topic">
        <button className="back-btn" onClick={() => setSelectedTopic(null)}>
          ← Back to Topics
        </button>
        <h2>{selectedTopic.title}</h2>
        <div className="subtopic-list">
          {selectedTopic.subtopics.map(sub => (
            <button
              key={sub.id}
              className="subtopic-card"
              onClick={() => setSelectedSubtopic(sub)}
            >
              <h3>{sub.title}</h3>
              <p>{sub.content.split('\n')[0].replace(/\*\*/g, '').substring(0, 100)}...</p>
              <span className="arrow">→</span>
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="study-mode">
      <h2>Study Mode</h2>
      <p className="mode-desc">Learn each concept with clear explanations, formulas, and MCQ traps.</p>
      <div className="topic-grid">
        {TOPIC_LIST.map(topic => (
          <button
            key={topic.id}
            className="topic-card"
            onClick={() => setSelectedTopic(topic)}
          >
            <h3>{topic.title}</h3>
            <p>{topic.subtopics.length} subtopics</p>
            <div className="subtopic-preview">
              {topic.subtopics.map(s => s.title).join(' • ')}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

export default StudyMode;
