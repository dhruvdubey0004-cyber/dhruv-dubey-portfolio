import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sparkles } from 'lucide-react';
import { personalInfo, navItems } from '../../data/portfolioData.js';
import { useContactModal } from '../../context/useContactModal.js';

export const ModernNavbar = () => {
    const { openModal } = useContactModal();
    const [scrolled, setScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState("about");
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 40);

            const sections = ["about", "price", "projects", "skills", "contact"];
            const scrollPos = window.scrollY + 250;

            for (const section of sections) {
                const el = document.getElementById(section);
                if (el) {
                    const top = el.offsetTop;
                    const height = el.offsetHeight;
                    if (scrollPos >= top && scrollPos < top + height) {
                        setActiveSection(section);
                        break;
                    }
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollTo = (id) => {
        setMobileMenuOpen(false);
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <>
            <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-4 sm:pt-6 pointer-events-none">
                <motion.div
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className={`pointer-events-auto flex items-center justify-between gap-4 sm:gap-8 px-5 sm:px-7 py-2.5 sm:py-3 rounded-full transition-all duration-500 border ${scrolled
                        ? 'bg-slate-950/80 backdrop-blur-2xl border-slate-800/80 shadow-[0_10px_30px_rgba(0,0,0,0.8)] w-full max-w-3xl'
                        : 'bg-slate-900/40 backdrop-blur-md border-slate-800/50 w-full max-w-4xl'
                        }`}
                >
                    {/* Logo / Brand identity */}
                    <button
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        className="flex items-center gap-2.5 group text-left cursor-pointer"
                    >
                        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-sky-400 via-teal-400 to-indigo-500 flex items-center justify-center text-slate-950 font-black text-xs sm:text-sm group-hover:scale-110 transition-transform shadow-md">
                            {personalInfo.name.charAt(0)}
                        </div>
                        <span className="font-bold uppercase tracking-wider text-sm sm:text-base text-slate-100">
                            {personalInfo.name} <span className="text-sky-400 text-xs font-mono font-medium tracking-normal opacity-90 hidden sm:inline">• {personalInfo.role}</span>
                        </span>
                    </button>

                    {/* Desktop Links */}
                    <nav className="hidden md:flex items-center gap-1 bg-slate-900/60 p-1 rounded-full border border-slate-800/80">
                        {navItems.map((item) => {
                            const isActive = activeSection === item.id;
                            return (
                                <button
                                    key={item.id}
                                    onClick={() => scrollTo(item.id)}
                                    className={`relative px-4 py-1.5 rounded-full text-xs lg:text-sm font-medium tracking-wider uppercase transition-colors duration-300 cursor-pointer ${isActive ? "text-sky-300" : "text-slate-400 hover:text-slate-100"
                                        }`}
                                >
                                    {isActive && (
                                        <motion.div
                                            layoutId="activePill"
                                            className="absolute inset-0 bg-sky-500/15 rounded-full border border-sky-400/30"
                                            transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                        />
                                    )}
                                    <span className="relative z-10">{item.label}</span>
                                </button>
                            );
                        })}
                    </nav>

                    {/* Hire Me CTA + Mobile Menu Toggle */}
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => openModal("Let's Build")}
                            className="hidden sm:inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-sky-500 to-teal-400 hover:from-sky-400 hover:to-teal-300 text-slate-950 font-semibold text-xs tracking-wider uppercase transition-all duration-300 hover:scale-105 active:scale-95 shadow-md shadow-sky-500/20 cursor-pointer"
                        >
                            <Sparkles className="w-3.5 h-3.5 text-slate-950" />
                            <span>Let's Build</span>
                        </button>

                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="md:hidden p-2 rounded-full bg-slate-800/60 border border-slate-700/50 text-slate-200 hover:bg-slate-700/60 transition-colors cursor-pointer"
                            aria-label="Toggle Navigation Menu"
                        >
                            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                        </button>
                    </div>
                </motion.div>
            </header>

            {/* Mobile Drawer Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-x-4 top-20 z-40 md:hidden bg-slate-950/95 backdrop-blur-2xl border border-slate-800 rounded-3xl p-6 shadow-2xl flex flex-col gap-3 text-center"
                    >
                        {navItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => scrollTo(item.id)}
                                className="py-3 text-base font-medium tracking-widest uppercase text-slate-300 hover:text-sky-400 border-b border-slate-800/80 active:bg-slate-900/50 rounded-xl transition-colors cursor-pointer"
                            >
                                {item.label}
                            </button>
                        ))}
                        <button
                            onClick={() => {
                                setMobileMenuOpen(false);
                                openModal("Let's Build");
                            }}
                            className="mt-3 py-3.5 rounded-2xl bg-gradient-to-r from-sky-400 to-teal-400 text-slate-950 uppercase tracking-widest font-bold text-sm shadow-lg shadow-sky-500/20 cursor-pointer"
                        >
                            Start a Project
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};
