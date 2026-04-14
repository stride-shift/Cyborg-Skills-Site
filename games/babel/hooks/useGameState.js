import { useState, useCallback, useMemo } from 'react';
import { LEVELS, CHAPTERS, parseRules, getResponse, checkWin } from '../data/levels.js';

export function useGameState() {
  const [screen, setScreen] = useState('menu'); // menu | play | win
  const [currentLevelId, setCurrentLevelId] = useState(null);
  const [completedLevels, setCompletedLevels] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('babel_completed') || '{}');
    } catch { return {}; }
  });

  // Block positions on the grid (and in tray)
  const [blocks, setBlocks] = useState([]);
  const [moveCount, setMoveCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [failCount, setFailCount] = useState(0);

  const currentLevel = useMemo(() => {
    return LEVELS.find(l => l.id === currentLevelId) || null;
  }, [currentLevelId]);

  // Active rules derived from current block positions
  const activeRules = useMemo(() => {
    if (!currentLevel) return [];
    return parseRules(blocks, currentLevel.gridWidth);
  }, [blocks, currentLevel]);

  // Current AI response based on active rules
  const currentResponse = useMemo(() => {
    if (!currentLevel) return null;
    return getResponse(currentLevel, activeRules);
  }, [currentLevel, activeRules]);

  // Whether current state wins
  const isWinning = useMemo(() => {
    if (!currentLevel) return false;
    return checkWin(currentLevel, activeRules);
  }, [currentLevel, activeRules]);

  // Star rating based on move count vs par
  const starRating = useMemo(() => {
    if (!currentLevel) return 0;
    if (moveCount <= currentLevel.par) return 3;
    if (moveCount <= currentLevel.par + 2) return 2;
    return 1;
  }, [currentLevel, moveCount]);

  // Initialize a level
  const startLevel = useCallback((levelId) => {
    const level = LEVELS.find(l => l.id === levelId);
    if (!level) return;

    const initialBlocks = [
      ...level.fixedBlocks.map(b => ({ ...b, fixed: true, onGrid: true })),
      ...level.movableBlocks.map(b => ({ ...b, fixed: false, onGrid: true })),
      ...level.availableBlocks.map(b => ({ ...b, fixed: false, onGrid: false })),
    ];

    setCurrentLevelId(levelId);
    setBlocks(initialBlocks);
    setMoveCount(0);
    setShowHint(false);
    setFailCount(0);
    setScreen('play');
  }, []);

  // Move a block to a new grid position
  const moveBlock = useCallback((blockId, newX, newY) => {
    setBlocks(prev => {
      const block = prev.find(b => b.id === blockId);
      if (!block || block.fixed) return prev;

      // Check if target cell is occupied
      const occupied = prev.find(b => b.onGrid && b.x === newX && b.y === newY && b.id !== blockId);
      if (occupied) return prev;

      return prev.map(b =>
        b.id === blockId ? { ...b, x: newX, y: newY, onGrid: true } : b
      );
    });
    setMoveCount(c => c + 1);
  }, []);

  // Place a block from tray onto the grid
  const placeBlock = useCallback((blockId, x, y) => {
    setBlocks(prev => {
      const occupied = prev.find(b => b.onGrid && b.x === x && b.y === y);
      if (occupied) return prev;

      return prev.map(b =>
        b.id === blockId ? { ...b, x, y, onGrid: true } : b
      );
    });
    setMoveCount(c => c + 1);
  }, []);

  // Remove a block from grid back to tray
  const removeBlock = useCallback((blockId) => {
    setBlocks(prev => {
      const block = prev.find(b => b.id === blockId);
      if (!block || block.fixed) return prev;
      // Only tray blocks that came from availableBlocks can go back
      const level = LEVELS.find(l => l.id === currentLevelId);
      const isFromTray = level?.availableBlocks.some(ab => ab.id === blockId);
      if (!isFromTray) {
        // Movable blocks stay on grid, just get displaced
        return prev;
      }
      return prev.map(b =>
        b.id === blockId ? { ...b, x: undefined, y: undefined, onGrid: false } : b
      );
    });
  }, [currentLevelId]);

  // Submit current configuration to check win
  const submitConfig = useCallback(() => {
    if (isWinning) {
      // Record completion
      const newCompleted = { ...completedLevels, [currentLevelId]: Math.max(completedLevels[currentLevelId] || 0, starRating) };
      setCompletedLevels(newCompleted);
      localStorage.setItem('babel_completed', JSON.stringify(newCompleted));
      setScreen('win');
    } else {
      setFailCount(f => {
        const next = f + 1;
        if (next >= 3) setShowHint(true);
        return next;
      });
    }
  }, [isWinning, completedLevels, currentLevelId, starRating]);

  // Reset current level
  const resetLevel = useCallback(() => {
    if (currentLevelId) startLevel(currentLevelId);
  }, [currentLevelId, startLevel]);

  // Go to next level
  const nextLevel = useCallback(() => {
    const idx = LEVELS.findIndex(l => l.id === currentLevelId);
    if (idx < LEVELS.length - 1) {
      startLevel(LEVELS[idx + 1].id);
    } else {
      setScreen('menu');
    }
  }, [currentLevelId, startLevel]);

  // Progress info
  const totalStars = useMemo(() => {
    return Object.values(completedLevels).reduce((sum, s) => sum + s, 0);
  }, [completedLevels]);

  const progress = useMemo(() => {
    return {
      completed: Object.keys(completedLevels).length,
      total: LEVELS.length,
      totalStars,
      maxStars: LEVELS.length * 3,
    };
  }, [completedLevels, totalStars]);

  return {
    screen, setScreen,
    currentLevel, currentLevelId,
    blocks, activeRules, currentResponse,
    isWinning, starRating, moveCount,
    showHint, failCount,
    completedLevels, progress,
    startLevel, moveBlock, placeBlock, removeBlock,
    submitConfig, resetLevel, nextLevel,
    chapters: CHAPTERS, levels: LEVELS,
  };
}
