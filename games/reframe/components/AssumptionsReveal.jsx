export default function AssumptionsReveal({ hiddenAssumptions, foundAssumptions }) {
  return (
    <div className="assumptions-reveal">
      <div className="lenses-label" style={{ color: '#f0a500' }}>Hidden Assumptions in This Situation</div>
      <div>
        {hiddenAssumptions.map((a, i) => (
          <span key={i} className={`assumption-tag ${foundAssumptions.includes(a) ? 'found' : ''}`}>
            {foundAssumptions.includes(a) ? '\u2713 ' : ''}{a}
          </span>
        ))}
      </div>
      {foundAssumptions.length > 0 && (
        <p style={{ fontSize: '0.78rem', color: '#5a6478', marginTop: 8 }}>
          Green tags = assumptions your lens conversations surfaced
        </p>
      )}
    </div>
  );
}
