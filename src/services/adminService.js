// Admin Service - API calls for admin authentication and conversations
import { createClient } from '@supabase/supabase-js';

const API_BASE = '/api';

// Fallback credentials for local development (from env vars with VITE_ prefix)
const DEV_USERNAME = import.meta.env.VITE_ADMIN_USERNAME || 'admin';
const DEV_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || 'eesh2025';

// Initialize Supabase client for direct frontend access (dev mode)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
let supabase = null;
if (supabaseUrl && supabaseKey) {
    supabase = createClient(supabaseUrl, supabaseKey);
}

// Save message to Supabase (for dev mode)
async function saveToSupabase(role, content) {
    if (!supabase) return;
    try {
        await supabase.from('admin_conversations').insert([{ role, content }]);
    } catch (error) {
        console.error('Failed to save to Supabase:', error);
    }
}

// Admin authentication
export async function adminLogin(username, password) {
    try {
        const response = await fetch(`${API_BASE}/auth`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        });

        // If API route exists, use it
        if (response.ok) {
            const data = await response.json();
            if (data.success && data.token) {
                sessionStorage.setItem('adminToken', data.token);
                return { success: true };
            }
            return { success: false, error: data.error || 'Login failed' };
        }

        // Fallback for local development (404 means API routes not available)
        if (response.status === 404) {
            console.log('API routes not available. Using local dev mode.');
            if (username === DEV_USERNAME && password === DEV_PASSWORD) {
                sessionStorage.setItem('adminToken', 'local-dev-token');
                return { success: true, devMode: true };
            }
            return { success: false, error: 'Invalid credentials' };
        }

        const data = await response.json();
        return { success: false, error: data.error || 'Login failed' };
    } catch (error) {
        console.error('Login error:', error);

        // If fetch fails completely, try local fallback
        if (username === DEV_USERNAME && password === DEV_PASSWORD) {
            sessionStorage.setItem('adminToken', 'local-dev-token');
            return { success: true, devMode: true };
        }
        return { success: false, error: 'Connection error' };
    }
}

export function adminLogout() {
    sessionStorage.removeItem('adminToken');
}

export function isAdminAuthenticated() {
    return !!sessionStorage.getItem('adminToken');
}

// Admin chat
export async function sendAdminMessage(message, conversationHistory = []) {
    // Check if in dev mode (local-dev-token)
    const token = sessionStorage.getItem('adminToken');
    const isDevMode = token === 'local-dev-token';

    // Try API route first (for production/vercel dev)
    if (!isDevMode) {
        try {
            const response = await fetch(`${API_BASE}/chat`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ message, conversationHistory }),
            });

            if (response.ok) {
                const data = await response.json();
                if (data.success) {
                    return { success: true, response: data.response };
                }
                return { success: false, error: data.error || 'Chat failed' };
            }
        } catch (error) {
            console.log('API routes not available, falling back to direct Groq call');
        }
    }

    // Fallback: Direct Groq API call for local development
    try {
        const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY;
        if (!GROQ_API_KEY) {
            return { success: false, error: 'Groq API key not configured' };
        }

        const systemPrompt = `You are a personal AI assistant for Eesh Sagar Singh. You're having a private conversation with Eesh himself.
Act as Eesh's personal assistant and memory. Be conversational, supportive, and helpful.
When Eesh shares information, acknowledge it naturally. Everything shared will be used to provide better context to portfolio visitors.`;

        const messages = [
            { role: 'system', content: systemPrompt },
            ...conversationHistory,
            { role: 'user', content: message }
        ];

        const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${GROQ_API_KEY}`,
            },
            body: JSON.stringify({
                model: 'llama-3.3-70b-versatile',
                messages: messages,
                temperature: 0.8,
                max_tokens: 500,
            }),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error?.message || 'Groq API error');
        }

        const data = await response.json();
        const assistantMessage = data.choices?.[0]?.message?.content;

        if (!assistantMessage) {
            throw new Error('No response from AI');
        }

        // Save both messages to Supabase directly (dev mode)
        await saveToSupabase('user', message);
        await saveToSupabase('assistant', assistantMessage);

        return { success: true, response: assistantMessage, devMode: true };
    } catch (error) {
        console.error('Chat error:', error);
        return { success: false, error: error.message || 'Connection error' };
    }
}

// Fetch stored conversations for context
export async function fetchAdminContext() {
    // Try API first
    try {
        const response = await fetch(`${API_BASE}/conversations`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            const data = await response.json();
            if (data.conversations && data.conversations.length > 0) {
                const contextMessages = data.conversations
                    .slice(-50)
                    .map(msg => `${msg.role === 'user' ? 'Eesh' : 'AI'}: ${msg.content}`)
                    .join('\n');
                return contextMessages;
            }
        }
    } catch (error) {
        console.log('API not available, trying direct Supabase');
    }

    // Fallback: Direct Supabase query for dev mode
    if (supabase) {
        try {
            const { data, error } = await supabase
                .from('admin_conversations')
                .select('*')
                .order('created_at', { ascending: true })
                .limit(50);

            if (error) throw error;

            if (data && data.length > 0) {
                const contextMessages = data
                    .map(msg => `${msg.role === 'user' ? 'Eesh' : 'AI'}: ${msg.content}`)
                    .join('\n');
                return contextMessages;
            }
        } catch (error) {
            console.error('Supabase query error:', error);
        }
    }

    return null;
}
