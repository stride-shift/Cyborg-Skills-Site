import { useState } from 'react';

export default function LensPortrait({ lens, size = 64, border = 2 }) {
  const [imgError, setImgError] = useState(false);
  if (lens.portrait && !imgError) {
    return (
      <img
        src={lens.portrait}
        alt={lens.name}
        style={{
          width: size, height: size, borderRadius: '50%', objectFit: 'cover',
          border: `${border}px solid ${lens.color}`, flexShrink: 0,
        }}
        onError={() => setImgError(true)}
      />
    );
  }
  return (
    <div style={{
      width: size, height: size, borderRadius: '50%', background: 'rgba(255,255,255,0.06)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: size * 0.4, border: `${border}px solid ${lens.color}`, flexShrink: 0,
    }}>
      {lens.emoji}
    </div>
  );
}
