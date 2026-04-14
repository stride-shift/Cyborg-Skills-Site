import React from 'react';
import * as Icons from 'lucide-react';
import ScrollSection from './ScrollSection.jsx';
import { proof } from '../data/proposalContent.js';

export default function ProofSection() {
  return (
    <ScrollSection id="proof">
      <div className="stagger">
        <h2>{proof.headline}</h2>
        <p className="section-intro">{proof.intro}</p>
      </div>

      <div className="proof-grid stagger">
        {proof.items.map((item, i) => {
          const Icon = Icons[item.icon];
          return (
            <div key={i} className="proof-card">
              <div className="proof-icon">
                {Icon && <Icon size={20} />}
              </div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          );
        })}
      </div>

      <div className="proof-punchline">{proof.punchline}</div>
    </ScrollSection>
  );
}
