import { NavItem, SkillItem, Project, Service, LearningItem, EducationItem, CertificateItem } from '../types';

export const PERSONAL_INFO = {
  name: "Shoaib Farooq",
  monogram: "SF",
  role: "Computer Science Student & Web Developer",
  location: "Lahore, Pakistan",
  bioHeadline: "Hi, I'm Shoaib Farooq.",
  bioSupporting: "I build web experiences and practical software with Python, and I am growing fast in machine learning and AI-powered applications.",
  roles: [
    "Computer Science Student",
    "Python & Machine Learning",
    "Web Developer",
    "AI Application Builder",
  ],
  aboutText: [
    "I am a Computer Science undergraduate at COMSATS University Islamabad (Sahiwal Campus), based in Lahore, Pakistan, and I am genuinely passionate about software development, machine learning and the web. I spend a significant portion of my time building hands-on projects, exploring clean frontend architectures, and experimenting with AI-powered applications.",
    "My focus is on creating web applications that are fast, intuitive, and visually refined. Rather than just following tutorials, I like taking real-world problems and building complete, usable solutions—from responsive client interfaces to intelligent LLM integrations.",
    "When I'm not writing code, I'm usually studying core computer science fundamentals like data structures and algorithms, reading technical write-ups on modern web tooling, or tinkering with new AI APIs."
  ],
  email: "shoaibfarooq1076@gmail.com",
  phone: "+92 304 9891873",
  whatsapp: "https://wa.me/923049891873",
  cvUrl: "/Shoaib_Farooq_CV.pdf",
  resumeUrl: "/Shoaib_Farooq_Resume_ATS.pdf",
  github: "https://github.com/shoaibverse",
  linkedin: "https://www.linkedin.com/in/shoaib-farooq-825b273ab?utm_source=share_via&utm_content=profile&utm_medium=member_android",
  availabilityStatus: "Open to opportunities & projects",
  currentEducation: "B.S. in Computer Science",
};

export const EDUCATION_DATA: EducationItem[] = [
  {
    degree: "BS Computer Science (BSCS)",
    institution: "COMSATS University Islamabad, Sahiwal Campus",
    period: "2024 – Present",
    note: "Currently pursuing",
  },
  {
    degree: "FSc Pre-Engineering",
    institution: "Forman Christian College University (FCCU), Lahore",
    period: "2021 – 2023",
    note: "779 / 1100",
  },
  {
    degree: "Matric (Science)",
    institution: "GHS Kalri, Mianwali",
    period: "2019 – 2021",
    note: "1076 / 1100",
  },
];

export const CERTIFICATES_DATA: CertificateItem[] = [
  {
    id: "ai-with-integrity",
    title: "AI with Integrity",
    issuer: "DataCrumbs",
    date: "22 Sep 2026",
    kind: "Masterclass",
    description: "Masterclass on using AI responsibly and ethically in professional work.",
    image: "/certificates/datacrumbs-ai-with-integrity.jpg",
    file: "/certificates/datacrumbs-ai-with-integrity.jpg",
    inCv: true,
  },
  {
    id: "blockchain-developer",
    title: "Blockchain Developer Training",
    issuer: "Simplilearn SkillUP",
    date: "2 Jul 2026",
    kind: "Course Completion",
    credentialId: "10420591",
    description: "Online course covering blockchain fundamentals and developer concepts.",
    image: "/certificates/simplilearn-blockchain.jpg",
    file: "/certificates/simplilearn-blockchain.pdf",
    inCv: true,
  },
  {
    id: "ml-python",
    title: "Machine Learning Using Python",
    issuer: "Simplilearn SkillUP",
    date: "30 Jun 2026",
    kind: "Course Completion",
    credentialId: "10412804",
    description: "Machine learning fundamentals and model building using Python.",
    image: "/certificates/simplilearn-ml-python.jpg",
    file: "/certificates/simplilearn-ml-python.pdf",
    inCv: true,
  },
  {
    id: "ai-business",
    title: "AI for Business Professionals",
    issuer: "HP LIFE (HP Foundation)",
    date: "13 May 2026",
    kind: "Course Completion",
    credentialId: "06ddd6c2-5743-405c-a979-7eeaa3b6b0e5",
    description: "AI tools versus integrated features, prompt writing, ethical use, and AI for professional growth.",
    image: "/certificates/hp-life-ai-for-business.jpg",
    file: "/certificates/hp-life-ai-for-business.pdf",
    inCv: true,
  },
  {
    id: "nutrista-zee",
    title: "Community Launch and Interactive Session",
    issuer: "Nutrista Zee",
    date: "11 Jun 2026",
    kind: "Participation",
    description: "Certificate of participation for attending a community launch and interactive session.",
    image: "/certificates/nutrista-zee-participation.jpg",
    file: "/certificates/nutrista-zee-participation.pdf",
    inCv: false,
  },
];

