import React from 'react';
import { Calendar, Users, DollarSign } from 'lucide-react';
import ScrollSection from './ScrollSection.jsx';
import { funding } from '../data/proposalContent.js';

// Approximate max for bar width calc (R12M out of ~R50M total = ~24%)
const maxBudget = 12;
function parseMin(range) {
  const match = range.match(/R(\d+)/);
  return match ? parseInt(match[1]) : 5;
}

export default function FundingSection() {
  return (
    <ScrollSection id="funding">
      <div className="stagger">
        <h2>{funding.headline}</h2>
        <p className="section-intro">{funding.intro}</p>
      </div>

      <div className="budget-chart stagger">
        {funding.budget.map((item, i) => {
          const min = parseMin(item.range);
          const pct = Math.round((min / maxBudget) * 100);
          return (
            <div key={i} className="budget-row">
              <span className="budget-label">{item.category}</span>
              <div className="budget-bar-track">
                <div
                  className={`budget-bar-fill bar-${item.color}`}
                  style={{ '--bar-width': `${pct}%` }}
                >
                  {item.description}
                </div>
              </div>
              <span className="budget-range">{item.range}</span>
            </div>
          );
        })}
      </div>

      <div className="phase-timeline stagger">
        {funding.phases.map((phase, i) => (
          <div key={i} className="phase-item">
            <div className="phase-dot" />
            <h3>{phase.name}</h3>
            <div className="phase-meta">
              <span><Calendar size={13} /> {phase.duration}</span>
              <span><Users size={13} /> {phase.participants} participants</span>
              <span><DollarSign size={13} /> {phase.budget}</span>
            </div>
            <p>{phase.description}</p>
            <div className="phase-gate"><strong>Decision Gate:</strong> {phase.gate}</div>
          </div>
        ))}
      </div>

      <p className="funding-punchline">{funding.punchline}</p>
    </ScrollSection>
  );
}
