import React from 'react';
import { Code2, Database, Terminal, Cpu } from 'lucide-react';
import { FadeIn } from '../common/FadeIn.jsx';
import { AnimatedText } from '../common/AnimatedText.jsx';
import { ContactButton } from '../common/Buttons.jsx';
import { personalInfo } from '../../data/portfolioData.js';
import { useContactModal } from '../../context/useContactModal.js';

export const AboutSection = () => {
    const { openModal } = useContactModal();
    return (
        <section id="about" className="relative min-h-screen w-full flex flex-col justify-center items-center px-5 sm:px-8 md:px-12 py-24 bg-slate-950 overflow-hidden border-t border-slate-800/50">
            {/* Glow Effects */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-sky-500/5 blur-[160px] rounded-full pointer-events-none" />

            {/* 4 Corner Floating Tech Badges */}
            <FadeIn
                delay={0.1}
                x={-60}
                y={0}
                duration={0.9}
                className="absolute top-[8%] left-[2%] sm:left-[4%] md:left-[6%] p-4 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-xl pointer-events-none z-10 hidden sm:flex items-center gap-3.5 text-slate-100 shadow-xl"
            >
                <div className="p-2.5 rounded-xl bg-sky-500/10 border border-sky-400/20 text-sky-400">
                    <Code2 className="w-6 h-6" />
                </div>
                <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-200">Frontend Focus</p>
                    <p className="text-[11px] font-mono text-sky-400/80">React / Next.js / TypeScript</p>
                </div>
            </FadeIn>

            <FadeIn
                delay={0.25}
                x={-60}
                y={0}
                duration={0.9}
                className="absolute bottom-[10%] left-[2%] sm:left-[4%] md:left-[6%] p-4 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-xl pointer-events-none z-10 hidden sm:flex items-center gap-3.5 text-slate-100 shadow-xl"
            >
                <div className="p-2.5 rounded-xl bg-teal-500/10 border border-teal-400/20 text-teal-400">
                    <Database className="w-6 h-6" />
                </div>
                <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-200">Databases & Cache</p>
                    <p className="text-[11px] font-mono text-teal-400/80">Postgres / Redis / MongoDB</p>
                </div>
            </FadeIn>

            <FadeIn
                delay={0.15}
                x={60}
                y={0}
                duration={0.9}
                className="absolute top-[8%] right-[2%] sm:right-[4%] md:right-[6%] p-4 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-xl pointer-events-none z-10 hidden sm:flex items-center gap-3.5 text-slate-100 shadow-xl"
            >
                <div className="p-2.5 rounded-xl bg-indigo-500/10 border border-indigo-400/20 text-indigo-400">
                    <Terminal className="w-6 h-6" />
                </div>
                <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-200">Backend Systems</p>
                    <p className="text-[11px] font-mono text-indigo-400/80">Node.js / Python / Go</p>
                </div>
            </FadeIn>

            <FadeIn
                delay={0.3}
                x={60}
                y={0}
                duration={0.9}
                className="absolute bottom-[10%] right-[2%] sm:right-[4%] md:right-[6%] p-4 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-xl pointer-events-none z-10 hidden sm:flex items-center gap-3.5 text-slate-100 shadow-xl"
            >
                <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-400/20 text-cyan-400">
                    <Cpu className="w-6 h-6" />
                </div>
                <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-200">Cloud & Infrastructure</p>
                    <p className="text-[11px] font-mono text-cyan-400/80">AWS / Docker / Kubernetes</p>
                </div>
            </FadeIn>

            {/* Center Content Layout */}
            <div className="relative z-20 flex flex-col items-center justify-center text-center max-w-4xl mx-auto">
                <FadeIn delay={0} y={40}>
                    <h2 className="hero-heading font-black uppercase leading-none tracking-tight text-[clamp(3.2rem,11vw,150px)] mb-10 sm:mb-14">
                        About me
                    </h2>
                </FadeIn>

                <AnimatedText text={personalInfo.aboutBio} />

                <div className="mt-14 sm:mt-18">
                    <ContactButton label="Initiate Project" onClick={() => openModal("Initiate Project")} />
                </div>
            </div>
        </section>
    );
};
