import React from 'react';
import { FadeIn } from '../common/FadeIn.jsx';
import { Magnet } from '../common/Magnet.jsx';
import { ContactButton } from '../common/Buttons.jsx';
import { personalInfo } from '../../data/portfolioData.js';
import { useContactModal } from '../../context/useContactModal.js';

export const HeroSection = () => {
    const { openModal } = useContactModal();

    return (
        <section className="relative min-h-screen w-full flex flex-col justify-between overflow-x-clip px-6 md:px-12 pt-28 md:pt-32 pb-8 sm:pb-10 bg-slate-950">
            {/* Glow Effects Background */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-sky-500/10 blur-[140px] rounded-full pointer-events-none" />
            <div className="absolute top-1/3 left-1/4 w-[350px] h-[350px] bg-indigo-500/10 blur-[130px] rounded-full pointer-events-none" />
            <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-teal-500/10 blur-[150px] rounded-full pointer-events-none" />

            {/* Hero Central Heading */}
            <div className="relative w-full overflow-visible mt-6 sm:mt-4 md:mt-0 z-20 pointer-events-none text-center">
                <FadeIn delay={0.15} y={40}>
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-slate-800 text-sky-400 text-xs uppercase font-mono tracking-widest mb-4 backdrop-blur-md">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /> {personalInfo.badgeText}
                    </div>
                    <h1 className="hero-heading font-black uppercase tracking-tighter leading-none whitespace-nowrap w-full text-center text-[8.5vw] min-[390px]:text-[9.2vw] sm:text-[10vw] md:text-[10.5vw] lg:text-[11vw] select-none px-2">
                        {personalInfo.heroHeading}
                    </h1>
                </FadeIn>
            </div>

            {/* Hero Portrait */}
            <FadeIn
                delay={0.5}
                y={30}
                className="absolute left-1/2 -translate-x-1/2 z-10 w-[270px] sm:w-[350px] md:w-[430px] lg:w-[500px] top-1/2 -translate-y-1/2 sm:top-auto sm:translate-y-0 sm:bottom-0 pointer-events-auto filter drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)]"
            >
                <Magnet padding={150} strength={3}>
                    <img
                        src={personalInfo.portraitUrl}
                        alt={`${personalInfo.name} Portrait`}
                        className="w-full h-auto object-contain select-none opacity-95 transition-opacity hover:opacity-100"
                        onError={(e) => {
                            e.target.src = personalInfo.portraitFallback;
                        }}
                    />
                </Magnet>
            </FadeIn>

            {/* Bottom Bar */}
            <div className="relative z-20 flex justify-between items-end w-full mt-auto">
                {/* Left Subtext */}
                <FadeIn delay={0.35} y={20}>
                    <p className="text-slate-400 font-light uppercase tracking-wider leading-relaxed text-[clamp(0.75rem,1.3vw,1.25rem)] max-w-[180px] sm:max-w-[240px] md:max-w-[300px]">
                        {personalInfo.subheading}
                    </p>
                </FadeIn>

                {/* Right Action Button */}
                <FadeIn delay={0.5} y={20}>
                    <ContactButton label="Let's Connect" onClick={() => openModal("Let's Connect")} />
                </FadeIn>
            </div>
        </section>
    );
};
