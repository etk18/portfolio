// Admin Chat API - Handles chat for admin and saves to database

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;
const GROQ_API_KEY = process.env.VITE_GROQ_API_KEY || process.env.GROQ_API_KEY;

let supabase = null;
if (supabaseUrl && supabaseKey) {
    supabase = createClient(supabaseUrl, supabaseKey);
}

const ADMIN_SYSTEM_PROMPT = `You are a personal AI assistant for Eesh Sagar Singh. You're having a private conversation with Eesh himself (the admin/owner of the portfolio).

YOUR ROLE:
- Act as Eesh's personal assistant and memory
- Remember and acknowledge what Eesh tells you about his life, projects, and activities
- Be conversational, supportive, and helpful
- When Eesh shares information, acknowledge it naturally and ask follow-up questions when appropriate

IMPORTANT:
- Everything Eesh tells you will be stored and used to provide better context about him to portfolio visitors
- Help Eesh articulate his thoughts, projects, and experiences
- Be a good listener and conversation partner

Example responses:
- "That's exciting! A blockchain project sounds like a great addition to your portfolio. What specific aspects are you working on?"
- "Got it, I'll remember that you're focusing on LangChain right now. How's that going?"
- "Nice! Building an AI-powered portfolio feature is really cool. Want to tell me more about how it works?"`;

export default async function handler(req, res) {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { message, conversationHistory = [] } = req.body;

        if (!message) {
            return res.status(400).json({ error: 'Message is required' });
        }

        if (!GROQ_API_KEY) {
            return res.status(500).json({ error: 'Groq API key not configured' });
        }

        // Build messages for Groq
        const messages = [
            { role: 'system', content: ADMIN_SYSTEM_PROMPT },
            ...conversationHistory,
            { role: 'user', content: message }
        ];

        // Call Groq API
        const groqResponse = await fetch('https://api.groq.com/openai/v1/chat/completions', {
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

        if (!groqResponse.ok) {
            const error = await groqResponse.json();
            throw new Error(error.error?.message || 'Groq API error');
        }

        const data = await groqResponse.json();
        const assistantMessage = data.choices?.[0]?.message?.content;

        if (!assistantMessage) {
            throw new Error('No response from AI');
        }

        // Save both messages to database if Supabase is configured
        if (supabase) {
            await supabase.from('admin_conversations').insert([
                { role: 'user', content: message },
                { role: 'assistant', content: assistantMessage }
            ]);
        }

        return res.status(200).json({
            success: true,
            response: assistantMessage
        });

    } catch (error) {
        console.error('Admin chat error:', error);
        return res.status(500).json({
            error: 'Failed to process chat',
            details: error.message
        });
    }
}
