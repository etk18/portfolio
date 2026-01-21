import { motion } from 'framer-motion';
import { ArrowDown, Github, Linkedin, Mail, Sparkles, Code2, Brain, Zap } from 'lucide-react';
import { GlassButton } from '../hooks/useGlassTilt';

const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] },
    },
  };

  const floatingVariants = {
    animate: {
      y: [-10, 10, -10],
      rotate: [0, 5, -5, 0],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const name = "Eesh Sagar";
  const lastName = "Singh";

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Background gradient orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-20 w-[500px] h-[500px] bg-rose-500/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 -right-20 w-[400px] h-[400px] bg-amber-500/10 rounded-full blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-rose-500/5 rounded-full blur-[120px]" />
      </div>

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(var(--text-primary) 1px, transparent 1px), linear-gradient(90deg, var(--text-primary) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center min-h-[80vh]">

          {/* Left Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-left"
          >
            {/* Status badge */}
            <motion.div variants={itemVariants} className="mb-8">
              <span className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium bg-rose-500/10 backdrop-blur-md rounded-full border border-rose-500/20">
                <span className="w-2 h-2 bg-rose-400 rounded-full animate-pulse" />
                <span className="text-rose-400">Available for opportunities</span>
              </span>
            </motion.div>

            {/* Main heading */}
            <motion.div variants={itemVariants} className="mb-6 pb-2">
              <span className="block text-[var(--text-muted)] text-lg sm:text-xl font-medium mb-2">
                Hello, I'm
              </span>
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[1.1] tracking-tight overflow-visible">
                <span className="text-gradient block pb-1">{name}</span>
                <span className="text-[var(--text-primary)] block">{lastName}</span>
              </h1>
            </motion.div>

            {/* Role with typing effect style */}
            <motion.div
              variants={itemVariants}
              className="flex items-center gap-3 mb-8"
            >
              <div className="h-px w-12 bg-gradient-to-r from-rose-500 to-transparent" />
              <span className="text-lg sm:text-xl text-[var(--text-secondary)] font-medium">
                AI/ML Developer & Full Stack Engineer
              </span>
            </motion.div>

            {/* Description */}
            <motion.p
              variants={itemVariants}
              className="text-base sm:text-lg text-[var(--text-muted)] max-w-lg mb-10 leading-relaxed"
            >
              Crafting intelligent solutions with neural networks and modern web technologies.
              Turning complex data into meaningful predictions.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-3 mb-12"
            >
              <GlassButton
                href="#projects"
                className="px-6 py-3 btn-primary text-sm font-semibold flex items-center justify-center gap-2 rounded-xl"
              >
                View Projects
              </GlassButton>
              <GlassButton
                to="/ai-assistant"
                className="px-6 py-3 bg-[var(--bg-tertiary)] border border-rose-500/30 text-rose-400 hover:bg-rose-500/10 text-sm font-semibold rounded-xl flex items-center justify-center gap-2"
              >
                <Sparkles size={16} />
                <span>Ask AI</span>
              </GlassButton>
              <GlassButton
                href="#contact"
                className="px-6 py-3 bg-[var(--bg-tertiary)] border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-rose-400 hover:border-rose-500/30 text-sm font-semibold rounded-xl flex items-center justify-center gap-2"
              >
                <Mail size={16} />
                <span>Contact Me</span>
              </GlassButton>
            </motion.div>

            {/* Social Links */}
            <motion.div
              variants={itemVariants}
              className="flex items-center gap-4"
            >
              <span className="text-[var(--text-muted)] text-sm">Find me on</span>
              <div className="h-px w-8 bg-[var(--border-color)]" />
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
                  className="p-2.5 text-[var(--text-muted)] hover:text-rose-400 border border-[var(--border-color)] hover:border-rose-500/50 rounded-lg transition-all"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={social.label}
                >
                  <social.icon size={18} />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Visual */}
          <motion.div
            className="relative hidden lg:flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            {/* Central orb */}
            <div className="relative w-80 h-80">
              {/* Outer ring */}
              <motion.div
                className="absolute inset-0 rounded-full border border-rose-500/20"
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              />

              {/* Middle ring */}
              <motion.div
                className="absolute inset-8 rounded-full border border-rose-500/30"
                animate={{ rotate: -360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              />

              {/* Inner glow */}
              <div className="absolute inset-16 rounded-full bg-gradient-to-br from-rose-500/20 to-amber-500/20 backdrop-blur-sm" />

              {/* Floating icons */}
              <motion.div
                className="absolute -top-4 left-1/2 -translate-x-1/2 p-4 glass-card"
                variants={floatingVariants}
                animate="animate"
              >
                <Brain className="text-rose-400" size={28} />
              </motion.div>

              <motion.div
                className="absolute top-1/2 -right-4 -translate-y-1/2 p-4 glass-card"
                variants={floatingVariants}
                animate="animate"
                style={{ animationDelay: '2s' }}
              >
                <Code2 className="text-amber-400" size={28} />
              </motion.div>

              <motion.div
                className="absolute -bottom-4 left-1/2 -translate-x-1/2 p-4 glass-card"
                variants={floatingVariants}
                animate="animate"
                style={{ animationDelay: '4s' }}
              >
                <Zap className="text-rose-400" size={28} />
              </motion.div>

              {/* Center content */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <motion.div
                    className="text-6xl font-bold text-gradient"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    ES
                  </motion.div>
                  <div className="text-[var(--text-muted)] text-sm mt-2">Developer</div>
                </div>
              </div>
            </div>

            {/* Decorative dots */}
            <div className="absolute top-10 right-10 grid grid-cols-3 gap-2">
              {[...Array(9)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-1.5 h-1.5 rounded-full bg-rose-500/30"
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 2, delay: i * 0.2, repeat: Infinity }}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2 }}
      >
        <motion.a
          href="#about"
          className="flex flex-col items-center text-[var(--text-muted)] hover:text-rose-400 transition-colors"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className="text-xs font-medium mb-2 tracking-wider uppercase">Explore</span>
          <ArrowDown size={20} />
        </motion.a>
      </motion.div>
    </section>
  );
};

export default Hero;
