export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  tagline: string;
  description: string;
  tags: string[];
  metrics: { label: string; value: string }[];
  architecture: { step: string; detail: string }[];
  links: {
    live?: string;
    github?: string;
    docs?: string;
  };
  features: string[];
}

export interface LabExperiment {
  id: string;
  number: string;
  title: string;
  category: string;
  description: string;
  status: "ACTIVE" | "PROTOTYPE" | "RESEARCH";
  tags: string[];
  interactiveType: "isl" | "cv" | "cache" | "ratelimit" | "vtop";
}

export interface TechNode {
  id: string;
  name: string;
  category: "Language" | "Frontend & Mobile" | "Backend & Systems" | "AI & Computer Vision" | "Cloud & DB";
  level: "Core" | "Advanced" | "Proficient";
  projects: string[];
  x: number;
  y: number;
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  date: string;
  badge: string;
  description: string;
  verifyUrl?: string;
}

export interface SkillCategory {
  category: string;
  skills: { name: string; level: string; icon?: string }[];
}

export const PERSONAL_DATA = {
  name: "Gnanesh Reddy Maram",
  shortName: "GNANESH",
  title: "Full Stack Developer & Software Engineer",
  tagline: "SYSTEMS / IDEAS / EXPERIENCES",
  subTagline: "I build digital systems that turn complexity into clarity.",
  location: "Nellore, Andhra Pradesh, India",
  coordinates: "14.4426° N, 79.9865° E",
  status: "Building Scalable Systems & High-Performance AI Applications",
  email: "gnaneshreddy357@gmail.com",
  phone: "+91 7780632515",
  resume: "https://drive.google.com/file/d/17PHf9DdGlCuP9RDq8KPSFzaQf4PJVsp8/view?usp=drive_link",
  education: {
    degree: "B.Tech in Computer Science & Engineering",
    institution: "VIT-AP University, Amaravati",
    expected: "07/2028",
    cgpa: "8.63 / 10.0",
  },
  socials: {
    github: "https://github.com/Gnanesh-2007",
    linkedin: "https://www.linkedin.com/in/gnanesh-reddy-a60141325/",
    email: "mailto:gnaneshreddy357@gmail.com",
    resume: "https://drive.google.com/file/d/17PHf9DdGlCuP9RDq8KPSFzaQf4PJVsp8/view?usp=drive_link",
  },
  currently: {
    building: "VIT-AP Nexus & Real-Time Computer Vision Pipelines",
    learning: "Distributed Systems, WebGPU & CUDA Kernel Optimization",
    exploring: "Multi-Camera Re-Identification & Agentic AI Architectures",
    location: "Nellore, Andhra Pradesh, India",
    focus: "High-Performance Full-Stack & Intelligent Systems",
  },
};

export const CERTIFICATIONS: Certification[] = [
  {
    id: "gcp-ace",
    title: "Associate Cloud Engineer",
    issuer: "Google Cloud",
    date: "Aug 2026",
    badge: "GCP Certified • ID: GCP-ACE-2026",
    description: "Demonstrated skills in deploying applications, monitoring operations, and managing enterprise cloud infrastructure on Google Cloud Platform.",
    verifyUrl: "https://drive.google.com/file/d/17PHf9DdGlCuP9RDq8KPSFzaQf4PJVsp8/view?usp=drive_link",
  },
  {
    id: "gcp-genai",
    title: "Google Cloud Gen AI Academy APAC 2026 — Cohort 3",
    issuer: "Google Cloud & Hack2skill",
    date: "Sep 2026",
    badge: "Gen AI Specialist • Cohort 3",
    description: "Hands-on engineering in Generative AI architectures, LLM orchestration, multimodal pipelines, and Vertex AI deployments.",
    verifyUrl: "https://drive.google.com/file/d/17PHf9DdGlCuP9RDq8KPSFzaQf4PJVsp8/view?usp=drive_link",
  },
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    category: "Programming Languages",
    skills: [
      { name: "Python", level: "Core" },
      { name: "Java", level: "Core" },
      { name: "JavaScript", level: "Core" },
      { name: "Dart", level: "Core" },
      { name: "Rust", level: "Proficient" },
      { name: "SQL", level: "Core" },
    ],
  },
  {
    category: "Web & Mobile Technologies",
    skills: [
      { name: "Flutter", level: "Core" },
      { name: "Riverpod", level: "Core" },
      { name: "Dio", level: "Core" },
      { name: "Next.js & React", level: "Core" },
      { name: "Node.js", level: "Core" },
      { name: "Express.js", level: "Core" },
      { name: "REST APIs", level: "Core" },
      { name: "HTML5 / CSS3 / Tailwind", level: "Core" },
    ],
  },
  {
    category: "Databases & Storage",
    skills: [
      { name: "MongoDB", level: "Core" },
      { name: "PostgreSQL", level: "Core" },
      { name: "SQLite", level: "Core" },
      { name: "SharedPreferences / In-Memory", level: "Core" },
    ],
  },
  {
    category: "Cloud, DevOps & Tools",
    skills: [
      { name: "Google Cloud Platform (GCP)", level: "Certified" },
      { name: "Docker", level: "Proficient" },
      { name: "Git & GitHub", level: "Core" },
      { name: "Postman", level: "Core" },
    ],
  },
  {
    category: "AI & Computer Vision",
    skills: [
      { name: "PyTorch", level: "Advanced" },
      { name: "YOLOv8", level: "Advanced" },
      { name: "DeepSORT / ByteTrack", level: "Advanced" },
      { name: "OpenCV", level: "Advanced" },
      { name: "512-dim Re-ID Embeddings", level: "Advanced" },
    ],
  },
  {
    category: "Core Computer Science",
    skills: [
      { name: "Data Structures & Algorithms", level: "Core" },
      { name: "Object-Oriented Programming (OOP)", level: "Core" },
      { name: "Database Management Systems (DBMS)", level: "Core" },
      { name: "Operating Systems", level: "Core" },
      { name: "Computer Networks", level: "Core" },
    ],
  },
];

