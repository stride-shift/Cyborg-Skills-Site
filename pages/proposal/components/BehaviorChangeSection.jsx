import React, { useState } from 'react';
import * as Icons from 'lucide-react';
import ScrollSection from './ScrollSection.jsx';
import { behaviorChange } from '../data/proposalContent.js';

export default function BehaviorChangeSection() {
  const [flipped, setFlipped] = useState({});

  const toggle = (i) => setFlipped(prev => ({ ...prev, [i]: !prev[i] }));

  return (
    <ScrollSection id="behavior-change">
      <div className="stagger">
        <h2>{behaviorChange.headline}</h2>
        <p className="section-intro">{behaviorChange.intro}</p>
      </div>

      <div className="east-grid stagger">
        {behaviorChange.cards.map((card, i) => {
          const Icon = Icons[card.icon];
          return (
            <div key={i} className={`east-card ${flipped[i] ? 'flipped' : ''}`} onClick={() => toggle(i)}>
              <div className="east-card-inner">
                <div className="east-card-front">
                  <div className="east-principle">
                    {Icon && <Icon size={20} />}
                    {card.principle}
                  </div>
                  <p>{card.front}</p>
                  <span className="flip-hint">Tap to see how we applied this</span>
                </div>
                <div className="east-card-back">
                  <h4>How we applied "{card.principle}"</h4>
                  <ul>
                    {card.back.map((item, j) => <li key={j}>{item}</li>)}
                  </ul>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </ScrollSection>
  );
}
