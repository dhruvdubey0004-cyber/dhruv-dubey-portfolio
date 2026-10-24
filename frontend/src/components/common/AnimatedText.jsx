import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const AnimatedChar = ({ char, progress, range }) => {
    const opacity = useTransform(progress, range, [0.15, 1]);
    return (
        <motion.span
            style={{ opacity }}
            className={char === " " ? "whitespace-pre" : "inline-block"}
        >
            {char}
        </motion.span>
    );
};

export const AnimatedText = ({ text }) => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start 0.85', 'end 0.35']
    });

    const characters = text.split("");

    return (
        <p
            ref={containerRef}
            className="text-slate-300 font-normal text-center leading-relaxed max-w-[620px] text-[clamp(1.05rem,2vw,1.4rem)] flex flex-wrap justify-center tracking-wide"
        >
            {characters.map((char, index) => {
                const start = index / characters.length;
                const end = start + (1 / characters.length);

                return (
                    <AnimatedChar
                        key={index}
                        char={char}
                        progress={scrollYProgress}
                        range={[start, end]}
                    />
                );
            })}
        </p>
    );
};
