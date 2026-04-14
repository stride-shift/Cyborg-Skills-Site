import { useState, useCallback } from 'react';
import { useGameState } from './hooks/useGameState.js';
import { useAudio } from './audio/useAudio.js';
import ApiKeyPrompt from './components/ApiKeyPrompt.jsx';
import SettingsModal from './components/SettingsModal.jsx';
import IntroScreen from './components/IntroScreen.jsx';
import GameHeader from './components/GameHeader.jsx';
import SituationCard from './components/SituationCard.jsx';
import LensGrid from './components/LensGrid.jsx';
import ChatPanel from './components/ChatPanel.jsx';
import ShimmerBlock from './components/ShimmerBlock.jsx';
import SynthesisPanel from './components/SynthesisPanel.jsx';
import ScoreReveal from './components/ScoreReveal.jsx';
import AssumptionsReveal from './components/AssumptionsReveal.jsx';
import GameOverScreen from './components/GameOverScreen.jsx';
import EvidenceBoard from './components/EvidenceBoard.jsx';
import './ReframeGame.css';

export default function ReframeGame() {
  const [apiKey, setApiKey] = useState(() => localStorage.getItem('cyborg_gemini_key') || '');
  const [showSettings, setShowSettings] = useState(false);
  const audio = useAudio();

  const saveApiKey = useCallback((key) => {
    localStorage.setItem('cyborg_gemini_key', key);
    setApiKey(key);
    setShowSettings(false);
  }, []);

  const game = useGameState(apiKey);

  // Audio-augmented actions
  const handleStart = useCallback(() => {
    audio.unlock();
    // Small delay so unlock completes before first sound
    setTimeout(() => audio.playSfx('game_start'), 50);
    game.startGame();
  }, [audio, game]);

  const handleExploreLens = useCallback((lensId) => {
    audio.playSfx('lens_select');
    audio.playVoice(lensId);
    audio.playSfx('token_spend');
    game.exploreLens(lensId);
  }, [audio, game]);

  const handleSubmitSynthesis = useCallback(() => {
    audio.playSfx('synthesis_submit');
    game.submitSynthesis();
  }, [audio, game]);

  const handleNextRound = useCallback(() => {
    game.nextRound();
  }, [game]);

  // Play score reveal sound when results appear
  const handleGoToSynthesis = useCallback(() => {
    game.goToSynthesis();
  }, [game]);

  if (!apiKey) {
    return <ApiKeyPrompt onSave={saveApiKey} />;
  }

  const settingsButton = (
    <button className="settings-btn" onClick={() => setShowSettings(true)} title="Settings">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>
    </button>
  );

  // Score reveal audio effect
  if (game.screen === 'results' && game.synthesisResult) {
    // Trigger once when entering results
    // We use a ref-based approach in production, but for simplicity:
    // The sound plays via submitSynthesis -> results transition
  }

  return (
    <div className="reframe-game">
      <div className="game-container">
        {settingsButton}
        {showSettings && <SettingsModal apiKey={apiKey} onSave={saveApiKey} onClose={() => setShowSettings(false)} />}

        {/* INTRO */}
        {game.screen === 'intro' && (
          <IntroScreen onStart={handleStart} />
        )}

        {/* GAME OVER */}
        {game.screen === 'gameover' && (
          <GameOverScreen
            totalScore={game.totalScore}
            roundScores={game.roundScores}
            onPlayAgain={handleStart}
          />
        )}

        {/* PLAY / SYNTHESIS / RESULTS */}
        {(game.screen === 'play' || game.screen === 'synthesis' || game.screen === 'results') && (
          <>
            <GameHeader
              currentRound={game.currentRound}
              lensTokens={game.lensTokens}
              bonusTokens={game.bonusTokens}
              exploredCount={game.exploredCount}
              totalScore={game.totalScore}
              screen={game.screen}
              muted={audio.muted}
              onToggleMute={audio.toggle}
            />

            {game.error && <div className="error-msg">{game.error}</div>}

            <SituationCard
              situation={game.situation}
              category={game.category}
              isLoading={game.isSituationLoading}
            />

            {/* PLAY PHASE */}
            {game.screen === 'play' && (
              <>
                <LensGrid
                  roundLenses={game.roundLenses}
                  exploredLenses={game.exploredLenses}
                  activeLensId={game.activeLensId}
                  availableTokens={game.availableTokens}
                  situation={game.situation}
                  onExploreLens={handleExploreLens}
                  onSetActiveLens={game.setActiveLensId}
                />

                {game.activeLens && game.activeLensData && (
                  <ChatPanel
                    lens={game.activeLens}
                    messages={game.activeLensData.messages}
                    onSendFollowUp={(q) => game.sendFollowUp(game.activeLensId, q)}
                    canFollowUp={!game.activeLensData.done}
                    isLoading={game.isLensLoading}
                  />
                )}

                {game.activeLensId && !game.activeLensData && game.isLensLoading && (
                  <div className="chat-panel">
                    <ShimmerBlock lines={3} />
                  </div>
                )}

                {/* Evidence Board */}
                <EvidenceBoard board={game.board} />

                {game.exploredCount >= 1 && (
                  <div className="actions">
                    <button className="btn btn-primary" onClick={handleGoToSynthesis}>
                      Write Your Synthesis ({game.exploredCount} perspective{game.exploredCount !== 1 ? 's' : ''} explored)
                    </button>
                  </div>
                )}
              </>
            )}

            {/* SYNTHESIS PHASE */}
            {game.screen === 'synthesis' && (
              <>
              <EvidenceBoard board={game.board} />
              <SynthesisPanel
                roundLenses={game.roundLenses}
                exploredLenses={game.exploredLenses}
                synthesisText={game.synthesisText}
                onTextChange={game.setSynthesisText}
                onSubmit={handleSubmitSynthesis}
                onBack={() => game.setScreen('play')}
                isLoading={game.isSynthesisLoading}
              />
              </>
            )}

            {/* RESULTS PHASE */}
            {game.screen === 'results' && game.synthesisResult && (
              <>
                <ScoreReveal result={game.synthesisResult} synthesisText={game.synthesisText} />
                <AssumptionsReveal hiddenAssumptions={game.hiddenAssumptions} foundAssumptions={game.foundAssumptions} />
                <div className="actions">
                  <button className="btn btn-primary" onClick={handleNextRound}>
                    {game.currentRound >= 2 ? 'See Final Score' : 'Next Situation'}
                  </button>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
