import { useState } from 'react';

export default function ApiKeyPrompt({ onSave }) {
  const [key, setKey] = useState('');
  return (
    <div className="reframe-game">
      <div className="game-container">
        <div className="intro-screen">
          <h1>Reframe</h1>
          <p className="subtitle">This game uses AI to create live conversations with expert personas. You'll need a Gemini API key to play.</p>
          <div style={{ maxWidth: 400, margin: '0 auto' }}>
            <input
              type="password"
              value={key}
              onChange={e => setKey(e.target.value)}
              placeholder="Enter your Gemini API key"
              style={{
                width: '100%', padding: '12px 16px', background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.12)', borderRadius: 10, color: '#f0f2f5',
                fontFamily: 'Lato, sans-serif', fontSize: '0.95rem', marginBottom: 16, outline: 'none',
              }}
              onKeyDown={e => e.key === 'Enter' && key.trim() && onSave(key.trim())}
            />
            <button className="btn btn-primary" onClick={() => key.trim() && onSave(key.trim())} disabled={!key.trim()} style={{ width: '100%' }}>
              Continue
            </button>
            <p style={{ fontSize: '0.75rem', color: '#5a6478', marginTop: 12 }}>
              Your key is stored locally in your browser only.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