export const PROJECTS: Project[] = [
  {
    id: "nexus",
    title: "VIT-AP NEXUS",
    subtitle: "CAMPUS SUPER-APP & ACADEMIC OS",
    category: "Mobile Architecture & Systems",
    tagline: "Sub-15ms local cache campus life: attendance forecasting, real-time timetable sync & marks analytics.",
    description:
      "A high-performance student utility engineered to solve critical bottlenecks in university portal access. Built with Flutter and Riverpod on the client, backed by an asynchronous FastAPI proxy and SQLite caching layer to provide instant offline-first attendance calculations and real-time academic telemetry.",
    tags: ["Flutter", "Dart", "Riverpod", "Dio", "SQLite", "FastAPI", "Python", "Rust"],
    metrics: [
      { label: "Sync Speed", value: "< 15ms (on-device local cache read)" },
      { label: "Data Caching", value: "Instant Local SQLite" },
      { label: "Architecture", value: "MVVM + Repository" },
      { label: "Platform", value: "Android & iOS" },
    ],
    architecture: [
      { step: "Flutter Client", detail: "Riverpod reactive state with zero unnecessary rebuilds" },
      { step: "Local SQLite Cache", detail: "Instant offline read/write with optimistic updates" },
      { step: "FastAPI Middleware", detail: "Asynchronous session proxy & payload compression" },
      { step: "VTOP Ingestion", detail: "Automated captcha bypass & DOM parsing engine" },
    ],
    links: {
      github: "https://github.com/Gnanesh-2007/Vitap_nexus",
    },
    features: [
      "Real-time Attendance Simulation: Calculate exactly how many classes you can miss or need to attend",
      "Dynamic Schedule Matrix: Day-order based timetable with automated room alerts",
      "Digital Gradebook & CGPA Forecaster with target semester goal modeling",
      "Instant push notifications for schedule changes and threshold alerts",
    ],
  },
  {
    id: "parkos",
    title: "PARKOS",
    subtitle: "SMART PARKING OPERATING SYSTEM",
    category: "IoT & Full-Stack Platform",
    tagline: "Real-time slot reservation, telemetry tracking, and automated parking session orchestration.",
    description:
      "A complete smart parking operating system bridging physical sensor telemetry with an ultra-responsive web interface. Features live interactive parking grids, QR-driven check-in workflows, real-time slot occupancy tracking, dynamic rate calculation, and seamless automated billing pipelines.",
    tags: ["Next.js", "Node.js", "Express.js", "MongoDB", "REST APIs", "JWT", "TypeScript"],
    metrics: [
      { label: "Live Telemetry", value: "Real-time WebSockets" },
      { label: "Check-in Latency", value: "< 50ms" },
      { label: "Grid Status", value: "Zero-Collision Locks" },
      { label: "Deployment", value: "Production Vercel" },
    ],
    architecture: [
      { step: "Sensor Telemetry", detail: "Ultrasonic / camera slot occupancy feeds" },
      { step: "Event Pipeline", detail: "Low-latency WebSocket pub/sub session state" },
      { step: "State Machine", detail: "Entry -> Check-in -> Occupied -> Billing -> Exit" },
      { step: "Next.js UI", detail: "Interactive SVG slot matrix with live state indicators" },
    ],
    links: {
      live: "https://park-os.vercel.app/",
      github: "https://github.com/Gnanesh-2007/Park-Os",
    },
    features: [
      "Interactive 2D Grid: Live color-coded slot visualizer (Available, Reserved, Occupied)",
      "Instant Reservation Engine: 1-click slot booking with dynamic pricing tiers",
      "Telemetry Dashboard: Real-time parking occupancy analytics and turnover rates",
      "Frictionless QR Entry & automated exit barrier session lifecycle",
    ],
  },
  {
    id: "omerta",
    title: "OMERTÀ",
    subtitle: "MULTI-CAMERA AI VEHICLE TRACKING & RE-ID",
    category: "Computer Vision & Deep Learning",
    tagline: "Synchronized multi-camera vehicle surveillance, deep metric Re-ID, and trajectory vector analytics.",
    description:
      "An advanced AI surveillance architecture designed for tracking vehicles seamlessly across disjoint camera networks. Combines YOLO object detection, DeepSORT/ByteTrack trajectory association, and deep metric feature embeddings to re-identify vehicles across blind spots and variable lighting conditions.",
    tags: ["PyTorch", "YOLOv8", "DeepSORT", "OpenCV", "FastAPI", "Re-ID Embeddings"],
    metrics: [
      { label: "Multi-Cam Sync", value: "3+ Camera Streams" },
      { label: "Inference Speed", value: "30+ FPS (GPU batch inference)" },
      { label: "Feature Vector", value: "512-dim Embedding" },
      { label: "Tracking Metric", value: "Cosine Re-ID Matching" },
    ],
    architecture: [
      { step: "Video Feeds", detail: "RTSP stream capture with frame deduplication" },
      { step: "YOLO Detection", detail: "Real-time bounding box extraction for vehicles" },
      { step: "Deep Metric Re-ID", detail: "512-dimensional CNN/Transformer feature vector generation" },
      { step: "Spatial Trajectory", detail: "Cross-camera path reconstruction and timestamp correlation" },
    ],
    links: {
      live: "https://omerta-o1dy.onrender.com/",
      github: "https://github.com/Gnanesh-2007/omerta",
    },
    features: [
      "Cross-Camera Re-Identification: Track vehicles through blind zones across separate cameras",
      "Dynamic Bounding Box Telemetry: Live speed, vehicle class, and confidence tracking",
      "Camera Switcher HUD: Instant camera feed switching with synchronized track IDs",
      "Trajectory Mapping: Visual movement path reconstruction over satellite spatial grid",
    ],
  },
];

