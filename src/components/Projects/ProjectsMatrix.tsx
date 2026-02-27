import { ProjectCard } from './ProjectCard';
import { motion } from 'framer-motion';

const projects = [
    {
        title: "Intelligent NIDS",
        description: "Real-time network intrusion detection system to analyze live traffic and identify malicious activities securely.",
        features: [
            "Packet capture & protocol analysis (TCP/IP)",
            "Security rule evaluation for threat monitoring",
            "Machine learning for anomaly detection (DoS, probing)"
        ],
        tags: ["Python", "Machine Learning", "Networking"],
        color: "#ef4444", // Cyberpunk Red
        status: "PROPRIETARY"
    },
    {
        title: "Team Management SaaS",
        description: "Full-featured team productivity platform (Mini Jira/Notion) for managing projects, tasks, and collaboration.",
        features: [
            "Authentication & role-based access control",
            "Interactive Kanban board with drag-and-drop",
            "Activity logs, deadlines, priorities & comments"
        ],
        tags: ["Next.js", "TypeScript", "Tailwind", "Prisma"],
        color: "#3b82f6", // Electric Blue
        status: "BETA"
    },
    {
        title: "AI Resume Analyzer",
        description: "An AI-powered resume analysis platform with seamless authentication and a clean, reusable UI.",
        features: [
            "Resume upload and decentralized storage",
            "Candidate-job matching using intelligent AI evaluations",
            "Real-time feedback generation and scoring"
        ],
        tags: ["React", "TypeScript", "Puter.js", "AI Models"],
        color: "#a855f7", // Cyberpunk Purple
        status: "IN DEVELOPMENT"
    },
    {
        title: "NeuroVision Medical Dashboard",
        description: "A full-stack diagnostic platform integrating a custom CNN model to analyze MRI scans for early anomaly detection in real-time.",
        features: [
            "DICOM Viewer with WebGL rendering",
            "Real-time Inference using TensorFlow.js",
            "Doctor Note Syncing via WebSockets"
        ],
        tags: ["React", "TensorFlow.js", "Node.js", "PostgreSQL"],
        color: "#10b981", // Emerald
        status: "ARCHIVED"
    },
    {
        title: "FinSight Predictive Analytics",
        description: "Algorithmic trading dashboard that ingests live market data and uses LSTM networks to forecast short-term asset volatility.",
        features: [
            "Live WebSockets for market feeds",
            "Time-series Forecasting with PyTorch",
            "Interactive Charts with Recharts"
        ],
        tags: ["PyTorch", "Next.js", "Redis", "Tailwind"],
        color: "#6366f1", // Indigo
        status: "PROPRIETARY"
    },
    {
        title: "Sentinel Auto-Moderator",
        description: "A highly scalable moderation bot relying on heavy NLP transformers to detect toxic speech and spam across platforms.",
        features: [
            "Zero-shot Classification",
            "Webhook Integration",
            "Admin Analytics Panel"
        ],
        tags: ["HuggingFace", "Python", "Express", "React"],
        color: "#f59e0b", // Orange
        status: "ACTIVE MODEL"
    }
];

export function ProjectsMatrix() {
    return (
        <section id="projects" className="relative w-full min-h-screen py-32 z-10">
            <div className="max-w-7xl mx-auto px-6">

                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="mb-20"
                >
                    <div className="flex items-center gap-4 mb-4">
                        <div className="h-[2px] w-12 bg-primary"></div>
                        <h2 className="text-4xl md:text-6xl font-bold font-mono tracking-tighter">
                            Projects_Matrix
                        </h2>
                    </div>
                    <p className="text-gray-400 text-lg md:text-xl max-w-2xl pl-16">
                        Core systems engineered for scale, security, and intelligence.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project, index) => (
                        <ProjectCard
                            key={index}
                            {...project}
                            delay={index * 0.2}
                        />
                    ))}
                </div>

            </div>

            {/* Decorative background grid */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
                style={{
                    backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
                    backgroundSize: `50px 50px`
                }}
            />
        </section>
    );
}
