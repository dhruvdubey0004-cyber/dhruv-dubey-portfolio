import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, User, Mail, MessageSquare, CheckCircle2, Sparkles, Loader2, AlertCircle } from 'lucide-react';
import { useContactModal } from '../../context/useContactModal.js';

const PROJECT_TYPES = [
    "Fullstack Web App",
    "Frontend / UI Design",
    "Backend / APIs",
    "Performance & Optimization",
    "Other Consultation"
];

const BUDGET_OPTIONS = [
    "< $1k",
    "$1k - $3k",
    "$3k - $5k",
    "$5k+"
];

export const ContactModal = () => {
    const { isOpen, closeModal, source } = useContactModal();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        projectType: 'Fullstack Web App',
        budget: '$1k - $3k',
        message: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [submitError, setSubmitError] = useState(null);

    // Close on Escape key and disable body scroll
    useEffect(() => {
        if (!isOpen) return;

        const handleKeyDown = (e) => {
            if (e.key === 'Escape') closeModal();
        };

        const originalOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            document.body.style.overflow = originalOverflow;
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen, closeModal]);

    // Reset form when modal closes or opens
    useEffect(() => {
        if (!isOpen) {
            const timer = setTimeout(() => {
                setIsSubmitted(false);
                setIsSubmitting(false);
                setSubmitError(null);
            }, 300);
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitError(null);

        const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

        try {
            const response = await fetch(`${API_URL}/api/contact`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok || !data.success) {
                throw new Error(data.error || 'Failed to send message. Please try again.');
            }

            setIsSubmitted(true);
        } catch (err) {
            console.error('Contact submission error:', err);
            setSubmitError(
                err.message === 'Failed to fetch'
                    ? 'Backend server connect nahi ho pa raha (Port 5001). Kripya check karein backend chalu hai ya nahi.'
                    : err.message
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleReset = () => {
        setFormData({
            name: '',
            email: '',
            projectType: 'Fullstack Web App',
            budget: '$1k - $3k',
            message: ''
        });
        setSubmitError(null);
        setIsSubmitted(false);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        onClick={closeModal}
                        className="fixed inset-0 bg-slate-950/80 backdrop-blur-md cursor-pointer"
                        aria-hidden="true"
                    />

                    {/* Modal Dialog Card */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ type: "spring", stiffness: 350, damping: 28 }}
                        className="relative w-full max-w-2xl bg-slate-900/95 border border-slate-800 rounded-3xl p-6 sm:p-8 md:p-10 shadow-[0_20px_70px_rgba(0,0,0,0.8),0_0_40px_rgba(56,189,248,0.12)] text-slate-100 overflow-hidden my-auto pointer-events-auto"
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="contact-modal-title"
                    >
                        {/* Ambient Neon Backlights */}
                        <div className="absolute -top-24 -right-24 w-72 h-72 bg-sky-500/15 rounded-full blur-3xl pointer-events-none" />
                        <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-teal-500/15 rounded-full blur-3xl pointer-events-none" />

                        {/* Close button */}
                        <button
                            onClick={closeModal}
                            className="absolute top-5 right-5 p-2 rounded-full bg-slate-800/60 border border-slate-700/60 text-slate-400 hover:text-white hover:bg-slate-800 hover:rotate-90 transition-all duration-300 cursor-pointer z-10"
                            aria-label="Close contact modal"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        {isSubmitted ? (
                            /* Success State */
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="flex flex-col items-center text-center py-8 sm:py-12 px-4"
                            >
                                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-emerald-500/15 border border-emerald-400/30 flex items-center justify-center text-emerald-400 mb-6 shadow-[0_0_30px_rgba(52,211,153,0.3)]">
                                    <CheckCircle2 className="w-8 h-8 sm:w-10 sm:h-10" />
                                </div>

                                <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-3">
                                    Message Sent Successfully!
                                </h3>
                                <p className="text-slate-300 max-w-md text-sm sm:text-base leading-relaxed mb-8">
                                    Thank you, <span className="text-sky-400 font-semibold">{formData.name || 'there'}</span>. Your inquiry has been received. I'll review your project details and get back to you within 24 hours.
                                </p>

                                <div className="flex flex-wrap gap-3 justify-center">
                                    <button
                                        onClick={closeModal}
                                        className="px-6 py-2.5 rounded-full bg-gradient-to-r from-sky-400 to-teal-400 text-slate-950 font-semibold text-sm hover:scale-105 active:scale-95 transition-all shadow-md shadow-sky-500/20 cursor-pointer"
                                    >
                                        Done
                                    </button>
                                    <button
                                        onClick={handleReset}
                                        className="px-6 py-2.5 rounded-full bg-slate-800/80 border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-700/80 text-sm transition-all cursor-pointer"
                                    >
                                        Send Another
                                    </button>
                                </div>
                            </motion.div>
                        ) : (
                            /* Contact Form */
                            <div>
                                {/* Header */}
                                <div className="mb-6 sm:mb-8 pr-8">
                                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-400/30 text-sky-400 text-xs font-mono uppercase tracking-wider mb-3">
                                        <Sparkles className="w-3.5 h-3.5 text-sky-400" />
                                        <span>{source ? `Initiated via ${source}` : "Get in Touch"}</span>
                                    </div>
                                    <h2 id="contact-modal-title" className="text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-tight text-white leading-tight">
                                        Let's Build Something <span className="bg-gradient-to-r from-sky-400 via-teal-300 to-emerald-400 bg-clip-text text-transparent">Together</span>
                                    </h2>
                                    <p className="text-slate-400 text-xs sm:text-sm mt-2 leading-relaxed">
                                        Fill in the brief form below and let's turn your vision into a production-grade experience.
                                    </p>
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                                    {/* Name & Email Row */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        {/* Name */}
                                        <div>
                                            <label className="block text-xs font-medium uppercase tracking-wider text-slate-300 mb-1.5">
                                                Your Name <span className="text-sky-400">*</span>
                                            </label>
                                            <div className="relative">
                                                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                                                    <User className="w-4 h-4" />
                                                </div>
                                                <input
                                                    type="text"
                                                    required
                                                    value={formData.name}
                                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                    placeholder="Alex Morgan"
                                                    className="w-full bg-slate-950/70 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400/50 transition-all"
                                                />
                                            </div>
                                        </div>

                                        {/* Email */}
                                        <div>
                                            <label className="block text-xs font-medium uppercase tracking-wider text-slate-300 mb-1.5">
                                                Your Email <span className="text-sky-400">*</span>
                                            </label>
                                            <div className="relative">
                                                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                                                    <Mail className="w-4 h-4" />
                                                </div>
                                                <input
                                                    type="email"
                                                    required
                                                    value={formData.email}
                                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                    placeholder="alex@company.com"
                                                    className="w-full bg-slate-950/70 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400/50 transition-all"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Project Type Tags */}
                                    <div>
                                        <label className="block text-xs font-medium uppercase tracking-wider text-slate-300 mb-2">
                                            What are you interested in?
                                        </label>
                                        <div className="flex flex-wrap gap-2">
                                            {PROJECT_TYPES.map((type) => {
                                                const isSelected = formData.projectType === type;
                                                return (
                                                    <button
                                                        type="button"
                                                        key={type}
                                                        onClick={() => setFormData({ ...formData, projectType: type })}
                                                        className={`text-xs px-3 py-1.5 rounded-full transition-all duration-200 cursor-pointer ${isSelected
                                                            ? 'bg-sky-500/20 border border-sky-400 text-sky-300 shadow-[0_0_15px_rgba(56,189,248,0.2)]'
                                                            : 'bg-slate-950/50 border border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                                                            }`}
                                                    >
                                                        {type}
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>

                                    {/* Budget Range */}
                                    <div>
                                        <label className="block text-xs font-medium uppercase tracking-wider text-slate-300 mb-2">
                                            Estimated Budget
                                        </label>
                                        <div className="grid grid-cols-4 gap-2">
                                            {BUDGET_OPTIONS.map((budget) => {
                                                const isSelected = formData.budget === budget;
                                                return (
                                                    <button
                                                        type="button"
                                                        key={budget}
                                                        onClick={() => setFormData({ ...formData, budget })}
                                                        className={`text-xs py-1.5 rounded-xl text-center transition-all duration-200 cursor-pointer ${isSelected
                                                            ? 'bg-teal-500/20 border border-teal-400 text-teal-300 shadow-[0_0_12px_rgba(45,212,191,0.2)] font-semibold'
                                                            : 'bg-slate-950/50 border border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                                                            }`}
                                                    >
                                                        {budget}
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>

                                    {/* Message */}
                                    <div>
                                        <label className="block text-xs font-medium uppercase tracking-wider text-slate-300 mb-1.5">
                                            Project Details / Message <span className="text-sky-400">*</span>
                                        </label>
                                        <div className="relative">
                                            <div className="absolute top-3 left-3.5 pointer-events-none text-slate-500">
                                                <MessageSquare className="w-4 h-4" />
                                            </div>
                                            <textarea
                                                required
                                                rows={3}
                                                value={formData.message}
                                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                                placeholder="Tell me a bit about your idea, scope, or timeline..."
                                                className="w-full bg-slate-950/70 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400/50 transition-all resize-none"
                                            />
                                        </div>
                                    </div>

                                    {/* Error Banner */}
                                    {submitError && (
                                        <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-start gap-2.5">
                                            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                                            <span>{submitError}</span>
                                        </div>
                                    )}

                                    {/* Submit Action */}
                                    <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                                        <p className="text-[11px] text-slate-500 font-mono hidden sm:block">
                                            🔒 Your details are kept completely private.
                                        </p>

                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3 rounded-full bg-gradient-to-r from-sky-400 via-teal-300 to-emerald-400 text-slate-950 font-bold uppercase tracking-wider text-xs sm:text-sm hover:scale-105 active:scale-95 transition-all duration-300 shadow-[0_0_25px_rgba(56,189,248,0.35)] disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
                                        >
                                            {isSubmitting ? (
                                                <>
                                                    <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
                                                    <span>Submitting...</span>
                                                </>
                                            ) : (
                                                <>
                                                    <span>Send Message</span>
                                                    <Send className="w-4 h-4 text-slate-950" />
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        )}
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};
