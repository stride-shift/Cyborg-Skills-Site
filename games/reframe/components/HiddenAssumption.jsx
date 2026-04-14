import React from 'react';

export default function HiddenAssumption({ assumption, dragStyle, onPointerDown, isDragging }) {
  const style = dragStyle || {
    position: 'absolute',
    left: assumption.x,
    top: assumption.y,
    cursor: assumption.revealed ? 'grab' : 'default',
  };

  return (
    <div
      className={`assumption-card ${assumption.revealed ? 'assumption-card--revealed' : 'assumption-card--hidden'}${isDragging ? ' assumption-card--dragging' : ''}`}
      style={style}
      onPointerDown={assumption.revealed ? (e) => onPointerDown(assumption.id, e) : undefined}
      touch-action="none"
    >
      {assumption.revealed ? (
        <p className="assumption-card__text">{assumption.text}</p>
      ) : (
        <div className="assumption-card__mystery">?</div>
      )}
    </div>
  );
}
