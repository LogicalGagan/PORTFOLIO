import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Calendar } from 'lucide-react';

const timelineData = [
    {
        year: "2023",
        title: "Pre-University Course (PUC) — Computer Science",
        org: "Sri Venkataramana PU College, Kundapur",
        description: "Percentage: 96.64%. Strong foundation in programming and mathematics.",
        color: "#3b82f6", // electric blue
        align: "left"
    },
    {
        year: "Expected 2027",
        title: "B.E. Computer Science (AI & ML)",
        org: "Ramaiah Institute of Technology, Bengaluru",
        description: "CGPA: 9.67 / 10.00. Deep dive into algorithms, machine learning, and core computer science.",
        color: "#a855f7", // cyber purple
        align: "right"
    },
    {
        year: "2024",
        title: "Data Analyst Trainee",
        org: "Ramaiah Institute of Technology",
        description: "Performed data preprocessing, cleaning, and exploratory analysis using Pandas and NumPy. Created visualizations using Matplotlib.",
        color: "#4ade80", // neon green
        align: "left"
    }
];

export function ConstellationMap() {
    const containerRef = useRef<HTMLDivElement>(null);

    // Track scroll progress within the container for the animated line
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start center", "end center"]
    });

    const pathHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

    return (
        <section id="timeline" ref={containerRef} className="relative w-full py-32 overflow-hidden z-10">

            {/* Background stars specific to timeline */}
            <div className="absolute inset-0 opacity-20" style={{
                backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1) 1px, transparent 1px)',
                backgroundSize: '30px 30px'
            }} />

            <div className="max-w-5xl mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="text-center mb-24"
                >
                    <h2 className="text-4xl md:text-6xl font-bold font-mono tracking-tighter mb-4">
                        System.<span className="text-primary">Timeline</span>
                    </h2>
                    <p className="text-gray-400 text-lg">
                        Trajectory calculated: Education & Experience Nodes
                    </p>
                </motion.div>

                <div className="relative">
                    {/* Main vertical glowing line */}
                    <div className="absolute left-[28px] md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-[2px] bg-white/10 rounded-full" />

                    {/* Animated fill line */}
                    <motion.div
                        className="absolute left-[28px] md:left-1/2 md:-translate-x-1/2 top-0 w-[4px] bg-gradient-to-b from-primary via-secondary to-accent rounded-full shadow-[0_0_15px_rgba(168,85,247,0.5)]"
                        style={{ height: pathHeight }}
                    />

                    <div className="space-y-24">
                        {timelineData.map((item, index) => {
                            const isLeft = index % 2 === 0; // Alternating layout for desktop

                            return (
                                <div key={index} className="relative flex flex-col md:flex-row items-start md:items-center w-full group">

                                    {/* Glowing Node on the line */}
                                    <div className="absolute left-[21px] md:left-1/2 md:-translate-x-1/2 w-4 h-4 rounded-full bg-background border-2 z-20 transition-all duration-500 group-hover:scale-150 group-hover:shadow-[0_0_20px_var(--node-color)]"
                                        style={{
                                            borderColor: item.color,
                                            '--node-color': item.color
                                        } as React.CSSProperties}
                                    />

                                    {/* Content Container (Left side on desktop if isLeft, else Right) */}
                                    <div className={`w-full md:w-[45%] pl-16 md:pl-0 ${isLeft ? 'md:pr-16 md:text-right' : 'md:ml-auto md:pl-16 md:text-left'}`}>
                                        <motion.div
                                            initial={{ opacity: 0, x: isLeft ? -50 : 50, filter: 'blur(10px)' }}
                                            whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                                            viewport={{ once: true, margin: "-100px" }}
                                            transition={{ duration: 0.8, delay: 0.2 }}
                                            className="relative p-6 rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-md hover:bg-white/[0.04] transition-colors"
                                        >
                                            <div className={`flex items-center gap-2 mb-2 text-sm font-mono opacity-80 ${isLeft ? 'md:justify-end' : 'md:justify-start'}`} style={{ color: item.color }}>
                                                <Calendar size={14} />
                                                {item.year}
                                            </div>
                                            <h3 className="text-xl md:text-2xl font-bold mb-1">{item.title}</h3>
                                            <h4 className="text-gray-400 font-mono text-sm mb-4">{item.org}</h4>
                                            <p className="text-gray-300 text-sm leading-relaxed">{item.description}</p>
                                        </motion.div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
