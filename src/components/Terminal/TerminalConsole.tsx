import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Terminal as TerminalIcon, Maximize2, X, Minus } from 'lucide-react';

interface CommandLog {
    command: string;
    output: React.ReactNode;
    isError?: boolean;
}

export function TerminalConsole() {
    const [input, setInput] = useState('');
    const [logs, setLogs] = useState<CommandLog[]>([]);
    const containerRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    // Auto-scroll to bottom of terminal ONLY (prevents window scrolling)
    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.scrollTo({
                top: containerRef.current.scrollHeight,
                behavior: 'smooth'
            });
        }
    }, [logs]);

    const handleCommand = (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;

        const cmd = input.trim().toLowerCase();
        let output: React.ReactNode = '';
        let isError = false;

        switch (cmd) {
            case 'help':
                output = (
                    <div className="flex flex-col gap-1">
                        <span className="text-primary">Available commands:</span>
                        <span>- <span className="text-secondary">run nids</span> : Deploy Intrusion Detection System</span>
                        <span>- <span className="text-secondary">npm start saas</span> : Launch Team Management Platform</span>
                        <span>- <span className="text-secondary">run ai-resume</span> : Initialize Resume Analyzer Model</span>
                        <span>- <span className="text-secondary">cat skills.txt</span> : Print core competencies</span>
                        <span>- <span className="text-secondary">cd timeline</span> : View education & experience</span>
                        <span>- <span className="text-secondary">ping contact</span> : Ping the contact server</span>
                        <span>- <span className="text-secondary">clear</span> : Clear console output</span>
                        <span>- <span className="text-secondary">sudo</span> : ??</span>
                    </div>
                );
                break;
            case 'clear':
                setLogs([]);
                setInput('');
                return;
            case 'run nids':
            case 'npm start saas':
            case 'run ai-resume':
                output = <span className="text-primary italic">Execution complete. <a href="#projects" className="text-secondary underline hover:text-white transition-colors">View in Projects Matrix →</a></span>;
                break;
            case 'cat skills.txt':
                output = (
                    <div className="flex flex-col gap-1 text-gray-300 ml-4 border-l-2 border-primary/30 pl-4 py-2">
                        <span className="text-primary font-bold mb-2">[ CORE_COMPETENCIES ]</span>
                        <span>&gt; <span className="text-white">LANGUAGES:</span> Python, JavaScript/TypeScript, C/C++, SQL, HTML/CSS</span>
                        <span>&gt; <span className="text-white">AI & ML:</span> TensorFlow, PyTorch, Scikit-Learn, Pandas, NumPy, NLP</span>
                        <span>&gt; <span className="text-white">FRONTEND:</span> React.js, Next.js, Tailwind CSS, Three.js, Framer Motion</span>
                        <span>&gt; <span className="text-white">BACKEND:</span> Node.js, Express, Django, PostgreSQL, MongoDB, Redis</span>
                        <span>&gt; <span className="text-white">TOOLS:</span> Git, Docker, Linux/Bash, AWS, Vercel</span>
                    </div>
                );
                break;
            case 'cd timeline':
                output = <span className="text-accent italic">Navigating to historical nodes in 1.5 seconds... <a href="#timeline" className="text-secondary underline hover:text-white transition-colors">Jump Now →</a></span>;
                setTimeout(() => document.getElementById('timeline')?.scrollIntoView({ behavior: 'smooth' }), 1500);
                break;
            case 'ping contact':
                output = <span className="text-secondary italic">Reply from 127.0.0.1: bytes=32 time=14ms TTL=64. <a href="#contact" className="text-secondary underline hover:text-white transition-colors">Open Comm Link →</a></span>;
                break;
            case 'sudo':
            case 'sudo su':
                output = <span className="text-red-500 font-bold">ACCESS DENIED. This incident will be reported.</span>;
                isError = true;
                break;
            case 'whoami':
                output = <span className="text-primary">guest@gagan-portfolio. You are a visitor exploring the portfolio of a Full-Stack Web & AI Developer.</span>;
                break;
            default:
                output = <span>Command not found: {cmd}. Type 'help' for available commands.</span>;
                isError = true;
        }

        setLogs(prev => [...prev, { command: input, output, isError }]);
        setInput('');
    };

    return (
        <section id="terminal" className="relative w-full py-24 z-20">
            <div className="max-w-4xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                    className="w-full rounded-xl overflow-hidden border border-white/20 bg-black/80 backdrop-blur-xl shadow-[0_0_50px_rgba(168,85,247,0.15)]"
                    onClick={() => inputRef.current?.focus()}
                >
                    {/* Mac-style Window Top Bar */}
                    <div className="flex items-center justify-between px-4 py-3 bg-white/5 border-b border-white/10">
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-400 transition-colors flex items-center justify-center group cursor-pointer">
                                <X size={8} className="opacity-0 group-hover:opacity-100 text-black" />
                            </div>
                            <div className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-400 transition-colors flex items-center justify-center group cursor-pointer">
                                <Minus size={8} className="opacity-0 group-hover:opacity-100 text-black" />
                            </div>
                            <div className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-400 transition-colors flex items-center justify-center group cursor-pointer">
                                <Maximize2 size={8} className="opacity-0 group-hover:opacity-100 text-black" />
                            </div>
                        </div>
                        <div className="flex items-center gap-2 text-gray-400 font-mono text-sm opacity-50">
                            <TerminalIcon size={14} />
                            <span>guest@gagan-portfolio: ~</span>
                        </div>
                        <div className="w-16" /> {/* Spacer for alignment */}
                    </div>

                    {/* Terminal Body */}
                    <div ref={containerRef} data-lenis-prevent="true" className="p-6 font-mono text-sm md:text-base h-[400px] overflow-y-auto scrollbar-hide text-gray-300">
                        {/* Startup Text */}
                        <div className="mb-6 opacity-70">
                            <p>Welcome to Ubuntu 24.04 LTS (GNU/Linux 6.8.0-40-generic x86_64)</p>
                            <p className="mt-2 text-secondary">
                                * Last login: {new Date().toLocaleDateString()} on pts/0<br />
                                * System initialized. Neuromorphic core online.<br />
                            </p>
                            <p className="mt-4 text-primary font-bold animate-pulse">
                                {'>'} TYPE 'help' AND PRESS ENTER TO SEE AVAILABLE NAVIGATION COMMANDS.
                            </p>
                        </div>

                        {/* Log History */}
                        <div className="space-y-4">
                            {logs.map((log, i) => (
                                <div key={i} className="flex flex-col gap-1">
                                    <div className="flex gap-2 text-white">
                                        <span className="text-primary font-bold">guest@gagan:~$</span>
                                        <span>{log.command}</span>
                                    </div>
                                    <div className={log.isError ? "text-red-400" : ""}>
                                        {log.output}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Active Input Line */}
                        <form onSubmit={handleCommand} className="flex gap-2 text-white mt-4">
                            <span className="text-primary font-bold shrink-0">guest@gagan:~$</span>
                            <input
                                ref={inputRef}
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                className="bg-transparent border-none outline-none flex-1 text-white will-change-transform"
                                autoComplete="off"
                                spellCheck="false"
                            />
                        </form>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
