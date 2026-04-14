import { useState } from 'react';

export default function SettingsModal({ apiKey, onSave, onClose }) {
  const [key, setKey] = useState(apiKey || '');
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={e => e.stopPropagation()}>
        <h2>Settings</h2>
        <label>Gemini API Key</label>
        <input
          type="password"
          value={key}
          onChange={e => setKey(e.target.value)}
          placeholder="Enter your Gemini API key"
          onKeyDown={e => e.key === 'Enter' && key.trim() && onSave(key.trim())}
        />
        <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
          <button className="btn btn-secondary btn-small" onClick={onClose}>Cancel</button>
          <button className="btn btn-primary btn-small" onClick={() => key.trim() && onSave(key.trim())} disabled={!key.trim()}>Save</button>
        </div>
      </div>
    </div>
  );
}
