// AI Service for OpenAI API Integration
import { getRelevantContext, portfolioData } from '../data/portfolioKnowledge';

const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;
const API_URL = 'https://api.openai.com/v1/chat/completions';

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
    if (!OPENAI_API_KEY) {
        throw new Error('OpenAI API key not configured. Please add VITE_OPENAI_API_KEY to your .env file.');
    }

    // Get full portfolio context
    const portfolioContext = getRelevantContext();

    // First message includes full context
    const isFirstMessage = conversationHistory.length === 0;

    // Build messages array
    const messages = [
        {
            role: 'system',
            content: SYSTEM_PROMPT + (isFirstMessage ? `\n\nPORTFOLIO CONTEXT:\n${portfolioContext}` : '')
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
                'Authorization': `Bearer ${OPENAI_API_KEY}`,
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo',
                messages: messages,
                temperature: 0.8, // Slightly higher for more natural responses
                max_tokens: 500,
                presence_penalty: 0.3, // Encourage variety
                frequency_penalty: 0.3, // Reduce repetition
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('OpenAI API Error:', errorData);

            if (response.status === 429 || errorData.error?.type === 'insufficient_quota') {
                throw new Error('Rate limit or quota exceeded. Please check your OpenAI billing.');
            }

            throw new Error(errorData.error?.message || 'Failed to get response from AI');
        }

        const data = await response.json();
        const assistantMessage = data.choices?.[0]?.message?.content;

        if (!assistantMessage) {
            throw new Error('No response generated');
        }

        // Add to conversation history (store only user message text, not with context)
        conversationHistory.push({ role: 'user', content: userMessage });
        conversationHistory.push({ role: 'assistant', content: assistantMessage });

        // Keep only last 20 messages to avoid token limits
        if (conversationHistory.length > 20) {
            conversationHistory = conversationHistory.slice(-20);
        }

        return assistantMessage;
    } catch (error) {
        console.error('Error calling OpenAI API:', error);

        // Only use fallback for quota/rate limit errors
        const errorMessage = error.message || '';
        if (errorMessage.includes('Rate limit') || errorMessage.includes('quota') || errorMessage.includes('insufficient')) {
            console.log('Using fallback response due to rate limit');
            return getFallbackResponse(userMessage);
        }

        // For other errors, throw so user sees the actual issue
        throw error;
    }
}

