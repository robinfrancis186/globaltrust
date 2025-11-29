"use client";
import React from "react";
import { AnimatePresence, motion } from "motion/react";
import { CanvasRevealEffect } from "@/components/ui/canvas-reveal-effect";

export default function CanvasRevealEffectDemo() {
    return (
        <div className="py-20 flex flex-col lg:flex-row items-center justify-center bg-white w-full gap-4 mx-auto px-8">
            <Card title="Context & Insights" icon={<TrustIcon />}>
                <CanvasRevealEffect
                    animationSpeed={5.1}
                    containerClassName="bg-blue-900"
                    colors={[[59, 130, 246]]}
                />
            </Card>
            <Card title="Infrastructure & Tools" icon={<TrustIcon />}>
                <CanvasRevealEffect
                    animationSpeed={3}
                    containerClassName="bg-purple-900"
                    colors={[
                        [139, 92, 246],
                        [168, 85, 247],
                    ]}
                    dotSize={2}
                />
                <div className="absolute inset-0 [mask-image:radial-gradient(400px_at_center,white,transparent)] bg-black/50" />
            </Card>
            <Card title="Legitimacy & Impact" icon={<TrustIcon />}>
                <CanvasRevealEffect
                    animationSpeed={3}
                    containerClassName="bg-violet-600"
                    colors={[[124, 58, 237]]}
                />
            </Card>
        </div>
    );
}

const Card = ({
    title,
    icon,
    children,
}: {
    title: string;
    icon: React.ReactNode;
    children?: React.ReactNode;
}) => {
    const [hovered, setHovered] = React.useState(false);
    return (
        <div
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className="border border-slate-200 group/canvas-card flex items-center justify-center max-w-sm w-full mx-auto p-4 relative h-[30rem]"
        >
            <Icon className="absolute h-6 w-6 -top-3 -left-3 text-slate-700" />
            <Icon className="absolute h-6 w-6 -bottom-3 -left-3 text-slate-700" />
            <Icon className="absolute h-6 w-6 -top-3 -right-3 text-slate-700" />
            <Icon className="absolute h-6 w-6 -bottom-3 -right-3 text-slate-700" />

            <AnimatePresence>
                {hovered && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="h-full w-full absolute inset-0"
                    >
                        {children}
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="relative z-20">
                <div className="text-center group-hover/canvas-card:-translate-y-4 group-hover/canvas-card:opacity-0 transition duration-200 w-full mx-auto flex items-center justify-center">
                    {icon}
                </div>
                <h2 className="text-slate-900 text-xl opacity-0 group-hover/canvas-card:opacity-100 relative z-10 mt-4 font-bold group-hover/canvas-card:text-white group-hover/canvas-card:-translate-y-2 transition duration-200 text-center">
                    {title}
                </h2>
            </div>
        </div>
    );
};

const TrustIcon = () => {
    return (
        <svg
            width="66"
            height="65"
            viewBox="0 0 66 65"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10 text-slate-700 group-hover/canvas-card:text-white"
        >
            <path
                d="M8 8.05571C8 8.05571 54.9009 18.1782 57.8687 30.062C60.8365 41.9458 9.05432 57.4696 9.05432 57.4696"
                stroke="currentColor"
                strokeWidth="15"
                strokeMiterlimit="3.86874"
                strokeLinecap="round"
            />
        </svg>
    );
};

export const Icon = ({ className, ...rest }: any) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className={className}
            {...rest}
        >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
        </svg>
    );
};
