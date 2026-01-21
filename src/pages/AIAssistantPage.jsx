import { motion } from 'framer-motion';
import { ArrowLeft, Home } from 'lucide-react';
import { Link } from 'react-router-dom';
import AIAssistant from '../components/AIAssistant';

const AIAssistantPage = () => {
    return (
        <div className="min-h-screen pt-20">
            {/* Back Navigation */}
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4 }}
                >
                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-[var(--text-secondary)] hover:text-rose-400 bg-[var(--bg-tertiary)] border border-[var(--border-color)] rounded-xl transition-all hover:border-rose-500/30"
                    >
                        <ArrowLeft size={18} />
                        <Home size={16} />
                        <span>Back to Home</span>
                    </Link>
                </motion.div>
            </div>

            {/* AI Assistant Component */}
            <AIAssistant />
        </div>
    );
};

export default AIAssistantPage;
