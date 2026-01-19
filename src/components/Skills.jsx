import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { SkillsBackground } from './SectionBackgrounds';
import { GlassCard } from '../hooks/useGlassTilt';

const skillCategories = [
  {
    title: 'AI/ML & Data Science',
    skills: [
      { name: 'Python', level: 90 },
      { name: 'TensorFlow/Keras', level: 85 },
      { name: 'PyTorch', level: 75 },
      { name: 'scikit-learn', level: 85 },
      { name: 'Pandas/NumPy', level: 90 },
      { name: 'NLP', level: 80 },
    ],
  },
  {
    title: 'Frontend Development',
    skills: [
      { name: 'React.js', level: 90 },
      { name: 'JavaScript (ES6+)', level: 85 },
      { name: 'React Native', level: 75 },
      { name: 'HTML5/CSS3', level: 90 },
      { name: 'Tailwind CSS', level: 85 },
      { name: 'Chart.js', level: 80 },
    ],
  },
  {
    title: 'Backend & Tools',
    skills: [
      { name: 'Node.js', level: 85 },
      { name: 'Express.js', level: 85 },
      { name: 'MongoDB', level: 80 },
      { name: 'MySQL/SQL', level: 80 },
      { name: 'RESTful APIs', level: 90 },
      { name: 'Git & GitHub', level: 85 },
    ],
  },
];

const SkillBar = ({ name, level, delay }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <div ref={ref} className="mb-3 sm:mb-4">
      <div className="flex justify-between mb-1.5 sm:mb-2">
        <span className="text-[var(--text-secondary)] font-medium text-sm sm:text-base">{name}</span>
        <span className="text-emerald-400 text-sm">{level}%</span>
      </div>
      <div className="h-1.5 sm:h-2 bg-[var(--bg-tertiary)] rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-emerald-500 to-amber-500 rounded-full"
          initial={{ width: 0 }}
          animate={isInView ? { width: `${level}%` } : { width: 0 }}
          transition={{ duration: 1, delay: delay, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
};

const Skills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const technologies = [
    'Python', 'TensorFlow', 'Keras', 'PyTorch', 'scikit-learn', 'Pandas',
    'NumPy', 'NLP', 'Deep Learning', 'React.js', 'React Native', 'Node.js',
    'Express.js', 'MongoDB', 'MySQL', 'JavaScript', 'Java', 'C/C++',
    'Git', 'RESTful APIs', 'Matplotlib', 'Seaborn',
  ];

  return (
    <section id="skills" className="py-20 md:py-32 relative">
      <SkillsBackground />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10" ref={ref}>
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="text-emerald-400 font-medium text-sm tracking-wider uppercase">
            My Skills
          </span>
          <h2 className="section-heading text-[var(--text-primary)] mt-2">
            Technical Expertise
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-emerald-500 to-amber-500 mx-auto mt-4 rounded-full" />
        </motion.div>

        {/* Floating Tech Tags */}
        <motion.div
          className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-12 sm:mb-16 px-2"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {technologies.map((tech, index) => (
            <motion.span
              key={tech}
              className="px-3 sm:px-4 py-1.5 sm:py-2 glass-card text-xs sm:text-sm text-[var(--text-secondary)] hover:text-emerald-400 hover:border-emerald-500/50 transition-all cursor-default"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.3 + index * 0.03 }}
              whileHover={{ scale: 1.1, y: -3 }}
            >
              {tech}
            </motion.span>
          ))}
        </motion.div>

        {/* Skill Categories */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <GlassCard
              key={category.title}
              className="p-4 sm:p-6"
              maxTilt={6}
            >
              <h3 className="text-lg sm:text-xl font-bold text-[var(--text-primary)] mb-4 sm:mb-6 flex items-center gap-2">
                <span className="w-2 h-2 bg-emerald-500 rounded-full" />
                {category.title}
              </h3>
              {category.skills.map((skill, skillIndex) => (
                <SkillBar
                  key={skill.name}
                  name={skill.name}
                  level={skill.level}
                  delay={0.6 + categoryIndex * 0.2 + skillIndex * 0.1}
                />
              ))}
            </GlassCard>
          ))}
        </div>

        {/* Additional Info */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.2 }}
        >
          <p className="text-[var(--text-muted)] max-w-2xl mx-auto">
            I'm constantly learning and exploring new technologies. Currently diving deeper into{' '}
            <span className="text-emerald-400">Generative AI</span>,{' '}
            <span className="text-emerald-400">LangChain</span>, and{' '}
            <span className="text-amber-400">Computer Vision with PyTorch</span>.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
