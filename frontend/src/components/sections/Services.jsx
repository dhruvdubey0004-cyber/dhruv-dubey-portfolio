import React from 'react';
import { FadeIn } from '../common/FadeIn.jsx';
import { servicesData } from '../../data/portfolioData.js';

export const ServicesSection = () => {
    return (
        <section id="price" className="bg-slate-100 text-slate-900 rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-6 sm:px-10 md:px-14 py-24 sm:py-28 md:py-32 relative z-10 shadow-2xl">
            <div className="max-w-5xl mx-auto">
                <h2 className="text-slate-900 font-black uppercase text-center text-[clamp(3rem,11vw,150px)] leading-none tracking-tight mb-16 sm:mb-20 md:mb-24">
                    Services
                </h2>

                <div className="flex flex-col">
                    {servicesData.map((item, i) => (
                        <FadeIn key={item.num} delay={i * 0.1} className="w-full">
                            <div className="flex flex-col md:flex-row items-start md:items-center justify-between py-8 sm:py-10 md:py-12 border-b border-slate-300 gap-4 md:gap-8 hover:border-sky-500 transition-colors">
                                <div className="font-black text-slate-900 text-[clamp(2.8rem,9vw,120px)] leading-none select-none tracking-tighter">
                                    {item.num}
                                </div>

                                <div className="flex flex-col gap-2 md:w-3/5">
                                    <h3 className="font-bold uppercase text-[clamp(1.2rem,2.2vw,2rem)] leading-tight text-slate-900">
                                        {item.name}
                                    </h3>
                                    <p className="font-normal leading-relaxed text-[clamp(0.9rem,1.5vw,1.15rem)] text-slate-600 max-w-2xl">
                                        {item.desc}
                                    </p>
                                </div>
                            </div>
                        </FadeIn>
                    ))}
                </div>
            </div>
        </section>
    );
};
