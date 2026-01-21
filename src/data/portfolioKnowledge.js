// Portfolio Knowledge Base - Based on Actual Resume
// This file contains the exact content from Eesh's resume for the AI assistant

export const portfolioData = {
    personal: {
        name: "Eesh Sagar Singh",
        dateOfBirth: "October 2, 2005",
        phone: "+91-9939411596",
        email: "eeshsagar@gmail.com",
        linkedin: "https://linkedin.com/in/etk18",
        github: "https://github.com/etk18",
        location: "Delhi, India",
        status: "Open to Work",
        languages: ["English", "Hindi"],
        availability: "Immediately available - no current job or internship commitments",
    },

    personalityAndInterests: {
        hobbies: [
            "Gaming (plays regularly)",
            "Cricket (extremely passionate about it)",
            "Movies (quality cinema lover, appreciates good filmmaking)"
        ],
        workEthic: "Works hard and goes the extra mile when genuinely interested in the work. Passion-driven developer who puts in dedicated effort for projects that excite him.",
        funFact: "Balances coding sessions with cricket matches and gaming breaks - believes in a well-rounded lifestyle!"
    },

    careerGoals: {
        targetRole: "AI Developer",
        vision: "Aspiring to become a comprehensive AI Developer with expertise across the entire AI/ML spectrum",
        learningPath: [
            "Machine Learning (ML)",
            "Deep Learning (DL)",
            "Natural Language Processing (NLP)",
            "Generative AI",
            "Retrieval-Augmented Generation (RAG)",
            "Computer Vision (OpenCV)",
            "Agentic AI"
        ],
        motivation: "Passionate about building intelligent systems that can solve real-world problems"
    },

    summary: `AI/ML Developer with hands-on experience building neural networks and deep learning models for predictive analytics. Proficient in Python, TensorFlow, scikit-learn, and NLP techniques with a strong foundation in full-stack development. Passionate about leveraging machine learning to solve complex real-world problems and drive data-driven decision making.`,

    technicalSkills: {
        languages: ["Python", "JavaScript (ES6+)", "Java", "C/C++", "SQL", "HTML5", "CSS3"],
        frameworksAndLibraries: [
            "React.js", "React Native", "Node.js", "Express.js",
            "scikit-learn", "TensorFlow", "Keras", "PyTorch",
            "Pandas", "NumPy", "Matplotlib", "Seaborn"
        ],
        machineLearningAndAI: [
            "Deep Learning", "Neural Networks", "Natural Language Processing (NLP)",
            "Supervised & Unsupervised Learning", "Model Development & Optimization",
            "Feature Engineering", "Data Preprocessing", "End-to-End ML Pipelines"
        ],
        developerTools: ["Git", "MongoDB", "MySQL", "RESTful APIs", "Chart.js", "Postman", "VS Code"],
    },

    experience: [
        {
            title: "Web Development Intern",
            company: "Zidio Development",
            location: "Remote, Delhi, India",
            period: "Apr 2025 – Jun 2025",
            responsibilities: [
                "Collaborated with cross-functional teams to develop and optimize web-based solutions, enhancing feature functionality and user experience through iterative testing and code reviews",
                "Conducted technical research and analysis to support development initiatives while maintaining strict confidentiality protocols for client data and proprietary systems",
                "Contributed to full-stack development projects using modern JavaScript frameworks and RESTful API integration"
            ]
        }
    ],

    projects: [
        {
            title: "Crypto Price Prediction Model",
            technologies: ["Python", "TensorFlow", "Keras", "scikit-learn", "Pandas", "NumPy"],
            year: "2025",
            category: "AI/ML",
            status: "Work in Progress - Actively developing and improving",
            details: [
                "Engineered a deep learning model using neural networks and machine learning techniques to predict cryptocurrency price movements with time-series data analysis",
                "Implemented LSTM and dense neural network architectures, achieving improved prediction accuracy through hyperparameter tuning and regularization techniques",
                "Performed comprehensive data preprocessing including normalization, feature engineering, and train-test splitting using Pandas and NumPy for 50,000+ data points",
                "Evaluated model performance using RMSE, MAE, and R² metrics with visualization of prediction results using Matplotlib",
                "Currently being developed further with regular updates and improvements - this is an ongoing passion project"
            ]
        },
        {
            title: "Instagram Clone - Full-Stack Social Media Platform",
            technologies: ["React.js", "Node.js", "Express.js", "MongoDB", "RESTful APIs"],
            year: "2024",
            category: "Full Stack",
            details: [
                "Built a full-featured social media application with user authentication, profile management, image uploads, real-time likes, comments, and dynamic newsfeed functionality",
                "Designed and implemented RESTful API endpoints with Node.js and Express.js to handle CRUD operations for user data, posts, and interactions stored in MongoDB",
                "Developed responsive front-end interface using React.js with state management and component lifecycle optimization for seamless user experience"
            ]
        },
        {
            title: "Deep Learning NLP Pipeline",
            technologies: ["Python", "PyTorch", "NLP", "Transformers"],
            year: "2024",
            category: "AI/ML",
            details: [
                "Developed an end-to-end NLP pipeline for text classification and sentiment analysis",
                "Used transformers and deep learning models for natural language understanding"
            ]
        },
        {
            title: "Data Visualization Dashboard",
            technologies: ["React.js", "Chart.js", "Matplotlib"],
            year: "2024",
            category: "Frontend",
            details: [
                "Interactive dashboard for visualizing complex datasets",
                "Used Chart.js for dynamic, responsive charts"
            ]
        },
        {
            title: "ML Model Deployment API",
            technologies: ["Python", "Flask", "Docker"],
            year: "2024",
            category: "Backend/AI",
            details: [
                "RESTful API service for deploying machine learning models",
                "Supports real-time predictions with Docker containerization"
            ]
        },
        {
            title: "Portfolio Website",
            technologies: ["React.js", "Framer Motion", "Tailwind CSS", "Three.js"],
            year: "2025",
            category: "Frontend",
            details: [
                "Modern, animated portfolio website with smooth Framer Motion animations",
                "Features 3D backgrounds using Three.js and React Three Fiber",
                "Includes an AI-powered chatbot assistant (you're talking to it now!)"
            ]
        }
    ],

    education: {
        institution: "Maharaja Agrasen Institute of Technology",
        degree: "Bachelor of Technology in Information Technology",
        gpa: "8.5/10.0",
        location: "Delhi, India",
        period: "Aug 2023 – May 2027"
    },

    certifications: [
        "Complete Data Science, Machine Learning, Deep Learning, NLP Bootcamp by Krish Naik (Udemy)",
        "Complete Generative AI Course With Langchain and Huggingface by Krish Naik (Udemy)",
        "Complete Computer Vision Bootcamp with PyTorch & Tensorflow by Krish Naik (Udemy)",
        "Career Essentials in Generative AI (Microsoft)",
        "Career Essentials in Software Development (Microsoft)"
    ]
};

