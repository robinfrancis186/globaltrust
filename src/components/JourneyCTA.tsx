import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import {
  CalendarDays,
  Users,
  Rocket,
  CheckCircle2,
  CircleDollarSign,
  Megaphone,
  Globe2,
  Trophy,
} from 'lucide-react';

import useSharedAuroraParticles from '../hooks/useSharedAuroraParticles';

gsap.registerPlugin(ScrollTrigger);

const PHASES = [
  {
    phase: 'Phase 1',
    title: 'Proposal',
    description: 'Submit your idea — policy + tech solutions to build trust.',
    bullets: ['Expert feedback', '~50 teams advance', 'Recognition & mentorship'],
    Icon: CalendarDays,
  },
  {
    phase: 'Phase 2',
    title: 'Prototype',
    description: 'Build it with support.',
    bullets: [
      'Teams receive funding',
      'Mentorship + sandbox',
      'Submit working prototype',
    ],
    Icon: Users,
  },
  {
    phase: 'Phase 3',
    title: 'Pilot',
    description: 'Test in real-world settings.',
    bullets: [
      'Finalist teams receive financial awards',
      'Partner-led pilots',
      'Impact measured',
    ],
    Icon: Rocket,
  },
];

const AWARDS_TILES = [
  {
    title: 'Cash prize for winning teams',
    description: 'Secure meaningful resources to accelerate deployment and scale impact.',
    Icon: CircleDollarSign,
  },
  {
    title: 'Present at major events',
    description: 'Share your solution with global leaders at high-visibility gatherings.',
    Icon: Megaphone,
  },
  {
    title: 'Spotlight in global reports',
    description: 'Earn lasting visibility in international publications and stakeholder briefings.',
    Icon: Globe2,
  },
];

const spawnSparkles = (x: number, y: number) => {
  const n = 10;
  for (let i = 0; i < n; i++) {
    const s = document.createElement('span');
    s.className = 'spark';
    s.style.left = `${x}px`;
    s.style.top = `${y}px`;
    document.body.appendChild(s);
    const angle = (i / n) * Math.PI * 2;
    const dx = Math.cos(angle) * 60;
    const dy = Math.sin(angle) * 60;
    s.animate(
      [
        { transform: 'translate(0,0)', opacity: 1 },
        { transform: `translate(${dx}px,${dy}px)`, opacity: 0 },
      ],
      { duration: 450, easing: 'ease-out' },
    ).onfinish = () => s.remove();
  }
};

