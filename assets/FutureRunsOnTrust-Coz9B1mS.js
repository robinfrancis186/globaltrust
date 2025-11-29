import{u as P,b as D,j as e,m as R}from"./vendor-animations-BUSjwd78.js";import{r as p}from"./vendor-react-DK7iIRbm.js";function L(){if(typeof window>"u")return!1;const n=navigator.userAgent||navigator.vendor||window.opera,a=/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(n.toLowerCase()),c=window.innerWidth<=768;return a||c}function O(){if(typeof window>"u")return!1;const n=navigator.userAgent||navigator.vendor||window.opera,a=/ipad|android(?!.*mobile)|tablet/i.test(n.toLowerCase()),c=window.innerWidth>768&&window.innerWidth<=1024;return a||c}function W(){if(typeof window>"u")return!1;const n=window.navigator,d=n.hardwareConcurrency||4,a=n.deviceMemory||4,c=n.connection||n.mozConnection||n.webkitConnection,g=c&&(c.effectiveType==="slow-2g"||c.effectiveType==="2g");return d<4||a<4||g||!1}function G(){return typeof window>"u"?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches}function j(){const n=L(),d=O(),a=W(),c=G(),g=n||d||a||c,A=n||a;let T=1;n?T=.5:d&&(T=.75);let C=1;return n?C=.5:d&&(C=.75),{isMobile:n,isTablet:d,isLowEndDevice:a,prefersReducedMotion:c,shouldReduceAnimations:g,shouldDisableCanvas:A,particleCountMultiplier:T,canvasResolutionMultiplier:C}}function B(n){const d=j();return Math.floor(n*d.particleCountMultiplier)}function S(n,d){const a=j(),c=typeof window<"u"&&window.devicePixelRatio||1;let g=c;return a.isMobile||a.isLowEndDevice?g=Math.min(c,1.5):(a.isTablet,g=Math.min(c,2)),{width:Math.floor(n*a.canvasResolutionMultiplier*g),height:Math.floor(d*a.canvasResolutionMultiplier*g),dpr:g}}const N=90,I=["rgba(0,174,239,0.55)","rgba(139,126,200,0.5)","rgba(107,90,171,0.45)","rgba(46,216,243,0.4)"],V=["AI is reshaping how we learn, heal, and innovate. This transformation holds extraordinary promise — but it depends on one essential ingredient: trust.","That's what the Global Trust Challenge (GTC) was created to enable. Born from a G7 call to action, it serves as a global rallying cry to preserve trust in the digital age. The GTC is led by a coalition of changemakers - including IEEE SA, OECD, and AI Commons - united by a shared commitment to transparency, accountability, and human-centered innovation.","We're inviting technologists, policymakers, and innovators worldwide to co-create solutions that make digital environments more transparent, reliable, and empowering for everyone. Together, we're laying the foundations of digital trust - for future generations, for industry, and for society at large."],Y={hidden:{opacity:0,y:30},visible:n=>({opacity:1,y:0,transition:{delay:n*.3,duration:.8,ease:"easeOut"}})},K={hidden:{opacity:0},visible:{opacity:1,transition:{staggerChildren:.3,delayChildren:.2}}},X=(n,d)=>({x:Math.random()*n,y:Math.random()*d,radius:1.5+Math.random()*3.5,speedX:(Math.random()-.5)*.28,speedY:(Math.random()-.5)*.28,color:I[Math.floor(Math.random()*I.length)]}),$=p.memo(()=>{const n=p.useRef(null),d=p.useRef([]),a=p.useRef(null),[c,g]=p.useState(!0),{scrollYProgress:A}=P(),T=D(A,[0,1],[0,-50]),[C,z]=p.useState(new Set),y=({children:t,wordKey:s,color:r="#00AEEF",className:l=""})=>{const i=C.has(s);return e.jsx("span",{"data-highlight-word":s,className:`transition-all duration-500 ease-out ${l}`,style:{textShadow:i?`0 0 12px ${r}30, 0 0 24px ${r}15`:"none",color:i?r:"inherit",filter:i?"brightness(1.1)":"brightness(1)"},children:t})};return p.useEffect(()=>{let t=null,s=0,r=0;const l=i=>{const h=Math.abs(i.clientX-s),k=Math.abs(i.clientY-r);h<5&&k<5||(s=i.clientX,r=i.clientY,!t&&(t=requestAnimationFrame(()=>{const f=document.querySelectorAll("[data-highlight-word]"),b=new Set;f.forEach(x=>{const v=x.getBoundingClientRect();if(Math.hypot(i.clientX-(v.left+v.width/2),i.clientY-(v.top+v.height/2))<100){const m=x.getAttribute("data-highlight-word");m&&b.add(m)}}),z(b),t=null})))};return window.addEventListener("mousemove",l,{passive:!0}),()=>{window.removeEventListener("mousemove",l),t&&cancelAnimationFrame(t)}},[]),p.useEffect(()=>{const t=a.current;if(!t)return;const s=new IntersectionObserver(r=>{r.forEach(l=>{const i=l.isIntersecting&&l.intersectionRatio>.1;g(i);const h=t.querySelector(".trust-nebula-bg");h&&(h.style.setProperty("animation-play-state",i?"running":"paused"),h.style.setProperty("--animation-state",i?"running":"paused"));const k=t.querySelector(".trust-text-container");k&&k.style.setProperty("animation-play-state",i?"running":"paused")})},{threshold:[0,.1,.5,1]});return s.observe(t),()=>s.disconnect()},[]),p.useEffect(()=>{const t=n.current;if(!t)return;const s=j();if(s.shouldDisableCanvas){t.style.display="none";return}const r=t.getContext("2d");if(!r)return;let l=null,i=!0,h=1;const k=()=>{const u=t.getBoundingClientRect();h=S(u.width,u.height).dpr;const w=s.isMobile?30:s.isTablet?60:N,E=Math.min(B(N),w);d.current=Array.from({length:E},()=>X(u.width,u.height))};let f=null;const b=()=>{f&&clearTimeout(f),f=window.setTimeout(()=>{const u=t.getBoundingClientRect(),m=S(u.width,u.height);h=m.dpr,t.width=m.width,t.height=m.height,t.style.width=`${u.width}px`,t.style.height=`${u.height}px`,r.setTransform(1,0,0,1,0,0),r.scale(h,h),k(),f=null},150)},x=()=>{if(!i){l=null;return}const u=t.offsetWidth,m=t.offsetHeight;r.clearRect(0,0,t.width,t.height);const w=d.current;w.length;const E=new Map;w.forEach(o=>{E.has(o.color)||E.set(o.color,[]),E.get(o.color).push(o)}),w.forEach(o=>{o.x+=o.speedX,o.y+=o.speedY,o.x<-80&&(o.x=u+80),o.x>u+80&&(o.x=-80),o.y<-80&&(o.y=m+80),o.y>m+80&&(o.y=-80)}),E.forEach((o,F)=>{r.beginPath(),o.forEach(M=>{r.moveTo(M.x+M.radius,M.y),r.arc(M.x,M.y,M.radius,0,Math.PI*2)}),r.fillStyle=F,r.globalAlpha=1,r.fill()}),l=requestAnimationFrame(x)},v=t.closest("section")||t.parentElement;if(v){const u=new IntersectionObserver(m=>{m.forEach(w=>{i=w.isIntersecting&&w.intersectionRatio>.1,i&&!l?x():!i&&l&&(cancelAnimationFrame(l),l=null)})},{threshold:[0,.1,.5,1]});return u.observe(v),b(),i&&x(),window.addEventListener("resize",b,{passive:!0}),()=>{u.disconnect(),l&&cancelAnimationFrame(l),f&&clearTimeout(f),window.removeEventListener("resize",b)}}else return b(),x(),window.addEventListener("resize",b,{passive:!0}),()=>{l&&cancelAnimationFrame(l),f&&clearTimeout(f),window.removeEventListener("resize",b)}},[]),e.jsxs(e.Fragment,{children:[e.jsx("style",{children:`
        /* Aurora/Sky-like dynamic gradient background - blue/violet/turquoise palette */
        .trust-nebula-bg {
          position: absolute;
          inset: 0;
          overflow: hidden;
          /* Base gradient - static fallback */
          background: linear-gradient(180deg, 
            #0a1f2a 0%,      /* Deep blue */
            #1e3a5f 15%,     /* Dark blue */
            #2d4f6f 30%,     /* Medium blue */
            #3b3a7a 50%,     /* Violet-blue */
            #554c96 70%,     /* Medium violet */
            #6b5aab 85%,     /* Light violet */
            #8b7ec8 100%     /* Pale violet */
          );
          /* Dynamic aurora gradient animation */
          background-image: 
            linear-gradient(180deg, 
              #0a1f2a 0%,
              #1e3a5f 15%,
              #2d4f6f 30%,
              #3b3a7a 50%,
              #554c96 70%,
              #6b5aab 85%,
              #8b7ec8 100%
            );
          background-size: 100% 200%;
          animation: auroraShift 25s ease-in-out infinite alternate;
          animation-play-state: running;
        }

        /* Glowing orbs using ::before */
        .trust-nebula-bg::before {
          content: '';
          position: absolute;
          inset: -20%;
          background: 
            radial-gradient(circle at 20% 30%, rgba(139, 126, 200, 0.4) 0%, transparent 50%),
            radial-gradient(circle at 80% 50%, rgba(0, 174, 239, 0.35) 0%, transparent 50%),
            radial-gradient(circle at 50% 70%, rgba(107, 90, 171, 0.3) 0%, transparent 50%);
          animation: orbDrift 30s ease-in-out infinite alternate;
          animation-play-state: var(--animation-state, running);
          pointer-events: none;
        }

        /* Drifting light particles using ::after */
        .trust-nebula-bg::after {
          content: '';
          position: absolute;
          inset: 0;
          background-image: 
            radial-gradient(2px 2px at 15% 25%, rgba(255, 255, 255, 0.6), transparent),
            radial-gradient(1.5px 1.5px at 35% 40%, rgba(0, 174, 239, 0.7), transparent),
            radial-gradient(2px 2px at 65% 60%, rgba(139, 126, 200, 0.6), transparent),
            radial-gradient(1.5px 1.5px at 85% 75%, rgba(107, 90, 171, 0.5), transparent),
            radial-gradient(2px 2px at 25% 80%, rgba(46, 216, 243, 0.5), transparent),
            radial-gradient(1.5px 1.5px at 75% 20%, rgba(167, 139, 250, 0.6), transparent);
          background-size: 100% 100%, 120% 120%, 110% 110%, 130% 130%, 115% 115%, 125% 125%;
          background-position: 0% 0%, 0% 0%, 0% 0%, 0% 0%, 0% 0%, 0% 0%;
          animation: particleShimmer 40s linear infinite;
          animation-play-state: var(--animation-state, running);
          opacity: 0.7;
          pointer-events: none;
        }

        /* Aurora gradient shift animation */
        @keyframes auroraShift {
          0% {
            background-position: 0% 0%;
            filter: hue-rotate(0deg);
          }
          33% {
            background-position: 0% 25%;
            filter: hue-rotate(5deg);
          }
          66% {
            background-position: 0% 50%;
            filter: hue-rotate(-3deg);
          }
          100% {
            background-position: 0% 0%;
            filter: hue-rotate(0deg);
          }
        }

        /* Orb drift animation */
        @keyframes orbDrift {
          0% {
            transform: translate3d(0, 0, 0) scale(1);
            opacity: 0.8;
          }
          50% {
            transform: translate3d(2%, -1%, 0) scale(1.05);
            opacity: 1;
          }
          100% {
            transform: translate3d(-1%, 1%, 0) scale(0.95);
            opacity: 0.85;
          }
        }

        /* Particle shimmer animation */
        @keyframes particleShimmer {
          0% {
            background-position: 0% 0%, 0% 0%, 0% 0%, 0% 0%, 0% 0%, 0% 0%;
            opacity: 0.7;
          }
          50% {
            background-position: 5% 10%, -3% 8%, 4% -5%, -2% 12%, 3% 7%, -4% 9%;
            opacity: 0.9;
          }
          100% {
            background-position: 0% 0%, 0% 0%, 0% 0%, 0% 0%, 0% 0%, 0% 0%;
            opacity: 0.7;
          }
        }

        /* Reduced motion - static gradient fallback */
        @media (prefers-reduced-motion: reduce) {
          .trust-nebula-bg {
            animation: none !important;
            background-size: 100% 100% !important;
          }
          .trust-nebula-bg::before,
          .trust-nebula-bg::after {
            animation: none !important;
            opacity: 0.5;
          }
        }

        /* Low-power device fallback - disable animations */
        @media (prefers-reduced-motion: reduce), (max-width: 768px) {
          .trust-nebula-bg {
            background-size: 100% 100%;
          }
        }

        @keyframes trustPulse {
          0%, 100% {
            box-shadow: 0 0 20px rgba(0,174,239,0.15), 0 0 40px rgba(0,174,239,0.08);
          }
          50% {
            box-shadow: 0 0 60px rgba(139,126,200,0.25), 0 0 80px rgba(107,90,171,0.15);
          }
        }
        .trust-text-container {
          animation: trustPulse 12s ease-in-out infinite;
          animation-play-state: running;
          transition: box-shadow 0.3s ease;
          backdrop-filter: blur(6px);
          border: 1px solid rgba(139,126,200,0.2);
          border-radius: 18px;
          background: rgba(30, 58, 95, 0.65);
        }

        /* Animated underline for "The Future Runs on Trust" */
        @keyframes gradientShiftTrust {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        @keyframes underlineExpandTrust {
          0% {
            width: 0%;
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            width: 100%;
            opacity: 1;
          }
        }

        .trust-underline {
          position: relative;
          display: block;
          height: 3px;
          width: 150px;
          margin: 0.75rem auto 0;
          border-radius: 9999px;
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(0, 174, 239, 0.9) 20%,
            rgba(139, 126, 200, 0.9) 40%,
            rgba(167, 139, 250, 1) 50%,
            rgba(139, 126, 200, 0.9) 60%,
            rgba(0, 174, 239, 0.9) 80%,
            transparent 100%
          );
          background-size: 200% 100%;
          box-shadow: 
            0 0 10px rgba(0, 174, 239, 0.8),
            0 0 20px rgba(139, 126, 200, 0.6),
            0 0 30px rgba(167, 139, 250, 0.4);
          animation: 
            underlineExpandTrust 2s ease-out forwards,
            gradientShiftTrust 3s ease-in-out infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .trust-underline {
            animation: none !important;
            width: 100%;
            opacity: 1;
          }
        }
      `}),e.jsxs("section",{ref:a,id:"trust",className:"relative z-10 min-h-[90vh] overflow-hidden flex items-center justify-center",children:[e.jsx("div",{className:"absolute inset-0 trust-nebula-bg","aria-hidden":"true"}),e.jsx("div",{className:"absolute inset-0 bg-black/30","aria-hidden":"true"}),e.jsx("div",{className:"absolute inset-0 bg-gradient-to-b from-transparent via-[#3b3a7a]/30 to-[#8b7ec8]/25 mix-blend-soft-light pointer-events-none"}),e.jsx("div",{className:"absolute inset-0 bg-gradient-to-r from-transparent via-[#00AEEF]/15 to-transparent mix-blend-screen pointer-events-none"}),e.jsx("div",{className:"absolute inset-0 z-10 pointer-events-none",children:e.jsx("canvas",{ref:n,className:"h-full w-full",style:{opacity:.6}})}),e.jsxs(R.div,{className:"trust-text-container relative z-30 mx-auto max-w-3xl px-8 py-12",variants:K,initial:"hidden",whileInView:"visible",viewport:{once:!0,amount:.3},style:{y:T,transform:"translateZ(0)"},children:[e.jsx(R.h2,{className:"mb-12 text-center text-4xl font-bold tracking-tight text-white drop-shadow-lg md:text-5xl",style:{fontFamily:'"Space Grotesk", sans-serif',textShadow:"0 4px 8px rgba(0,0,0,0.9), 0 0 30px rgba(0,174,239,0.4)"},initial:{opacity:0,y:30},whileInView:{opacity:1,y:0},transition:{duration:.8,ease:"easeOut"},viewport:{once:!0},children:e.jsxs("span",{className:"relative inline-block",children:["The Future Runs on Trust",e.jsx("div",{className:"trust-underline"})]})}),e.jsx("div",{className:"space-y-8 px-6 text-center text-gray-100",children:V.map((t,s)=>e.jsxs(R.p,{custom:s,variants:Y,initial:"hidden",whileInView:"visible",viewport:{once:!0,amount:.3},className:"text-lg md:text-xl",style:{fontFamily:'"Inter", sans-serif',fontWeight:500},children:[s===0&&e.jsxs(e.Fragment,{children:["AI is reshaping how we learn, heal, and"," ",e.jsx(y,{wordKey:"innovation",color:"#00AEEF",className:"font-semibold",children:"innovate"}),". This transformation holds extraordinary promise — but it depends on one essential ingredient:"," ",e.jsx(y,{wordKey:"trust",color:"#00AEEF",className:"font-semibold",children:"trust"}),"."]}),s===1&&e.jsxs(e.Fragment,{children:["That's what the"," ",e.jsx(y,{wordKey:"gtc",color:"#00AEEF",className:"font-semibold",children:"Global Trust Challenge (GTC)"})," ","was created to enable. Born from a G7 call to action, it serves as a global rallying cry to preserve trust in the digital age. The GTC is led by a"," ",e.jsx(y,{wordKey:"coalition",color:"#8b7ec8",className:"font-semibold",children:"coalition of changemakers"})," ","- including IEEE SA, OECD, and AI Commons - united by a shared commitment to transparency, accountability, and human-centered innovation."]}),s===2&&e.jsxs(e.Fragment,{children:["We're inviting"," ",e.jsx(y,{wordKey:"technologists",color:"#8b7ec8",className:"font-semibold",children:"technologists"}),","," ",e.jsx(y,{wordKey:"policymakers",color:"#8b7ec8",className:"font-semibold",children:"policymakers"}),", and"," ",e.jsx(y,{wordKey:"innovators",color:"#8b7ec8",className:"font-semibold",children:"innovators"})," ","worldwide to co-create solutions that make digital environments more transparent, reliable, and empowering for everyone. Together, we're laying the foundations of"," ",e.jsx(y,{wordKey:"digital-trust",color:"#00AEEF",className:"font-semibold",children:"digital trust"})," ","- for future generations, for industry, and for society at large."]})]},s))})]}),e.jsx("div",{className:"pointer-events-none absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#8b7ec8]/30 to-transparent"})]})]})});export{$ as default};
