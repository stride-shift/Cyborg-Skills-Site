import React, { useEffect, useState, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Layers, ShoppingBag, Mic, Cpu, Users, ArrowRight, Play, Gamepad2, Feather, Sparkles, Terminal, X, Menu, BookOpen, Zap, Target, Code, Lightbulb, TrendingUp, CircleDot, Gift, CheckCircle, ChevronRight, Star, Heart, Rocket, Brain, Eye, Image, Video, Camera, Film } from 'lucide-react';

/* 
 * ===========================================
 * CYBORG SKILLS - PREMIUM DESIGN SYSTEM
 * ===========================================
 * 
 * TARGET AUDIENCE: General public - students, professionals, 
 * creatives, parents, retirees - anyone wanting to thrive with AI
 * 
 * TYPOGRAPHY:
 * - Primary: Playfair Display (headings)
 * - Secondary: Lato (body)
 * 
 * COLORS: Green (human/biological) + Blue (AI/technological)
 * ===========================================
 */

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700;900&family=Lato:wght@300;400;500;600;700&display=swap');
  
  :root {
    --bg-white: #ffffff;
    --bg-off-white: #f8fafc;
    --bg-cream: #fdfcfa;
    
    --green-accent: #3d8b40;
    --green-accent-dark: #2e7d32;
    --green-light: rgba(61, 139, 64, 0.08);
    --green-glow: rgba(61, 139, 64, 0.2);
    
    --blue-accent: #2d7dd2;
    --blue-accent-dark: #1565c0;
    --blue-light: rgba(45, 125, 210, 0.08);
    --blue-glow: rgba(45, 125, 210, 0.2);
    
    --text-dark: #1a1a1a;
    --text-primary: #2d3748;
    --text-secondary: #4a5568;
    --text-muted: #718096;
    --text-white: #ffffff;
    
    --border-subtle: rgba(0, 0, 0, 0.04);
    --border-light: rgba(0, 0, 0, 0.06);
    --shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.04);
    --shadow-md: 0 8px 30px rgba(0, 0, 0, 0.07);
    --shadow-lg: 0 16px 50px rgba(0, 0, 0, 0.1);
    --shadow-glow-green: 0 8px 40px rgba(61, 139, 64, 0.15);
    --shadow-glow-blue: 0 8px 40px rgba(45, 125, 210, 0.15);
    
    --space-xs: 0.5rem;
    --space-sm: 0.75rem;
    --space-md: 1rem;
    --space-lg: 1.5rem;
    --space-xl: 2rem;
    --space-2xl: 3rem;
    --space-3xl: 4rem;
    --space-4xl: 6rem;
  }

  * { margin: 0; padding: 0; box-sizing: border-box; }
  
  html {
    scroll-behavior: smooth;
    -webkit-font-smoothing: antialiased;
  }

  body {
    font-family: 'Lato', -apple-system, sans-serif;
    background: var(--bg-white);
    color: var(--text-primary);
    min-height: 100vh;
    overflow-x: hidden;
    line-height: 1.7;
  }

  /* ========================================
     MODERN ANIMATIONS
     ======================================== */
  
  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(40px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @keyframes fadeInDown {
    from { opacity: 0; transform: translateY(-30px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @keyframes fadeInLeft {
    from { opacity: 0; transform: translateX(-40px); }
    to { opacity: 1; transform: translateX(0); }
  }

  @keyframes fadeInRight {
    from { opacity: 0; transform: translateX(40px); }
    to { opacity: 1; transform: translateX(0); }
  }

  @keyframes scaleIn {
    from { opacity: 0; transform: scale(0.9); }
    to { opacity: 1; transform: scale(1); }
  }

  @keyframes slideUp {
    from { transform: translateY(100%); }
    to { transform: translateY(0); }
  }

  @keyframes float {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    25% { transform: translateY(-8px) rotate(1deg); }
    75% { transform: translateY(-4px) rotate(-1deg); }
  }

  @keyframes pulse {
    0%, 100% { transform: scale(1); opacity: 1; }
    50% { transform: scale(1.05); opacity: 0.9; }
  }

  @keyframes glow {
    0%, 100% { box-shadow: 0 0 20px rgba(61, 139, 64, 0.2); }
    50% { box-shadow: 0 0 40px rgba(61, 139, 64, 0.4); }
  }

  @keyframes gradientShift {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }

  @keyframes shimmer {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
  }

  @keyframes bounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
  }

  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }

  @keyframes morphBlob {
    0%, 100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
    25% { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; }
    50% { border-radius: 50% 60% 30% 60% / 30% 60% 70% 40%; }
    75% { border-radius: 60% 40% 60% 30% / 70% 30% 50% 60%; }
  }

  @keyframes typewriter {
    from { width: 0; }
    to { width: 100%; }
  }

  @keyframes blink {
    0%, 50% { opacity: 1; }
    51%, 100% { opacity: 0; }
  }

  @keyframes ripple {
    0% { transform: scale(0); opacity: 1; }
    100% { transform: scale(4); opacity: 0; }
  }

  @keyframes slideInFromBottom {
    0% { transform: translateY(50px); opacity: 0; }
    100% { transform: translateY(0); opacity: 1; }
  }

  /* Intersection Observer Animation Classes */
  .animate-on-scroll {
    opacity: 0;
    transform: translateY(30px);
    transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .animate-on-scroll.visible {
    opacity: 1;
    transform: translateY(0);
  }

  .animate-on-scroll.delay-1 { transition-delay: 0.1s; }
  .animate-on-scroll.delay-2 { transition-delay: 0.2s; }
  .animate-on-scroll.delay-3 { transition-delay: 0.3s; }
  .animate-on-scroll.delay-4 { transition-delay: 0.4s; }

  /* ========================================
     LAYOUT
     ======================================== */
  
  .container {
    max-width: 1140px;
    margin: 0 auto;
    padding: 0 var(--space-xl);
  }

  @media (max-width: 768px) {
    .container { padding: 0 var(--space-lg); }
  }

  @media (max-width: 480px) {
    .container { padding: 0 var(--space-md); }
  }

  /* ========================================
     PREMIUM CARDS WITH HOVER MAGIC
     ======================================== */
  
  .card-panel {
    background: var(--bg-white);
    border: 1px solid var(--border-subtle);
    border-radius: 24px;
    box-shadow: var(--shadow-sm);
    transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
    position: relative;
    overflow: hidden;
  }

  .card-panel::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
    transition: left 0.7s ease;
  }

  .card-panel:hover::before {
    left: 100%;
  }

  .card-panel:hover {
    transform: translateY(-8px) scale(1.01);
    box-shadow: var(--shadow-lg);
  }

  .card-green {
    border-left: 4px solid var(--green-accent);
  }

  .card-green:hover {
    box-shadow: var(--shadow-glow-green);
  }

  .card-blue {
    border-left: 4px solid var(--blue-accent);
  }

  .card-blue:hover {
    box-shadow: var(--shadow-glow-blue);
  }

  /* ========================================
     TYPOGRAPHY
     ======================================== */
  
  h1, h2, h3, h4, h5, h6 {
    font-family: 'Playfair Display', Georgia, serif;
    font-weight: 600;
    letter-spacing: -0.02em;
    color: var(--text-dark);
    line-height: 1.2;
  }

  .page-title {
    font-size: clamp(2.5rem, 6vw, 4rem);
    line-height: 1.1;
    margin-bottom: var(--space-lg);
    color: var(--text-dark);
    font-weight: 700;
    position: relative;
    animation: fadeInUp 1s cubic-bezier(0.16, 1, 0.3, 1);
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
    max-width: 600px;
    line-height: 1.8;
    animation: fadeInUp 1s cubic-bezier(0.16, 1, 0.3, 1) 0.2s backwards;
  }

  .section-heading {
    font-size: clamp(1.75rem, 4vw, 2.5rem);
    color: var(--text-dark);
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
    height: 4px;
    background: linear-gradient(90deg, var(--green-accent), var(--blue-accent));
    border-radius: 2px;
    transition: width 0.5s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .section-heading:hover::after {
    width: 100%;
  }

  /* ========================================
     BUTTONS WITH MAGIC
     ======================================== */
  
  .btn {
    padding: 1rem 2rem;
    border-radius: 12px;
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

  .btn::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 50%;
    transform: translate(-50%, -50%);
    transition: width 0.6s ease, height 0.6s ease;
  }

  .btn:hover::before {
    width: 300px;
    height: 300px;
  }

  .btn:hover {
    transform: translateY(-3px);
  }

  .btn:active {
    transform: translateY(-1px);
  }

  .btn .arrow-icon {
    transition: transform 0.3s ease;
  }

  .btn:hover .arrow-icon {
    transform: translateX(4px);
  }

  .btn.primary {
    background: linear-gradient(135deg, var(--green-accent) 0%, var(--green-accent-dark) 100%);
    color: var(--text-white);
    box-shadow: 0 4px 20px rgba(61, 139, 64, 0.3);
  }

  .btn.primary:hover {
    box-shadow: 0 8px 30px rgba(61, 139, 64, 0.4);
  }

  .btn.tech {
    background: linear-gradient(135deg, var(--blue-accent) 0%, var(--blue-accent-dark) 100%);
    color: var(--text-white);
    box-shadow: 0 4px 20px rgba(45, 125, 210, 0.3);
  }

  .btn.tech:hover {
    box-shadow: 0 8px 30px rgba(45, 125, 210, 0.4);
  }

  .btn.outline {
    background: transparent;
    color: var(--text-primary);
    border: 2px solid var(--border-light);
  }

  .btn.outline:hover {
    border-color: var(--green-accent);
    color: var(--green-accent);
    background: var(--green-light);
  }

  /* ========================================
     NAVIGATION
     ======================================== */
  
  nav {
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 1000;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border-bottom: 1px solid var(--border-subtle);
    transition: all 0.4s ease;
  }

  nav.scrolled {
    box-shadow: var(--shadow-md);
  }

  .nav-link {
    text-decoration: none;
    color: var(--text-secondary);
    font-size: 0.8rem;
    text-transform: uppercase;
    letter-spacing: 1px;
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
    height: 3px;
    background: linear-gradient(90deg, var(--green-accent), var(--blue-accent));
    border-radius: 2px;
    transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .nav-link:hover,
  .nav-link.active {
    color: var(--green-accent);
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
     STAT CARDS
     ======================================== */
  
  .stat-card {
    text-align: center;
    padding: var(--space-2xl) var(--space-lg);
  }

  .stat-number {
    font-size: clamp(2.5rem, 5vw, 3.5rem);
    font-weight: 700;
    display: block;
    margin-bottom: var(--space-xs);
    font-family: 'Playfair Display', serif;
    background: linear-gradient(135deg, var(--green-accent), var(--blue-accent));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .stat-label {
    color: var(--text-muted);
    font-size: 0.8rem;
    text-transform: uppercase;
    letter-spacing: 2px;
    font-weight: 600;
  }

  /* ========================================
     TIMELINE
     ======================================== */
  
  .timeline {
    position: relative;
    padding-left: 40px;
    margin: var(--space-xl) 0;
  }

  .timeline::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 3px;
    background: linear-gradient(180deg, var(--green-accent), var(--blue-accent));
    border-radius: 2px;
  }

  .timeline-item {
    position: relative;
    margin-bottom: var(--space-2xl);
    padding-left: var(--space-xl);
  }

  .timeline-item::before {
    content: '';
    position: absolute;
    left: -46px;
    top: 5px;
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background: var(--green-accent);
    border: 4px solid var(--bg-white);
    box-shadow: 0 0 0 4px var(--green-light), 0 0 20px var(--green-glow);
    transition: all 0.4s ease;
  }

  .timeline-item:hover::before {
    transform: scale(1.3);
    box-shadow: 0 0 0 6px var(--green-light), 0 0 30px var(--green-glow);
  }

  /* ========================================
     FORMS
     ======================================== */
  
  .form-group {
    margin-bottom: var(--space-lg);
  }

  .form-group label {
    display: block;
    margin-bottom: var(--space-sm);
    color: var(--text-primary);
    font-weight: 600;
    font-size: 0.8rem;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .form-input, .form-select, .form-textarea {
    width: 100%;
    padding: 1rem 1.25rem;
    background: var(--bg-white);
    border: 2px solid var(--border-light);
    border-radius: 12px;
    color: var(--text-primary);
    font-family: 'Lato', sans-serif;
    transition: all 0.3s ease;
    font-size: 1rem;
  }

  .form-input:focus, .form-select:focus, .form-textarea:focus {
    outline: none;
    border-color: var(--green-accent);
    box-shadow: 0 0 0 4px var(--green-light), 0 0 20px var(--green-glow);
  }

  .form-textarea {
    resize: vertical;
    min-height: 140px;
  }

  /* ========================================
     QUOTES
     ======================================== */
  
  .quote-block {
    padding: var(--space-2xl);
    margin: var(--space-xl) 0;
    border-left: 4px solid var(--green-accent);
    background: linear-gradient(135deg, var(--bg-off-white), var(--bg-cream));
    font-style: italic;
    font-size: clamp(1.1rem, 2vw, 1.3rem);
    line-height: 1.9;
    color: var(--text-secondary);
    font-family: 'Playfair Display', serif;
    border-radius: 0 20px 20px 0;
    position: relative;
    transition: all 0.5s ease;
  }

  .quote-block:hover {
    transform: translateX(8px);
    box-shadow: var(--shadow-md);
  }

  .quote-block::before {
    content: '"';
    position: absolute;
    top: 10px;
    left: 20px;
    font-size: 5rem;
    color: var(--green-accent);
    opacity: 0.15;
    font-family: 'Playfair Display', serif;
    line-height: 1;
  }

  .quote-author {
    margin-top: var(--space-lg);
    font-style: normal;
    color: var(--green-accent);
    font-weight: 700;
    font-family: 'Lato', sans-serif;
    font-size: 0.85rem;
    text-transform: uppercase;
    letter-spacing: 1.5px;
  }

  /* ========================================
     BADGES
     ======================================== */
  
  .badge {
    display: inline-block;
    padding: 0.4rem 1rem;
    border-radius: 8px;
    font-size: 0.7rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.8px;
    font-family: 'Lato', sans-serif;
    transition: all 0.3s ease;
  }

  .badge.green {
    background: var(--green-light);
    color: var(--green-accent);
  }

  .badge.blue {
    background: var(--blue-light);
    color: var(--blue-accent);
  }

  /* ========================================
     SPECIAL EFFECTS
     ======================================== */
  
  .floating-shapes {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    pointer-events: none;
    z-index: 0;
  }

  .floating-shape {
    position: absolute;
    border-radius: 50%;
    animation: float 6s ease-in-out infinite;
  }

  .floating-shape.green {
    background: var(--green-light);
  }

  .floating-shape.blue {
    background: var(--blue-light);
  }

  .gradient-border {
    position: relative;
    background: var(--bg-white);
    border-radius: 20px;
  }

  .gradient-border::before {
    content: '';
    position: absolute;
    inset: -2px;
    background: linear-gradient(135deg, var(--green-accent), var(--blue-accent));
    border-radius: 22px;
    z-index: -1;
    opacity: 0;
    transition: opacity 0.4s ease;
  }

  .gradient-border:hover::before {
    opacity: 1;
  }

  .icon-box {
    width: 60px;
    height: 60px;
    border-radius: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    position: relative;
    overflow: hidden;
  }

  .icon-box::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(255,255,255,0.3), transparent);
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  .icon-box:hover::after {
    opacity: 1;
  }

  .icon-box.green {
    background: linear-gradient(135deg, var(--green-accent), var(--green-accent-dark));
    box-shadow: 0 8px 25px rgba(61, 139, 64, 0.25);
  }

  .icon-box.green:hover {
    transform: translateY(-4px) rotate(5deg);
    box-shadow: 0 12px 35px rgba(61, 139, 64, 0.35);
  }

  .icon-box.blue {
    background: linear-gradient(135deg, var(--blue-accent), var(--blue-accent-dark));
    box-shadow: 0 8px 25px rgba(45, 125, 210, 0.25);
  }

  .icon-box.blue:hover {
    transform: translateY(-4px) rotate(-5deg);
    box-shadow: 0 12px 35px rgba(45, 125, 210, 0.35);
  }

  /* ========================================
     SECTION STYLES
     ======================================== */
  
  .section-alt {
    background: linear-gradient(180deg, var(--bg-off-white) 0%, var(--bg-white) 100%);
  }

  .hero-section {
    position: relative;
    overflow: hidden;
  }

  .hero-bg-gradient {
    position: absolute;
    top: -50%;
    right: -20%;
    width: 70%;
    height: 150%;
    background: radial-gradient(ellipse, var(--green-light) 0%, transparent 70%);
    z-index: 0;
    animation: morphBlob 15s ease-in-out infinite;
  }

  .hero-bg-gradient-2 {
    position: absolute;
    bottom: -30%;
    left: -10%;
    width: 50%;
    height: 100%;
    background: radial-gradient(ellipse, var(--blue-light) 0%, transparent 70%);
    z-index: 0;
    animation: morphBlob 12s ease-in-out infinite reverse;
  }

  /* ========================================
     RESPONSIVE
     ======================================== */
  
  @media (max-width: 768px) {
    .page-title { font-size: clamp(2rem, 8vw, 2.5rem); }
    .page-subtitle { font-size: 1rem; }
    .section-heading { font-size: clamp(1.5rem, 6vw, 1.75rem); }
    .btn { padding: 0.875rem 1.5rem; font-size: 0.8rem; width: 100%; }
    .quote-block { padding: var(--space-xl); font-size: 1.05rem; }
    .stat-number { font-size: 2.5rem; }
    .hero-bg-gradient, .hero-bg-gradient-2 { display: none; }
  }

  @media (max-width: 480px) {
    .page-title { font-size: 1.875rem; }
    .card-panel { border-radius: 16px; }
  }

  /* ========================================
     SCROLLBAR
     ======================================== */
  
  ::-webkit-scrollbar { width: 10px; }
  ::-webkit-scrollbar-track { background: var(--bg-off-white); }
  ::-webkit-scrollbar-thumb { 
    background: linear-gradient(180deg, var(--green-accent), var(--blue-accent));
    border-radius: 5px;
  }

  ::selection {
    background: var(--green-light);
    color: var(--green-accent-dark);
  }

  /* ========================================
     MEDIA PLACEHOLDERS
     ======================================== */
  
  .media-placeholder {
    background: linear-gradient(135deg, var(--bg-off-white) 0%, var(--bg-cream) 100%);
    border: 2px dashed var(--border-light);
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
    overflow: hidden;
    transition: all 0.4s ease;
  }

  .media-placeholder::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, var(--green-light), var(--blue-light));
    opacity: 0;
    transition: opacity 0.4s ease;
  }

  .media-placeholder:hover::before {
    opacity: 1;
  }

  .media-placeholder:hover {
    border-color: var(--green-accent);
    transform: scale(1.02);
  }

  .media-placeholder-content {
    position: relative;
    z-index: 1;
    text-align: center;
    padding: var(--space-lg);
  }

  .media-placeholder-icon {
    margin-bottom: var(--space-sm);
    opacity: 0.4;
    transition: all 0.4s ease;
  }

  .media-placeholder:hover .media-placeholder-icon {
    opacity: 0.7;
    transform: scale(1.1);
  }

  .media-placeholder-label {
    font-size: 0.75rem;
    color: var(--text-muted);
    text-transform: uppercase;
    letter-spacing: 1.5px;
    font-weight: 600;
  }

  .video-placeholder {
    position: relative;
  }

  .video-placeholder .play-button {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background: linear-gradient(135deg, var(--green-accent), var(--blue-accent));
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    box-shadow: 0 8px 30px rgba(61, 139, 64, 0.3);
  }

  .video-placeholder:hover .play-button {
    transform: scale(1.15);
    box-shadow: 0 12px 40px rgba(61, 139, 64, 0.4);
  }

  .image-grid {
    display: grid;
    gap: var(--space-md);
  }

  .image-grid.cols-2 { grid-template-columns: repeat(2, 1fr); }
  .image-grid.cols-3 { grid-template-columns: repeat(3, 1fr); }

  @media (max-width: 768px) {
    .image-grid.cols-2, .image-grid.cols-3 { grid-template-columns: 1fr; }
  }
`;

/* --- COMPONENTS --- */

const CyborgLogo = ({ size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
    <circle cx="14" cy="20" r="9" stroke="#3d8b40" strokeWidth="2.5" fill="none" opacity="0.9" />
    <circle cx="26" cy="20" r="9" stroke="#2d7dd2" strokeWidth="2.5" fill="none" opacity="0.9" />
    <circle cx="20" cy="20" r="3.5" fill="url(#logoGradient)" />
    <defs>
      <linearGradient id="logoGradient" x1="16" y1="20" x2="24" y2="20">
        <stop offset="0%" stopColor="#3d8b40" />
        <stop offset="100%" stopColor="#2d7dd2" />
      </linearGradient>
    </defs>
  </svg>
);

const NavBar = () => {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const isActive = (path) => location.pathname === path ? 'active' : '';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={scrolled ? 'scrolled' : ''}>
      <div className="container" style={{ padding: 'var(--space-md) var(--space-xl)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <CyborgLogo size={36} />
              <span style={{ fontSize: '1.2rem', fontWeight: 700, fontFamily: 'Playfair Display, serif', color: 'var(--text-dark)' }}>
                Cyborg Skills
              </span>
            </div>
          </Link>

          <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }} className="desktop-nav">
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
          </div>

          <button onClick={() => setMenuOpen(!menuOpen)} className="mobile-menu-btn" style={{ display: 'none', background: 'none', border: 'none', cursor: 'pointer', padding: '8px' }}>
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {menuOpen && (
          <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, background: 'var(--bg-white)', padding: 'var(--space-lg)', boxShadow: 'var(--shadow-lg)', animation: 'fadeInDown 0.3s ease' }}>
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
        @media (max-width: 900px) {
          .desktop-nav { display: none !important; }
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
      { threshold: 0.1 }
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
        transform: visible ? 'translateY(0)' : 'translateY(30px)',
        transition: `all 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`
      }}
    >
      {children}
    </div>
  );
};

const StatCard = ({ number, label, delay = 0 }) => (
  <AnimatedCard className="stat-card" delay={delay}>
    <div className="stat-number">{number}</div>
    <div className="stat-label">{label}</div>
  </AnimatedCard>
);

const Card = ({ title, category, description, icon: Icon, footer, tag, colorScheme = 'green', index = 0 }) => (
  <AnimatedCard className={`card-${colorScheme}`} delay={index * 0.1} style={{ padding: 'var(--space-xl)', display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)', height: '100%' }}>
    {tag && <span className={`badge ${colorScheme}`}>{tag}</span>}
    {Icon && (
      <div className={`icon-box ${colorScheme}`}>
        <Icon size={26} color="white" strokeWidth={2} />
      </div>
    )}
    {category && <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1.5px', fontWeight: 700, marginTop: 'var(--space-xs)' }}>{category}</div>}
    <h3 style={{ fontSize: 'clamp(1.2rem, 2.5vw, 1.4rem)', color: 'var(--text-dark)', fontFamily: 'Playfair Display, serif', fontWeight: 600, lineHeight: 1.3 }}>{title}</h3>
    <p style={{ color: 'var(--text-secondary)', lineHeight: '1.75', flex: 1, fontSize: '0.95rem' }}>{description}</p>
    {footer && <div style={{ marginTop: 'auto', paddingTop: 'var(--space-md)', borderTop: '1px solid var(--border-subtle)' }}>{footer}</div>}
  </AnimatedCard>
);

const TimelineItem = ({ title, description }) => (
  <div className="timeline-item">
    <h4 style={{ fontSize: '1.1rem', color: 'var(--green-accent)', marginBottom: 'var(--space-xs)', fontFamily: 'Playfair Display, serif', fontWeight: 600 }}>{title}</h4>
    <p style={{ color: 'var(--text-secondary)', lineHeight: '1.75', fontSize: '0.95rem' }}>{description}</p>
  </div>
);

const ImagePlaceholder = ({ height = 300, label = "Image", aspectRatio, style = {} }) => (
  <div 
    className="media-placeholder" 
    style={{ 
      height: aspectRatio ? 'auto' : height, 
      aspectRatio: aspectRatio || 'auto',
      ...style 
    }}
  >
    <div className="media-placeholder-content">
      <Image size={48} className="media-placeholder-icon" color="var(--text-muted)" />
      <p className="media-placeholder-label">{label}</p>
    </div>
  </div>
);

const VideoPlaceholder = ({ height = 400, label = "Video", aspectRatio = "16/9", style = {} }) => (
  <div 
    className="media-placeholder video-placeholder" 
    style={{ 
      height: aspectRatio ? 'auto' : height,
      aspectRatio: aspectRatio,
      ...style 
    }}
  >
    <div className="media-placeholder-content">
      <div className="play-button">
        <Play size={32} color="white" fill="white" style={{ marginLeft: '4px' }} />
      </div>
      <p className="media-placeholder-label" style={{ marginTop: 'var(--space-md)' }}>{label}</p>
    </div>
  </div>
);

/* --- PAGES --- */

const HomePage = () => (
  <div>
    {/* HERO */}
    <section className="hero-section" style={{ minHeight: '90vh', display: 'flex', alignItems: 'center', paddingTop: '100px', paddingBottom: 'var(--space-4xl)', position: 'relative' }}>
      <div className="hero-bg-gradient"></div>
      <div className="hero-bg-gradient-2"></div>
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-3xl)', alignItems: 'center' }}>
          <div>
            <span className="badge green" style={{ marginBottom: 'var(--space-md)', display: 'inline-block' }}>CYBORG SKILLS</span>
            <h1 className="page-title">
              Feeling Left Behind<br />
              by AI?
            </h1>
            <p className="page-subtitle" style={{ marginBottom: 'var(--space-xl)' }}>
              Others seem to be doing magic with AI while you're still wondering what you're missing. 
              The gap isn't talent—it's knowing what's possible.
            </p>
            <div style={{ display: 'flex', gap: 'var(--space-md)', flexWrap: 'wrap', animation: 'fadeInUp 1s ease 0.4s backwards' }}>
              <a href="#the-gap" className="btn primary">
                Show Me What I'm Missing <ArrowRight size={18} className="arrow-icon" />
              </a>
              <a href="#sound-familiar" className="btn outline">
                Sound Familiar? <ChevronRight size={18} />
              </a>
            </div>
          </div>
          <div style={{ animation: 'fadeInRight 1s ease 0.3s backwards' }}>
            <VideoPlaceholder label="See What's Possible" aspectRatio="4/3" />
          </div>
        </div>
      </div>
      <style>{`
        @media (max-width: 900px) {
          .hero-section .container > div { grid-template-columns: 1fr !important; }
          .hero-section .container > div > div:last-child { margin-top: var(--space-xl); }
        }
      `}</style>
    </section>

    {/* SOUND FAMILIAR - Pain Points */}
    <section id="sound-familiar" className="section-alt" style={{ padding: 'var(--space-4xl) 0' }}>
      <div className="container">
        <h2 className="section-heading">Sound Familiar?</h2>
        <div className="grid-layout" style={{ gridTemplateColumns: 'repeat(2, 1fr)', maxWidth: '900px' }}>
          {[
            { text: "You've tried the AI tools but the results were... underwhelming.", icon: CircleDot, color: 'green' },
            { text: "Colleagues mention AI tools you've never heard of.", icon: CircleDot, color: 'blue' },
            { text: "You wonder if your role will still exist in 5 years.", icon: CircleDot, color: 'green' },
            { text: "Every AI course feels either too basic or too technical.", icon: CircleDot, color: 'blue' },
            { text: "You see others doing incredible things, but can't replicate it.", icon: CircleDot, color: 'green' },
            { text: "You're not sure where to even start anymore.", icon: CircleDot, color: 'blue' },
          ].map((item, idx) => (
            <AnimatedCard key={idx} className={`card-${item.color}`} delay={idx * 0.08} style={{ padding: 'var(--space-lg)', display: 'flex', alignItems: 'center', gap: 'var(--space-md)' }}>
              <item.icon size={20} color={item.color === 'green' ? 'var(--green-accent)' : 'var(--blue-accent)'} />
              <span style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>{item.text}</span>
            </AnimatedCard>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: 'var(--space-2xl)' }}>
          <p style={{ fontSize: '1.2rem', color: 'var(--text-dark)', fontWeight: 500, marginBottom: 'var(--space-md)' }}>
            You're not behind because you're slow. You're behind because no one showed you <em>what's actually possible</em>.
          </p>
        </div>
        <style>{`
          @media (max-width: 768px) {
            .grid-layout[style*="repeat(2, 1fr)"] { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </div>
    </section>

    {/* THE GAP - Awareness Asymmetry */}
    <section id="the-gap" style={{ padding: 'var(--space-4xl) 0' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-3xl)', alignItems: 'center' }}>
          <div>
            <h2 className="section-heading">The Awareness Gap</h2>
            <p style={{ fontSize: '1.15rem', color: 'var(--text-secondary)', lineHeight: '1.9', marginBottom: 'var(--space-lg)' }}>
              Two professionals. Same job. Same tools available. One is 10x more productive with AI. The other is still copying and pasting basic questions.
            </p>
            <p style={{ fontSize: '1.15rem', color: 'var(--text-secondary)', lineHeight: '1.9', marginBottom: 'var(--space-lg)' }}>
              <strong style={{ color: 'var(--text-dark)' }}>The difference isn't intelligence.</strong> It's not work ethic. It's simply knowing what's possible—and having the right approach.
            </p>
            <p style={{ fontSize: '1.15rem', color: 'var(--text-secondary)', lineHeight: '1.9' }}>
              Most people can't Google what they don't know exists. If you don't know AI can turn a meeting into a project plan, analyze 100 customer reviews in seconds, or generate a custom interface for your data—you'll never think to ask.
            </p>
          </div>
          <div>
            <VideoPlaceholder label="Watch: The Awareness Gap Explained" aspectRatio="16/9" style={{ marginBottom: 'var(--space-lg)' }} />
            <AnimatedCard className="card-green" style={{ padding: 'var(--space-lg)' }}>
              <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: 1.7, fontStyle: 'italic' }}>
                "That is a capability that has never existed in the history of humanity. And most people don't even know to ask for it."
              </p>
            </AnimatedCard>
          </div>
        </div>
        <style>{`
          @media (max-width: 768px) {
            .container > div[style*="grid-template-columns: 1fr 1fr"] {
              grid-template-columns: 1fr !important;
            }
          }
        `}</style>
      </div>
    </section>

    {/* FREE VALUE */}
    <section id="free-resource" className="section-alt" style={{ padding: 'var(--space-4xl) 0' }}>
      <div className="container">
        <AnimatedCard className="card-green" style={{ padding: 'var(--space-2xl)', maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 'var(--space-2xl)', alignItems: 'center' }}>
            <div>
              <span className="badge green" style={{ marginBottom: 'var(--space-md)', display: 'inline-block' }}>100% FREE</span>
              <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', marginBottom: 'var(--space-md)', fontFamily: 'Playfair Display, serif', color: 'var(--text-dark)', fontWeight: 600 }}>
                Start With Our Free 7 Habits Cheatsheet
              </h2>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.75', marginBottom: 'var(--space-lg)' }}>
                A simple, printable guide to the 7 mental habits that transform how you interact with AI. 
                No fluff, just practical tips you can use today.
              </p>
              <ul style={{ listStyle: 'none', padding: 0, marginBottom: 'var(--space-lg)' }}>
                {['Explain It', 'Plan It', 'Guide It', 'Imagine It', 'Suggest It', 'Improve It', 'Critique It'].map((habit, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px', color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                    <CheckCircle size={16} color="var(--green-accent)" />
                    <span>{habit}</span>
                  </li>
                ))}
              </ul>
              <div style={{ display: 'flex', gap: 'var(--space-sm)', flexWrap: 'wrap' }}>
                <input type="email" placeholder="Your email" className="form-input" style={{ maxWidth: '250px', flex: 1 }} />
                <button className="btn primary">Get Free Guide <Gift size={16} /></button>
              </div>
            </div>
            <ImagePlaceholder height={320} label="Cheatsheet Preview" />
          </div>
        </AnimatedCard>
        <style>{`
          @media (max-width: 768px) {
            #free-resource .card-panel > div { grid-template-columns: 1fr !important; }
            #free-resource .card-panel > div > div:last-child { display: none !important; }
          }
        `}</style>
      </div>
    </section>

    {/* STATS */}
    <section style={{ padding: 'var(--space-3xl) 0' }}>
      <div className="container">
        <div className="grid-layout" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))' }}>
          <StatCard number="2,500+" label="People Trained" delay={0} />
          <StatCard number="15" label="Days to Transform" delay={0.1} />
          <StatCard number="7" label="Core Habits" delay={0.2} />
          <StatCard number="97%" label="Would Recommend" delay={0.3} />
        </div>
      </div>
    </section>

    {/* QUOTE */}
    <section className="section-alt" style={{ padding: 'var(--space-3xl) 0' }}>
      <div className="container">
        <div style={{ display: 'flex', gap: 'var(--space-2xl)', alignItems: 'center', maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ minWidth: '120px', width: '120px', height: '120px', borderRadius: '50%', overflow: 'hidden', flexShrink: 0, border: '4px solid var(--green-accent)', boxShadow: 'var(--shadow-glow-green)' }}>
            <ImagePlaceholder height={120} label="" style={{ borderRadius: '0', border: 'none', height: '100%' }} />
          </div>
          <div className="quote-block" style={{ margin: 0, flex: 1 }}>
            "Devil's Advocate is the best thing I ever learned about AI. In every cohort closeout ceremony, students consistently say it was the thing that blew their mind the most."
            <div className="quote-author">— Scott, Cyborg Habits Graduate</div>
          </div>
        </div>
        <style>{`
          @media (max-width: 768px) {
            .section-alt > .container > div[style*="display: flex"] { flex-direction: column !important; text-align: center; }
            .section-alt > .container > div > div:first-child { margin: 0 auto var(--space-lg) !important; }
          }
        `}</style>
      </div>
    </section>

    {/* ECOSYSTEM */}
    <section style={{ padding: 'var(--space-4xl) 0' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: 'var(--space-3xl)', alignItems: 'start' }}>
          <div style={{ position: 'sticky', top: '120px' }}>
            <h2 className="section-heading">Everything You Need to Master AI</h2>
            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: 'var(--space-xl)' }}>
              Not just a course—a complete ecosystem of tools, resources, and community.
            </p>
            <VideoPlaceholder label="Platform Tour" aspectRatio="16/9" />
          </div>
          <div className="grid-layout" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
            {[
              { title: "Cyborg Habits", desc: "Our flagship 15-day program. Daily lessons, hands-on exercises, and a supportive community.", tag: "Most Popular", price: "$199", color: "green", label: "Course Preview" },
              { title: "The Marketplace", desc: "Physical habit cards, digital tools, browser games to practice. Fun ways to reinforce what you learn.", tag: "Tools & Games", price: "From $19", color: "blue", label: "Products" },
              { title: "Think Tank", desc: "Weekly essays exploring the big questions: How will AI change work? Education? Creativity?", tag: "Free to Read", price: "Free", color: "green", label: "Essays" },
              { title: "Podcast", desc: "Interviews with everyday people doing extraordinary things with AI. Real stories, practical insights.", tag: "Listen Free", price: "Free", color: "blue", label: "Episodes" }
            ].map((item, idx) => (
              <AnimatedCard key={idx} className={`card-${item.color}`} delay={idx * 0.1} style={{ padding: 0, overflow: 'hidden' }}>
                <ImagePlaceholder height={140} label={item.label} style={{ borderRadius: '24px 24px 0 0', border: 'none' }} />
                <div style={{ padding: 'var(--space-lg)' }}>
                  <span className={`badge ${item.color}`}>{item.tag}</span>
                  <h3 style={{ fontSize: '1.2rem', color: 'var(--text-dark)', fontFamily: 'Playfair Display, serif', fontWeight: 600, margin: 'var(--space-sm) 0 var(--space-xs)' }}>{item.title}</h3>
                  <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7', fontSize: '0.9rem', marginBottom: 'var(--space-sm)' }}>{item.desc}</p>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: 600 }}>{item.price}</span>
                </div>
              </AnimatedCard>
            ))}
          </div>
        </div>
        <style>{`
          @media (max-width: 900px) {
            section > .container > div[style*="grid-template-columns: 1fr 1.5fr"] { grid-template-columns: 1fr !important; }
            section > .container > div > div:first-child { position: static !important; margin-bottom: var(--space-xl); }
            .grid-layout[style*="repeat(2, 1fr)"] { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </div>
    </section>

    {/* CTA */}
    <section className="section-alt" style={{ padding: 'var(--space-4xl) 0' }}>
      <div className="container" style={{ textAlign: 'center' }}>
        <h2 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', marginBottom: 'var(--space-md)', fontFamily: 'Playfair Display, serif', fontWeight: 600 }}>
          Ready to Become AI-Fluent?
        </h2>
        <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', marginBottom: 'var(--space-xl)', maxWidth: '520px', margin: '0 auto var(--space-xl)', lineHeight: 1.8 }}>
          Join thousands of people from all walks of life who've transformed how they work and think with AI.
        </p>
        <div style={{ display: 'flex', gap: 'var(--space-md)', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/habits" className="btn primary">
            Start 15-Day Challenge <ArrowRight size={18} className="arrow-icon" />
          </Link>
          <a href="#free-resource" className="btn outline">
            Get Free Cheatsheet First
          </a>
        </div>
      </div>
    </section>
  </div>
);

const HabitsPage = () => (
  <div>
    <section style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', paddingTop: '100px' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-3xl)', alignItems: 'center' }}>
          <div>
            <span className="badge green" style={{ marginBottom: 'var(--space-md)', display: 'inline-block' }}>15-DAY TRANSFORMATION</span>
            <h1 className="page-title">Cyborg Habits.</h1>
            <p className="page-subtitle" style={{ marginTop: 'var(--space-lg)', marginBottom: 'var(--space-xl)' }}>
              15 days. 7 habits. One transformation. Whether you're 18 or 80, tech-savvy or tech-shy—this program meets you where you are.
            </p>
            <Link to="#enroll" className="btn primary">
              See the Program <ArrowRight size={18} className="arrow-icon" />
            </Link>
          </div>
          <div>
            <VideoPlaceholder label="Program Overview Video" aspectRatio="16/9" />
          </div>
        </div>
      </div>
      <style>{`
        @media (max-width: 900px) {
          section > .container > div[style*="grid-template-columns: 1fr 1fr"] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>

    <section style={{ padding: 'var(--space-3xl) 0' }}>
      <div className="container">
        <h2 className="section-heading">The Seven Habits</h2>
        <div className="grid-layout">
          {[
            { habit: 'Explain It', description: 'Learn to break down complex ideas with AI. Great for understanding anything—from tax forms to quantum physics.', icon: Lightbulb, color: 'green' },
            { habit: 'Plan It', description: 'Turn vague goals into step-by-step plans. Perfect for projects, travel, events, or career moves.', icon: Target, color: 'blue' },
            { habit: 'Guide It', description: 'Master the art of giving AI better instructions. The difference between meh and amazing results.', icon: TrendingUp, color: 'green' },
            { habit: 'Imagine It', description: 'Brainstorm creative ideas you\'d never think of alone. For artists, writers, problem-solvers.', icon: Sparkles, color: 'blue' },
            { habit: 'Suggest It', description: 'Generate dozens of options instantly. Never settle for your first idea again.', icon: Zap, color: 'green' },
            { habit: 'Improve It', description: 'Take anything you\'ve written and make it better. Emails, essays, stories, code.', icon: TrendingUp, color: 'blue' },
            { habit: 'Critique It', description: 'Get honest feedback before sharing with the world. Your personal editor, always available.', icon: Eye, color: 'green' }
          ].map((item, idx) => (
            <Card key={idx} index={idx} title={item.habit} description={item.description} icon={item.icon} colorScheme={item.color} tag={`Habit ${idx + 1}`} />
          ))}
        </div>
      </div>
    </section>

    <section className="section-alt" style={{ padding: 'var(--space-4xl) 0' }}>
      <div className="container">
        <h2 className="section-heading">How It Works</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 'var(--space-2xl)', alignItems: 'start', maxWidth: '1000px', margin: '0 auto' }}>
          <div style={{ position: 'sticky', top: '120px' }}>
            <ImagePlaceholder height={280} label="Day-by-Day Preview" style={{ marginBottom: 'var(--space-lg)' }} />
            <VideoPlaceholder label="Student Success Stories" aspectRatio="16/9" />
          </div>
          <AnimatedCard className="card-blue" style={{ padding: 'var(--space-2xl)' }}>
            <div className="timeline">
              <TimelineItem title="Days 1-5: Build Your Foundation" description="Start with the basics. Learn to have real conversations with AI, not just ask questions. By day 5, you'll wonder how you ever worked without it." />
              <TimelineItem title="Days 6-10: Level Up Your Skills" description="Now we get creative. Learn to brainstorm, plan complex projects, and turn rough ideas into polished work—all with AI as your partner." />
              <TimelineItem title="Days 11-15: Make It Your Own" description="Develop your personal AI workflow. By the end, using AI will feel as natural as using a search engine. It's just part of how you think." />
            </div>
          </AnimatedCard>
        </div>
        <style>{`
          @media (max-width: 900px) {
            .section-alt > .container > div[style*="grid-template-columns: 1fr 1.2fr"] { grid-template-columns: 1fr !important; }
            .section-alt > .container > div > div:first-child { position: static !important; }
          }
        `}</style>
      </div>
    </section>

    <section style={{ padding: 'var(--space-4xl) 0' }}>
      <div className="container">
        <div className="quote-block" style={{ maxWidth: '700px', margin: '0 auto var(--space-2xl)' }}>
          "Through the program I learned how to do a lot of stuff on my own with the help of AI. As someone with no background in coding at all, I learned how to design a website using AI tools."
          <div className="quote-author">— Masud Mohammed, Program Graduate</div>
        </div>

        <AnimatedCard className="card-green" style={{ padding: 'var(--space-2xl)', textAlign: 'center', maxWidth: '500px', margin: '0 auto' }}>
          <h3 style={{ fontSize: '1.6rem', marginBottom: 'var(--space-sm)', fontFamily: 'Playfair Display, serif', fontWeight: 600 }}>Join the Next Cohort</h3>
          <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--space-lg)', lineHeight: 1.75 }}>
            Live sessions, community support, and lifetime access to all materials. Or go self-paced—your choice.
          </p>
          <div style={{ fontSize: '2.25rem', fontWeight: 700, color: 'var(--green-accent)', marginBottom: 'var(--space-lg)', fontFamily: 'Playfair Display, serif' }}>$199</div>
          <button className="btn primary" style={{ width: '100%' }}>
            Enroll Now <ArrowRight size={18} className="arrow-icon" />
          </button>
          <p style={{ marginTop: 'var(--space-md)', fontSize: '0.85rem', color: 'var(--text-muted)' }}>30-day money-back guarantee. No questions asked.</p>
        </AnimatedCard>
      </div>
    </section>
  </div>
);

