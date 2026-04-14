import { useState, useCallback } from 'react';
import { audioManager } from './AudioManager.js';

export function useAudio() {
  const [muted, setMuted] = useState(audioManager.muted);

  const toggle = useCallback(() => {
    const newState = audioManager.toggleMute();
    setMuted(newState);
  }, []);

  const playSfx = useCallback((name) => audioManager.playSfx(name), []);
  const playVoice = useCallback((id) => audioManager.playVoice(id), []);
  const playMusic = useCallback((name) => audioManager.playMusic(name), []);
  const stopMusic = useCallback(() => audioManager.stopMusic(), []);
  const unlock = useCallback(() => audioManager.unlock(), []);

  return { muted, toggle, playSfx, playVoice, playMusic, stopMusic, unlock };
}
