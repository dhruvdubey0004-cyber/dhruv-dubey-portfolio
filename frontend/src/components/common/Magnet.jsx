import React, { useState, useEffect, useRef } from 'react';

export const Magnet = ({
    children,
    padding = 150,
    strength = 3,
    activeTransition = "transform 0.3s cubic-bezier(0.22, 1, 0.36, 1)",
    inactiveTransition = "transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)",
    className = ""
}) => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const handleMouseMove = (e) => {
            if (!ref.current) return;
            const rect = ref.current.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            const distX = e.clientX - centerX;
            const distY = e.clientY - centerY;
            const distance = Math.hypot(distX, distY);
            const maxRadius = Math.max(rect.width, rect.height) / 2 + padding;

            if (distance < maxRadius) {
                setIsHovered(true);
                setPosition({
                    x: distX / strength,
                    y: distY / strength
                });
            } else {
                setIsHovered(false);
                setPosition({ x: 0, y: 0 });
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [padding, strength]);

    const handleMouseLeave = () => {
        setIsHovered(false);
        setPosition({ x: 0, y: 0 });
    };

    return (
        <div
            ref={ref}
            onMouseLeave={handleMouseLeave}
            className={`inline-block ${className}`}
            style={{
                transform: `translate3d(${position.x}px, ${position.y}px, 0px)`,
                transition: isHovered ? activeTransition : inactiveTransition,
                willChange: 'transform'
            }}
        >
            {children}
        </div>
    );
};
