import { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
    ArrowLeft, Home, Upload, FileText, Loader2, CheckCircle2,
    AlertCircle, Sparkles, Target, TrendingUp, Lock, Key, Crown, X, Check
} from 'lucide-react';
import {
    extractTextFromFile, analyzeResume, canUseChecker,
    incrementUsageCount, getRemainingChecks, validatePasskey, FREE_USAGE_LIMIT
} from '../services/atsService';

const ATSCheckerPage = () => {
    const [file, setFile] = useState(null);
    const [isDragging, setIsDragging] = useState(false);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [results, setResults] = useState(null);
    const [error, setError] = useState(null);

    // Premium/usage state
    const [isPremium, setIsPremium] = useState(() => {
        return sessionStorage.getItem('atsPremium') === 'true';
    });
    const [showPaywall, setShowPaywall] = useState(false);
    const [passkey, setPasskey] = useState('');
    const [passkeyError, setPasskeyError] = useState('');

    const fileInputRef = useRef(null);
    const remainingChecks = getRemainingChecks(isPremium);

    const handleDragOver = useCallback((e) => {
        e.preventDefault();
        setIsDragging(true);
    }, []);

    const handleDragLeave = useCallback((e) => {
        e.preventDefault();
        setIsDragging(false);
    }, []);

    const handleDrop = useCallback((e) => {
        e.preventDefault();
        setIsDragging(false);
        const droppedFile = e.dataTransfer.files[0];
        if (droppedFile) {
            handleFileSelect(droppedFile);
        }
    }, []);

    const handleFileSelect = (selectedFile) => {
        const fileName = selectedFile.name.toLowerCase();
        if (!fileName.endsWith('.pdf') && !fileName.endsWith('.docx') && !fileName.endsWith('.doc')) {
            setError('Please upload a PDF or DOCX file');
            return;
        }
        setFile(selectedFile);
        setError(null);
        setResults(null);
    };

    const handleFileInputChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            handleFileSelect(selectedFile);
        }
    };

    const handleAnalyze = async () => {
        if (!file) return;

        // Check usage limits
        if (!canUseChecker(isPremium)) {
            setShowPaywall(true);
            return;
        }

        setIsAnalyzing(true);
        setError(null);
        setResults(null);

        try {
            // Extract text from file
            const text = await extractTextFromFile(file);

            if (!text || text.length < 50) {
                throw new Error('Could not extract enough text from the file. Please ensure the resume has readable content.');
            }

            // Analyze with AI
            const analysis = await analyzeResume(text);
            setResults(analysis);

            // Increment usage count only on success
            if (!isPremium) {
                incrementUsageCount();
            }
        } catch (err) {
            setError(err.message || 'Failed to analyze resume');
        } finally {
            setIsAnalyzing(false);
        }
    };

    const handlePasskeySubmit = () => {
        if (validatePasskey(passkey)) {
            setIsPremium(true);
            sessionStorage.setItem('atsPremium', 'true');
            setShowPaywall(false);
            setPasskey('');
            setPasskeyError('');
        } else {
            setPasskeyError('Invalid passkey');
        }
    };

    const getScoreColor = (score) => {
        if (score >= 80) return 'text-emerald-400';
        if (score >= 60) return 'text-amber-400';
        return 'text-rose-400';
    };

    const getScoreGradient = (score) => {
        if (score >= 80) return 'from-emerald-500 to-emerald-400';
        if (score >= 60) return 'from-amber-500 to-amber-400';
        return 'from-rose-500 to-rose-400';
    };

    const getLetterGrade = (score) => {
        if (score >= 90) return { grade: 'A+', label: 'Perfect', color: 'emerald', glow: true };
        if (score >= 80) return { grade: 'A', label: 'Excellent', color: 'emerald', glow: false };
        if (score >= 70) return { grade: 'B+', label: 'Very Good', color: 'cyan', glow: false };
        if (score >= 60) return { grade: 'B', label: 'Good', color: 'amber', glow: false };
        if (score >= 50) return { grade: 'C', label: 'Average', color: 'orange', glow: false };
        if (score >= 40) return { grade: 'D', label: 'Below Average', color: 'rose', glow: false };
        return { grade: 'F', label: 'Needs Work', color: 'rose', glow: false };
    };

    return (
        <div className="min-h-screen pt-20">
            {/* Header */}
            <div className="max-w-4xl mx-auto px-3 sm:px-6 lg:px-8 py-3 sm:py-4">
                <div className="flex items-center justify-between gap-2">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                    >
                        <Link
                            to="/"
                            className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-[var(--text-secondary)] hover:text-rose-400 bg-[var(--bg-tertiary)] border border-[var(--border-color)] rounded-lg sm:rounded-xl transition-all hover:border-rose-500/30"
                        >
                            <ArrowLeft size={16} className="sm:w-[18px] sm:h-[18px]" />
                            <Home size={14} className="sm:w-4 sm:h-4" />
                            <span className="hidden sm:inline">Back to Home</span>
                        </Link>
                    </motion.div>

                    {/* Usage indicator */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1 sm:py-1.5 bg-[var(--bg-tertiary)] border border-[var(--border-color)] rounded-lg"
                    >
                        {isPremium ? (
                            <>
                                <Crown size={14} className="sm:w-4 sm:h-4 text-amber-400" />
                                <span className="text-xs sm:text-sm text-amber-400">Premium</span>
                            </>
                        ) : (
                            <>
                                <Target size={14} className="sm:w-4 sm:h-4 text-[var(--text-muted)]" />
                                <span className="text-xs sm:text-sm text-[var(--text-muted)]">
                                    {remainingChecks}/{FREE_USAGE_LIMIT} left
                                </span>
                            </>
                        )}
                    </motion.div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-4xl mx-auto px-3 sm:px-6 lg:px-8 pb-6 sm:pb-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-6 sm:mb-8"
                >
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-2 sm:mb-3">
                        Resume ATS Score Checker
                    </h1>
                    <p className="text-sm sm:text-base text-[var(--text-muted)] max-w-2xl mx-auto px-2">
                        Upload your resume to get an ATS compatibility score and discover the best matching job roles for your profile.
                    </p>
                </motion.div>

                {/* Upload Zone */}
                {!results && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                    >
                        <div
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                            onClick={() => fileInputRef.current?.click()}
                            className={`glass-card rounded-xl sm:rounded-2xl border-2 border-dashed p-6 sm:p-8 md:p-12 text-center cursor-pointer transition-all ${isDragging
                                ? 'border-rose-500 bg-rose-500/10'
                                : file
                                    ? 'border-emerald-500/50 bg-emerald-500/5'
                                    : 'border-[var(--border-color)] hover:border-rose-500/50'
                                }`}
                        >
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept=".pdf,.docx,.doc"
                                onChange={handleFileInputChange}
                                className="hidden"
                            />

                            {file ? (
                                <div className="flex flex-col items-center gap-4">
                                    <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center">
                                        <FileText className="w-8 h-8 text-emerald-400" />
                                    </div>
                                    <div>
                                        <p className="text-lg font-medium text-[var(--text-primary)]">{file.name}</p>
                                        <p className="text-sm text-[var(--text-muted)]">
                                            {(file.size / 1024).toFixed(1)} KB • Click to change
                                        </p>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center gap-4">
                                    <div className="w-16 h-16 rounded-full bg-rose-500/20 flex items-center justify-center">
                                        <Upload className="w-8 h-8 text-rose-400" />
                                    </div>
                                    <div>
                                        <p className="text-lg font-medium text-[var(--text-primary)]">
                                            Drop your resume here
                                        </p>
                                        <p className="text-sm text-[var(--text-muted)]">
                                            or click to browse • PDF, DOCX supported
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Error message */}
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="mt-4 p-4 bg-rose-500/10 border border-rose-500/30 rounded-xl flex items-center gap-3"
                            >
                                <AlertCircle className="w-5 h-5 text-rose-400 flex-shrink-0" />
                                <p className="text-rose-400 text-sm">{error}</p>
                            </motion.div>
                        )}

                        {/* Analyze button */}
                        <motion.button
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            onClick={handleAnalyze}
                            disabled={!file || isAnalyzing}
                            className="mt-6 w-full py-4 bg-gradient-to-r from-rose-500 to-amber-500 text-white font-semibold rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {isAnalyzing ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    <span>Analyzing Resume...</span>
                                </>
                            ) : (
                                <>
                                    <Sparkles className="w-5 h-5" />
                                    <span>Analyze Resume</span>
                                </>
                            )}
                        </motion.button>
                    </motion.div>
                )}

                {/* Results */}
                {results && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-6"
                    >
                        {/* ATS Score */}
                        <div className="glass-card rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 text-center border border-[var(--border-color)]">
                            <h2 className="text-lg sm:text-xl font-semibold text-[var(--text-primary)] mb-4 sm:mb-6">ATS Compatibility Score</h2>
                            <div className="flex flex-col items-center justify-center gap-4 sm:gap-6 md:gap-8 md:flex-row">
                                {/* Circular Score */}
                                <div className="relative inline-flex items-center justify-center">
                                    <svg className="w-28 h-28 sm:w-36 sm:h-36 md:w-40 md:h-40 transform -rotate-90" viewBox="0 0 160 160">
                                        <circle
                                            cx="80" cy="80" r="70"
                                            fill="none"
                                            stroke="var(--bg-tertiary)"
                                            strokeWidth="12"
                                        />
                                        <circle
                                            cx="80" cy="80" r="70"
                                            fill="none"
                                            stroke="url(#scoreGradient)"
                                            strokeWidth="12"
                                            strokeLinecap="round"
                                            strokeDasharray={`${(results.atsScore / 100) * 440} 440`}
                                        />
                                        <defs>
                                            <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                                <stop offset="0%" stopColor={results.atsScore >= 60 ? '#10b981' : '#f43f5e'} />
                                                <stop offset="100%" stopColor={results.atsScore >= 80 ? '#10b981' : results.atsScore >= 60 ? '#f59e0b' : '#f43f5e'} />
                                            </linearGradient>
                                        </defs>
                                    </svg>
                                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                                        <span className={`text-3xl sm:text-4xl font-bold ${getScoreColor(results.atsScore)}`}>
                                            {results.atsScore}
                                        </span>
                                        <span className="text-xs sm:text-sm text-[var(--text-muted)]">out of 100</span>
                                    </div>
                                </div>

                                {/* Letter Grade */}
                                {(() => {
                                    const { grade, label, color, glow } = getLetterGrade(results.atsScore);
                                    return (
                                        <motion.div
                                            initial={{ scale: 0, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
                                            className={`flex flex-col items-center gap-1.5 sm:gap-2 p-4 sm:p-6 rounded-xl sm:rounded-2xl border ${glow
                                                ? `bg-${color}-500/20 border-${color}-500/50 shadow-lg shadow-${color}-500/30`
                                                : `bg-${color}-500/10 border-${color}-500/30`
                                                }`}
                                            style={glow ? {
                                                boxShadow: `0 0 30px rgba(16, 185, 129, 0.4), 0 0 60px rgba(16, 185, 129, 0.2)`,
                                                animation: 'pulse 2s infinite'
                                            } : {}}
                                        >
                                            <motion.span
                                                className={`text-4xl sm:text-5xl font-black ${color === 'emerald' ? 'text-emerald-400' :
                                                    color === 'cyan' ? 'text-cyan-400' :
                                                        color === 'amber' ? 'text-amber-400' :
                                                            color === 'orange' ? 'text-orange-400' :
                                                                'text-rose-400'
                                                    }`}
                                                animate={glow ? {
                                                    textShadow: [
                                                        '0 0 10px rgba(16, 185, 129, 0.5)',
                                                        '0 0 20px rgba(16, 185, 129, 0.8)',
                                                        '0 0 10px rgba(16, 185, 129, 0.5)'
                                                    ]
                                                } : {}}
                                                transition={glow ? { repeat: Infinity, duration: 1.5 } : {}}
                                            >
                                                {grade}
                                            </motion.span>
                                            <span className={`text-xs sm:text-sm font-medium ${color === 'emerald' ? 'text-emerald-400' :
                                                color === 'cyan' ? 'text-cyan-400' :
                                                    color === 'amber' ? 'text-amber-400' :
                                                        color === 'orange' ? 'text-orange-400' :
                                                            'text-rose-400'
                                                }`}>
                                                {label}
                                            </span>
                                            {glow && (
                                                <motion.div
                                                    className="flex items-center gap-1 text-emerald-400 text-xs mt-1"
                                                    animate={{ opacity: [0.5, 1, 0.5] }}
                                                    transition={{ repeat: Infinity, duration: 1.5 }}
                                                >
                                                    <Sparkles size={12} />
                                                    <span>Outstanding!</span>
                                                </motion.div>
                                            )}
                                        </motion.div>
                                    );
                                })()}
                            </div>
                        </div>

                        {/* Job Matches */}
                        <div className="glass-card rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-[var(--border-color)]">
                            <h2 className="text-base sm:text-xl font-semibold text-[var(--text-primary)] mb-3 sm:mb-4 flex items-center gap-2">
                                <Target className="w-4 h-4 sm:w-5 sm:h-5 text-rose-400" />
                                Best Matching Job Roles
                            </h2>
                            <div className="space-y-3">
                                {results.jobMatches?.map((job, index) => (
                                    <div key={index} className="flex items-center gap-3 sm:gap-4">
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center justify-between mb-1 gap-2">
                                                <span className="text-sm sm:text-base font-medium text-[var(--text-primary)] truncate">{job.role}</span>
                                                <span className="text-xs sm:text-sm text-[var(--text-muted)] flex-shrink-0">{job.match}%</span>
                                            </div>
                                            <div className="h-1.5 sm:h-2 bg-[var(--bg-tertiary)] rounded-full overflow-hidden">
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    animate={{ width: `${job.match}%` }}
                                                    transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                                                    className={`h-full rounded-full bg-gradient-to-r ${getScoreGradient(job.match)}`}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Strengths & Improvements */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                            <div className="glass-card rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-[var(--border-color)]">
                                <h2 className="text-base sm:text-lg font-semibold text-[var(--text-primary)] mb-3 sm:mb-4 flex items-center gap-2">
                                    <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400" />
                                    Strengths
                                </h2>
                                <ul className="space-y-2">
                                    {results.strengths?.map((strength, index) => (
                                        <li key={index} className="flex items-start gap-2 text-xs sm:text-sm text-[var(--text-secondary)]">
                                            <span className="text-emerald-400 mt-0.5 flex-shrink-0">✓</span>
                                            <span>{strength}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="glass-card rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-[var(--border-color)]">
                                <h2 className="text-base sm:text-lg font-semibold text-[var(--text-primary)] mb-3 sm:mb-4 flex items-center gap-2">
                                    <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400" />
                                    Improvements
                                </h2>
                                <ul className="space-y-2">
                                    {results.improvements?.map((improvement, index) => (
                                        <li key={index} className="flex items-start gap-2 text-xs sm:text-sm text-[var(--text-secondary)]">
                                            <span className="text-amber-400 mt-0.5 flex-shrink-0">→</span>
                                            <span>{improvement}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* Check Another */}
                        <motion.button
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            onClick={() => {
                                setFile(null);
                                setResults(null);
                                setError(null);
                            }}
                            className="w-full py-4 bg-[var(--bg-tertiary)] border border-[var(--border-color)] text-[var(--text-primary)] font-semibold rounded-xl hover:bg-[var(--bg-secondary)] transition-colors flex items-center justify-center gap-2"
                        >
                            <Upload className="w-5 h-5" />
                            <span>Check Another Resume</span>
                        </motion.button>
                    </motion.div>
                )}
            </div>

            {/* Paywall Modal */}
            <AnimatePresence>
                {showPaywall && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                        onClick={() => setShowPaywall(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="glass-card rounded-2xl p-8 max-w-md w-full border border-[var(--border-color)]"
                            onClick={e => e.stopPropagation()}
                        >
                            <div className="text-center mb-6">
                                <div className="w-16 h-16 rounded-full bg-amber-500/20 flex items-center justify-center mx-auto mb-4">
                                    <Lock className="w-8 h-8 text-amber-400" />
                                </div>
                                <h3 className="text-xl font-bold text-[var(--text-primary)]">Free Limit Reached</h3>
                                <p className="text-[var(--text-muted)] mt-2">
                                    You've used all {FREE_USAGE_LIMIT} free checks. Enter a passkey for unlimited access.
                                </p>
                            </div>

                            <div className="space-y-4">
                                <div className="flex gap-2">
                                    <input
                                        type="password"
                                        value={passkey}
                                        onChange={(e) => setPasskey(e.target.value)}
                                        placeholder="Enter passkey"
                                        className="flex-1 px-4 py-3 bg-[var(--bg-tertiary)] border border-[var(--border-color)] rounded-xl text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-amber-500/50"
                                        onKeyPress={(e) => e.key === 'Enter' && handlePasskeySubmit()}
                                    />
                                    <button
                                        onClick={handlePasskeySubmit}
                                        className="px-4 py-3 bg-amber-500 text-white rounded-xl hover:bg-amber-600 transition-colors"
                                    >
                                        <Key size={20} />
                                    </button>
                                </div>
                                {passkeyError && (
                                    <p className="text-rose-400 text-sm text-center">{passkeyError}</p>
                                )}
                            </div>

                            <button
                                onClick={() => setShowPaywall(false)}
                                className="mt-6 w-full py-3 text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
                            >
                                Maybe later
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ATSCheckerPage;
