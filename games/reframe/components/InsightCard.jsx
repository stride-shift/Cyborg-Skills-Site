import React from 'react';

export default function InsightCard({ card, dragStyle, onPointerDown, isDragging }) {
  const style = dragStyle || {
    position: 'absolute',
    left: card.x,
    top: card.y,
    cursor: 'grab',
  };

  return (
    <div
      className={`evidence-card${isDragging ? ' evidence-card--dragging' : ''}`}
      style={{
        ...style,
        '--persona-color': card.personaColor || '#6ee7b7',
      }}
      onPointerDown={(e) => onPointerDown(card.id, e)}
      touch-action="none"
    >
      <div className="evidence-card__persona-dot" />
      <p className="evidence-card__text">{card.text}</p>
    </div>
  );
}
