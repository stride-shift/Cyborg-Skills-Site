class AudioManager {
  constructor() {
    this.cache = {};
    this.musicElement = null;
    this.volumes = { sfx: 0.6, voice: 0.8, music: 0.3 };
    this.muted = false;
    this.unlocked = false;
  }

  unlock() {
    if (this.unlocked) return;
    this.unlocked = true;
    // Preload SFX so they're ready to play instantly
    const sfxNames = ['game_start', 'lens_select', 'token_spend', 'bonus_earned', 'score_reveal', 'synthesis_submit'];
    for (const name of sfxNames) {
      const audio = new Audio(`/games/assets/audio/sfx/${name}.wav`);
      audio.preload = 'auto';
      this.cache[`sfx_${name}`] = audio;
    }
  }

  setMuted(muted) {
    this.muted = muted;
    if (this.musicElement) {
      this.musicElement.volume = muted ? 0 : this.volumes.music;
    }
  }

  toggleMute() {
    this.setMuted(!this.muted);
    return this.muted;
  }

  _getAudio(src) {
    if (!this.cache[src]) {
      this.cache[src] = new Audio(src);
    }
    return this.cache[src];
  }

  async playSfx(name) {
    if (this.muted) return;
    try {
      const cached = this.cache[`sfx_${name}`];
      if (cached) {
        cached.currentTime = 0;
        cached.volume = this.volumes.sfx;
        await cached.play();
      } else {
        const audio = new Audio(`/games/assets/audio/sfx/${name}.wav`);
        audio.volume = this.volumes.sfx;
        await audio.play();
      }
    } catch (e) {
      // Graceful degradation — game works without audio
    }
  }

  async playVoice(personaId) {
    if (this.muted) return;
    try {
      const audio = new Audio(`/games/assets/audio/personas/${personaId}.wav`);
      audio.volume = this.volumes.voice;
      await audio.play();
    } catch (e) {
      // Graceful degradation
    }
  }

  async playMusic(name) {
    if (this.muted) return;
    try {
      // Stop current music with fade
      if (this.musicElement) {
        const old = this.musicElement;
        const fadeOut = setInterval(() => {
          if (old.volume > 0.05) {
            old.volume = Math.max(0, old.volume - 0.05);
          } else {
            clearInterval(fadeOut);
            old.pause();
          }
        }, 50);
      }

      const audio = new Audio(`/games/assets/audio/ambient/${name}.wav`);
      audio.volume = 0;
      audio.loop = true;
      this.musicElement = audio;
      await audio.play();

      // Fade in
      const fadeIn = setInterval(() => {
        if (audio.volume < this.volumes.music - 0.05) {
          audio.volume = Math.min(this.volumes.music, audio.volume + 0.05);
        } else {
          audio.volume = this.volumes.music;
          clearInterval(fadeIn);
        }
      }, 50);
    } catch (e) {
      // Graceful degradation
    }
  }

  stopMusic() {
    if (this.musicElement) {
      const el = this.musicElement;
      const fadeOut = setInterval(() => {
        if (el.volume > 0.05) {
          el.volume = Math.max(0, el.volume - 0.05);
        } else {
          clearInterval(fadeOut);
          el.pause();
        }
      }, 50);
      this.musicElement = null;
    }
  }
}

export const audioManager = new AudioManager();
