import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Calendar, MapPin, Briefcase, Download, User } from 'lucide-react';
import { AboutBackground } from './SectionBackgrounds';
import { GlassCard, GlassButton } from '../hooks/useGlassTilt';

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const stats = [
    { label: 'GPA Score', value: '8.5' },
    { label: 'Projects Completed', value: '5+' },
    { label: 'Technologies', value: '20+' },
    { label: 'Certifications', value: '5+' },
  ];

  return (
    <section id="about" className="py-20 md:py-32 relative">
      <AboutBackground />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10" ref={ref}>
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="text-emerald-400 font-medium text-sm tracking-wider uppercase">
            About Me
          </span>
          <h2 className="section-heading text-[var(--text-primary)] mt-2">
            Get To Know Me
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-emerald-500 to-amber-500 mx-auto mt-4 rounded-full" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image/Visual Side */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="relative aspect-square max-w-xs sm:max-w-sm md:max-w-md mx-auto">
              {/* Decorative Elements */}
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-amber-500/20 rounded-2xl transform rotate-3" />
              <div className="absolute inset-0 glass-card overflow-hidden">
                {/* Profile Image */}
                <img
                  src="/profile.jpg"
                  alt="Eesh Sagar Singh"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Floating Cards */}
              <motion.div
                className="hidden sm:block absolute -top-4 -right-4 glass-card p-3 sm:p-4 z-10"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              >
                <Briefcase className="text-emerald-400 mb-1" size={20} />
                <p className="text-[var(--text-primary)] font-semibold text-sm">AI/ML</p>
                <p className="text-[var(--text-muted)] text-xs">Developer</p>
              </motion.div>

              <motion.div
                className="hidden sm:block absolute -bottom-4 -left-4 glass-card p-3 sm:p-4 z-10"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              >
                <Calendar className="text-amber-400 mb-1" size={20} />
                <p className="text-[var(--text-primary)] font-semibold text-sm">B.Tech IT</p>
                <p className="text-[var(--text-muted)] text-xs">2023-2027</p>
              </motion.div>
            </div>
          </motion.div>

          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h3 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)] mb-4">
              AI/ML Developer Based in Delhi, India
            </h3>
            <p className="text-[var(--text-secondary)] mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
              I'm an AI/ML Developer with hands-on experience building neural networks and deep learning models for predictive analytics. Proficient in Python, TensorFlow, scikit-learn, and NLP techniques with a strong foundation in full-stack development using React.js, Node.js, and modern web technologies.
            </p>
            <p className="text-[var(--text-secondary)] mb-6 sm:mb-8 leading-relaxed text-sm sm:text-base">
              Currently pursuing B.Tech in Information Technology at Maharaja Agrasen Institute of Technology with a GPA of 8.5/10. I'm passionate about leveraging machine learning to solve complex real-world problems and drive data-driven decision making.
            </p>

            {/* Info Cards */}
            <div className="grid grid-cols-2 gap-2 sm:gap-4 mb-6 sm:mb-8">
              {[
                { icon: User, label: 'Name', value: 'Eesh Sagar Singh' },
                { icon: MapPin, label: 'Location', value: 'Delhi, India' },
                { icon: Calendar, label: 'Education', value: 'B.Tech IT' },
                { icon: Briefcase, label: 'Status', value: 'Open to Work' },
              ].map((item, index) => (
                <motion.div
                  key={item.label}
                  className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 glass-card"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <item.icon className="text-emerald-400 shrink-0" size={18} />
                  <div className="min-w-0">
                    <p className="text-[var(--text-muted)] text-xs">{item.label}</p>
                    <p className="text-[var(--text-primary)] text-xs sm:text-sm font-medium truncate">{item.value}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <GlassButton
              href="/resume.pdf"
              className="inline-flex items-center gap-2 btn-primary"
            >
              <Download size={18} />
              Download Resume
            </GlassButton>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 mt-12 sm:mt-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
        >
          {stats.map((stat, index) => (
            <GlassCard
              key={stat.label}
              className="text-center p-4 sm:p-6"
              maxTilt={6}
            >
              <motion.span
                className="text-2xl sm:text-4xl md:text-5xl font-bold text-gradient"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 1 + index * 0.1 }}
              >
                {stat.value}
              </motion.span>
              <p className="text-[var(--text-muted)] mt-1 sm:mt-2 text-xs sm:text-sm">{stat.label}</p>
            </GlassCard>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default About;
