import React from 'react';
import EncryptedTextDemoSecond from '@/components/encrypted-text-demo-2';
import TextHoverEffectDemo from '@/components/text-hover-effect-demo';
import AppleCardsCarouselDemo from '@/components/apple-cards-carousel-demo';
import NavbarDemo from '@/components/resizable-navbar-demo';
import FlipWordsDemo from '@/components/flip-words-demo';
import BackgroundBeamsDemo from '@/components/background-beams-demo';
import CanvasRevealEffectDemo from '@/components/canvas-reveal-effect-demo';
import GlowingEffectDemo from '@/components/glowing-effect-demo';

export default function ComponentsDemo() {
    return (
        <div className="min-h-screen bg-slate-50 pt-24 pb-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">

                <section>
                    <h2 className="text-3xl font-bold mb-8 text-slate-900">Resizable Navbar</h2>
                    <div className="border rounded-xl overflow-hidden bg-white shadow-sm h-[600px] relative">
                        <NavbarDemo />
                    </div>
                </section>

                <section>
                    <h2 className="text-3xl font-bold mb-8 text-slate-900">Encrypted Text</h2>
                    <div className="p-8 bg-white rounded-xl shadow-sm border">
                        <EncryptedTextDemoSecond />
                    </div>
                </section>

                <section>
                    <h2 className="text-3xl font-bold mb-8 text-slate-900">Flip Words</h2>
                    <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
                        <FlipWordsDemo />
                    </div>
                </section>

                <section>
                    <h2 className="text-3xl font-bold mb-8 text-slate-900">Text Hover Effect</h2>
                    <div className="bg-slate-900 rounded-xl overflow-hidden shadow-sm">
                        <TextHoverEffectDemo />
                    </div>
                </section>

                <section>
                    <h2 className="text-3xl font-bold mb-8 text-slate-900">Apple Cards Carousel</h2>
                    <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
                        <AppleCardsCarouselDemo />
                    </div>
                </section>

                <section>
                    <h2 className="text-3xl font-bold mb-8 text-slate-900">Background Beams</h2>
                    <div className="rounded-xl overflow-hidden shadow-sm">
                        <BackgroundBeamsDemo />
                    </div>
                </section>

                <section>
                    <h2 className="text-3xl font-bold mb-8 text-slate-900">Canvas Reveal Effect</h2>
                    <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
                        <CanvasRevealEffectDemo />
                    </div>
                </section>

                <section>
                    <h2 className="text-3xl font-bold mb-8 text-slate-900">Glowing Effect</h2>
                    <div className="bg-slate-50 rounded-xl shadow-sm border overflow-hidden p-8">
                        <GlowingEffectDemo />
                    </div>
                </section>

            </div>
        </div>
    );
}