// Generate comprehensive context for the AI
export function getRelevantContext() {
    const p = portfolioData;

    return `
=== EESH SAGAR SINGH - PORTFOLIO INFORMATION ===

CONTACT & AVAILABILITY:
- Date of Birth: ${p.personal.dateOfBirth}
- Phone: ${p.personal.phone}
- Email: ${p.personal.email}
- LinkedIn: ${p.personal.linkedin}
- GitHub: ${p.personal.github}
- Location: ${p.personal.location}
- Languages: ${p.personal.languages.join(", ")}
- Status: ${p.personal.status}
- Availability: ${p.personal.availability}

PERSONALITY & INTERESTS (for casual conversation):
- Hobbies: ${p.personalityAndInterests.hobbies.join("; ")}
- Work Ethic: ${p.personalityAndInterests.workEthic}
- Fun Fact: ${p.personalityAndInterests.funFact}

CAREER GOALS:
- Target Role: ${p.careerGoals.targetRole}
- Vision: ${p.careerGoals.vision}
- Currently Learning: ${p.careerGoals.learningPath.join(", ")}
- Motivation: ${p.careerGoals.motivation}

PROFESSIONAL SUMMARY:
${p.summary}

TECHNICAL SKILLS:
• Programming Languages: ${p.technicalSkills.languages.join(", ")}
• Frameworks & Libraries: ${p.technicalSkills.frameworksAndLibraries.join(", ")}
• Machine Learning & AI: ${p.technicalSkills.machineLearningAndAI.join(", ")}
• Developer Tools: ${p.technicalSkills.developerTools.join(", ")}

WORK EXPERIENCE:
${p.experience.map(e => `
${e.title} at ${e.company}
${e.period} | ${e.location}
${e.responsibilities.map(r => `  • ${r}`).join("\n")}`).join("\n")}

PROJECTS:

${p.projects.map(proj => `
📁 ${proj.title} (${proj.year}) [${proj.category}]${proj.status ? ` - ${proj.status}` : ''}
Technologies: ${proj.technologies.join(", ")}
${proj.details.map(d => `  • ${d}`).join("\n")}`).join("\n")}

EDUCATION:
${p.education.degree}
${p.education.institution}, ${p.education.location}
${p.education.period}
GPA: ${p.education.gpa}

CERTIFICATIONS:
${p.certifications.map(c => `• ${c}`).join("\n")}

=== END OF PORTFOLIO INFO ===
`.trim();
}

export function getFullContext() {
    return getRelevantContext();
}
