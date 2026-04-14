import React from 'react';

function Stars({ count, max = 3, size = 14 }) {
  return (
    <span className="stars">
      {Array.from({ length: max }, (_, i) => (
        <span key={i} className={`star ${i < count ? 'star--filled' : ''}`} style={{ fontSize: size }}>
          ★
        </span>
      ))}
    </span>
  );
}

export default function LevelSelect({ chapters, levels, completedLevels, progress, onSelectLevel }) {
  return (
    <div className="level-select">
      <div className="level-select__header">
        <h1 className="level-select__title">BABEL</h1>
        <p className="level-select__subtitle">Rewrite the rules of AI</p>
        <div className="level-select__progress">
          <Stars count={progress.totalStars} max={progress.maxStars} size={10} />
          <span>{progress.completed}/{progress.total} levels</span>
        </div>
      </div>

      {chapters.map(chapter => {
        const chapterLevels = levels.filter(l => l.chapter === chapter.id);
        const chapterCompleted = chapterLevels.filter(l => completedLevels[l.id]).length;
        const isLocked = chapter.id > 1 && (() => {
          const prevChapterLevels = levels.filter(l => l.chapter === chapter.id - 1);
          const prevCompleted = prevChapterLevels.filter(l => completedLevels[l.id]).length;
          return prevCompleted < Math.ceil(prevChapterLevels.length * 0.5);
        })();

        return (
          <div key={chapter.id} className={`chapter ${isLocked ? 'chapter--locked' : ''}`}>
            <div className="chapter__header" style={{ '--chapter-color': chapter.color }}>
              <span className="chapter__number">Chapter {chapter.id}</span>
              <h2 className="chapter__name">{chapter.name}</h2>
              <p className="chapter__desc">{chapter.description}</p>
              <span className="chapter__progress">{chapterCompleted}/{chapterLevels.length}</span>
            </div>

            <div className="chapter__levels">
              {chapterLevels.map((level, i) => {
                const stars = completedLevels[level.id] || 0;
                const prevLevel = i > 0 ? chapterLevels[i - 1] : null;
                const prevChapterLevels = levels.filter(l => l.chapter === chapter.id - 1);
                const canPlay = !isLocked && (i === 0 || completedLevels[prevLevel?.id] || (i === 0 && (chapter.id === 1 || prevChapterLevels.some(l => completedLevels[l.id]))));

                return (
                  <button
                    key={level.id}
                    className={`level-btn ${stars > 0 ? 'level-btn--completed' : ''} ${!canPlay ? 'level-btn--locked' : ''}`}
                    onClick={() => canPlay && onSelectLevel(level.id)}
                    disabled={!canPlay}
                    style={{ '--chapter-color': chapter.color }}
                  >
                    <span className="level-btn__number">{level.id}</span>
                    <span className="level-btn__title">{level.title}</span>
                    {stars > 0 && <Stars count={stars} size={11} />}
                    {!canPlay && <span className="level-btn__lock">🔒</span>}
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
