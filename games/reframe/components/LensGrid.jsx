import LensPortrait from './LensPortrait.jsx';

export default function LensGrid({ roundLenses, exploredLenses, activeLensId, availableTokens, situation, onExploreLens, onSetActiveLens }) {
  const exploredCount = Object.keys(exploredLenses).length;

  return (
    <div className="lenses-section">
      <div className="lenses-label">
        {exploredCount === 0
          ? 'Choose a persona to consult (costs 1 token)'
          : `${availableTokens} token${availableTokens !== 1 ? 's' : ''} remaining \u2014 choose wisely`}
      </div>
      <div className="lenses-grid">
        {roundLenses.map((lens, idx) => {
          const isExplored = !!exploredLenses[lens.id];
          const isActive = activeLensId === lens.id;
          const isDisabled = !isExplored && availableTokens <= 0;
          return (
            <div
              key={lens.id}
              className={`lens-card ${isExplored ? 'active' : ''} ${isDisabled && !isExplored ? 'used' : ''}`}
              style={{
                ...(isExplored ? { '--lens-color': lens.color, '--lens-bg': lens.bg, '--lens-glow': lens.glow } : {}),
                animationDelay: `${idx * 0.08}s`,
              }}
              onClick={() => {
                if (isExplored) {
                  onSetActiveLens(isActive ? null : lens.id);
                } else if (!isDisabled && situation) {
                  onExploreLens(lens.id);
                }
              }}
            >
              {!isExplored && <div className="lens-token-badge">1 token</div>}
              {isExplored && isActive && <div className="lens-bonus-badge">viewing</div>}
              <LensPortrait lens={lens} />
              <div className="lens-name" style={isExplored ? { color: lens.color } : {}}>{lens.name}</div>
              <div className="lens-role">{lens.role}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