const MarketplacePage = () => (
  <div>
    <section style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', paddingTop: '100px' }}>
      <div className="container">
        <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto', marginBottom: 'var(--space-3xl)' }}>
          <span className="badge blue" style={{ marginBottom: 'var(--space-md)', display: 'inline-block' }}>THE MARKETPLACE</span>
          <h1 className="page-title" style={{ marginBottom: 'var(--space-lg)' }}>Tools & Resources.</h1>
          <p className="page-subtitle" style={{ margin: '0 auto' }}>
            Physical cards, digital tools, video courses, and fun games to practice your AI skills. Learn by doing.
          </p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 'var(--space-lg)' }}>
          {[
            { label: "Card Deck", icon: Layers, desc: "Physical prompts", color: "green" },
            { label: "Book", icon: BookOpen, desc: "84-page guide", color: "blue" },
            { label: "Video Skills", icon: Play, desc: "52 weekly lessons", color: "green" },
            { label: "Games", icon: Gamepad2, desc: "Practice & compete", color: "blue" }
          ].map((item, idx) => (
            <AnimatedCard key={idx} delay={idx * 0.1} style={{ padding: 'var(--space-xl)', textAlign: 'center' }}>
              <div className={`icon-box ${item.color}`} style={{ margin: '0 auto var(--space-md)', width: '70px', height: '70px' }}>
                <item.icon size={32} color="white" />
              </div>
              <h3 style={{ fontSize: '1.1rem', fontFamily: 'Playfair Display, serif', fontWeight: 600, marginBottom: '4px' }}>{item.label}</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{item.desc}</p>
            </AnimatedCard>
          ))}
        </div>
      </div>
      <style>{`
        @media (max-width: 900px) {
          section > .container > div[style*="grid-template-columns: repeat(4, 1fr)"] { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 480px) {
          section > .container > div[style*="grid-template-columns: repeat(4, 1fr)"] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>

    <section style={{ padding: 'var(--space-3xl) 0' }}>
      <div className="container">
        <AnimatedCard className="card-blue" style={{ padding: 'var(--space-2xl)', marginBottom: 'var(--space-3xl)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 'var(--space-2xl)', alignItems: 'center' }}>
            <div>
              <span className="badge blue">COMING SOON</span>
              <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', margin: 'var(--space-md) 0', fontFamily: 'Playfair Display, serif', fontWeight: 600 }}>The Cyborg Simulator</h2>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.75', marginBottom: 'var(--space-lg)' }}>
                A fun, browser-based game where you practice AI conversations in real-world scenarios. 
                Safe space to experiment. Compete with friends. Level up your skills.
              </p>
              <div style={{ display: 'flex', gap: 'var(--space-sm)', flexWrap: 'wrap' }}>
                <button className="btn tech"><Play size={16} /> Join Waitlist</button>
                <button className="btn outline"><Gamepad2 size={16} /> Learn More</button>
              </div>
            </div>
            <VideoPlaceholder height={280} label="Game Preview" aspectRatio="4/3" />
          </div>
        </AnimatedCard>
        <style>{`
          @media (max-width: 768px) {
            .card-panel > div[style*="grid-template-columns: 1.2fr 1fr"] { grid-template-columns: 1fr !important; }
            .card-panel > div > div:last-child[style*="height: 280px"] { display: none !important; }
          }
        `}</style>

        {/* 52 Skills Video Series */}
        <AnimatedCard className="card-green" style={{ padding: 'var(--space-2xl)', marginBottom: 'var(--space-3xl)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 'var(--space-2xl)', alignItems: 'center' }}>
            <VideoPlaceholder height={280} label="Skills Series Preview" aspectRatio="16/9" />
            <div>
              <span className="badge green">52 WEEKLY SKILLS</span>
              <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', margin: 'var(--space-md) 0', fontFamily: 'Playfair Display, serif', fontWeight: 600 }}>The Cyborg Skills Catalog</h2>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.75', marginBottom: 'var(--space-md)' }}>
                52 video lessons. One new skill every week. From Meeting to Summary to Vibe Engineering—master the complete toolkit of human-AI collaboration.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 'var(--space-sm)', marginBottom: 'var(--space-lg)' }}>
                {['Content Transformation', 'UI Generation', 'Research & Analysis', 'Communication', 'Planning & Strategy', 'Creative & Design'].map((cat, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                    <CheckCircle size={16} color="var(--green-accent)" />
                    <span>{cat}</span>
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', gap: 'var(--space-sm)', flexWrap: 'wrap', alignItems: 'center' }}>
                <button className="btn primary"><Play size={16} /> Watch Sample</button>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>$15/month or $149/year</span>
              </div>
            </div>
          </div>
        </AnimatedCard>
        <style>{`
          @media (max-width: 768px) {
            .card-green > div[style*="grid-template-columns: 1fr 1.2fr"] { grid-template-columns: 1fr !important; }
          }
        `}</style>

        <h2 className="section-heading">Shop</h2>
        <div className="grid-layout">
          {[
            { title: "The 7 Habits Card Deck", category: "PHYSICAL", description: "52 beautifully designed cards with prompts for each habit. Keep on your desk, shuffle when stuck.", price: "$29", color: "green", btn: "Pre-Order", label: "Card Deck Photo" },
            { title: "The Extended Mind Book", category: "BOOK", description: "84 pages of insights, stories, and exercises. Coffee-table worthy. Filled with illustrations.", price: "$45", color: "blue", btn: "Order Now", label: "Book Cover" },
            { title: "Prompt Starter Pack", category: "DIGITAL", description: "100+ ready-to-use prompts for everyday situations: emails, planning, learning, creativity.", price: "$19", color: "green", btn: "Download", label: "Digital Preview" },
            { title: "First 12 Skills Bundle", category: "VIDEO", description: "The MVP launch skills: Meeting to Summary, Deep Dive Research, Vibe Engineering, and 9 more.", price: "$79", color: "blue", btn: "Get Access", label: "Video Bundle" }
          ].map((product, idx) => (
            <AnimatedCard key={idx} className={`card-${product.color}`} delay={idx * 0.1} style={{ padding: 0, overflow: 'hidden' }}>
              <ImagePlaceholder height={180} label={product.label} style={{ borderRadius: '24px 24px 0 0', border: 'none' }} />
              <div style={{ padding: 'var(--space-lg)' }}>
                <span className={`badge ${product.color}`}>{product.price}</span>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1.5px', fontWeight: 700, marginTop: 'var(--space-sm)' }}>{product.category}</div>
                <h3 style={{ fontSize: '1.2rem', color: 'var(--text-dark)', fontFamily: 'Playfair Display, serif', fontWeight: 600, margin: 'var(--space-xs) 0' }}>{product.title}</h3>
                <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7', fontSize: '0.9rem', marginBottom: 'var(--space-md)' }}>{product.description}</p>
                <button className={`btn ${product.color === 'green' ? 'primary' : 'tech'}`} style={{ width: '100%' }}>{product.btn}</button>
              </div>
            </AnimatedCard>
          ))}
        </div>
      </div>
    </section>

    <section className="section-alt" style={{ padding: 'var(--space-4xl) 0' }}>
      <div className="container">
        <AnimatedCard className="card-green" style={{ padding: 'var(--space-2xl)', maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
          <h3 style={{ fontSize: '1.6rem', marginBottom: 'var(--space-sm)', fontFamily: 'Playfair Display, serif', fontWeight: 600 }}>Complete Bundle</h3>
          <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--space-lg)', lineHeight: 1.75 }}>
            Cyborg Habits course + Card Deck + Book + Prompt Pack + 1 Year Skills Subscription
          </p>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 'var(--space-lg)', marginBottom: 'var(--space-lg)' }}>
            <span style={{ fontSize: '1.1rem', color: 'var(--text-muted)', textDecoration: 'line-through' }}>$425</span>
            <span style={{ fontSize: '2.25rem', fontWeight: 700, color: 'var(--green-accent)', fontFamily: 'Playfair Display, serif' }}>$299</span>
          </div>
          <button className="btn primary">Get Everything <ArrowRight size={18} className="arrow-icon" /></button>
        </AnimatedCard>
      </div>
    </section>
  </div>
);

const ThinkTankPage = () => (
  <div>
    <section style={{ minHeight: '50vh', display: 'flex', alignItems: 'center', paddingTop: '100px' }}>
      <div className="container">
        <span className="badge green" style={{ marginBottom: 'var(--space-md)', display: 'inline-block' }}>THE THINK TANK</span>
        <h1 className="page-title">Blogs & Thought Leadership.</h1>
        <p className="page-subtitle" style={{ marginTop: 'var(--space-lg)' }}>
          Weekly insights exploring the big questions about AI and humanity. Thoughtful, accessible, and always practical.
        </p>
      </div>
    </section>

    <section style={{ padding: 'var(--space-3xl) 0' }}>
      <div className="container">
        <AnimatedCard className="card-green" style={{ padding: 0, marginBottom: 'var(--space-3xl)', overflow: 'hidden' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.3fr', gap: 0 }}>
            <ImagePlaceholder height={380} label="Featured Article Image" style={{ borderRadius: '24px 0 0 24px', border: 'none', height: '100%' }} />
            <div style={{ padding: 'var(--space-2xl)' }}>
              <span className="badge green">FEATURED</span>
              <h2 style={{ fontSize: 'clamp(1.4rem, 3vw, 1.8rem)', margin: 'var(--space-md) 0 var(--space-sm)', fontFamily: 'Playfair Display, serif', fontWeight: 600, lineHeight: 1.3 }}>
                The New Competitive Advantage Isn't What You Know
              </h2>
              <div style={{ color: 'var(--text-muted)', marginBottom: 'var(--space-lg)', fontSize: '0.85rem' }}>
                January 2026 • 6 min read
              </div>
              <p style={{ fontSize: '1.05rem', lineHeight: '1.85', color: 'var(--text-secondary)', marginBottom: 'var(--space-lg)' }}>
                We don't have knowledge asymmetry anymore. Everyone with a phone can access the same information. 
                The new edge comes from <strong>awareness asymmetry</strong>—knowing what's possible with AI that others don't even think to ask for.
              </p>
              <button className="btn primary">Read Full Essay <ArrowRight size={18} className="arrow-icon" /></button>
            </div>
          </div>
        </AnimatedCard>
        <style>{`
          @media (max-width: 768px) {
            .card-green > div[style*="grid-template-columns: 1fr 1.3fr"] { grid-template-columns: 1fr !important; }
            .card-green > div > div:first-child { border-radius: 24px 24px 0 0 !important; height: 200px !important; }
          }
        `}</style>

        <h2 className="section-heading">Latest Posts</h2>
        <div className="grid-layout">
          {[
            { title: "Why AI Training Fails (And What to Do Instead)", category: "BEHAVIOR CHANGE", description: "Most AI training is a waste of time. Not because the content is bad, but because training solves the wrong problem. The gap isn't knowledge—it's habits.", color: "green", time: "6 min" },
            { title: "The One AI Habit That Changes Everything", category: "CRITIQUE IT", description: "If I could only teach one AI habit, it would be Devil's Advocate. Every cohort, unanimous: this is the one that blows minds and transforms thinking.", color: "blue", time: "6 min" },
            { title: "You're Already a Cyborg (You Just Don't Know It)", category: "PHILOSOPHY", description: "When did you last memorize a phone number? Your cognition already extends into your devices. The question isn't whether you're a cyborg—it's whether you're an effective one.", color: "green", time: "6 min" },
            { title: "When Technology Disappears: The Transparent Equipment Goal", category: "VISION", description: "Watch a skilled musician perform. They're not thinking about their instrument. That's 'transparent equipment'—and it's the goal for AI.", color: "blue", time: "6 min" },
            { title: "The Discovery Problem", category: "AWARENESS", description: "You can't Google what you don't know to search for. If you don't know AI can turn a meeting into a project plan, you'll never ask for it.", color: "green", time: "5 min" },
            { title: "From Pressing Keys to Composing Symphonies", category: "MASTERY", description: "AI is like a musical instrument. Anyone can press a key, but making beautiful music takes practice and technique. We teach you the techniques.", color: "blue", time: "5 min" }
          ].map((essay, idx) => (
            <AnimatedCard key={idx} className={`card-${essay.color}`} delay={idx * 0.1} style={{ padding: 0, overflow: 'hidden' }}>
              <ImagePlaceholder height={160} label="Article Image" style={{ borderRadius: '24px 24px 0 0', border: 'none' }} />
              <div style={{ padding: 'var(--space-lg)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-sm)' }}>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1.5px', fontWeight: 700 }}>{essay.category}</span>
                  <span className={`badge ${essay.color}`}>{essay.time}</span>
                </div>
                <h3 style={{ fontSize: '1.1rem', color: 'var(--text-dark)', fontFamily: 'Playfair Display, serif', fontWeight: 600, marginBottom: 'var(--space-sm)', lineHeight: 1.3 }}>{essay.title}</h3>
                <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7', fontSize: '0.9rem', marginBottom: 'var(--space-md)' }}>{essay.description}</p>
                <button className={`btn ${essay.color === 'green' ? 'primary' : 'tech'}`} style={{ width: '100%' }}>Read Post</button>
              </div>
            </AnimatedCard>
          ))}
        </div>
      </div>
    </section>

    <section className="section-alt" style={{ padding: 'var(--space-4xl) 0' }}>
      <div className="container">
        <AnimatedCard className="card-blue" style={{ padding: 'var(--space-2xl)', maxWidth: '550px', margin: '0 auto', textAlign: 'center' }}>
          <h3 style={{ fontSize: '1.4rem', marginBottom: 'var(--space-sm)', fontFamily: 'Playfair Display, serif', fontWeight: 600 }}>Get Essays In Your Inbox</h3>
          <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--space-lg)' }}>
            Weekly insights. No spam. Unsubscribe anytime.
          </p>
          <div style={{ display: 'flex', gap: 'var(--space-sm)', flexWrap: 'wrap' }}>
            <input type="email" placeholder="your@email.com" className="form-input" style={{ flex: 1, minWidth: '200px' }} />
            <button className="btn tech">Subscribe</button>
          </div>
        </AnimatedCard>
      </div>
    </section>
  </div>
);

const PodcastPage = () => (
  <div>
    <section style={{ minHeight: '50vh', display: 'flex', alignItems: 'center', paddingTop: '100px' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-3xl)', alignItems: 'center' }}>
          <div>
            <span className="badge green" style={{ marginBottom: 'var(--space-md)', display: 'inline-block' }}>THE CYBORG PERSPECTIVE</span>
            <h1 className="page-title">The Podcast.</h1>
            <p className="page-subtitle" style={{ marginTop: 'var(--space-lg)', marginBottom: 'var(--space-xl)' }}>
              Conversations about working, thinking, and creating in an AI-enhanced world. 
              Expert interviews, practical insights, and the future of human-AI collaboration.
            </p>
            <div style={{ display: 'flex', gap: 'var(--space-sm)', flexWrap: 'wrap' }}>
              <button className="btn primary"><Play size={16} /> Latest Episode</button>
              <button className="btn outline">Subscribe</button>
            </div>
          </div>
          <div>
            <VideoPlaceholder label="Featured Episode Video" aspectRatio="16/9" />
          </div>
        </div>
      </div>
      <style>{`
        @media (max-width: 900px) {
          section > .container > div[style*="grid-template-columns: 1fr 1fr"] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>

    <section style={{ padding: 'var(--space-3xl) 0' }}>
      <div className="container">
        <h2 className="section-heading">Episodes</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-lg)' }}>
          {[
            { ep: 6, title: "Damascus Moments: When AI Changes Everything", guest: "Story Collection", description: "A collection of breakthrough realizations about AI that changed how people work. The executive who couldn't read technical docs. The marketer who discovered Critique It. Real transformation stories.", duration: "35 min", color: "green" },
            { ep: 5, title: "AI in Learning & Development", guest: "L&D Expert Interview", description: "How AI is changing corporate learning and what L&D leaders should be doing differently. Personalization, behavior change vs learning, and measuring success.", duration: "42 min", color: "blue" },
            { ep: 4, title: "Why Traditional AI Training Doesn't Work", guest: "Justin & Kiyasha", description: "Making the case for why most AI training fails and what actually works instead. Behavior change science, habit formation, and the evidence from Cyborg Habits.", duration: "38 min", color: "green" },
            { ep: 3, title: "The Future of Work Isn't What You Think", guest: "Future of Work Expert", description: "Challenging common narratives about AI and work. What's actually changing, skills that matter, and how to stay relevant.", duration: "45 min", color: "blue" },
            { ep: 2, title: "The 7 Habits of Highly Effective Cyborgs", guest: "Justin & Kiyasha", description: "Deep dive into the 7 habits framework—what they are, why they matter, and how they transform work. Making AI use automatic.", duration: "40 min", color: "green" },
            { ep: 1, title: "What Does It Mean to Be a Cyborg?", guest: "Justin & Kiyasha", description: "Launch episode establishing the core philosophy. The Extended Mind hypothesis, awareness asymmetry, transparent equipment, and why this all matters now.", duration: "48 min", color: "blue" },
          ].map((episode) => (
            <AnimatedCard key={episode.ep} className={`card-${episode.color}`} style={{ padding: 0, overflow: 'hidden' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', gap: 0 }}>
                <div style={{ position: 'relative' }}>
                  <ImagePlaceholder height={200} label="Episode Art" style={{ borderRadius: '24px 0 0 24px', border: 'none', height: '100%' }} />
                  <div style={{ position: 'absolute', bottom: 'var(--space-sm)', right: 'var(--space-sm)', background: 'rgba(0,0,0,0.7)', color: 'white', padding: '4px 10px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 600 }}>
                    {episode.duration}
                  </div>
                </div>
                <div style={{ padding: 'var(--space-xl)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <div style={{ display: 'flex', gap: 'var(--space-sm)', alignItems: 'center', marginBottom: 'var(--space-xs)' }}>
                    <span className={`badge ${episode.color}`}>EP {episode.ep}</span>
                  </div>
                  <h3 style={{ fontSize: 'clamp(1.1rem, 2vw, 1.25rem)', color: 'var(--text-dark)', marginBottom: 'var(--space-xs)', fontFamily: 'Playfair Display, serif', fontWeight: 600 }}>{episode.title}</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: 'var(--space-sm)' }}>with {episode.guest}</p>
                  <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7', marginBottom: 'var(--space-md)', fontSize: '0.95rem' }}>{episode.description}</p>
                  <button className={`btn ${episode.color === 'green' ? 'primary' : 'tech'}`} style={{ padding: '0.75rem 1.5rem', width: 'fit-content' }}>
                    <Play size={16} /> Listen Now
                  </button>
                </div>
              </div>
            </AnimatedCard>
          ))}
        </div>
        <style>{`
          @media (max-width: 768px) {
            .card-panel > div[style*="grid-template-columns: 200px 1fr"] { grid-template-columns: 1fr !important; }
            .card-panel > div > div:first-child { border-radius: 24px 24px 0 0 !important; height: 180px !important; }
          }
        `}</style>
      </div>
    </section>

    {/* QUICK LISTENS - Skills Audio Clips */}
    <section className="section-alt" style={{ padding: 'var(--space-4xl) 0' }}>
      <div className="container">
        <h2 className="section-heading">Quick Listens: Cyborg Skills</h2>
        <p style={{ maxWidth: '600px', color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: 'var(--space-xl)' }}>
          5-minute audio lessons on specific AI skills. Perfect for your commute or coffee break.
        </p>
        <div className="grid-layout" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}>
          {[
            { num: 1, title: "Meeting to Summary", desc: "Turn any meeting transcript into structured, actionable notes in 60 seconds.", duration: "5 min", color: "green" },
            { num: 2, title: "Meeting to Execution", desc: "Go beyond summarization—create actual deliverables from meeting content.", duration: "5 min", color: "blue" },
            { num: 3, title: "Blog to Infographic", desc: "Convert written content into visual infographic format for 10x engagement.", duration: "5 min", color: "green" },
            { num: 4, title: "UI on Command", desc: "Describe an interface and watch the layout materialize. Cognitive ergonomics in action.", duration: "5 min", color: "blue" },
            { num: 5, title: "Deep Dive Research", desc: "Become an expert on any topic in an afternoon with structured exploration.", duration: "5 min", color: "green" },
            { num: 6, title: "Competitive Analysis", desc: "Map competitor landscapes, identify strengths and weaknesses, find gaps.", duration: "5 min", color: "blue" },
            { num: 7, title: "Tone Matching", desc: "Adapt writing for different audiences—formal to casual, technical to accessible.", duration: "5 min", color: "green" },
            { num: 8, title: "Project Planning", desc: "Generate detailed project plans with phases, milestones, and dependencies.", duration: "5 min", color: "blue" },
            { num: 9, title: "Scenario Planning", desc: "Develop multiple future scenarios to stress-test strategies.", duration: "5 min", color: "green" },
            { num: 10, title: "Vibe Engineering", desc: "End-to-end product design workflow—from concept to working prototype.", duration: "5 min", color: "blue" },
            { num: 11, title: "Learning Acceleration", desc: "Cut your learning curve in half with structured AI-assisted exploration.", duration: "5 min", color: "green" },
          ].map((skill, idx) => (
            <AnimatedCard key={idx} className={`card-${skill.color}`} delay={idx * 0.05} style={{ padding: 'var(--space-lg)' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-md)' }}>
                <div className={`icon-box ${skill.color}`} style={{ minWidth: '50px', height: '50px' }}>
                  <span style={{ color: 'white', fontWeight: 700, fontSize: '1.1rem' }}>{skill.num}</span>
                </div>
                <div style={{ flex: 1 }}>
                  <h4 style={{ fontSize: '1rem', color: 'var(--text-dark)', fontFamily: 'Playfair Display, serif', fontWeight: 600, marginBottom: '4px' }}>{skill.title}</h4>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: 1.6, marginBottom: 'var(--space-sm)' }}>{skill.desc}</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)' }}>
                    <button className={`btn ${skill.color === 'green' ? 'primary' : 'tech'}`} style={{ padding: '0.5rem 1rem', fontSize: '0.75rem' }}>
                      <Play size={14} /> Play
                    </button>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>{skill.duration}</span>
                  </div>
                </div>
              </div>
            </AnimatedCard>
          ))}
        </div>
      </div>
    </section>

    <section style={{ padding: 'var(--space-4xl) 0' }}>
      <div className="container">
        <AnimatedCard className="card-blue" style={{ padding: 'var(--space-2xl)', textAlign: 'center' }}>
          <h3 style={{ fontSize: '1.4rem', marginBottom: 'var(--space-sm)', fontFamily: 'Playfair Display, serif', fontWeight: 600 }}>Subscribe to The Cyborg Perspective</h3>
          <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--space-lg)' }}>New episodes every two weeks. Quick Listens added weekly.</p>
          <div style={{ display: 'flex', gap: 'var(--space-sm)', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button className="btn tech">Apple Podcasts</button>
            <button className="btn tech">Spotify</button>
            <button className="btn tech">YouTube</button>
            <button className="btn outline">RSS Feed</button>
          </div>
        </AnimatedCard>
      </div>
    </section>
  </div>
);

const ContactPage = () => (
  <div>
    <section style={{ minHeight: '50vh', display: 'flex', alignItems: 'center', paddingTop: '100px' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 'var(--space-3xl)', alignItems: 'center' }}>
          <div>
            <span className="badge blue" style={{ marginBottom: 'var(--space-md)', display: 'inline-block' }}>CONTACT US</span>
            <h1 className="page-title">Get In Touch.</h1>
            <p className="page-subtitle" style={{ marginTop: 'var(--space-lg)' }}>
              Questions? Ideas? Just want to say hi? We love hearing from our community.
            </p>
          </div>
          <ImagePlaceholder height={300} label="Team Photo" />
        </div>
      </div>
      <style>{`
        @media (max-width: 900px) {
          section > .container > div[style*="grid-template-columns: 1.2fr 1fr"] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>

    <section style={{ padding: 'var(--space-3xl) 0' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: 'var(--space-2xl)' }}>
          <div>
            <AnimatedCard className="card-green" style={{ padding: 'var(--space-xl)', marginBottom: 'var(--space-lg)' }}>
              <h3 style={{ fontSize: '1.1rem', marginBottom: 'var(--space-md)', fontFamily: 'Playfair Display, serif', fontWeight: 600 }}>Quick Contact</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '4px' }}>Email</div>
                  <a href="mailto:hello@cyborgskills.com" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>hello@cyborgskills.com</a>
                </div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '4px' }}>Support</div>
                  <a href="mailto:help@cyborgskills.com" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>help@cyborgskills.com</a>
                </div>
              </div>
            </AnimatedCard>

            <AnimatedCard className="card-blue" delay={0.1} style={{ padding: 'var(--space-xl)' }}>
              <h3 style={{ fontSize: '1.1rem', marginBottom: 'var(--space-sm)', fontFamily: 'Playfair Display, serif', fontWeight: 600 }}>Join the Community</h3>
              <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--space-md)', lineHeight: '1.7', fontSize: '0.95rem' }}>
                Connect with thousands of others learning to thrive with AI.
              </p>
              <button className="btn tech" style={{ width: '100%' }}>
                <Users size={16} /> Join Discord
              </button>
            </AnimatedCard>
          </div>

          <AnimatedCard className="card-blue" delay={0.2} style={{ padding: 'var(--space-2xl)' }}>
            <h3 style={{ fontSize: '1.3rem', marginBottom: 'var(--space-lg)', fontFamily: 'Playfair Display, serif', fontWeight: 600 }}>Send a Message</h3>
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="form-group">
                <label>Name</label>
                <input type="text" className="form-input" placeholder="Your name" required />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input type="email" className="form-input" placeholder="your@email.com" required />
              </div>
              <div className="form-group">
                <label>I'm a...</label>
                <select className="form-select">
                  <option>Student</option>
                  <option>Working Professional</option>
                  <option>Parent/Family</option>
                  <option>Creative/Artist</option>
                  <option>Business Owner</option>
                  <option>Educator</option>
                  <option>Retired</option>
                  <option>Just Curious</option>
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
          </AnimatedCard>
        </div>
        <style>{`
          @media (max-width: 768px) {
            section > .container > div[style*="grid-template-columns: 1fr 1.5fr"] { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </div>
    </section>

    <section className="section-alt" style={{ padding: 'var(--space-4xl) 0' }}>
      <div className="container">
        <AnimatedCard className="card-green" style={{ padding: 'var(--space-2xl)', maxWidth: '750px', margin: '0 auto' }}>
          <h2 className="section-heading">Part of StrideShift Global</h2>
          <p style={{ fontSize: '1.05rem', lineHeight: '1.85', color: 'var(--text-secondary)', marginBottom: 'var(--space-md)' }}>
            Cyborg Skills is part of a larger mission: helping everyone—not just tech experts—thrive in an AI-powered world.
          </p>
          <p style={{ fontSize: '1.05rem', lineHeight: '1.85', color: 'var(--text-secondary)' }}>
            We believe AI is the great equalizer. With the right skills, anyone can do things that were impossible just a few years ago. 
            That's exciting. That's what we're here for.
          </p>
        </AnimatedCard>
      </div>
    </section>
  </div>
);

/* --- APP --- */

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

      <footer style={{ background: 'var(--bg-off-white)', borderTop: '1px solid var(--border-subtle)', padding: 'var(--space-3xl) 0 var(--space-xl)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--space-2xl)', marginBottom: 'var(--space-2xl)' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: 'var(--space-md)' }}>
                <CyborgLogo size={30} />
                <span style={{ fontSize: '1.1rem', fontWeight: 700, fontFamily: 'Playfair Display, serif' }}>Cyborg Skills</span>
              </div>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7', fontSize: '0.9rem' }}>
                AI skills for everyone. No tech background required.
              </p>
            </div>
            <div>
              <h4 style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1.5px', fontWeight: 700, marginBottom: 'var(--space-sm)' }}>Learn</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {['/habits', '/marketplace', '/think-tank', '/podcast'].map((path, i) => (
                  <Link key={i} to={path} style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.9rem', transition: 'color 0.3s' }}>{['Cyborg Habits', 'Marketplace', 'Think Tank', 'Podcast'][i]}</Link>
                ))}
              </div>
            </div>
            <div>
              <h4 style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1.5px', fontWeight: 700, marginBottom: 'var(--space-sm)' }}>Connect</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {['Discord', 'Twitter', 'YouTube', 'Contact'].map((label, i) => (
                  <Link key={i} to={i === 3 ? '/about' : '#'} style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.9rem', transition: 'color 0.3s' }}>{label}</Link>
                ))}
              </div>
            </div>
          </div>
          <div style={{ paddingTop: 'var(--space-lg)', borderTop: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 'var(--space-md)' }}>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>© 2026 Cyborg Skills. Part of StrideShift Global.</p>
            <div style={{ display: 'flex', gap: 'var(--space-lg)' }}>
              <a href="#" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.8rem' }}>Privacy</a>
              <a href="#" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.8rem' }}>Terms</a>
            </div>
          </div>
        </div>
      </footer>
    </Router>
  );
}

import { createRoot } from 'react-dom/client';
const root = createRoot(document.getElementById('root'));
root.render(<App />);
