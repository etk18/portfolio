import { useState, useRef, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Send, Bot, User, Loader2, RefreshCw, Sparkles, Clock, MessageSquare, Zap, Lock, Key, Mail, Crown, X, Check } from 'lucide-react';
import { sendMessage, clearConversation, suggestedQuestions } from '../services/aiService';

const COOLDOWN_SECONDS = 5;
const FREE_QUESTION_LIMIT = 2;
const PREMIUM_PASSKEY = import.meta.env.VITE_PREMIUM_PASSKEY || 'eesh2025'; // Default passkey

const AIAssistant = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });
    const [messages, setMessages] = useState([
        {
            role: 'assistant',
            content: "Hey! 👋 I'm Eesh's AI assistant. Ask me anything about his skills, projects, experience, or how to get in touch!",
        },
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [cooldown, setCooldown] = useState(0);
    const [questionCount, setQuestionCount] = useState(() => {
        const saved = localStorage.getItem('ai_question_count');
        return saved ? parseInt(saved, 10) : 0;
    });
    const [isPremium, setIsPremium] = useState(() => {
        return localStorage.getItem('ai_premium_access') === 'true';
    });
    const [showPaywall, setShowPaywall] = useState(false);
    const [showPasskeyModal, setShowPasskeyModal] = useState(false);
    const [showRequestModal, setShowRequestModal] = useState(false);
    const [passkeyInput, setPasskeyInput] = useState('');
    const [passkeyError, setPasskeyError] = useState('');
    const [requestSent, setRequestSent] = useState(false);
    const messagesEndRef = useRef(null);
    const chatContainerRef = useRef(null);
    const inputRef = useRef(null);

    const scrollToBottom = () => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        if (cooldown > 0) {
            const timer = setTimeout(() => setCooldown(cooldown - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [cooldown]);

    // Save question count to localStorage
    useEffect(() => {
        localStorage.setItem('ai_question_count', questionCount.toString());
    }, [questionCount]);

    const remainingFreeQuestions = Math.max(0, FREE_QUESTION_LIMIT - questionCount);

    const handleSend = async (messageText = input) => {
        if (!messageText.trim() || isLoading || cooldown > 0) return;

        // Check if user has exceeded free limit and is not premium
        if (!isPremium && questionCount >= FREE_QUESTION_LIMIT) {
            setShowPaywall(true);
            return;
        }

        const userMessage = messageText.trim();
        setInput('');
        setMessages((prev) => [...prev, { role: 'user', content: userMessage }]);
        setIsLoading(true);

        try {
            const response = await sendMessage(userMessage);
            setMessages((prev) => [...prev, { role: 'assistant', content: response }]);
            setCooldown(COOLDOWN_SECONDS);

            // Only increment count for non-premium users
            if (!isPremium) {
                setQuestionCount((prev) => prev + 1);
            }
        } catch (err) {
            setMessages((prev) => [
                ...prev,
                {
                    role: 'assistant',
                    content: "I'm having trouble connecting right now. Please try again! 🙏",
                },
            ]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const handleReset = () => {
        clearConversation();
        setMessages([
            {
                role: 'assistant',
                content: "Hey! 👋 I'm Eesh's AI assistant. Ask me anything about his skills, projects, experience, or how to get in touch!",
            },
        ]);
        setCooldown(0);
    };

    const handleSuggestedQuestion = (question) => {
        if (cooldown > 0) return;
        if (!isPremium && questionCount >= FREE_QUESTION_LIMIT) {
            setShowPaywall(true);
            return;
        }
        handleSend(question);
    };

    const handlePasskeySubmit = () => {
        if (passkeyInput === PREMIUM_PASSKEY) {
            setIsPremium(true);
            localStorage.setItem('ai_premium_access', 'true');
            setShowPasskeyModal(false);
            setShowPaywall(false);
            setPasskeyInput('');
            setPasskeyError('');
        } else {
            setPasskeyError('Invalid passkey. Please try again or request access.');
        }
    };

    const handleRequestAccess = () => {
        // Open email with pre-filled request
        const subject = encodeURIComponent('Request for AI Assistant Premium Access');
        const body = encodeURIComponent(
            `Hi Eesh,\n\nI visited your portfolio and I'm interested in getting premium access to your AI Assistant.\n\nName: [Your Name]\nReason: [Why you'd like access]\n\nThank you!`
        );
        window.location.href = `mailto:eeshsagar@gmail.com?subject=${subject}&body=${body}`;
        setRequestSent(true);
    };

    const isInputDisabled = isLoading || cooldown > 0 || (!isPremium && questionCount >= FREE_QUESTION_LIMIT);

    return (
        <section id="ai-assistant" className="py-20 md:py-32 relative overflow-hidden">
            {/* Animated Background */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
            </div>

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10" ref={ref}>
                {/* Section Header */}
                <motion.div
                    className="text-center mb-12"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                >
                    <motion.div
                        className="inline-flex items-center gap-2 px-4 py-2 mb-4 rounded-full border border-emerald-500/30 bg-emerald-500/10"
                        animate={{ boxShadow: ['0 0 20px rgba(16, 185, 129, 0.2)', '0 0 40px rgba(16, 185, 129, 0.4)', '0 0 20px rgba(16, 185, 129, 0.2)'] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    >
                        <Sparkles className="text-emerald-400" size={16} />
                        <span className="text-emerald-400 font-medium text-sm">AI-Powered</span>
                        {isPremium && (
                            <span className="ml-2 px-2 py-0.5 bg-amber-500/20 text-amber-400 text-xs rounded-full flex items-center gap-1">
                                <Crown size={12} /> Premium
                            </span>
                        )}
                    </motion.div>
                    <h2 className="section-heading text-[var(--text-primary)]">
                        Ask My AI Assistant
                    </h2>
                    <div className="w-20 h-1 bg-gradient-to-r from-emerald-500 to-amber-500 mx-auto mt-4 rounded-full" />
                    <p className="text-[var(--text-muted)] mt-4 max-w-2xl mx-auto">
                        {isPremium
                            ? "You have unlimited access! Ask me anything about Eesh's skills, projects, or experience."
                            : `You have ${remainingFreeQuestions} free question${remainingFreeQuestions !== 1 ? 's' : ''} remaining. Contact me for premium access!`
                        }
                    </p>
                </motion.div>

                {/* Feature Cards */}
                <motion.div
                    className="grid md:grid-cols-3 gap-4 mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.2 }}
                >
                    {[
                        { icon: MessageSquare, title: 'Natural Conversation', desc: 'Ask questions in plain English' },
                        { icon: Zap, title: 'Instant Responses', desc: 'Get answers immediately' },
                        { icon: isPremium ? Crown : Lock, title: isPremium ? 'Unlimited Access' : `${remainingFreeQuestions} Free Questions`, desc: isPremium ? 'Premium member benefits' : 'Request passkey for more' },
                    ].map((feature, i) => (
                        <motion.div
                            key={feature.title}
                            className={`p-4 glass-card text-center ${i === 2 && !isPremium ? 'border-amber-500/30' : ''}`}
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.3 + i * 0.1 }}
                            whileHover={{ scale: 1.02, y: -2 }}
                        >
                            <feature.icon className={`mx-auto mb-2 ${i === 2 && !isPremium ? 'text-amber-400' : 'text-emerald-400'}`} size={24} />
                            <h4 className="text-[var(--text-primary)] font-medium text-sm">{feature.title}</h4>
                            <p className="text-[var(--text-muted)] text-xs mt-1">{feature.desc}</p>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Main Chat Container */}
                <motion.div
                    className="glass-card overflow-hidden relative"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.4, type: 'spring', stiffness: 100 }}
                    style={{
                        background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.05) 0%, rgba(245, 158, 11, 0.05) 100%)',
                    }}
                >
                    {/* Paywall Overlay */}
                    <AnimatePresence>
                        {showPaywall && (
                            <motion.div
                                className="absolute inset-0 z-20 flex items-center justify-center bg-[var(--bg-primary)]/90 backdrop-blur-md"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                            >
                                <motion.div
                                    className="text-center p-8 max-w-md"
                                    initial={{ scale: 0.9, y: 20 }}
                                    animate={{ scale: 1, y: 0 }}
                                >
                                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-amber-500/20 to-emerald-500/20 flex items-center justify-center">
                                        <Lock className="text-amber-400" size={32} />
                                    </div>
                                    <h3 className="text-xl font-bold text-[var(--text-primary)] mb-2">
                                        Free Limit Reached
                                    </h3>
                                    <p className="text-[var(--text-muted)] mb-6">
                                        You've used all {FREE_QUESTION_LIMIT} free questions. Get a passkey from Eesh for unlimited access!
                                    </p>
                                    <div className="flex flex-col gap-3">
                                        <motion.button
                                            onClick={() => {
                                                setShowPaywall(false);
                                                setShowPasskeyModal(true);
                                            }}
                                            className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-amber-500 text-white font-medium rounded-xl flex items-center justify-center gap-2"
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            <Key size={18} />
                                            I Have a Passkey
                                        </motion.button>
                                        <motion.button
                                            onClick={() => {
                                                setShowPaywall(false);
                                                setShowRequestModal(true);
                                            }}
                                            className="px-6 py-3 bg-[var(--bg-tertiary)] border border-[var(--border-color)] text-[var(--text-secondary)] font-medium rounded-xl flex items-center justify-center gap-2"
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            <Mail size={18} />
                                            Request Access
                                        </motion.button>
                                        <button
                                            onClick={() => setShowPaywall(false)}
                                            className="text-sm text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                                        >
                                            Maybe later
                                        </button>
                                    </div>
                                </motion.div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Chat Header */}
                    <div
                        className="flex items-center justify-between p-4 border-b border-[var(--border-color)]"
                        style={{
                            background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(245, 158, 11, 0.1) 100%)',
                        }}
                    >
                        <div className="flex items-center gap-3">
                            <motion.div
                                className="relative w-12 h-12 rounded-full flex items-center justify-center"
                                style={{
                                    background: 'linear-gradient(135deg, #10b981 0%, #f59e0b 100%)',
                                }}
                                animate={{ rotate: [0, 5, -5, 0] }}
                                transition={{ duration: 4, repeat: Infinity }}
                            >
                                <Bot className="text-white" size={24} />
                                <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 rounded-full border-2 border-[var(--bg-secondary)]" />
                            </motion.div>
                            <div>
                                <h3 className="font-bold text-[var(--text-primary)] flex items-center gap-2">
                                    Portfolio AI Assistant
                                    {isPremium && <Crown size={14} className="text-amber-400" />}
                                </h3>
                                <p className="text-xs text-emerald-400 flex items-center gap-1">
                                    <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                                    {isPremium ? 'Premium Mode • Unlimited' : `Free Mode • ${remainingFreeQuestions} left`}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            {!isPremium && (
                                <motion.button
                                    onClick={() => setShowPasskeyModal(true)}
                                    className="p-2 text-amber-400 hover:bg-amber-500/10 transition-colors rounded-lg"
                                    whileHover={{ scale: 1.1 }}
                                    title="Enter passkey"
                                >
                                    <Key size={18} />
                                </motion.button>
                            )}
                            <motion.button
                                onClick={handleReset}
                                className="p-2 text-[var(--text-muted)] hover:text-emerald-400 transition-colors rounded-lg hover:bg-[var(--bg-tertiary)]"
                                whileHover={{ scale: 1.1, rotate: 180 }}
                                whileTap={{ scale: 0.9 }}
                                title="Reset conversation"
                            >
                                <RefreshCw size={20} />
                            </motion.button>
                        </div>
                    </div>

                    {/* Messages Container */}
                    <div ref={chatContainerRef} className="h-[400px] overflow-y-auto p-4 space-y-4">
                        {messages.map((message, index) => (
                            <motion.div
                                key={index}
                                className={`flex items-start gap-3 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}
                                initial={{ opacity: 0, y: 10, x: message.role === 'user' ? 20 : -20 }}
                                animate={{ opacity: 1, y: 0, x: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <div
                                    className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${message.role === 'user' ? 'bg-[var(--bg-tertiary)]' : ''}`}
                                    style={message.role === 'assistant' ? { background: 'linear-gradient(135deg, #10b981 0%, #f59e0b 100%)' } : {}}
                                >
                                    {message.role === 'user' ? (
                                        <User size={18} className="text-[var(--text-muted)]" />
                                    ) : (
                                        <Bot size={18} className="text-white" />
                                    )}
                                </div>
                                <div
                                    className={`max-w-[75%] px-4 py-3 rounded-2xl ${message.role === 'user'
                                        ? 'bg-gradient-to-r from-emerald-500/20 to-amber-500/20 text-[var(--text-primary)] rounded-tr-sm'
                                        : 'bg-[var(--bg-tertiary)] text-[var(--text-secondary)] rounded-tl-sm'
                                        }`}
                                >
                                    <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                                </div>
                            </motion.div>
                        ))}

                        <AnimatePresence>
                            {isLoading && (
                                <motion.div
                                    className="flex items-start gap-3"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0 }}
                                >
                                    <div
                                        className="w-10 h-10 rounded-full flex items-center justify-center"
                                        style={{ background: 'linear-gradient(135deg, #10b981 0%, #f59e0b 100%)' }}
                                    >
                                        <Bot size={18} className="text-white" />
                                    </div>
                                    <div className="px-4 py-3 rounded-2xl bg-[var(--bg-tertiary)] rounded-tl-sm">
                                        <div className="flex items-center gap-2">
                                            <Loader2 size={16} className="animate-spin text-emerald-400" />
                                            <span className="text-sm text-[var(--text-muted)]">Thinking...</span>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <div ref={messagesEndRef} />
                    </div>

                    {/* Suggested Questions */}
                    <AnimatePresence>
                        {messages.length <= 2 && !isLoading && (
                            <motion.div
                                className="px-4 pb-4"
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                            >
                                <p className="text-xs text-[var(--text-muted)] mb-2">💡 Try asking:</p>
                                <div className="flex flex-wrap gap-2">
                                    {suggestedQuestions.map((question, index) => (
                                        <motion.button
                                            key={index}
                                            onClick={() => handleSuggestedQuestion(question)}
                                            disabled={cooldown > 0 || isInputDisabled}
                                            className="px-3 py-1.5 text-xs bg-[var(--bg-tertiary)] text-[var(--text-secondary)] rounded-full hover:bg-emerald-500/20 hover:text-emerald-400 transition-colors border border-[var(--border-color)] disabled:opacity-50 disabled:cursor-not-allowed"
                                            whileHover={!isInputDisabled ? { scale: 1.05 } : {}}
                                            whileTap={!isInputDisabled ? { scale: 0.95 } : {}}
                                        >
                                            {question}
                                        </motion.button>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Input Area */}
                    <div className="p-4 border-t border-[var(--border-color)] bg-[var(--bg-secondary)]/50">
                        <div className="flex items-center gap-3">
                            <input
                                ref={inputRef}
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={handleKeyPress}
                                placeholder={
                                    !isPremium && questionCount >= FREE_QUESTION_LIMIT
                                        ? "🔒 Enter passkey for unlimited access..."
                                        : cooldown > 0
                                            ? `Wait ${cooldown}s...`
                                            : "Ask me anything about Eesh..."
                                }
                                className="flex-1 px-4 py-3 bg-[var(--bg-tertiary)] border border-[var(--border-color)] rounded-xl text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-emerald-500/50 transition-colors disabled:opacity-50"
                                disabled={isInputDisabled}
                                onClick={() => {
                                    if (!isPremium && questionCount >= FREE_QUESTION_LIMIT) {
                                        setShowPaywall(true);
                                    }
                                }}
                            />
                            <motion.button
                                onClick={() => handleSend()}
                                disabled={!input.trim() || isLoading || cooldown > 0}
                                className="relative p-3 rounded-xl text-white disabled:opacity-50 disabled:cursor-not-allowed"
                                style={{
                                    background: input.trim() && !isLoading && cooldown === 0
                                        ? 'linear-gradient(135deg, #10b981 0%, #f59e0b 100%)'
                                        : 'var(--bg-tertiary)',
                                }}
                                whileHover={input.trim() && !isLoading && cooldown === 0 ? { scale: 1.05 } : {}}
                                whileTap={input.trim() && !isLoading && cooldown === 0 ? { scale: 0.95 } : {}}
                            >
                                {cooldown > 0 ? (
                                    <div className="flex items-center gap-1">
                                        <Clock size={18} className="text-[var(--text-muted)]" />
                                        <span className="text-xs text-[var(--text-muted)]">{cooldown}</span>
                                    </div>
                                ) : (
                                    <Send size={18} className={input.trim() && !isLoading ? 'text-white' : 'text-[var(--text-muted)]'} />
                                )}
                            </motion.button>
                        </div>

                        <p className="text-xs text-[var(--text-muted)] mt-2 text-center">
                            {isPremium ? (
                                <span className="text-emerald-400">👑 Premium Access • Unlimited questions</span>
                            ) : cooldown > 0 ? (
                                <span className="text-amber-400">⏱️ Rate limited: {cooldown}s</span>
                            ) : (
                                <span>{remainingFreeQuestions} free question{remainingFreeQuestions !== 1 ? 's' : ''} remaining</span>
                            )}
                        </p>
                        {/* Unlock buttons when free limit reached */}
                        {!isPremium && questionCount >= FREE_QUESTION_LIMIT && (
                            <div className="flex gap-2 mt-3">
                                <motion.button
                                    onClick={() => setShowPasskeyModal(true)}
                                    className="flex-1 py-2 bg-gradient-to-r from-emerald-500 to-amber-500 text-white text-sm font-medium rounded-xl flex items-center justify-center gap-2"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <Key size={16} />
                                    Enter Passkey
                                </motion.button>
                                <motion.button
                                    onClick={() => setShowRequestModal(true)}
                                    className="flex-1 py-2 bg-[var(--bg-tertiary)] border border-[var(--border-color)] text-[var(--text-secondary)] text-sm font-medium rounded-xl flex items-center justify-center gap-2"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <Mail size={16} />
                                    Request Access
                                </motion.button>
                            </div>
                        )}
                    </div>
                </motion.div>

                {/* Bottom CTA */}
                <motion.div
                    className="text-center mt-8"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.6 }}
                >
                    <p className="text-[var(--text-muted)] text-sm">
                        {isPremium ? (
                            <>Thanks for being a premium member! Check out my <a href="#projects" className="text-emerald-400 hover:underline">projects</a>.</>
                        ) : (
                            <>Need unlimited access? <button onClick={() => setShowRequestModal(true)} className="text-emerald-400 hover:underline">Request a passkey</button> from Eesh!</>
                        )}
                    </p>
                </motion.div>
            </div>

            {/* Passkey Modal */}
            <AnimatePresence>
                {showPasskeyModal && (
                    <motion.div
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setShowPasskeyModal(false)}
                    >
                        <motion.div
                            className="glass-card p-6 max-w-md w-full"
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
                                    <Key className="text-emerald-400" size={20} />
                                    Enter Passkey
                                </h3>
                                <button onClick={() => setShowPasskeyModal(false)} className="text-[var(--text-muted)] hover:text-[var(--text-primary)]">
                                    <X size={20} />
                                </button>
                            </div>
                            <p className="text-sm text-[var(--text-muted)] mb-4">
                                Enter the passkey provided by Eesh to unlock unlimited AI assistant access.
                            </p>
                            <input
                                type="password"
                                value={passkeyInput}
                                onChange={(e) => {
                                    setPasskeyInput(e.target.value);
                                    setPasskeyError('');
                                }}
                                onKeyDown={(e) => e.key === 'Enter' && handlePasskeySubmit()}
                                placeholder="Enter your passkey..."
                                className="w-full px-4 py-3 bg-[var(--bg-tertiary)] border border-[var(--border-color)] rounded-xl text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-emerald-500/50 mb-2"
                                autoFocus
                            />
                            {passkeyError && (
                                <p className="text-xs text-red-400 mb-3">{passkeyError}</p>
                            )}
                            <motion.button
                                onClick={handlePasskeySubmit}
                                className="w-full py-3 bg-gradient-to-r from-emerald-500 to-amber-500 text-white font-medium rounded-xl flex items-center justify-center gap-2"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <Check size={18} />
                                Unlock Premium Access
                            </motion.button>
                            <p className="text-xs text-center text-[var(--text-muted)] mt-3">
                                Don't have a passkey? <button onClick={() => { setShowPasskeyModal(false); setShowRequestModal(true); }} className="text-emerald-400 hover:underline">Request one</button>
                            </p>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Request Access Modal */}
            <AnimatePresence>
                {showRequestModal && (
                    <motion.div
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setShowRequestModal(false)}
                    >
                        <motion.div
                            className="glass-card p-6 max-w-md w-full"
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
                                    <Mail className="text-emerald-400" size={20} />
                                    Request Premium Access
                                </h3>
                                <button onClick={() => setShowRequestModal(false)} className="text-[var(--text-muted)] hover:text-[var(--text-primary)]">
                                    <X size={20} />
                                </button>
                            </div>
                            {requestSent ? (
                                <div className="text-center py-4">
                                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-emerald-500/20 flex items-center justify-center">
                                        <Check className="text-emerald-400" size={32} />
                                    </div>
                                    <h4 className="font-medium text-[var(--text-primary)] mb-2">Email Client Opened!</h4>
                                    <p className="text-sm text-[var(--text-muted)]">
                                        Complete the email to send your request to Eesh. He'll respond with your passkey!
                                    </p>
                                </div>
                            ) : (
                                <>
                                    <p className="text-sm text-[var(--text-muted)] mb-4">
                                        Click below to send an email request to Eesh. He'll review your request and provide a passkey for unlimited access.
                                    </p>
                                    <motion.button
                                        onClick={handleRequestAccess}
                                        className="w-full py-3 bg-gradient-to-r from-emerald-500 to-amber-500 text-white font-medium rounded-xl flex items-center justify-center gap-2"
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        <Mail size={18} />
                                        Send Request via Email
                                    </motion.button>
                                    <p className="text-xs text-center text-[var(--text-muted)] mt-3">
                                        Or email directly: <a href="mailto:eeshsagar@gmail.com" className="text-emerald-400">eeshsagar@gmail.com</a>
                                    </p>
                                </>
                            )}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default AIAssistant;
