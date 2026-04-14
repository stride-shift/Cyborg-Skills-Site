import React from 'react';

// Card center offsets (half of card dimensions)
const CARD_W2 = 60;
const CARD_H2 = 40;

export default function ConnectionLine({ connection, allItems, onConfirm }) {
  const from = allItems.find(item => item.id === connection.fromId);
  const to = allItems.find(item => item.id === connection.toId);
  if (!from || !to) return null;

  const x1 = from.x + CARD_W2;
  const y1 = from.y + CARD_H2;
  const x2 = to.x + CARD_W2;
  const y2 = to.y + CARD_H2;

  // Midpoint for click target
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2;

  return (
    <g className="connection-line-group">
      <line
        x1={x1} y1={y1} x2={x2} y2={y2}
        className={`connection-line ${connection.confirmed ? 'connection-line--confirmed' : 'connection-line--pending'}`}
      />
      {!connection.confirmed && (
        <circle
          cx={mx} cy={my} r={10}
          className="connection-confirm-btn"
          onClick={() => onConfirm(connection.id)}
        >
          <title>Click to confirm connection</title>
        </circle>
      )}
    </g>
  );
}
