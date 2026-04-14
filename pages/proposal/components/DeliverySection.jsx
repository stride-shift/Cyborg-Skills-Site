import React, { useState } from 'react';
import * as Icons from 'lucide-react';
import ScrollSection from './ScrollSection.jsx';
import { delivery } from '../data/proposalContent.js';

export default function DeliverySection() {
  const [activeNode, setActiveNode] = useState(null);
  const center = { x: 300, y: 200 };
  const active = activeNode ? delivery.components.find(c => c.id === activeNode) : null;

  return (
    <ScrollSection id="delivery">
      <div className="stagger">
        <h2>{delivery.headline}</h2>
        <p className="section-intro">{delivery.intro}</p>
      </div>

      <svg className="ecosystem-svg" viewBox="0 0 600 400">
        {/* Connection lines */}
        {delivery.components.map((comp, i) => (
          <line
            key={`line-${i}`}
            className="ecosystem-line"
            x1={center.x}
            y1={center.y}
            x2={comp.position.x * 6}
            y2={comp.position.y * 4}
          />
        ))}

        {/* Pulse ring on center */}
        <circle className="ecosystem-center-ring" cx={center.x} cy={center.y} r={32} />

        {/* Center node */}
        <g className="ecosystem-node">
          <circle cx={center.x} cy={center.y} r={28} fill="rgba(62, 207, 113, 0.1)" stroke="var(--green-accent, #3ecf71)" strokeWidth="2" />
          <text x={center.x} y={center.y - 4} fill="var(--text-primary, #e8ecf1)" fontSize="10" fontWeight="600">
            The
          </text>
          <text x={center.x} y={center.y + 8} fill="var(--text-primary, #e8ecf1)" fontSize="10" fontWeight="600">
            Participant
          </text>
        </g>

        {/* Outer nodes */}
        {delivery.components.map((comp) => {
          const cx = comp.position.x * 6;
          const cy = comp.position.y * 4;
          const isActive = activeNode === comp.id;
          return (
            <g
              key={comp.id}
              className="ecosystem-node"
              onClick={() => setActiveNode(isActive ? null : comp.id)}
              style={{ opacity: activeNode && !isActive ? 0.4 : 1 }}
            >
              <circle cx={cx} cy={cy} r={isActive ? 26 : 22} fill="rgba(77, 159, 240, 0.08)" stroke="var(--blue-accent, #4d9ff0)" strokeWidth="1.5" />
              <text x={cx} y={cy + 4} fontSize="9" fill="var(--text-secondary, #9ba4b5)">
                {comp.label.length > 18 ? comp.label.split(' ').reduce((lines, word) => {
                  const last = lines[lines.length - 1];
                  if (last && (last + ' ' + word).length <= 16) {
                    lines[lines.length - 1] = last + ' ' + word;
                  } else {
                    lines.push(word);
                  }
                  return lines;
                }, []).map((line, li, arr) => (
                  <tspan key={li} x={cx} dy={li === 0 ? -(arr.length - 1) * 6 : 12}>{line}</tspan>
                )) : comp.label}
              </text>
            </g>
          );
        })}
      </svg>

      <div className="ecosystem-detail">
        {active ? (
          <>
            <h3>{active.label}</h3>
            <p>{active.description}</p>
          </>
        ) : (
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
            Tap any node to see how it supports participants
          </p>
        )}
      </div>
    </ScrollSection>
  );
}
