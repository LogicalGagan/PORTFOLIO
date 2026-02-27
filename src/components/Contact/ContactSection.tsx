import { motion } from 'framer-motion';
import { Mail, Linkedin, Github, Send } from 'lucide-react';

export function ContactSection() {
    return (
        <section id="contact" className="relative w-full pt-32 pb-8 overflow-hidden z-10">
            <div className="max-w-4xl mx-auto px-6 relative z-10">

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-6xl font-bold font-mono tracking-tighter mb-4">
                        Initiate_<span className="text-secondary">Connection</span>
                    </h2>
                    <p className="text-gray-400 text-lg">
                        Ready to collaborate on the next big AI innovation?
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

                    {/* Contact Form */}
                    <motion.form
                        action="https://formspree.io/f/xqazbnvp"
                        method="POST"
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        viewport={{ once: true }}
                        className="flex flex-col gap-6"
                    >
                        <div className="relative group">
                            <input
                                type="text"
                                name="name"
                                placeholder="Name"
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-secondary transition-colors"
                                required
                            />
                            <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-secondary to-transparent opacity-0 group-focus-within:opacity-100 transition-opacity" />
                        </div>

                        <div className="relative group">
                            <input
                                type="email"
                                name="email"
                                placeholder="Email Address"
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-secondary transition-colors"
                                required
                            />
                            <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-secondary to-transparent opacity-0 group-focus-within:opacity-100 transition-opacity" />
                        </div>

                        <div className="relative group">
                            <textarea
                                name="message"
                                placeholder="Message"
                                rows={4}
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-secondary transition-colors resize-none"
                                required
                            />
                            <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-secondary to-transparent opacity-0 group-focus-within:opacity-100 transition-opacity" />
                        </div>

                        <button type="submit" className="group relative w-full overflow-hidden rounded-lg bg-secondary/20 px-4 py-3 text-secondary font-bold font-mono border border-secondary/50 hover:bg-secondary/30 transition-colors flex items-center justify-center gap-2">
                            <span className="relative z-10">Transmit Payload</span>
                            <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform relative z-10" />
                            <div className="absolute inset-0 h-full w-full bg-white/10 -translate-x-full group-hover:animate-shimmer" />
                        </button>
                    </motion.form>

                    {/* Social Links & Info */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        viewport={{ once: true }}
                        className="flex flex-col justify-center space-y-8"
                    >
                        <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-sm group hover:border-primary/50 transition-colors">
                            <a href="mailto:gagangn9148@gmail.com" className="flex items-center gap-4 text-gray-300 hover:text-white">
                                <div className="p-3 bg-white/5 rounded-full text-primary group-hover:scale-110 transition-transform">
                                    <Mail size={24} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-lg">Email</h4>
                                    <p className="text-gray-500 font-mono text-sm">gagangn9148@gmail.com</p>
                                </div>
                            </a>
                        </div>

                        <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-sm group hover:border-accent/50 transition-colors">
                            <a href="https://www.linkedin.com/in/gagan-gn-9148-msrit" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 text-gray-300 hover:text-white">
                                <div className="p-3 bg-white/5 rounded-full text-accent group-hover:scale-110 transition-transform">
                                    <Linkedin size={24} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-lg">LinkedIn</h4>
                                    <p className="text-gray-500 font-mono text-sm">Connect Professionally</p>
                                </div>
                            </a>
                        </div>

                        <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-sm group hover:border-white/50 transition-colors">
                            <a href="https://github.com/LogicalGagan?tab=repositories" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 text-gray-300 hover:text-white">
                                <div className="p-3 bg-white/5 rounded-full text-white group-hover:scale-110 transition-transform">
                                    <Github size={24} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-lg">GitHub</h4>
                                    <p className="text-gray-500 font-mono text-sm">View Source Code</p>
                                </div>
                            </a>
                        </div>
                    </motion.div>

                </div>
            </div>

            <footer className="mt-16 border-t border-white/10 pt-8 pb-20 text-center relative z-20">
                <p className="text-gray-500 font-mono text-sm">
                    &copy; {new Date().getFullYear()} GAGAN G N.
                    <span className="text-primary ml-2 select-none">&lt;Built for Kuberns AI Hackathon /&gt;</span>
                </p>
            </footer>
        </section>
    );
}
