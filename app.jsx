import React, { useEffect, useState, useRef, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Layers, ArrowRight, Play, Gamepad2, Sparkles, X, Menu, BookOpen, Zap, Target, Lightbulb, TrendingUp, CircleDot, Gift, ChevronRight, Eye, Image, Users, Pause, Volume2, Sun, Moon } from 'lucide-react';

/*
 * ===========================================
 * CYBORG SKILLS - DARK PREMIUM DESIGN SYSTEM
 * ===========================================
 *
 * TARGET AUDIENCE: Power users already becoming cyborgs - professionals,
 * builders, and thinkers who need a new paradigm for human-AI cognition
 *
 * TYPOGRAPHY:
 * - Primary: Playfair Display (headings)
 * - Secondary: Lato (body)
 *
 * COLORS: Green (human/biological) + Blue (AI/technological)
 *         Red accent (sparingly, for urgency/CTAs)
 *
 * BACKGROUND: Deep dark surfaces with layered depth
 * ===========================================
 */

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700;900&family=Lato:wght@300;400;500;600;700&display=swap');

  :root {
    --bg-deep: #060a12;
    --bg-surface: #0c1220;
    --bg-elevated: #111a2e;
    --bg-hover: #17233b;
    --bg-card: rgba(255, 255, 255, 0.03);
    --bg-card-hover: rgba(255, 255, 255, 0.06);

    --green-accent: #3ecf71;
    --green-accent-dark: #2eb85c;
    --green-dim: rgba(62, 207, 113, 0.08);
    --green-glow: rgba(62, 207, 113, 0.15);
    --green-glow-strong: rgba(62, 207, 113, 0.3);

    --blue-accent: #4d9ff0;
    --blue-accent-dark: #3a8de0;
    --blue-dim: rgba(77, 159, 240, 0.08);
    --blue-glow: rgba(77, 159, 240, 0.15);
    --blue-glow-strong: rgba(77, 159, 240, 0.3);

    --red-accent: #e63946;
    --red-dim: rgba(230, 57, 70, 0.1);

    --text-white: #f0f2f5;
    --text-primary: #c8cdd5;
    --text-secondary: #8892a4;
    --text-muted: #5a6478;
    --text-dark: #1a1a1a;

    --border-subtle: rgba(255, 255, 255, 0.06);
    --border-light: rgba(255, 255, 255, 0.1);
    --border-glow-green: rgba(62, 207, 113, 0.2);
    --border-glow-blue: rgba(77, 159, 240, 0.2);

    --shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.3);
    --shadow-md: 0 8px 30px rgba(0, 0, 0, 0.4);
    --shadow-lg: 0 20px 60px rgba(0, 0, 0, 0.5);
    --shadow-glow-green: 0 0 40px rgba(62, 207, 113, 0.12);
    --shadow-glow-blue: 0 0 40px rgba(77, 159, 240, 0.12);

    --space-xs: 0.5rem;
    --space-sm: 0.75rem;
    --space-md: 1rem;
    --space-lg: 1.5rem;
    --space-xl: 2rem;
    --space-2xl: 3rem;
    --space-3xl: 4rem;
    --space-4xl: 6rem;
    --space-5xl: 8rem;

    --radius-sm: 8px;
    --radius-md: 12px;
    --radius-lg: 20px;
    --radius-xl: 28px;
  }

  /* ========================================
     LIGHT MODE OVERRIDES
     ======================================== */

  [data-theme="light"] {
    --bg-deep: #f5f7fa;
    --bg-surface: #edf0f5;
    --bg-elevated: #ffffff;
    --bg-hover: #e8ecf2;
    --bg-card: rgba(0, 0, 0, 0.02);
    --bg-card-hover: rgba(0, 0, 0, 0.04);

    --green-accent: #2e9e4f;
    --green-accent-dark: #247d3f;
    --green-dim: rgba(46, 158, 79, 0.07);
    --green-glow: rgba(46, 158, 79, 0.12);
    --green-glow-strong: rgba(46, 158, 79, 0.22);

    --blue-accent: #2a7ad4;
    --blue-accent-dark: #1f65b5;
    --blue-dim: rgba(42, 122, 212, 0.07);
    --blue-glow: rgba(42, 122, 212, 0.12);
    --blue-glow-strong: rgba(42, 122, 212, 0.22);

    --red-accent: #d42f3d;
    --red-dim: rgba(212, 47, 61, 0.08);

    --text-white: #111827;
    --text-primary: #2d3748;
    --text-secondary: #4a5568;
    --text-muted: #8896a8;
    --text-dark: #111827;

    --border-subtle: rgba(0, 0, 0, 0.06);
    --border-light: rgba(0, 0, 0, 0.1);
    --border-glow-green: rgba(46, 158, 79, 0.2);
    --border-glow-blue: rgba(42, 122, 212, 0.2);

    --shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.06);
    --shadow-md: 0 8px 30px rgba(0, 0, 0, 0.08);
    --shadow-lg: 0 20px 60px rgba(0, 0, 0, 0.1);
    --shadow-glow-green: 0 0 40px rgba(46, 158, 79, 0.1);
    --shadow-glow-blue: 0 0 40px rgba(42, 122, 212, 0.1);
  }

  [data-theme="light"] nav {
    background: rgba(245, 247, 250, 0.9);
  }

  [data-theme="light"] nav.scrolled {
    background: rgba(245, 247, 250, 0.97);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
  }

  [data-theme="light"] .hero-orb.green {
    background: radial-gradient(circle, rgba(46, 158, 79, 0.08) 0%, transparent 70%);
  }

  [data-theme="light"] .hero-orb.blue {
    background: radial-gradient(circle, rgba(42, 122, 212, 0.06) 0%, transparent 70%);
  }

  [data-theme="light"] .hero-orb.red {
    background: radial-gradient(circle, rgba(212, 47, 61, 0.04) 0%, transparent 70%);
  }

  [data-theme="light"] .audio-player {
    background: var(--bg-surface);
  }

  [data-theme="light"] .btn.primary,
  [data-theme="light"] .btn.tech {
    color: #ffffff;
  }

  [data-theme="light"] .btn.accent {
    color: #ffffff;
  }

  [data-theme="light"] .audio-player button {
    color: #ffffff;
  }

  [data-theme="light"] ::-webkit-scrollbar-track {
    background: var(--bg-surface);
  }

  [data-theme="light"] ::selection {
    background: rgba(46, 158, 79, 0.15);
    color: var(--text-dark);
  }

  /* Smooth transition when toggling themes */
  html, body, nav, .card-panel, .audio-player, .media-placeholder,
  .quote-block, .badge, .btn, .form-input, .form-select, .form-textarea {
    transition: background-color 0.35s ease, color 0.35s ease, border-color 0.35s ease, box-shadow 0.35s ease;
  }

  /* Theme toggle button */
  .theme-toggle {
    width: 38px;
    height: 38px;
    border-radius: 50%;
    border: 1.5px solid var(--border-light);
    background: var(--bg-card);
    color: var(--text-secondary);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
    flex-shrink: 0;
  }

  .theme-toggle:hover {
    border-color: var(--green-accent);
    color: var(--green-accent);
    background: var(--green-dim);
    transform: rotate(15deg);
  }

  * { margin: 0; padding: 0; box-sizing: border-box; }

  html {
    scroll-behavior: smooth;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  body {
    font-family: 'Lato', -apple-system, sans-serif;
    background: var(--bg-deep);
    color: var(--text-primary);
    min-height: 100vh;
    overflow-x: hidden;
    line-height: 1.7;
  }

  /* ========================================
     ANIMATIONS
     ======================================== */

  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(40px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @keyframes fadeInDown {
    from { opacity: 0; transform: translateY(-20px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @keyframes fadeInRight {
    from { opacity: 0; transform: translateX(40px); }
    to { opacity: 1; transform: translateX(0); }
  }

  @keyframes pulseGlow {
    0%, 100% { opacity: 0.4; }
    50% { opacity: 0.8; }
  }

  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-12px); }
  }

  @keyframes gradientShift {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }

  @keyframes lineGrow {
    from { transform: scaleX(0); }
    to { transform: scaleX(1); }
  }

  @keyframes nodeAppear {
    from { transform: scale(0); opacity: 0; }
    to { transform: scale(1); opacity: 1; }
  }

  @keyframes textReveal {
    from { opacity: 0; transform: translateY(20px) rotateX(10deg); }
    to { opacity: 1; transform: translateY(0) rotateX(0); }
  }

  @keyframes shimmer {
    0% { background-position: -200% center; }
    100% { background-position: 200% center; }
  }

  @keyframes orbFloat {
    0%, 100% { transform: translate(0, 0) scale(1); }
    25% { transform: translate(30px, -20px) scale(1.05); }
    50% { transform: translate(-10px, -40px) scale(0.95); }
    75% { transform: translate(-30px, -10px) scale(1.02); }
  }

  .animate-on-scroll {
    opacity: 0;
    transform: translateY(30px);
    transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .animate-on-scroll.visible {
    opacity: 1;
    transform: translateY(0);
  }

  /* ========================================
     LAYOUT
     ======================================== */

  .container {
    max-width: 1320px;
    margin: 0 auto;
    padding: 0 var(--space-xl);
  }

  .container-wide {
    max-width: 1520px;
    margin: 0 auto;
    padding: 0 var(--space-xl);
  }

  @media (min-width: 1600px) {
    .container { max-width: 1440px; }
    .container-wide { max-width: 1640px; }
  }

  @media (min-width: 2000px) {
    .container { max-width: 1600px; }
    .container-wide { max-width: 1800px; }
  }

  @media (max-width: 768px) {
    .container, .container-wide { padding: 0 var(--space-lg); }
  }

  @media (max-width: 480px) {
    .container, .container-wide { padding: 0 var(--space-md); }
  }

  /* ========================================
     MARQUEE / SKILLS TICKER
     ======================================== */

  .marquee-track {
    display: flex;
    gap: var(--space-xl);
    animation: marqueeScroll 40s linear infinite;
    width: max-content;
  }

  .marquee-track:hover {
    animation-play-state: paused;
  }

  @keyframes marqueeScroll {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }

  .marquee-item {
    display: flex;
    align-items: center;
    gap: var(--space-sm);
    padding: var(--space-sm) var(--space-lg);
    background: var(--bg-card);
    border: 1px solid var(--border-subtle);
    border-radius: var(--radius-md);
    white-space: nowrap;
    font-size: 0.85rem;
    color: var(--text-secondary);
    font-weight: 500;
    transition: all 0.3s ease;
  }

  .marquee-item:hover {
    background: var(--bg-card-hover);
    border-color: var(--border-glow-green);
    color: var(--text-white);
  }

  .marquee-wrapper {
    overflow: hidden;
    mask-image: linear-gradient(90deg, transparent 0%, black 8%, black 92%, transparent 100%);
    -webkit-mask-image: linear-gradient(90deg, transparent 0%, black 8%, black 92%, transparent 100%);
  }

  /* Client Logo Marquee */
  .client-logo-track {
    display: flex;
    gap: var(--space-3xl);
    animation: marqueeScroll 35s linear infinite;
    width: max-content;
    align-items: center;
  }
  .client-logo-track:hover {
    animation-play-state: paused;
  }
  .client-logo-item {
    display: flex;
    align-items: center;
    gap: var(--space-sm);
    white-space: nowrap;
    font-size: 1.1rem;
    font-weight: 700;
    color: var(--text-muted);
    letter-spacing: 0.5px;
    font-family: 'Lato', sans-serif;
    opacity: 0.5;
    transition: opacity 0.3s ease;
  }
  .client-logo-item:hover {
    opacity: 0.85;
  }
  .client-logo-item svg {
    flex-shrink: 0;
  }

  /* ========================================
     BENTO GRID
     ======================================== */

  .bento-grid {
    display: grid;
    gap: var(--space-md);
  }

  .bento-grid-6 {
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: auto auto;
  }

  .bento-grid-6 > :nth-child(1) { grid-column: 1 / 2; }
  .bento-grid-6 > :nth-child(2) { grid-column: 2 / 4; }
  .bento-grid-6 > :nth-child(3) { grid-column: 1 / 3; }
  .bento-grid-6 > :nth-child(4) { grid-column: 3 / 4; }
  .bento-grid-6 > :nth-child(5) { grid-column: 1 / 2; }
  .bento-grid-6 > :nth-child(6) { grid-column: 2 / 4; }

  @media (max-width: 768px) {
    .bento-grid-6 {
      grid-template-columns: 1fr;
    }
    .bento-grid-6 > * { grid-column: 1 / -1 !important; }
  }

  /* ========================================
     LAYERED SECTION BACKGROUNDS
     ======================================== */

  .section-layer {
    position: relative;
    overflow: hidden;
  }

  .section-layer::before {
    content: '';
    position: absolute;
    inset: 0;
    background:
      radial-gradient(ellipse 80% 50% at 20% 40%, var(--green-dim) 0%, transparent 60%),
      radial-gradient(ellipse 60% 40% at 80% 60%, var(--blue-dim) 0%, transparent 60%);
    pointer-events: none;
    z-index: 0;
  }

  .section-layer > * {
    position: relative;
    z-index: 1;
  }

  .section-alt-dark {
    background: var(--bg-surface);
  }

  .section-mesh {
    position: relative;
  }

  .section-mesh::after {
    content: '';
    position: absolute;
    inset: 0;
    background-image:
      radial-gradient(circle at 1px 1px, rgba(255,255,255,0.03) 1px, transparent 0);
    background-size: 40px 40px;
    pointer-events: none;
    z-index: 0;
  }

  .section-mesh > * {
    position: relative;
    z-index: 1;
  }

  /* ========================================
     ANGLED SECTION DIVIDERS
     ======================================== */

  .section-angle-top {
    position: relative;
  }

  .section-angle-top::before {
    content: '';
    position: absolute;
    top: -40px;
    left: 0;
    right: 0;
    height: 80px;
    background: inherit;
    clip-path: polygon(0 50%, 100% 0, 100% 100%, 0 100%);
    z-index: 1;
  }

  .section-angle-bottom::after {
    content: '';
    position: absolute;
    bottom: -40px;
    left: 0;
    right: 0;
    height: 80px;
    background: inherit;
    clip-path: polygon(0 0, 100% 0, 100% 50%, 0 100%);
    z-index: 1;
  }

  /* ========================================
     DECORATIVE ACCENTS
     ======================================== */

  .accent-stripe {
    height: 3px;
    background: linear-gradient(90deg, transparent, var(--green-accent), var(--blue-accent), transparent);
    opacity: 0.4;
  }

  .section-number {
    position: absolute;
    top: -20px;
    right: var(--space-xl);
    font-size: clamp(6rem, 12vw, 10rem);
    font-family: 'Playfair Display', serif;
    font-weight: 900;
    background: linear-gradient(135deg, var(--green-accent), var(--blue-accent));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    opacity: 0.07;
    line-height: 1;
    pointer-events: none;
    user-select: none;
    z-index: 0;
  }

  .floating-accent {
    position: absolute;
    width: 200px;
    height: 200px;
    border-radius: 50%;
    border: 1px solid var(--border-subtle);
    pointer-events: none;
    opacity: 0.3;
  }

  .floating-accent.sm {
    width: 80px;
    height: 80px;
  }

  .floating-accent.lg {
    width: 350px;
    height: 350px;
  }

  /* Side glow effect for emphasis sections */
  .side-glow-green {
    position: relative;
  }

  .side-glow-green::before {
    content: '';
    position: absolute;
    left: 0;
    top: 10%;
    bottom: 10%;
    width: 3px;
    background: linear-gradient(180deg, transparent, var(--green-accent), transparent);
    opacity: 0.5;
    border-radius: 2px;
  }

  .side-glow-blue {
    position: relative;
  }

  .side-glow-blue::after {
    content: '';
    position: absolute;
    right: 0;
    top: 15%;
    bottom: 15%;
    width: 3px;
    background: linear-gradient(180deg, transparent, var(--blue-accent), transparent);
    opacity: 0.5;
    border-radius: 2px;
  }

  /* Offset overlap card */
  .card-overlap-up {
    margin-top: -40px;
    position: relative;
    z-index: 2;
  }

  /* Featured card - larger and more prominent */
  .card-featured {
    grid-row: span 2;
    background: linear-gradient(135deg, var(--bg-card) 0%, var(--bg-card-hover) 100%);
    border: 1px solid var(--border-glow-green);
  }

  .card-featured:hover {
    box-shadow: var(--shadow-glow-green), var(--shadow-lg);
  }

  /* Stagger animation helpers */
  .stagger-1 { animation-delay: 0.05s; }
  .stagger-2 { animation-delay: 0.1s; }
  .stagger-3 { animation-delay: 0.15s; }
  .stagger-4 { animation-delay: 0.2s; }
  .stagger-5 { animation-delay: 0.25s; }
  .stagger-6 { animation-delay: 0.3s; }

  @media (max-width: 768px) {
    .section-angle-top::before,
    .section-angle-bottom::after { display: none; }
    .section-number { display: none; }
    .floating-accent { display: none; }
    .side-glow-green::before,
    .side-glow-blue::after { display: none; }
    .card-overlap-up { margin-top: 0; }
  }

  /* ========================================
     CARDS - DARK LAYERED DEPTH
     ======================================== */

  .card-panel {
    background: var(--bg-card);
    border: 1px solid var(--border-subtle);
    border-radius: var(--radius-xl);
    transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
    position: relative;
    overflow: hidden;
  }

  .card-panel:hover {
    background: var(--bg-card-hover);
    transform: translateY(-6px);
    box-shadow: var(--shadow-md);
  }

  .card-green {
    border-left: 3px solid var(--green-accent);
  }

  .card-green:hover {
    box-shadow: var(--shadow-glow-green), var(--shadow-md);
    border-color: var(--green-accent);
  }

  .card-blue {
    border-left: 3px solid var(--blue-accent);
  }

  .card-blue:hover {
    box-shadow: var(--shadow-glow-blue), var(--shadow-md);
    border-color: var(--blue-accent);
  }

  /* ========================================
     TYPOGRAPHY
     ======================================== */

  h1, h2, h3, h4, h5, h6 {
    font-family: 'Playfair Display', Georgia, serif;
    font-weight: 600;
    letter-spacing: -0.02em;
    color: var(--text-white);
    line-height: 1.2;
  }

  .page-title {
    font-size: clamp(2.5rem, 6vw, 4rem);
    line-height: 1.08;
    margin-bottom: var(--space-lg);
    color: var(--text-white);
    font-weight: 700;
  }

  .gradient-text {
    background: linear-gradient(135deg, var(--green-accent) 0%, var(--blue-accent) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }



  .page-subtitle {
    font-size: clamp(1.05rem, 2vw, 1.25rem);
    color: var(--text-secondary);
    font-weight: 400;
    max-width: 620px;
    line-height: 1.8;
  }

  .section-heading {
    font-size: clamp(1.75rem, 4vw, 2.5rem);
    color: var(--text-white);
    margin-bottom: var(--space-2xl);
    position: relative;
    display: inline-block;
    font-weight: 600;
  }

  .section-heading::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 0;
    width: 60px;
    height: 3px;
    background: linear-gradient(90deg, var(--green-accent), var(--blue-accent));
    border-radius: 2px;
    transition: width 0.5s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .section-heading:hover::after {
    width: 100%;
  }

  /* ========================================
     BUTTONS
     ======================================== */

  .btn {
    padding: 0.875rem 1.75rem;
    border-radius: var(--radius-md);
    font-weight: 600;
    font-size: 0.85rem;
    cursor: pointer;
    border: none;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    text-decoration: none;
    text-transform: uppercase;
    letter-spacing: 0.8px;
    font-family: 'Lato', sans-serif;
    position: relative;
    overflow: hidden;
    transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .btn .arrow-icon {
    transition: transform 0.3s ease;
  }

  .btn:hover .arrow-icon {
    transform: translateX(4px);
  }

  .btn:hover {
    transform: translateY(-2px);
  }

  .btn.primary {
    background: linear-gradient(135deg, var(--green-accent) 0%, var(--green-accent-dark) 100%);
    color: var(--bg-deep);
    box-shadow: 0 4px 24px rgba(62, 207, 113, 0.25);
    font-weight: 700;
  }

  .btn.primary:hover {
    box-shadow: 0 8px 36px rgba(62, 207, 113, 0.4);
  }

  .btn.tech {
    background: linear-gradient(135deg, var(--blue-accent) 0%, var(--blue-accent-dark) 100%);
    color: var(--bg-deep);
    box-shadow: 0 4px 24px rgba(77, 159, 240, 0.25);
    font-weight: 700;
  }

  .btn.tech:hover {
    box-shadow: 0 8px 36px rgba(77, 159, 240, 0.4);
  }

  .btn.outline {
    background: transparent;
    color: var(--text-primary);
    border: 1.5px solid var(--border-light);
  }

  .btn.outline:hover {
    border-color: var(--green-accent);
    color: var(--green-accent);
    background: var(--green-dim);
  }

  .btn.accent {
    background: var(--red-accent);
    color: white;
    box-shadow: 0 4px 24px rgba(230, 57, 70, 0.3);
  }

  .btn.accent:hover {
    box-shadow: 0 8px 36px rgba(230, 57, 70, 0.45);
  }

  /* ========================================
     NAVIGATION
     ======================================== */

  nav {
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 1000;
    background: rgba(6, 10, 18, 0.85);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border-bottom: 1px solid var(--border-subtle);
    transition: all 0.4s ease;
  }

  nav.scrolled {
    background: rgba(6, 10, 18, 0.95);
    box-shadow: 0 4px 30px rgba(0,0,0,0.4);
  }

  .nav-link {
    text-decoration: none;
    color: var(--text-secondary);
    font-size: 0.78rem;
    text-transform: uppercase;
    letter-spacing: 1.2px;
    position: relative;
    padding: 0.5rem 0;
    transition: all 0.3s ease;
    font-family: 'Lato', sans-serif;
    font-weight: 600;
  }

  .nav-link::after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 50%;
    transform: translateX(-50%) scaleX(0);
    width: 100%;
    height: 2px;
    background: linear-gradient(90deg, var(--green-accent), var(--blue-accent));
    border-radius: 2px;
    transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .nav-link:hover,
  .nav-link.active {
    color: var(--text-white);
  }

  .nav-link:hover::after,
  .nav-link.active::after {
    transform: translateX(-50%) scaleX(1);
  }

  /* ========================================
     GRID
     ======================================== */

  .grid-layout {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: var(--space-xl);
  }

  @media (max-width: 768px) {
    .grid-layout {
      grid-template-columns: 1fr;
      gap: var(--space-lg);
    }
  }

  /* ========================================
     FORMS
     ======================================== */

  .form-group { margin-bottom: var(--space-lg); }

  .form-group label {
    display: block;
    margin-bottom: var(--space-sm);
    color: var(--text-primary);
    font-weight: 600;
    font-size: 0.78rem;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .form-input, .form-select, .form-textarea {
    width: 100%;
    padding: 0.875rem 1.25rem;
    background: var(--bg-elevated);
    border: 1.5px solid var(--border-subtle);
    border-radius: var(--radius-md);
    color: var(--text-white);
    font-family: 'Lato', sans-serif;
    transition: all 0.3s ease;
    font-size: 0.95rem;
  }

  .form-input:focus, .form-select:focus, .form-textarea:focus {
    outline: none;
    border-color: var(--green-accent);
    box-shadow: 0 0 0 3px var(--green-dim), 0 0 20px var(--green-glow);
  }

  .form-input::placeholder, .form-textarea::placeholder {
    color: var(--text-muted);
  }

  .form-textarea { resize: vertical; min-height: 120px; }
  .form-select { appearance: none; cursor: pointer; }

  /* ========================================
     QUOTES
     ======================================== */

  .quote-block {
    padding: var(--space-2xl);
    margin: var(--space-xl) 0;
    border-left: 3px solid var(--green-accent);
    background: linear-gradient(135deg, var(--bg-surface), var(--bg-elevated));
    font-style: italic;
    font-size: clamp(1.05rem, 2vw, 1.2rem);
    line-height: 1.9;
    color: var(--text-secondary);
    font-family: 'Playfair Display', serif;
    border-radius: 0 var(--radius-lg) var(--radius-lg) 0;
    transition: all 0.5s ease;
  }

  .quote-block:hover {
    transform: translateX(6px);
    box-shadow: var(--shadow-glow-green);
  }

  .quote-block::before {
    content: '"';
    position: absolute;
    top: 10px;
    left: 20px;
    font-size: 4rem;
    color: var(--green-accent);
    opacity: 0.12;
    font-family: 'Playfair Display', serif;
    line-height: 1;
  }

  .quote-author {
    margin-top: var(--space-lg);
    font-style: normal;
    color: var(--green-accent);
    font-weight: 700;
    font-family: 'Lato', sans-serif;
    font-size: 0.82rem;
    text-transform: uppercase;
    letter-spacing: 1.5px;
  }

  /* ========================================
     BADGES
     ======================================== */

  .badge {
    display: inline-block;
    padding: 0.35rem 0.85rem;
    border-radius: var(--radius-sm);
    font-size: 0.68rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-family: 'Lato', sans-serif;
  }

  .badge.green {
    background: var(--green-dim);
    color: var(--green-accent);
    border: 1px solid rgba(62, 207, 113, 0.15);
  }

  .badge.blue {
    background: var(--blue-dim);
    color: var(--blue-accent);
    border: 1px solid rgba(77, 159, 240, 0.15);
  }

  .badge.red {
    background: var(--red-dim);
    color: var(--red-accent);
    border: 1px solid rgba(230, 57, 70, 0.15);
  }

  /* ========================================
     ICON BOXES
     ======================================== */

  .icon-box {
    width: 56px;
    height: 56px;
    border-radius: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .icon-box.green {
    background: linear-gradient(135deg, var(--green-accent), var(--green-accent-dark));
    box-shadow: 0 6px 20px rgba(62, 207, 113, 0.3);
  }

  .icon-box.green:hover {
    transform: translateY(-3px) rotate(3deg);
    box-shadow: 0 10px 30px rgba(62, 207, 113, 0.4);
  }

  .icon-box.blue {
    background: linear-gradient(135deg, var(--blue-accent), var(--blue-accent-dark));
    box-shadow: 0 6px 20px rgba(77, 159, 240, 0.3);
  }

  .icon-box.blue:hover {
    transform: translateY(-3px) rotate(-3deg);
    box-shadow: 0 10px 30px rgba(77, 159, 240, 0.4);
  }

  /* ========================================
     HERO
     ======================================== */

  .hero-section {
    position: relative;
    overflow: hidden;
    background: var(--bg-deep);
  }

  .hero-orb {
    position: absolute;
    border-radius: 50%;
    filter: blur(80px);
    pointer-events: none;
    z-index: 0;
  }

  .hero-orb.green {
    width: 500px;
    height: 500px;
    background: radial-gradient(circle, rgba(62, 207, 113, 0.12) 0%, transparent 70%);
    top: -10%;
    left: -5%;
    animation: orbFloat 20s ease-in-out infinite;
  }

  .hero-orb.blue {
    width: 400px;
    height: 400px;
    background: radial-gradient(circle, rgba(77, 159, 240, 0.1) 0%, transparent 70%);
    bottom: -15%;
    right: -5%;
    animation: orbFloat 25s ease-in-out infinite reverse;
  }

  .hero-orb.red {
    width: 200px;
    height: 200px;
    background: radial-gradient(circle, rgba(230, 57, 70, 0.06) 0%, transparent 70%);
    top: 40%;
    right: 30%;
    animation: orbFloat 15s ease-in-out infinite 3s;
  }

  /* Connection lines in hero */
  .hero-lines {
    position: absolute;
    inset: 0;
    pointer-events: none;
    z-index: 0;
    opacity: 0.15;
  }

  .hero-lines svg {
    width: 100%;
    height: 100%;
  }

  /* ========================================
     EXPERIMENT TABLE
     ======================================== */

  .experiment-table {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
    gap: var(--space-lg);
  }

  .experiment-card {
    background: var(--bg-card);
    border: 1px solid var(--border-subtle);
    border-radius: var(--radius-lg);
    overflow: hidden;
    transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .experiment-card:hover {
    border-color: var(--border-glow-green);
    box-shadow: var(--shadow-glow-green);
    transform: translateY(-4px);
  }

  .experiment-card .card-header {
    padding: var(--space-lg) var(--space-lg) var(--space-sm);
    display: flex;
    align-items: flex-start;
    gap: var(--space-md);
  }

  .experiment-card .card-body {
    padding: 0 var(--space-lg) var(--space-md);
  }

  .experiment-card .card-footer {
    padding: var(--space-sm) var(--space-lg) var(--space-lg);
    display: flex;
    align-items: center;
    gap: var(--space-sm);
  }

  .audio-player {
    width: 100%;
    display: flex;
    align-items: center;
    gap: var(--space-sm);
    padding: var(--space-sm) var(--space-md);
    background: var(--bg-elevated);
    border-radius: var(--radius-md);
    border: 1px solid var(--border-subtle);
  }

  .audio-player button {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    border: none;
    background: linear-gradient(135deg, var(--green-accent), var(--blue-accent));
    color: var(--bg-deep);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    flex-shrink: 0;
    transition: all 0.3s ease;
  }

  .audio-player button:hover {
    transform: scale(1.1);
    box-shadow: 0 0 20px var(--green-glow-strong);
  }

  .audio-progress {
    flex: 1;
    height: 4px;
    background: var(--border-subtle);
    border-radius: 2px;
    overflow: hidden;
    cursor: pointer;
  }

  .audio-progress-fill {
    height: 100%;
    background: linear-gradient(90deg, var(--green-accent), var(--blue-accent));
    border-radius: 2px;
    transition: width 0.1s linear;
  }

  .audio-time {
    font-size: 0.72rem;
    color: var(--text-muted);
    font-variant-numeric: tabular-nums;
    min-width: 36px;
    text-align: right;
  }

  /* ========================================
     MEDIA PLACEHOLDERS
     ======================================== */

  .media-placeholder {
    background: linear-gradient(135deg, var(--bg-surface) 0%, var(--bg-elevated) 100%);
    border: 1.5px dashed var(--border-subtle);
    border-radius: var(--radius-lg);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
    overflow: hidden;
    transition: all 0.4s ease;
  }

  .media-placeholder:hover {
    border-color: var(--green-accent);
    background: linear-gradient(135deg, var(--green-dim), var(--blue-dim));
  }

  .media-placeholder-content {
    position: relative;
    z-index: 1;
    text-align: center;
    padding: var(--space-lg);
  }

  .media-placeholder-icon {
    margin-bottom: var(--space-sm);
    opacity: 0.3;
    transition: all 0.4s ease;
  }

  .media-placeholder:hover .media-placeholder-icon {
    opacity: 0.6;
    transform: scale(1.1);
  }

  .media-placeholder-label {
    font-size: 0.72rem;
    color: var(--text-muted);
    text-transform: uppercase;
    letter-spacing: 1.5px;
    font-weight: 600;
  }

  .video-placeholder .play-button {
    width: 72px;
    height: 72px;
    border-radius: 50%;
    background: linear-gradient(135deg, var(--green-accent), var(--blue-accent));
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    box-shadow: 0 8px 30px rgba(62, 207, 113, 0.3);
  }

  .video-placeholder:hover .play-button {
    transform: scale(1.12);
    box-shadow: 0 12px 40px rgba(62, 207, 113, 0.45);
  }

  /* ========================================
     RESPONSIVE
     ======================================== */

  @media (max-width: 768px) {
    .page-title { font-size: clamp(2rem, 8vw, 2.5rem); }
    .page-subtitle { font-size: 1rem; }
    .section-heading { font-size: clamp(1.5rem, 6vw, 1.75rem); }
    .btn { padding: 0.8rem 1.25rem; font-size: 0.8rem; }
    .quote-block { padding: var(--space-xl); font-size: 1rem; }
    .hero-orb { display: none; }
    .experiment-table { grid-template-columns: 1fr; }
  }

  @media (max-width: 480px) {
    .page-title { font-size: 1.875rem; }
    .card-panel { border-radius: var(--radius-lg); }
  }

  /* ========================================
     SCROLLBAR
     ======================================== */

  ::-webkit-scrollbar { width: 8px; }
  ::-webkit-scrollbar-track { background: var(--bg-deep); }
  ::-webkit-scrollbar-thumb {
    background: linear-gradient(180deg, var(--green-accent), var(--blue-accent));
    border-radius: 4px;
  }

  ::selection {
    background: rgba(62, 207, 113, 0.2);
    color: var(--text-white);
  }
`;

/* === COMPONENTS === */

const CyborgLogo = ({ size = 32 }) => {
  const id = `logo-${Math.random().toString(36).slice(2, 6)}`;
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      {/* Green arc (organic/biological - left) */}
      <path d="M18 5 C9 6, 3 13, 3 20 C3 27, 9 34, 18 35"
        stroke="#3ecf71" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      {/* Blue arc (technological - right) */}
      <path d="M22 5 C31 6, 37 13, 37 20 C37 27, 31 34, 22 35"
        stroke="#4d9ff0" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      {/* Intersection focal point - 4-pointed star */}
      <path d="M20 13 L22.5 18 L28 20 L22.5 22 L20 27 L17.5 22 L12 20 L17.5 18 Z"
        fill={`url(#${id})`} />
      {/* Inner glow dot */}
      <circle cx="20" cy="20" r="2.5" fill="white" opacity="0.9" />
      <defs>
        <linearGradient id={id} x1="12" y1="20" x2="28" y2="20">
          <stop offset="0%" stopColor="#3ecf71" />
          <stop offset="100%" stopColor="#4d9ff0" />
        </linearGradient>
      </defs>
    </svg>
  );
};

const NavBar = () => {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState(() => {
    try { return localStorage.getItem('cyborg-theme') || 'dark'; } catch { return 'dark'; }
  });
  const isActive = (path) => location.pathname === path ? 'active' : '';

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try { localStorage.setItem('cyborg-theme', theme); } catch {}
  }, [theme]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => setTheme(t => t === 'dark' ? 'light' : 'dark');

  return (
    <nav className={scrolled ? 'scrolled' : ''}>
      <div className="container" style={{ padding: 'var(--space-md) var(--space-xl)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <CyborgLogo size={34} />
              <span style={{ fontSize: '1.15rem', fontWeight: 700, fontFamily: 'Playfair Display, serif', color: 'var(--text-white)' }}>
                Cyborg Skills
              </span>
            </div>
          </Link>

          <div style={{ display: 'flex', gap: '1.75rem', alignItems: 'center' }} className="desktop-nav">
            {[
              { path: '/', label: 'Home' },
              { path: '/habits', label: 'Cyborg Habits' },
              { path: '/marketplace', label: 'Marketplace' },
              { path: '/think-tank', label: 'Think Tank' },
              { path: '/podcast', label: 'Podcast' },
              { path: '/about', label: 'Contact' }
            ].map(({ path, label }) => (
              <Link key={path} to={path} className={`nav-link ${isActive(path)}`}>{label}</Link>
            ))}
            <button onClick={toggleTheme} className="theme-toggle" title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}>
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>

          <div className="mobile-controls">
            <button onClick={toggleTheme} className="theme-toggle" style={{ width: '34px', height: '34px' }} title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}>
              {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <button onClick={() => setMenuOpen(!menuOpen)} className="mobile-menu-btn">
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, background: 'var(--bg-surface)', padding: 'var(--space-lg)', boxShadow: 'var(--shadow-lg)', borderTop: '1px solid var(--border-subtle)', animation: 'fadeInDown 0.3s ease' }}>
            {[
              { path: '/', label: 'Home' },
              { path: '/habits', label: 'Cyborg Habits' },
              { path: '/marketplace', label: 'Marketplace' },
              { path: '/think-tank', label: 'Think Tank' },
              { path: '/podcast', label: 'Podcast' },
              { path: '/about', label: 'Contact' }
            ].map(({ path, label }) => (
              <Link key={path} to={path} onClick={() => setMenuOpen(false)} className={`nav-link ${isActive(path)}`} style={{ display: 'block', padding: 'var(--space-md) 0', borderBottom: '1px solid var(--border-subtle)' }}>
                {label}
              </Link>
            ))}
          </div>
        )}
      </div>
      <style>{`
        .mobile-controls { display: none !important; align-items: center; gap: 8px; }
        .mobile-menu-btn { display: none; background: none; border: none; cursor: pointer; padding: 8px; color: var(--text-white); }
        @media (max-width: 900px) {
          .desktop-nav { display: none !important; }
          .mobile-controls { display: flex !important; }
          .mobile-menu-btn { display: block !important; }
          .mobile-menu-btn { display: block !important; }
        }
      `}</style>
    </nav>
  );
};

const AnimatedCard = ({ children, className, style, delay = 0 }) => {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.08 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`card-panel ${className || ''}`}
      style={{
        ...style,
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(24px)',
        transition: `all 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`
      }}
    >
      {children}
    </div>
  );
};


const ImagePlaceholder = ({ height = 300, label = "Image", aspectRatio, style = {} }) => (
  <div className="media-placeholder" style={{ height: aspectRatio ? 'auto' : height, aspectRatio: aspectRatio || 'auto', ...style }}>
    <div className="media-placeholder-content">
      <Image size={40} className="media-placeholder-icon" color="var(--text-muted)" />
      <p className="media-placeholder-label">{label}</p>
    </div>
  </div>
);

const VideoPlaceholder = ({ label = "Video", aspectRatio = "16/9", style = {} }) => (
  <div className="media-placeholder video-placeholder" style={{ aspectRatio, ...style }}>
    <div className="media-placeholder-content">
      <div className="play-button">
        <Play size={28} color="white" fill="white" style={{ marginLeft: '3px' }} />
      </div>
      <p className="media-placeholder-label" style={{ marginTop: 'var(--space-md)' }}>{label}</p>
    </div>
  </div>
);

/* === AUDIO PLAYER COMPONENT === */

const AudioPlayerInline = ({ src, title }) => {
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);

  const toggle = useCallback(() => {
    if (!audioRef.current) return;
    if (playing) { audioRef.current.pause(); }
    else { audioRef.current.play().catch(() => {}); }
    setPlaying(!playing);
  }, [playing]);

  const formatTime = (s) => {
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec < 10 ? '0' : ''}${sec}`;
  };

  return (
    <div className="audio-player">
      <audio
        ref={audioRef}
        src={src}
        onTimeUpdate={() => {
          if (audioRef.current) setProgress((audioRef.current.currentTime / audioRef.current.duration) * 100 || 0);
        }}
        onLoadedMetadata={() => { if (audioRef.current) setDuration(audioRef.current.duration); }}
        onEnded={() => { setPlaying(false); setProgress(0); }}
      />
      <button onClick={toggle} title={playing ? 'Pause' : 'Play'}>
        {playing ? <Pause size={14} /> : <Play size={14} style={{ marginLeft: '2px' }} />}
      </button>
      <div className="audio-progress" onClick={(e) => {
        if (!audioRef.current) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const pct = (e.clientX - rect.left) / rect.width;
        audioRef.current.currentTime = pct * audioRef.current.duration;
      }}>
        <div className="audio-progress-fill" style={{ width: `${progress}%` }} />
      </div>
      <span className="audio-time">{duration ? formatTime(duration) : '—'}</span>
    </div>
  );
};

/* === EXPERIMENT TABLE COMPONENT === */

const allSkills = [
  { num: 1, title: "Meeting to Summary", desc: "Turn any meeting transcript into structured, actionable notes in 60 seconds.", audio: "/audio/01_meeting_to_summary.wav", category: "Content", color: "green" },
  { num: 2, title: "Meeting to Execution", desc: "Go beyond summaries—create actual deliverables from meeting content.", audio: "/audio/02_meeting_to_execution.wav", category: "Content", color: "blue" },
  { num: 3, title: "Blog to Infographic", desc: "Convert written content into visual infographic format for 10x engagement.", audio: "/audio/03_blog_to_infographic.wav", category: "Transform", color: "green" },
  { num: 4, title: "UI on Command", desc: "Describe an interface and watch the layout materialize. Cognitive ergonomics in action.", audio: "/audio/04_ui_on_command.wav", category: "Build", color: "blue" },
  { num: 5, title: "Deep Dive Research", desc: "Become a domain expert in an afternoon with structured AI exploration.", audio: "/audio/05_deep_dive_research.wav", category: "Research", color: "green" },
  { num: 6, title: "Competitive Analysis", desc: "Map competitor landscapes, identify gaps, find strategic openings.", audio: "/audio/06_competitive_analysis.wav", category: "Strategy", color: "blue" },
  { num: 7, title: "Tone Matching", desc: "Adapt writing for any audience—formal to casual, technical to accessible.", audio: "/audio/07_tone_matching.wav", category: "Comm", color: "green" },
  { num: 8, title: "Project Planning", desc: "Generate detailed project plans with phases, milestones, and dependencies.", audio: "/audio/08_project_planning.wav", category: "Plan", color: "blue" },
  { num: 9, title: "Scenario Planning", desc: "Develop multiple future scenarios to stress-test strategies.", audio: "/audio/09_scenario_planning.wav", category: "Strategy", color: "green" },
  { num: 10, title: "Vibe Engineering", desc: "End-to-end product design—concept to working prototype, willed into existence.", audio: "/audio/10_vibe_engineering.wav", category: "Build", color: "blue" },
  { num: 11, title: "Learning Acceleration", desc: "Cut your learning curve in half with structured AI-assisted exploration.", audio: "/audio/11_learning_acceleration.wav", category: "Learn", color: "green" },
  { num: 12, title: "Decision Making", desc: "Model complex decisions with adversarial analysis and cascading consequences.", audio: "/audio/12_decision_making.wav", category: "Think", color: "blue" },
];

const ExperimentTable = ({ limit }) => {
  const skills = limit ? allSkills.slice(0, limit) : allSkills;

  return (
    <div className="experiment-table">
      {skills.map((skill, idx) => (
        <AnimatedCard key={idx} delay={idx * 0.04} className={`card-${skill.color}`} style={{ padding: 0, borderLeft: 'none' }}>
          <div className="experiment-card" style={{ border: 'none', borderRadius: 0, background: 'transparent' }}>
            <div className="card-header">
              <div className={`icon-box ${skill.color}`} style={{ minWidth: '48px', height: '48px', fontSize: '0.85rem' }}>
                <span style={{ color: 'white', fontWeight: 700 }}>{String(skill.num).padStart(2, '0')}</span>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)', marginBottom: '4px' }}>
                  <h4 style={{ fontSize: '1rem', fontFamily: 'Playfair Display, serif', fontWeight: 600, color: 'var(--text-white)' }}>{skill.title}</h4>
                  <span className={`badge ${skill.color}`} style={{ fontSize: '0.6rem', padding: '2px 6px' }}>{skill.category}</span>
                </div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: 1.55 }}>{skill.desc}</p>
              </div>
            </div>
            <div className="card-footer">
              <AudioPlayerInline src={skill.audio} title={skill.title} />
            </div>
          </div>
        </AnimatedCard>
      ))}
    </div>
  );
};

/* === PAGES === */

const SkillsTicker = () => {
  const items = [
    'Meeting to Summary', 'Deep Dive Research', 'Vibe Engineering', 'UI on Command',
    'Competitive Analysis', 'Tone Matching', 'Scenario Planning', 'Learning Acceleration',
    'Blog to Infographic', 'Project Planning', 'Decision Making', 'Meeting to Execution'
  ];
  const doubled = [...items, ...items];
  return (
    <div className="marquee-wrapper" style={{ padding: 'var(--space-lg) 0' }}>
      <div className="marquee-track">
        {doubled.map((item, i) => (
          <div key={i} className="marquee-item">
            <Zap size={14} color="var(--green-accent)" />
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

const HomePage = () => (
  <div>
    {/* HERO - compact, content-driven height */}
    <section className="hero-section" style={{ paddingTop: '100px', paddingBottom: 'var(--space-xl)', position: 'relative' }}>
      <div className="hero-orb green"></div>
      <div className="hero-orb blue"></div>
      <div className="hero-orb red"></div>
      {/* Subtle geometric background lines */}
      <div className="hero-lines">
        <svg viewBox="0 0 1200 600" preserveAspectRatio="none">
          <line x1="0" y1="200" x2="1200" y2="400" stroke="var(--border-subtle)" strokeWidth="0.5" />
          <line x1="400" y1="0" x2="800" y2="600" stroke="var(--border-subtle)" strokeWidth="0.5" />
          <line x1="1200" y1="100" x2="0" y2="500" stroke="var(--border-subtle)" strokeWidth="0.3" />
          <circle cx="600" cy="300" r="150" stroke="var(--border-subtle)" strokeWidth="0.5" fill="none" />
          <circle cx="600" cy="300" r="250" stroke="var(--border-subtle)" strokeWidth="0.3" fill="none" />
        </svg>
      </div>

      <div className="container-wide" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: 'var(--space-2xl)', alignItems: 'center' }}>
          <div>
            <span className="badge green" style={{ marginBottom: 'var(--space-sm)', display: 'inline-block', animation: 'fadeInUp 0.8s ease backwards' }}>CYBORG SKILLS</span>
            <h1 className="page-title" style={{ animation: 'fadeInUp 0.8s ease 0.1s backwards', marginBottom: 'var(--space-md)' }}>
              Stop prompting AI.<br />
              Start <span style={{ color: 'var(--green-accent)' }}>thinking</span> with it.
            </h1>
            <p className="page-subtitle" style={{ marginBottom: 'var(--space-lg)', animation: 'fadeInUp 0.8s ease 0.2s backwards' }}>
              Seven habits that turn AI from a tool you use into an extension of how you think. Not a course — a cognitive upgrade.
            </p>
            <div style={{ display: 'flex', gap: 'var(--space-md)', flexWrap: 'wrap', animation: 'fadeInUp 0.8s ease 0.3s backwards' }}>
              <a href="#experiment-table" className="btn primary">
                Explore the Skills <ArrowRight size={18} className="arrow-icon" />
              </a>
              <a href="#paradigm" className="btn outline">
                The Paradigm Shift <ChevronRight size={18} />
              </a>
            </div>
            {/* Inline stats row */}
            <div style={{ display: 'flex', gap: 'var(--space-2xl)', marginTop: 'var(--space-2xl)', animation: 'fadeInUp 0.8s ease 0.45s backwards' }}>
              {[
                { n: '2,500+', l: 'Cyborgs' },
                { n: '40+', l: 'Skills' },
                { n: '7', l: 'Habits' },
              ].map((s, i) => (
                <div key={i}>
                  <div style={{ fontSize: '1.5rem', fontWeight: 700, fontFamily: 'Playfair Display, serif', lineHeight: 1 }} className="gradient-text">{s.n}</div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1.5px', fontWeight: 600, marginTop: '4px' }}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ animation: 'fadeInRight 1s ease 0.3s backwards' }}>
            <div style={{ position: 'relative', width: '100%', aspectRatio: '1', maxWidth: '380px', margin: '0 auto' }}>
              <svg viewBox="0 0 400 400" style={{ width: '100%', height: '100%' }}>
                <circle cx="165" cy="200" r="120" stroke="var(--green-accent)" strokeWidth="1.5" fill="rgba(62,207,113,0.04)" opacity="0.8">
                  <animate attributeName="r" values="118;122;118" dur="6s" repeatCount="indefinite" />
                </circle>
                <circle cx="235" cy="200" r="120" stroke="var(--blue-accent)" strokeWidth="1.5" fill="rgba(77,159,240,0.04)" opacity="0.8">
                  <animate attributeName="r" values="122;118;122" dur="6s" repeatCount="indefinite" />
                </circle>
                <ellipse cx="200" cy="200" rx="50" ry="90" fill="url(#heroIntersection)" opacity="0.25">
                  <animate attributeName="opacity" values="0.15;0.3;0.15" dur="4s" repeatCount="indefinite" />
                </ellipse>
                <path d="M200 160 L210 190 L240 200 L210 210 L200 240 L190 210 L160 200 L190 190 Z" fill="url(#heroStar)" opacity="0.9">
                  <animate attributeName="opacity" values="0.7;1;0.7" dur="3s" repeatCount="indefinite" />
                </path>
                <circle cx="200" cy="200" r="8" fill="white" opacity="0.9">
                  <animate attributeName="r" values="6;10;6" dur="3s" repeatCount="indefinite" />
                </circle>
                <text x="110" y="200" fill="var(--green-accent)" fontSize="11" fontFamily="Lato, sans-serif" fontWeight="600" textAnchor="middle" opacity="0.7">HUMAN</text>
                <text x="290" y="200" fill="var(--blue-accent)" fontSize="11" fontFamily="Lato, sans-serif" fontWeight="600" textAnchor="middle" opacity="0.7">AI</text>
                <text x="200" y="295" fill="var(--text-white)" fontSize="13" fontFamily="Playfair Display, serif" fontWeight="600" textAnchor="middle" opacity="0.85">CYBORG</text>
                <defs>
                  <radialGradient id="heroIntersection" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="white" stopOpacity="0.15" />
                    <stop offset="100%" stopColor="white" stopOpacity="0" />
                  </radialGradient>
                  <linearGradient id="heroStar" x1="160" y1="200" x2="240" y2="200">
                    <stop offset="0%" stopColor="#3ecf71" />
                    <stop offset="100%" stopColor="#4d9ff0" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>
        </div>
      </div>
      <style>{`
        @media (max-width: 900px) {
          .hero-section .container-wide > div { grid-template-columns: 1fr !important; }
          .hero-section .container-wide > div > div:last-child { max-width: 280px; margin: var(--space-lg) auto 0; }
        }
      `}</style>
    </section>

    {/* SKILLS TICKER */}
    <SkillsTicker />

    {/* Accent stripe divider */}
    <div className="accent-stripe" />

    {/* POWER USER RECOGNITION - Bento grid layout */}
    <section id="sound-familiar" className="section-alt-dark section-mesh side-glow-green" style={{ padding: 'var(--space-4xl) 0', position: 'relative' }}>
      <div className="section-number">01</div>
      <div className="floating-accent lg" style={{ top: '20%', right: '-5%', borderColor: 'var(--blue-dim)' }} />
      <div className="container-wide" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: 'var(--space-2xl)', alignItems: 'start' }}>
          <div style={{ position: 'sticky', top: '100px' }}>
            <h2 className="section-heading" style={{ marginBottom: 'var(--space-md)' }}>You're Already in the Game.</h2>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '0.92rem' }}>
              You don't need AI 101. You need the next paradigm.
            </p>
            <div style={{ marginTop: 'var(--space-xl)' }}>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-white)', fontWeight: 500, lineHeight: 1.6 }}>
                The next level is <em style={{ color: 'var(--green-accent)', fontStyle: 'normal', fontWeight: 700 }}>transparent equipment</em>—AI that disappears into how you think.
              </p>
            </div>
          </div>
          <div className="bento-grid bento-grid-6">
            {[
              { text: "You use AI daily but know you're barely scratching the surface.", color: 'green' },
              { text: "You can prompt well, but your thinking hasn't fundamentally changed.", color: 'blue' },
              { text: "You sense there's a paradigm beyond 'better prompts' but can't name it.", color: 'green' },
              { text: "AI courses teach you tools. Nobody teaches you how to think with AI.", color: 'blue' },
              { text: "You want AI to feel like an extension of your mind, not a separate app.", color: 'green' },
              { text: "You know the future belongs to human-AI systems, not humans or AI alone.", color: 'blue' },
            ].map((item, idx) => (
              <AnimatedCard key={idx} className={`card-${item.color}`} delay={idx * 0.05} style={{ padding: 'var(--space-md) var(--space-lg)', display: 'flex', alignItems: 'center', gap: 'var(--space-sm)' }}>
                <CircleDot size={16} color={item.color === 'green' ? 'var(--green-accent)' : 'var(--blue-accent)'} style={{ flexShrink: 0 }} />
                <span style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>{item.text}</span>
              </AnimatedCard>
            ))}
          </div>
        </div>
        <style>{`
          @media (max-width: 900px) {
            #sound-familiar .container-wide > div[style*="280px"] { grid-template-columns: 1fr !important; }
            #sound-familiar .container-wide > div > div:first-child { position: static !important; }
          }
        `}</style>
      </div>
    </section>

    {/* PARADIGM SHIFT - asymmetric layout with overlapping quote */}
    <section id="paradigm" className="section-layer side-glow-blue" style={{ padding: 'var(--space-4xl) 0', position: 'relative', overflow: 'hidden' }}>
      <div className="section-number" style={{ left: 'var(--space-xl)', right: 'auto' }}>02</div>
      <div className="floating-accent" style={{ bottom: '10%', left: '5%', borderColor: 'var(--green-dim)' }} />
      <div className="floating-accent sm" style={{ top: '15%', right: '12%', borderColor: 'var(--blue-dim)' }} />
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: 'var(--space-2xl)', alignItems: 'start' }}>
          <div>
            <span className="badge red" style={{ marginBottom: 'var(--space-sm)', display: 'inline-block' }}>PARADIGM SHIFT</span>
            <h2 className="section-heading" style={{ marginBottom: 'var(--space-lg)' }}>Beyond Prompt Engineering</h2>
            <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', lineHeight: '1.85', marginBottom: 'var(--space-md)' }}>
              You know how to prompt. You know the tools. But there's a ceiling—and you've hit it. The next level isn't a better template. It's a fundamentally different relationship with AI.
            </p>
            <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', lineHeight: '1.85', marginBottom: 'var(--space-md)' }}>
              <strong style={{ color: 'var(--text-white)' }}>When a musician plays, the instrument disappears.</strong> Their brain adopts it as an extension of their body. That's what AI should feel like.
            </p>
            <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', lineHeight: '1.85' }}>
              Cyborg skills are about AI becoming part of how you think—cognitive parallelism, working memory expansion, perspective multiplication.
            </p>
          </div>
          <div>
            <VideoPlaceholder label="Watch: The Paradigm Shift" aspectRatio="16/9" />
            <AnimatedCard className="card-green card-overlap-up" style={{ padding: 'var(--space-md) var(--space-lg)', marginLeft: 'var(--space-xl)', marginRight: '-var(--space-md)' }}>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.65, fontStyle: 'italic' }}>
                "That is a capability that has never existed in the history of humanity."
              </p>
            </AnimatedCard>
          </div>
        </div>
        <style>{`
          @media (max-width: 768px) {
            #paradigm .container > div { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </div>
    </section>

    {/* Accent stripe divider */}
    <div className="accent-stripe" />

    {/* EXPERIMENT TABLE - preview 3 skills */}
    <section id="experiment-table" className="section-alt-dark section-mesh" style={{ padding: 'var(--space-4xl) 0', position: 'relative' }}>
      <div className="section-number">03</div>
      <div className="container-wide" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 'var(--space-md)', marginBottom: 'var(--space-xl)' }}>
          <div>
            <h2 className="section-heading" style={{ marginBottom: 'var(--space-sm)' }}>The Experiment Table</h2>
            <p style={{ maxWidth: '480px', color: 'var(--text-secondary)', lineHeight: '1.7', fontSize: '0.92rem' }}>
              12 cyborg skills with audio walkthroughs. Each skill is a cognitive capability that emerges when AI becomes transparent equipment.
            </p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)' }}>
            <Volume2 size={16} color="var(--green-accent)" />
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>Audio enabled</span>
          </div>
        </div>
        <ExperimentTable limit={3} />
        <div style={{ textAlign: 'center', marginTop: 'var(--space-xl)' }}>
          <Link to="/podcast" className="btn primary">
            Listen to All 12 Skills <ArrowRight size={16} className="arrow-icon" />
          </Link>
        </div>
      </div>
    </section>

    {/* FREE RESOURCE + TESTIMONIAL - combined row */}
    <section className="section-layer side-glow-green" style={{ padding: 'var(--space-4xl) 0', position: 'relative', overflow: 'hidden' }}>
      <div className="floating-accent" style={{ top: '-10%', right: '8%', borderColor: 'var(--green-dim)' }} />
      <div className="container-wide" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 0.6fr', gap: 'var(--space-lg)', alignItems: 'stretch' }}>
          {/* Field Guide */}
          <AnimatedCard className="card-green" style={{ padding: 'var(--space-xl)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 'var(--space-xl)', alignItems: 'center' }}>
              <div>
                <span className="badge green" style={{ marginBottom: 'var(--space-sm)', display: 'inline-block' }}>FREE FIELD GUIDE</span>
                <h2 style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.6rem)', marginBottom: 'var(--space-sm)', fontFamily: 'Playfair Display, serif', fontWeight: 600 }}>
                  The 7 Cyborg Habits
                </h2>
                <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7', marginBottom: 'var(--space-md)', fontSize: '0.9rem' }}>
                  A concise reference to the 7 cognitive habits that turn AI into transparent equipment.
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: 'var(--space-lg)' }}>
                  {['Explain', 'Plan', 'Guide', 'Imagine', 'Suggest', 'Improve', 'Critique'].map((h, i) => (
                    <span key={i} className="badge green" style={{ fontSize: '0.62rem' }}>{h}</span>
                  ))}
                </div>
                <div style={{ display: 'flex', gap: 'var(--space-sm)', flexWrap: 'wrap' }}>
                  <input type="email" placeholder="Your email" className="form-input" style={{ maxWidth: '220px', flex: 1, padding: '0.7rem 1rem' }} />
                  <button className="btn primary" style={{ padding: '0.7rem 1.25rem' }}>Get Guide <Gift size={14} /></button>
                </div>
              </div>
              <ImagePlaceholder height={240} label="Preview" style={{ width: '180px', display: 'none' }} />
            </div>
            <style>{`
              @media (min-width: 1100px) {
                .card-green .media-placeholder[style*="180px"] { display: flex !important; }
              }
            `}</style>
          </AnimatedCard>

          {/* Testimonial */}
          <AnimatedCard className="card-blue" delay={0.1} style={{ padding: 'var(--space-xl)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div style={{ marginBottom: 'var(--space-lg)' }}>
              <div style={{ width: '60px', height: '60px', borderRadius: '50%', overflow: 'hidden', border: '2px solid var(--green-accent)', boxShadow: 'var(--shadow-glow-green)', marginBottom: 'var(--space-md)' }}>
                <ImagePlaceholder height={60} label="" style={{ borderRadius: '0', border: 'none', height: '100%' }} />
              </div>
            </div>
            <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.7, fontStyle: 'italic', fontFamily: 'Playfair Display, serif', flex: 1 }}>
              "Devil's Advocate is the best thing I ever learned about AI. Every cohort, students say it's the thing that blew their mind the most."
            </p>
            <div style={{ marginTop: 'var(--space-md)', color: 'var(--green-accent)', fontWeight: 700, fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '1.5px' }}>
              — Scott, Graduate
            </div>
          </AnimatedCard>
        </div>
        <style>{`
          @media (max-width: 900px) {
            .section-layer .container-wide > div[style*="1.4fr"] { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </div>
    </section>

    {/* Accent stripe divider */}
    <div className="accent-stripe" />

    {/* ECOSYSTEM - asymmetric bento layout */}
    <section id="ecosystem-section" className="section-alt-dark section-mesh side-glow-blue" style={{ padding: 'var(--space-4xl) 0', position: 'relative' }}>
      <div className="section-number" style={{ right: 'var(--space-xl)' }}>04</div>
      <div className="floating-accent sm" style={{ bottom: '15%', left: '3%', borderColor: 'var(--green-dim)' }} />
      <div className="container-wide" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 'var(--space-xl)', flexWrap: 'wrap', gap: 'var(--space-md)' }}>
          <div>
            <h2 className="section-heading" style={{ marginBottom: 'var(--space-sm)' }}>The Cyborg Ecosystem</h2>
            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7', fontSize: '0.92rem', maxWidth: '480px' }}>
              Not a course—a complete system for building transparent equipment habits.
            </p>
          </div>
          <Link to="/marketplace" className="btn outline" style={{ padding: '0.6rem 1.25rem' }}>
            View All <ArrowRight size={16} className="arrow-icon" />
          </Link>
        </div>
        {/* Asymmetric grid: flagship card spans 2 rows */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr 1fr', gridTemplateRows: 'auto auto', gap: 'var(--space-md)' }}>
          <AnimatedCard className="card-featured card-green" delay={0} style={{ padding: 'var(--space-xl)', gridRow: '1 / 3', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <span className="badge green" style={{ marginBottom: 'var(--space-sm)', display: 'inline-block' }}>Flagship</span>
              <h3 style={{ fontSize: '1.4rem', fontFamily: 'Playfair Display, serif', fontWeight: 700, marginBottom: 'var(--space-sm)' }}>Cyborg Habits</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7', fontSize: '0.92rem', marginBottom: 'var(--space-md)' }}>
                15-day cognitive upgrade. Seven habits as transparent equipment. The complete transformation program.
              </p>
            </div>
            <div>
              <div style={{ fontSize: '2rem', fontWeight: 700, fontFamily: 'Playfair Display, serif', marginBottom: 'var(--space-sm)' }} className="gradient-text">$199</div>
              <Link to="/habits" className="btn primary" style={{ width: '100%' }}>Start Now <ArrowRight size={16} className="arrow-icon" /></Link>
            </div>
          </AnimatedCard>
          {[
            { title: "Marketplace", desc: "Physical cards, digital tools, browser simulations.", tag: "Tools", price: "From $19", color: "blue" },
            { title: "Think Tank", desc: "Deep essays on extended cognition and the cyborg future.", tag: "Free", price: "Free", color: "green" },
            { title: "Podcast", desc: "Conversations with practitioners on thinking with AI.", tag: "Free", price: "Free", color: "blue" }
          ].map((item, idx) => (
            <AnimatedCard key={idx} className={`card-${item.color}`} delay={(idx + 1) * 0.08} style={{ padding: 'var(--space-lg)' }}>
              <span className={`badge ${item.color}`} style={{ marginBottom: 'var(--space-sm)', display: 'inline-block' }}>{item.tag}</span>
              <h3 style={{ fontSize: '1.1rem', fontFamily: 'Playfair Display, serif', fontWeight: 600, marginBottom: 'var(--space-xs)' }}>{item.title}</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6', fontSize: '0.85rem', marginBottom: 'var(--space-md)' }}>{item.desc}</p>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem', fontWeight: 600 }}>{item.price}</span>
            </AnimatedCard>
          ))}
        </div>
        <style>{`
          @media (max-width: 900px) {
            #ecosystem-section .container-wide > div[style*="1.2fr"] { grid-template-columns: 1fr !important; }
            #ecosystem-section .container-wide > div[style*="1.2fr"] > *:first-child { grid-row: auto !important; }
          }
        `}</style>
      </div>
    </section>

    {/* OUR CLIENTS - logo slider */}
    <section className="section-layer" style={{ padding: 'var(--space-3xl) 0', position: 'relative' }}>
      <div className="container" style={{ textAlign: 'center', marginBottom: 'var(--space-xl)' }}>
        <span className="badge green" style={{ marginBottom: 'var(--space-sm)', display: 'inline-block' }}>TRUSTED BY</span>
        <h2 style={{ fontSize: '1.3rem', fontFamily: 'Playfair Display, serif', fontWeight: 600, color: 'var(--text-white)' }}>Our Clients</h2>
      </div>
      <div className="marquee-wrapper">
        <div className="client-logo-track">
          {[...Array(2)].flatMap((_, setIdx) =>
            [
              { name: 'Deloitte', icon: '◆' },
              { name: 'Accenture', icon: '▲' },
              { name: 'McKinsey & Co', icon: '■' },
              { name: 'Google', icon: '●' },
              { name: 'Microsoft', icon: '⬡' },
              { name: 'Spotify', icon: '◉' },
              { name: 'Salesforce', icon: '☁' },
              { name: 'IBM', icon: '▣' },
              { name: 'Adobe', icon: '△' },
              { name: 'Meta', icon: '∞' },
              { name: 'Amazon', icon: '→' },
              { name: 'Netflix', icon: '▶' },
            ].map((client, idx) => (
              <div key={`${setIdx}-${idx}`} className="client-logo-item">
                <span style={{ fontSize: '1.4rem' }}>{client.icon}</span>
                {client.name}
              </div>
            ))
          )}
        </div>
      </div>
    </section>

    {/* CTA - with visual emphasis */}
    <section className="section-layer" style={{ padding: 'var(--space-4xl) 0', position: 'relative', overflow: 'hidden' }}>
      <div className="floating-accent lg" style={{ top: '-30%', left: '50%', transform: 'translateX(-50%)', borderColor: 'var(--green-dim)' }} />
      <div className="floating-accent" style={{ bottom: '-20%', right: '10%', borderColor: 'var(--blue-dim)' }} />
      <div className="container" style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
        <div style={{
          background: 'linear-gradient(135deg, var(--bg-card) 0%, rgba(62,207,113,0.03) 50%, var(--bg-card) 100%)',
          border: '1px solid var(--border-glow-green)',
          borderRadius: 'var(--radius-xl)',
          padding: 'var(--space-3xl) var(--space-2xl)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Subtle inner glow */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'radial-gradient(ellipse 50% 60% at 50% 0%, var(--green-glow) 0%, transparent 70%)',
            pointerEvents: 'none'
          }} />
          <h2 style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)', marginBottom: 'var(--space-sm)', fontFamily: 'Playfair Display, serif', fontWeight: 600, color: 'var(--text-white)', position: 'relative' }}>
            Ready to Become Cognitively Superhuman?
          </h2>
          <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', maxWidth: '500px', margin: '0 auto var(--space-lg)', lineHeight: 1.7, position: 'relative' }}>
            Join practitioners thinking with AI as an extension of their mind.
          </p>
          <div style={{ display: 'flex', gap: 'var(--space-md)', justifyContent: 'center', flexWrap: 'wrap', position: 'relative' }}>
            <Link to="/habits" className="btn accent">
              Start 15-Day Challenge <ArrowRight size={18} className="arrow-icon" />
            </Link>
            <a href="#experiment-table" className="btn outline">
              Explore Skills First
            </a>
          </div>
        </div>
      </div>
    </section>
  </div>
);

const HabitsPage = () => (
  <div>
    {/* HERO - compact with geometric background */}
    <section className="hero-section" style={{ paddingTop: '100px', paddingBottom: 'var(--space-2xl)', position: 'relative' }}>
      <div className="hero-orb green"></div>
      <div className="hero-orb blue"></div>
      <div className="hero-lines">
        <svg viewBox="0 0 1200 500" preserveAspectRatio="none">
          <line x1="0" y1="250" x2="1200" y2="100" stroke="var(--border-subtle)" strokeWidth="0.5" />
          <line x1="800" y1="0" x2="400" y2="500" stroke="var(--border-subtle)" strokeWidth="0.3" />
          <circle cx="900" cy="250" r="180" stroke="var(--border-subtle)" strokeWidth="0.4" fill="none" />
        </svg>
      </div>
      <div className="container-wide" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: 'var(--space-2xl)', alignItems: 'center' }}>
          <div>
            <span className="badge green" style={{ marginBottom: 'var(--space-sm)', display: 'inline-block', animation: 'fadeInUp 0.8s ease backwards' }}>15-DAY TRANSFORMATION</span>
            <h1 className="page-title" style={{ animation: 'fadeInUp 0.8s ease 0.1s backwards' }}>Cyborg Habits.</h1>
            <p className="page-subtitle" style={{ marginTop: 'var(--space-md)', marginBottom: 'var(--space-lg)', animation: 'fadeInUp 0.8s ease 0.2s backwards' }}>
              15 days. 7 habits. One cognitive upgrade. Stop using AI as a tool and start thinking with it as transparent equipment.
            </p>
            <div style={{ display: 'flex', gap: 'var(--space-md)', flexWrap: 'wrap', animation: 'fadeInUp 0.8s ease 0.3s backwards' }}>
              <a href="#enroll" className="btn primary">See the Program <ArrowRight size={18} className="arrow-icon" /></a>
              <a href="#seven-habits" className="btn outline">The 7 Habits <ChevronRight size={18} /></a>
            </div>
            {/* Quick stats */}
            <div style={{ display: 'flex', gap: 'var(--space-2xl)', marginTop: 'var(--space-2xl)', animation: 'fadeInUp 0.8s ease 0.4s backwards' }}>
              {[{ n: '15', l: 'Days' }, { n: '7', l: 'Habits' }, { n: '100%', l: 'Practical' }].map((s, i) => (
                <div key={i}>
                  <div style={{ fontSize: '1.4rem', fontWeight: 700, fontFamily: 'Playfair Display, serif', lineHeight: 1 }} className="gradient-text">{s.n}</div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1.5px', fontWeight: 600, marginTop: '4px' }}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ animation: 'fadeInRight 1s ease 0.3s backwards' }}>
            <VideoPlaceholder label="Program Overview Video" aspectRatio="16/9" />
          </div>
        </div>
      </div>
      <style>{`
        @media (max-width: 900px) {
          .hero-section .container-wide > div[style*="1.2fr 0.8fr"] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>

    <div className="accent-stripe" />

    {/* THE SEVEN HABITS - alternating layout instead of flat grid */}
    <section id="seven-habits" className="section-alt-dark section-mesh side-glow-green" style={{ padding: 'var(--space-4xl) 0', position: 'relative' }}>
      <div className="section-number">7</div>
      <div className="floating-accent lg" style={{ top: '5%', right: '-8%', borderColor: 'var(--green-dim)' }} />
      <div className="container-wide" style={{ position: 'relative', zIndex: 1 }}>
        <h2 className="section-heading" style={{ marginBottom: 'var(--space-lg)' }}>The Seven Habits</h2>
        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '0.92rem', maxWidth: '520px', marginBottom: 'var(--space-2xl)' }}>
          Each habit is a cognitive superpower. Together they form a complete system for thinking with AI.
        </p>
        {/* Row 1: 4 even cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 'var(--space-lg)', marginBottom: 'var(--space-lg)' }}>
          {[
            { habit: 'Explain It', desc: 'Instant externalization. Crystallize tacit knowledge into structured form.', icon: Lightbulb, color: 'green', num: 1 },
            { habit: 'Plan It', desc: 'Cascade awareness. See downstream consequences before you arrive.', icon: Target, color: 'blue', num: 2 },
            { habit: 'Guide It', desc: 'Cognitive offloading. Direct what stays in mind vs. what gets externalized.', icon: TrendingUp, color: 'green', num: 3 },
            { habit: 'Imagine It', desc: 'Adjacent possible navigation. Explore possibility space at speed.', icon: Sparkles, color: 'blue', num: 4 },
          ].map((item, idx) => (
            <AnimatedCard key={idx} className={`card-${item.color}`} delay={idx * 0.06} style={{ padding: 'var(--space-xl)' }}>
              <span className={`badge ${item.color}`} style={{ marginBottom: 'var(--space-sm)', display: 'inline-block' }}>Habit {item.num}</span>
              <div className={`icon-box ${item.color}`} style={{ marginBottom: 'var(--space-md)' }}><item.icon size={24} color="white" /></div>
              <h3 style={{ fontSize: '1.15rem', fontFamily: 'Playfair Display, serif', fontWeight: 600, marginBottom: 'var(--space-xs)' }}>{item.habit}</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.65, fontSize: '0.88rem' }}>{item.desc}</p>
            </AnimatedCard>
          ))}
        </div>
        {/* Row 2: 3 even cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--space-lg)' }}>
          {[
            { habit: 'Suggest It', desc: 'Variation production. Generate a landscape of solutions, not just one.', icon: Zap, color: 'green', num: 5 },
            { habit: 'Improve It', desc: 'Accelerated iteration. Ten versions in the time one would take.', icon: TrendingUp, color: 'blue', num: 6 },
            { habit: 'Critique It', desc: 'Adversarial self-examination. Find the holes in your thinking before others do.', icon: Eye, color: 'green', num: 7 },
          ].map((item, idx) => (
            <AnimatedCard key={idx} className={`card-${item.color}`} delay={0.24 + idx * 0.06} style={{ padding: 'var(--space-xl)' }}>
              <span className={`badge ${item.color}`} style={{ marginBottom: 'var(--space-sm)', display: 'inline-block' }}>Habit {item.num}</span>
              <div className={`icon-box ${item.color}`} style={{ marginBottom: 'var(--space-md)' }}><item.icon size={24} color="white" /></div>
              <h3 style={{ fontSize: '1.15rem', fontFamily: 'Playfair Display, serif', fontWeight: 600, marginBottom: 'var(--space-xs)' }}>{item.habit}</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.65, fontSize: '0.88rem' }}>{item.desc}</p>
            </AnimatedCard>
          ))}
        </div>
      </div>
      <style>{`
        @media (max-width: 1000px) {
          #seven-habits .container-wide > div[style*="repeat(4"] { grid-template-columns: repeat(2, 1fr) !important; }
          #seven-habits .container-wide > div[style*="repeat(3"] { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 600px) {
          #seven-habits .container-wide > div[style*="repeat(4"] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>

    {/* HOW IT WORKS - visual timeline with side glow */}
    <section className="section-layer side-glow-blue" style={{ padding: 'var(--space-3xl) 0', position: 'relative', overflow: 'hidden' }}>
      <div className="section-number" style={{ left: 'var(--space-xl)', right: 'auto' }}>15</div>
      <div className="floating-accent" style={{ bottom: '5%', right: '3%', borderColor: 'var(--blue-dim)' }} />
      <div className="container-wide" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 'var(--space-xl)', flexWrap: 'wrap', gap: 'var(--space-md)' }}>
          <div>
            <h2 className="section-heading" style={{ marginBottom: 'var(--space-sm)' }}>How It Works</h2>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '0.92rem', maxWidth: '420px' }}>Three phases over 15 days. Each builds on the last.</p>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--space-md)' }}>
          {[
            { phase: 'Phase 1', title: 'Transparent Equipment', days: 'Days 1–5', desc: "Rewire how you interact with AI. Move from 'using a tool' to cognitive extension. Build the externalization and explanation habits that make AI disappear into your thinking.", color: 'green' },
            { phase: 'Phase 2', title: 'Cognitive Expansion', days: 'Days 6–10', desc: "Unlock perspective multiplication, accelerated iteration, and cascade awareness. Start thinking in ways that weren't possible before.", color: 'blue' },
            { phase: 'Phase 3', title: 'Cyborg Identity', days: 'Days 11–15', desc: "Integrate all seven habits into a unified cognitive system. By the end, you're not someone who uses AI—you're a cyborg.", color: 'green' },
          ].map((phase, idx) => (
            <AnimatedCard key={idx} className={`card-${phase.color}`} delay={idx * 0.1} style={{ padding: 'var(--space-xl)', position: 'relative', overflow: 'hidden' }}>
              {/* Large phase number background */}
              <div style={{ position: 'absolute', top: '-10px', right: '10px', fontSize: '5rem', fontFamily: 'Playfair Display, serif', fontWeight: 900, opacity: 0.04, lineHeight: 1, color: 'var(--text-white)' }}>{idx + 1}</div>
              <span className={`badge ${phase.color}`} style={{ marginBottom: 'var(--space-sm)', display: 'inline-block' }}>{phase.days}</span>
              <h3 style={{ fontSize: '1.2rem', fontFamily: 'Playfair Display, serif', fontWeight: 600, marginBottom: 'var(--space-sm)' }}>{phase.title}</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '0.88rem' }}>{phase.desc}</p>
            </AnimatedCard>
          ))}
        </div>
        <style>{`
          @media (max-width: 768px) {
            .section-layer .container-wide > div[style*="repeat(3"] { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </div>
    </section>

    <div className="accent-stripe" />

    {/* SOCIAL PROOF + ENROLL - split layout */}
    <section id="enroll" className="section-alt-dark section-mesh" style={{ padding: 'var(--space-5xl) 0', position: 'relative' }}>
      <div className="floating-accent lg" style={{ top: '-15%', left: '50%', transform: 'translateX(-50%)', borderColor: 'var(--green-dim)' }} />
      <div className="container-wide" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-3xl)', alignItems: 'start' }}>
          {/* Left: social proof stack */}
          <div>
            <h2 className="section-heading" style={{ marginBottom: 'var(--space-xl)' }}>What Graduates Say</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-lg)' }}>
              {[
                { quote: "Through the program I learned how to do a lot of stuff on my own with the help of AI. As someone with no background in coding at all, I learned how to design a website using AI tools.", name: "Masud Mohammed", role: "Program Graduate", color: "green" },
                { quote: "Devil's Advocate is the best thing I ever learned about AI. Every cohort, students say it's the thing that blew their mind the most.", name: "Scott", role: "Graduate", color: "blue" },
              ].map((t, idx) => (
                <AnimatedCard key={idx} className={`card-${t.color}`} delay={idx * 0.1} style={{ padding: 'var(--space-xl)' }}>
                  <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.8, fontStyle: 'italic', fontFamily: 'Playfair Display, serif', marginBottom: 'var(--space-md)' }}>
                    "{t.quote}"
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)' }}>
                    <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: `linear-gradient(135deg, var(--${t.color}-accent), var(--${t.color}-accent-dark))`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 700, color: 'white' }}>
                      {t.name.charAt(0)}
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.82rem', color: 'var(--text-white)' }}>{t.name}</div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{t.role}</div>
                    </div>
                  </div>
                </AnimatedCard>
              ))}
              <AnimatedCard className="card-green" delay={0.2} style={{ padding: 'var(--space-xl)', display: 'flex', alignItems: 'center', gap: 'var(--space-lg)' }}>
                <VideoPlaceholder label="Student Story" aspectRatio="16/9" style={{ width: '180px', flexShrink: 0 }} />
                <div>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: 'var(--space-sm)' }}>Watch how practitioners describe the transformation after the 15-day program.</p>
                  <span style={{ fontSize: '0.72rem', color: 'var(--green-accent)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px' }}>Watch Video</span>
                </div>
              </AnimatedCard>
            </div>
          </div>
          {/* Right: pricing card */}
          <div style={{ position: 'sticky', top: '100px' }}>
            <AnimatedCard className="card-featured card-green" delay={0.15} style={{ padding: 'var(--space-3xl) var(--space-2xl)', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 60% 50% at 50% 0%, var(--green-glow) 0%, transparent 70%)', pointerEvents: 'none' }} />
              <div style={{ position: 'relative' }}>
                <span className="badge green" style={{ marginBottom: 'var(--space-md)', display: 'inline-block' }}>FLAGSHIP PROGRAM</span>
                <h3 style={{ fontSize: '1.6rem', marginBottom: 'var(--space-sm)', fontFamily: 'Playfair Display, serif', fontWeight: 700 }}>Join the Next Cohort</h3>
                <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--space-xl)', lineHeight: 1.75, fontSize: '0.95rem' }}>
                  Live sessions with fellow practitioners, community of cyborgs, and lifetime access. Go cohort or self-paced.
                </p>
                <div style={{ fontSize: '2.8rem', fontWeight: 700, marginBottom: 'var(--space-sm)', fontFamily: 'Playfair Display, serif' }} className="gradient-text">$199</div>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: 'var(--space-xl)' }}>One-time payment. Lifetime access.</p>
                <button className="btn primary" style={{ width: '100%', padding: '1rem' }}>
                  Enroll Now <ArrowRight size={18} className="arrow-icon" />
                </button>
                <p style={{ marginTop: 'var(--space-md)', fontSize: '0.78rem', color: 'var(--text-muted)' }}>30-day money-back guarantee.</p>
                <div style={{ display: 'flex', justifyContent: 'center', gap: 'var(--space-lg)', marginTop: 'var(--space-lg)', paddingTop: 'var(--space-md)', borderTop: '1px solid var(--border-subtle)' }}>
                  {[{ n: '7', l: 'Habits' }, { n: '15', l: 'Days' }, { n: '∞', l: 'Access' }].map((s, i) => (
                    <div key={i} style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-white)' }}>{s.n}</div>
                      <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>{s.l}</div>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedCard>
          </div>
        </div>
        <style>{`
          @media (max-width: 900px) {
            #enroll .container-wide > div[style*="1fr 1fr"] { grid-template-columns: 1fr !important; }
            #enroll .container-wide > div > div:last-child { position: static !important; }
          }
        `}</style>
      </div>
    </section>
  </div>
);

const MarketplacePage = () => (
  <div>
    {/* HERO - compact with icon row */}
    <section className="hero-section" style={{ paddingTop: '100px', paddingBottom: 'var(--space-xl)', position: 'relative' }}>
      <div className="hero-orb green"></div>
      <div className="hero-orb blue"></div>
      <div className="hero-lines">
        <svg viewBox="0 0 1200 400" preserveAspectRatio="none">
          <line x1="100" y1="0" x2="1100" y2="400" stroke="var(--border-subtle)" strokeWidth="0.4" />
          <line x1="1100" y1="0" x2="100" y2="400" stroke="var(--border-subtle)" strokeWidth="0.4" />
          <circle cx="600" cy="200" r="120" stroke="var(--border-subtle)" strokeWidth="0.5" fill="none" />
        </svg>
      </div>
      <div className="container-wide" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto' }}>
          <span className="badge blue" style={{ marginBottom: 'var(--space-sm)', display: 'inline-block', animation: 'fadeInUp 0.8s ease backwards' }}>THE MARKETPLACE</span>
          <h1 className="page-title" style={{ marginBottom: 'var(--space-sm)', animation: 'fadeInUp 0.8s ease 0.1s backwards' }}>Tools & Resources.</h1>
          <p className="page-subtitle" style={{ margin: '0 auto var(--space-xl)', animation: 'fadeInUp 0.8s ease 0.2s backwards' }}>
            Physical cards, digital tools, video courses, and simulations to practice cyborg skills.
          </p>
        </div>
        {/* Icon row as horizontal strip */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 'var(--space-md)', maxWidth: '900px', margin: '0 auto', animation: 'fadeInUp 0.8s ease 0.3s backwards' }}>
          {[
            { label: "Card Deck", icon: Layers, desc: "Physical prompts", color: "green" },
            { label: "Book", icon: BookOpen, desc: "84-page guide", color: "blue" },
            { label: "Video Skills", icon: Play, desc: "52 weekly lessons", color: "green" },
            { label: "Games", icon: Gamepad2, desc: "Practice & compete", color: "blue" }
          ].map((item, idx) => (
            <AnimatedCard key={idx} delay={idx * 0.06} style={{ padding: 'var(--space-md) var(--space-sm)', textAlign: 'center' }}>
              <div className={`icon-box ${item.color}`} style={{ margin: '0 auto var(--space-sm)', width: '48px', height: '48px' }}>
                <item.icon size={22} color="white" />
              </div>
              <h3 style={{ fontSize: '0.88rem', fontFamily: 'Playfair Display, serif', fontWeight: 600, marginBottom: '2px' }}>{item.label}</h3>
              <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{item.desc}</p>
            </AnimatedCard>
          ))}
        </div>
      </div>
      <style>{`
        @media (max-width: 600px) {
          .hero-section .container-wide > div[style*="repeat(4"] { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </section>

    <div className="accent-stripe" />

    {/* SHOP - asymmetric product grid: featured product + 3 smaller */}
    <section id="mp-shop" className="section-alt-dark section-mesh side-glow-green" style={{ padding: 'var(--space-3xl) 0', position: 'relative' }}>
      <div className="section-number">Shop</div>
      <div className="floating-accent" style={{ bottom: '10%', right: '2%', borderColor: 'var(--green-dim)' }} />
      <div className="container-wide" style={{ position: 'relative', zIndex: 1 }}>
        <h2 className="section-heading" style={{ marginBottom: 'var(--space-xl)' }}>Shop</h2>
        {/* Asymmetric: featured card left + 3 stacked right */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 'var(--space-md)' }}>
          {/* Featured product */}
          <AnimatedCard className="card-featured card-green" delay={0} style={{ padding: 0, overflow: 'hidden', gridRow: 'span 2' }}>
            <ImagePlaceholder height={260} label="Card Deck Photo" style={{ borderRadius: 'var(--radius-xl) var(--radius-xl) 0 0', border: 'none' }} />
            <div style={{ padding: 'var(--space-xl)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)', marginBottom: 'var(--space-sm)' }}>
                <span className="badge green">$29</span>
                <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1.5px', fontWeight: 700 }}>PHYSICAL</span>
              </div>
              <h3 style={{ fontSize: '1.4rem', fontFamily: 'Playfair Display, serif', fontWeight: 700, marginBottom: 'var(--space-sm)' }}>The 7 Habits Card Deck</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7', fontSize: '0.92rem', marginBottom: 'var(--space-lg)' }}>
                52 beautifully designed cards with prompts for each habit. Keep on your desk, shuffle when stuck. The physical companion to your cyborg practice.
              </p>
              <button className="btn primary" style={{ width: '100%' }}>Pre-Order <ArrowRight size={16} className="arrow-icon" /></button>
            </div>
          </AnimatedCard>
          {/* Remaining products as compact horizontal cards */}
          {[
            { title: "The Extended Mind Book", category: "BOOK", description: "84 pages of insights, stories, and exercises. Coffee-table worthy.", price: "$45", color: "blue", btn: "Order Now", label: "Book Cover" },
            { title: "Prompt Starter Pack", category: "DIGITAL", description: "100+ ready-to-use prompts for everyday situations.", price: "$19", color: "green", btn: "Download", label: "Digital Preview" },
            { title: "First 12 Skills Bundle", category: "VIDEO", description: "Meeting to Summary, Deep Dive Research, Vibe Engineering, and 9 more.", price: "$79", color: "blue", btn: "Get Access", label: "Video Bundle" }
          ].map((product, idx) => (
            <AnimatedCard key={idx} className={`card-${product.color}`} delay={(idx + 1) * 0.08} style={{ padding: 0, overflow: 'hidden' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '140px 1fr', height: '100%' }}>
                <ImagePlaceholder height={100} label={product.label} style={{ borderRadius: 'var(--radius-xl) 0 0 var(--radius-xl)', border: 'none', height: '100%' }} />
                <div style={{ padding: 'var(--space-md) var(--space-lg)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)', marginBottom: '4px' }}>
                    <span className={`badge ${product.color}`} style={{ fontSize: '0.6rem' }}>{product.price}</span>
                    <span style={{ fontSize: '0.62rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 700 }}>{product.category}</span>
                  </div>
                  <h3 style={{ fontSize: '1rem', fontFamily: 'Playfair Display, serif', fontWeight: 600, marginBottom: '4px' }}>{product.title}</h3>
                  <p style={{ color: 'var(--text-secondary)', lineHeight: '1.5', fontSize: '0.82rem', marginBottom: 'var(--space-sm)' }}>{product.description}</p>
                  <button className={`btn ${product.color === 'green' ? 'primary' : 'tech'}`} style={{ padding: '0.5rem 1rem', fontSize: '0.75rem', alignSelf: 'flex-start' }}>{product.btn}</button>
                </div>
              </div>
            </AnimatedCard>
          ))}
        </div>
        <style>{`
          @media (max-width: 900px) {
            #mp-shop .container-wide > div[style*="1.3fr"] { grid-template-columns: 1fr !important; }
            #mp-shop .container-wide > div > *:first-child { grid-row: auto !important; }
            #mp-shop .card-panel > div[style*="140px 1fr"] { grid-template-columns: 1fr !important; }
            #mp-shop .card-panel > div[style*="140px 1fr"] > div:first-child { height: 140px; border-radius: var(--radius-xl) var(--radius-xl) 0 0 !important; }
          }
        `}</style>
      </div>
    </section>

    {/* BUNDLE CTA - prominent card with inner glow */}
    <section className="section-layer" style={{ padding: 'var(--space-3xl) 0', position: 'relative', overflow: 'hidden' }}>
      <div className="floating-accent lg" style={{ top: '-20%', right: '10%', borderColor: 'var(--blue-dim)' }} />
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <AnimatedCard className="card-featured card-green" style={{ padding: 'var(--space-2xl)', maxWidth: '700px', margin: '0 auto', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 60% 50% at 50% 0%, var(--green-glow) 0%, transparent 70%)', pointerEvents: 'none' }} />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 'var(--space-xl)', alignItems: 'center', position: 'relative' }}>
            <div>
              <span className="badge red" style={{ marginBottom: 'var(--space-sm)', display: 'inline-block' }}>BEST VALUE</span>
              <h3 style={{ fontSize: '1.5rem', marginBottom: 'var(--space-sm)', fontFamily: 'Playfair Display, serif', fontWeight: 700 }}>Complete Bundle</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '0.9rem', marginBottom: 'var(--space-md)' }}>
                Cyborg Habits + Card Deck + Book + Prompt Pack + 1 Year Skills
              </p>
              <button className="btn accent">Get Everything <ArrowRight size={18} className="arrow-icon" /></button>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '1rem', color: 'var(--text-muted)', textDecoration: 'line-through', marginBottom: '4px' }}>$425</div>
              <div style={{ fontSize: '2.5rem', fontWeight: 700, fontFamily: 'Playfair Display, serif' }} className="gradient-text">$299</div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>Save 30%</div>
            </div>
          </div>
        </AnimatedCard>
      </div>
    </section>
  </div>
);

