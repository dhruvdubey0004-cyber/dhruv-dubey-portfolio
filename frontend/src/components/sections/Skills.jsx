import React from 'react';
import { motion } from 'framer-motion';
import { FadeIn } from '../common/FadeIn.jsx';
import { skillCategories } from '../../data/portfolioData.js';

export const SkillsSection = () => {
    return (
        <section id="skills" className="bg-slate-950 border-t border-slate-800/80 px-6 md:px-12 py-24 relative z-20">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                    <span className="text-sky-400 uppercase tracking-widest text-xs font-mono font-semibold">Technical Proficiency</span>
                    <h2 className="hero-heading font-black uppercase text-[clamp(2.5rem,8vw,120px)] leading-none tracking-tight mt-2">
                        Skills & Stack
                    </h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {skillCategories.map((category, catIdx) => (
                        <FadeIn key={catIdx} delay={catIdx * 0.15} className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 md:p-8 flex flex-col justify-between hover:border-sky-500/40 transition-all duration-300 shadow-xl backdrop-blur-md">
                            <div>
                                <h3 className="text-lg font-bold uppercase text-slate-100 mb-6 flex items-center gap-2.5">
                                    <span className="w-2.5 h-2.5 rounded-full bg-sky-400 shadow-[0_0_10px_rgba(56,189,248,0.8)] inline-block" />
                                    {category.title}
                                </h3>

                                <div className="flex flex-col gap-5">
                                    {category.skills.map((skill, sIdx) => (
                                        <div key={sIdx} className="space-y-2">
                                            <div className="flex justify-between text-xs sm:text-sm font-medium uppercase text-slate-300">
                                                <span>{skill.name}</span>
                                                <span className="text-sky-400 font-mono font-semibold">{skill.level}%</span>
                                            </div>
                                            <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    whileInView={{ width: `${skill.level}%` }}
                                                    viewport={{ once: true }}
                                                    transition={{ duration: 1, delay: sIdx * 0.1 }}
                                                    className="h-full rounded-full bg-gradient-to-r from-sky-400 via-teal-300 to-indigo-400 shadow-[0_0_12px_rgba(56,189,248,0.5)]"
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </FadeIn>
                    ))}
                </div>
            </div>
        </section>
    );
};
