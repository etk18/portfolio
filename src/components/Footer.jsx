import { motion } from 'framer-motion';
import { Heart, ArrowUp } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const footerLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#experience' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <footer className="relative py-8 sm:py-12 border-t border-[var(--border-color)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center">
          {/* Logo */}
          <motion.a
            href="#home"
            className="text-xl sm:text-2xl font-bold text-gradient mb-4 sm:mb-6"
            whileHover={{ scale: 1.05 }}
          >
            ESS
          </motion.a>

          {/* Navigation Links */}
          <nav className="flex flex-wrap justify-center gap-3 sm:gap-6 mb-6 sm:mb-8">
            {footerLinks.map((link) => (
              <motion.a
                key={link.name}
                href={link.href}
                className="text-[var(--text-muted)] hover:text-rose-400 transition-colors text-xs sm:text-sm"
                whileHover={{ y: -2 }}
              >
                {link.name}
              </motion.a>
            ))}
          </nav>

          {/* Divider */}
          <div className="w-full max-w-xs h-px bg-gradient-to-r from-transparent via-[var(--border-color)] to-transparent mb-6 sm:mb-8" />

          {/* Copyright */}
          <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 text-[var(--text-muted)] text-xs sm:text-sm text-center">
            <span>© {currentYear} Eesh Sagar Singh.</span>
            <span className="hidden sm:inline">•</span>
            <span className="flex items-center gap-1">
              Made with <Heart size={12} className="text-red-500 fill-red-500" /> using React
            </span>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <motion.button
        onClick={scrollToTop}
        className="fixed bottom-4 right-4 sm:bottom-8 sm:right-8 p-2.5 sm:p-3 glass-card hover:bg-rose-500/20 hover:border-rose-500/50 text-[var(--text-primary)] transition-all z-50"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.1, y: -3 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Scroll to top"
      >
        <ArrowUp size={20} />
      </motion.button>
    </footer>
  );
};

export default Footer;
