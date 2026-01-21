import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Briefcase, Calendar, MapPin, Award, GraduationCap, CheckCircle } from 'lucide-react';
import { GlassCard } from '../hooks/useGlassTilt';

const experiences = [
  {
    title: 'Web Development Intern',
    company: 'Zidio Development',
    location: 'Remote, Delhi, India',
    period: 'Apr 2025 – Jun 2025',
    description: [
      'Collaborated with cross-functional teams to develop and optimize web-based solutions',
      'Conducted technical research and analysis to support development initiatives',
      'Contributed to full-stack development using modern JavaScript frameworks',
      'Participated in iterative testing and code reviews',
    ],
    technologies: ['JavaScript', 'React.js', 'Node.js', 'RESTful APIs', 'Git'],
  },
];

const education = [
  {
    degree: "Bachelor of Technology in Information Technology",
    institution: 'Maharaja Agrasen Institute of Technology',
    period: 'Aug 2023 – May 2027',
    gpa: '8.5/10',
    highlights: ['AI/ML Focus', 'Data Science', 'Full-Stack Development'],
  },
];

const certifications = [
  'Complete Data Science, ML, DL, NLP Bootcamp',
  'Complete Generative AI with Langchain & Huggingface',
  'Complete Computer Vision with PyTorch & Tensorflow',
  'Career Essentials in Generative AI - Microsoft',
  'Career Essentials in Software Development - Microsoft',
];

const Experience = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="experience" className="py-24 md:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 left-0 w-[400px] h-[400px] bg-rose-500/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/3 right-0 w-[400px] h-[400px] bg-amber-500/5 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10" ref={ref}>
        {/* Section Header */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-4 mb-4">
            <span className="text-rose-400 font-medium text-sm tracking-wider uppercase">Experience</span>
            <div className="h-px flex-1 max-w-[100px] bg-gradient-to-r from-rose-500 to-transparent" />
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-[var(--text-primary)]">
            My <span className="text-gradient">Journey</span>
          </h2>
        </motion.div>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left Column - Work Experience */}
          <div>
            <motion.div
              className="flex items-center gap-3 mb-6"
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.2 }}
            >
              <div className="p-2 bg-rose-500/10 rounded-lg">
                <Briefcase className="text-rose-400" size={20} />
              </div>
              <h3 className="text-xl font-bold text-[var(--text-primary)]">Work Experience</h3>
            </motion.div>

            {experiences.map((exp, index) => (
              <motion.div
                key={exp.company}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                <GlassCard className="p-6 relative overflow-hidden">
                  {/* Accent border */}
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-rose-500 to-amber-500" />

                  <div className="ml-4">
                    <div className="flex flex-wrap items-start justify-between gap-2 mb-4">
                      <div>
                        <h4 className="text-lg font-bold text-[var(--text-primary)]">{exp.title}</h4>
                        <p className="text-rose-400 font-medium">{exp.company}</p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-2 text-[var(--text-muted)] text-sm">
                          <Calendar size={14} />
                          {exp.period}
                        </div>
                        <div className="flex items-center gap-2 text-[var(--text-muted)] text-sm mt-1">
                          <MapPin size={14} />
                          {exp.location}
                        </div>
                      </div>
                    </div>

                    <ul className="space-y-2 mb-4">
                      {exp.description.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-[var(--text-secondary)] text-sm">
                          <CheckCircle className="text-rose-400 shrink-0 mt-0.5" size={14} />
                          {item}
                        </li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 text-xs font-medium text-rose-400 bg-rose-500/10 rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>

          {/* Right Column - Education & Certifications */}
          <div className="space-y-8">
            {/* Education */}
            <div>
              <motion.div
                className="flex items-center gap-3 mb-6"
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.4 }}
              >
                <div className="p-2 bg-amber-500/10 rounded-lg">
                  <GraduationCap className="text-amber-400" size={20} />
                </div>
                <h3 className="text-xl font-bold text-[var(--text-primary)]">Education</h3>
              </motion.div>

              {education.map((edu, index) => (
                <motion.div
                  key={edu.institution}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.5 + index * 0.1 }}
                >
                  <GlassCard className="p-6">
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div>
                        <h4 className="text-lg font-bold text-[var(--text-primary)]">{edu.degree}</h4>
                        <p className="text-amber-400">{edu.institution}</p>
                      </div>
                      <span className="text-3xl font-bold text-gradient">{edu.gpa}</span>
                    </div>

                    <div className="flex items-center gap-2 text-[var(--text-muted)] text-sm mb-4">
                      <Calendar size={14} />
                      {edu.period}
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {edu.highlights.map((highlight) => (
                        <span
                          key={highlight}
                          className="px-3 py-1 text-xs font-medium text-[var(--text-secondary)] bg-[var(--bg-tertiary)] rounded-full"
                        >
                          {highlight}
                        </span>
                      ))}
                    </div>
                  </GlassCard>
                </motion.div>
              ))}
            </div>

            {/* Certifications */}
            <div>
              <motion.div
                className="flex items-center gap-3 mb-6"
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.6 }}
              >
                <div className="p-2 bg-rose-500/10 rounded-lg">
                  <Award className="text-rose-400" size={20} />
                </div>
                <h3 className="text-xl font-bold text-[var(--text-primary)]">Certifications</h3>
              </motion.div>

              <div className="space-y-3">
                {certifications.map((cert, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.7 + index * 0.05 }}
                  >
                    <GlassCard className="p-4 group hover:border-rose-500/30 transition-all">
                      <div className="flex items-center gap-3">
                        <div className="p-1.5 bg-rose-500/10 rounded-lg group-hover:bg-rose-500/20 transition-colors">
                          <Award className="text-rose-400" size={14} />
                        </div>
                        <p className="text-[var(--text-secondary)] text-sm group-hover:text-[var(--text-primary)] transition-colors">
                          {cert}
                        </p>
                      </div>
                    </GlassCard>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
