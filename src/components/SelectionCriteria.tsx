import React, { useRef } from 'react';
import {
  Target,
  Lightbulb,
  BookCheck,
  Scaling,
  PersonStanding,
} from 'lucide-react';

import useSharedAuroraParticles from '../hooks/useSharedAuroraParticles';

const CRITERIA = [
  {
    title: 'Relevance',
    description: 'Does it meaningfully tackle AI-driven mistrust?',
    Icon: Target,
  },
  {
    title: 'Originality',
    description: 'Is the idea novel or visionary?',
    Icon: Lightbulb,
  },
  {
    title: 'Feasibility',
    description: 'Could it be implemented or piloted?',
    Icon: BookCheck,
  },
  {
    title: 'Scalability',
    description: 'Can it grow or inform larger systems?',
    Icon: Scaling,
  },
  {
    title: 'Values',
    description: 'Does it promote transparency, equity, and accountability?',
    Icon: PersonStanding,
  },
] as const;

const SelectionCriteria: React.FC = () => {
  const particlesCanvasRef = useRef<HTMLCanvasElement | null>(null);

  useSharedAuroraParticles(particlesCanvasRef);

  return (
    <section
      id="selection-criteria"
      className="selection-criteria-section relative overflow-hidden bg-[#040815] pt-0 pb-24 text-slate-100"
      aria-labelledby="selection-criteria-heading"
    >
      <div className="journey-bg-layers pointer-events-none absolute inset-0 overflow-hidden">
        <div className="journey-gradient-layer" />
        <div className="journey-orb journey-orb--one" />
        <div className="journey-orb journey-orb--two" />
        <canvas ref={particlesCanvasRef} className="journey-particles-layer" />
      </div>

      <style>
        {`
          .selection-criteria-section {
            position: relative;
          }
          .selection-criteria-section .journey-bg-layers {
            transform: scaleY(-1);
            transform-origin: center;
          }
          .selection-criteria-section .journey-particles-layer {
            transform: scaleY(-1);
          }
          .criteria-heading-badge {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            padding: 0.55rem 1.6rem;
            border-radius: 999px;
            background: rgba(255,255,255,0.12);
            color: rgba(255,255,255,0.85);
            letter-spacing: 0.22em;
            font-size: 0.85rem;
            text-transform: uppercase;
          }
          .criteria-heading {
            position: relative;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            margin-top: clamp(1rem, 2vw, 1.5rem);
            padding-inline: 1.4rem;
            font-family: "Barlow Condensed", "Barlow", "Inter", sans-serif;
            font-size: clamp(2.6rem, 6vw, 3.8rem);
            letter-spacing: 0.26em;
            text-transform: uppercase;
            background: linear-gradient(110deg, #d5f5ff 8%, #f8d9ff 45%, #7ad9ff 90%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            filter: drop-shadow(0 18px 55px rgba(59, 130, 246, 0.32));
            text-shadow:
              0 0 45px rgba(147, 197, 253, 0.45),
              0 14px 32px rgba(15, 23, 42, 0.52);
          }
          .criteria-heading::before {
            content: "";
            position: absolute;
            inset: -30% -18%;
            border-radius: 999px;
            background:
              radial-gradient(55% 60% at 50% 32%, rgba(125, 211, 252, 0.3), transparent 72%),
              radial-gradient(80% 82% at 50% 72%, rgba(192, 132, 252, 0.24), transparent 88%);
            filter: blur(12px);
            opacity: 0.9;
            z-index: -1;
          }
          .criteria-subtitle {
            margin-top: clamp(0.9rem, 2vw, 1.5rem);
            font-size: clamp(1.05rem, 2.2vw, 1.25rem);
            line-height: 1.75;
            color: rgba(241, 245, 249, 0.88);
            text-shadow: 0 18px 45px rgba(15, 23, 42, 0.55);
          }
          .criteria-underline {
            width: clamp(8rem, 14vw, 13rem);
            height: 5px;
            border-radius: 999px;
            margin: clamp(1.75rem, 3vw, 2.4rem) auto 0;
            background: linear-gradient(90deg, rgba(125, 211, 252, 0.95), rgba(192, 132, 252, 0.92), rgba(45, 212, 191, 0.9));
            position: relative;
            overflow: hidden;
            box-shadow: 0 18px 38px -16px rgba(59, 130, 246, 0.55);
          }
          .criteria-underline::after {
            content: "";
            position: absolute;
            inset: 0;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.9), transparent);
            transform: translateX(-100%);
            animation: criteriaUnderlineSweep 7s ease-in-out infinite;
          }
          .criteria-grid {
            position: relative;
            z-index: 1;
            display: grid;
            gap: 1.6rem;
            width: 100%;
          }
          .criteria-grid--top {
            margin-top: clamp(3rem, 6vw, 4.5rem);
            grid-template-columns: repeat(3, minmax(0, 1fr));
          }
          .criteria-grid--bottom {
            margin: clamp(1.8rem, 4vw, 3rem) auto 0;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            max-width: min(720px, 100%);
            justify-items: center;
          }
          .criteria-grid--bottom .criteria-card {
            width: 100%;
          }
          @media (max-width: 1024px) {
            .criteria-grid--top {
              grid-template-columns: repeat(2, minmax(0, 1fr));
            }
            .criteria-grid--bottom {
              grid-template-columns: repeat(2, minmax(0, 1fr));
            }
          }
          .criteria-card {
            position: relative;
            padding: clamp(1.8rem, 3.4vw, 2.6rem);
            border-radius: 1.9rem;
            background: linear-gradient(150deg, rgba(255,255,255,0.14), rgba(255,255,255,0.08));
            border: 1px solid rgba(255,255,255,0.18);
            box-shadow: 0 38px 90px -42px rgba(59, 197, 255, 0.65);
            backdrop-filter: blur(18px);
            overflow: hidden;
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
          }
          .criteria-card::before {
            content: "";
            position: absolute;
            inset: 1px;
            border-radius: inherit;
            background: linear-gradient(135deg, rgba(255,255,255,0.18), rgba(255,255,255,0.04));
            opacity: 1;
          }
          .criteria-card::after {
            content: "";
            position: absolute;
            inset: -30% -40% auto;
            height: 60%;
            background: radial-gradient(ellipse at top, rgba(59, 197, 255, 0.28), transparent 65%);
            opacity: 1;
          }
          .criteria-icon-wrap {
            position: relative;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: clamp(3.6rem, 6.5vw, 4.1rem);
            height: clamp(3.6rem, 6.5vw, 4.1rem);
            margin-top: clamp(1.4rem, 2vw, 1.8rem);
            margin-bottom: clamp(1.25rem, 2vw, 1.6rem);
          }
          .criteria-icon-ring {
            position: absolute;
            inset: 0;
            border-radius: 1.4rem;
            background: conic-gradient(from 0deg, rgba(125, 211, 252, 0.45), rgba(192, 132, 252, 0.65), rgba(14, 165, 233, 0.45), rgba(125, 211, 252, 0.45));
            filter: blur(0.4px);
            opacity: 0.85;
            animation: criteriaRingGlow 14s linear infinite;
          }
          .criteria-icon-inner {
            position: relative;
            z-index: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            width: clamp(2.8rem, 5.2vw, 3.3rem);
            height: clamp(2.8rem, 5.2vw, 3.3rem);
            border-radius: 1.2rem;
            background: radial-gradient(circle at 30% 20%, rgba(255,255,255,0.55), rgba(59, 130, 246, 0.35));
            color: white;
            box-shadow: inset 0 0 12px rgba(255,255,255,0.18);
          }
          .criteria-title {
            margin-top: clamp(0.8rem, 2vw, 1rem);
            font-size: clamp(1.1rem, 2.2vw, 1.35rem);
            font-weight: 700;
            letter-spacing: 0.08em;
            text-transform: uppercase;
            color: rgba(255,255,255,0.98);
            text-shadow:
              0 0 40px rgba(148, 197, 253, 0.35),
              0 14px 28px rgba(15, 23, 42, 0.55);
          }
          .criteria-description {
            margin-top: 0.85rem;
            font-size: clamp(1rem, 2vw, 1.12rem);
            font-weight: 500;
            color: rgba(234, 242, 255, 0.94);
            letter-spacing: 0.015em;
            line-height: 1.75;
            max-width: 26rem;
            text-shadow:
              0 14px 36px rgba(15, 23, 42, 0.5),
              0 0 24px rgba(59, 197, 255, 0.18);
          }
          @keyframes criteriaUnderlineSweep {
            0%, 100% { transform: translateX(-100%); }
            50% { transform: translateX(100%); }
          }
          @keyframes criteriaRingGlow {
            0% { filter: hue-rotate(0deg); }
            100% { filter: hue-rotate(45deg); }
          }
          @media (max-width: 768px) {
            .criteria-heading {
              letter-spacing: 0.18em;
            }
            .criteria-grid--top {
              grid-template-columns: 1fr;
            }
            .criteria-grid--bottom {
              grid-template-columns: 1fr;
            }
          }
          @media (prefers-reduced-motion: reduce) {
            .criteria-underline::after,
            .criteria-icon-ring {
              animation: none !important;
            }
          }
        `}
      </style>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto" style={{ paddingTop: 'clamp(2rem, 4vw, 3rem)' }}>
          <span className="criteria-heading-badge">Evaluation Criteria</span>
          <h2 id="selection-criteria-heading" className="criteria-heading">
            How Ideas Are Selected
          </h2>
          <p className="criteria-subtitle">
            Submissions are reviewed by an independent panel of global experts spanning AI, policy, civil society, and ethics. Each proposal is evaluated across the dimensions below.
          </p>
          <div className="criteria-underline" aria-hidden />
        </div>

        <div className="criteria-grid criteria-grid--top">
          {CRITERIA.slice(0, 3).map(({ title, description, Icon }, index) => (
            <article key={title} className="criteria-card">
              <div className="criteria-icon-wrap">
                <span className="criteria-icon-ring" aria-hidden />
                <div className="criteria-icon-inner">
                  <Icon className="h-6 w-6" strokeWidth={1.8} />
                </div>
              </div>
              <h3 className="criteria-title">{title}</h3>
              <p className="criteria-description">{description}</p>
            </article>
          ))}
        </div>

        <div className="criteria-grid criteria-grid--bottom">
          {CRITERIA.slice(3).map(({ title, description, Icon }, index) => (
            <article key={title} className="criteria-card">
              <div className="criteria-icon-wrap">
                <span className="criteria-icon-ring" aria-hidden />
                <div className="criteria-icon-inner">
                  <Icon className="h-6 w-6" strokeWidth={1.8} />
                </div>
              </div>
              <h3 className="criteria-title">{title}</h3>
              <p className="criteria-description">{description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SelectionCriteria;
