import LensPortrait from './LensPortrait.jsx';

export default function SynthesisPanel({ roundLenses, exploredLenses, synthesisText, onTextChange, onSubmit, onBack, isLoading }) {
  const wordCount = synthesisText.trim() ? synthesisText.trim().split(/\s+/).length : 0;

  return (
    <>
      <div className="explored-summary">
        {Object.keys(exploredLenses).map(id => {
          const lens = roundLenses.find(l => l.id === id);
          return (
            <div key={id} className="explored-chip" style={{ borderColor: `${lens.color}33` }}>
              <LensPortrait lens={lens} size={22} border={1} />
              <span style={{ color: lens.color }}>{lens.name}</span>
            </div>
          );
        })}
      </div>

      <div className="synthesis-section">
        <div className="lenses-label">Your Synthesis</div>
        <p style={{ fontSize: '0.88rem', color: '#8892a4', marginBottom: 14, lineHeight: 1.6 }}>
          What insight emerges when you integrate these perspectives? Write 2-4 sentences that synthesize across viewpoints. The best syntheses break assumptions, combine lenses, and point toward action.
        </p>
        <textarea
          className="synthesis-textarea"
          value={synthesisText}
          onChange={e => onTextChange(e.target.value)}
          placeholder="The real insight here is..."
          disabled={isLoading}
        />
        <div className="synthesis-hint">
          {wordCount === 0 ? 'Write your synthesis above' : `${wordCount} words`}
        </div>
      </div>

      <div className="actions">
        <button className="btn btn-secondary" onClick={onBack}>
          Back to Lenses
        </button>
        <button
          className="btn btn-primary"
          onClick={onSubmit}
          disabled={wordCount < 5 || isLoading}
        >
          {isLoading ? 'Evaluating...' : 'Submit Synthesis'}
        </button>
      </div>
    </>
  );
}
