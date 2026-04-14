export default function GameOverScreen({ totalScore, roundScores, onPlayAgain }) {
  const avg = totalScore / 3;
  const rating = avg >= 8 ? 'Perspective Master' : avg >= 6 ? 'Multi-Lens Thinker' : avg >= 4 ? 'Frame Shifter' : 'Single Lens';
  const ratingColor = avg >= 8 ? '#3ecf71' : avg >= 6 ? '#f0a500' : avg >= 4 ? '#4d9ff0' : '#8892a4';

  return (
    <div className="intro-screen">
      <h1>Game Complete</h1>
      <div className="gameover-score">{totalScore}</div>
      <p className="subtitle" style={{ marginBottom: '4px' }}>Total Score (across 3 rounds)</p>
      <p style={{ color: ratingColor, fontSize: '1.2rem', fontWeight: 700, marginBottom: '28px', letterSpacing: '1px' }}>
        {rating}
      </p>
      <div style={{ textAlign: 'left', maxWidth: 480, margin: '0 auto 30px' }}>
        {roundScores.map((r, i) => (
          <div key={i} style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            marginBottom: 10, padding: '10px 14px', background: 'rgba(255,255,255,0.03)', borderRadius: 10, fontSize: '0.88rem',
          }}>
            <span style={{ color: '#8892a4' }}>Round {i + 1}</span>
            <span>
              <span style={{ color: r.score >= 7 ? '#3ecf71' : r.score >= 4 ? '#f0a500' : '#f05050', fontWeight: 700, fontSize: '1.1rem' }}>{r.score}</span>
              <span style={{ color: '#5a6478', marginLeft: 8, fontSize: '0.75rem' }}>{r.lensesUsed} lenses</span>
            </span>
          </div>
        ))}
      </div>
      <button className="btn btn-primary" onClick={onPlayAgain}>Play Again</button>
    </div>
  );
}
