import React from 'react';
import ScrollSection from './ScrollSection.jsx';
import { premortem } from '../data/proposalContent.js';

function StatusDot({ status }) {
  const bg = status === 'green' ? 'var(--status-green)' : status === 'amber' ? 'var(--status-amber)' : 'var(--status-red)';
  return <span className="status-dot" style={{ background: bg }} />;
}

export default function PreMortemSection() {
  return (
    <ScrollSection id="premortem">
      <div className="stagger">
        <h2>{premortem.headline}</h2>
        <p className="section-intro">{premortem.intro}</p>
      </div>

      <div className="premortem-list stagger">
        {premortem.failures.map((f, i) => (
          <div key={i} className="premortem-row">
            <div className="premortem-failure">
              <h3>{f.mode}</h3>
              <p>{f.description}</p>
            </div>

            <div className="premortem-status">
              <StatusDot status={f.status} />
              <span className="status-label">{f.statusLabel}</span>
            </div>

            <div className="premortem-mitigation">
              <h3>Mitigation</h3>
              <p>{f.mitigation}</p>
              <span className="premortem-comb-tag">COM-B: {f.combLayer}</span>
            </div>
          </div>
        ))}
      </div>
    </ScrollSection>
  );
}
