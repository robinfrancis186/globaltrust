import{j as e}from"./vendor-animations-BP-4myv3.js";import{u as A,b as I,r as M}from"./vendor-react-DK7iIRbm.js";import{c as R,L as B,A as W,U as F}from"./index-BHplPlb4.js";import{C as E}from"./calendar-C6pxKPLM.js";/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const x=R("CheckCircle",[["path",{d:"M22 11.08V12a10 10 0 1 1-5.93-9.14",key:"g774vq"}],["path",{d:"m9 11 3 3L22 4",key:"1pflzl"}]]);function D(){const a=A(),l=I(),u=(o,t=600)=>{const n=o.getBoundingClientRect().top+window.pageYOffset,i=window.pageYOffset,m=n-i;let h=null;const g=c=>c<.5?4*c*c*c:1-Math.pow(-2*c+2,3)/2,p=c=>{h===null&&(h=c);const f=c-h,w=Math.min(f/t,1),y=g(w);window.scrollTo(0,i+m*y),f<t&&requestAnimationFrame(p)};requestAnimationFrame(p)},b=o=>{if(o.preventDefault(),a.pathname!=="/")l("/?scroll=pre-registration");else{const t=document.getElementById("pre-registration");t&&u(t,600)}},k=M.useRef(null);return M.useEffect(()=>{const o=k.current;if(!o)return;const t=o.getContext("2d");if(!t)return;let n=0,i=0,m=1,h=[],g=0,p;const c=()=>{const s=o.parentElement;if(!s)return;const r=s.getBoundingClientRect();n=r.width,i=r.height,(n===0||i===0)&&(n=s.clientWidth||window.innerWidth,i=s.clientHeight||window.innerHeight),m=Math.min(Math.max(window.devicePixelRatio||1,1),2),o.width=Math.floor(n*m),o.height=Math.floor(i*m),o.style.width=`${n}px`,o.style.height=`${i}px`,t.setTransform(m,0,0,m,0,0);const d=Math.floor(n*i/1200);h=new Array(d).fill(0).map(()=>({x:Math.random()*n,y:Math.random()*i,depth:.25+Math.random()*.75,radius:.4+Math.random()*1.2,twinkle:Math.random()*Math.PI*2,twinkleSpeed:.002+Math.random()*.006}))},f=()=>{const s=t.createLinearGradient(0,0,0,i);s.addColorStop(0,"#f8fafc"),s.addColorStop(1,"#eff6ff"),t.fillStyle=s,t.fillRect(0,0,n,i)},w=()=>{const s=g*4e-5;t.globalCompositeOperation="multiply";const r=n*(.25+.05*Math.sin(s*6)),d=i*(.35+.04*Math.cos(s*5)),j=Math.max(n,i)*.75,N=t.createRadialGradient(r,d,0,r,d,j);N.addColorStop(0,"rgba(99, 102, 241, 0.05)"),N.addColorStop(1,"transparent"),t.fillStyle=N,t.fillRect(0,0,n,i);const S=n*(.7+.07*Math.cos(s*4)),T=i*(.6+.05*Math.sin(s*3)),z=Math.max(n,i)*.85,_=t.createRadialGradient(S,T,0,S,T,z);_.addColorStop(0,"rgba(59, 197, 255, 0.05)"),_.addColorStop(1,"transparent"),t.fillStyle=_,t.fillRect(0,0,n,i),t.globalCompositeOperation="source-over"},y=s=>{for(const r of h){r.twinkle+=r.twinkleSpeed*s;const d=.75+.25*Math.sin(r.twinkle),j=r.radius*(1+(1-r.depth)*.5)*d;t.fillStyle=`hsla(220, 70%, ${40+10*d}%, ${.3+.2*d})`,t.beginPath(),t.arc(r.x,r.y,j,0,Math.PI*2),t.fill()}};let v=performance.now();const C=s=>{const r=s-v;v=s,g+=r,f(),w(),y(r),p=requestAnimationFrame(C)},P=new ResizeObserver(c);return o.parentElement&&P.observe(o.parentElement),setTimeout(()=>{c(),v=performance.now(),p=requestAnimationFrame(C)},0),()=>{p&&cancelAnimationFrame(p),P.disconnect()}},[]),e.jsxs("div",{className:"idea-cta",children:[e.jsx("canvas",{ref:k,className:"idea-cta-canvas"}),e.jsx("div",{className:"idea-cta-vignette","aria-hidden":"true"}),e.jsxs("div",{className:"max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center idea-cta__content",children:[e.jsxs("div",{className:"idea-cta__iconWrap",children:[e.jsx("span",{className:"idea-cta__iconGlow","aria-hidden":!0}),e.jsx(B,{className:"idea-cta__icon",strokeWidth:1.6})]}),e.jsx("h2",{className:"idea-cta__title",children:"Got an Idea?"}),e.jsx("p",{className:"idea-cta__subtitle",children:"Pre-register now to be among the first to submit your innovative solution"}),e.jsxs("a",{href:"#pre-registration",onClick:b,className:"idea-cta__chip",children:["Pre-register now",e.jsx("span",{className:"idea-cta__chipArrow",children:e.jsx(W,{size:20,strokeWidth:2.4})}),e.jsx("span",{className:"idea-cta__chipHalo","aria-hidden":!0})]})]}),e.jsx("style",{children:`
          .idea-cta {
            position: relative;
            padding: clamp(3rem, 6vw, 5.5rem) 0;
            color: #0f172a;
            overflow: hidden;
            background: #f8fafc;
          }
          .idea-cta-canvas {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            display: block;
            pointer-events: none;
            z-index: 0;
          }
          .idea-cta-vignette {
            position: absolute;
            inset: 0;
            pointer-events: none;
            z-index: 1;
            background:
              linear-gradient(180deg, rgba(255,255,255,0.5), transparent 40%),
              radial-gradient(80% 70% at 50% 10%, rgba(255,255,255,0.0), rgba(255,255,255,0.2) 60%, rgba(255,255,255,0.4) 100%);
          }
          .idea-cta__content {
            min-height: clamp(18rem, 36vw, 24rem);
            display: flex;
            flex-direction: column;
            justify-content: center;
            position: relative;
            z-index: 10;
          }
          .idea-cta__iconWrap {
            position: relative;
            width: 4.1rem;
            height: 4.1rem;
            margin: clamp(0.3rem, 1.4vw, 1.25rem) auto clamp(1.4rem, 2.2vw, 1.8rem);
            display: flex;
            align-items: center;
            justify-content: center;
            isolation: isolate;
          }
          .idea-cta__iconGlow {
            position: absolute;
            inset: -40%;
            border-radius: 50%;
            background:
              radial-gradient(circle at 40% 35%, rgba(59, 130, 246, 0.25) 0%, transparent 72%),
              radial-gradient(circle at 70% 70%, rgba(147, 51, 234, 0.15) 0%, transparent 80%);
            filter: blur(16px);
            animation: ideaIconBloom 5.5s ease-in-out infinite alternate;
            opacity: 0.75;
          }
          .idea-cta__icon {
            position: relative;
            width: 2.5rem;
            height: 2.5rem;
            color: #2563eb;
            filter:
              drop-shadow(0 10px 20px rgba(59, 130, 246, 0.2))
              drop-shadow(0 0 18px rgba(147, 51, 234, 0.3));
            animation: ideaIconPulse 3s ease-in-out infinite;
          }
          .idea-cta__title {
            margin: 0 0 0.85rem 0;
            font-family: "Barlow Condensed", "Inter", sans-serif;
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: 0.2em;
            font-size: clamp(2.45rem, 6.5vw, 3.75rem);
            background: linear-gradient(92deg, #1e3a8a 0%, #2563eb 38%, #3b82f6 72%, #60a5fa 100%);
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent;
            text-shadow: none;
          }
          .idea-cta__subtitle {
            margin: 0 auto clamp(1.1rem, 2.4vw, 1.8rem);
            max-width: 46rem;
            color: #475569;
            font-family: "Inter", "Barlow", sans-serif;
            font-size: clamp(1.1rem, 2.2vw, 1.25rem);
            line-height: 1.7;
            letter-spacing: 0.02em;
            text-shadow: none;
          }
          .idea-cta__chip {
            position: relative;
            display: inline-flex;
            align-items: center;
            gap: 0.75rem;
            padding: 0.95rem 1.9rem;
            border-radius: 999px;
            font-family: "Inter", system-ui, sans-serif;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.16em;
            color: #ffffff;
            background: linear-gradient(120deg, #2563eb, #1d4ed8);
            box-shadow: 0 18px 44px rgba(37, 99, 235, 0.2);
            transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.35s ease, color 0.35s ease;
            isolation: isolate;
          }
          .idea-cta__chip::before {
            content: "";
            position: absolute;
            inset: -1px;
            border-radius: inherit;
            padding: 1px;
            background: linear-gradient(120deg, #60a5fa, #3b82f6, #2563eb);
            -webkit-mask:
              linear-gradient(#fff 0 0) content-box,
              linear-gradient(#fff 0 0);
            -webkit-mask-composite: xor;
                    mask-composite: exclude;
            pointer-events: none;
            opacity: 0.95;
          }
          .idea-cta__chip::after {
            content: "";
            position: absolute;
            inset: 0;
            border-radius: inherit;
            background: radial-gradient(circle at 50% 0%, rgba(255,255,255,0.4), transparent 65%);
            opacity: 0;
            transition: opacity 0.35s ease;
            pointer-events: none;
          }
          .idea-cta__chipArrow {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            transition: transform 0.35s ease;
          }
          .idea-cta__chipHalo {
            position: absolute;
            inset: -25%;
            border-radius: inherit;
            background:
              radial-gradient(circle, rgba(37, 99, 235, 0.2) 0%, transparent 45%),
              radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, transparent 70%);
            filter: blur(12px);
            opacity: 0.55;
            transition: opacity 0.35s ease, transform 0.35s ease;
            z-index: -1;
          }
          .idea-cta__chip:hover,
          .idea-cta__chip:focus-visible {
            transform: translateY(-4px);
            box-shadow: 0 28px 60px rgba(37, 99, 235, 0.3);
            color: #ffffff;
          }
          .idea-cta__chip:hover::after,
          .idea-cta__chip:focus-visible::after {
            opacity: 1;
          }
          .idea-cta__chip:hover .idea-cta__chipHalo,
          .idea-cta__chip:focus-visible .idea-cta__chipHalo {
            opacity: 0.7;
            transform: scale(1.05);
          }
          .idea-cta__chip:hover .idea-cta__chipArrow,
          .idea-cta__chip:focus-visible .idea-cta__chipArrow {
            transform: translateX(4px);
          }
          @keyframes ideaIconPulse {
            0%, 100% { opacity: 0.7; transform: scale(0.97); }
            50% { opacity: 1; transform: scale(1.04); }
          }
          @keyframes ideaIconBloom {
            0% { transform: scale(0.95); opacity: 0.65; }
            100% { transform: scale(1.05); opacity: 0.85; }
          }
          @media (prefers-reduced-motion: reduce) {
            .idea-cta__icon,
            .idea-cta__iconGlow,
            .idea-cta__chip {
              animation: none !important;
            }
            .idea-cta__chip {
              transition: none;
            }
          }
        `})]})}function O(){return e.jsxs("div",{className:"flex flex-col min-h-screen",children:[e.jsxs("section",{className:"relative h-[600px] overflow-hidden -mt-16",children:[e.jsx("div",{className:"absolute inset-0 bg-cover bg-center heroStyle",style:{backgroundImage:'url("https://maximages.s3.us-west-1.amazonaws.com/photo-1451187580459-43490279c0fa.webp")'}}),"  ",e.jsx("div",{className:"absolute inset-0 bg-slate-900/40"}),e.jsx("div",{className:"relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center",children:e.jsxs("div",{className:"text-white max-w-3xl pt-16",children:[e.jsx("h1",{className:"text-5xl font-bold mb-6",style:{fontFamily:'"Barlow Condensed", serif',fontWeight:"800",textTransform:"uppercase",fontSize:"5.5rem"},children:"Challenge Details"}),e.jsx("p",{className:"text-xl mb-8 text-slate-100",children:"Everything you need to know about participating in the Global Trust Challenge"})]})})]}),e.jsx("section",{className:"py-20 bg-white relative z-10",children:e.jsxs("div",{className:"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",children:[e.jsx("h2",{className:"text-3xl font-bold mb-12 text-slate-900",style:{fontFamily:'"Barlow Condensed", serif',fontWeight:"800",textTransform:"uppercase",fontSize:"2.5rem"},children:"What We Are Looking For"}),e.jsx("div",{className:"grid md:grid-cols-1 gap-12 items-start",children:e.jsxs("div",{children:[e.jsx("p",{className:"text-lg text-slate-600 mb-6",children:"The Global Trust Challenge seeks groundbreaking solutions that combine technological innovation with policy frameworks to address the challenges of AI-generated content."}),e.jsx("p",{className:"text-lg text-slate-600 mb-6",style:{marginBottom:"20px"},children:"Submissions should incorporate:"}),e.jsx("ul",{className:"space-y-4 text-lg text-slate-600",children:["Policy Approaches that support the integrity of information in the age of generative AI. ","Technological Solutions that align with proposed policies, such as mechanisms for transparency, feedback loops, and content verification.","Testing and Validation Plans to pilot solutions in real-world settings and demonstrate scalability."].map((a,l)=>e.jsxs("li",{className:"flex items-center",children:[e.jsx(x,{className:"text-blue-600 mr-2",size:20}),e.jsx("span",{children:a})]},l))}),e.jsx("p",{className:"text-lg text-slate-600 mb-6",style:{marginBottom:"10px",marginTop:"20px"},children:"The challenge encourages innovative and forward-thinking solutions, fostering creativity and interdisciplinary collaboration. Teams are expected to offer practical, scalable ideas that can shape the future of digital information integrity."})]})})]})}),e.jsx(D,{}),e.jsx("section",{className:"py-20 bg-white",children:e.jsx("div",{className:"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",children:e.jsxs("div",{className:"bg-white rounded-lg p-4 mb-4",children:[e.jsx("h3",{className:"text-2xl font-bold mb-8 text-slate-900",style:{fontFamily:'"Barlow Condensed", serif',fontWeight:"800",textTransform:"uppercase",fontSize:"2.2rem"},children:"Who Can Participate?"}),e.jsx("div",{className:"grid md:grid-cols-1 gap-12 items-start",children:e.jsx("div",{children:e.jsx("p",{className:"text-lg text-slate-600 mb-6",children:"We welcome multidisciplinary teams from around the world—whether you’re a technologist, policymaker, researcher, or advocate. If you have a bold idea to address the challenges of generative AI, we want to hear from you. Don’t have a full team? Start the process and pre-register, and you will have to gather the right team. We’ll support you with experts to bring your vision to life."})})})]})})}),e.jsxs("section",{className:"py-20 bg-slate-50",children:[e.jsxs("div",{className:"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16",children:[e.jsx("h3",{className:"text-2xl font-bold mb-8 text-slate-900",style:{fontFamily:'"Barlow Condensed", serif',fontWeight:"800",textTransform:"uppercase",fontSize:"2.2rem"},children:"Key Phases of the Challenge"}),e.jsx("div",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8",children:[{icon:E,phase:"Phase 1",title:"Proposal Submission",duration:"[Date TBD]",description:"Teams propose integrated models combining new policies and technologies, outlining implementation plans, stakeholders, resources, and expected outcomes."},{icon:F,phase:"Phase 2",title:"Prototype Development",duration:"[Date TBD]",description:"Teams design and test prototypes based on their policy and technological solutions. Prototypes are evaluated in real-world settings."},{icon:x,phase:"Phase 3",title:"Pilot and Scale",duration:"[Date TBD]",description:"Successful prototypes are piloted in collaboration with institutional partners. Teams develop strategies for scaling their solutions to maximize impact."}].map((a,l)=>e.jsxs("div",{className:"bg-white p-6 rounded-lg shadow-md border border-slate-100",children:[e.jsx(a.icon,{className:"w-12 h-12 text-blue-600 mb-4"}),e.jsx("h4",{className:"text-lg font-semibold text-blue-600 mb-2",children:a.phase}),e.jsx("h5",{className:"text-xl font-bold mb-2 text-slate-900",children:a.title}),e.jsx("p",{className:"text-slate-600 mb-2",children:a.duration}),e.jsx("p",{className:"text-slate-500",children:a.description})]},l))})]}),e.jsxs("div",{className:"bg-white rounded-lg  p-8 mb-16 shadow-sm border border-slate-100",children:[e.jsx("h3",{className:"text-2xl font-bold mb-8 text-slate-900",style:{fontFamily:'"Barlow Condensed", serif',fontWeight:"800",textTransform:"uppercase",fontSize:"2.2rem"},children:"Submission Requirements"}),e.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-8",children:[e.jsxs("div",{children:[e.jsx("h4",{className:"text-xl font-semibold mb-4 text-slate-900",children:"Project Requirements"}),e.jsx("ul",{className:"space-y-3",children:[{title:"Policy Approach Formulation",description:"Innovative policy ideas that support technology solutions to ensure trust in AI-generated content."},{title:"Technological Solutions",description:"Technologies that support policy goals, including features for transparency, security, and accountability."},{title:"Testing and Validation Plan",description:"A roadmap for implementing, testing, and scaling the solutions, including stakeholder roles, resource requirements, and evaluation metrics."}].map((a,l)=>e.jsxs("li",{className:"bg-slate-50 p-3 rounded-lg border border-slate-100",children:["    ",e.jsx(x,{className:"text-green-600 mr-2 mt-1 flex-shrink-0",style:{display:"inline"},size:20}),e.jsxs("span",{className:"text-m font-bold text-slate-900",children:[a.title,": "]}),e.jsx("span",{className:"text-slate-600",children:a.description})]},l))})]}),e.jsxs("div",{children:[e.jsx("h4",{className:"text-xl font-semibold mb-4 text-slate-900",children:"Team Requirements"}),e.jsx("ul",{className:"space-y-3",children:["Members must be 18 years or older","International teams welcome","Teams of 2-5 members","At least one technical member"].map((a,l)=>e.jsxs("li",{className:"flex items-start",children:[e.jsx(x,{className:"text-green-600 mr-2 mt-1 flex-shrink-0",size:20}),e.jsx("span",{className:"text-slate-700",children:a.text||a})]},l))})]})]})]}),e.jsxs("div",{className:"bg-white rounded-lg p-8 mb-16 shadow-sm border border-slate-100",children:[e.jsx("h3",{className:"text-2xl font-bold mb-8 text-slate-900",style:{fontFamily:'"Barlow Condensed", serif',fontWeight:"800",textTransform:"uppercase",fontSize:"2.2rem"},children:"Evaluation Criteria"}),e.jsx("div",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8",children:[{title:"Phase 1",description:"Proposal Evaluation",criteria:["Relevance","Feasibility","Innovation","Risk Management"]},{title:"Phase 2",description:"Prototype Evaluation",criteria:["Usability","Scalability","Technical innovation","Ethical compliance"]},{title:"Phase 3",description:"Pilot and Scale Evaluation",criteria:["Pilot execution","Resilience against threats","Long-term viability"]}].map((a,l)=>e.jsxs("div",{className:"border border-slate-200 rounded-lg p-6 bg-slate-50",children:[e.jsx("h4",{className:"text-xl font-semibold mb-2 text-slate-900",children:a.title}),e.jsx("p",{className:"text-blue-600 font-bold mb-4",children:a.description}),e.jsx("ul",{className:"space-y-2",children:a.criteria.map((u,b)=>e.jsxs("li",{className:"flex items-center",children:[e.jsx(x,{className:"text-green-600 mr-2 flex-shrink-0",size:16}),e.jsx("span",{className:"text-slate-600",children:u})]},b))})]},l))})]})]})]})}export{O as default};