export const LAB_EXPERIMENTS: LabExperiment[] = [
  {
    id: "isl",
    number: "01",
    title: "Speech → Indian Sign Language (ISL)",
    category: "Accessibility & NLP",
    description: "Speech-to-text tokenization mapped to structured ISL grammar and real-time gesture avatar animations.",
    status: "PROTOTYPE",
    tags: ["Web Speech API", "NLP Tokenizer", "Grammar Synthesizer", "3D Avatar"],
    interactiveType: "isl",
  },
  {
    id: "cv",
    number: "02",
    title: "Real-Time Neural Edge & Kernel Visualizer",
    category: "Computer Vision",
    description: "Interactive image processing lab: Sobel convolutions, Laplacian kernels, and Canny edge algorithms.",
    status: "ACTIVE",
    tags: ["Canvas API", "Image Processing", "Convolution Kernels", "Matrix Math"],
    interactiveType: "cv",
  },
  {
    id: "cache",
    number: "03",
    title: "Distributed LRU Cache & Raft Consensus",
    category: "Distributed Systems",
    description: "Visualizing lock-free memory eviction, consistent hashing ring, and node cluster failover.",
    status: "ACTIVE",
    tags: ["Data Structures", "LRU Eviction", "Consistent Hashing", "Concurrency"],
    interactiveType: "cache",
  },
  {
    id: "ratelimit",
    number: "04",
    title: "Token Bucket High-Throughput Rate Limiter",
    category: "Cloud & APIs",
    description: "Interactive simulation of token refill bursts, sliding window counters, and DDoS traffic throttling.",
    status: "ACTIVE",
    tags: ["Algorithms", "Traffic Shaping", "Token Bucket", "Redis Lua"],
    interactiveType: "ratelimit",
  },
  {
    id: "vtop",
    number: "05",
    title: "VTOP Headless Session Scraper Engine",
    category: "Reverse Engineering",
    description: "Asynchronous session pooling, encrypted payload parsing, and resilient DOM query engine.",
    status: "ACTIVE",
    tags: ["Python", "FastAPI", "AsyncIO", "DOM Parsing"],
    interactiveType: "vtop",
  },
];

