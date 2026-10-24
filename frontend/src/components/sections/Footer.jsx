import React from 'react';
import { Mail } from 'lucide-react';
import { GithubIcon, LinkedinIcon, TwitterIcon } from '../common/Icons.jsx';
import { personalInfo, socialLinks } from '../../data/portfolioData.js';

const CURRENT_YEAR = new Date().getFullYear();

export const FooterSection = () => {

    const getIconComponent = (iconName) => {
        switch (iconName.toLowerCase()) {
            case 'github':
                return <GithubIcon className="w-4 h-4" />;
            case 'linkedin':
                return <LinkedinIcon className="w-4 h-4" />;
            case 'twitter':
                return <TwitterIcon className="w-4 h-4" />;
            case 'mail':
            default:
                return <Mail className="w-4 h-4" />;
        }
    };

    return (
        <footer id="contact" className="bg-slate-950 border-t border-slate-800/80 px-6 md:px-12 py-16 text-slate-300 relative z-20">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
                <div>
                    <h3 className="hero-heading font-black text-3xl sm:text-4xl md:text-5xl uppercase tracking-tight mb-2">
                        {personalInfo.name}
                    </h3>
                    <p className="text-slate-400 uppercase text-xs sm:text-sm tracking-wider font-mono">
                        {personalInfo.role} &copy; {CURRENT_YEAR}
                    </p>
                </div>

                <div className="flex items-center gap-6 text-sm uppercase font-mono tracking-wider">
                    {socialLinks.map((link, idx) => (
                        <a
                            key={idx}
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-sky-400 transition-colors flex items-center gap-1.5"
                        >
                            {getIconComponent(link.icon)} {link.platform}
                        </a>
                    ))}
                </div>
            </div>
        </footer>
    );
};
