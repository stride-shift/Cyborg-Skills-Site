import { useState, useEffect } from 'react';

function AnimatedScore({ target, color }) {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    let frame = 0;
    const totalFrames = 30;
    const interval = setInterval(() => {
      frame++;
      setDisplay(Math.round((frame / totalFrames) * target));
      if (frame >= totalFrames) clearInterval(interval);
    }, 25);
    return () => clearInterval(interval);
  }, [target]);

  return (
    <div className="score-big" style={{ color }}>
      {display}<span style={{ fontSize: '1.2rem', color: '#5a6478' }}>/10</span>
    </div>
  );
}

export default function ScoreReveal({ result, synthesisText }) {
  const scoreColor = result.score >= 7 ? '#3ecf71' : result.score >= 4 ? '#f0a500' : '#f05050';
  const rating = result.score >= 9 ? 'Brilliant Synthesis' : result.score >= 7 ? 'Strong Synthesis' : result.score >= 4 ? 'Developing Insight' : 'Surface Level';

  const dimensions = [
    { key: 'integrationScore', label: 'Integration' },
    { key: 'assumptionScore', label: 'Assumptions' },
    { key: 'actionabilityScore', label: 'Actionability' },
    { key: 'originalityScore', label: 'Originality' },
  ];

  return (
    <>
      <div className="score-reveal">
        <AnimatedScore target={result.score} color={scoreColor} />
        <div className="score-rating" style={{ color: scoreColor }}>{rating}</div>

        <div className="score-breakdown">
          {dimensions.map(d => (
            <div key={d.key} className="score-item">
              <div className="score-item-value" style={{ color: ['#f05050', '#f0a500', '#3ecf71'][result[d.key] - 1] || '#8892a4' }}>
                {result[d.key]}/3
              </div>
              <div className="score-item-label">{d.label}</div>
            </div>
          ))}
        </div>

        <div className="score-feedback">{result.feedback}</div>
        <div className="score-missed">What you could have seen: {result.missedInsight}</div>
      </div>

      <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 14, padding: 20, marginBottom: 20 }}>
        <div className="lenses-label">Your Synthesis</div>
        <p style={{ fontSize: '0.92rem', color: '#c8cdd5', lineHeight: 1.7, fontStyle: 'italic' }}>"{synthesisText}"</p>
      </div>
    </>
  );
}
