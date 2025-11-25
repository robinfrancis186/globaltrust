import { Handshake, ArrowRight } from 'lucide-react';

export default function SponsorsCTA() {
  return (
    <section className="sponsors-flat" aria-labelledby="sponsors-flat-heading">
      <div className="sponsors-flat__bg" aria-hidden />
      <div className="sponsors-flat__content">
        <div className="sponsors-flat__icon" aria-hidden>
          <Handshake className="sponsors-flat__iconSvg" strokeWidth={1.6} />
        </div>
        <h2 id="sponsors-flat-heading" className="sponsors-flat__title">
          BE PART OF THE MOVEMENT
          <span>FOR TRUST</span>
        </h2>
        <div className="sponsors-flat__separator" />
        <p className="sponsors-flat__subtitle">
          Contact us at <a href="mailto:global-trust-challenge-team@ieee.org">global-trust-challenge-team@ieee.org</a> to start the
          conversation or click below to fill out a sponsorship inquiry.
        </p>
        <a href="/partners#sponsor-registration" className="sponsors-flat__button">
          <span>BECOME A PARTNER</span>
          <ArrowRight className="sponsors-flat__buttonIcon" size={18} strokeWidth={2.2} />
        </a>
      </div>
      <style>
        {`
          .sponsors-flat {
            position: relative;
            padding: clamp(3.2rem, 6vw, 4.6rem) clamp(2.4rem, 5vw, 3.6rem);
            border-radius: 0 !important;
            color: #f3f8ff;
            overflow: hidden;
            display: flex;
            justify-content: center;
            background: linear-gradient(130deg, #031129 0%, #0c2a4f 38%, #1d2f77 64%, #3b1d63 100%);
          }
          .sponsors-flat__bg {
            position: absolute;
            inset: 0;
            border-radius: 0 !important;
            background: linear-gradient(130deg, #031129 0%, #0c2a4f 38%, #1d2f77 64%, #3b1d63 100%);
            box-shadow: 0 28px 60px rgba(5, 9, 27, 0.45);
            pointer-events: none;
            z-index: -1;
          }
          section.sponsors-flat,
          #partners .sponsors-flat,
          .sponsors-shell .sponsors-flat {
            border-radius: 0 !important;
          }
          .sponsors-flat__content {
            position: relative;
            z-index: 1;
            text-align: center;
            max-width: 720px;
            margin: 0 auto;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: clamp(1.2rem, 3vw, 1.8rem);
          }
          .sponsors-flat__icon {
            width: clamp(3.6rem, 6vw, 4rem);
            height: clamp(3.6rem, 6vw, 4rem);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            background: rgba(255, 255, 255, 0.12);
            box-shadow: 
              inset 0 0 18px rgba(255, 255, 255, 0.2),
              0 0 20px rgba(59, 130, 246, 0.4),
              0 0 40px rgba(139, 92, 246, 0.3),
              0 0 60px rgba(99, 102, 241, 0.2);
            filter: drop-shadow(0 0 10px rgba(59, 130, 246, 0.5));
          }
          .sponsors-flat__iconSvg {
            width: clamp(1.8rem, 3vw, 2.1rem);
            height: clamp(1.8rem, 3vw, 2.1rem);
            color: #ffffff;
            filter: drop-shadow(0 0 8px rgba(59, 130, 246, 0.6)) drop-shadow(0 0 16px rgba(139, 92, 246, 0.4));
          }
          .sponsors-flat__title {
            position: relative;
            margin: -0.6rem 0 0 0;
            font-family: "Barlow Condensed", "Inter", sans-serif;
            font-weight: 600;
            letter-spacing: 0.22em;
            text-transform: uppercase;
            font-size: clamp(2rem, 6.2vw, 2.8rem);
            display: flex;
            flex-direction: column;
            gap: clamp(0.4rem, 1.4vw, 0.6rem);
            color: #ffffff;
            text-shadow: 
              0 0 10px rgba(59, 130, 246, 0.5),
              0 0 20px rgba(139, 92, 246, 0.4),
              0 0 30px rgba(99, 102, 241, 0.3),
              0 2px 8px rgba(0, 0, 0, 0.5),
              0 4px 16px rgba(0, 0, 0, 0.3);
            filter: drop-shadow(0 0 8px rgba(59, 130, 246, 0.4));
          }
          .sponsors-flat__title::before {
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
            pointer-events: none;
          }
          .sponsors-flat__title span {
            font-size: clamp(2.4rem, 7vw, 3.2rem);
            text-shadow: 
              0 0 12px rgba(59, 130, 246, 0.6),
              0 0 24px rgba(139, 92, 246, 0.5),
              0 0 36px rgba(99, 102, 241, 0.4),
              0 2px 8px rgba(0, 0, 0, 0.5),
              0 4px 16px rgba(0, 0, 0, 0.3);
            filter: drop-shadow(0 0 10px rgba(59, 130, 246, 0.5));
          }
          .sponsors-flat__separator {
            width: 100%;
            height: 2px;
            background: linear-gradient(90deg, rgba(59, 130, 246, 0.6), rgba(139, 92, 246, 0.6), rgba(99, 102, 241, 0.6));
            margin: clamp(1rem, 2vw, 1.5rem) 0;
            max-width: 100%;
            position: relative;
            overflow: hidden;
            border-radius: 999px;
            box-shadow: 0 2px 8px rgba(59, 130, 246, 0.2);
          }
          .sponsors-flat__separator::after {
            content: '';
            position: absolute;
            inset: 0;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.9), transparent);
            transform: translateX(-100%);
            animation: sponsorsSeparatorSweep 6s ease-in-out infinite;
          }
          @keyframes sponsorsSeparatorSweep {
            0%, 100% { transform: translateX(-100%); }
            50% { transform: translateX(100%); }
          }
          @media (prefers-reduced-motion: reduce) {
            .sponsors-flat__separator::after {
              animation: none !important;
            }
          }
          .sponsors-flat__subtitle {
            margin: 0;
            font-family: "Inter", system-ui, sans-serif;
            font-size: clamp(1rem, 2.2vw, 1.18rem);
            line-height: 1.7;
            color: #ffffff;
            max-width: 600px;
            text-shadow: 0 2px 8px rgba(0, 0, 0, 0.6), 0 4px 16px rgba(0, 0, 0, 0.4);
          }
          .sponsors-flat__subtitle a {
            color: #ffffff;
            font-weight: 700;
            text-decoration: none;
            text-shadow: 0 2px 8px rgba(0, 0, 0, 0.7), 0 4px 16px rgba(0, 0, 0, 0.5);
          }
          .sponsors-flat__button {
            position: relative;
            margin-top: clamp(0.5rem, 1.8vw, 1.1rem);
            display: inline-flex;
            align-items: center;
            gap: 0.6rem;
            padding: 0.85rem 2.6rem;
            border-radius: 999px;
            font-family: "Inter", system-ui, sans-serif;
            font-weight: 600;
            letter-spacing: 0.18em;
            text-transform: uppercase;
            color: #0a1430;
            background: #ffffff;
            border: 1px solid #0c2a4f;
            box-shadow: 0 16px 32px rgba(9, 16, 35, 0.35);
            transition: transform 0.3s ease, box-shadow 0.3s ease, filter 0.3s ease;
            text-decoration: none;
            z-index: 1;
          }
          .sponsors-flat__button::before {
            content: "";
            position: absolute;
            inset: -8px;
            border-radius: 999px;
            background: radial-gradient(
              ellipse at center,
              rgba(59, 130, 246, 0.4) 0%,
              rgba(139, 92, 246, 0.3) 40%,
              rgba(99, 102, 241, 0.2) 70%,
              transparent 100%
            );
            filter: blur(12px);
            opacity: 0;
            transition: opacity 0.3s ease;
            z-index: -1;
            pointer-events: none;
          }
          .sponsors-flat__button:hover,
          .sponsors-flat__button:focus-visible {
            transform: translateY(-4px);
            box-shadow: 
              0 22px 40px rgba(9, 16, 35, 0.42),
              0 0 30px rgba(59, 130, 246, 0.6),
              0 0 50px rgba(139, 92, 246, 0.4),
              0 0 70px rgba(99, 102, 241, 0.3);
            filter: drop-shadow(0 0 20px rgba(59, 130, 246, 0.5));
          }
          .sponsors-flat__button:hover::before,
          .sponsors-flat__button:focus-visible::before {
            opacity: 1;
          }
          .sponsors-flat__buttonIcon {
            transition: transform 0.3s ease;
          }
          .sponsors-flat__button:hover .sponsors-flat__buttonIcon,
          .sponsors-flat__button:focus-visible .sponsors-flat__buttonIcon {
            transform: translateX(4px);
          }
          @media (max-width: 768px) {
            .sponsors-flat {
              padding: clamp(2.6rem, 8vw, 3.4rem) clamp(1.6rem, 6vw, 2.6rem);
            }
            .sponsors-flat__bg {
              box-shadow: 0 18px 38px rgba(5, 9, 27, 0.4);
            }
            .sponsors-flat__button {
              width: 100%;
              justify-content: center;
            }
          }
        `}
      </style>
    </section>
  );
}