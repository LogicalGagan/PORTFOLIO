import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ChevronDown, Terminal, BrainCircuit, Linkedin } from 'lucide-react';
import gsap from 'gsap';

export function HeroSection() {
    const [activeSide, setActiveSide] = useState<'neutral' | 'web' | 'ai'>('neutral');
    const containerRef = useRef<HTMLElement>(null);
    const nameRef = useRef<HTMLHeadingElement>(null);

    // Framer Motion shared values for split screen
    const mouseXStr = useMotionValue(0.5);
    const smoothMouseX = useSpring(mouseXStr, { damping: 20, stiffness: 100 });

    // Transform values for styling
    const leftOpacity = useTransform(smoothMouseX, [0, 0.5, 1], [1, 0.3, 0.1]);
    const rightOpacity = useTransform(smoothMouseX, [0, 0.5, 1], [0.1, 0.3, 1]);

    // Parallax shift for content
    const contentX = useTransform(smoothMouseX, [0, 1], [30, -30]);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!containerRef.current) return;
        const { clientX } = e;
        const { innerWidth } = window;

        // Direct percentage for UI (0 to 1)
        const pctX = clientX / innerWidth;
        mouseXStr.set(pctX);

        if (pctX < 0.35) {
            if (activeSide !== 'web') setActiveSide('web');
        } else if (pctX > 0.65) {
            if (activeSide !== 'ai') setActiveSide('ai');
        } else {
            if (activeSide !== 'neutral') setActiveSide('neutral');
        }
    };

    useEffect(() => {
        // Initial glitch text animation
        if (nameRef.current) {
            gsap.fromTo(nameRef.current,
                { letterSpacing: "50px", filter: "blur(20px)", opacity: 0 },
                { letterSpacing: "normal", filter: "blur(0px)", opacity: 1, duration: 1.5, ease: "expo.out" }
            );
        }
    }, []);

    return (
        <section
            ref={containerRef}
            onMouseMove={handleMouseMove}
            className="relative w-full h-screen flex flex-col items-center justify-center cursor-none"
        >
            {/* DUALITY SPLIT BACKGROUNDS */}
            {/* Left Side: Web Dev (Cyberpunk Purple) */}
            <motion.div
                className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-secondary/15 to-transparent pointer-events-none z-0"
                style={{ opacity: leftOpacity }}
            />
            {/* Right Side: AI/ML (Neon Green/Blue) */}
            <motion.div
                className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-primary/15 to-transparent pointer-events-none z-0"
                style={{ opacity: rightOpacity }}
            />

            {/* Main Content Overlay */}
            <motion.div
                style={{ x: contentX }}
                className="relative z-10 flex flex-col items-center text-center px-4 max-w-5xl w-full"
            >

                {/* Dynamic Badge */}
                <motion.div
                    className={`mb-6 flex items-center gap-2 px-6 py-2 rounded-full border border-white/20 backdrop-blur-md font-mono text-sm tracking-widest uppercase transition-colors duration-500
            ${activeSide === 'web' ? 'text-secondary border-secondary/50 bg-secondary/10 shadow-[0_0_15px_rgba(168,85,247,0.5)]' :
                            activeSide === 'ai' ? 'text-primary border-primary/50 bg-primary/10 shadow-[0_0_15px_rgba(74,222,128,0.5)]' :
                                'text-white bg-white/5'}`
                    }
                >
                    {activeSide === 'web' && <Terminal size={16} />}
                    {activeSide === 'ai' && <BrainCircuit size={16} />}
                    {activeSide === 'web' ? 'Full-Stack Protocol Active' : activeSide === 'ai' ? 'Neural Weights Loaded' : 'System Ready / Choose Path'}
                </motion.div>

                {/* Dynamic Name Glitch */}
                <div className="relative">
                    <h1
                        ref={nameRef}
                        className={`text-[5rem] md:text-[8rem] lg:text-[10rem] font-extrabold tracking-tighter mb-4 transition-all duration-700 whitespace-nowrap
                    ${activeSide === 'web' ? 'text-transparent bg-clip-text bg-gradient-to-r from-secondary via-purple-300 to-white drop-shadow-[0_0_30px_rgba(168,85,247,0.8)]' :
                                activeSide === 'ai' ? 'text-transparent bg-clip-text bg-gradient-to-l from-primary via-green-300 to-white drop-shadow-[0_0_30px_rgba(74,222,128,0.8)]' :
                                    'text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]'
                            }
                `}
                    >
                        GAGAN.
                    </h1>
                    {/* Split sub-titles representing visually */}
                    <div className="absolute inset-x-0 bottom-[10px] md:bottom-[-10px] flex justify-between px-4 md:px-12 font-mono text-xs md:text-xl font-bold opacity-80 tracking-widest mix-blend-screen pointer-events-none uppercase">
                        <motion.span style={{ opacity: leftOpacity, color: '#a855f7' }}>FULL-STACK WEB</motion.span>
                        <motion.span style={{ opacity: rightOpacity, color: '#4ade80' }}>AI & ML DEv</motion.span>
                    </div>
                </div>

                <p className="text-lg md:text-xl text-gray-300 font-light tracking-wide mt-16 mb-12 max-w-3xl bg-black/40 px-8 py-6 rounded-3xl backdrop-blur-md border border-white/5 shadow-2xl">
                    A boundary-pushing <span className="text-secondary font-bold">CSE Undergraduate</span> operating at the intersection of dynamic web interfaces and intelligent machine learning models. I build systems that are as <span className="text-primary font-bold">smart</span> as they are <span className="text-white font-bold">beautiful</span>.
                </p>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-6 items-center">
                    <a href="#terminal" className="group relative px-8 py-4 bg-white text-black font-bold uppercase tracking-widest rounded overflow-hidden transition-all hover:scale-105">
                        <span className="relative z-10 flex items-center gap-2">
                            Access Terminal
                        </span>
                        <div className={`absolute inset-0 h-full w-full -translate-x-full transition-all duration-300 group-hover:translate-x-0 group-hover:animate-shimmer
               ${activeSide === 'ai' ? 'bg-primary' : activeSide === 'web' ? 'bg-secondary' : 'bg-gray-300'}
            `} />
                    </a>

                    <a href="https://www.linkedin.com/in/gagan-gn-9148-msrit" target="_blank" rel="noopener noreferrer" className="group px-8 py-4 border border-white/20 text-white font-bold uppercase tracking-widest rounded hover:bg-white/5 transition-all flex items-center gap-2 backdrop-blur-sm">
                        <span>NETWORK</span>
                        <Linkedin size={18} className="group-hover:scale-110 transition-transform" />
                    </a>
                </div>
            </motion.div>

            <motion.div
                animate={{ opacity: [0.3, 1, 0.3], y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-sm font-mono tracking-widest pointer-events-none"
            >
                <span className="opacity-50">INITIALIZE SCROLL</span>
                <ChevronDown className="w-6 h-6" />
            </motion.div>
        </section>
    );
}
