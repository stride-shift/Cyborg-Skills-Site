import React, { useState } from 'react';
import ScrollSection from './ScrollSection.jsx';
import { honestProblem } from '../data/proposalContent.js';

function StatusDot({ status }) {
  const bg = status === 'green' ? 'var(--status-green)' : status === 'amber' ? 'var(--status-amber)' : 'var(--status-red)';
  return <span className="status-dot" style={{ background: bg }} />;
}

export default function HonestProblemSection() {
  const [activeSegment, setActiveSegment] = useState(null);
  const { comb } = honestProblem;
  const allLit = activeSegment !== null;

  return (
    <ScrollSection id="honest-problem">
      <div className="stagger">
        <h2>{honestProblem.headline}</h2>
        <p className="section-intro">{honestProblem.intro}</p>
      </div>

      <div className="stagger" style={{ marginBottom: 48 }}>
        {honestProblem.failures.map((f, i) => (
          <div key={i} className="proposal-card" style={{ marginBottom: 16 }}>
            <div style={{ display: 'flex', gap: 20, alignItems: 'baseline' }}>
              <span style={{ fontFamily: "'Playfair Display', serif", fontSize: '2rem', fontWeight: 700, color: 'var(--status-red)', lineHeight: 1, minWidth: 60 }}>
                {f.stat}
              </span>
              <div>
                <p style={{ color: 'var(--text-primary)', marginBottom: 4, fontSize: '0.95rem' }}>{f.label}</p>
                <p style={{ fontSize: '0.85rem', fontStyle: 'italic' }}>{f.insight}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.3rem', marginBottom: 4 }}>{comb.title}</h3>
      <p className="section-intro" style={{ marginBottom: 8 }}>{comb.subtitle}</p>
      <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: 32 }}>{comb.citation}</p>

      <div className="comb-container">
        <div className="comb-diagram">
          {comb.segments.map((seg) => (
            <div
              key={seg.id}
              className={`comb-circle ${seg.id} ${activeSegment === seg.id ? 'active' : ''}`}
              onClick={() => setActiveSegment(activeSegment === seg.id ? null : seg.id)}
            >
              <span className="comb-label">{seg.label}<br /><small style={{ fontFamily: 'Lato, sans-serif', fontWeight: 400, fontSize: '0.72rem' }}>{seg.description}</small></span>
            </div>
          ))}
          <div className={`comb-center ${allLit ? 'all-lit' : ''}`}>
            <span className="comb-behavior-label">{comb.center.label}</span>
          </div>
        </div>

        {activeSegment && (() => {
          const seg = comb.segments.find(s => s.id === activeSegment);
          return (
            <div className="comb-detail">
              <h3>
                {seg.label} <StatusDot status={seg.status} />
              </h3>
              <ul>
                {seg.items.map((item, i) => <li key={i}>{item}</li>)}
              </ul>
              <p className={`status-note ${seg.status === 'green' ? 'accent-green' : 'accent-amber'}`}>
                {seg.statusNote}
              </p>
            </div>
          );
        })()}

        {!activeSegment && (
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textAlign: 'center' }}>
            Tap any circle to see how this program addresses it
          </p>
        )}
      </div>
    </ScrollSection>
  );
}
