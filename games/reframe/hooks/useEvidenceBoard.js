import { useState, useCallback, useMemo, useRef } from 'react';

const CONNECT_DISTANCE = 80; // px — how close cards must be to auto-connect

function generateId() {
  return Math.random().toString(36).slice(2, 9);
}

export function useEvidenceBoard() {
  const [cards, setCards] = useState([]); // { id, text, personaId, personaColor, x, y, type: 'insight' | 'assumption' }
  const [assumptions, setAssumptions] = useState([]); // { id, text, revealed, x, y }
  const [connections, setConnections] = useState([]); // { id, fromId, toId, confirmed }

  // Refs for current state (avoids stale closures in checkConnections)
  const cardsRef = useRef(cards);
  const assumptionsRef = useRef(assumptions);
  const connectionsRef = useRef(connections);
  cardsRef.current = cards;
  assumptionsRef.current = assumptions;
  connectionsRef.current = connections;

  // Add insight cards from a persona response
  const addInsightCards = useCallback((personaId, personaColor, insights, boardWidth) => {
    const newCards = insights.map((text, i) => ({
      id: `${personaId}_${generateId()}`,
      text,
      personaId,
      personaColor,
      type: 'insight',
      // Stagger horizontally, randomize vertically a bit
      x: 40 + Math.random() * (boardWidth - 200),
      y: 30 + Math.random() * 200,
    }));
    setCards(prev => [...prev, ...newCards]);
    return newCards;
  }, []);

  // Initialize hidden assumption cards for a round
  const initAssumptions = useCallback((assumptionTexts, boardWidth) => {
    const newAssumptions = assumptionTexts.map((text, i) => ({
      id: `assumption_${generateId()}`,
      text,
      revealed: false,
      x: 60 + (i * (boardWidth - 160) / Math.max(assumptionTexts.length - 1, 1)),
      y: 260 + Math.random() * 40,
    }));
    setAssumptions(newAssumptions);
  }, []);

  // Move a card to a new position (also syncs refs for immediate reads)
  const moveCard = useCallback((cardId, x, y) => {
    setAssumptions(prev => {
      const idx = prev.findIndex(a => a.id === cardId);
      if (idx >= 0) {
        const updated = [...prev];
        updated[idx] = { ...updated[idx], x, y };
        assumptionsRef.current = updated;
        return updated;
      }
      return prev;
    });

    setCards(prev => {
      const idx = prev.findIndex(c => c.id === cardId);
      if (idx >= 0) {
        const updated = [...prev];
        updated[idx] = { ...updated[idx], x, y };
        cardsRef.current = updated;
        return updated;
      }
      return prev;
    });
  }, []);

  // Check for nearby cards and auto-create connections after a drop
  // Uses refs to always read current state (avoids stale closure from setTimeout)
  const checkConnections = useCallback((droppedId) => {
    const currentCards = cardsRef.current;
    const currentAssumptions = assumptionsRef.current;
    const currentConnections = connectionsRef.current;

    const allItems = [
      ...currentCards.map(c => ({ ...c, itemType: 'card' })),
      ...currentAssumptions.filter(a => a.revealed).map(a => ({ ...a, itemType: 'assumption' })),
    ];

    const dropped = allItems.find(item => item.id === droppedId);
    if (!dropped) return [];

    const newConnections = [];
    for (const other of allItems) {
      if (other.id === droppedId) continue;

      // Already connected?
      const existing = currentConnections.find(
        c => (c.fromId === droppedId && c.toId === other.id) ||
             (c.fromId === other.id && c.toId === droppedId)
      );
      if (existing) continue;

      const dx = (dropped.x + 60) - (other.x + 60); // center-to-center
      const dy = (dropped.y + 30) - (other.y + 30);
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < CONNECT_DISTANCE) {
        const conn = {
          id: `conn_${generateId()}`,
          fromId: droppedId,
          toId: other.id,
          confirmed: false,
        };
        newConnections.push(conn);
      }
    }

    if (newConnections.length > 0) {
      setConnections(prev => [...prev, ...newConnections]);
    }
    return newConnections;
  }, []);

  // Confirm a connection (player clicks dashed line to confirm)
  const confirmConnection = useCallback((connId) => {
    setConnections(prev =>
      prev.map(c => c.id === connId ? { ...c, confirmed: true } : c)
    );
  }, []);

  // Reveal a hidden assumption
  const revealAssumption = useCallback((assumptionId) => {
    setAssumptions(prev =>
      prev.map(a => a.id === assumptionId ? { ...a, revealed: true } : a)
    );
  }, []);

  // Try to reveal an assumption by checking if a matching assumption text is referenced
  const tryRevealByText = useCallback((assumptionText) => {
    setAssumptions(prev => {
      const idx = prev.findIndex(a => a.text === assumptionText && !a.revealed);
      if (idx >= 0) {
        const updated = [...prev];
        updated[idx] = { ...updated[idx], revealed: true };
        return updated;
      }
      return prev;
    });
  }, []);

  // Reset for new round
  const resetBoard = useCallback(() => {
    setCards([]);
    setAssumptions([]);
    setConnections([]);
  }, []);

  // Compute board state for scoring
  const boardState = useMemo(() => {
    const confirmedConns = connections.filter(c => c.confirmed);
    const connectedPersonas = new Set();
    for (const conn of confirmedConns) {
      const fromCard = cards.find(c => c.id === conn.fromId);
      const toCard = cards.find(c => c.id === conn.toId);
      if (fromCard) connectedPersonas.add(fromCard.personaId);
      if (toCard) connectedPersonas.add(toCard.personaId);
    }
    return {
      totalCards: cards.length,
      confirmedConnections: confirmedConns.length,
      uniquePersonasConnected: connectedPersonas.size,
      assumptionsRevealed: assumptions.filter(a => a.revealed).length,
      assumptionsTotal: assumptions.length,
      connections: confirmedConns.map(c => ({
        from: c.fromId,
        to: c.toId,
      })),
    };
  }, [cards, connections, assumptions]);

  return {
    cards,
    assumptions,
    connections,
    addInsightCards,
    initAssumptions,
    moveCard,
    checkConnections,
    confirmConnection,
    revealAssumption,
    tryRevealByText,
    resetBoard,
    boardState,
  };
}
