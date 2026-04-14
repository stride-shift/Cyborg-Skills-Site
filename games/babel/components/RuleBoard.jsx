import React, { useCallback } from 'react';

const BLOCK_COLORS = {
  subject: { bg: 'rgba(77, 159, 240, 0.15)', border: '#4d9ff0', text: '#4d9ff0' },
  verb: { bg: 'rgba(255, 255, 255, 0.08)', border: '#8892a4', text: '#c8cdd5' },
  modifier: { bg: 'rgba(62, 207, 113, 0.15)', border: '#3ecf71', text: '#3ecf71' },
};

function Block({ block, isActive, isDragging, onDragStart, onDoubleClick }) {
  const colors = BLOCK_COLORS[block.type] || BLOCK_COLORS.modifier;
  const isFixed = block.fixed;

  return (
    <div
      className={`block ${isActive ? 'block--active' : ''} ${isDragging ? 'block--dragging' : ''} ${isFixed ? 'block--fixed' : ''}`}
      style={{
        backgroundColor: colors.bg,
        borderColor: colors.border,
        color: colors.text,
      }}
      draggable={!isFixed}
      onDragStart={(e) => !isFixed && onDragStart(e, block.id)}
      onDoubleClick={() => !isFixed && onDoubleClick?.(block.id)}
    >
      {block.text}
    </div>
  );
}

export default function RuleBoard({
  blocks, gridWidth, gridHeight, activeRules,
  onMoveBlock, onPlaceBlock, onRemoveBlock,
}) {
  const gridBlocks = blocks.filter(b => b.onGrid);
  const trayBlocks = blocks.filter(b => !b.onGrid);

  const handleDragStart = useCallback((e, blockId) => {
    e.dataTransfer.setData('text/plain', blockId);
    e.dataTransfer.effectAllowed = 'move';
  }, []);

  const handleDrop = useCallback((e, x, y) => {
    e.preventDefault();
    const blockId = e.dataTransfer.getData('text/plain');
    if (!blockId) return;

    const block = blocks.find(b => b.id === blockId);
    if (!block) return;

    if (block.onGrid) {
      onMoveBlock(blockId, x, y);
    } else {
      onPlaceBlock(blockId, x, y);
    }
  }, [blocks, onMoveBlock, onPlaceBlock]);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  }, []);

  const handleTrayDrop = useCallback((e) => {
    e.preventDefault();
    const blockId = e.dataTransfer.getData('text/plain');
    if (blockId) onRemoveBlock(blockId);
  }, [onRemoveBlock]);

  // Build grid cells
  const cells = [];
  for (let y = 0; y < gridHeight; y++) {
    for (let x = 0; x < gridWidth; x++) {
      const block = gridBlocks.find(b => b.x === x && b.y === y);
      const isPartOfRule = block && activeRules.some(r => {
        const parts = r.split(' ');
        // Check if this block is part of any active rule
        return parts.includes(block.text);
      });

      cells.push(
        <div
          key={`${x}-${y}`}
          className={`grid-cell ${block ? 'grid-cell--occupied' : ''}`}
          onDrop={(e) => handleDrop(e, x, y)}
          onDragOver={handleDragOver}
        >
          {block && (
            <Block
              block={block}
              isActive={isPartOfRule}
              onDragStart={handleDragStart}
              onDoubleClick={onRemoveBlock}
            />
          )}
        </div>
      );
    }
  }

  return (
    <div className="rule-board">
      <div className="rule-board__label">RULE BOARD</div>

      <div
        className="rule-board__grid"
        style={{
          gridTemplateColumns: `repeat(${gridWidth}, 1fr)`,
          gridTemplateRows: `repeat(${gridHeight}, 1fr)`,
        }}
      >
        {cells}
      </div>

      {/* Active rules display */}
      {activeRules.length > 0 && (
        <div className="rule-board__active">
          {activeRules.map((rule, i) => (
            <div key={i} className="active-rule">
              <span className="active-rule__dot">●</span>
              {rule}
            </div>
          ))}
        </div>
      )}

      {/* Block tray */}
      {trayBlocks.length > 0 && (
        <div
          className="rule-board__tray"
          onDrop={handleTrayDrop}
          onDragOver={handleDragOver}
        >
          <div className="tray-label">Available Blocks</div>
          <div className="tray-blocks">
            {trayBlocks.map(block => (
              <Block
                key={block.id}
                block={block}
                onDragStart={handleDragStart}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
