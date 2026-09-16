// src/data/portfolioData.js
// Authoritative portfolio data for YESURUN A — Full Stack Developer
// Source of truth: Official Resume (2026)

export const ME = {
  name: "YESURUN A",
  shortName: "YESURUN",
  initials: "YA",
  role: "Full Stack Developer",
  title: "Full Stack Developer",
  tagline: "Bridging strategic architectural logic with high-performance web engineering. Specializing in React.js, Node.js, Express, Java, PostgreSQL, and strategic interactive systems.",
  bio: "Full Stack Developer pursuing B.Tech in Information Technology at Panimalar Engineering College (Anna University) with an 8.40/10 CGPA. Proven industry internship experience across AK Infopark and Infomatrics Project Services developing responsive React.js interfaces, scalable RESTful APIs, and secure database architectures.",
  email: "yesurun893@gmail.com",
  phone: "+91 98434 41978",
  phoneRaw: "+919843441978",
  location: "Chennai & Tiruvallur, India",
  education: {
    degree: "B.Tech in Information Technology",
    institution: "Panimalar Engineering College, Anna University",
    cgpa: "8.40 / 10 (up to Sem VI)",
    period: "2023 – 2027",
    details: "Strong academic foundation in Data Structures, Database Management Systems, Object-Oriented Programming, and Full-Stack Web Technologies."
  },
  school: {
    degree: "Higher Secondary Certificate (HSC)",
    institution: "Jayarrajesh Matric HR Sec School",
    score: "84.8%",
    period: "2023",
    details: "Mathematics & Computer Science focus with distinction."
  },
  github: "https://github.com/YESURUN10",
  githubHandle: "YESURUN10",
  linkedin: "https://linkedin.com/in/yesurun02",
  linkedinHandle: "yesurun02",
  status: "Open to Full-Stack Opportunities",
  quote: "Strategy in code. Precision in execution."
};

export const PROJECTS = [
  {
    id: "nexz",
    title: "Nexz",
    subtitle: "Real-Time News Intelligence & Event Graph Platform",
    featured: true,
    year: "2025",
    desc: "Built a real-time news intelligence platform using the Groq LLaMA 3 API to identify and map causal connections between global events through a Node.js backend. Integrated React Flow for interactive event-link graph visualization and Firebase Auth for personalized news feeds.",
    highlights: [
      "Groq LLaMA 3 API inference for automated causal graph link extraction",
      "Interactive multi-node knowledge graphs rendered with React Flow",
      "Node.js & Express.js backend processing real-time NewsAPI ingestion streams",
      "Firebase Authentication for user session management and curated topic tracking",
      "Low-latency response times with intelligent caching and structured JSON outputs"
    ],
    tech: ["React.js", "Node.js", "Groq API", "LLaMA 3", "NewsAPI", "Firebase Auth", "React Flow"],
    github: "https://github.com/YESURUN10/Nexz",
    live: "https://github.com/YESURUN10/Nexz#readme",
    category: "AI & Intelligence",
    metrics: { latency: "<120ms AI", architecture: "Event Graph", auth: "Firebase" }
  },
  {
    id: "musify",
    title: "Musify",
    subtitle: "Real-Time Music Streaming & Collaborative Platform",
    featured: true,
    year: "2024",
    desc: "Music streaming platform with Firebase Authentication, Realtime Database, persistent playlist management, and audio playback. Implemented React state management for real-time audio playback, playlist handling, and responsive interactions.",
    highlights: [
      "Low-latency audio streaming engine with responsive track scrubber & volume normalization",
      "Firebase Authentication supporting secure multi-device user profiles",
      "Firebase Realtime Database synchronization for persistent customized playlists",
      "State-driven player with playlist queues, shuffle, repeat, and background persistence",
      "Tailwind CSS responsive design optimized for mobile and desktop screens"
    ],
    tech: ["React.js", "Firebase Auth", "Realtime Database", "Tailwind CSS", "Web Audio", "JavaScript"],
    github: "https://github.com/YESURUN10/Musify",
    live: "https://github.com/YESURUN10/Musify#readme",
    category: "Full Stack Media",
    metrics: { sync: "Real-Time", playback: "Lossless Web Audio", ui: "Tailwind CSS" }
  },
  {
    id: "synthchef",
    title: "SynthChef",
    subtitle: "Dynamic Recipe Discovery & Kitchen Intelligence Platform",
    featured: true,
    year: "2024",
    desc: "Full-stack recipe discovery platform with dynamic search and filtering by cuisine and cook time. Built a RESTful Express.js API integrated with a third-party food API and backed by PostgreSQL.",
    highlights: [
      "Relational PostgreSQL database schema indexing ingredients, preparation times, and cuisines",
      "Custom RESTful API endpoints built on Node.js and Express.js",
      "Dynamic multi-parameter filtering for dietary constraints and preparation duration",
      "Optimized query performance and asynchronous debounced client search",
      "Clean modern frontend interface built with React.js and responsive CSS"
    ],
    tech: ["React.js", "Node.js", "Express.js", "PostgreSQL", "REST APIs", "SQL"],
    github: "https://github.com/YESURUN10/SynthChef",
    live: "https://github.com/YESURUN10/SynthChef#readme",
    category: "Full Stack Enterprise",
    metrics: { db: "PostgreSQL", api: "REST Express", search: "Dynamic Query" }
  }
];

