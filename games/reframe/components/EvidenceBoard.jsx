import React, { useCallback } from 'react';
import { useDragDrop } from '../hooks/useDragDrop';
import InsightCard from './InsightCard';
import ConnectionLine from './ConnectionLine';
import HiddenAssumption from './HiddenAssumption';

export default function EvidenceBoard({ board }) {
  const {
    cards, assumptions, connections,
    moveCard, checkConnections, confirmConnection,
    boardState,
  } = board;

  const handleDrop = useCallback((id, x, y) => {
    moveCard(id, x, y);
    checkConnections(id);
  }, [moveCard, checkConnections]);

  const { containerRef, onPointerDown, onPointerMove, onPointerUp, getDragStyle, isDragging } = useDragDrop(handleDrop);

  // Combine all items for connection line lookups
  const allItems = [
    ...cards,
    ...assumptions.filter(a => a.revealed),
  ];

  const hasContent = cards.length > 0 || assumptions.length > 0;

  return (
    <div
      className={`evidence-board${!hasContent ? ' evidence-board--empty' : ''}`}
      ref={containerRef}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerLeave={onPointerUp}
    >
      <div className="evidence-board__label">EVIDENCE BOARD</div>

      {!hasContent && (
        <div className="evidence-board__placeholder">
          Consult a persona to start building your evidence
        </div>
      )}

      {/* Connection lines (SVG layer) */}
      <svg className="evidence-board__svg" width="100%" height="100%">
        {connections.map(conn => (
          <ConnectionLine
            key={conn.id}
            connection={conn}
            allItems={allItems}
            onConfirm={confirmConnection}
          />
        ))}
      </svg>

      {/* Insight cards */}
      {cards.map(card => (
        <InsightCard
          key={card.id}
          card={card}
          dragStyle={getDragStyle(card.id)}
          onPointerDown={onPointerDown}
          isDragging={isDragging(card.id)}
        />
      ))}

      {/* Assumption cards */}
      {assumptions.map(assumption => (
        <HiddenAssumption
          key={assumption.id}
          assumption={assumption}
          dragStyle={getDragStyle(assumption.id)}
          onPointerDown={onPointerDown}
          isDragging={isDragging(assumption.id)}
        />
      ))}

      {/* Board stats */}
      {hasContent && (
        <div className="evidence-board__stats">
          {boardState.totalCards} insights | {connections.length} links ({boardState.confirmedConnections} confirmed) | {boardState.assumptionsRevealed}/{boardState.assumptionsTotal} assumptions
        </div>
      )}
    </div>
  );
}
