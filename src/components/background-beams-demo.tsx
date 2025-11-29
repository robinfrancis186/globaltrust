"use client";
import React from "react";
import { BackgroundBeams } from "@/components/ui/background-beams";

export default function BackgroundBeamsDemo() {
    return (
        <div className="h-[40rem] w-full rounded-md bg-slate-900 relative flex flex-col items-center justify-center antialiased">
            <div className="max-w-2xl mx-auto p-4">
                <h1 className="relative z-10 text-lg md:text-7xl bg-clip-text text-transparent bg-gradient-to-b from-blue-200 to-blue-600 text-center font-sans font-bold">
                    Global Trust Challenge
                </h1>
                <p className="text-slate-400 max-w-lg mx-auto my-2 text-sm text-center relative z-10">
                    Join the world's most innovative minds in a global challenge to redefine trust in the digital age.
                    Connect, collaborate, and create impact.
                </p>
                <input
                    type="text"
                    placeholder="your@email.com"
                    className="rounded-lg border border-slate-700 focus:ring-2 focus:ring-blue-500 w-full relative z-10 mt-4 bg-slate-950 placeholder:text-slate-600 px-4 py-3 text-white"
                />
            </div>
            <BackgroundBeams />
        </div>
    );
}
