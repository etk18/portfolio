import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
    ArrowLeft, Home, Send, Bot, User, Loader2, RefreshCw,
    Lock, LogOut, Shield, Brain, Sparkles
} from 'lucide-react';
import { adminLogin, adminLogout, isAdminAuthenticated, sendAdminMessage } from '../services/adminService';

const AdminPage = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(isAdminAuthenticated());
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState('');
    const [isLoggingIn, setIsLoggingIn] = useState(false);

    const [messages, setMessages] = useState([
        {
            role: 'assistant',
            content: "Hey Eesh! 👋 I'm your personal AI assistant. Tell me about what you're working on, your projects, or anything you'd like me to remember. This helps me provide better answers to your portfolio visitors!",
        },
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        if (isAuthenticated && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isAuthenticated]);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoginError('');
        setIsLoggingIn(true);

        const result = await adminLogin(username, password);

        if (result.success) {
            setIsAuthenticated(true);
            setUsername('');
            setPassword('');
        } else {
            setLoginError(result.error);
        }

        setIsLoggingIn(false);
    };

    const handleLogout = () => {
        adminLogout();
        setIsAuthenticated(false);
        setMessages([{
            role: 'assistant',
            content: "Hey Eesh! 👋 I'm your personal AI assistant. Tell me about what you're working on, your projects, or anything you'd like me to remember. This helps me provide better answers to your portfolio visitors!",
        }]);
    };

    const handleSend = async () => {
        if (!input.trim() || isLoading) return;

        const userMessage = input.trim();
        setInput('');
        setMessages((prev) => [...prev, { role: 'user', content: userMessage }]);
        setIsLoading(true);

        // Build conversation history for context
        const conversationHistory = messages.map(m => ({
            role: m.role,
            content: m.content
        }));

        const result = await sendAdminMessage(userMessage, conversationHistory);

        if (result.success) {
            setMessages((prev) => [...prev, { role: 'assistant', content: result.response }]);
        } else {
            setMessages((prev) => [
                ...prev,
                { role: 'assistant', content: `Sorry, I had trouble processing that. ${result.error || 'Please try again!'}` },
            ]);
        }

        setIsLoading(false);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const handleReset = () => {
        setMessages([{
            role: 'assistant',
            content: "Hey Eesh! 👋 I'm your personal AI assistant. Tell me about what you're working on, your projects, or anything you'd like me to remember. This helps me provide better answers to your portfolio visitors!",
        }]);
    };

    // Login Form
    if (!isAuthenticated) {
        return (
            <div className="min-h-screen pt-20 flex items-center justify-center px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="w-full max-w-md"
                >
                    <div className="glass-card p-8 rounded-2xl border border-[var(--border-color)]">
                        {/* Header */}
                        <div className="text-center mb-8">
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-rose-500/20 to-amber-500/20 mb-4">
                                <Shield className="w-8 h-8 text-rose-400" />
                            </div>
                            <h1 className="text-2xl font-bold text-[var(--text-primary)]">Admin Access</h1>
                            <p className="text-[var(--text-muted)] mt-2">Self-Improving AI Training Mode</p>
                        </div>

                        {/* Login Form */}
                        <form onSubmit={handleLogin} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                                    Username
                                </label>
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="w-full px-4 py-3 bg-[var(--bg-tertiary)] border border-[var(--border-color)] rounded-xl text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-rose-500/50 transition-colors"
                                    placeholder="Enter username"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full px-4 py-3 bg-[var(--bg-tertiary)] border border-[var(--border-color)] rounded-xl text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-rose-500/50 transition-colors"
                                    placeholder="Enter password"
                                    required
                                />
                            </div>

                            {loginError && (
                                <motion.p
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="text-red-400 text-sm text-center"
                                >
                                    {loginError}
                                </motion.p>
                            )}

                            <button
                                type="submit"
                                disabled={isLoggingIn}
                                className="w-full py-3 bg-gradient-to-r from-rose-500 to-amber-500 text-white font-semibold rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center gap-2 disabled:opacity-50"
                            >
                                {isLoggingIn ? (
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                ) : (
                                    <>
                                        <Lock className="w-5 h-5" />
                                        <span>Login</span>
                                    </>
                                )}
                            </button>
                        </form>

                        {/* Back Link */}
                        <div className="mt-6 text-center">
                            <Link
                                to="/"
                                className="inline-flex items-center gap-2 text-sm text-[var(--text-muted)] hover:text-rose-400 transition-colors"
                            >
                                <ArrowLeft size={16} />
                                <span>Back to Portfolio</span>
                            </Link>
                        </div>
                    </div>
                </motion.div>
            </div>
        );
    }

    // Admin Chat Interface
    return (
        <div className="min-h-screen pt-20">
            {/* Header */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <div className="flex items-center justify-between">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
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

                    <motion.button
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        onClick={handleLogout}
                        className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-400 hover:text-red-300 bg-[var(--bg-tertiary)] border border-red-500/30 rounded-xl transition-all hover:border-red-500/50"
                    >
                        <LogOut size={16} />
                        <span>Logout</span>
                    </motion.button>
                </div>
            </div>

            {/* Chat Container */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="glass-card rounded-2xl border border-[var(--border-color)] overflow-hidden"
                >
                    {/* Chat Header */}
                    <div
                        className="flex items-center justify-between p-4 border-b border-[var(--border-color)]"
                        style={{
                            background: 'linear-gradient(135deg, rgba(244, 63, 94, 0.1) 0%, rgba(251, 146, 60, 0.1) 100%)',
                        }}
                    >
                        <div className="flex items-center gap-3">
                            <div className="relative">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-rose-500 to-amber-500 flex items-center justify-center">
                                    <Brain className="w-5 h-5 text-white" />
                                </div>
                                <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-[var(--bg-primary)]" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-[var(--text-primary)] flex items-center gap-2">
                                    Self-Improving AI
                                    <Sparkles className="w-4 h-4 text-amber-400" />
                                </h3>
                                <p className="text-xs text-[var(--text-muted)]">Training Mode • Conversations are stored</p>
                            </div>
                        </div>
                        <button
                            onClick={handleReset}
                            className="p-2 text-[var(--text-muted)] hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-all"
                            title="Reset conversation"
                        >
                            <RefreshCw size={18} />
                        </button>
                    </div>

                    {/* Messages */}
                    <div className="h-[500px] overflow-y-auto p-4 space-y-4">
                        <AnimatePresence>
                            {messages.map((message, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0 }}
                                    className={`flex gap-3 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}
                                >
                                    <div
                                        className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${message.role === 'user'
                                                ? 'bg-gradient-to-br from-rose-500 to-amber-500'
                                                : 'bg-[var(--bg-tertiary)] border border-[var(--border-color)]'
                                            }`}
                                    >
                                        {message.role === 'user' ? (
                                            <User size={16} className="text-white" />
                                        ) : (
                                            <Bot size={16} className="text-rose-400" />
                                        )}
                                    </div>
                                    <div
                                        className={`max-w-[80%] p-3 rounded-2xl ${message.role === 'user'
                                                ? 'bg-gradient-to-br from-rose-500 to-amber-500 text-white rounded-br-md'
                                                : 'bg-[var(--bg-tertiary)] text-[var(--text-primary)] border border-[var(--border-color)] rounded-bl-md'
                                            }`}
                                    >
                                        <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>

                        {isLoading && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="flex gap-3"
                            >
                                <div className="w-8 h-8 rounded-full bg-[var(--bg-tertiary)] border border-[var(--border-color)] flex items-center justify-center">
                                    <Bot size={16} className="text-rose-400" />
                                </div>
                                <div className="bg-[var(--bg-tertiary)] border border-[var(--border-color)] rounded-2xl rounded-bl-md p-3">
                                    <div className="flex gap-1">
                                        <span className="w-2 h-2 bg-rose-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                        <span className="w-2 h-2 bg-rose-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                        <span className="w-2 h-2 bg-rose-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input */}
                    <div className="p-4 border-t border-[var(--border-color)] bg-[var(--bg-secondary)]">
                        <div className="flex gap-2">
                            <input
                                ref={inputRef}
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyPress={handleKeyPress}
                                placeholder="Tell me about your projects, activities, or anything..."
                                className="flex-1 px-4 py-3 bg-[var(--bg-tertiary)] border border-[var(--border-color)] rounded-xl text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-rose-500/50 transition-colors text-sm"
                                disabled={isLoading}
                            />
                            <button
                                onClick={handleSend}
                                disabled={isLoading || !input.trim()}
                                className="px-4 py-3 bg-gradient-to-r from-rose-500 to-amber-500 text-white rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isLoading ? (
                                    <Loader2 size={20} className="animate-spin" />
                                ) : (
                                    <Send size={20} />
                                )}
                            </button>
                        </div>
                        <p className="text-xs text-[var(--text-muted)] mt-2 text-center">
                            💡 Your conversations here are stored and used to provide better context to portfolio visitors
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default AdminPage;
