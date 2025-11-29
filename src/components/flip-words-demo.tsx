import React from "react";
import { FlipWords } from "@/components/ui/flip-words";

export default function FlipWordsDemo() {
    const words = ["Trust", "Innovation", "Collaboration", "Impact"];

    return (
        <div className="h-[40rem] w-full flex justify-center items-center px-4 bg-white">
            <div className="text-4xl mx-auto font-normal text-slate-600">
                Building Digital{" "}
                <FlipWords words={words} className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-violet-600" />
            </div>
        </div>
    );
}
