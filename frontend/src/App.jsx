import React from 'react';
import { ModernNavbar } from './components/sections/Navbar.jsx';
import { HeroSection } from './components/sections/Hero.jsx';
import { ShowcaseSection } from './components/sections/Showcase.jsx';
import { AboutSection } from './components/sections/About.jsx';
import { ServicesSection } from './components/sections/Services.jsx';
import { ProjectsSection } from './components/sections/Projects.jsx';
import { SkillsSection } from './components/sections/Skills.jsx';
import { FooterSection } from './components/sections/Footer.jsx';
import { ContactModalProvider } from './context/ContactModalContext.jsx';
import { ContactModal } from './components/common/ContactModal.jsx';

export default function App() {
    return (
        <ContactModalProvider>
            <main className="w-full min-h-screen bg-slate-950 text-slate-100 overflow-x-clip font-['Plus_Jakarta_Sans'] relative">
                <ModernNavbar />
                <HeroSection />
                <ShowcaseSection />
                <AboutSection />
                <ServicesSection />
                <ProjectsSection />
                <SkillsSection />
                <FooterSection />
                <ContactModal />
            </main>
        </ContactModalProvider>
    );
}