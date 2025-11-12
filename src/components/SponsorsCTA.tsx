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
          Be Part of the Movement
          <span>For Trust</span>
        </h2>
        <p className="sponsors-flat__subtitle">
          Contact us at <a href="mailto:global-trust-challenge-team@ieee.org">global-trust-challenge-team@ieee.org</a> to start the
          conversation or click below to fill out a sponsorship inquiry.
        </p>
        <a href="/partners#sponsor-registration" className="sponsors-flat__button">
          <span>Become a Partner</span>
          <ArrowRight className="sponsors-flat__buttonIcon" size={18} strokeWidth={2.2} />
        </a>
      </div>
      <style>
        {`
          .sponsors-flat {
            position: relative;
            padding: clamp(3.2rem, 6vw, 4.6rem) clamp(2.4rem, 5vw, 3.6rem);
            border-radius: clamp(1.6rem, 2.8vw, 2.4rem);
            color: #f3f8ff;
            overflow: visible;
            display: flex;
            justify-content: center;
          }
          .sponsors-flat__bg {
            position: absolute;
            inset: 0;
            border-radius: inherit;
            background: linear-gradient(130deg, #031129 0%, #0c2a4f 38%, #1d2f77 64%, #3b1d63 100%);
            box-shadow: 0 28px 60px rgba(5, 9, 27, 0.45);
            pointer-events: none;
            z-index: -1;
          }
          .sponsors-flat__bg::before {
            content: "";
            position: absolute;
            inset: -30% -25% 40% -25%;
            background:
              radial-gradient(circle at 35% 35%, rgba(29, 161, 242, 0.38), transparent 70%),
              radial-gradient(circle at 70% 60%, rgba(168, 85, 247, 0.32), transparent 72%);
            opacity: 0.8;
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
            box-shadow: inset 0 0 18px rgba(255, 255, 255, 0.2);
          }
          .sponsors-flat__iconSvg {
            width: clamp(1.8rem, 3vw, 2.1rem);
            height: clamp(1.8rem, 3vw, 2.1rem);
            color: #f9fbff;
          }
          .sponsors-flat__title {
            margin: 0;
            font-family: "Barlow Condensed", "Inter", sans-serif;
            font-weight: 600;
            letter-spacing: 0.22em;
            text-transform: uppercase;
            font-size: clamp(2rem, 6.2vw, 2.8rem);
            display: flex;
            flex-direction: column;
            gap: clamp(0.4rem, 1.4vw, 0.6rem);
          }
          .sponsors-flat__title span {
            font-size: clamp(2.4rem, 7vw, 3.2rem);
          }
          .sponsors-flat__subtitle {
            margin: 0;
            font-family: "Inter", system-ui, sans-serif;
            font-size: clamp(1rem, 2.2vw, 1.18rem);
            line-height: 1.7;
            color: rgba(240, 250, 255, 0.94);
            max-width: 600px;
            text-shadow: 0 10px 32px rgba(6, 12, 30, 0.55);
          }
          .sponsors-flat__subtitle a {
            color: #fefefe;
            font-weight: 600;
            text-decoration: none;
            text-shadow: 0 8px 24px rgba(6, 12, 30, 0.6);
          }
          .sponsors-flat__button {
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
            background: linear-gradient(90deg, #f7fbff 0%, #e3f1ff 100%);
            box-shadow: 0 16px 32px rgba(9, 16, 35, 0.35);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
          }
          .sponsors-flat__button:hover,
          .sponsors-flat__button:focus-visible {
            transform: translateY(-4px);
            box-shadow: 0 22px 40px rgba(9, 16, 35, 0.42);
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