// Single source of truth for all real copy, taken directly from the
// user's Canva prototype spec. No placeholder/invented content lives here —
// if a field isn't specified, it's left empty and flagged in the README.

export const site = {
  name: { first: "Chris", last: "Bonifacio." },
  tagline: "Turning raw data into decisions that move business forward.",
  email: "christianjesse.bonifacio@gmail.com",
  year: "2026",
  links: {
    github: "https://github.com/cqbonifacio1",
    linkedin: "https://www.linkedin.com/in/cjbonifacio11",
    indeed: "https://www.linkedin.com/in/cjbonifacio11",
  },
  navLinks: ["About", "Work", "Projects"],
};

export const about = {
  headlineA: [
    { text: "As a ", accent: false },
    { text: "data scientist", accent: true },
    { text: " and ", accent: false },
    { text: "analyst", accent: true },
    { text: ", I build end-to-end solutions that turn complex datasets into clear, actionable intelligence.", accent: false },
  ],
  greeting: "Hi, I'm",
  name: "CJ",
  bio: [
    { text: "A ", accent: false },
    { text: "Magna Cum Laude", accent: true },
    { text: " CS graduate from the University of the Philippines Manila. I craft solutions at the intersection of ", accent: false },
    { text: "machine learning", accent: true },
    { text: ", ", accent: false },
    { text: "business intelligence", accent: true },
    { text: ", and ", accent: false },
    { text: "web development", accent: true },
    { text: ". I turn domain complexity into tools people actually use.", accent: false },
  ],
};

export const popup = {
  quote: "I find the pattern. I build the pipeline. I tell the story.",
};

export type ExperienceImage = { src: string; badge: string; caption: string };

export type ExperienceRow = {
  dateRange: string;
  company: string;
  role: string;
  images: ExperienceImage[]; // images[0] is the initial/cover card (badge + company + role)
};

