import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { LiveProjectButton } from '../common/Buttons.jsx';
import { projectsData } from '../../data/portfolioData.js';

const ProjectCard = ({ project, index, progress, range, targetScale }) => {
    const containerRef = useRef(null);
    const scale = useTransform(progress, range, [1, targetScale]);

    return (
        <div ref={containerRef} className="h-[85vh] flex items-center justify-center sticky top-24 md:top-32">
            <motion.div
                style={{
                    scale,
                    top: `calc(${index * 28}px)`
                }}
                className="w-full rounded-[35px] sm:rounded-[45px] md:rounded-[55px] border border-slate-700/80 bg-slate-900/95 p-5 sm:p-7 md:p-9 flex flex-col justify-between shadow-[0_20px_50px_rgba(0,0,0,0.8)] relative overflow-hidden backdrop-blur-xl"
            >
                <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-slate-800">
                    <div className="flex items-baseline gap-4 sm:gap-6">
                        <span className="font-black text-[clamp(2rem,5vw,4.5rem)] leading-none text-sky-400 font-mono">
                            {project.num}
                        </span>
                        <div className="flex flex-col">
                            <span className="text-xs sm:text-sm text-slate-400 font-mono uppercase tracking-widest">
                                {project.category}
                            </span>
                            <h3 className="text-lg sm:text-2xl md:text-3xl font-extrabold uppercase text-slate-100">
                                {project.title}
                            </h3>
                        </div>
                    </div>

                    <LiveProjectButton href={project.link} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mt-5 flex-1 items-stretch">
                    <div className="md:col-span-5 flex flex-col gap-4">
                        <div className="w-full rounded-[25px] sm:rounded-[35px] overflow-hidden bg-slate-950 border border-slate-800 h-[clamp(130px,16vw,220px)]">
                            <img
                                src={project.img1}
                                alt={`${project.title} Tech Stack`}
                                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                                onError={(e) => {
                                    e.target.src = "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80";
                                }}
                            />
                        </div>
                        <div className="w-full rounded-[25px] sm:rounded-[35px] overflow-hidden bg-slate-950 border border-slate-800 h-[clamp(160px,22vw,320px)]">
                            <img
                                src={project.img2}
                                alt={`${project.title} Architecture`}
                                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                                onError={(e) => {
                                    e.target.src = "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop&q=80";
                                }}
                            />
                        </div>
                    </div>

                    <div className="md:col-span-7 rounded-[25px] sm:rounded-[35px] overflow-hidden bg-slate-950 border border-slate-800 h-full min-h-[240px]">
                        <img
                            src={project.img3}
                            alt={`${project.title} Live Application`}
                            className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                            onError={(e) => {
                                e.target.src = "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&auto=format&fit=crop&q=80";
                            }}
                        />
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export const ProjectsSection = () => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end end']
    });

    return (
        <section
            id="projects"
            ref={containerRef}
            className="bg-slate-950 rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 relative z-20 px-5 sm:px-8 md:px-12 pt-24 pb-32 border-t border-slate-800/80"
        >
            <div className="max-w-5xl mx-auto text-center mb-16">
                <h2 className="hero-heading font-black uppercase text-[clamp(3rem,11vw,150px)] leading-none tracking-tight">
                    Projects
                </h2>
            </div>

            <div className="max-w-6xl mx-auto flex flex-col gap-10">
                {projectsData.map((project, i) => {
                    const targetScale = 1 - (projectsData.length - 1 - i) * 0.03;
                    return (
                        <ProjectCard
                            key={project.num}
                            project={project}
                            index={i}
                            progress={scrollYProgress}
                            range={[i * (1 / projectsData.length), 1]}
                            targetScale={targetScale}
                        />
                    );
                })}
            </div>
        </section>
    );
};