export const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Services", href: "#services" },
  { label: "Learning", href: "#learning" },
  { label: "Certificates", href: "#certificates" },
  { label: "Contact", href: "#contact" },
];

export const SKILLS_DATA: SkillItem[] = [
  // Frontend
  { name: "HTML", category: "Frontend", description: "Semantic, accessible document structure and modern web standards." },
  { name: "CSS", category: "Frontend", description: "Responsive layouts, Flexbox, Grid, CSS animations and custom properties." },
  { name: "JavaScript", category: "Frontend", description: "ES6+, asynchronous programming, DOM manipulation, and modern web APIs." },
  { name: "React", category: "Frontend", description: "Component-based UI architecture, hooks, state management, and lifecycle handling." },
  { name: "Next.js", category: "Frontend", description: "App Router, server and client components, static and dynamic rendering." },
  { name: "Tailwind CSS", category: "Frontend", description: "Utility-first design systems, custom configuration, responsive and dark mode styling." },
  
  // Programming
  { name: "Python", category: "Programming", description: "Scripting, automation, API tooling, data structures, and machine learning work." },
  { name: "C++", category: "Programming", description: "Core computer science fundamentals, memory management, and algorithmic problem-solving." },
  { name: "Dart", category: "Programming", description: "Object-oriented programming, mobile UI paradigms, and asynchronous logic." },
  
  { name: "Data Structures & Algorithms", category: "Programming", description: "Arrays, linked lists, trees, graphs, sorting and searching, with complexity analysis." },
  { name: "Object-Oriented Programming", category: "Programming", description: "Classes, inheritance, polymorphism and clean object design." },
  { name: "MySQL", category: "Programming", description: "Relational database basics and everyday SQL queries." },

  // Tools
  { name: "Git", category: "Tools", description: "Version control, branching workflows, commits, rebasing, and clean repository maintenance." },
  { name: "GitHub", category: "Tools", description: "Repository hosting, pull requests, issue tracking, and collaborative open-source workflows." },
  { name: "VS Code", category: "Tools", description: "Primary IDE environment with customized linting, debugging, and extensions." },
  { name: "REST APIs", category: "Tools", description: "Calling, testing and documenting REST endpoints; built an API discovery tool in Python." },
  { name: "Figma", category: "Tools", description: "Wireframing, UI prototyping, layout inspection, and responsive component design." },
  
  // AI
  { name: "Machine Learning", category: "AI", description: "Training and evaluating models in Python. Certified in Machine Learning using Python." },
  { name: "AI API Integration", category: "AI", description: "Connecting web apps with modern LLM provider APIs (OpenAI, Anthropic, Gemini, Groq)." },
  { name: "LLM Engineering", category: "AI", description: "Context window management, structured JSON outputs, chain-of-thought workflows, and tool calling." },
  { name: "Prompt Engineering", category: "AI", description: "System prompt design, few-shot prompting, schema enforcement, and edge case mitigation." },
  { name: "AI Application Development", category: "AI", description: "Building end-to-end user-facing applications powered by language models and smart agents." },
];

