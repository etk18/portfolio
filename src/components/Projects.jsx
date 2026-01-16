import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { ExternalLink, Github, Folder } from 'lucide-react';
import { ProjectsBackground } from './SectionBackgrounds';

const projects = [
  {
    title: 'Crypto Price Prediction Model',
    description:
      'Engineered a deep learning model using neural networks and machine learning techniques to predict cryptocurrency price movements with time-series data analysis. Implemented LSTM and dense neural network architectures, achieving improved prediction accuracy through hyperparameter tuning.',
    image: '/projects/crypto.jpg',
    tags: ['Python', 'TensorFlow', 'Keras', 'scikit-learn', 'Pandas', 'NumPy'],
    github: 'https://github.com/etk18',
    live: 'https://github.com/etk18',
    featured: true,
  },
  {
    title: 'Instagram Clone - Full-Stack Social Media',
    description:
      'Built a full-featured social media application with user authentication, profile management, image uploads, real-time likes, comments, and dynamic newsfeed functionality. Designed RESTful API endpoints with Node.js and Express.js.',
    image: '/projects/instagram.jpg',
    tags: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'RESTful APIs'],
    github: 'https://github.com/etk18',
    live: 'https://github.com/etk18',
    featured: true,
  },
  {
    title: 'Deep Learning NLP Pipeline',
    description:
      'Developed an end-to-end NLP pipeline for text classification and sentiment analysis using transformers and deep learning models. Implemented data preprocessing, feature engineering, and model optimization.',
    image: '/projects/nlp.jpg',
    tags: ['Python', 'PyTorch', 'NLP', 'Transformers', 'Hugging Face'],
    github: 'https://github.com/etk18',
    live: 'https://github.com/etk18',
    featured: true,
  },
  {
    title: 'Data Visualization Dashboard',
    description:
      'Interactive dashboard for visualizing complex datasets with Chart.js and React. Features dynamic filtering, real-time updates, and export capabilities.',
    image: '/projects/dashboard.jpg',
    tags: ['React.js', 'Chart.js', 'Matplotlib', 'Seaborn'],
    github: 'https://github.com/etk18',
    live: 'https://github.com/etk18',
    featured: false,
  },
  {
    title: 'ML Model Deployment API',
    description:
      'RESTful API service for deploying machine learning models with real-time prediction capabilities and model versioning.',
    image: '/projects/api.jpg',
    tags: ['Python', 'Flask', 'Docker', 'scikit-learn'],
    github: 'https://github.com/etk18',
    live: 'https://github.com/etk18',
    featured: false,
  },
  {
    title: 'Portfolio Website',
    description:
      'Modern, animated portfolio website showcasing projects and skills with smooth Framer Motion animations and responsive design.',
    image: '/projects/portfolio.jpg',
    tags: ['React.js', 'Framer Motion', 'Tailwind CSS'],
    github: 'https://github.com/etk18',
    live: 'https://github.com/etk18',
    featured: false,
  },
];

const ProjectCard = ({ project, index, isFeatured }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  if (isFeatured) {
    return (
      <motion.div
        ref={ref}
        className={`grid md:grid-cols-2 gap-6 md:gap-8 items-center ${
          index % 2 === 1 ? 'md:flex-row-reverse' : ''
        }`}
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: index * 0.2 }}
      >
        {/* Project Image */}
        <motion.div
          className={`relative group ${index % 2 === 1 ? 'md:order-2' : ''}`}
          whileHover={{ scale: 1.02 }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl transform rotate-2 group-hover:rotate-3 transition-transform" />
          <div className="relative aspect-video bg-slate-800 rounded-xl overflow-hidden border border-white/10">
            {/* Placeholder - replace with actual image */}
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-slate-800 to-slate-900">
              <Folder className="text-slate-600" size={48} />
            </div>
            {/* Overlay on hover */}
            <div className="absolute inset-0 bg-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </motion.div>

        {/* Project Info */}
        <div className={index % 2 === 1 ? 'md:order-1 md:text-right' : ''}>
          <span className="text-blue-400 text-xs sm:text-sm font-medium">Featured Project</span>
          <h3 className="text-xl sm:text-2xl font-bold text-white mt-2 mb-3 sm:mb-4">{project.title}</h3>
          <div className="p-4 sm:p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/10 mb-3 sm:mb-4">
            <p className="text-slate-400 text-sm sm:text-base">{project.description}</p>
          </div>
          <div className={`flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4 ${index % 2 === 1 ? 'md:justify-end' : ''}`}>
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 sm:px-3 py-1 text-xs font-medium text-blue-400 bg-blue-500/10 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
          <div className={`flex gap-4 ${index % 2 === 1 ? 'md:justify-end' : ''}`}>
            <motion.a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-slate-400 hover:text-blue-400 transition-colors"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.9 }}
            >
              <Github size={20} />
            </motion.a>
            <motion.a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-slate-400 hover:text-blue-400 transition-colors"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.9 }}
            >
              <ExternalLink size={20} />
            </motion.a>
          </div>
        </div>
      </motion.div>
    );
  }

  // Regular project card
  return (
    <motion.div
      ref={ref}
      className="group p-4 sm:p-6 bg-white/5 backdrop-blur-md rounded-xl border border-white/10 hover:border-blue-500/30 transition-all"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
    >
      <div className="flex justify-between items-start mb-3 sm:mb-4">
        <Folder className="text-blue-400" size={32} />
        <div className="flex gap-3">
          <motion.a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-400 hover:text-blue-400 transition-colors"
            whileHover={{ scale: 1.1 }}
          >
            <Github size={18} />
          </motion.a>
          <motion.a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-400 hover:text-blue-400 transition-colors"
            whileHover={{ scale: 1.1 }}
          >
            <ExternalLink size={18} />
          </motion.a>
        </div>
      </div>
      <h3 className="text-lg sm:text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
        {project.title}
      </h3>
      <p className="text-slate-400 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-3">{project.description}</p>
      <div className="flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <span key={tag} className="text-xs text-slate-500">
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  );
};

const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [showAll, setShowAll] = useState(false);

  const featuredProjects = projects.filter((p) => p.featured);
  const otherProjects = projects.filter((p) => !p.featured);

  return (
    <section id="projects" className="py-20 md:py-32 relative">
      <ProjectsBackground />
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10" ref={ref}>
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="text-blue-400 font-medium text-sm tracking-wider uppercase">
            My Work
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 text-white">
            Featured Projects
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mt-4 rounded-full" />
          <p className="text-slate-400 mt-4 max-w-2xl mx-auto">
            Here are some of my recent projects. Each one was built with attention to detail,
            performance, and user experience.
          </p>
        </motion.div>

        {/* Featured Projects */}
        <div className="space-y-12 sm:space-y-16 md:space-y-20 mb-16 sm:mb-20">
          {featuredProjects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} isFeatured />
          ))}
        </div>

        {/* Other Projects */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
        >
          <h3 className="text-xl sm:text-2xl font-bold text-white text-center mb-6 sm:mb-8">
            Other Noteworthy Projects
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {otherProjects.slice(0, showAll ? otherProjects.length : 3).map((project, index) => (
              <ProjectCard key={project.title} project={project} index={index} isFeatured={false} />
            ))}
          </div>

          {otherProjects.length > 3 && (
            <motion.div className="text-center mt-8">
              <motion.button
                onClick={() => setShowAll(!showAll)}
                className="px-6 py-3 border border-slate-700 hover:border-blue-500 text-slate-300 hover:text-white rounded-lg transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {showAll ? 'Show Less' : 'Show More'}
              </motion.button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
