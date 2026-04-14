import { useState, useEffect, useRef } from 'react';
import LensPortrait from './LensPortrait.jsx';
import ShimmerBlock from './ShimmerBlock.jsx';

export default function ChatPanel({ lens, messages, onSendFollowUp, canFollowUp, isLoading }) {
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSend = () => {
    if (!input.trim() || !canFollowUp) return;
    onSendFollowUp(input.trim());
    setInput('');
  };

  return (
    <div className="chat-panel fade-in" style={{ borderColor: `${lens.color}22` }}>
      <div className="chat-persona-header" style={{ '--lens-color': lens.color }}>
        <LensPortrait lens={lens} size={48} />
        <div className="chat-persona-info">
          <h3 style={{ color: lens.color }}>{lens.name}</h3>
          <span>{lens.role}</span>
        </div>
      </div>
      <div className="chat-messages">
        {messages.map((msg, i) => (
          <div key={i} className={`chat-msg ${msg.type}`}>
            {msg.text}
          </div>
        ))}
        {isLoading && (
          <div className="chat-msg persona">
            <ShimmerBlock lines={2} />
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      {canFollowUp && (
        <div className="chat-input-row">
          <input
            className="chat-input"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Ask a follow-up question..."
            onKeyDown={e => e.key === 'Enter' && handleSend()}
            disabled={isLoading}
          />
          <button className="btn btn-primary btn-small" onClick={handleSend} disabled={!input.trim() || isLoading}>Ask</button>
        </div>
      )}
    </div>
  );
}
