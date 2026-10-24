import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    ChevronLeft, 
    ChevronRight, 
    Play, 
    Pause, 
    Maximize2, 
    X, 
    Sparkles, 
    Cpu, 
    Layers,
    Activity
} from 'lucide-react';
import { showcaseCategories, showcaseItems } from '../../data/portfolioData.js';

export const ShowcaseSection = () => {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAutoplay, setIsAutoplay] = useState(true);
    const [isHovered, setIsHovered] = useState(false);
    const [activeItem, setActiveItem] = useState(null);
    const [direction, setDirection] = useState(1);

    const filteredItems = selectedCategory === 'all'
        ? showcaseItems
        : showcaseItems.filter(item => item.category === selectedCategory);

    const totalSlides = filteredItems.length;

    // Reset index if category changes and index is out of bounds
    const handleCategoryChange = (catId) => {
        setSelectedCategory(catId);
        setCurrentIndex(0);
    };

    const nextSlide = useCallback(() => {
        if (totalSlides <= 1) return;
        setDirection(1);
        setCurrentIndex((prev) => (prev + 1) % totalSlides);
    }, [totalSlides]);

    const prevSlide = useCallback(() => {
        if (totalSlides <= 1) return;
        setDirection(-1);
        setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
    }, [totalSlides]);

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (activeItem) return; // don't slide if modal is open
            if (e.key === 'ArrowRight') nextSlide();
            if (e.key === 'ArrowLeft') prevSlide();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [nextSlide, prevSlide, activeItem]);

    // Autoplay interval
    useEffect(() => {
        if (!isAutoplay || isHovered || totalSlides <= 1) return;
        const timer = setInterval(() => {
            nextSlide();
        }, 4800);
        return () => clearInterval(timer);
    }, [isAutoplay, isHovered, nextSlide, totalSlides, currentIndex]);

    const currentSlide = filteredItems[currentIndex] || filteredItems[0];
    const prevIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    const nextIndex = (currentIndex + 1) % totalSlides;
    const prevSlideItem = filteredItems[prevIndex];
    const nextSlideItem = filteredItems[nextIndex];

    const handleDragEnd = (_, info) => {
        const threshold = 40;
        if (info.offset.x < -threshold) {
            nextSlide();
        } else if (info.offset.x > threshold) {
            prevSlide();
        }
    };

    return (
        <section 
            id="showcase" 
            className="bg-slate-950 pt-24 pb-24 px-4 sm:px-6 md:px-12 border-t border-slate-800/60 relative overflow-hidden select-none"
        >
            {/* Ambient background glow effects */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[900px] h-[350px] bg-sky-500/10 blur-[130px] rounded-full pointer-events-none -z-0" />
            <div className="absolute bottom-10 left-10 w-[300px] h-[300px] bg-teal-500/5 blur-[100px] rounded-full pointer-events-none -z-0" />

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Header */}
                <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-10 gap-6">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-950/60 border border-sky-500/30 text-sky-400 text-xs font-mono font-medium mb-3 backdrop-blur-md">
                            <Sparkles className="w-3.5 h-3.5 animate-pulse text-sky-300" />
                            <span>Interactive Architecture Carousel</span>
                        </div>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold uppercase text-slate-100 tracking-tight">
                            Showcase <span className="bg-gradient-to-r from-sky-400 via-teal-300 to-indigo-400 bg-clip-text text-transparent">Vault</span>
                        </h2>
                        <p className="text-slate-400 text-sm sm:text-base max-w-xl mt-2 font-normal">
                            Explore live technical modules, distributed event architectures, and production microservices.
                        </p>
                    </div>

                    {/* Filter Pills & Controls */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                        <div className="flex flex-wrap gap-1.5 p-1 rounded-full bg-slate-900/80 border border-slate-800/80 backdrop-blur-md">
                            {showcaseCategories.map((cat) => (
                                <button
                                    key={cat.id}
                                    onClick={() => handleCategoryChange(cat.id)}
                                    className={`px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                                        selectedCategory === cat.id
                                            ? 'bg-gradient-to-r from-sky-400 to-teal-400 text-slate-950 shadow-md shadow-sky-500/20 font-bold'
                                            : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                                    }`}
                                >
                                    {cat.label}
                                </button>
                            ))}
                        </div>

                        {/* Top Carousel Quick Actions */}
                        <div className="flex items-center gap-2 self-end sm:self-auto">
                            <button
                                onClick={() => setIsAutoplay(!isAutoplay)}
                                title={isAutoplay ? "Pause Autoplay" : "Start Autoplay"}
                                className={`p-2 rounded-full border transition-all cursor-pointer ${
                                    isAutoplay 
                                        ? 'bg-slate-900 border-sky-500/40 text-sky-400 shadow-[0_0_15px_rgba(56,189,248,0.2)]' 
                                        : 'bg-slate-900/60 border-slate-800 text-slate-500 hover:text-slate-300'
                                }`}
                            >
                                {isAutoplay ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                            </button>

                            <div className="px-3 py-1.5 rounded-full bg-slate-900/90 border border-slate-800 font-mono text-xs text-slate-300 font-semibold tracking-wider">
                                <span className="text-sky-400 font-bold">
                                    {String(currentIndex + 1).padStart(2, '0')}
                                </span>
                                <span className="text-slate-600 mx-1">/</span>
                                <span>{String(totalSlides).padStart(2, '0')}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main 3D Carousel Stage */}
                <div 
                    className="relative w-full py-6 my-2"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    {/* Floating Navigation Arrows */}
                    <button
                        onClick={prevSlide}
                        aria-label="Previous Slide"
                        className="absolute left-2 sm:-left-3 lg:-left-6 top-1/2 -translate-y-1/2 z-30 p-3 sm:p-4 rounded-full bg-slate-900/90 border border-slate-700/80 text-slate-200 hover:text-white hover:border-sky-400 hover:bg-slate-800 shadow-xl hover:shadow-[0_0_25px_rgba(56,189,248,0.3)] transition-all duration-300 cursor-pointer backdrop-blur-md group"
                    >
                        <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 group-hover:-translate-x-0.5 transition-transform" />
                    </button>

                    <button
                        onClick={nextSlide}
                        aria-label="Next Slide"
                        className="absolute right-2 sm:-right-3 lg:-right-6 top-1/2 -translate-y-1/2 z-30 p-3 sm:p-4 rounded-full bg-slate-900/90 border border-slate-700/80 text-slate-200 hover:text-white hover:border-sky-400 hover:bg-slate-800 shadow-xl hover:shadow-[0_0_25px_rgba(56,189,248,0.3)] transition-all duration-300 cursor-pointer backdrop-blur-md group"
                    >
                        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-0.5 transition-transform" />
                    </button>

                    {/* Carousel Container */}
                    <div className="relative min-h-[460px] sm:min-h-[500px] md:min-h-[540px] flex items-center justify-center overflow-hidden px-2 sm:px-6">
                        {/* Left Peek Preview Card (Desktop) */}
                        {totalSlides > 1 && prevSlideItem && (
                            <div 
                                onClick={prevSlide}
                                className="hidden lg:block absolute left-0 w-[420px] h-[400px] rounded-3xl overflow-hidden bg-slate-900/40 border border-slate-800/60 opacity-30 blur-[0.5px] scale-[0.85] -translate-x-12 z-0 cursor-pointer hover:opacity-60 transition-all duration-500"
                            >
                                <img 
                                    src={prevSlideItem.gif} 
                                    alt={prevSlideItem.title} 
                                    className="w-full h-full object-cover filter brightness-50"
                                    onError={(e) => {
                                        e.target.src = `https://picsum.photos/600/400?random=${prevSlideItem.id}`;
                                    }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />
                                <div className="absolute bottom-6 left-6 right-6">
                                    <h4 className="text-lg font-bold text-slate-300 truncate uppercase">{prevSlideItem.title}</h4>
                                </div>
                            </div>
                        )}

                        {/* Center Active Hero Card */}
                        <AnimatePresence mode="wait" custom={direction}>
                            {currentSlide && (
                                <motion.div
                                    key={currentSlide.id}
                                    custom={direction}
                                    drag="x"
                                    dragConstraints={{ left: 0, right: 0 }}
                                    dragElastic={0.2}
                                    onDragEnd={handleDragEnd}
                                    initial={{ opacity: 0, scale: 0.92, x: direction > 0 ? 80 : -80 }}
                                    animate={{ opacity: 1, scale: 1, x: 0 }}
                                    exit={{ opacity: 0, scale: 0.92, x: direction > 0 ? -80 : 80 }}
                                    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                                    className="relative w-full max-w-3xl rounded-[28px] sm:rounded-[36px] overflow-hidden bg-slate-900/95 border border-slate-700/80 shadow-[0_20px_60px_rgba(0,0,0,0.85)] z-10 backdrop-blur-xl group hover:border-sky-500/50 transition-colors"
                                >
                                    {/* Neon Outer Halo */}
                                    <div className="absolute -inset-1 bg-gradient-to-r from-sky-500/20 via-teal-500/20 to-indigo-500/20 rounded-[38px] blur-xl opacity-60 group-hover:opacity-100 transition-opacity pointer-events-none -z-10" />

                                    {/* Card Top Banner / Metadata Bar */}
                                    <div className="px-5 sm:px-7 py-4 border-b border-slate-800/80 flex flex-wrap items-center justify-between gap-3 bg-slate-950/40">
                                        <div className="flex items-center gap-2.5">
                                            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping inline-block" />
                                            <span className="text-[11px] font-mono tracking-widest uppercase text-emerald-400 font-semibold">
                                                ACTIVE MODULE
                                            </span>
                                            <span className="text-slate-600">|</span>
                                            <span className="text-[11px] font-mono tracking-widest uppercase text-sky-300 font-medium">
                                                {currentSlide.category}
                                            </span>
                                        </div>

                                        {currentSlide.metric && (
                                            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-800/80 border border-slate-700 text-xs font-mono text-teal-300">
                                                <Activity className="w-3.5 h-3.5 text-teal-400" />
                                                <span>{currentSlide.metric}</span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Media Stage */}
                                    <div 
                                        onClick={() => setActiveItem(currentSlide)}
                                        className="relative h-[220px] sm:h-[290px] md:h-[340px] w-full bg-slate-950 overflow-hidden cursor-pointer group/media"
                                    >
                                        <img
                                            src={currentSlide.gif}
                                            alt={currentSlide.title}
                                            className="w-full h-full object-cover group-hover/media:scale-105 transition-transform duration-700 filter brightness-95 group-hover/media:brightness-105"
                                            onError={(e) => {
                                                e.target.src = `https://picsum.photos/800/500?random=${currentSlide.id}`;
                                            }}
                                        />

                                        {/* Gradient overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent opacity-85 group-hover/media:opacity-75 transition-opacity" />

                                        {/* Expand Floating Action */}
                                        <div className="absolute top-4 right-4 p-2.5 rounded-full bg-slate-900/80 border border-slate-700/80 text-slate-200 backdrop-blur-md opacity-80 group-hover/media:opacity-100 group-hover/media:scale-110 transition-all shadow-lg">
                                            <Maximize2 className="w-4 h-4 text-sky-400" />
                                        </div>

                                        {/* Overlay Title on Media */}
                                        <div className="absolute bottom-4 left-5 right-5 sm:left-7 sm:right-7">
                                            <div className="flex flex-wrap gap-2 mb-2">
                                                {currentSlide.tags.map((tag, idx) => (
                                                    <span 
                                                        key={idx} 
                                                        className="text-[10px] sm:text-[11px] uppercase tracking-wider font-mono font-medium bg-slate-900/90 border border-slate-700/80 px-2.5 py-0.5 rounded-md text-sky-300 backdrop-blur-md shadow-sm"
                                                    >
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                            <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold uppercase text-slate-100 tracking-tight drop-shadow-md">
                                                {currentSlide.title}
                                            </h3>
                                        </div>
                                    </div>

                                    {/* Card Content & Action Footer */}
                                    <div className="p-5 sm:p-7 bg-slate-900/90 border-t border-slate-800/80 flex flex-col md:flex-row md:items-center justify-between gap-4">
                                        <div className="max-w-md">
                                            {currentSlide.subtitle && (
                                                <div className="text-xs font-mono uppercase tracking-wider text-teal-400 font-semibold mb-1">
                                                    {currentSlide.subtitle}
                                                </div>
                                            )}
                                            <p className="text-xs sm:text-sm text-slate-300 line-clamp-2 leading-relaxed">
                                                {currentSlide.description || "Scalable high-performance system architecture engineered for optimal latency, security, and enterprise throughput."}
                                            </p>
                                        </div>

                                        <div className="flex items-center gap-3">
                                            <button
                                                onClick={() => setActiveItem(currentSlide)}
                                                className="w-full md:w-auto px-5 py-2.5 rounded-full bg-gradient-to-r from-sky-400 via-teal-400 to-sky-300 text-slate-950 text-xs uppercase font-extrabold tracking-wider hover:shadow-lg hover:shadow-sky-500/25 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center gap-2"
                                            >
                                                <span>Inspect System</span>
                                                <Maximize2 className="w-3.5 h-3.5" />
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Right Peek Preview Card (Desktop) */}
                        {totalSlides > 1 && nextSlideItem && (
                            <div 
                                onClick={nextSlide}
                                className="hidden lg:block absolute right-0 w-[420px] h-[400px] rounded-3xl overflow-hidden bg-slate-900/40 border border-slate-800/60 opacity-30 blur-[0.5px] scale-[0.85] translate-x-12 z-0 cursor-pointer hover:opacity-60 transition-all duration-500"
                            >
                                <img 
                                    src={nextSlideItem.gif} 
                                    alt={nextSlideItem.title} 
                                    className="w-full h-full object-cover filter brightness-50"
                                    onError={(e) => {
                                        e.target.src = `https://picsum.photos/600/400?random=${nextSlideItem.id}`;
                                    }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />
                                <div className="absolute bottom-6 left-6 right-6 text-right">
                                    <h4 className="text-lg font-bold text-slate-300 truncate uppercase">{nextSlideItem.title}</h4>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Autoplay Progress Line */}
                    {isAutoplay && !isHovered && totalSlides > 1 && (
                        <div className="max-w-md mx-auto mt-4 px-6">
                            <div className="h-1 w-full bg-slate-800/80 rounded-full overflow-hidden">
                                <motion.div
                                    key={currentIndex}
                                    initial={{ width: "0%" }}
                                    animate={{ width: "100%" }}
                                    transition={{ duration: 4.8, ease: "linear" }}
                                    className="h-full bg-gradient-to-r from-sky-400 to-teal-400 rounded-full"
                                />
                            </div>
                        </div>
                    )}

                    {/* Pagination Indicators / Thumbnail Pills */}
                    <div className="flex items-center justify-center gap-2 mt-6">
                        {filteredItems.map((item, idx) => (
                            <button
                                key={item.id}
                                onClick={() => {
                                    setDirection(idx > currentIndex ? 1 : -1);
                                    setCurrentIndex(idx);
                                }}
                                aria-label={`Jump to slide ${idx + 1}`}
                                className={`transition-all duration-300 h-2.5 rounded-full cursor-pointer ${
                                    currentIndex === idx
                                        ? 'w-10 bg-gradient-to-r from-sky-400 to-teal-400 shadow-md shadow-sky-500/40'
                                        : 'w-2.5 bg-slate-800 hover:bg-slate-700'
                                }`}
                            />
                        ))}
                    </div>

                    <div className="text-center mt-3">
                        <span className="text-[11px] font-mono text-slate-500 tracking-wider">
                            Swipe or use <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">←</kbd> <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">→</kbd> keys • Click card to expand
                        </span>
                    </div>
                </div>
            </div>

            {/* Modal Detail Preview */}
            <AnimatePresence>
                {activeItem && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setActiveItem(null)}
                        className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6"
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-slate-900 border border-slate-700 rounded-[32px] overflow-hidden max-w-3xl w-full p-6 sm:p-8 shadow-2xl relative"
                        >
                            {/* Close button */}
                            <button
                                onClick={() => setActiveItem(null)}
                                className="absolute top-5 right-5 p-2.5 rounded-full bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white transition-colors cursor-pointer border border-slate-700 z-20"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            {/* GIF preview */}
                            <div className="rounded-2xl overflow-hidden h-[260px] sm:h-[360px] mb-6 bg-slate-950 border border-slate-800 relative">
                                <img
                                    src={activeItem.gif}
                                    alt={activeItem.title}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute bottom-3 left-3 flex gap-2">
                                    <span className="px-3 py-1 rounded-full bg-slate-900/90 text-xs font-mono text-sky-300 border border-slate-700 backdrop-blur-md">
                                        {activeItem.category.toUpperCase()}
                                    </span>
                                    {activeItem.metric && (
                                        <span className="px-3 py-1 rounded-full bg-slate-900/90 text-xs font-mono text-teal-300 border border-slate-700 backdrop-blur-md">
                                            {activeItem.metric}
                                        </span>
                                    )}
                                </div>
                            </div>

                            {/* Meta & Info */}
                            <div>
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                                    <h3 className="text-2xl sm:text-3xl font-extrabold uppercase text-slate-100">
                                        {activeItem.title}
                                    </h3>
                                </div>

                                {activeItem.subtitle && (
                                    <p className="text-sm font-mono text-teal-400 uppercase tracking-wider mb-3">
                                        {activeItem.subtitle}
                                    </p>
                                )}

                                <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
                                    {activeItem.description || "Engineered with resilient microservice patterns, low-overhead networking, and robust state coordination across distributed environments."}
                                </p>

                                <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-800">
                                    <div className="flex flex-wrap gap-2">
                                        {activeItem.tags.map((tag, i) => (
                                            <span 
                                                key={i} 
                                                className="text-xs font-mono bg-sky-950/60 border border-sky-500/30 text-sky-300 px-3 py-1 rounded-full"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    <button
                                        onClick={() => setActiveItem(null)}
                                        className="px-6 py-2.5 rounded-full bg-gradient-to-r from-sky-400 to-teal-400 text-slate-950 text-xs uppercase font-extrabold tracking-wider hover:opacity-90 transition-opacity cursor-pointer shadow-lg shadow-sky-500/20"
                                    >
                                        Close Preview
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};