// All HEIC files have been converted to .jpg per CJ's note — extensions
// updated to match.
export const experience: ExperienceRow[] = [
  {
    dateRange: "August 2025 – March 2026",
    company: "Ayala Land Premier",
    role: "Data and Business Intelligence Analyst",
    images: [
      { src: "/images/experience/alp/alp1.JPG", badge: "4.0", caption: "Ayala Land Premier — Data and Business Intelligence Analyst" },
      { src: "/images/experience/alp/alp2.jpg", badge: "4.1", caption: "Built a Sales Funnel Dashboard used by 400+ sales agents across the Premium RBG" },
      { src: "/images/experience/alp/alp3.jpg", badge: "4.2", caption: "Automated SAP data extraction, cutting manual update time by an estimated 64%." },
      { src: "/images/experience/alp/alp4.jpg", badge: "4.3", caption: "Developed a Customer Profile Dashboard that contributed to a 3.2% increase in sales." },
      { src: "/images/experience/alp/alp5.jpg", badge: "4.4", caption: "Commended by the Alveo Sales group for surfacing actionable buyer intelligence through data." },
      { src: "/images/experience/alp/alp6.jpg", badge: "4.5", caption: "Embedded with CSMG, building dashboards that aligned KPIs across sales, marketing, and finance." },
    ],
  },
  {
    dateRange: "June 2025 – August 2025",
    company: "Ayala Land Inc.",
    role: "Digital Transformation Center – Intern",
    images: [
      { src: "/images/experience/ali/ali1.jpg", badge: "3.0", caption: "Ayala Land Inc. — Digital Transformation Center, Intern" },
      { src: "/images/experience/ali/ali2.jpg", badge: "3.1", caption: "Built a Secondary Market Dashboard tracking vertical and horizontal property listings across the Philippines." },
      { src: "/images/experience/ali/ali3.jpg", badge: "3.2", caption: "Scraped 500k+ property listings from Lamudi and Dotproperty using Selenium and Beautiful Soup." },
      { src: "/images/experience/ali/ali4.jpg", badge: "3.3", caption: "Presented market price analysis to the Steering Committee, earning a formal commendation." },
      { src: "/images/experience/ali/ali5.jpg", badge: "3.4", caption: "Project showcased at a company-wide townhall attended by over 3,000 Ayala Land employees." },
      { src: "/images/experience/ali/ali6.jpg", badge: "3.5", caption: "Supported UAT during migration of warehouse data to AWS SageMaker, ensuring data integrity." },
    ],
  },
  {
    dateRange: "August 2024 – September 2026",
    company: "Infinit-O Philippines",
    role: "Transformation Intern – Data Science",
    images: [
      { src: "/images/experience/infinito/infinito1.png", badge: "2.0", caption: "Infinit-O Philippines — Transformation Intern, Data Science" },
      { src: "/images/experience/infinito/infinito2.png", badge: "2.1", caption: "Built a QuickSight Asset Inventory Dashboard tracking data usage and dashboard performance metrics" },
      { src: "/images/experience/infinito/infinito3.png", badge: "2.2", caption: "Optimized SQL queries in Amazon Athena, reducing reporting errors by 30% through UAT." },
      { src: "/images/experience/infinito/infinito4.png", badge: "2.3", caption: "Created data dictionaries and reports to standardize documentation and improve data reliability" },
      { src: "/images/experience/infinito/infinito5.png", badge: "2.4", caption: "Managed and analyzed large datasets across AWS S3, Athena, and QuickSight for BI insights." },
    ],
  },
  {
    dateRange: "June 2024 – August 2024",
    company: "Amazon Philippines",
    role: "Data Science Intern",
    images: [
      { src: "/images/experience/amazon/amazon1.png", badge: "1.0", caption: "Amazon Philippines — Data Science Intern" },
      { src: "/images/experience/amazon/amazon2.png", badge: "1.1", caption: "Engineered an end-to-end ML pipeline for fraud listing detection using Python, scikit-learn, and SageMaker." },
      { src: "/images/experience/amazon/amazon3.png", badge: "1.2", caption: "Trained a predictive model on customer behavioral data achieving 87% accuracy and 0.91 AUC-ROC." },
      { src: "/images/experience/amazon/amazon4.png", badge: "1.3", caption: "Automated fraud flagging workflows, reducing manual review overhead across operational teams at scale." },
      { src: "/images/experience/amazon/amazon5.png", badge: "1.4", caption: "Improved operational response time through model-driven fraud detection integrated into existing pipelines." },
    ],
  },
];

export type Project = {
  slug: string;
  index: string; // "01".."07"
  name: string;
  title: string; // large hero title on detail page
  tagline: string; // one-line description under project name in list
  description: string; // paragraph on detail page
  tags: string[];
  course: string;
  field: string;
  recognition: string;
  techStack: string;
  video: string;
  thumbnail: string;
  showcase: string[];
  hasMoreProjectsLink?: boolean;
  /** Projects 4–6 are Ayala Land Inc. work — images blurred for privacy per CJ. */
  blurred?: boolean;
};

