import React from 'react';
import * as Icons from 'lucide-react';
import ScrollSection from './ScrollSection.jsx';
import { seed } from '../data/proposalContent.js';

export default function SeedSection() {
  return (
    <ScrollSection id="seed">
      <div className="stagger">
        <h2>{seed.headline}</h2>
        <p className="section-intro">{seed.intro}</p>
      </div>

      <div className="seed-quote">
        <p>"{seed.quote.text}"</p>
        <cite>— {seed.quote.author}</cite>
      </div>

      <div className="habits-grid stagger">
        {seed.habits.map((habit, i) => {
          const Icon = Icons[habit.icon];
          return (
            <div key={i} className="habit-card">
              <div className="habit-name">
                {Icon && <Icon size={18} color="var(--green-accent)" />}
                {habit.name}
              </div>
              <p className="habit-desc">{habit.description}</p>
              <div className="habit-example">{habit.example}</div>
            </div>
          );
        })}
      </div>

      <p className="seed-goal">{seed.goal}</p>
    </ScrollSection>
  );
}
