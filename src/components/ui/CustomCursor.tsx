import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

export function CustomCursor() {
    const cursorRef = useRef<HTMLDivElement>(null);
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        let animationFrameId: number;
        // Start near center roughly, will snap instantly on first move
        let targetX = window.innerWidth / 2;
        let targetY = window.innerHeight / 2;

        const updateMousePosition = (e: MouseEvent) => {
            targetX = e.clientX;
            targetY = e.clientY;

            const target = e.target as HTMLElement;
            if (
                target.closest('a, button, input, textarea, [role="button"]') ||
                target.tagName.toLowerCase() === 'canvas'
            ) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        const render = () => {
            if (cursorRef.current) {
                // Direct DOM manipulation for absolute ZERO lag. Bypasses React state completely.
                cursorRef.current.style.transform = `translate3d(${targetX}px, ${targetY}px, 0) translate(-50%, -50%)`;
            }
            animationFrameId = requestAnimationFrame(render);
        };

        window.addEventListener('mousemove', updateMousePosition);
        render(); // start loop

        return () => {
            window.removeEventListener('mousemove', updateMousePosition);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <motion.div
            ref={cursorRef}
            className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-screen flex items-center justify-center"
            animate={{
                scale: isHovering ? 1.5 : 1,
                rotate: isHovering ? 45 : 0
            }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        >
            {/* Space Targeting Reticle */}
            <div className={`relative flex items-center justify-center transition-colors duration-300 ${isHovering ? 'text-primary' : 'text-white'}`}>
                {/* Center dot */}
                <div className="absolute w-1 h-1 bg-current rounded-full" />

                {/* Outer targeting ring */}
                <div className="absolute w-8 h-8 border border-current opacity-40 rounded-full" />

                {/* Crosshairs */}
                <div className="absolute w-12 h-px bg-current opacity-40" />
                <div className="absolute h-12 w-px bg-current opacity-40" />

                {/* Corner brackets */}
                {isHovering && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="absolute w-10 h-10 border-2 border-transparent border-t-current border-l-current opacity-50 rounded-tl-lg"
                    />
                )}
            </div>
        </motion.div>
    );
}
