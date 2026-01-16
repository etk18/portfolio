import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Briefcase, Calendar, MapPin, Award, GraduationCap } from 'lucide-react';
import { ExperienceBackground } from './SectionBackgrounds';

const experiences = [
  {
    title: 'Web Development Intern',
    company: 'Zidio Development',
    location: 'Remote, Delhi, India',
    period: 'Apr 2025 – Jun 2025',
    description: [
      'Collaborated with cross-functional teams to develop and optimize web-based solutions, enhancing feature functionality and user experience',
      'Conducted technical research and analysis to support development initiatives while maintaining strict confidentiality protocols',
      'Contributed to full-stack development projects using modern JavaScript frameworks and RESTful API integration',
      'Participated in iterative testing and code reviews to ensure high-quality deliverables',
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
  'Complete Data Science, Machine Learning, Deep Learning, NLP Bootcamp - Krish Naik (Udemy)',
  'Complete Generative AI Course With Langchain and Huggingface - Krish Naik (Udemy)',
  'Complete Computer Vision Bootcamp with PyTorch & Tensorflow - Krish Naik (Udemy)',
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
      <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-blue-500 to-purple-500" />
      
      {/* Timeline Dot */}
      <motion.div
        className="absolute left-0 top-0 w-3 h-3 -translate-x-1/2 rounded-full bg-blue-500 border-4 border-slate-950"
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : {}}
        transition={{ delay: index * 0.2 + 0.3 }}
      />

      {/* Card Content */}
      <motion.div
        className="p-4 sm:p-6 bg-white/5 backdrop-blur-md rounded-xl border border-white/10 hover:border-blue-500/30 transition-colors ml-4"
        whileHover={{ x: 5 }}
      >
        <div className="flex flex-col sm:flex-row sm:flex-wrap items-start justify-between gap-2 sm:gap-4 mb-3 sm:mb-4">
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-white">{experience.title}</h3>
            <p className="text-blue-400 font-medium text-sm sm:text-base">{experience.company}</p>
          </div>
          <div className="sm:text-right">
            <div className="flex items-center gap-2 text-slate-400 text-xs sm:text-sm">
              <Calendar size={14} />
              {experience.period}
            </div>
            <div className="flex items-center gap-2 text-slate-500 text-xs sm:text-sm mt-1">
              <MapPin size={14} />
              {experience.location}
            </div>
          </div>
        </div>

        <ul className="space-y-2 mb-3 sm:mb-4">
          {experience.description.map((item, i) => (
            <motion.li
              key={i}
              className="flex items-start gap-2 text-slate-400 text-sm"
              initial={{ opacity: 0, x: -10 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: index * 0.2 + 0.4 + i * 0.1 }}
            >
              <span className="w-1.5 h-1.5 mt-1.5 rounded-full bg-blue-500 shrink-0" />
              {item}
            </motion.li>
          ))}
        </ul>

        <div className="flex flex-wrap gap-1.5 sm:gap-2">
          {experience.technologies.map((tech) => (
            <span
              key={tech}
              className="px-2 sm:px-3 py-1 text-xs font-medium text-slate-300 bg-slate-700/50 rounded-full"
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
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/3 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10" ref={ref}>
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="text-blue-400 font-medium text-sm tracking-wider uppercase">
            My Journey
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 text-white">
            Work Experience
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mt-4 rounded-full" />
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
          <h3 className="text-xl sm:text-2xl font-bold text-white text-center mb-6 sm:mb-8 flex items-center justify-center gap-2">
            <Briefcase className="text-blue-400" size={20} />
            Education
          </h3>
          
          {education.map((edu, index) => (
            <motion.div
              key={edu.institution}
              className="p-4 sm:p-6 bg-white/5 backdrop-blur-md rounded-xl border border-white/10 hover:border-blue-500/30 transition-colors"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 1 + index * 0.1 }}
              whileHover={{ scale: 1.01 }}
            >
              <div className="flex flex-col sm:flex-row sm:flex-wrap items-start justify-between gap-2 sm:gap-4">
                <div>
                  <h4 className="text-base sm:text-lg font-bold text-white">{edu.degree}</h4>
                  <p className="text-blue-400 text-sm sm:text-base">{edu.institution}</p>
                  <p className="text-slate-400 mt-2 text-sm">{edu.description}</p>
                </div>
                <div className="flex items-center gap-2 text-slate-400 text-xs sm:text-sm">
                  <Calendar size={14} />
                  {edu.period}
                </div>
              </div>
              <motion.a
                href="/resume.pdf"
                download="Eesh_Sagar_Singh_Resume.pdf"
                className="block px-4 py-3 text-center text-sm sm:text-base bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors mt-4"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Download Full Resume
              </motion.a>
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
          <h3 className="text-xl sm:text-2xl font-bold text-white text-center mb-6 sm:mb-8 flex items-center justify-center gap-2">
            <Award className="text-blue-400" size={20} />
            Certifications
          </h3>
          
          <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
            {certifications.map((cert, index) => (
              <motion.div
                key={index}
                className="p-3 sm:p-4 bg-white/5 backdrop-blur-md rounded-xl border border-white/10 hover:border-blue-500/30 transition-colors"
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 1.4 + index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-start gap-2 sm:gap-3">
                  <div className="p-1.5 sm:p-2 bg-blue-500/10 rounded-lg shrink-0">
                    <Award className="text-blue-400" size={16} />
                  </div>
                  <p className="text-slate-300 text-xs sm:text-sm">{cert}</p>
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
