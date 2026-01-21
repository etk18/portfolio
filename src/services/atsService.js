// ATS Resume Analysis Service
import * as pdfjsLib from 'pdfjs-dist';
import mammoth from 'mammoth';

// Set up PDF.js worker using unpkg CDN (more reliable)
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;

const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY;
const PREMIUM_PASSKEY = import.meta.env.VITE_PREMIUM_PASSKEY || 'eesh2025';
const FREE_USAGE_LIMIT = 2;
const STORAGE_KEY = 'atsCheckCount';

// Extract text from PDF
async function extractFromPDF(file) {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    let text = '';

    for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        const pageText = content.items.map(item => item.str).join(' ');
        text += pageText + '\n';
    }

    return text.trim();
}

// Extract text from DOCX
async function extractFromDOCX(file) {
    const arrayBuffer = await file.arrayBuffer();
    const result = await mammoth.extractRawText({ arrayBuffer });
    return result.value.trim();
}

// Extract text from uploaded file
export async function extractTextFromFile(file) {
    const fileName = file.name.toLowerCase();

    if (fileName.endsWith('.pdf')) {
        return await extractFromPDF(file);
    } else if (fileName.endsWith('.docx') || fileName.endsWith('.doc')) {
        return await extractFromDOCX(file);
    } else {
        throw new Error('Unsupported file format. Please upload PDF or DOCX.');
    }
}

// Analyze resume with AI
export async function analyzeResume(resumeText) {
    if (!GROQ_API_KEY) {
        throw new Error('Groq API key not configured.');
    }

    const prompt = `You are an expert ATS (Applicant Tracking System) analyzer and career advisor.

Analyze this resume and provide:

1. **ATS_SCORE**: A number from 1-100 representing ATS compatibility
   - Consider: proper formatting, keyword density, section headers, quantifiable achievements, action verbs
   
2. **JOB_MATCHES**: Top 5 job roles/titles this resume is best suited for with match percentages

3. **STRENGTHS**: 3-4 key strengths identified in the resume

4. **IMPROVEMENTS**: 3-4 specific suggestions to improve ATS score

Respond ONLY in this exact JSON format:
{
    "atsScore": <number 1-100>,
    "jobMatches": [
        {"role": "<job title>", "match": <percentage 1-100>},
        ...
    ],
    "strengths": ["<strength 1>", "<strength 2>", ...],
    "improvements": ["<suggestion 1>", "<suggestion 2>", ...]
}

RESUME:
${resumeText}`;

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${GROQ_API_KEY}`,
        },
        body: JSON.stringify({
            model: 'llama-3.3-70b-versatile',
            messages: [
                { role: 'system', content: 'You are an expert ATS analyzer. Always respond with valid JSON only.' },
                { role: 'user', content: prompt }
            ],
            temperature: 0.3,
            max_tokens: 1000,
        }),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error?.message || 'AI analysis failed');
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;

    if (!content) {
        throw new Error('No analysis generated');
    }

    // Parse JSON response
    try {
        // Extract JSON from potential markdown code blocks
        let jsonStr = content;
        const jsonMatch = content.match(/```(?:json)?\s*([\s\S]*?)```/);
        if (jsonMatch) {
            jsonStr = jsonMatch[1];
        }
        return JSON.parse(jsonStr.trim());
    } catch (e) {
        console.error('Failed to parse AI response:', content);
        throw new Error('Failed to parse analysis results');
    }
}

// Usage limit management
export function getUsageCount() {
    return parseInt(localStorage.getItem(STORAGE_KEY) || '0', 10);
}

export function incrementUsageCount() {
    const count = getUsageCount() + 1;
    localStorage.setItem(STORAGE_KEY, count.toString());
    return count;
}

export function canUseChecker(isPremium) {
    if (isPremium) return true;
    return getUsageCount() < FREE_USAGE_LIMIT;
}

export function getRemainingChecks(isPremium) {
    if (isPremium) return Infinity;
    return Math.max(0, FREE_USAGE_LIMIT - getUsageCount());
}

export function validatePasskey(passkey) {
    return passkey === PREMIUM_PASSKEY;
}

export { FREE_USAGE_LIMIT };
