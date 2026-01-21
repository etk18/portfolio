import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Code2, Brain, Database, Cpu, Layers, Cloud } from 'lucide-react';
import { GlassCard } from '../hooks/useGlassTilt';

const skillCategories = [
  {
    id: 'aiml',
    title: 'AI/ML & Data Science',
    icon: Brain,
    color: 'rose',
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
    id: 'frontend',
    title: 'Frontend Development',
    icon: Layers,
    color: 'amber',
    skills: [
      { name: 'React.js', level: 90 },
      { name: 'JavaScript', level: 85 },
      { name: 'React Native', level: 75 },
      { name: 'HTML5/CSS3', level: 90 },
      { name: 'Tailwind CSS', level: 85 },
      { name: 'Framer Motion', level: 80 },
    ],
  },
  {
    id: 'backend',
    title: 'Backend & Tools',
    icon: Database,
    color: 'rose',
    skills: [
      { name: 'Node.js', level: 85 },
      { name: 'Express.js', level: 85 },
      { name: 'MongoDB', level: 80 },
      { name: 'MySQL', level: 80 },
      { name: 'REST APIs', level: 90 },
      { name: 'Git', level: 85 },
    ],
  },
];

const SkillOrb = ({ skill, delay, isActive }) => {
  const orbSize = 70 + (skill.level / 100) * 30; // 70-100px based on level (increased minimum)

  return (
    <motion.div
      className="relative group cursor-pointer"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, type: "spring", stiffness: 200 }}
      whileHover={{ scale: 1.1, zIndex: 10 }}
    >
      {/* Hover tooltip - outside overflow container */}
      <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20">
        <div className="px-2 py-1 bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded text-xs text-rose-400 whitespace-nowrap shadow-lg">
          {skill.level}%
        </div>
      </div>

      <div
        className={`relative flex items-center justify-center rounded-full bg-gradient-to-br from-rose-500/20 to-amber-500/20 border border-rose-500/30 backdrop-blur-sm transition-all overflow-hidden ${isActive ? 'ring-2 ring-rose-400' : ''}`}
        style={{ width: orbSize, height: orbSize }}
      >
        <span className="text-[var(--text-primary)] text-[10px] font-medium text-center px-2 leading-tight break-words max-w-full">
          {skill.name}
        </span>
      </div>
    </motion.div>
  );
};

const SkillCategory = ({ category, index, isActive, onClick }) => {
  const IconComponent = category.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      onClick={onClick}
      className="cursor-pointer"
    >
      <GlassCard
        className={`p-6 transition-all ${isActive ? 'border-rose-500/50 bg-rose-500/5' : ''}`}
      >
        <div className="flex items-center gap-4 mb-6">
          <div className={`p-3 rounded-xl ${isActive ? 'bg-rose-500/20' : 'bg-[var(--bg-tertiary)]'}`}>
            <IconComponent className={isActive ? 'text-rose-400' : 'text-[var(--text-muted)]'} size={24} />
          </div>
          <div>
            <h3 className={`font-bold ${isActive ? 'text-rose-400' : 'text-[var(--text-primary)]'}`}>
              {category.title}
            </h3>
            <p className="text-[var(--text-muted)] text-sm">{category.skills.length} skills</p>
          </div>
        </div>

        {/* Skill orbs */}
        <div className="flex flex-wrap gap-3 justify-center">
          {category.skills.map((skill, i) => (
            <SkillOrb
              key={skill.name}
              skill={skill}
              delay={0.3 + i * 0.05}
              isActive={isActive}
            />
          ))}
        </div>
      </GlassCard>
    </motion.div>
  );
};

const Skills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [activeCategory, setActiveCategory] = useState('aiml');

  const technologies = [
    'Python', 'TensorFlow', 'Keras', 'PyTorch', 'scikit-learn',
    'React.js', 'Node.js', 'MongoDB', 'Deep Learning', 'NLP',
    'Generative AI', 'LangChain', 'Computer Vision',
  ];

  return (
    <section id="skills" className="py-24 md:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/4 w-[400px] h-[400px] bg-rose-500/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-amber-500/5 rounded-full blur-[100px]" />
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
            <span className="text-rose-400 font-medium text-sm tracking-wider uppercase">Skills</span>
            <div className="h-px flex-1 max-w-[100px] bg-gradient-to-r from-rose-500 to-transparent" />
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-[var(--text-primary)]">
            Technical <span className="text-gradient">Expertise</span>
          </h2>
        </motion.div>

        {/* Floating Tech Tags */}
        <motion.div
          className="flex flex-wrap gap-2 mb-12"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3 }}
        >
          {technologies.map((tech, index) => (
            <motion.span
              key={tech}
              className="px-4 py-2 text-sm text-[var(--text-secondary)] bg-[var(--bg-tertiary)] rounded-full border border-[var(--border-color)] hover:border-rose-500/50 hover:text-rose-400 transition-all cursor-default"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.4 + index * 0.03 }}
              whileHover={{ scale: 1.05 }}
            >
              {tech}
            </motion.span>
          ))}
        </motion.div>

        {/* Skill Categories Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, index) => (
            <SkillCategory
              key={category.id}
              category={category}
              index={index}
              isActive={activeCategory === category.id}
              onClick={() => setActiveCategory(category.id)}
            />
          ))}
        </div>

        {/* Learning Note */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1 }}
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 glass-card">
            <Cpu className="text-rose-400" size={20} />
            <p className="text-[var(--text-muted)]">
              Currently exploring <span className="text-rose-400">Generative AI</span>,
              <span className="text-rose-400"> LangChain</span>, and
              <span className="text-amber-400"> Computer Vision</span>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
