import React from 'react';
import { useGameState } from './hooks/useGameState.js';
import LevelSelect from './components/LevelSelect.jsx';
import RuleBoard from './components/RuleBoard.jsx';
import AIResponse from './components/AIResponse.jsx';
import WinScreen from './components/WinScreen.jsx';
import './BabelGame.css';

export default function BabelGame() {
  const game = useGameState();

  return (
    <div className="babel-game">
      <div className="game-container">

        {/* LEVEL SELECT */}
        {game.screen === 'menu' && (
          <LevelSelect
            chapters={game.chapters}
            levels={game.levels}
            completedLevels={game.completedLevels}
            progress={game.progress}
            onSelectLevel={game.startLevel}
          />
        )}

        {/* PLAY */}
        {game.screen === 'play' && game.currentLevel && (
          <>
            <div className="play-header">
              <button className="btn btn-ghost btn-sm" onClick={() => game.setScreen('menu')}>
                ← Back
              </button>
              <div className="play-header__info">
                <span className="play-header__chapter">
                  Ch.{game.currentLevel.chapter}
                </span>
                <h2 className="play-header__title">{game.currentLevel.title}</h2>
              </div>
              <div className="play-header__moves">
                {game.moveCount} moves
              </div>
            </div>

            <div className="play-goal">
              <span className="play-goal__label">GOAL:</span>
              <p>{game.currentLevel.goal}</p>
            </div>

            {game.showHint && game.currentLevel.hint && (
              <div className="play-hint">
                <span className="play-hint__label">HINT:</span>
                <p>{game.currentLevel.hint}</p>
              </div>
            )}

            <RuleBoard
              blocks={game.blocks}
              gridWidth={game.currentLevel.gridWidth}
              gridHeight={game.currentLevel.gridHeight}
              activeRules={game.activeRules}
              onMoveBlock={game.moveBlock}
              onPlaceBlock={game.placeBlock}
              onRemoveBlock={game.removeBlock}
            />

            <AIResponse
              prompt={game.currentLevel.prompt}
              response={game.currentResponse}
              isWinning={game.isWinning}
            />

            <div className="play-actions">
              <button className="btn btn-ghost" onClick={game.resetLevel}>
                Reset
              </button>
              <button
                className={`btn ${game.isWinning ? 'btn-success' : 'btn-primary'}`}
                onClick={game.submitConfig}
              >
                {game.isWinning ? '✓ Submit Solution' : 'Check Solution'}
              </button>
            </div>

            {game.failCount > 0 && !game.isWinning && (
              <div className="play-feedback">
                Not quite — the AI response doesn't meet the goal yet.
                {game.failCount >= 2 && !game.showHint && ' Try rearranging the blocks.'}
              </div>
            )}
          </>
        )}

        {/* WIN */}
        {game.screen === 'win' && game.currentLevel && (
          <WinScreen
            level={game.currentLevel}
            starRating={game.starRating}
            moveCount={game.moveCount}
            onNext={game.nextLevel}
            onRetry={game.resetLevel}
            onMenu={() => game.setScreen('menu')}
          />
        )}
      </div>
    </div>
  );
}
