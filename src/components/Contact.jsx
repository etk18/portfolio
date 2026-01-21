import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Mail, MapPin, Phone, Send, Github, Linkedin, ArrowUpRight, Sparkles } from 'lucide-react';
import { GlassCard } from '../hooks/useGlassTilt';

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: '7b127690-6241-4938-9f55-2d5a91d2f1e9',
          subject: `Portfolio Contact: ${formData.subject}`,
          from_name: 'Portfolio Website',
          replyto: formData.email,
          "Sender Name": formData.name,
          "Sender Email": formData.email,
          "Subject": formData.subject,
          "Message": formData.message,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitted(true);
        setFormData({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => setSubmitted(false), 3000);
      } else {
        alert('Failed to send message. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to send message. Please try again.');
    }

    setIsSubmitting(false);
  };

  const contactInfo = [
    { icon: Mail, label: 'Email', value: 'eeshsagar@gmail.com', href: 'mailto:eeshsagar@gmail.com' },
    { icon: MapPin, label: 'Location', value: 'Delhi, India', href: null },
    { icon: Phone, label: 'Phone', value: '+91-9939411596', href: 'tel:+919939411596' },
  ];

  const socialLinks = [
    { icon: Github, href: 'https://github.com/etk18', label: 'GitHub' },
    { icon: Linkedin, href: 'https://linkedin.com/in/etk18', label: 'LinkedIn' },
  ];

  return (
    <section id="contact" className="py-24 md:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-rose-500/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-amber-500/5 rounded-full blur-[100px]" />
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
            <span className="text-rose-400 font-medium text-sm tracking-wider uppercase">Contact</span>
            <div className="h-px flex-1 max-w-[100px] bg-gradient-to-r from-rose-500 to-transparent" />
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-[var(--text-primary)]">
            Let's <span className="text-gradient">Connect</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Left Column - Contact Info (2 cols) */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <GlassCard className="p-6 sm:p-8 h-full">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-rose-500/10 rounded-xl">
                  <Sparkles className="text-rose-400" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[var(--text-primary)]">Let's Talk</h3>
                  <p className="text-[var(--text-muted)] text-sm">Available for opportunities</p>
                </div>
              </div>

              <p className="text-[var(--text-secondary)] mb-8 leading-relaxed">
                I'm currently looking for new opportunities. Whether you have a project idea
                or just want to say hi, feel free to reach out!
              </p>

              {/* Contact Cards */}
              <div className="space-y-4 mb-8">
                {contactInfo.map((item, index) => (
                  <motion.div
                    key={item.label}
                    className="flex items-center gap-4 p-4 bg-[var(--bg-tertiary)] rounded-xl group hover:bg-rose-500/5 transition-colors"
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.4 + index * 0.1 }}
                  >
                    <div className="p-2 bg-rose-500/10 rounded-lg group-hover:bg-rose-500/20 transition-colors">
                      <item.icon className="text-rose-400" size={18} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[var(--text-muted)] text-xs mb-0.5">{item.label}</p>
                      {item.href ? (
                        <a
                          href={item.href}
                          className="text-[var(--text-primary)] font-medium hover:text-rose-400 transition-colors text-sm truncate block"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-[var(--text-primary)] font-medium text-sm">{item.value}</p>
                      )}
                    </div>
                    {item.href && <ArrowUpRight className="text-[var(--text-muted)] group-hover:text-rose-400" size={16} />}
                  </motion.div>
                ))}
              </div>

              {/* Social Links */}
              <div>
                <p className="text-[var(--text-muted)] text-sm mb-4">Find me on social:</p>
                <div className="flex gap-3">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-[var(--bg-tertiary)] text-[var(--text-muted)] hover:text-rose-400 hover:bg-rose-500/10 rounded-xl transition-all"
                      initial={{ opacity: 0, y: 20 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ delay: 0.7 + index * 0.1 }}
                      whileHover={{ scale: 1.1, y: -2 }}
                      aria-label={social.label}
                    >
                      <social.icon size={20} />
                    </motion.a>
                  ))}
                </div>
              </div>
            </GlassCard>
          </motion.div>

          {/* Right Column - Contact Form (3 cols) */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <GlassCard className="p-6 sm:p-8">
              <h3 className="text-xl font-bold text-[var(--text-primary)] mb-6">Send a Message</h3>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-[var(--bg-tertiary)] border border-[var(--border-color)] rounded-xl text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500/50 transition-all"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-[var(--bg-tertiary)] border border-[var(--border-color)] rounded-xl text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500/50 transition-all"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-[var(--bg-tertiary)] border border-[var(--border-color)] rounded-xl text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500/50 transition-all"
                    placeholder="Project collaboration"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 bg-[var(--bg-tertiary)] border border-[var(--border-color)] rounded-xl text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500/50 transition-all resize-none"
                    placeholder="Tell me about your project..."
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-primary flex items-center justify-center gap-2 py-4 text-base font-semibold disabled:opacity-50"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  {isSubmitting ? (
                    <>
                      <motion.div
                        className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      />
                      Sending...
                    </>
                  ) : submitted ? (
                    <>
                      <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }}>✓</motion.span>
                      Message Sent!
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      Send Message
                    </>
                  )}
                </motion.button>
              </form>
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
