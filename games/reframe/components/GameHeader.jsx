export default function GameHeader({ currentRound, lensTokens, bonusTokens, exploredCount, totalScore, screen, muted, onToggleMute }) {
  return (
    <>
      <div className="header">
        <h1>Reframe</h1>
        <p>Round {currentRound + 1} of 3</p>
        <button className="mute-btn" onClick={onToggleMute} title={muted ? 'Unmute' : 'Mute'}>
          {muted ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 5L6 9H2v6h4l5 4V5z"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 010 14.14M15.54 8.46a5 5 0 010 7.07"/></svg>
          )}
        </button>
      </div>

      <div className="stats-bar">
        <div className="stat">
          <div className="stat-value gold">
            {lensTokens}{bonusTokens > 0 && <span style={{ fontSize: '0.8rem', color: '#f0a500' }}>+{bonusTokens}</span>}
          </div>
          <div className="stat-label">Lens Tokens</div>
        </div>
        <div className="stat">
          <div className="stat-value blue">{exploredCount}</div>
          <div className="stat-label">Explored</div>
        </div>
        <div className="stat">
          <div className="stat-value green">{totalScore}</div>
          <div className="stat-label">Score</div>
        </div>
      </div>

      <div className="phase-indicator">
        <div className={`phase-dot ${screen === 'play' ? 'active' : 'done'}`} />
        <div className={`phase-dot ${screen === 'synthesis' ? 'active' : screen === 'results' ? 'done' : ''}`} />
        <div className={`phase-dot ${screen === 'results' ? 'active' : ''}`} />
      </div>
    </>
  );
}
