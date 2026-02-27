import { motion } from 'framer-motion';

const skillsData = [
    // Core Programming
    { name: 'Python', category: 'core', group: 0 },
    { name: 'C++', category: 'core', group: 0 },
    { name: 'Java', category: 'core', group: 0 },
    { name: 'SQL', category: 'core', group: 0 },

    // Web & Full-Stack
    { name: 'React', category: 'web', group: 1 },
    { name: 'Node.js', category: 'web', group: 1 },
    { name: 'Next.js', category: 'web', group: 1 },
    { name: 'TypeScript', category: 'web', group: 1 },
    { name: 'Tailwind', category: 'web', group: 1 },
    { name: 'Express', category: 'web', group: 1 },
    { name: 'MongoDB', category: 'web', group: 1 },

    // AI & ML
    { name: 'TensorFlow', category: 'ai', group: 2 },
    { name: 'PyTorch', category: 'ai', group: 2 },
    { name: 'Keras', category: 'ai', group: 2 },
    { name: 'Pandas', category: 'ai', group: 2 },
    { name: 'Scikit-Learn', category: 'ai', group: 2 },
    { name: 'NumPy', category: 'ai', group: 2 },

    // DevOps & Tools
    { name: 'Docker', category: 'tools', group: 3 },
    { name: 'Git', category: 'tools', group: 3 },
    { name: 'Linux', category: 'tools', group: 3 },
    { name: 'AWS', category: 'tools', group: 3 },
];

const categoryColors: Record<string, string> = {
    'core': '#3b82f6', // blue
    'web': '#a855f7',  // purple
    'ai': '#4ade80',   // green
    'tools': '#f59e0b' // yellow
};

function Hexagon({ skill, index }: { skill: any, index: number }) {
    const color = categoryColors[skill.category];

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{
                duration: 0.5,
                delay: index * 0.05,
                type: "spring",
                stiffness: 200,
                damping: 15
            }}
            whileHover={{ scale: 1.15, zIndex: 50, filter: `drop-shadow(0 0 20px ${color})` }}
            className="relative flex items-center justify-center cursor-pointer transition-all duration-300 group"
            style={{
                width: '120px',
                height: '138px', // Approx width * 1.154 for perfect hex
                clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                margin: '-15px -4px', // Tighter spacing to overlap and form grid
            }}
        >
            {/* Background with border effect */}
            <div className="absolute inset-[2px] bg-black/80 backdrop-blur-xl z-0"
                style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }} />
            <div className="absolute inset-0 z-[-1] opacity-50 transition-opacity group-hover:opacity-100"
                style={{ backgroundColor: color }} />

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center gap-2 p-2 text-center">
                <span className="font-mono text-sm font-bold tracking-wider text-gray-300 group-hover:text-white transition-colors">
                    {skill.name}
                </span>
            </div>
        </motion.div>
    );
}

export function SkillsLab() {
    return (
        <section id="skills" className="relative w-full min-h-screen py-32 flex flex-col items-center overflow-hidden z-20">

            {/* Deep Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-secondary/10 rounded-full blur-[150px] pointer-events-none" />

            <div className="text-center mb-16 relative z-10 w-full max-w-7xl mx-auto px-6 pointer-events-none">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <div className="flex items-center justify-center gap-4 mb-4">
                        <h2 className="text-4xl md:text-6xl font-black font-mono tracking-tighter drop-shadow-[0_0_20px_rgba(168,85,247,0.4)]">
                            &lt;<span className="text-secondary">System_Capabilities</span> /&gt;
                        </h2>
                    </div>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg font-light">
                        Core tech stack arrayed in a high-density logic grid. Focus on clarity and power.
                    </p>
                </motion.div>
            </div>

            {/* Hexagon Grid Container */}
            <div className="relative z-20 w-fit mx-auto px-4 flex flex-col items-center">

                {/* We arrange them in rows manually to force the honeycomb pattern */}
                <div className="flex justify-center -mb-8">
                    {skillsData.slice(0, 5).map((skill, i) => <Hexagon key={skill.name} skill={skill} index={i} />)}
                </div>
                <div className="flex justify-center -mb-8">
                    {skillsData.slice(5, 11).map((skill, i) => <Hexagon key={skill.name} skill={skill} index={i + 5} />)}
                </div>
                <div className="flex justify-center -mb-8">
                    {skillsData.slice(11, 18).map((skill, i) => <Hexagon key={skill.name} skill={skill} index={i + 11} />)}
                </div>
                <div className="flex justify-center -mb-8">
                    {skillsData.slice(18, 23).map((skill, i) => <Hexagon key={skill.name} skill={skill} index={i + 18} />)}
                </div>

            </div>

            {/* Legend */}
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="flex flex-wrap justify-center gap-8 mt-24 text-sm font-mono z-10 bg-black/40 backdrop-blur-md border border-white/10 px-8 py-4 rounded-full"
            >
                <div className="flex items-center gap-3"><div className="w-3 h-3 rounded shadow-[0_0_10px_#3b82f6] bg-[#3b82f6]"></div> Core Programming</div>
                <div className="flex items-center gap-3"><div className="w-3 h-3 rounded shadow-[0_0_10px_#a855f7] bg-[#a855f7]"></div> Full-Stack Web</div>
                <div className="flex items-center gap-3"><div className="w-3 h-3 rounded shadow-[0_0_10px_#4ade80] bg-[#4ade80]"></div> Artificial Intelligence</div>
                <div className="flex items-center gap-3"><div className="w-3 h-3 rounded shadow-[0_0_10px_#f59e0b] bg-[#f59e0b]"></div> Cloud & DevOps</div>
            </motion.div>

        </section>
    );
}
