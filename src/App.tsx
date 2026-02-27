import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { Canvas } from '@react-three/fiber';
import { ParticleField } from './components/Hero/ParticleField';
import { HeroSection } from './components/Hero/HeroSection';
import { TerminalConsole } from './components/Terminal/TerminalConsole';
import { SkillsLab } from './components/Skills/SkillsLab';
import { ProjectsMatrix } from './components/Projects/ProjectsMatrix';
import { ConstellationMap } from './components/Timeline/ConstellationMap';
import { ContactSection } from './components/Contact/ContactSection';
import { CustomCursor } from './components/ui/CustomCursor';

function App() {
  const mousePos = useRef({ x: 0, y: 0 });

  // Initialize smooth scrolling with Lenis
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.1, // Smoothness
      wheelMultiplier: 1,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    mousePos.current.x = (clientX / innerWidth) * 2 - 1;
    mousePos.current.y = (clientY / innerHeight) * 2 - 1;
  };

  return (
    <div onMouseMove={handleMouseMove} className="relative min-h-screen bg-background selection:bg-secondary/30 text-white font-sans w-full overflow-x-clip">
      <CustomCursor />

      {/* Global Interactive Neural Network Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Canvas camera={{ position: [0, 0, 20], fov: 60 }}>
          <ambientLight intensity={0.5} />
          <ParticleField mousePos={mousePos} />
        </Canvas>
      </div>

      <main className="relative z-10 w-full">
        <HeroSection />
        <TerminalConsole />
        <SkillsLab />
        <ProjectsMatrix />
        <ConstellationMap />
        <ContactSection />
      </main>
    </div>
  );
}

export default App;
