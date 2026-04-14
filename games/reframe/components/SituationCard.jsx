import { useState } from 'react';
import { CATEGORY_SCENES } from '../data/categories.js';
import ShimmerBlock from './ShimmerBlock.jsx';

export default function SituationCard({ situation, category, isLoading }) {
  const [bgError, setBgError] = useState(false);
  const bgImage = category && CATEGORY_SCENES[category];

  return (
    <div className="situation-card" style={bgImage && !bgError ? { position: 'relative', overflow: 'hidden' } : {}}>
      {bgImage && !bgError && (
        <img
          src={bgImage}
          alt=""
          className="situation-bg"
          onError={() => setBgError(true)}
        />
      )}
      <div style={{ position: 'relative', zIndex: 1 }}>
        <div className="situation-label">
          The Situation
          {category && <span className="situation-category"> / {category}</span>}
        </div>
        {isLoading ? (
          <ShimmerBlock lines={4} />
        ) : (
          <div className="situation-text">{situation}</div>
        )}
      </div>
    </div>
  );
}