export const PROJECTS_DATA: Project[] = [
  {
    id: "api-shadow-discovery",
    title: "API Shadow Discovery",
    shortDescription: "A Python tool that finds hidden and undocumented APIs for security testing and API inventory.",
    fullDescription: "API Shadow Discovery is a Python-based tool that discovers hidden or undocumented APIs. It uses the requests library, multithreading and response parsing to extract data efficiently, which makes it useful for security testing and for keeping an accurate inventory of the APIs an application exposes.",
    category: "AI / Tool",
    tags: ["Python", "Requests", "Threading", "Parsing", "Security Testing"],
    image: "/images/projects/api-shadow.svg",
    githubUrl: "https://github.com/shoaibverse",
    featured: true,
    highlights: [
      "Discovers hidden and undocumented API endpoints automatically",
      "Multithreaded scanning keeps large target lists fast",
      "Parses responses to extract structured data for review",
      "Supports security testing and API inventory work"
    ],
    techDetails: {
      backendOrAI: "Python with the requests library, threading and response parsing",
      architecture: "Concurrent worker threads feeding a single parsing and reporting step"
    }
  },
  {
    id: "chhote-tools",
    title: "Chhote Tools",
    shortDescription: "A collection of useful small web utilities built as a modern web application.",
    fullDescription: "Chhote Tools (Small Tools) is a lightweight, zero-bloat web utilities suite for developers and everyday users. It bundles handy browser-based tools including a JSON formatter/validator, Markdown previewer, Base64 encoder/decoder, and Regex testing helper in a unified dark interface.",
    category: "Web App",
    tags: ["React", "JavaScript", "Tailwind CSS", "Local Storage", "Vite"],
    image: "/images/projects/chhote-tools.jpg",
    githubUrl: "https://github.com/shoaibverse",
    liveDemoUrl: "https://chhote-tools.onrender.com",
    featured: true,
    highlights: [
      "Client-side instant processing without sending sensitive data to servers",
      "JSON beautifier, syntax validator, and minifier with 1-click clipboard copy",
      "Live Markdown editor with synchronized side-by-side HTML preview",
      "URL encoder/decoder and Base64 string converter with keyboard shortcuts"
    ],
    techDetails: {
      frontend: "React, Modern Web APIs, Web Workers for client-side processing",
      styling: "Tailwind CSS with custom monospaced code editors and light/dark theme tokens",
      architecture: "Zero external backend requirement; 100% privacy-respecting client execution"
    }
  },
  {
    id: "vitalpulse-ai",
    title: "VitalPulse AI",
    shortDescription: "An AI-powered emergency dispatch and hospital dashboard concept.",
    fullDescription: "VitalPulse AI is a concept application designed to assist emergency response dispatchers and hospital intake teams. It features real-time simulated patient telemetry, automated incident priority categorization using LLM-assisted summaries, and a responsive hospital bed availability dashboard.",
    category: "AI / Tool",
    tags: ["React", "TypeScript", "Tailwind CSS", "AI API Integration", "LLM Workflows"],
    image: "/images/projects/vitalpulse.jpg",
    githubUrl: "https://github.com/shoaibverse",
    featured: true,
    highlights: [
      "Simulated real-time emergency dispatch queue with incident triaging",
      "LLM-powered symptom summary assistant for rapid paramedic handoff",
      "Hospital capacity monitor with live ICU and ER occupancy trackers",
      "Clean, high-contrast dark interface tailored for rapid operational scanning"
    ],
    techDetails: {
      frontend: "React 19, TypeScript, Tailwind CSS, Lucide Icons",
      backendOrAI: "OpenAI API / Prompt Engineering for structured triage analysis",
      styling: "Custom dark-mode telemetry visual styling with accessible color contrast",
      architecture: "Modular component architecture with simulated real-time state hooks"
    }
  },
  {
    id: "ai-image-studio",
    title: "AI Image Generator & Editor",
    shortDescription: "A web app where users generate, customize and download AI images.",
    fullDescription: "An AI-based web application for generating and editing images. A Python AI model is connected to a responsive frontend, so users can describe an image, customize the result and download it.",
    category: "AI / Tool",
    tags: ["Python", "HTML", "JavaScript", "AI Model", "Responsive UI"],
    image: "/images/projects/ai-image.svg",
    githubUrl: "https://github.com/shoaibverse",
    featured: true,
    highlights: [
      "Generate and edit images with an AI model",
      "Python model integrated with a responsive frontend",
      "Customize results and download the final image",
      "Layout that works on phones, tablets and desktops"
    ],
    techDetails: {
      frontend: "HTML, CSS, JavaScript",
      backendOrAI: "Python AI model connected to the frontend",
      styling: "Responsive layout built for quick, clear interaction"
    }
  },
  {
    id: "noorhub",
    title: "NoorHub",
    shortDescription: "A bilingual Islamic companion with the Quran, hadith, duas, prayer times, qibla, calendar, tasbeeh and zakat tools.",
    fullDescription: "NoorHub (Reconnect With Your Deen) is a calm, bilingual web app in Urdu and English for daily Islamic resources. It brings together the Quran with translations, audio and bookmarks, the six canonical hadith collections, and 267 duas from Hisn al-Muslim, along with everyday tools such as prayer times, a qibla finder, an Islamic calendar, a digital tasbeeh and a zakat calculator. Calculations run on the device, and location is only used after the user gives permission.",
    category: "Web App",
    tags: ["Next.js", "React", "Urdu & English", "Dark Mode", "Prayer Times"],
    image: "/images/projects/noorhub.svg",
    githubUrl: "https://github.com/shoaibverse",
    liveDemoUrl: "https://deenhub-73sy.onrender.com",
    featured: true,
    highlights: [
      "Quran with all 114 surahs, translation choice, audio recitation and bookmarks",
      "Six canonical hadith collections with Arabic, Urdu and English text",
      "267 duas from Hisn al-Muslim with transliteration, translation and audio",
      "Prayer times, qibla finder, Hijri calendar, tasbeeh and zakat calculator"
    ],
    techDetails: {
      frontend: "Next.js and React with a bilingual Urdu and English interface",
      architecture: "Calculations run on the device, and location is only used with permission"
    }
  },
  {
    id: "reactive-ui",
    title: "Reactive UI",
    shortDescription: "A responsive, interactive interface focused on clean design and smooth user experience.",
    fullDescription: "Reactive UI is a responsive and interactive user interface built with HTML, CSS and JavaScript. The goal was a modern look with clean design and a seamless experience across screen sizes.",
    category: "Web App",
    tags: ["HTML", "CSS", "JavaScript", "Responsive UI"],
    image: "/images/projects/reactive-ui.svg",
    githubUrl: "https://github.com/shoaibverse",
    featured: false,
    highlights: [
      "Responsive layout that adapts from phone to desktop",
      "Interactive components built in plain JavaScript",
      "Clean visual design with a focus on usability",
      "Smooth transitions for a seamless experience"
    ],
    techDetails: {
      frontend: "HTML5, CSS3, JavaScript",
      styling: "Clean, modern styling with responsive breakpoints"
    }
  },
  {
    id: "nova-builders",
    title: "Nova Builders & Developers",
    shortDescription: "A professional construction and architecture website concept focused on projects, services and inquiries.",
    fullDescription: "A commercial website concept tailored for modern architectural firms and construction companies. Built with a focus on high-impact project showcases, detailed service breakdowns (residential, commercial, interior design), interactive cost inquiry estimation, and client consultation booking.",
    category: "Concept",
    tags: ["Next.js", "React", "Tailwind CSS", "Framer Motion"],
    image: "/images/projects/nova-builders.jpg",
    githubUrl: "https://github.com/shoaibverse",
    liveDemoUrl: "https://nova-builders-developers.onrender.com",
    featured: false,
    highlights: [
      "Interactive architectural portfolio gallery with project phase tracking",
      "Clear service pages with material standards and design-to-build workflow",
      "Inquiry and quotation estimate request form with responsive validations",
      "Modern editorial typography and masonry layout designed for visual storytelling"
    ],
    techDetails: {
      frontend: "Next.js App Router, React, Tailwind CSS",
      styling: "Warm slate and concrete visual tone with smooth Framer Motion card transitions",
      architecture: "Server-side rendering optimization for fast image-heavy gallery loads"
    }
  },
  {
    id: "namal-school",
    title: "Namal School Portfolio",
    shortDescription: "A modern school website concept with a clean educational interface.",
    fullDescription: "An institutional website design concept developed for modern schools and educational academies. It provides a structured online portal featuring academic curriculum overviews, admissions information, interactive campus galleries, event calendars, and faculty directories.",
    category: "Concept",
    tags: ["React", "TypeScript", "Tailwind CSS", "Responsive UI"],
    image: "/images/projects/namal-school.jpg",
    githubUrl: "https://github.com/shoaibverse",
    liveDemoUrl: "https://namal-school.onrender.com",
    featured: false,
    highlights: [
      "Clean academic structure showing primary, secondary, and higher-grade syllabi",
      "Step-by-step interactive admission guidance and downloadable prospectus section",
      "Upcoming school events, notice board, and academic term calendar",
      "Fully responsive across smartphones, tablets, and desktop displays"
    ],
    techDetails: {
      frontend: "React, TypeScript, Tailwind CSS, Lucide React Icons",
      styling: "Subtle educational navy & slate color palette with clear typography hierarchy",
      architecture: "Component-driven layout optimized for accessibility and quick navigation"
    }
  },
  {
    id: "dastarkhwan-lahore",
    title: "Dastarkhwan Lahore",
    shortDescription: "A restaurant website concept with a premium food-focused interface.",
    fullDescription: "A concept website crafted for a heritage dining restaurant in Lahore, Pakistan. Features a visual menu categorized by courses, rich signature dish spotlights, chef specialties, an intuitive table reservation request flow, and location/hours integration.",
    category: "Concept",
    tags: ["React", "Tailwind CSS", "UI Design", "Framer Motion"],
    image: "/images/projects/dastarkhwan.jpg",
    githubUrl: "https://github.com/shoaibverse",
    featured: false,
    highlights: [
      "Interactive food menu with dietary filters, chef recommendations, and pricing",
      "Table reservation system with date/time pickers and party size selection",
      "Story section celebrating traditional South Asian culinary heritage",
      "Optimized mobile layout for on-the-go patrons looking for menu and directions"
    ],
    techDetails: {
      frontend: "React, Tailwind CSS, Lucide Icons",
      styling: "Deep rich dark aesthetic with warm amber accents reflecting traditional ambiance",
      architecture: "Lightweight client-side filtering and smooth interactive scroll navigation"
    }
  }
];

