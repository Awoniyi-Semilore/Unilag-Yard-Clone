import React from 'react';
import '../PlanHero/PlanHero.CSS'; // We'll create this CSS file

const PlanHero = () => {
  return (
    <section className="plan-hero">
      {/* Combined Background Effects */}
      <div className="gradient-bg"></div>
      <div className="blob blob-1"></div>
      <div className="blob blob-2"></div>
      <div className="blob blob-3"></div>
      
      {/* Your Text Content */}
      <div className="hero-content">
        <h1>Turn Your Campus Clutter into Cash.</h1>
        <p>Why let your skills and old items go to waste? Monetize them safely within campus, fund your next adventure, and connect with the UNILAG community.</p>
      </div>
    </section>
  );
};

export default PlanHero;