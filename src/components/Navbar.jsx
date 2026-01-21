import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon, Shield } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Experience', href: '#experience' },
  { name: 'AI Assistant', href: '/ai-assistant', special: true, isRoute: true },
  { name: 'Admin', href: '/admin', isRoute: true, isAdmin: true },
  { name: 'Contact', href: '#contact' },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isDark, toggleTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const handleNavClick = (e, link) => {
    // If it's a route link (like AI Assistant), let React Router handle it
    if (link.isRoute) {
      return; // Link component handles this
    }

    e.preventDefault();
    const sectionId = link.href.replace('#', '');

    // If we're on the home page, scroll to the section
    if (location.pathname === '/') {
      const element = document.getElementById(sectionId);
      if (element) {
        setIsMobileMenuOpen(false);
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    } else {
      // If we're on another page, navigate to home first, then scroll
      navigate('/' + link.href);
    }
  };

  // Handle hash-based navigation after page load
  useEffect(() => {
    if (location.pathname === '/' && location.hash) {
      const sectionId = location.hash.replace('#', '');
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  }, [location]);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
        ? 'bg-[var(--bg-card)] backdrop-blur-xl border-b border-[var(--border-color)] shadow-lg'
        : 'bg-transparent'
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16 md:h-20">
          {/* Logo */}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              to="/"
              className="text-xl sm:text-2xl font-bold text-gradient shrink-0"
            >
              ESS
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1 pr-1">
            {navLinks.map((link, index) => (
              link.isRoute ? (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -2 }}
                >
                  <Link
                    to={link.href}
                    className={`px-4 py-2 text-sm font-medium rounded-xl transition-all flex items-center gap-1 ${link.isAdmin
                      ? location.pathname === link.href
                        ? 'text-amber-400 bg-amber-500/20 border border-amber-500/40'
                        : 'text-amber-400 bg-amber-500/10 border border-amber-500/30 hover:bg-amber-500/20'
                      : location.pathname === link.href
                        ? 'text-rose-400 bg-rose-500/20 border border-rose-500/40'
                        : 'text-rose-400 bg-rose-500/10 border border-rose-500/30 hover:bg-rose-500/20'
                      }`}
                  >
                    {link.isAdmin ? <Shield size={14} /> : <span>✨</span>}
                    {link.name}
                  </Link>
                </motion.div>
              ) : (
                <motion.a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link)}
                  className="px-4 py-2 text-sm font-medium rounded-xl transition-all text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)]"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -2 }}
                >
                  {link.name}
                </motion.a>
              )
            ))}

            {/* Theme Toggle */}
            <motion.button
              onClick={toggleTheme}
              className="ml-2 p-2.5 rounded-xl bg-[var(--bg-tertiary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Toggle theme"
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </motion.button>

            <motion.a
              href="/resume.pdf"
              download="Eesh_Sagar_Singh_Resume.pdf"
              className="ml-3 btn-primary text-sm"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              Resume
            </motion.a>
          </div>

          {/* Mobile Controls */}
          <div className="md:hidden flex items-center gap-2">
            {/* Theme Toggle */}
            <motion.button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-[var(--bg-tertiary)] text-[var(--text-secondary)] flex items-center justify-center"
              whileTap={{ scale: 0.9 }}
              aria-label="Toggle theme"
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </motion.button>

            {/* Menu Button */}
            <motion.button
              className="p-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              whileTap={{ scale: 0.9 }}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[var(--bg-card)] backdrop-blur-xl border-b border-[var(--border-color)]"
          >
            <div className="px-4 py-4 space-y-2">
              {navLinks.map((link, index) => (
                link.isRoute ? (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link
                      to={link.href}
                      className={`flex items-center gap-2 px-4 py-3 rounded-xl transition-all ${link.isAdmin
                          ? location.pathname === link.href
                            ? 'text-amber-400 bg-amber-500/20 border border-amber-500/40'
                            : 'text-amber-400 bg-amber-500/10 border border-amber-500/30'
                          : location.pathname === link.href
                            ? 'text-rose-400 bg-rose-500/20 border border-rose-500/40'
                            : 'text-rose-400 bg-rose-500/10 border border-rose-500/30'
                        }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link.isAdmin ? <Shield size={16} /> : <span>✨</span>}
                      {link.name}
                    </Link>
                  </motion.div>
                ) : (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    className="block px-4 py-3 rounded-xl transition-all text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)]"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={(e) => handleNavClick(e, link)}
                  >
                    {link.name}
                  </motion.a>
                )
              ))}
              <motion.a
                href="/resume.pdf"
                download="Eesh_Sagar_Singh_Resume.pdf"
                className="block px-4 py-3 text-center btn-primary"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navLinks.length * 0.05 }}
              >
                Resume
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