export const SERVICES_DATA: Service[] = [
  {
    id: "web-dev",
    title: "Web Development",
    description: "Modern responsive websites and web applications.",
    icon: "Globe",
    deliverables: [
      "Fully responsive layouts optimized for all screens",
      "Clean, maintainable, and semantic code",
      "Fast load times and performance optimization",
      "Cross-browser compatibility testing"
    ],
    idealFor: "Businesses, startups, and individuals needing complete web solutions."
  },
  {
    id: "frontend-dev",
    title: "Frontend Development",
    description: "Interactive interfaces using React, Next.js and modern frontend technologies.",
    icon: "Layout",
    deliverables: [
      "Modern React / Next.js component architectures",
      "Smooth micro-interactions and accessible UI states",
      "Tailwind CSS styling and responsive systems",
      "State management and REST/GraphQL API integration"
    ],
    idealFor: "Projects requiring polished, reactive, and user-friendly user interfaces."
  },
  {
    id: "ai-integration",
    title: "AI Integration",
    description: "AI-powered features, APIs, chatbots and intelligent application workflows.",
    icon: "Cpu",
    deliverables: [
      "LLM API integration (OpenAI, Anthropic, Gemini, open models)",
      "Structured output generation and prompt engineering",
      "Intelligent text summarization, search, and assistants",
      "Error-resilient API pipelines and streaming responses"
    ],
    idealFor: "Applications looking to enhance existing software with practical AI capabilities."
  },
  {
    id: "portfolio-business",
    title: "Portfolio & Business Websites",
    description: "Professional websites for developers, students, startups and businesses.",
    icon: "Briefcase",
    deliverables: [
      "Custom branded personal portfolios & landing pages",
      "Project showcase galleries and case study layouts",
      "Contact forms and lead capture integration",
      "SEO-friendly metadata and social preview setup"
    ],
    idealFor: "Developers, students, and businesses looking for a distinct online presence."
  }
];

