// Admin Authentication API
// Simple token-based auth using environment variables

export default async function handler(req, res) {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { username, password } = req.body;

        const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin';
        const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'eesh2025';

        if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
            // Generate a simple session token
            const token = Buffer.from(`${username}:${Date.now()}`).toString('base64');

            return res.status(200).json({
                success: true,
                token,
                message: 'Authentication successful'
            });
        } else {
            return res.status(401).json({
                success: false,
                error: 'Invalid credentials'
            });
        }
    } catch (error) {
        console.error('Auth error:', error);
        return res.status(500).json({
            success: false,
            error: 'Internal server error'
        });
    }
}
