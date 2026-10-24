import React from 'react';
import { ArrowUpRight, Send } from 'lucide-react';

export const ContactButton = ({ label = "Contact Me", onClick }) => {
    return (
        <button
            onClick={onClick}
            className="group relative inline-flex items-center justify-center overflow-hidden rounded-full px-8 py-3 sm:px-10 sm:py-3.5 md:px-12 md:py-4 text-xs sm:text-sm md:text-base font-semibold uppercase tracking-widest text-slate-900 transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_0_25px_rgba(56,189,248,0.3)] bg-gradient-to-r from-sky-400 via-teal-300 to-emerald-400 hover:shadow-[0_0_35px_rgba(56,189,248,0.5)] border border-sky-200/50 cursor-pointer"
        >
            <span className="relative z-10 flex items-center gap-2">
                {label}
                <Send className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </span>
        </button>
    );
};

export const LiveProjectButton = ({ label = "Live Code / App", href = "#" }) => {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-full border border-sky-400/30 bg-sky-500/10 px-6 py-2 sm:px-8 sm:py-3 text-xs sm:text-sm md:text-base font-medium uppercase tracking-widest text-sky-200 backdrop-blur-md transition-all duration-300 hover:bg-sky-400/20 hover:border-sky-300 hover:text-white hover:shadow-[0_0_20px_rgba(56,189,248,0.25)]"
        >
            <span className="flex items-center gap-2">
                {label}
                <ArrowUpRight className="w-4 h-4" />
            </span>
        </a>
    );
};