export const LEARNING_DATA: LearningItem[] = [
  {
    id: "cs",
    title: "Computer Science",
    category: "Academic & Core Fundamentals",
    status: "Core Focus",
    description: "Strengthening university foundation in theoretical concepts and practical computation.",
    topics: [
      "Data Structures & Algorithms (Trees, Graphs, Sorting)",
      "Object-Oriented Programming (OOP Principles & Design)",
      "Operating Systems & Process Management Basics",
      "Database Systems (Relational Design & SQL Queries)"
    ],
    icon: "GraduationCap"
  },
  {
    id: "web",
    title: "Web Development",
    category: "Frontend & Fullstack Ecosystem",
    status: "Active Exploration",
    description: "Deepening practical expertise in modern web ecosystems and frontend engineering.",
    topics: [
      "React 19, Server Components, and Concurrent features",
      "Next.js App Router patterns & caching mechanisms",
      "TypeScript advanced type systems & generic patterns",
      "Web accessibility (a11y) standards & Core Web Vitals"
    ],
    icon: "Code2"
  },
  {
    id: "ai-eng",
    title: "AI Engineering",
    category: "Applied Intelligence & Tooling",
    status: "In Progress",
    description: "Bridging the gap between raw machine learning models and production software.",
    topics: [
      "API orchestration with OpenAI, Anthropic, and open-source models",
      "Function calling and tool invocation patterns",
      "Context window optimization & token cost efficiency",
      "Evaluation strategies for LLM application outputs"
    ],
    icon: "Brain"
  },
  {
    id: "llm-eng",
    title: "LLM Engineering",
    category: "Language Models & Workflows",
    status: "Active Exploration",
    description: "Studying how language models reason, parse complex schemas, and automate workflows.",
    topics: [
      "System prompt architecture and robust guardrails",
      "Structured JSON schema enforcement and validation",
      "RAG (Retrieval-Augmented Generation) principles",
      "Multi-step agentic workflows and automated reasoning"
    ],
    icon: "Sparkles"
  },
  {
    id: "sw-dev",
    title: "Software Development",
    category: "Engineering Practices",
    status: "Core Focus",
    description: "Building reliable software with clean code habits and developer best practices.",
    topics: [
      "Git workflows, branch strategies, and code reviews",
      "Modular system design and separation of concerns",
      "Debugging methodologies and automated testing basics",
      "Writing clear documentation and maintainable codebases"
    ],
    icon: "Terminal"
  }
];

export const RESUME_DATA = {
  name: "Shoaib Farooq",
  title: "Computer Science Student & Web Developer",
  location: "Lahore, Pakistan",
  email: PERSONAL_INFO.email,
  github: PERSONAL_INFO.github,
  linkedin: PERSONAL_INFO.linkedin,
  education: {
    degree: "Bachelor of Science in Computer Science (BS CS)",
    status: "Undergraduate Student",
    focus: "Software Engineering, Web Technologies & Artificial Intelligence"
  },
  summary: "Driven Computer Science undergraduate with hands-on experience building modern, responsive web applications and experimenting with AI/LLM integrations. Strong foundation in JavaScript/TypeScript, React, Python, C++, and modern frontend tooling. Eager to contribute to practical software engineering and web development projects.",
  coreCompetencies: [
    "Frontend Development (React, Next.js, Tailwind CSS, TypeScript)",
    "Programming Fundamentals (Python, C++, Dart, JavaScript)",
    "AI & LLM Integration (OpenAI API, Prompt Engineering, Structured JSON)",
    "Developer Tooling (Git, GitHub, VS Code, Figma, Vite)"
  ]
};
