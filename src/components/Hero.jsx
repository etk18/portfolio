import { motion } from 'framer-motion';
import { ArrowDown, Github, Linkedin, Mail } from 'lucide-react';
import { HeroBackground } from './SectionBackgrounds';

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

  const letterVariants = {
    hidden: { opacity: 0, y: 50, rotateX: -90 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
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
          <span className="inline-block px-4 py-2 text-sm font-medium text-blue-400 bg-white/5 backdrop-blur-md rounded-full border border-white/10 shadow-lg shadow-blue-500/10">
            Welcome to my portfolio
          </span>
        </motion.div>

        <motion.h1
          className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-8"
        >
          <motion.span 
            className="block bg-gradient-to-r from-blue-400 via-blue-500 to-purple-500 bg-clip-text text-transparent text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold mb-3"
            variants={itemVariants}
          >
            Hi, I'm
          </motion.span>
          <span className="block pb-2 bg-slate-900/10 backdrop-blur-[1px] px-6 py-3 rounded-[2rem] inline-block" style={{ perspective: '1200px' }}>
            {name.split('').map((char, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, rotateY: 90, rotateX: -45, z: -200 }}
                animate={{ opacity: 1, rotateY: 0, rotateX: 0, z: 0 }}
                transition={{
                  delay: 0.8 + index * 0.1,
                  duration: 0.6,
                  ease: [0.43, 0.13, 0.23, 0.96]
                }}
                className="bg-gradient-to-r from-blue-400 via-blue-500 to-purple-500 bg-clip-text text-transparent"
                style={{
                  display: 'inline-block',
                  transformStyle: 'preserve-3d',
                  transformOrigin: 'center center',
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden',
                  overflow: 'visible',
                  lineHeight: '1.2'
                }}
              >
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            ))}
          </span>
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="text-base sm:text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-8 px-2"
        >
          An{' '}
          <span className="text-blue-400 font-medium">AI/ML Developer & Full Stack Engineer</span>{' '}
          passionate about building neural networks, deep learning models, and modern web applications.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mb-10 sm:mb-12 px-4"
        >
          <motion.a
            href="#projects"
            className="px-6 sm:px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-medium rounded-xl transition-all text-center shadow-lg shadow-blue-500/25 backdrop-blur-sm"
            whileHover={{ scale: 1.05, y: -3, rotateX: 5 }}
            whileTap={{ scale: 0.95 }}
            style={{ transformStyle: 'preserve-3d' }}
          >
            View My Work
          </motion.a>
          <motion.a
            href="#contact"
            className="px-6 sm:px-8 py-3 bg-white/5 backdrop-blur-md border border-white/10 hover:border-blue-500/50 text-slate-300 hover:text-white font-medium rounded-xl transition-all text-center shadow-lg"
            whileHover={{ scale: 1.05, y: -3, rotateX: 5 }}
            whileTap={{ scale: 0.95 }}
            style={{ transformStyle: 'preserve-3d' }}
          >
            Get In Touch
          </motion.a>
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
              className="p-3 text-slate-400 hover:text-blue-400 bg-white/5 backdrop-blur-md border border-white/10 hover:border-blue-500/50 rounded-xl transition-all shadow-lg"
              whileHover={{ scale: 1.15, y: -3, rotateY: 10 }}
              whileTap={{ scale: 0.9 }}
              style={{ transformStyle: 'preserve-3d' }}
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
          className="flex flex-col items-center text-slate-500 hover:text-blue-400 transition-colors"
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