const JourneyCTA = () => {
  const particlesCanvasRef = useRef<HTMLCanvasElement | null>(null);

  useSharedAuroraParticles(particlesCanvasRef);
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;
    if (prefersReducedMotion) return;

    gsap.registerPlugin(ScrollTrigger);

    const el = document.querySelector('.awards-capstone');
    if (!el) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: 'top 70%',
        end: '+=200',
        scrub: 0.5,
      },
    });

    tl.fromTo(
      el,
      { scale: 0.985, filter: 'brightness(0.98)' },
      { scale: 1.02, filter: 'brightness(1.03)', duration: 1.2, ease: 'power2.out' },
    );

    return () => tl.scrollTrigger?.kill();
  }, []);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;
    if (prefersReducedMotion) return;

    const footer = document.querySelector('.awards-capstone') as HTMLElement | null;
    if (!footer) return;
    const onClick = (e: MouseEvent) => spawnSparkles(e.clientX, e.clientY);
    footer.addEventListener('click', onClick);
    return () => footer.removeEventListener('click', onClick);
  }, []);

  return (
    <section
      id="phases"
      className="journey-section-wrapper relative overflow-hidden bg-[#040815] pt-20 pb-0 text-slate-100"
    >
      <div className="journey-bg-layers pointer-events-none absolute inset-0 overflow-hidden">
        <div className="journey-gradient-layer" />
        <div className="journey-orb journey-orb--one" />
        <div className="journey-orb journey-orb--two" />
        <canvas ref={particlesCanvasRef} className="journey-particles-layer" />
      </div>
      <style>
        {`
          .journey-heading {
            position: relative;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            padding-inline: 1.4rem;
            font-size: clamp(3rem, 7.5vw, 4.8rem);
            letter-spacing: 0.16em;
            word-spacing: 0.28em;
            line-height: 1.08;
            text-transform: uppercase;
            background: linear-gradient(118deg, #d3f7ff 0%, #f8d6ff 45%, #8be9ff 90%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            animation: journeyHeadingGradient 18s ease-in-out infinite alternate;
            filter: drop-shadow(0 30px 80px rgba(59, 130, 246, 0.38));
            text-shadow:
              0 0 55px rgba(148, 197, 253, 0.5),
              0 18px 42px rgba(15, 23, 42, 0.58);
          }
          .journey-heading::before {
            content: "";
            position: absolute;
            inset: -28% -16%;
            border-radius: 999px;
            background:
              radial-gradient(58% 60% at 50% 38%, rgba(125, 211, 252, 0.32), transparent 74%),
              radial-gradient(82% 84% at 50% 70%, rgba(192, 132, 252, 0.26), transparent 88%);
            filter: blur(14px);
            opacity: 0.95;
            z-index: -1;
          }
          .journey-subtitle {
            font-size: clamp(1.08rem, 2.4vw, 1.28rem);
            max-width: 42rem;
            margin-left: auto;
            margin-right: auto;
            color: rgba(241, 245, 249, 0.88);
            letter-spacing: 0.02em;
            line-height: 1.85;
            text-shadow: 0 22px 60px rgba(15, 23, 42, 0.55);
          }
          .journey-heading-underline {
            width: clamp(9rem, 18vw, 15rem);
            height: 6px;
            border-radius: 999px;
            background: linear-gradient(90deg, rgba(125, 211, 252, 0.95), rgba(192, 132, 252, 0.95), rgba(45, 212, 191, 0.95));
            position: relative;
            overflow: hidden;
            box-shadow: 0 22px 48px -20px rgba(59, 130, 246, 0.55);
          }
          .journey-heading-underline::after {
            content: '';
            position: absolute;
            inset: 0;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.9), transparent);
            transform: translateX(-100%);
            animation: journeyUnderlineSweep 6s ease-in-out infinite;
          }
          .journey-connector-line {
            margin: clamp(2.5rem, 5vw, 3.75rem) auto 0;
            max-width: 960px;
            height: 2px;
            border-radius: 999px;
            background: linear-gradient(90deg, transparent 4%, rgba(148, 163, 184, 0.35) 15%, rgba(148,163,184,0.35) 85%, transparent 96%);
            position: relative;
            opacity: 0.7;
          }
          .journey-connector-line::before,
          .journey-connector-line::after {
            content: '';
            position: absolute;
            top: -6px;
            width: 12px;
            height: 12px;
            border-radius: 999px;
            background: radial-gradient(circle, rgba(125,211,252,0.8), transparent 70%);
            box-shadow: 0 0 12px rgba(125,211,252,0.6);
          }
          .journey-connector-line::before { left: 18%; }
          .journey-connector-line::after { right: 18%; }
          .journey-bg-layers {
            isolation: isolate;
            z-index: 0;
          }
          .journey-gradient-layer {
            position: absolute;
            inset: -15%;
            background:
              radial-gradient(60% 60% at 18% 20%, rgba(59, 197, 255, 0.35), transparent 70%),
              radial-gradient(70% 70% at 82% 30%, rgba(129, 140, 248, 0.32), transparent 75%),
              linear-gradient(185deg, rgba(6, 20, 48, 0.85), rgba(3, 10, 25, 0.95));
            filter: saturate(112%);
            animation: journeyGradientDrift 48s ease-in-out infinite alternate;
            will-change: transform, opacity;
          }
          .journey-orb {
            position: absolute;
            width: clamp(22rem, 30vw, 32rem);
            height: clamp(22rem, 30vw, 32rem);
            border-radius: 999px;
            filter: blur(0px);
            opacity: 0.35;
          }
          .journey-orb--one {
            top: 12%;
            left: -10%;
            background: radial-gradient(circle at center, rgba(45, 197, 255, 0.35), transparent 65%);
            animation: journeyOrbOne 60s ease-in-out infinite alternate;
          }
          .journey-orb--two {
            bottom: -15%;
            right: -12%;
            background: radial-gradient(circle at center, rgba(129, 140, 248, 0.3), transparent 70%);
            animation: journeyOrbTwo 72s ease-in-out infinite alternate;
          }
          .journey-particles-layer {
            position: absolute;
            inset: 0;
            width: 100%;
            height: 100%;
          }
          .journey-card {
            position: relative;
            box-shadow: 0 35px 90px -40px rgba(59, 197, 255, 0.55);
          }
          .journey-card::after {
            display: none;
          }
          .journey-icon-wrap {
            position: relative;
            width: 4.5rem;
            height: 4.5rem;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 1.5rem;
          }
          .journey-icon-ring {
            position: absolute;
            inset: 0;
            border-radius: 1.6rem;
            background: conic-gradient(from 0deg, rgba(125, 211, 252, 0.45), rgba(192, 132, 252, 0.65), rgba(14, 165, 233, 0.45), rgba(125, 211, 252, 0.45));
            filter: blur(0.4px);
            opacity: 0.85;
            animation: journeyRingGlow 12s linear infinite;
          }
          .journey-icon-inner {
            position: relative;
            z-index: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 3.5rem;
            height: 3.5rem;
            border-radius: 1.3rem;
            background: radial-gradient(circle at 30% 20%, rgba(255,255,255,0.55), rgba(59, 130, 246, 0.35));
            color: white;
            box-shadow: inset 0 0 12px rgba(255,255,255,0.15);
          }
          .awards-capstone {
            position: relative;
            isolation: isolate;
            margin-top: clamp(4rem, 8vw, 6rem);
            margin-bottom: clamp(4rem, 8vw, 6rem);
            padding: clamp(3rem, 6vw, 4.25rem);
            border-radius: 2rem;
            background: linear-gradient(135deg, rgba(99, 102, 241, 0.85), rgba(236, 72, 153, 0.88));
            box-shadow: 0 60px 140px -50px rgba(56, 189, 248, 0.55);
            overflow: hidden;
          }
          .awards-capstone::before {
            content: "";
            position: absolute;
            inset: -25%;
            border-radius: inherit;
            background: radial-gradient(85% 60% at 50% 100%, rgba(236, 72, 153, 0.32), rgba(99, 102, 241, 0.4) 45%, transparent 75%);
            filter: blur(22px);
            opacity: 0.9;
            pointer-events: none;
          }
          .awards-capstone::after {
            content: "";
            position: absolute;
            inset: -40% 10% 10% -40%;
            background: linear-gradient(115deg, rgba(255,255,255,0.38), rgba(255,255,255,0.04));
            mix-blend-mode: soft-light;
            animation: awardsCapstoneSweep 12s ease-in-out infinite alternate;
            pointer-events: none;
          }
          .awards-capstone > * {
            position: relative;
            z-index: 1;
          }
          .awards-badge {
            position: relative;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: clamp(4.6rem, 6.5vw, 5.4rem);
            height: clamp(4.6rem, 6.5vw, 5.4rem);
            border-radius: 999px;
            background: linear-gradient(145deg, rgba(255,255,255,0.35), rgba(255,255,255,0.08));
            border: 1px solid rgba(255,255,255,0.4);
            box-shadow:
              0 22px 55px -24px rgba(30, 64, 175, 0.85),
              0 0 38px rgba(168, 85, 247, 0.48),
              inset 0 0 22px rgba(255, 255, 255, 0.32);
            backdrop-filter: blur(8px);
            color: rgba(255,255,255,0.95);
            isolation: isolate;
          }
          .awards-badge::before {
            content: "";
            position: absolute;
            inset: -40%;
            border-radius: inherit;
            background: radial-gradient(65% 65% at 50% 40%, rgba(253, 224, 71, 0.48), transparent 75%);
            filter: blur(30px);
            opacity: 0.85;
            z-index: -2;
          }
          .awards-badge::after {
            content: "";
            position: absolute;
            inset: -22%;
            border-radius: inherit;
            background: radial-gradient(60% 60% at 50% 40%, rgba(236, 72, 153, 0.35), transparent 68%);
            filter: blur(24px);
            opacity: 0.95;
            z-index: -1;
          }
          .awards-badge-icon {
            width: clamp(2.1rem, 4vw, 2.6rem);
            height: clamp(2.1rem, 4vw, 2.6rem);
            color: #fcd34d;
            filter: drop-shadow(0 8px 22px rgba(234, 179, 8, 0.5));
          }
          .awards-title {
            margin-top: clamp(1.05rem, 2vw, 1.6rem);
            font-family: "Barlow Condensed", sans-serif;
            font-size: clamp(2.4rem, 4.5vw, 3.4rem);
            letter-spacing: 0.24em;
            text-transform: uppercase;
            background: linear-gradient(95deg, #ffffff 10%, #e7dcff 45%, #ffd6ff 85%);
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent;
            text-shadow: 0 12px 55px rgba(123, 94, 255, 0.35), 0 3px 15px rgba(15, 23, 42, 0.55);
            filter: drop-shadow(0 0 22px rgba(168, 85, 247, 0.18));
          }
          .awards-sub {
            margin-top: clamp(0.85rem, 2vw, 1.35rem);
            font-size: clamp(1.08rem, 2.4vw, 1.3rem);
            font-weight: 500;
            color: rgba(255,255,255,0.9);
            max-width: 44rem;
            margin-left: auto;
            margin-right: auto;
            line-height: 1.75;
            text-shadow: 0 18px 60px rgba(15, 23, 42, 0.45);
          }
          .awards-grid {
            margin-top: clamp(2.25rem, 4vw, 3rem);
            display: grid;
            gap: 1.5rem;
            grid-template-columns: repeat(3, minmax(0, 1fr));
          }
          .award-tile {
            position: relative;
            padding: clamp(1.4rem, 2.5vw, 1.9rem);
            border-radius: 1.4rem;
            background: linear-gradient(150deg, rgba(255,255,255,0.18), rgba(255,255,255,0.08));
            border: 1px solid rgba(255,255,255,0.28);
            box-shadow: 0 35px 80px -45px rgba(15, 23, 42, 0.75);
            backdrop-filter: blur(8px);
          }
          .award-tile::after {
            content: "";
            position: absolute;
            inset: 1px;
            border-radius: inherit;
            background: linear-gradient(125deg, rgba(255,255,255,0.14), rgba(255,255,255,0));
            opacity: 1;
          }
          .tile-icon {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 2.75rem;
            height: 2.75rem;
            border-radius: 0.9rem;
            background: linear-gradient(135deg, rgba(255,255,255,0.9), rgba(255,255,255,0.6));
            color: rgba(99,102,241,0.8);
            box-shadow: inset 0 0 0 1px rgba(255,255,255,0.4), 0 8px 20px -12px rgba(15, 23, 42, 0.6);
            margin-bottom: 1.1rem;
          }
          .tile-title {
            font-size: 1.05rem;
            font-weight: 600;
            letter-spacing: 0.05em;
            color: rgba(255,255,255,0.95);
            text-transform: uppercase;
          }
          .tile-desc {
            margin-top: 0.6rem;
            font-size: 0.92rem;
            color: rgba(255,255,255,0.82);
            line-height: 1.6;
          }
          @media (max-width: 900px) {
            .awards-grid {
              grid-template-columns: repeat(2, minmax(0, 1fr));
            }
          }
          @media (max-width: 640px) {
            .awards-grid {
              grid-template-columns: 1fr;
            }
          }
          @keyframes journeyHeadingGradient {
            0% { filter: hue-rotate(0deg); }
            100% { filter: hue-rotate(30deg); }
          }
          @keyframes journeyUnderlineSweep {
            0%, 100% { transform: translateX(-100%); }
            50% { transform: translateX(100%); }
          }
          @keyframes journeyGradientDrift {
            0% { transform: translate3d(0%, 0%, 0) scale(1); opacity: 0.8; }
            50% { transform: translate3d(-2%, 3%, 0) scale(1.05); opacity: 1; }
            100% { transform: translate3d(1.5%, -2.5%, 0) scale(1.02); opacity: 0.9; }
          }
          @keyframes journeyOrbOne {
            0% { transform: translate3d(0%, 0%, 0) scale(1); opacity: 0.4; }
            100% { transform: translate3d(6%, 4%, 0) scale(0.95); opacity: 0.3; }
          }
          @keyframes journeyOrbTwo {
            0% { transform: translate3d(0%, 0%, 0) scale(1); opacity: 0.32; }
            100% { transform: translate3d(-5%, -6%, 0) scale(1.05); opacity: 0.26; }
          }
          @keyframes journeyRingGlow {
            0% { filter: hue-rotate(0deg); }
            100% { filter: hue-rotate(45deg); }
          }
          @keyframes awardsCapstoneSweep {
            0% { transform: translate3d(-20%, 0, 0); opacity: 0.45; }
            100% { transform: translate3d(40%, 0, 0); opacity: 0.6; }
          }
          @media (prefers-reduced-motion: reduce) {
            .journey-gradient-layer {
              animation: none;
            }
            .journey-orb--one,
            .journey-orb--two,
            .journey-card::after,
            .journey-icon-ring,
            .journey-heading-underline::after,
            .awards-capstone::after {
              animation: none;
            }
          }
        `}
      </style>
      <style>
        {`
          .spark {
            position: fixed;
            width: 6px;
            height: 6px;
            border-radius: 50%;
            background: radial-gradient(circle, #fff 0%, #ffd6ff 60%, transparent 70%);
            pointer-events: none;
            z-index: 9999;
          }
        `}
      </style>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto pt-6 md:pt-10">
          <h2
            className="journey-heading text-4xl font-extrabold uppercase"
            style={{ fontFamily: '"Barlow Condensed","Barlow", "Inter", sans-serif' }}
          >
            The Challenge
          </h2>
          <p className="journey-subtitle mt-6 text-lg leading-relaxed text-slate-100/80">
            The Challenge is divided into three phases, with a rigorous evaluation by a
            neutral, expert jury at the end of each phase to identify the most promising
            solutions that will move forward and receive recognition.
          </p>
          <div className="journey-heading-underline mt-8 mx-auto" aria-hidden />
        </div>

        <div className="journey-connector-line" aria-hidden />

        <div className="mt-16 md:mt-20 grid gap-8 md:grid-cols-3">
          {PHASES.map(({ phase, title, description, bullets, Icon }) => (
            <div
              key={phase}
              className="journey-card relative overflow-visible rounded-3xl bg-white/12 px-10 pb-12 pt-16 shadow-xl shadow-indigo-900/30 ring-1 ring-white/10 backdrop-blur-[8px] transition-transform duration-300"
            >
              <div className="absolute left-10 top-6 rounded-full bg-gradient-to-r from-indigo-500 to-teal-400 px-6 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.35em] text-white shadow-lg shadow-teal-500/40">
                {phase}
              </div>
              <div className="journey-icon-wrap">
                <span className="journey-icon-ring" aria-hidden />
                <div className="journey-icon-inner">
                  <Icon className="h-8 w-8" strokeWidth={1.8} />
                </div>
              </div>
              <h3 className="mt-6 text-lg font-bold uppercase text-white tracking-[0.04em]">
                {title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-white/82">{description}</p>
              <ul className="mt-6 space-y-2">
                {bullets.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-slate-100/90">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-300" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="awards-capstone text-center">
          <span className="awards-badge" role="img" aria-label="Awards & Recognition">
            <Trophy className="awards-badge-icon" strokeWidth={1.7} />
          </span>
          <h3 className="awards-title">Awards & Recognition</h3>
          <p className="awards-sub">
            Celebrating teams that build lasting trust — each accolade amplifies your voice, reach, and global impact.
          </p>
          <div className="awards-grid">
            {AWARDS_TILES.map(({ title, description, Icon }) => (
              <article key={title} className="award-tile">
                <div className="tile-icon">
                  <Icon className="h-5 w-5" strokeWidth={1.8} />
                </div>
                <h4 className="tile-title">{title}</h4>
                <p className="tile-desc">{description}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default JourneyCTA;