export const TECH_NODES: TechNode[] = [
  // Core Center
  { id: "gnanesh", name: "GNANESH", category: "Backend & Systems", level: "Core", projects: ["nexus", "parkos", "omerta"], x: 50, y: 50 },

  // Programming Languages
  { id: "python", name: "Python", category: "Language", level: "Core", projects: ["nexus", "omerta", "vtop"], x: 28, y: 26 },
  { id: "java", name: "Java", category: "Language", level: "Core", projects: ["algorithms", "oop"], x: 18, y: 42 },
  { id: "javascript", name: "JavaScript", category: "Language", level: "Core", projects: ["parkos", "portfolio"], x: 72, y: 24 },
  { id: "dart", name: "Dart", category: "Language", level: "Core", projects: ["nexus"], x: 22, y: 58 },
  { id: "rust", name: "Rust", category: "Language", level: "Proficient", projects: ["nexus"], x: 38, y: 16 },
  { id: "sql", name: "SQL", category: "Language", level: "Core", projects: ["parkos", "nexus"], x: 42, y: 84 },

  // Web & Mobile
  { id: "flutter", name: "Flutter", category: "Frontend & Mobile", level: "Core", projects: ["nexus"], x: 14, y: 72 },
  { id: "riverpod", name: "Riverpod / Dio", category: "Frontend & Mobile", level: "Core", projects: ["nexus"], x: 28, y: 78 },
  { id: "nextjs", name: "Next.js / React", category: "Frontend & Mobile", level: "Core", projects: ["parkos", "portfolio"], x: 82, y: 36 },
  { id: "nodejs", name: "Node.js / Express", category: "Backend & Systems", level: "Core", projects: ["parkos"], x: 64, y: 18 },
  { id: "fastapi", name: "FastAPI", category: "Backend & Systems", level: "Core", projects: ["nexus", "omerta", "vtop"], x: 50, y: 18 },

  // Databases & Storage
  { id: "mongodb", name: "MongoDB", category: "Cloud & DB", level: "Core", projects: ["parkos"], x: 80, y: 52 },
  { id: "sqlite", name: "SQLite Cache", category: "Cloud & DB", level: "Core", projects: ["nexus"], x: 32, y: 64 },
  { id: "postgresql", name: "PostgreSQL", category: "Cloud & DB", level: "Core", projects: ["parkos"], x: 54, y: 84 },

  // Cloud, Tools & AI
  { id: "gcp", name: "Google Cloud (GCP)", category: "Cloud & DB", level: "Core", projects: ["gcp-ace", "cloud"], x: 86, y: 68 },
  { id: "docker", name: "Docker", category: "Cloud & DB", level: "Proficient", projects: ["omerta", "nexus"], x: 68, y: 84 },
  { id: "git", name: "Git / GitHub", category: "Cloud & DB", level: "Core", projects: ["nexus", "parkos", "omerta"], x: 74, y: 72 },
  { id: "postman", name: "Postman", category: "Cloud & DB", level: "Core", projects: ["nexus", "parkos"], x: 84, y: 18 },
  { id: "pytorch", name: "PyTorch / YOLOv8", category: "AI & Computer Vision", level: "Advanced", projects: ["omerta"], x: 62, y: 68 },
  { id: "opencv", name: "OpenCV / Re-ID", category: "AI & Computer Vision", level: "Advanced", projects: ["omerta", "cv"], x: 46, y: 70 },
];

export const TIMELINE_EVENTS = [
  {
    year: "2024",
    tag: "B.TECH INITIATION",
    title: "Started B.Tech in Computer Science & Engineering",
    subtitle: "Core Systems, Data Structures & Architecture",
    description: "Commenced B.Tech in Computer Science & Engineering. Built deep foundations in data structures, algorithms, low-level system designs, and modern full-stack application development.",
  },
  {
    year: "2025",
    tag: "SYSTEMS BUILDER",
    title: "Started VIT-AP Nexus & Deployed ParkOS",
    subtitle: "Mobile Architecture & Smart Spatial IoT",
    description: "Initiated the development of VIT-AP Nexus to solve campus portal bottlenecks with Flutter & Riverpod. Architected and deployed ParkOS (Smart Parking Operating System) with real-time spatial telemetry and dynamic billing.",
  },
  {
    year: "2026",
    tag: "AI & PRODUCTION",
    title: "Completed VIT-AP Nexus & Developed Omertà",
    subtitle: "Campus Super-App & Multi-Camera AI Vision",
    description: "Completed and polished VIT-AP Nexus with near-instant local SQLite caching. Engineered Omertà for multi-camera vehicle Re-ID and trajectory association using PyTorch, YOLOv8, and deep metric feature embeddings.",
  },
  {
    year: "PRESENT",
    tag: "WHAT'S NEXT",
    title: "Building High-Throughput Systems & Next-Gen Software",
    subtitle: "Full Stack Engineer & Systems Architect",
    description: "Designing high-scale distributed architectures, real-time computer vision pipelines, and robust mobile systems.",
  },
];
