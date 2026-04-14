import React, { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import ScrollSection from './ScrollSection.jsx';
import useCountUp from '../hooks/useCountUp.js';
import { cover } from '../data/proposalContent.js';

export default function CoverSection() {
  // Cover is always in viewport on load — trigger immediately after mount
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 300);
    return () => clearTimeout(t);
  }, []);

  const count = useCountUp(cover.targetCount, 2400, mounted);

  return (
    <section id="cover" className={`proposal-section cover-section section-full ${mounted ? 'section-visible' : ''}`}>
      <div className="proposal-section-inner">
        <div className="stagger">
          <div className="cover-badge">{cover.date} — Parliamentary Proposal</div>
          <div className="cover-sa-stripe" />
          <div className="cover-counter">{count.toLocaleString()}</div>
          <h1>{cover.title}</h1>
          <p className="cover-subtitle">{cover.subtitle}</p>
          <p className="cover-audience">{cover.audience}</p>
          <p className="cover-hook">{cover.hook}</p>
          <div className="scroll-indicator">
            <ChevronDown size={28} />
          </div>
        </div>
      </div>
    </section>
  );
}
