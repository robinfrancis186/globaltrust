import React from 'react';
import GalaxyBackground from './GalaxyBackground';
import PreRegisterCTA from './PreRegisterCTA';

const PreRegisterSection: React.FC = () => {
  return (
    <section className="cta-shell">
      <GalaxyBackground
        className="cta-shell__bg"
        density={1.1}
        showVignette
      />
      <div className="cta-shell__content">
        <PreRegisterCTA />
      </div>
      <style>
        {`
          .cta-shell {
            position: relative;
            overflow: hidden;
            background: radial-gradient(120% 110% at 50% 0%, #07112a 0%, #081a36 45%, #0c2749 100%);
          }
          .cta-shell__bg {
            pointer-events: none;
          }
          .cta-shell__content {
            position: relative;
            z-index: 1;
          }
        `}
      </style>
    </section>
  );
};

export default PreRegisterSection;




