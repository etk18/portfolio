import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { ExternalLink, Github, Folder, ArrowUpRight, Sparkles } from 'lucide-react';
import { GlassCard } from '../hooks/useGlassTilt';

const projects = [
  {
    title: 'Crypto Price Prediction Model',
    description: 'Deep learning model using LSTM neural networks to predict cryptocurrency price movements with time-series data analysis. Analyzed 50,000+ data points.',
    tags: ['Python', 'TensorFlow', 'Keras', 'Pandas', 'LSTM'],
    github: 'https://github.com/etk18',
    live: 'https://github.com/etk18',
    featured: true,
    status: 'In Progress',
    category: 'AI/ML',
  },
  {
    title: 'Instagram Clone',
    description: 'Full-featured social media platform with user authentication, profile management, real-time interactions, and dynamic newsfeed.',
    tags: ['React.js', 'Node.js', 'MongoDB', 'Express.js'],
    github: 'https://github.com/etk18',
    live: 'https://github.com/etk18',
    featured: true,
    category: 'Full Stack',
  },
  {
    title: 'NLP Text Pipeline',
    description: 'End-to-end NLP pipeline for text classification and sentiment analysis using transformers.',
    tags: ['Python', 'PyTorch', 'NLP', 'Transformers'],
    github: 'https://github.com/etk18',
    live: 'https://github.com/etk18',
    featured: false,
    category: 'AI/ML',
  },
  {
    title: 'Data Visualization Dashboard',
    description: 'Interactive dashboard for visualizing complex datasets with dynamic charts.',
    tags: ['React.js', 'Chart.js', 'D3.js'],
    github: 'https://github.com/etk18',
    live: 'https://github.com/etk18',
    featured: false,
    category: 'Frontend',
  },
  {
    title: 'ML Model Deployment API',
    description: 'RESTful API service for deploying machine learning models with Docker.',
    tags: ['Python', 'Flask', 'Docker'],
    github: 'https://github.com/etk18',
    live: 'https://github.com/etk18',
    featured: false,
    category: 'Backend',
  },
  {
    title: 'Portfolio Website',
    description: 'Modern, animated portfolio with AI-powered chatbot assistant.',
    tags: ['React.js', 'Framer Motion', 'Three.js'],
    github: 'https://github.com/etk18',
    live: 'https://github.com/etk18',
    featured: false,
    category: 'Frontend',
  },
];

const FeaturedProject = ({ project, index }) => {
  const isEven = index % 2 === 0;

  return (
    <motion.div
      className={`grid lg:grid-cols-2 gap-8 items-center ${isEven ? '' : 'lg:flex-row-reverse'}`}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6 }}
    >
      {/* Project Preview */}
      <div className={isEven ? 'lg:order-1' : 'lg:order-2'}>
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-br from-rose-500/20 to-amber-500/20 rounded-2xl transform group-hover:scale-105 transition-transform duration-500" />
          <GlassCard className="relative p-8 aspect-video flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-rose-500/5 to-amber-500/5" />
            <div className="relative text-center">
              <Folder className="mx-auto mb-4 text-rose-400" size={48} />
              <p className="text-[var(--text-muted)] text-sm">{project.category}</p>
            </div>
          </GlassCard>
        </div>
      </div>

      {/* Project Info */}
      <div className={isEven ? 'lg:order-2' : 'lg:order-1'}>
        <div className="flex items-center gap-3 mb-4">
          <span className="text-rose-400 font-medium text-sm">Featured Project</span>
          {project.status && (
            <span className="px-2 py-0.5 text-xs bg-amber-500/20 text-amber-400 rounded-full flex items-center gap-1">
              <Sparkles size={10} />
              {project.status}
            </span>
          )}
        </div>

        <h3 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)] mb-4">
          {project.title}
        </h3>

        <GlassCard className="p-6 mb-6">
          <p className="text-[var(--text-secondary)] leading-relaxed">
            {project.description}
          </p>
        </GlassCard>

        <div className="flex flex-wrap gap-2 mb-6">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 text-sm text-rose-400 bg-rose-500/10 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-[var(--text-muted)] hover:text-rose-400 transition-colors"
          >
            <Github size={20} />
            <span className="text-sm">Code</span>
          </a>
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-[var(--text-muted)] hover:text-rose-400 transition-colors"
          >
            <ExternalLink size={20} />
            <span className="text-sm">Live</span>
          </a>
        </div>
      </div>
    </motion.div>
  );
};

const ProjectCard = ({ project, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <GlassCard className="p-6 h-full group hover:border-rose-500/30 transition-all">
        <div className="flex items-start justify-between mb-4">
          <div className="p-3 bg-[var(--bg-tertiary)] rounded-xl group-hover:bg-rose-500/10 transition-colors">
            <Folder className="text-[var(--text-muted)] group-hover:text-rose-400 transition-colors" size={24} />
          </div>
          <div className="flex gap-3">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--text-muted)] hover:text-rose-400 transition-colors"
            >
              <Github size={18} />
            </a>
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--text-muted)] hover:text-rose-400 transition-colors"
            >
              <ArrowUpRight size={18} />
            </a>
          </div>
        </div>

        <h3 className="text-lg font-bold text-[var(--text-primary)] mb-2 group-hover:text-rose-400 transition-colors">
          {project.title}
        </h3>

        <p className="text-[var(--text-muted)] text-sm mb-4 leading-relaxed line-clamp-3">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mt-auto">
          {project.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 text-xs text-[var(--text-muted)] bg-[var(--bg-tertiary)] rounded"
            >
              {tag}
            </span>
          ))}
        </div>
      </GlassCard>
    </motion.div>
  );
};

const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const featuredProjects = projects.filter(p => p.featured);
  const otherProjects = projects.filter(p => !p.featured);

  return (
    <section id="projects" className="py-24 md:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-rose-500/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 left-0 w-[400px] h-[400px] bg-amber-500/5 rounded-full blur-[100px]" />
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
            <span className="text-rose-400 font-medium text-sm tracking-wider uppercase">Portfolio</span>
            <div className="h-px flex-1 max-w-[100px] bg-gradient-to-r from-rose-500 to-transparent" />
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-[var(--text-primary)]">
            Featured <span className="text-gradient">Projects</span>
          </h2>
        </motion.div>

        {/* Featured Projects */}
        <div className="space-y-24 mb-24">
          {featuredProjects.map((project, index) => (
            <FeaturedProject key={project.title} project={project} index={index} />
          ))}
        </div>

        {/* Other Projects */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-8 text-center">
            Other Noteworthy Projects
          </h3>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {otherProjects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