const ThinkTankPage = () => (
  <div>
    {/* HERO - editorial feel */}
    <section className="hero-section" style={{ paddingTop: '100px', paddingBottom: 'var(--space-xl)', position: 'relative' }}>
      <div className="hero-orb green"></div>
      <div className="hero-lines">
        <svg viewBox="0 0 1200 400" preserveAspectRatio="none">
          <line x1="0" y1="300" x2="600" y2="0" stroke="var(--border-subtle)" strokeWidth="0.5" />
          <line x1="600" y1="400" x2="1200" y2="100" stroke="var(--border-subtle)" strokeWidth="0.3" />
        </svg>
      </div>
      <div className="container-wide" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-2xl)', alignItems: 'end' }}>
          <div>
            <span className="badge green" style={{ marginBottom: 'var(--space-sm)', display: 'inline-block', animation: 'fadeInUp 0.8s ease backwards' }}>THE THINK TANK</span>
            <h1 className="page-title" style={{ animation: 'fadeInUp 0.8s ease 0.1s backwards' }}>Ideas & Extended Cognition.</h1>
            <p className="page-subtitle" style={{ marginTop: 'var(--space-md)', animation: 'fadeInUp 0.8s ease 0.2s backwards' }}>
              Weekly explorations at the frontier of human-AI cognition. Extended mind theory meets practical cyborg reality.
            </p>
          </div>
          {/* Newsletter signup in hero */}
          <AnimatedCard className="card-blue" delay={0.2} style={{ padding: 'var(--space-lg)' }}>
            <h3 style={{ fontSize: '1rem', fontFamily: 'Playfair Display, serif', fontWeight: 600, marginBottom: 'var(--space-sm)' }}>Get Essays In Your Inbox</h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--space-md)', fontSize: '0.85rem', lineHeight: 1.6 }}>Weekly insights. No spam. Unsubscribe anytime.</p>
            <div style={{ display: 'flex', gap: 'var(--space-sm)' }}>
              <input type="email" placeholder="your@email.com" className="form-input" style={{ flex: 1, padding: '0.65rem 1rem' }} />
              <button className="btn tech" style={{ padding: '0.65rem 1rem' }}>Subscribe</button>
            </div>
          </AnimatedCard>
        </div>
      </div>
      <style>{`
        @media (max-width: 900px) {
          .hero-section .container-wide > div[style*="1fr 1fr"] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>

    <div className="accent-stripe" />

    {/* FEATURED POST - magazine hero layout */}
    <section className="section-alt-dark section-mesh side-glow-green" style={{ padding: 'var(--space-3xl) 0', position: 'relative' }}>
      <div className="section-number">01</div>
      <div className="container-wide" style={{ position: 'relative', zIndex: 1 }}>
        <h2 className="section-heading" style={{ marginBottom: 'var(--space-xl)' }}>Latest Posts</h2>
        {/* Featured post: large card */}
        <AnimatedCard className="card-featured card-green" delay={0} style={{ padding: 0, overflow: 'hidden', marginBottom: 'var(--space-lg)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', minHeight: '300px' }}>
            <ImagePlaceholder height={300} label="Featured Article" style={{ borderRadius: 'var(--radius-xl) 0 0 var(--radius-xl)', border: 'none', height: '100%' }} />
            <div style={{ padding: 'var(--space-2xl)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)', marginBottom: 'var(--space-sm)' }}>
                <span className="badge green">Featured</span>
                <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1.5px', fontWeight: 700 }}>BEHAVIOR CHANGE</span>
                <span className="badge green" style={{ marginLeft: 'auto' }}>6 min</span>
              </div>
              <h3 style={{ fontSize: 'clamp(1.2rem, 2.5vw, 1.6rem)', fontFamily: 'Playfair Display, serif', fontWeight: 700, marginBottom: 'var(--space-sm)', lineHeight: 1.25 }}>
                Why AI Training Fails (And What to Do Instead)
              </h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7', fontSize: '0.95rem', marginBottom: 'var(--space-lg)' }}>
                Most AI training is a waste of time. The gap isn't knowledge—it's habits. Here's the paradigm shift that changes everything.
              </p>
              <button className="btn primary" style={{ alignSelf: 'flex-start' }}>Read Post <ArrowRight size={16} className="arrow-icon" /></button>
            </div>
          </div>
        </AnimatedCard>

        {/* Remaining posts: 2-column asymmetric layout */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-md)' }}>
          {/* Left column: 1 tall card */}
          <AnimatedCard className="card-blue" delay={0.08} style={{ padding: 0, overflow: 'hidden' }}>
            <ImagePlaceholder height={180} label="Article Image" style={{ borderRadius: 'var(--radius-xl) var(--radius-xl) 0 0', border: 'none' }} />
            <div style={{ padding: 'var(--space-lg)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-sm)' }}>
                <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1.5px', fontWeight: 700 }}>CRITIQUE IT</span>
                <span className="badge blue">6 min</span>
              </div>
              <h3 style={{ fontSize: '1.15rem', fontFamily: 'Playfair Display, serif', fontWeight: 600, marginBottom: 'var(--space-sm)', lineHeight: 1.3 }}>The One AI Habit That Changes Everything</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.65', fontSize: '0.88rem', marginBottom: 'var(--space-md)' }}>If I could only teach one AI habit, it would be Devil's Advocate. Every cohort, unanimous.</p>
              <button className="btn tech" style={{ width: '100%' }}>Read Post</button>
            </div>
          </AnimatedCard>
          {/* Right column: 2 compact horizontal cards stacked */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
            {[
              { title: "You're Already a Cyborg (You Just Don't Know It)", category: "PHILOSOPHY", description: "When did you last memorize a phone number? Your cognition already extends into your devices.", color: "green", time: "6 min" },
              { title: "When Technology Disappears", category: "VISION", description: "Watch a skilled musician. They're not thinking about their instrument. That's transparent equipment.", color: "blue", time: "6 min" },
            ].map((essay, idx) => (
              <AnimatedCard key={idx} className={`card-${essay.color}`} delay={0.12 + idx * 0.06} style={{ padding: 0, overflow: 'hidden', flex: 1 }}>
                <div style={{ display: 'grid', gridTemplateColumns: '140px 1fr', height: '100%' }}>
                  <ImagePlaceholder height={100} label="" style={{ borderRadius: 'var(--radius-xl) 0 0 var(--radius-xl)', border: 'none', height: '100%' }} />
                  <div style={{ padding: 'var(--space-md) var(--space-lg)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)', marginBottom: '4px' }}>
                      <span style={{ fontSize: '0.62rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 700 }}>{essay.category}</span>
                      <span className={`badge ${essay.color}`} style={{ fontSize: '0.58rem' }}>{essay.time}</span>
                    </div>
                    <h3 style={{ fontSize: '0.95rem', fontFamily: 'Playfair Display, serif', fontWeight: 600, marginBottom: '4px', lineHeight: 1.3 }}>{essay.title}</h3>
                    <p style={{ color: 'var(--text-secondary)', lineHeight: '1.5', fontSize: '0.8rem' }}>{essay.description}</p>
                  </div>
                </div>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </div>
      <style>{`
        @media (max-width: 900px) {
          #think-tank-featured .card-featured > div[style*="1.2fr"] { grid-template-columns: 1fr !important; }
          .section-alt-dark .container-wide > div[style*="1fr 1fr"]:not([style*="1.2fr"]) { grid-template-columns: 1fr !important; }
          .section-alt-dark .card-panel > div[style*="140px"] { grid-template-columns: 1fr !important; }
          .section-alt-dark .card-panel > div[style*="140px"] > div:first-child { height: 120px; border-radius: var(--radius-xl) var(--radius-xl) 0 0 !important; }
        }
      `}</style>
    </section>

    {/* MORE POSTS - horizontal list style */}
    <section className="section-layer side-glow-blue" style={{ padding: 'var(--space-3xl) 0', position: 'relative', overflow: 'hidden' }}>
      <div className="floating-accent sm" style={{ top: '10%', right: '5%', borderColor: 'var(--green-dim)' }} />
      <div className="container-wide" style={{ position: 'relative', zIndex: 1 }}>
        <h2 className="section-heading" style={{ marginBottom: 'var(--space-xl)' }}>More Explorations</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
          {[
            { title: "The Discovery Problem", category: "AWARENESS", description: "You can't Google what you don't know to search for. The biggest barrier to AI adoption isn't learning—it's awareness.", color: "green", time: "5 min" },
            { title: "From Pressing Keys to Composing Symphonies", category: "MASTERY", description: "AI is like a musical instrument. Anyone can press a key, but making music takes technique, practice, and a different kind of thinking.", color: "blue", time: "5 min" },
          ].map((essay, idx) => (
            <AnimatedCard key={idx} className={`card-${essay.color}`} delay={idx * 0.08} style={{ padding: 'var(--space-lg)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-xl)' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)', marginBottom: 'var(--space-xs)' }}>
                    <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1.5px', fontWeight: 700 }}>{essay.category}</span>
                    <span className={`badge ${essay.color}`}>{essay.time}</span>
                  </div>
                  <h3 style={{ fontSize: '1.1rem', fontFamily: 'Playfair Display, serif', fontWeight: 600, marginBottom: '4px', lineHeight: 1.3 }}>{essay.title}</h3>
                  <p style={{ color: 'var(--text-secondary)', lineHeight: '1.65', fontSize: '0.88rem' }}>{essay.description}</p>
                </div>
                <button className={`btn ${essay.color === 'green' ? 'primary' : 'tech'}`} style={{ flexShrink: 0, padding: '0.7rem 1.25rem' }}>Read <ArrowRight size={14} className="arrow-icon" /></button>
              </div>
            </AnimatedCard>
          ))}
        </div>
      </div>
    </section>
  </div>
);

const PodcastPage = () => (
  <div>
    {/* HERO - compact with featured episode */}
    <section className="hero-section" style={{ paddingTop: '100px', paddingBottom: 'var(--space-xl)', position: 'relative' }}>
      <div className="hero-orb green"></div>
      <div className="hero-orb blue"></div>
      <div className="hero-lines">
        <svg viewBox="0 0 1200 500" preserveAspectRatio="none">
          <circle cx="200" cy="250" r="180" stroke="var(--border-subtle)" strokeWidth="0.4" fill="none" />
          <circle cx="200" cy="250" r="280" stroke="var(--border-subtle)" strokeWidth="0.3" fill="none" />
          <line x1="380" y1="250" x2="1200" y2="250" stroke="var(--border-subtle)" strokeWidth="0.3" />
        </svg>
      </div>
      <div className="container-wide" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.1fr', gap: 'var(--space-2xl)', alignItems: 'center' }}>
          <div>
            <span className="badge green" style={{ marginBottom: 'var(--space-sm)', display: 'inline-block', animation: 'fadeInUp 0.8s ease backwards' }}>THE CYBORG PERSPECTIVE</span>
            <h1 className="page-title" style={{ animation: 'fadeInUp 0.8s ease 0.1s backwards' }}>The Podcast.</h1>
            <p className="page-subtitle" style={{ marginTop: 'var(--space-md)', marginBottom: 'var(--space-lg)', animation: 'fadeInUp 0.8s ease 0.2s backwards' }}>
              Conversations about working, thinking, and creating in an AI-enhanced world.
            </p>
            <div style={{ display: 'flex', gap: 'var(--space-sm)', flexWrap: 'wrap', animation: 'fadeInUp 0.8s ease 0.3s backwards' }}>
              <button className="btn primary"><Play size={16} /> Latest Episode</button>
              <button className="btn outline">Subscribe</button>
            </div>
            {/* Platform pills */}
            <div style={{ display: 'flex', gap: 'var(--space-sm)', marginTop: 'var(--space-lg)', animation: 'fadeInUp 0.8s ease 0.4s backwards' }}>
              {['Apple', 'Spotify', 'YouTube'].map((p, i) => (
                <span key={i} style={{ fontSize: '0.68rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600, padding: '0.3rem 0.7rem', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-sm)' }}>{p}</span>
              ))}
            </div>
          </div>
          <div style={{ animation: 'fadeInRight 1s ease 0.3s backwards' }}>
            <VideoPlaceholder label="Featured Episode" aspectRatio="16/9" />
          </div>
        </div>
      </div>
      <style>{`
        @media (max-width: 900px) {
          .hero-section .container-wide > div[style*="1fr 1.1fr"] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>

    <div className="accent-stripe" />

    {/* EPISODES - featured + list layout */}
    <section id="podcast-episodes" className="section-alt-dark section-mesh side-glow-green" style={{ padding: 'var(--space-3xl) 0', position: 'relative' }}>
      <div className="section-number">EP</div>
      <div className="floating-accent" style={{ bottom: '5%', right: '3%', borderColor: 'var(--blue-dim)' }} />
      <div className="container-wide" style={{ position: 'relative', zIndex: 1 }}>
        <h2 className="section-heading" style={{ marginBottom: 'var(--space-xl)' }}>Episodes</h2>

        {/* Featured latest episode */}
        <AnimatedCard className="card-featured card-green" delay={0} style={{ padding: 0, overflow: 'hidden', marginBottom: 'var(--space-lg)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', alignItems: 'stretch' }}>
            <div style={{ width: '200px', background: 'linear-gradient(135deg, var(--green-accent), var(--blue-accent))', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 'var(--space-sm)' }}>
              <span style={{ fontSize: '3rem', fontWeight: 900, fontFamily: 'Playfair Display, serif', color: 'white', lineHeight: 1 }}>6</span>
              <span style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.8)', textTransform: 'uppercase', letterSpacing: '2px', fontWeight: 700 }}>Latest</span>
            </div>
            <div style={{ padding: 'var(--space-xl)' }}>
              <span className="badge green" style={{ marginBottom: 'var(--space-sm)', display: 'inline-block' }}>NEW EPISODE</span>
              <h3 style={{ fontSize: '1.3rem', fontFamily: 'Playfair Display, serif', fontWeight: 700, marginBottom: '4px' }}>Damascus Moments: When AI Changes Everything</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem', marginBottom: 'var(--space-sm)' }}>with Story Collection · 35 min</p>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.65', fontSize: '0.92rem', marginBottom: 'var(--space-md)' }}>
                Breakthrough realizations about AI that changed how people work. Real transformation stories from practitioners who hit the inflection point.
              </p>
              <button className="btn primary" style={{ padding: '0.7rem 1.5rem' }}><Play size={14} /> Listen Now</button>
            </div>
          </div>
        </AnimatedCard>

        {/* Episode list: 2-column grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-md)' }}>
          {[
            { ep: 5, title: "AI in Learning & Development", guest: "L&D Expert Interview", description: "How AI is changing corporate learning and what L&D leaders should do differently.", duration: "42 min", color: "blue" },
            { ep: 4, title: "Why Traditional AI Training Doesn't Work", guest: "Justin & Kiyasha", description: "The case for behavior change over training. Habit formation science.", duration: "38 min", color: "green" },
            { ep: 3, title: "The Future of Work Isn't What You Think", guest: "Future of Work Expert", description: "Challenging common AI-work narratives. What's actually changing.", duration: "45 min", color: "blue" },
            { ep: 2, title: "The 7 Habits of Highly Effective Cyborgs", guest: "Justin & Kiyasha", description: "Deep dive into the 7 habits—what they are and how they transform work.", duration: "40 min", color: "green" },
          ].map((episode, idx) => (
            <AnimatedCard key={episode.ep} className={`card-${episode.color}`} delay={(idx + 1) * 0.06} style={{ padding: 'var(--space-lg)', display: 'flex', alignItems: 'flex-start', gap: 'var(--space-md)' }}>
              <div className={`icon-box ${episode.color}`} style={{ minWidth: '48px', height: '48px' }}>
                <span style={{ color: 'white', fontWeight: 700, fontSize: '0.85rem' }}>{episode.ep}</span>
              </div>
              <div style={{ flex: 1 }}>
                <h3 style={{ fontSize: '1rem', fontFamily: 'Playfair Display, serif', fontWeight: 600, marginBottom: '4px', lineHeight: 1.3 }}>{episode.title}</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.78rem', marginBottom: 'var(--space-xs)' }}>{episode.guest} · {episode.duration}</p>
                <p style={{ color: 'var(--text-secondary)', lineHeight: '1.55', fontSize: '0.82rem', marginBottom: 'var(--space-sm)' }}>{episode.description}</p>
                <button className={`btn ${episode.color === 'green' ? 'primary' : 'tech'}`} style={{ padding: '0.45rem 1rem', fontSize: '0.72rem' }}>
                  <Play size={12} /> Listen
                </button>
              </div>
            </AnimatedCard>
          ))}
        </div>

        {/* Pilot episode - standalone */}
        <AnimatedCard className="card-blue" delay={0.35} style={{ padding: 'var(--space-lg)', marginTop: 'var(--space-md)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-lg)' }}>
            <div className="icon-box blue" style={{ minWidth: '48px', height: '48px' }}>
              <span style={{ color: 'white', fontWeight: 700, fontSize: '0.85rem' }}>1</span>
            </div>
            <div style={{ flex: 1 }}>
              <h3 style={{ fontSize: '1rem', fontFamily: 'Playfair Display, serif', fontWeight: 600, marginBottom: '2px' }}>What Does It Mean to Be a Cyborg?</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>Justin & Kiyasha · 48 min · The Extended Mind hypothesis, awareness asymmetry, and transparent equipment.</p>
            </div>
            <button className="btn tech" style={{ padding: '0.5rem 1rem', flexShrink: 0 }}><Play size={12} /> Listen</button>
          </div>
        </AnimatedCard>
      </div>
      <style>{`
        @media (max-width: 900px) {
          #podcast-episodes .card-featured > div[style*="auto 1fr"] { grid-template-columns: 1fr !important; }
          #podcast-episodes .card-featured > div > div:first-child { width: 100% !important; height: 80px; }
          #podcast-episodes .container-wide > div[style*="1fr 1fr"] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>

    {/* QUICK LISTENS - with visual depth */}
    <section className="section-layer side-glow-blue" style={{ padding: 'var(--space-3xl) 0', position: 'relative', overflow: 'hidden' }}>
      <div className="section-number" style={{ left: 'var(--space-xl)', right: 'auto' }}>12</div>
      <div className="floating-accent sm" style={{ top: '8%', right: '8%', borderColor: 'var(--green-dim)' }} />
      <div className="container-wide" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 'var(--space-xl)', flexWrap: 'wrap', gap: 'var(--space-md)' }}>
          <div>
            <h2 className="section-heading" style={{ marginBottom: 'var(--space-sm)' }}>Quick Listens: Cyborg Skills</h2>
            <p style={{ maxWidth: '480px', color: 'var(--text-secondary)', lineHeight: '1.7', fontSize: '0.92rem' }}>
              5-minute audio lessons on specific AI skills. Each one is a cognitive capability you can practice immediately.
            </p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)' }}>
            <Volume2 size={16} color="var(--green-accent)" />
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>Audio enabled</span>
          </div>
        </div>
        <ExperimentTable />
      </div>
    </section>

    {/* SUBSCRIBE CTA - prominent with inner glow */}
    <section className="section-alt-dark" style={{ padding: 'var(--space-3xl) 0', position: 'relative' }}>
      <div className="floating-accent lg" style={{ top: '-30%', left: '50%', transform: 'translateX(-50%)', borderColor: 'var(--blue-dim)' }} />
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <AnimatedCard className="card-featured card-blue" style={{ padding: 'var(--space-2xl)', textAlign: 'center', maxWidth: '700px', margin: '0 auto', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 50% 60% at 50% 0%, var(--blue-glow) 0%, transparent 70%)', pointerEvents: 'none' }} />
          <div style={{ position: 'relative' }}>
            <h3 style={{ fontSize: '1.4rem', marginBottom: 'var(--space-sm)', fontFamily: 'Playfair Display, serif', fontWeight: 700 }}>Subscribe to The Cyborg Perspective</h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--space-lg)', fontSize: '0.92rem' }}>New episodes every two weeks. Quick Listens added weekly.</p>
            <div style={{ display: 'flex', gap: 'var(--space-sm)', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button className="btn tech">Apple Podcasts</button>
              <button className="btn tech">Spotify</button>
              <button className="btn tech">YouTube</button>
              <button className="btn outline">RSS Feed</button>
            </div>
          </div>
        </AnimatedCard>
      </div>
    </section>
  </div>
);

const ContactPage = () => (
  <div>
    {/* HERO - compact split */}
    <section className="hero-section" style={{ paddingTop: '100px', paddingBottom: 'var(--space-xl)', position: 'relative' }}>
      <div className="hero-orb blue"></div>
      <div className="hero-lines">
        <svg viewBox="0 0 1200 400" preserveAspectRatio="none">
          <line x1="600" y1="0" x2="600" y2="400" stroke="var(--border-subtle)" strokeWidth="0.3" />
          <line x1="0" y1="200" x2="1200" y2="200" stroke="var(--border-subtle)" strokeWidth="0.3" />
          <circle cx="600" cy="200" r="160" stroke="var(--border-subtle)" strokeWidth="0.4" fill="none" />
        </svg>
      </div>
      <div className="container-wide" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 0.7fr', gap: 'var(--space-2xl)', alignItems: 'center' }}>
          <div>
            <span className="badge blue" style={{ marginBottom: 'var(--space-sm)', display: 'inline-block', animation: 'fadeInUp 0.8s ease backwards' }}>CONTACT US</span>
            <h1 className="page-title" style={{ animation: 'fadeInUp 0.8s ease 0.1s backwards' }}>Get In Touch.</h1>
            <p className="page-subtitle" style={{ marginTop: 'var(--space-md)', animation: 'fadeInUp 0.8s ease 0.2s backwards' }}>
              Questions, partnerships, or ideas? We're building the cyborg future together.
            </p>
          </div>
          <div style={{ animation: 'fadeInRight 1s ease 0.3s backwards' }}>
            <ImagePlaceholder height={220} label="Team Photo" />
          </div>
        </div>
      </div>
      <style>{`
        @media (max-width: 900px) {
          .hero-section .container-wide > div[style*="1.3fr"] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>

    <div className="accent-stripe" />

    {/* MAIN CONTACT SECTION - sidebar + form */}
    <section id="contact-main" className="section-alt-dark section-mesh side-glow-blue" style={{ padding: 'var(--space-3xl) 0', position: 'relative' }}>
      <div className="floating-accent" style={{ top: '10%', right: '5%', borderColor: 'var(--blue-dim)' }} />
      <div className="floating-accent sm" style={{ bottom: '15%', left: '3%', borderColor: 'var(--green-dim)' }} />
      <div className="container-wide" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: 'var(--space-xl)' }}>
          {/* Left column: contact cards stacked */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
            <AnimatedCard className="card-green" style={{ padding: 'var(--space-lg)' }}>
              <h3 style={{ fontSize: '1.05rem', marginBottom: 'var(--space-md)', fontFamily: 'Playfair Display, serif', fontWeight: 600 }}>Quick Contact</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'var(--green-dim)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Zap size={16} color="var(--green-accent)" />
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--text-muted)' }}>Email</div>
                    <a href="mailto:hello@cyborgskills.com" style={{ color: 'var(--green-accent)', textDecoration: 'none', fontSize: '0.9rem' }}>hello@cyborgskills.com</a>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'var(--blue-dim)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Target size={16} color="var(--blue-accent)" />
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--text-muted)' }}>Support</div>
                    <a href="mailto:help@cyborgskills.com" style={{ color: 'var(--blue-accent)', textDecoration: 'none', fontSize: '0.9rem' }}>help@cyborgskills.com</a>
                  </div>
                </div>
              </div>
            </AnimatedCard>

            <AnimatedCard className="card-blue" delay={0.08} style={{ padding: 'var(--space-lg)' }}>
              <h3 style={{ fontSize: '1.05rem', marginBottom: 'var(--space-sm)', fontFamily: 'Playfair Display, serif', fontWeight: 600 }}>Join the Community</h3>
              <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--space-md)', lineHeight: '1.65', fontSize: '0.88rem' }}>
                Connect with fellow cyborgs building the future of human-AI cognition.
              </p>
              <button className="btn tech" style={{ width: '100%' }}>
                <Users size={16} /> Join Discord
              </button>
            </AnimatedCard>

            {/* StrideShift card */}
            <AnimatedCard className="card-green" delay={0.16} style={{ padding: 'var(--space-lg)', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: '-5px', right: '10px', fontSize: '4rem', fontFamily: 'Playfair Display, serif', fontWeight: 900, opacity: 0.03, lineHeight: 1, color: 'var(--text-white)' }}>SS</div>
              <span className="badge green" style={{ marginBottom: 'var(--space-sm)', display: 'inline-block' }}>PARENT COMPANY</span>
              <h3 style={{ fontSize: '1rem', marginBottom: 'var(--space-sm)', fontFamily: 'Playfair Display, serif', fontWeight: 600 }}>Part of StrideShift Global</h3>
              <p style={{ fontSize: '0.85rem', lineHeight: '1.65', color: 'var(--text-secondary)' }}>
                Helping power users extend their cognitive capabilities in an AI-powered world.
              </p>
            </AnimatedCard>
          </div>

          {/* Right: Contact form */}
          <AnimatedCard className="card-featured card-blue" delay={0.1} style={{ padding: 'var(--space-2xl)', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 50% 40% at 80% 0%, var(--blue-glow) 0%, transparent 70%)', pointerEvents: 'none' }} />
            <div style={{ position: 'relative' }}>
              <h3 style={{ fontSize: '1.25rem', marginBottom: 'var(--space-lg)', fontFamily: 'Playfair Display, serif', fontWeight: 600 }}>Send a Message</h3>
              <form onSubmit={(e) => e.preventDefault()}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-md)', marginBottom: 'var(--space-md)' }}>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label>Name</label>
                    <input type="text" className="form-input" placeholder="Your name" required />
                  </div>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label>Email</label>
                    <input type="email" className="form-input" placeholder="your@email.com" required />
                  </div>
                </div>
                <div className="form-group">
                  <label>I'm a...</label>
                  <select className="form-select">
                    <option>Practitioner / Power User</option>
                    <option>Business Leader</option>
                    <option>Developer / Builder</option>
                    <option>Educator / Researcher</option>
                    <option>Creative Professional</option>
                    <option>Other</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Message</label>
                  <textarea className="form-textarea" placeholder="What's on your mind?" required></textarea>
                </div>
                <button type="submit" className="btn tech" style={{ width: '100%' }}>
                  Send Message <ArrowRight size={18} className="arrow-icon" />
                </button>
              </form>
            </div>
          </AnimatedCard>
        </div>
        <style>{`
          @media (max-width: 768px) {
            #contact-main .container-wide > div[style*="1fr 1.5fr"] { grid-template-columns: 1fr !important; }
            #contact-main form > div[style*="1fr 1fr"] { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </div>
    </section>
  </div>
);

/* === APP === */

function App() {
  const ScrollToTop = () => {
    const { pathname } = useLocation();
    useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
    return null;
  };

  return (
    <Router>
      <style>{styles}</style>
      <ScrollToTop />
      <NavBar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/habits" element={<HabitsPage />} />
        <Route path="/marketplace" element={<MarketplacePage />} />
        <Route path="/think-tank" element={<ThinkTankPage />} />
        <Route path="/podcast" element={<PodcastPage />} />
        <Route path="/about" element={<ContactPage />} />
      </Routes>

      <footer style={{ background: 'var(--bg-surface)', position: 'relative', overflow: 'hidden' }}>
        {/* Gradient top border instead of plain line */}
        <div style={{ height: '2px', background: 'linear-gradient(90deg, transparent, var(--green-accent), var(--blue-accent), transparent)', opacity: 0.5 }} />

        <div className="container-wide" style={{ padding: 'var(--space-3xl) var(--space-xl) var(--space-xl)', position: 'relative', zIndex: 1 }}>
          {/* Top section: 4-column layout */}
          <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr 1.2fr', gap: 'var(--space-2xl)', marginBottom: 'var(--space-2xl)' }}>
            {/* Brand column */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: 'var(--space-md)' }}>
                <CyborgLogo size={28} />
                <span style={{ fontSize: '1.05rem', fontWeight: 700, fontFamily: 'Playfair Display, serif', color: 'var(--text-white)' }}>Cyborg Skills</span>
              </div>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.65', fontSize: '0.85rem', marginBottom: 'var(--space-md)' }}>
                Extending cognitive ability through human-AI integration. Not a course—a cognitive upgrade.
              </p>
              <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Part of StrideShift Global</p>
            </div>
            {/* Explore column */}
            <div>
              <h4 style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '1.5px', fontWeight: 700, marginBottom: 'var(--space-md)', color: 'var(--text-muted)' }}>Explore</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {['/habits', '/marketplace', '/think-tank', '/podcast'].map((path, i) => (
                  <Link key={i} to={path} style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.85rem', transition: 'color 0.3s' }}>{['Cyborg Habits', 'Marketplace', 'Think Tank', 'Podcast'][i]}</Link>
                ))}
              </div>
            </div>
            {/* Connect column */}
            <div>
              <h4 style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '1.5px', fontWeight: 700, marginBottom: 'var(--space-md)', color: 'var(--text-muted)' }}>Connect</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {['Discord', 'Twitter', 'YouTube', 'Contact'].map((label, i) => (
                  <Link key={i} to={i === 3 ? '/about' : '#'} style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.85rem', transition: 'color 0.3s' }}>{label}</Link>
                ))}
              </div>
            </div>
            {/* Newsletter mini column */}
            <div>
              <h4 style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '1.5px', fontWeight: 700, marginBottom: 'var(--space-md)', color: 'var(--text-muted)' }}>Stay Updated</h4>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: 'var(--space-sm)', lineHeight: 1.5 }}>Weekly insights on cyborg cognition.</p>
              <div style={{ display: 'flex', gap: '6px' }}>
                <input type="email" placeholder="your@email.com" className="form-input" style={{ flex: 1, padding: '0.55rem 0.75rem', fontSize: '0.8rem' }} />
                <button className="btn primary" style={{ padding: '0.55rem 0.75rem', fontSize: '0.7rem' }}>Go</button>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div style={{ paddingTop: 'var(--space-lg)', borderTop: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 'var(--space-md)' }}>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>© 2026 Cyborg Skills. All rights reserved.</p>
            <div style={{ display: 'flex', gap: 'var(--space-lg)' }}>
              <a href="#" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.75rem', transition: 'color 0.3s' }}>Privacy</a>
              <a href="#" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.75rem', transition: 'color 0.3s' }}>Terms</a>
            </div>
          </div>
        </div>

        {/* Decorative floating accent behind footer */}
        <div className="floating-accent lg" style={{ bottom: '-40%', right: '-5%', borderColor: 'var(--green-dim)', opacity: 0.15 }} />

        <style>{`
          @media (max-width: 900px) {
            footer .container-wide > div[style*="1.5fr"] { grid-template-columns: 1fr 1fr !important; }
          }
          @media (max-width: 600px) {
            footer .container-wide > div[style*="1.5fr"] { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </footer>
    </Router>
  );
}

import { createRoot } from 'react-dom/client';
const root = createRoot(document.getElementById('root'));
root.render(<App />);
