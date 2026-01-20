import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import AIAssistant from './components/AIAssistant';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Background3D from './components/Background3D';

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen overflow-x-hidden relative transition-colors duration-300">
        <Background3D />
        <Navbar />
        <main className="overflow-x-hidden relative z-10">
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Experience />
          <AIAssistant />
          <Contact />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