export const projects: Project[] = [
  {
    slug: "predictor",
    index: "01",
    name: "PredictO.R.",
    title: "PredictO.R: ML-Based Surgery Duration Prediction at PGH",
    tagline: "Machine Learning · XAI · Undergraduate Thesis",
    description:
      "A machine learning web application predicting surgery durations at the Philippine General Hospital, trained on 29,614 surgical records achieving an MAE of 13.90 minutes.",
    tags: ["Machine Learning", "XAI", "Undergraduate Thesis"],
    course: "CMSC 197 & 198 – Undergraduate Thesis",
    field: "Machine Learning & Explainable AI",
    recognition: "Top-3 Best Theses ('25–'26)",
    techStack: "React · FastAPI · Supabase · scikit-learn",
    video: "/videos/proj1page.mp4",
    thumbnail: "/images/projects/thumbnails/proj1-thumbnail.png",
    showcase: Array.from({ length: 6 }, (_, i) => `/images/projects/proj1/proj1-${i + 1}.png`),
  },
  {
    slug: "protealyze",
    index: "02",
    name: "ProteAlyze",
    title: "ProteAlyze: Protein Interaction Network Analyzer",
    tagline: "Network Science · Bioinformatics · Data Visualization",
    description:
      "A web application for visualizing and analyzing molecular interaction networks from MD simulations, increasing network analysis throughput by 78% among institutional researchers at UP Manila.",
    tags: ["Network Science", "Bioinformatics", "Data Visualization"],
    course: "CMSC 191 – Network Science",
    field: "Network Analysis & Bioinformatics",
    recognition: "Shortlisted for NetSci 2026 (Boston)",
    techStack: "Flask · Cytoscape.js · Python · JavaScript",
    video: "/videos/proj2page.mp4",
    thumbnail: "/images/projects/thumbnails/proj2-thumbnail.png",
    showcase: Array.from({ length: 4 }, (_, i) => `/images/projects/proj2/proj2-${i + 1}.png`),
    hasMoreProjectsLink: true,
  },
  {
    slug: "build-up",
    index: "03",
    name: "Build U.P.",
    title: "Build U.P: Building Inventory Management System",
    tagline: "Infrastructure Management · Full-Stack Development",
    description:
      "A role-based building inventory management system for UP Manila's CPDMO, enabling staff to document, track, and resolve infrastructure reports across campus buildings.",
    tags: ["Infrastructure Management", "Full-Stack Development"],
    course: "CMSC 128.1 & 128.2 – Software Engineering I & II",
    field: "Full-Stack Development",
    recognition: "Deployed & Adopted by UP Manila",
    techStack: "React · Spring Boot · PostgreSQL · Java",
    video: "/videos/proj3page.mp4",
    thumbnail: "/images/projects/thumbnails/proj3-thumbnail.jpg",
    showcase: [
      "/images/projects/proj3/proj3-1.jpg",
      "/images/projects/proj3/proj3-2.jpg",
      "/images/projects/proj3/proj3-3.png",
      "/images/projects/proj3/proj3-4.png",
      "/images/projects/proj3/proj3-5.png",
      "/images/projects/proj3/proj3-6.png",
    ],
  },
  {
    slug: "secondary-market-dashboard",
    index: "04",
    name: "Secondary Market D.B.",
    title: "Secondary Market Dashboard: Vertical & Horizontal Projects",
    tagline: "Market Analysis · Web Scraping · Competitive Intel.",
    description:
      "A market price analysis dashboard built from 500k+ scraped property listings across NCR, presented to the President of Ayala Land Inc. and the steering committee.",
    tags: ["Market Analysis", "Web Scraping", "Competitive Intel."],
    course: "CMSC 198 – Practicum",
    field: "Dashboard Development & Data Analysis",
    recognition: "Presented at the first-ever Townhall Meeting",
    techStack: "Python · Selenium · Beautiful Soup · Tableau",
    video: "/videos/proj4page.mp4",
    thumbnail: "/images/projects/thumbnails/proj4-thumbnail.png",
    showcase: Array.from({ length: 4 }, (_, i) => `/images/projects/proj4/proj4-${i + 1}.png`),
    blurred: true,
  },
  {
    slug: "sales-funnel-dashboard",
    index: "05",
    name: "Sales Funnel D.B.",
    title: "Sales Funnel Dashboard: Premium RBG Sales Channel",
    tagline: "Sales Analytics · Pipeline Visualization · SAP Integration",
    description:
      "A pipeline dashboard used by 400+ sales agents across Premium RBG, reducing manual update time by 64% and contributing to a 2% acceleration in sales cycles.",
    tags: ["Sales Analysis", "Pipeline Visualization", "SAP Integration"],
    course: "Project-Hire Employment",
    field: "Dashboard Development & Sales Analysis",
    recognition: "Coordinated to the President of Alveo Sales",
    techStack: "SAP · Python · SQL · Tableau · Athena",
    video: "/videos/proj5page.mp4",
    thumbnail: "/images/projects/thumbnails/proj5-thumbnail.png",
    // proj5-5.png removed per CJ — only 4 images now.
    showcase: Array.from({ length: 4 }, (_, i) => `/images/projects/proj5/proj5-${i + 1}.png`),
    blurred: true,
  },
  {
    slug: "customer-profile-dashboard",
    index: "06",
    name: "Customer Profile D.B.",
    title: "Customer / Buyer Profile Dashboard: Tableau & Power BI",
    tagline: "Demographic Analytics · Business Intelligence",
    description:
      "A buyer intelligence dashboard featuring demographic and segmentation visualizations, commended by the Alveo Sales group and contributing to a 3.2% increase in sales since implementation.",
    tags: ["Demographic Analytics", "Business Intelligence"],
    course: "Full-Time Employment",
    field: "Dashboard Development & Sales Analysis",
    recognition: "Presented at the first-ever Townhall Meeting",
    techStack: "SAP · Python · SQL · Tableau",
    video: "/videos/proj6page.mp4",
    thumbnail: "/images/projects/thumbnails/proj6-thumbnail.png",
    showcase: Array.from({ length: 6 }, (_, i) => `/images/projects/proj6/proj6-${i + 1}.png`),
    blurred: true,
  },
  {
    slug: "chronic-endometritis-ml",
    index: "07",
    name: "Chronic Endometritis M.L.",
    title: "IEEE: ML Models with XAI for Chronic Endometritis",
    tagline: "Predictive Modelling · XAI · Optuna",
    description:
      "A machine learning approach for predicting chronic endometritis, evaluating 24 models across six configurations and achieving an AUROC of 0.9034 with AdaBoost, enhanced by SHAP explainability to identify key hormonal, inflammatory, and metabolic predictors.",
    tags: ["Predictive Modelling", "XAI", "Optuna"],
    course: "CMSC 177 – Data Science II",
    field: "Machine Learning & Explainable AI",
    recognition: "IEEE Publication at ICUFN 2026 in Italy",
    techStack: "Python · R Programming · scikit-learn",
    video: "/videos/proj7page.mp4",
    // NOTE: you wrote "proj7-thumbail.png" (missing an "n") — using the
    // correctly-spelled "proj7-thumbnail.png" here to match the proj1–6
    // naming pattern. Name your file to match this, or tell me to change
    // it back to the exact spelling you gave.
    thumbnail: "/images/projects/thumbnails/proj7-thumbnail.png",
    showcase: Array.from({ length: 6 }, (_, i) => `/images/projects/proj7/proj7-${i + 1}.png`),
  },
];

