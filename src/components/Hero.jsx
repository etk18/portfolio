import { motion } from 'framer-motion';
import { ArrowDown, Github, Linkedin, Mail } from 'lucide-react';
import { HeroBackground } from './SectionBackgrounds';
import { GlassButton } from '../hooks/useGlassTilt';

const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  const name = "Eesh Sagar Singh";

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <HeroBackground />

      <motion.div
        className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="mb-6">
          <span className="inline-block px-4 py-2 text-sm font-medium text-emerald-400 bg-emerald-500/10 backdrop-blur-md rounded-full border border-emerald-500/20">
            Welcome to my portfolio
          </span>
        </motion.div>

        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6"
          variants={itemVariants}
        >
          <span className="block text-[var(--text-secondary)] text-xl sm:text-2xl md:text-3xl font-medium mb-4">
            Hi, I'm
          </span>
          <span className="text-gradient">{name}</span>
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="text-base sm:text-lg md:text-xl text-[var(--text-secondary)] max-w-2xl mx-auto mb-8 px-2"
        >
          An <span className="text-emerald-400 font-medium">AI/ML Developer & Full Stack Engineer</span>{' '}
          passionate about building neural networks, deep learning models, and modern web applications.
        </motion.p>

        {/* CTA Buttons with Glass Effect */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mb-10 sm:mb-12 px-4"
        >
          <GlassButton
            href="#projects"
            className="btn-primary text-center"
          >
            View My Work
          </GlassButton>
          <GlassButton
            href="#ai-assistant"
            className="px-6 py-3 bg-gradient-to-r from-emerald-500/20 to-amber-500/20 border border-emerald-500/40 text-emerald-400 hover:text-emerald-300 font-medium rounded-xl text-center"
          >
            ✨ Ask AI Assistant
          </GlassButton>
          <GlassButton
            href="#contact"
            className="px-6 py-3 bg-[var(--bg-tertiary)] border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] font-medium rounded-xl text-center"
          >
            Get In Touch
          </GlassButton>
        </motion.div>

        {/* Social Links */}
        <motion.div
          variants={itemVariants}
          className="flex justify-center gap-4"
        >
          {[
            { icon: Github, href: 'https://github.com/etk18', label: 'GitHub' },
            { icon: Linkedin, href: 'https://linkedin.com/in/etk18', label: 'LinkedIn' },
            { icon: Mail, href: 'mailto:eeshsagar@gmail.com', label: 'Email' },
          ].map((social) => (
            <motion.a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 text-[var(--text-muted)] hover:text-emerald-400 bg-[var(--bg-tertiary)] border border-[var(--border-color)] rounded-xl transition-all"
              whileHover={{ scale: 1.15, y: -3 }}
              whileTap={{ scale: 0.9 }}
              aria-label={social.label}
            >
              <social.icon size={20} />
            </motion.a>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5 }}
      >
        <motion.a
          href="#about"
          className="flex flex-col items-center text-[var(--text-muted)] hover:text-emerald-400 transition-colors"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className="text-xs font-medium mb-2">Scroll Down</span>
          <ArrowDown size={20} />
        </motion.a>
      </motion.div>
    </section>
  );
};

export default Hero;
