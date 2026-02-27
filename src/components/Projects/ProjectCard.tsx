import { useRef, useState } from 'react';
import { motion, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion';
import { Github } from 'lucide-react';

interface ProjectProps {
    title: string;
    description: string;
    tags: string[];
    features: string[];
    color: string;
    status?: string;
    delay?: number;
}

export function ProjectCard({ title, description, tags, features, color, status, delay = 0 }: ProjectProps) {
    const ref = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);

    // Mouse position for 3D tilt
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    // Smooth the mouse values
    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    // Map mouse position to rotation values (-15 to +15 degrees)
    const rotateX = useMotionTemplate`${mouseYSpring}deg`;
    const rotateY = useMotionTemplate`${mouseXSpring}deg`;

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;

        // Mouse position relative to center of card
        const mouseX = e.clientX - rect.left - width / 2;
        const mouseY = e.clientY - rect.top - height / 2;

        // Convert to degrees (max tilt 8deg)
        const xPct = (mouseX / width) * 16; // -8 to +8
        const yPct = (mouseY / height) * -16; // Invert Y

        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay }}
            className="relative [perspective:1000px] w-full"
        >
            <motion.div
                ref={ref}
                onMouseMove={handleMouseMove}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={handleMouseLeave}
                style={{
                    rotateX,
                    rotateY,
                    transformStyle: "preserve-3d",
                }}
                className={`relative w-full h-full rounded-2xl p-8 border border-white/10 bg-[#0a0a0a]/80 backdrop-blur-md transition-shadow duration-500`}
            >
                {/* Glow effect that follows mouse/tilt */}
                <div
                    className="absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 pointer-events-none"
                    style={{
                        background: `radial-gradient(circle at center, ${color}30 0%, transparent 70%)`,
                        opacity: isHovered ? 1 : 0
                    }}
                />

                <div style={{ transform: "translateZ(20px)" }} className="relative z-10 flex flex-col h-full pointer-events-none">
                    <div className="flex justify-between items-start mb-4">
                        <h3 className="text-2xl font-bold font-mono tracking-tight" style={{ color }}>{title}</h3>
                        <div className="flex items-center gap-3 pointer-events-auto">
                            {status && (
                                <span className="px-2 py-0.5 text-[0.65rem] font-bold font-mono tracking-wider rounded border border-white/20 whitespace-nowrap" style={{ color: color, backgroundColor: `${color}10`, borderColor: `${color}30` }}>
                                    {status}
                                </span>
                            )}
                            <a href="https://github.com/LogicalGagan?tab=repositories" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors relative z-50">
                                <Github size={20} />
                            </a>
                        </div>
                    </div>

                    <p className="text-gray-300 mb-6 text-sm md:text-base leading-relaxed">
                        {description}
                    </p>

                    <ul className="mb-8 space-y-2 text-sm text-gray-400">
                        {features.map((feat, i) => (
                            <li key={i} className="flex items-start gap-2">
                                <span className="text-white/30 mt-1">▹</span>
                                {feat}
                            </li>
                        ))}
                    </ul>

                    <div className="flex flex-wrap gap-2 mt-auto">
                        {tags.map((tag) => (
                            <span
                                key={tag}
                                className="px-3 py-1 text-xs font-mono rounded bg-white/5 border border-white/10 text-white/80"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}
