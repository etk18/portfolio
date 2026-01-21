import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Calendar, MapPin, Briefcase, Download, GraduationCap, Award, Target, Rocket } from 'lucide-react';
import { GlassCard, GlassButton } from '../hooks/useGlassTilt';

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <section id="about" className="py-24 md:py-32 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-rose-500/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-amber-500/5 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10" ref={ref}>
        {/* Section Header */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-4 mb-4">
            <span className="text-rose-400 font-medium text-sm tracking-wider uppercase">About Me</span>
            <div className="h-px flex-1 max-w-[100px] bg-gradient-to-r from-rose-500 to-transparent" />
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-[var(--text-primary)]">
            Get To <span className="text-gradient">Know Me</span>
          </h2>
        </motion.div>

        {/* Bento Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Main Bio Card - Large */}
          <motion.div variants={itemVariants} className="lg:col-span-2 lg:row-span-2">
            <GlassCard className="h-full p-6 sm:p-8">
              <div className="flex flex-col h-full">
                <div className="flex items-start gap-4 mb-6">
                  <div className="p-3 bg-rose-500/10 rounded-xl">
                    <Briefcase className="text-rose-400" size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[var(--text-primary)]">AI/ML Developer</h3>
                    <p className="text-[var(--text-muted)] text-sm">Based in Delhi, India</p>
                  </div>
                </div>

                <p className="text-[var(--text-secondary)] leading-relaxed mb-6">
                  I'm an AI/ML Developer with hands-on experience building neural networks and deep learning models for predictive analytics. Proficient in Python, TensorFlow, scikit-learn, and NLP techniques with a strong foundation in full-stack development.
                </p>

                <p className="text-[var(--text-secondary)] leading-relaxed mb-8">
                  I'm passionate about leveraging machine learning to solve complex real-world problems and drive data-driven decision making. Currently exploring Generative AI, LangChain, and Computer Vision.
                </p>

                <div className="mt-auto">
                  <GlassButton
                    href="/resume.pdf"
                    className="inline-flex items-center gap-2 btn-primary"
                  >
                    <Download size={18} />
                    Download Resume
                  </GlassButton>
                </div>
              </div>
            </GlassCard>
          </motion.div>

          {/* Profile Image Card */}
          <motion.div variants={itemVariants}>
            <GlassCard className="h-full p-0 overflow-hidden aspect-square">
              <div className="relative h-full w-full">
                <div className="absolute inset-0 bg-gradient-to-br from-rose-500/20 to-amber-500/20" />
                <img
                  src="/profile.jpg"
                  alt="Eesh Sagar Singh"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                  <p className="text-white font-semibold">Eesh Sagar Singh</p>
                  <p className="text-white/70 text-sm">Developer</p>
                </div>
              </div>
            </GlassCard>
          </motion.div>

          {/* Education Card */}
          <motion.div variants={itemVariants}>
            <GlassCard className="h-full p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-amber-500/10 rounded-lg">
                  <GraduationCap className="text-amber-400" size={20} />
                </div>
                <span className="text-[var(--text-muted)] text-sm font-medium">Education</span>
              </div>
              <h4 className="text-lg font-bold text-[var(--text-primary)] mb-1">B.Tech in IT</h4>
              <p className="text-[var(--text-muted)] text-sm mb-3">MAIT, Delhi</p>
              <div className="flex items-center justify-between">
                <span className="text-rose-400 text-sm">2023 - 2027</span>
                <span className="text-2xl font-bold text-gradient">8.5</span>
              </div>
            </GlassCard>
          </motion.div>

          {/* Stats Cards Grid */}
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 h-full">
              {[
                { label: 'GPA Score', value: '8.5', icon: Award, color: 'rose' },
                { label: 'Projects', value: '5+', icon: Target, color: 'amber' },
                { label: 'Technologies', value: '20+', icon: Rocket, color: 'rose' },
                { label: 'Certifications', value: '5+', icon: Award, color: 'amber' },
              ].map((stat, index) => (
                <GlassCard key={stat.label} className="p-4 text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : {}}
                    transition={{ delay: 0.5 + index * 0.1, type: "spring" }}
                  >
                    <stat.icon className={`mx-auto mb-2 text-${stat.color}-400`} size={20} />
                    <span className="text-2xl sm:text-3xl font-bold text-gradient block">{stat.value}</span>
                    <span className="text-[var(--text-muted)] text-xs">{stat.label}</span>
                  </motion.div>
                </GlassCard>
              ))}
            </div>
          </motion.div>

          {/* Quick Info Cards */}
          <motion.div variants={itemVariants} className="lg:col-span-3">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { icon: MapPin, label: 'Location', value: 'Delhi, India', color: 'text-rose-400' },
                { icon: Briefcase, label: 'Status', value: 'Open to Work', color: 'text-green-400' },
                { icon: Calendar, label: 'Experience', value: 'Fresher', color: 'text-amber-400' },
                { icon: Target, label: 'Focus', value: 'AI/ML', color: 'text-rose-400' },
              ].map((item) => (
                <GlassCard key={item.label} className="p-4">
                  <div className="flex items-center gap-3">
                    <item.icon className={item.color} size={18} />
                    <div>
                      <p className="text-[var(--text-muted)] text-xs">{item.label}</p>
                      <p className="text-[var(--text-primary)] font-medium text-sm">{item.value}</p>
                    </div>
                  </div>
                </GlassCard>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
