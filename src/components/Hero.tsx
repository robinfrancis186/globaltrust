import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import ShinyButton from './ShinyButton';
import { EncryptedText } from '@/components/ui/encrypted-text';
import { FlipWords } from '@/components/ui/flip-words';

const Hero = () => {
    const words = ["Trust", "Innovation", "Collaboration", "Impact"];

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-12 px-4 sm:px-6 lg:px-8">

            {/* Spline Background */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <iframe
                    src="https://my.spline.design/holographicearthwithdynamiclines-Txss0UBWNbhy4HVGL2xZX8mr"
                    frameBorder="0"
                    width="100%"
                    height="100%"
                    className="w-full h-full opacity-60"
                ></iframe>
            </div>

            {/* Main Card Container */}
            <div className="relative z-10 w-full max-w-7xl mx-auto">
                <div
                    className="relative bg-white/60 backdrop-blur-xl border border-white/20 rounded-3xl p-8 sm:p-12 md:p-16 shadow-2xl overflow-hidden animate-scaleIn animation-delay-200"
                >
                    {/* Background Gradient/Texture inside card */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-white/10 pointer-events-none"></div>

                    <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                        {/* Left: Headline */}
                        <div className="lg:col-span-7 space-y-8">
                            <div className="inline-block animate-fadeInDown animation-delay-300">
                                <span className="px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-sm font-semibold tracking-wide uppercase flex items-center">
                                    <EncryptedText
                                        text="Global Trust Challenge 2025"
                                        encryptedClassName="text-blue-400"
                                        revealedClassName="text-blue-600"
                                    />
                                </span>
                            </div>

                            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-slate-900 leading-[1.1] animate-fadeInLeft animation-delay-400">
                                Building Digital <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-violet-600">
                                    <FlipWords words={words} className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-violet-600" />
                                </span>
                            </h1>

                            <p className="text-lg sm:text-xl text-slate-600 max-w-2xl leading-relaxed animate-fadeInLeft animation-delay-500">
                                Join the world's most innovative minds in a global challenge to redefine trust in the digital age.
                                Connect, collaborate, and create impact.
                            </p>

                            <div className="flex flex-wrap gap-6 animate-fadeInUp animation-delay-600 pt-4">
                                <ShinyButton onClick={() => document.getElementById('register')?.scrollIntoView({ behavior: 'smooth' })}>
                                    Register Now
                                </ShinyButton>

                                <Link
                                    to="/about"
                                    className="group flex items-center gap-2 px-8 py-4 rounded-full bg-white border border-slate-200 text-slate-700 font-medium hover:bg-slate-50 hover:border-slate-300 transition-all duration-300 shadow-sm hover:shadow-md"
                                >
                                    Learn More
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </div>
                        </div>

                        {/* Right: Visual/3D Element Placeholder or Secondary Content */}
                        <div className="lg:col-span-5 relative hidden lg:block h-[400px]">
                            {/* We can put another Spline or image here if needed, or just let the background shine through */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 to-purple-500/10 rounded-2xl blur-3xl animate-pulse-slow"></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
