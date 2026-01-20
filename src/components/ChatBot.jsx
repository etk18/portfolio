import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Sparkles, User, Bot, Loader2, RefreshCw } from 'lucide-react';
import { sendMessage, clearConversation, suggestedQuestions } from '../services/aiService';

const ChatBot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        {
            role: 'assistant',
            content: "Hi! 👋 I'm Eesh's AI assistant. Ask me anything about his skills, projects, or experience!",
        },
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen]);

    const handleSend = async (messageText = input) => {
        if (!messageText.trim() || isLoading) return;

        const userMessage = messageText.trim();
        setInput('');
        setError(null);
        setMessages((prev) => [...prev, { role: 'user', content: userMessage }]);
        setIsLoading(true);

        try {
            const response = await sendMessage(userMessage);
            setMessages((prev) => [...prev, { role: 'assistant', content: response }]);
        } catch (err) {
            setError(err.message || 'Failed to get response. Please try again.');
            setMessages((prev) => [
                ...prev,
                {
                    role: 'assistant',
                    content: "I'm having trouble connecting right now. Please try again in a moment! 🙏",
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
                content: "Hi! 👋 I'm Eesh's AI assistant. Ask me anything about his skills, projects, or experience!",
            },
        ]);
        setError(null);
    };

    const handleSuggestedQuestion = (question) => {
        handleSend(question);
    };

    return (
        <>
            {/* Floating Chat Button */}
            <motion.button
                onClick={() => setIsOpen(true)}
                className={`fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-2xl ${isOpen ? 'scale-0' : 'scale-100'
                    }`}
                style={{
                    background: 'linear-gradient(135deg, #10b981 0%, #f59e0b 100%)',
                }}
                whileHover={{ scale: 1.1, boxShadow: '0 0 30px rgba(16, 185, 129, 0.5)' }}
                whileTap={{ scale: 0.95 }}
                initial={{ scale: 0 }}
                animate={{ scale: isOpen ? 0 : 1 }}
                transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                aria-label="Open AI Assistant"
            >
                <MessageCircle className="text-white" size={24} />
                <motion.div
                    className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5 }}
                >
                    <Sparkles size={10} className="text-white" />
                </motion.div>
            </motion.button>

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="fixed bottom-6 right-6 z-50 w-[90vw] max-w-[400px] h-[70vh] max-h-[600px] flex flex-col rounded-2xl overflow-hidden shadow-2xl"
                        style={{
                            background: 'var(--bg-secondary)',
                            border: '1px solid var(--border-color)',
                            backdropFilter: 'blur(20px)',
                        }}
                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 20 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    >
                        {/* Header */}
                        <div
                            className="flex items-center justify-between p-4 border-b border-[var(--border-color)]"
                            style={{
                                background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(245, 158, 11, 0.1) 100%)',
                            }}
                        >
                            <div className="flex items-center gap-3">
                                <div className="relative">
                                    <div
                                        className="w-10 h-10 rounded-full flex items-center justify-center"
                                        style={{
                                            background: 'linear-gradient(135deg, #10b981 0%, #f59e0b 100%)',
                                        }}
                                    >
                                        <Bot className="text-white" size={20} />
                                    </div>
                                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-[var(--bg-secondary)]" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-[var(--text-primary)] text-sm">Portfolio Assistant</h3>
                                    <p className="text-xs text-emerald-400">Powered by AI</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <motion.button
                                    onClick={handleReset}
                                    className="p-2 text-[var(--text-muted)] hover:text-emerald-400 transition-colors rounded-lg hover:bg-[var(--bg-tertiary)]"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    title="Reset conversation"
                                >
                                    <RefreshCw size={18} />
                                </motion.button>
                                <motion.button
                                    onClick={() => setIsOpen(false)}
                                    className="p-2 text-[var(--text-muted)] hover:text-red-400 transition-colors rounded-lg hover:bg-[var(--bg-tertiary)]"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    <X size={18} />
                                </motion.button>
                            </div>
                        </div>

                        {/* Messages Container */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4">
                            {messages.map((message, index) => (
                                <motion.div
                                    key={index}
                                    className={`flex items-start gap-2 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                >
                                    {/* Avatar */}
                                    <div
                                        className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${message.role === 'user'
                                            ? 'bg-[var(--bg-tertiary)]'
                                            : ''
                                            }`}
                                        style={
                                            message.role === 'assistant'
                                                ? { background: 'linear-gradient(135deg, #10b981 0%, #f59e0b 100%)' }
                                                : {}
                                        }
                                    >
                                        {message.role === 'user' ? (
                                            <User size={16} className="text-[var(--text-muted)]" />
                                        ) : (
                                            <Bot size={16} className="text-white" />
                                        )}
                                    </div>

                                    {/* Message Bubble */}
                                    <div
                                        className={`max-w-[80%] px-4 py-3 rounded-2xl ${message.role === 'user'
                                            ? 'bg-emerald-500/20 text-[var(--text-primary)] rounded-tr-sm'
                                            : 'bg-[var(--bg-tertiary)] text-[var(--text-secondary)] rounded-tl-sm'
                                            }`}
                                    >
                                        <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                                    </div>
                                </motion.div>
                            ))}

                            {/* Loading Indicator */}
                            {isLoading && (
                                <motion.div
                                    className="flex items-start gap-2"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                >
                                    <div
                                        className="w-8 h-8 rounded-full flex items-center justify-center"
                                        style={{ background: 'linear-gradient(135deg, #10b981 0%, #f59e0b 100%)' }}
                                    >
                                        <Bot size={16} className="text-white" />
                                    </div>
                                    <div className="max-w-[80%] px-4 py-3 rounded-2xl bg-[var(--bg-tertiary)] rounded-tl-sm">
                                        <div className="flex items-center gap-2">
                                            <Loader2 size={16} className="animate-spin text-emerald-400" />
                                            <span className="text-sm text-[var(--text-muted)]">Thinking...</span>
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            <div ref={messagesEndRef} />
                        </div>

                        {/* Suggested Questions (show when only welcome message) */}
                        {messages.length === 1 && (
                            <div className="px-4 pb-2">
                                <p className="text-xs text-[var(--text-muted)] mb-2">Try asking:</p>
                                <div className="flex flex-wrap gap-2">
                                    {suggestedQuestions.slice(0, 3).map((question, index) => (
                                        <motion.button
                                            key={index}
                                            onClick={() => handleSuggestedQuestion(question)}
                                            className="px-3 py-1.5 text-xs bg-[var(--bg-tertiary)] text-[var(--text-secondary)] rounded-full hover:bg-emerald-500/20 hover:text-emerald-400 transition-colors border border-[var(--border-color)]"
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            {question}
                                        </motion.button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Error Message */}
                        {error && (
                            <div className="px-4 pb-2">
                                <p className="text-xs text-red-400">{error}</p>
                            </div>
                        )}

                        {/* Input Area */}
                        <div className="p-4 border-t border-[var(--border-color)]">
                            <div className="flex items-center gap-2">
                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={handleKeyPress}
                                    placeholder="Ask about skills, projects..."
                                    className="flex-1 px-4 py-3 bg-[var(--bg-tertiary)] border border-[var(--border-color)] rounded-xl text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-emerald-500/50 transition-colors"
                                    disabled={isLoading}
                                />
                                <motion.button
                                    onClick={() => handleSend()}
                                    disabled={!input.trim() || isLoading}
                                    className="p-3 rounded-xl text-white disabled:opacity-50 disabled:cursor-not-allowed"
                                    style={{
                                        background: input.trim() && !isLoading
                                            ? 'linear-gradient(135deg, #10b981 0%, #f59e0b 100%)'
                                            : 'var(--bg-tertiary)',
                                    }}
                                    whileHover={input.trim() && !isLoading ? { scale: 1.05 } : {}}
                                    whileTap={input.trim() && !isLoading ? { scale: 0.95 } : {}}
                                >
                                    <Send size={18} className={input.trim() && !isLoading ? 'text-white' : 'text-[var(--text-muted)]'} />
                                </motion.button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default ChatBot;
