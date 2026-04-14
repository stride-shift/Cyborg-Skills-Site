import React from 'react';
import useScrollReveal from '../hooks/useScrollReveal.js';

export default function ScrollSection({ id, className = '', children, fullHeight = false }) {
  const [ref, visible] = useScrollReveal(0.08);

  return (
    <section
      id={id}
      ref={ref}
      className={`proposal-section ${className} ${visible ? 'section-visible' : ''} ${fullHeight ? 'section-full' : ''}`}
    >
      <div className="proposal-section-inner">
        {children}
      </div>
    </section>
  );
}
