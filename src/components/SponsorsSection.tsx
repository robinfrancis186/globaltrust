import React from 'react';
import SponsorsCTA from './SponsorsCTA';

const SponsorsSection: React.FC = () => (
  <section className="sponsors-shell-outer">
    <div id="partners" className="sponsors-shell">
      <SponsorsCTA />
    </div>
    <style>
      {`
        .sponsors-shell-outer {
          position: relative;
          padding: clamp(3.2rem, 6vw, 4.2rem) 0;
          display: flex;
          justify-content: center;
          background: transparent;
          z-index: 4;
          isolation: isolate;
        }
        .sponsors-shell-outer::before {
          content: "";
          position: absolute;
          inset: 0;
          background: radial-gradient(120% 140% at 50% 0%, rgba(6, 14, 32, 0.82), rgba(3, 7, 18, 0.98));
          z-index: 3;
          pointer-events: none;
        }
        #partners.sponsors-shell {
          position: relative;
          inset: auto;
          margin: 0;
          background: transparent !important;
          box-shadow: none !important;
          border: 0 !important;
          overflow: visible;
          isolation: isolate;
          display: flex;
          justify-content: center;
          width: min(1080px, 96vw);
          z-index: 5;
        }
        #partners.sponsors-shell > .sponsors-flat {
          width: 100%;
          position: relative;
          z-index: 6;
        }
        .sponsors-shell-outer::before,
        .sponsors-shell-outer::after,
        #partners.sponsors-shell::before,
        #partners.sponsors-shell::after {
          content: none !important;
        }
        .sponsors-shell-outer :where(.partners-section, .panel, .surface, .wrapper, .bg, .glass, .glassmorphism) {
          background: transparent !important;
          box-shadow: none !important;
          border: 0 !important;
          backdrop-filter: none !important;
        }
      `}
    </style>
  </section>
);

export default SponsorsSection;
