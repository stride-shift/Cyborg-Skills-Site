import React from 'react';

function Stars({ count, max = 3 }) {
  return (
    <div className="win-stars">
      {Array.from({ length: max }, (_, i) => (
        <span
          key={i}
          className={`win-star ${i < count ? 'win-star--filled' : ''}`}
          style={{ animationDelay: `${i * 0.15}s` }}
        >
          ★
        </span>
      ))}
    </div>
  );
}

export default function WinScreen({ level, starRating, moveCount, onNext, onRetry, onMenu }) {
  const parDiff = moveCount - level.par;

  return (
    <div className="win-screen">
      <div className="win-screen__card">
        <h2 className="win-screen__title">Level Complete!</h2>
        <p className="win-screen__level">{level.title}</p>

        <Stars count={starRating} />

        <div className="win-screen__stats">
          <div className="win-stat">
            <span className="win-stat__value">{moveCount}</span>
            <span className="win-stat__label">moves</span>
          </div>
          <div className="win-stat">
            <span className="win-stat__value">{level.par}</span>
            <span className="win-stat__label">par</span>
          </div>
        </div>

        {parDiff <= 0 && <p className="win-screen__msg">Perfect! You solved it optimally.</p>}
        {parDiff === 1 && <p className="win-screen__msg">Just one move over par. Well done!</p>}
        {parDiff === 2 && <p className="win-screen__msg">Good solve. Can you do it in fewer moves?</p>}
        {parDiff > 2 && <p className="win-screen__msg">You got it! Try again for a better rating.</p>}

        <div className="win-screen__actions">
          <button className="btn btn-ghost" onClick={onRetry}>Try Again</button>
          <button className="btn btn-primary" onClick={onNext}>Next Level</button>
        </div>
        <button className="btn btn-text" onClick={onMenu}>Back to Menu</button>
      </div>
    </div>
  );
}
