// Conversations API - Store and retrieve admin conversations
// Uses Supabase for persistence

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

let supabase = null;
if (supabaseUrl && supabaseKey) {
    supabase = createClient(supabaseUrl, supabaseKey);
}

export default async function handler(req, res) {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    // Check if Supabase is configured
    if (!supabase) {
        // Fallback: return empty for GET, acknowledge for POST
        if (req.method === 'GET') {
            return res.status(200).json({ conversations: [], fallback: true });
        }
        return res.status(200).json({ success: true, fallback: true, message: 'Database not configured, message not persisted' });
    }

    try {
        if (req.method === 'GET') {
            // Retrieve all admin conversations for context
            const { data, error } = await supabase
                .from('admin_conversations')
                .select('*')
                .order('created_at', { ascending: true });

            if (error) throw error;

            return res.status(200).json({ conversations: data || [] });
        }

        if (req.method === 'POST') {
            // Save a new conversation message
            const { role, content } = req.body;

            if (!role || !content) {
                return res.status(400).json({ error: 'Role and content are required' });
            }

            const { data, error } = await supabase
                .from('admin_conversations')
                .insert([{ role, content }])
                .select();

            if (error) throw error;

            return res.status(201).json({ success: true, message: data[0] });
        }

        return res.status(405).json({ error: 'Method not allowed' });
    } catch (error) {
        console.error('Conversations API error:', error);
        return res.status(500).json({ error: 'Internal server error', details: error.message });
    }
}
