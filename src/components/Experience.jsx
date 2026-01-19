import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Briefcase, Calendar, MapPin, Award } from 'lucide-react';
import { ExperienceBackground } from './SectionBackgrounds';

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
    description: 'GPA: 8.5/10.0 - Focused on AI/ML, Data Science, and Full-Stack Development.',
  },
];

const certifications = [
  'Complete Data Science, ML, DL, NLP Bootcamp - Krish Naik',
  'Complete Generative AI with Langchain & Huggingface',
  'Complete Computer Vision with PyTorch & Tensorflow',
  'Career Essentials in Generative AI - Microsoft',
  'Career Essentials in Software Development - Microsoft',
];

const ExperienceCard = ({ experience, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      className="relative pl-8 pb-12 last:pb-0"
      initial={{ opacity: 0, x: -30 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.2 }}
    >
      {/* Timeline Line */}
      <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-emerald-500 to-amber-500" />

      {/* Timeline Dot */}
      <motion.div
        className="absolute left-0 top-0 w-3 h-3 -translate-x-1/2 rounded-full bg-emerald-500 border-4 border-[var(--bg-primary)]"
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : {}}
        transition={{ delay: index * 0.2 + 0.3 }}
      />

      {/* Card Content */}
      <motion.div
        className="p-4 sm:p-6 glass-card ml-4"
        whileHover={{ x: 5 }}
      >
        <div className="flex flex-col sm:flex-row sm:flex-wrap items-start justify-between gap-2 sm:gap-4 mb-3 sm:mb-4">
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-[var(--text-primary)]">{experience.title}</h3>
            <p className="text-emerald-400 font-medium text-sm sm:text-base">{experience.company}</p>
          </div>
          <div className="sm:text-right">
            <div className="flex items-center gap-2 text-[var(--text-muted)] text-xs sm:text-sm">
              <Calendar size={14} />
              {experience.period}
            </div>
            <div className="flex items-center gap-2 text-[var(--text-muted)] text-xs sm:text-sm mt-1">
              <MapPin size={14} />
              {experience.location}
            </div>
          </div>
        </div>

        <ul className="space-y-2 mb-3 sm:mb-4">
          {experience.description.map((item, i) => (
            <motion.li
              key={i}
              className="flex items-start gap-2 text-[var(--text-secondary)] text-sm"
              initial={{ opacity: 0, x: -10 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: index * 0.2 + 0.4 + i * 0.1 }}
            >
              <span className="w-1.5 h-1.5 mt-1.5 rounded-full bg-emerald-500 shrink-0" />
              {item}
            </motion.li>
          ))}
        </ul>

        <div className="flex flex-wrap gap-1.5 sm:gap-2">
          {experience.technologies.map((tech) => (
            <span
              key={tech}
              className="px-2 sm:px-3 py-1 text-xs font-medium text-[var(--text-secondary)] bg-[var(--bg-tertiary)] rounded-full"
            >
              {tech}
            </span>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

const Experience = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="experience" className="py-20 md:py-32 relative">
      <ExperienceBackground />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10" ref={ref}>
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="text-emerald-400 font-medium text-sm tracking-wider uppercase">
            My Journey
          </span>
          <h2 className="section-heading text-[var(--text-primary)] mt-2">
            Work Experience
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-emerald-500 to-amber-500 mx-auto mt-4 rounded-full" />
        </motion.div>

        {/* Experience Timeline */}
        <div className="mb-20">
          {experiences.map((experience, index) => (
            <ExperienceCard key={experience.company} experience={experience} index={index} />
          ))}
        </div>

        {/* Education */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
        >
          <h3 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)] text-center mb-6 sm:mb-8 flex items-center justify-center gap-2">
            <Briefcase className="text-emerald-400" size={20} />
            Education
          </h3>

          {education.map((edu, index) => (
            <motion.div
              key={edu.institution}
              className="p-4 sm:p-6 glass-card"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 1 + index * 0.1 }}
              whileHover={{ scale: 1.01 }}
            >
              <div className="flex flex-col sm:flex-row sm:flex-wrap items-start justify-between gap-2 sm:gap-4">
                <div>
                  <h4 className="text-base sm:text-lg font-bold text-[var(--text-primary)]">{edu.degree}</h4>
                  <p className="text-emerald-400 text-sm sm:text-base">{edu.institution}</p>
                  <p className="text-[var(--text-muted)] mt-2 text-sm">{edu.description}</p>
                </div>
                <div className="flex items-center gap-2 text-[var(--text-muted)] text-xs sm:text-sm">
                  <Calendar size={14} />
                  {edu.period}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Certifications */}
        <motion.div
          className="mt-12 sm:mt-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.2 }}
        >
          <h3 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)] text-center mb-6 sm:mb-8 flex items-center justify-center gap-2">
            <Award className="text-amber-400" size={20} />
            Certifications
          </h3>

          <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
            {certifications.map((cert, index) => (
              <motion.div
                key={index}
                className="p-3 sm:p-4 glass-card"
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 1.4 + index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-start gap-2 sm:gap-3">
                  <div className="p-1.5 sm:p-2 bg-emerald-500/10 rounded-lg shrink-0">
                    <Award className="text-emerald-400" size={16} />
                  </div>
                  <p className="text-[var(--text-secondary)] text-xs sm:text-sm">{cert}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;
