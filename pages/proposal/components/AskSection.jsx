import React from 'react';
import * as Icons from 'lucide-react';
import ScrollSection from './ScrollSection.jsx';
import { ask } from '../data/proposalContent.js';

export default function AskSection() {
  const { team } = ask;

  return (
    <ScrollSection id="ask">
      <div className="stagger">
        <h2>{ask.headline}</h2>
      </div>

      <div className="team-grid stagger">
        <div className="team-card">
          <h3>{team.dlab.name}</h3>
          <div className="team-role">{team.dlab.role}</div>
          <ul>
            {team.dlab.strengths.map((s, i) => <li key={i}>{s}</li>)}
          </ul>
        </div>
        <div className="team-card">
          <h3>{team.strideshift.name}</h3>
          <div className="team-role">{team.strideshift.role}</div>
          <ul>
            {team.strideshift.strengths.map((s, i) => <li key={i}>{s}</li>)}
          </ul>
        </div>
      </div>

      <div className="team-structure">{team.structure}</div>

      <div className="asks-grid stagger">
        {ask.asks.map((a) => {
          const Icon = Icons[a.icon];
          return (
            <div key={a.number} className="ask-card">
              <div className="ask-number">{a.number}</div>
              {Icon && <Icon size={24} color="var(--green-accent)" style={{ marginBottom: 12 }} />}
              <h3>{a.title}</h3>
              <p>{a.description}</p>
            </div>
          );
        })}
      </div>

      <div className="closing-statement">
        <p>{ask.closing}</p>
      </div>
    </ScrollSection>
  );
}
