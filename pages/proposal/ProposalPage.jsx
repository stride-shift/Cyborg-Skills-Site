import React from 'react';
import './ProposalPage.css';
import CoverSection from './components/CoverSection.jsx';
import HonestProblemSection from './components/HonestProblemSection.jsx';
import BehaviorChangeSection from './components/BehaviorChangeSection.jsx';
import SeedSection from './components/SeedSection.jsx';
import DeliverySection from './components/DeliverySection.jsx';
import ProofSection from './components/ProofSection.jsx';
import PreMortemSection from './components/PreMortemSection.jsx';
import FundingSection from './components/FundingSection.jsx';
import AskSection from './components/AskSection.jsx';

export default function ProposalPage() {
  return (
    <div className="proposal-page">
      <CoverSection />
      <HonestProblemSection />
      <BehaviorChangeSection />
      <SeedSection />
      <DeliverySection />
      <ProofSection />
      <PreMortemSection />
      <FundingSection />
      <AskSection />
    </div>
  );
}
