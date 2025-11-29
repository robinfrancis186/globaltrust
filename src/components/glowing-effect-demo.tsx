"use client";

import { Lightbulb, Users, Target, Award, Rocket } from "lucide-react";
import { GlowingEffect } from "@/components/ui/glowing-effect";

export default function GlowingEffectDemo() {
    return (
        <ul className="grid grid-cols-1 grid-rows-none gap-4 md:grid-cols-12 md:grid-rows-3 lg:gap-4 xl:max-h-[34rem] xl:grid-rows-2">
            <GridItem
                area="md:[grid-area:1/1/2/7] xl:[grid-area:1/1/2/5]"
                icon={<Lightbulb className="h-4 w-4 text-blue-600" />}
                title="Innovation & Trust"
                description="Building solutions that redefine digital trust in the AI age."
            />

            <GridItem
                area="md:[grid-area:1/7/2/13] xl:[grid-area:2/1/3/5]"
                icon={<Users className="h-4 w-4 text-purple-600" />}
                title="Global Collaboration"
                description="Connect with innovative minds from around the world to create impact."
            />

            <GridItem
                area="md:[grid-area:2/1/3/7] xl:[grid-area:1/5/3/8]"
                icon={<Target className="h-4 w-4 text-violet-600" />}
                title="Challenge the Status Quo"
                description="Tackle the growing risks of AI-generated content with bold ideas."
            />

            <GridItem
                area="md:[grid-area:2/7/3/13] xl:[grid-area:1/8/2/13]"
                icon={<Award className="h-4 w-4 text-indigo-600" />}
                title="Recognition & Rewards"
                description="Get recognized for your contributions to building digital trust."
            />

            <GridItem
                area="md:[grid-area:3/1/4/13] xl:[grid-area:2/8/3/13]"
                icon={<Rocket className="h-4 w-4 text-blue-500" />}
                title="Launch Your Ideas"
                description="Turn your concepts into reality with expert support and resources."
            />
        </ul>
    );
}

interface GridItemProps {
    area: string;
    icon: React.ReactNode;
    title: string;
    description: React.ReactNode;
}

const GridItem = ({ area, icon, title, description }: GridItemProps) => {
    return (
        <li className={`min-h-[14rem] list-none ${area}`}>
            <div className="relative h-full rounded-2xl border border-slate-200 p-2 md:rounded-3xl md:p-3 bg-white">
                <GlowingEffect
                    spread={40}
                    glow={true}
                    disabled={false}
                    proximity={64}
                    inactiveZone={0.01}
                />
                <div className="border-0.75 relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl p-6 md:p-6 bg-gradient-to-br from-slate-50 to-white">
                    <div className="relative flex flex-1 flex-col justify-between gap-3">
                        <div className="w-fit rounded-lg border border-slate-200 bg-white p-2 shadow-sm">
                            {icon}
                        </div>
                        <div className="space-y-3">
                            <h3 className="-tracking-4 pt-0.5 font-sans text-xl/[1.375rem] font-semibold text-balance text-slate-900 md:text-2xl/[1.875rem]">
                                {title}
                            </h3>
                            <h2 className="font-sans text-sm/[1.125rem] text-slate-600 md:text-base/[1.375rem] [&_b]:md:font-semibold [&_strong]:md:font-semibold">
                                {description}
                            </h2>
                        </div>
                    </div>
                </div>
            </div>
        </li>
    );
};