export const SKILLS_DATA = {
  programming: {
    category: "Programming Languages",
    icon: "Code2",
    skills: [
      { name: "Java", level: "Proficient", note: "OOP, Data Structures, Collections" },
      { name: "JavaScript (ES6+)", level: "Advanced", note: "Async/Await, DOM, Closures, Modular Architecture" },
      { name: "SQL", level: "Proficient", note: "Relational Queries, Joins, Schema Design" }
    ]
  },
  frontend: {
    category: "Frontend Development",
    icon: "Layout",
    skills: [
      { name: "React.js", level: "Advanced", note: "Hooks, State Management, Component Architecture" },
      { name: "HTML5", level: "Expert", note: "Semantic Structure, Web Accessibility" },
      { name: "CSS3", level: "Expert", note: "Flexbox, Grid, Keyframe Animations" },
      { name: "Tailwind CSS", level: "Expert", note: "Utility-First, Responsive Design, Design Systems" },
      { name: "Vite", level: "Proficient", note: "Modern Fast Bundling, HMR, Build Optimization" }
    ]
  },
  backend: {
    category: "Backend & APIs",
    icon: "Server",
    skills: [
      { name: "Node.js", level: "Proficient", note: "Server-Side Runtime, Event Loop, File I/O" },
      { name: "Express.js", level: "Proficient", note: "Middleware, Routing, Error Handling" },
      { name: "REST APIs", level: "Advanced", note: "HTTP Verbs, JSON Contracts, Authentication" }
    ]
  },
  databases: {
    category: "Databases & Storage",
    icon: "Database",
    skills: [
      { name: "PostgreSQL", level: "Proficient", note: "Relational Modeling, Indexing, Complex Queries" },
      { name: "MongoDB", level: "Proficient", note: "Document Store, NoSQL Collections, Aggregation" },
      { name: "Firebase", level: "Advanced", note: "Authentication, Realtime Database, Firestore" }
    ]
  },
  tools: {
    category: "Developer Tools",
    icon: "Wrench",
    skills: [
      { name: "Git", level: "Advanced", note: "Version Control, Branching, Rebasing" },
      { name: "GitHub", level: "Advanced", note: "Collaboration, Pull Requests, Open Source" },
      { name: "Postman", level: "Proficient", note: "API Testing, Mocking, Endpoint Verification" }
    ]
  }
};

export const EXPERIENCE = [
  {
    company: "AK Infopark Private Limited",
    location: "Nagercoil, India",
    role: "Full Stack Web Developer Intern",
    date: "June 2025",
    bullets: [
      "Built responsive React.js components integrated with Firebase Authentication and Realtime Database.",
      "Delivered functional UI modules on schedule.",
      "Resolved UI/UX issues across the application.",
      "Improved responsiveness and cross-device compatibility.",
      "Collaborated with the development team."
    ],
    tech: ["React.js", "Firebase Auth", "Realtime Database", "UI/UX", "JavaScript"]
  },
  {
    company: "Infomatrics Project Services",
    location: "Chennai, India",
    role: "Full Stack Web Developer Intern",
    date: "June 2024 – July 2024",
    bullets: [
      "Developed full-stack modules using React.js.",
      "Used Node.js/Express.js for REST API development.",
      "Contributed to timely project delivery.",
      "Handled UI development.",
      "Integrated APIs.",
      "Performed cross-layer debugging."
    ],
    tech: ["React.js", "Node.js", "Express.js", "REST APIs", "Debugging"]
  }
];

export const ACHIEVEMENTS = [
  {
    id: "sveep-award",
    title: "SVEEP District Award",
    organization: "District Collector, Tiruvallur",
    award: "Best Short Film — State Election Awareness Competition",
    details: "Recognized by the District Collector, Tiruvallur for Best Short Film at the State Election Awareness Competition.",
    badge: "Official District Award",
    icon: "Award"
  },
  {
    id: "leetcode-dsa",
    title: "Problem Solving",
    organization: "LeetCode",
    award: "Solved 135+ DSA Problems on LeetCode",
    details: "Solved 135+ DSA problems on LeetCode covering Arrays, Strings, Hashing, Linked Lists, and OOP concepts.",
    badge: "135+ LeetCode Solved",
    icon: "Brain"
  }
];

export const CERTIFICATIONS = [
  {
    name: "Database Management Systems",
    title: "Database Management Systems",
    issuer: "NPTEL",
    desc: "Comprehensive certification covering relational models, SQL, normalization, transactions, and indexing.",
    badge: "NPTEL"
  },
  {
    name: "Java & Modern Web Development",
    title: "Java & Modern Web Development",
    issuer: "Infosys Springboard",
    desc: "Rigorous certification covering Core Java, OOP principles, and modern web application development.",
    badge: "Infosys Springboard"
  },
  {
    name: "Gemini Certified Student",
    title: "Gemini Certified Student",
    issuer: "Google",
    desc: "Certified credentials verifying proficiency in generative AI concepts, LLMs, and prompt engineering.",
    badge: "Google"
  }
];

export const MARQUEE_ITEMS = [
  "Java",
  "JavaScript (ES6+)",
  "SQL",
  "React.js",
  "Node.js",
  "Express.js",
  "PostgreSQL",
  "MongoDB",
  "Firebase",
  "Tailwind CSS",
  "Vite",
  "HTML5 & CSS3",
  "REST APIs",
  "Git & GitHub",
  "Postman",
  "LeetCode 135+ DSA"
];