// Conversational fallback responses
function getFallbackResponse(query) {
    const lowerQuery = query.toLowerCase();

    // Greetings
    if (lowerQuery.includes('hello') || lowerQuery.includes('hi') || lowerQuery.includes('hey') || lowerQuery === 'yo') {
        return "Hey there! 👋 I'm Eesh's portfolio assistant. I can tell you about his projects, skills, experience, or how to get in touch. What would you like to know?";
    }

    // Stand out / unique / why hire
    if (lowerQuery.includes('stand out') || lowerQuery.includes('unique') || lowerQuery.includes('special') || lowerQuery.includes('why hire') || lowerQuery.includes('why should') || lowerQuery.includes('different')) {
        return "Great question! 🌟 What makes Eesh stand out is his rare combination of AI/ML expertise AND full-stack development skills. He's not just theoretical - he's built real projects like a crypto prediction model using LSTM neural networks (50,000+ data points!), and a full-stack Instagram clone. He has 5+ certifications from Microsoft and Udemy, and he bridges the gap between data science and production-ready web apps. Perfect for teams needing someone who can do both!";
    }

    // About / who is / tell me about
    if (lowerQuery.includes('about') || lowerQuery.includes('who is') || lowerQuery.includes('tell me') || lowerQuery.includes('introduce') || lowerQuery.includes('yourself')) {
        return "Eesh Sagar Singh is an AI/ML Developer and Full-Stack Engineer based in Delhi! 🚀 He's currently pursuing B.Tech in IT at MAIT with an 8.5 GPA. He's passionate about building neural networks and deep learning models, and his standout projects include a crypto price prediction model and a full-stack Instagram clone. Proficient in Python, TensorFlow, React.js, and Node.js - and currently open to opportunities!";
    }

    // Skills
    if (lowerQuery.includes('skill') || lowerQuery.includes('strong') || lowerQuery.includes('best') || lowerQuery.includes('good at') || lowerQuery.includes('proficient') || lowerQuery.includes('technologies')) {
        return "Eesh has a powerful tech stack! 🎯\n\n**AI/ML**: Python, TensorFlow, Keras, PyTorch, scikit-learn, NLP, Deep Learning\n**Frontend**: React.js, React Native, JavaScript (ES6+), HTML5/CSS3\n**Backend**: Node.js, Express.js, MongoDB, MySQL, RESTful APIs\n**Also knows**: Java, C/C++, Git, Docker\n\nHe's currently diving into Generative AI and LangChain!";
    }

    // Explain projects
    if (lowerQuery.includes('explain') && lowerQuery.includes('project')) {
        return "Let me break down Eesh's main projects! 🚀\n\n**Crypto Price Prediction Model**: An LSTM neural network that predicts crypto prices using time-series analysis on 50,000+ data points. Built with TensorFlow, Keras, and NumPy.\n\n**Instagram Clone**: A full-stack social platform with user auth, image uploads, real-time interactions. React.js frontend, Node.js/Express backend, MongoDB database.\n\n**NLP Pipeline**: Text classification and sentiment analysis using PyTorch and Transformers.\n\nWant deeper details on any of these?";
    }

    // Just project (generic)
    if (lowerQuery.includes('project') || lowerQuery.includes('built') || lowerQuery.includes('made') || lowerQuery.includes('create')) {
        return "Eesh has built some impressive projects! 🚀\n\n• **Crypto Price Prediction** - LSTM neural network, 50k+ data points\n• **Instagram Clone** - Full-stack with React, Node, MongoDB\n• **NLP Pipeline** - PyTorch-based text classification\n• **ML Deployment API** - Flask API for serving models\n• **This Portfolio** - React + Three.js + AI chatbot (me!)\n\nWhich one interests you most?";
    }

    // Crypto specific
    if (lowerQuery.includes('crypto') || lowerQuery.includes('prediction') || lowerQuery.includes('lstm')) {
        return "The Crypto Price Prediction project is fascinating! 📈\n\nEesh built an LSTM (Long Short-Term Memory) neural network to predict cryptocurrency price movements. Here's what makes it impressive:\n\n• Processed 50,000+ data points with time-series analysis\n• Implemented hyperparameter tuning and regularization\n• Used TensorFlow, Keras, Pandas, and NumPy\n• Evaluated with RMSE, MAE, and R² metrics\n• Visualized predictions with Matplotlib\n\nIt really showcases his deep learning capabilities!";
    }

    // Instagram specific
    if (lowerQuery.includes('instagram') || lowerQuery.includes('clone') || lowerQuery.includes('social media')) {
        return "The Instagram Clone is a full-stack showcase! 📸\n\n**Frontend**: React.js with state management and component optimization\n**Backend**: Node.js + Express.js with RESTful API design\n**Database**: MongoDB for users, posts, and interactions\n\n**Features**:\n• User authentication\n• Profile management\n• Image uploads\n• Real-time likes & comments\n• Dynamic newsfeed\n\nIt demonstrates his ability to build complete, production-ready apps!";
    }

    // Experience
    if (lowerQuery.includes('experience') || lowerQuery.includes('work') || lowerQuery.includes('intern') || lowerQuery.includes('job')) {
        return "Eesh worked as a Web Development Intern at Zidio Development (Apr-Jun 2025)! 💼\n\n• Collaborated with cross-functional teams on web solutions\n• Contributed to full-stack projects with JavaScript frameworks\n• Worked with RESTful API integration\n• Participated in code reviews and testing\n\nHe's currently looking for new opportunities - feel free to reach out!";
    }

    // Education
    if (lowerQuery.includes('education') || lowerQuery.includes('study') || lowerQuery.includes('college') || lowerQuery.includes('degree') || lowerQuery.includes('gpa') || lowerQuery.includes('university')) {
        return "Eesh is pursuing B.Tech in Information Technology at Maharaja Agrasen Institute of Technology (MAIT), Delhi! 🎓\n\n• GPA: 8.5/10.0\n• Duration: Aug 2023 – May 2027\n• Focus: AI/ML, Deep Learning, Full-Stack Development\n\nHe complements his degree with professional certifications in ML, NLP, and Generative AI!";
    }

    // Contact
    if (lowerQuery.includes('contact') || lowerQuery.includes('hire') || lowerQuery.includes('reach') || lowerQuery.includes('email') || lowerQuery.includes('connect')) {
        return "You can reach Eesh through: 📩\n\n• **Email**: eeshsagar@gmail.com\n• **Phone**: +91-9939411596\n• **LinkedIn**: linkedin.com/in/etk18\n• **GitHub**: github.com/etk18\n\nHe's actively open to opportunities and would love to connect!";
    }

    // Default
    return "I'd be happy to tell you about Eesh! 😊 He's an AI/ML Developer and Full-Stack Engineer with experience in deep learning, neural networks, and web development. \n\nI can explain:\n• His projects (crypto prediction, Instagram clone, NLP pipeline)\n• Technical skills (Python, TensorFlow, React, Node)\n• Work experience and education\n• How to contact him\n\nWhat interests you?";
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
