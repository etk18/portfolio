// AI Service for Groq API Integration
import { getRelevantContext, portfolioData } from '../data/portfolioKnowledge';

const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY;
const API_URL = 'https://api.groq.com/openai/v1/chat/completions';

const SYSTEM_PROMPT = `You are a friendly, conversational AI assistant representing Eesh Sagar Singh's portfolio. Think of yourself as Eesh's helpful digital representative who can chat naturally about his background, projects, and skills.

YOUR PERSONALITY:
- Be warm, enthusiastic, and conversational (like chatting with a friend)
- Use natural language, not bullet points or formal lists
- Show genuine excitement when discussing Eesh's projects and achievements
- Be helpful and engaging, encouraging follow-up questions
- Use emojis occasionally to add warmth 😊

HOW TO RESPOND:
- For "explain" or "tell me about" questions: Give detailed, narrative explanations
- For simple questions: Give concise, direct answers
- For vague questions: Ask clarifying questions or give an overview
- For technical questions: Show depth of knowledge about the tech stack
- NEVER just list information - weave it into a natural conversation
- VARY your responses - don't repeat the same phrasing

EXAMPLES OF GOOD RESPONSES:
❌ Bad: "Skills: Python (90%), React (85%), Node.js (80%)"
✅ Good: "Eesh is really strong in Python - it's his go-to language for all ML work! He's built some cool stuff with TensorFlow and PyTorch. On the web side, he's a React enthusiast and has solid Node.js skills for backend work."

❌ Bad: "Project: Crypto Price Prediction Model. Technologies: Python, TensorFlow."
✅ Good: "The crypto prediction project is actually pretty fascinating! Eesh built an LSTM neural network that analyzes time-series data from over 50,000 data points to predict cryptocurrency price movements. He used TensorFlow and Keras, with careful hyperparameter tuning to improve accuracy. Want to know more about the technical approach?"

IMPORTANT:
- You have Eesh's complete portfolio info in the context below
- Answer based ONLY on this information
- If something isn't covered, say so and offer related information
- Always be ready to dive deeper into any topic`;

// Store conversation history for context
let conversationHistory = [];

export async function sendMessage(userMessage) {
    if (!GROQ_API_KEY) {
        throw new Error('Groq API key not configured. Please add VITE_GROQ_API_KEY to your .env file.');
    }

    // Get full portfolio context
    const portfolioContext = getRelevantContext();

    // Fetch admin context (stored conversations)
    let adminContext = '';
    try {
        // Try API first
        const response = await fetch('/api/conversations');
        if (response.ok) {
            const data = await response.json();
            if (data.conversations && data.conversations.length > 0) {
                const recentConversations = data.conversations.slice(-30);
                adminContext = recentConversations
                    .map(msg => `${msg.role === 'user' ? 'Eesh' : 'AI'}: ${msg.content}`)
                    .join('\n');
            }
        } else {
            // Fallback: Direct Supabase query for dev mode
            const { fetchAdminContext } = await import('./adminService.js');
            adminContext = await fetchAdminContext() || '';
        }
    } catch (error) {
        console.log('Admin context fetch failed, trying direct Supabase');
        try {
            const { fetchAdminContext } = await import('./adminService.js');
            adminContext = await fetchAdminContext() || '';
        } catch (e) {
            console.log('Admin context not available');
        }
    }

    // First message includes full context
    const isFirstMessage = conversationHistory.length === 0;

    // Build system content with admin context
    let systemContent = SYSTEM_PROMPT;
    if (isFirstMessage) {
        systemContent += `\n\nPORTFOLIO CONTEXT:\n${portfolioContext}`;
    }
    if (adminContext) {
        systemContent += `\n\nRECENT CONVERSATIONS WITH EESH (use this for additional context about what he's currently working on):\n${adminContext}`;
    }

    // Build messages array
    const messages = [
        {
            role: 'system',
            content: systemContent
        },
    ];

    // Add portfolio context reminder every 5 messages
    if (!isFirstMessage && conversationHistory.length % 5 === 0) {
        messages.push({
            role: 'system',
            content: `Reminder of portfolio info:\n${portfolioContext}`
        });
    }

    // Add conversation history
    messages.push(...conversationHistory);

    // Add new user message
    messages.push({ role: 'user', content: userMessage });

    try {
        const response = await fetch(API_URL, {
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
                presence_penalty: 0.3,
                frequency_penalty: 0.3,
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Groq API Error:', errorData);

            if (response.status === 429 || errorData.error?.type === 'insufficient_quota') {
                throw new Error('API rate limit reached. Please try again in a moment.');
            }

            throw new Error(errorData.error?.message || 'Failed to get response from AI');
        }

        const data = await response.json();
        const assistantMessage = data.choices?.[0]?.message?.content;

        if (!assistantMessage) {
            throw new Error('No response generated');
        }

        // Add to conversation history
        conversationHistory.push({ role: 'user', content: userMessage });
        conversationHistory.push({ role: 'assistant', content: assistantMessage });

        // Keep only last 20 messages to avoid token limits
        if (conversationHistory.length > 20) {
            conversationHistory = conversationHistory.slice(-20);
        }

        return assistantMessage;
    } catch (error) {
        console.error('Error calling Groq API:', error);
        throw error;
    }
}

export function clearConversation() {
    conversationHistory = [];
}

// Suggested questions for users
export const suggestedQuestions = [
    "Tell me about Eesh",
    "Explain the crypto project",
    "What makes Eesh stand out?",
];
