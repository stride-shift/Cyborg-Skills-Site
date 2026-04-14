import { useState, useCallback, useRef } from 'react';

export function useDragDrop(onDrop) {
  const [dragging, setDragging] = useState(null); // { id, offsetX, offsetY }
  const [dragPos, setDragPos] = useState(null); // { x, y } - current pointer position
  const containerRef = useRef(null);

  const getRelativePos = useCallback((e) => {
    if (!containerRef.current) return { x: 0, y: 0 };
    const rect = containerRef.current.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    return {
      x: clientX - rect.left,
      y: clientY - rect.top,
    };
  }, []);

  const onPointerDown = useCallback((id, e) => {
    e.preventDefault();
    e.stopPropagation();
    const pos = getRelativePos(e);
    // offset from card's top-left to pointer
    const cardEl = e.currentTarget;
    const cardRect = cardEl.getBoundingClientRect();
    const containerRect = containerRef.current.getBoundingClientRect();
    setDragging({
      id,
      offsetX: (e.clientX || e.touches[0].clientX) - cardRect.left,
      offsetY: (e.clientY || e.touches[0].clientY) - cardRect.top,
      startX: cardRect.left - containerRect.left,
      startY: cardRect.top - containerRect.top,
    });
    setDragPos(pos);

    if (e.pointerId !== undefined) {
      e.currentTarget.setPointerCapture(e.pointerId);
    }
  }, [getRelativePos]);

  const onPointerMove = useCallback((e) => {
    if (!dragging) return;
    e.preventDefault();
    const pos = getRelativePos(e);
    setDragPos(pos);
  }, [dragging, getRelativePos]);

  const onPointerUp = useCallback((e) => {
    if (!dragging) return;
    const pos = getRelativePos(e);
    const dropX = pos.x - dragging.offsetX;
    const dropY = pos.y - dragging.offsetY;
    if (onDrop) {
      onDrop(dragging.id, dropX, dropY);
    }
    setDragging(null);
    setDragPos(null);
  }, [dragging, getRelativePos, onDrop]);

  // Calculate current position of dragged card
  const getDragStyle = useCallback((id) => {
    if (!dragging || dragging.id !== id || !dragPos) return null;
    return {
      position: 'absolute',
      left: dragPos.x - dragging.offsetX,
      top: dragPos.y - dragging.offsetY,
      zIndex: 100,
      cursor: 'grabbing',
      transition: 'none',
      pointerEvents: 'none',
    };
  }, [dragging, dragPos]);

  return {
    containerRef,
    dragging,
    dragPos,
    onPointerDown,
    onPointerMove,
    onPointerUp,
    getDragStyle,
    isDragging: (id) => dragging?.id === id,
  };
}
