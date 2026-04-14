import React from 'react';

export default function AIResponse({ prompt, response, isWinning }) {
  if (!response) return null;

  return (
    <div className={`ai-response ${isWinning ? 'ai-response--winning' : ''}`}>
      <div className="ai-response__prompt">
        <span className="ai-response__label">YOU ASKED:</span>
        <p>{prompt}</p>
      </div>

      <div className="ai-response__divider" />

      <div className="ai-response__output">
        <span className="ai-response__label">AI RESPONDS:</span>
        <div className="ai-response__text">
          {response.text.split('\n').map((line, i) => {
            // Handle markdown bold
            const parts = line.split(/(\*\*.*?\*\*)/g);
            return (
              <p key={i}>
                {parts.map((part, j) => {
                  if (part.startsWith('**') && part.endsWith('**')) {
                    return <strong key={j}>{part.slice(2, -2)}</strong>;
                  }
                  return <span key={j}>{part}</span>;
                })}
              </p>
            );
          })}
        </div>
      </div>

      {response.note && (
        <div className="ai-response__note">
          {response.note}
        </div>
      )}

      {isWinning && (
        <div className="ai-response__success">
          ✓ Goal achieved!
        </div>
      )}
    </div>
  );
}