export type Discipline = {
  index: string;
  name: string;
  description: string;
  tags: string[];
};

export const disciplines: Discipline[] = [
  {
    index: "01",
    name: "Data Science",
    description:
      "From raw datasets to predictive models, I design and evaluate machine learning pipelines that solve real-world problems at scale.",
    tags: ["Python", "R Programming", "AWS Tools", "Jupyter", "SHAP", "Pandas", "statsmodels", "scikit-learn", "Azure", "MLflow", "DL - TensorFlow"],
  },
  {
    index: "02",
    name: "Data Analytics",
    description:
      "I translate complex business data into dashboards and reports that drive decisions across sales, operations, and strategy.",
    tags: ["Tableau", "Power BI", "AWS Sagemaker", "Amazon Quicksight", "Amazon Athena", "AWS S3", "BigQuery", "Hadoop", "Apache Spark", "Tableau Prep", "Databricks"],
  },
  {
    index: "03",
    name: "Software Engineering",
    description:
      "I build full-stack web applications with clean architecture, from database design to deployment, built for real users and real workflows.",
    tags: ["React", "Next.js", "Vue.js", "Spring boot", "FastAPI", "Django", "MongoDB", "Docker", "REST APIs", "Java", "Github", "Node.js", "Javascript", "Postman"],
  },
  {
    index: "04",
    name: "AI Engineering",
    description:
      "I develop AI-powered solutions including RAG pipelines and ML-integrated backends that bring intelligence into production systems.",
    tags: ["LangChain", "ChromaDB", "Kubernetes", "Hugging Face", "FAISS", "Pinecone", "OpenAI APIs", "AWS Bedrock", "Ollama", "PyTorch", "LiteLLM", "LlamaIndex"],
  },
];
