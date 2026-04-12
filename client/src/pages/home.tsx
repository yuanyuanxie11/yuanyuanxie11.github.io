import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Phone,
  Linkedin,
  MapPin,
  ChevronDown,
  Briefcase,
  GraduationCap,
  Code2,
  BookOpen,
  ExternalLink,
  Brain,
  Database,
  Cloud,
  BarChart3,
  Heart,
  Users,
  Sparkles,
  ChevronRight,
  Layers,
  Github,
  FileText,
  TrendingUp,
  Lightbulb,
  Microscope,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import HeroCanvas from "@/components/HeroCanvas";
import {
  BarChart, Bar, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from "recharts";
import profilePhoto from "@assets/9271de4dedc83313cad8f76c8b278f98_1768159283863.JPG";
import dogPhoto1 from "@assets/d647bccb827b7f34d9a33ef52a095576_1768160415110.JPG";
import dogPhoto2 from "@assets/Screenshot_2026-01-11_at_13.36.02_1768160425298.png";
import mbtaMapImage from "@assets/station_delay_map.png";
import moodysManualsImage from "@assets/moodysManuals.png";

// ─── Animation variants ───────────────────────────────────────────────────────
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const stagger = {
  animate: { transition: { staggerChildren: 0.1 } }
};

// ─── Data ─────────────────────────────────────────────────────────────────────
const skills = {
  "Machine Learning & AI": [
    "Predictive Modeling", "Classification", "Clustering", "Time Series",
    "Deep Learning (PyTorch, TensorFlow)", "NLP (LLMs, RAG, LangChain)",
    "AI Agents", "Computer Vision", "Causal Inference", "A/B Testing"
  ],
  "Programming": [
    "Python", "R", "SQL", "Java", "C++", "SAS",
    "MySQL", "Database Design", "Data Structures", "ETL Workflows"
  ],
  "Analytics & Visualization": [
    "Pandas", "NumPy", "PySpark", "Tableau", "Power BI",
    "Plotly", "Seaborn", "Excel", "Google Analytics"
  ],
  "Cloud & MLOps": [
    "AWS (EMR, S3, EC2, Lambda)", "Google Cloud", "Databricks",
    "MLflow", "Docker", "Git", "Linux", "CI/CD Pipeline"
  ]
};

type ExperienceChart = {
  type: "bar" | "line";
  title: string;
  insight: string;
  data: Record<string, string | number>[];
  xKey: string;
  series: { key: string; color: string; label: string }[];
};

type StoryExperience = {
  title: string;
  company: string;
  location: string;
  period: string;
  type?: string;
  headline: string;
  situation: string;
  discovery: string;
  challenge: string;
  impactStat: { value: string; label: string };
  impactBadges: string[];
  chart?: ExperienceChart;
  tools: string[];
};

const experiences: StoryExperience[] = [
  {
    title: "Data Scientist",
    company: "Zebra Technologies",
    location: "Chicago, IL",
    period: "September 2025 – Present",
    type: "Industry Practicum · Northwestern University",
    headline: "We had to question the tool we were using to measure success",
    situation: "Zebra Technologies builds the scanners, tablets, and mobile computers that run warehouses, hospital floors, and retail operations worldwide. When one breaks in the field, a technician has minutes — not hours — to fix it. The answer is usually buried somewhere across thousands of technical manuals, past repair tickets, and institutional knowledge that took years to build. My job was to build an AI that could surface the right answer, fast.",
    discovery: "Standard AI search finds the closest paragraph. But real troubleshooting requires reasoning across *relationships* — this error code connects to that component, which is sensitive to a specific environmental condition. I built a hybrid system that combines a knowledge graph (a map of how concepts connect) with traditional vector search, so the AI doesn't just retrieve information — it navigates it. The insight that changed everything, though, was about measurement. We were using another AI model to evaluate our AI's answers — a common industry approach called 'LLM-as-judge.' But that judge was trained on linear documents, so it systematically undervalued the reasoning chains our graph-based system produced. It was like grading a chess player using rules from checkers.",
    challenge: "We had to design our own human-in-the-loop evaluation framework — real domain experts reviewing real queries — because the standard measuring stick was giving us misleading results. That's a harder problem than building the AI itself.",
    impactStat: { value: "↑ Reasoning Quality", label: "caught by human eval, missed by AI judge" },
    impactBadges: ["Enterprise AI", "Knowledge Graphs", "Evaluation Design", "Human-in-the-Loop"],
    chart: {
      type: "bar",
      title: "Where AI Judge and Human Experts Disagreed",
      insight: "LLM-as-judge inflates scores on familiar patterns but misses the reasoning quality that graph-enhanced retrieval actually delivers",
      data: [
        { metric: "Factual Accuracy", ai_judge: 81, human_expert: 83 },
        { metric: "Context Relevance", ai_judge: 79, human_expert: 65 },
        { metric: "Reasoning Quality", ai_judge: 61, human_expert: 87 },
        { metric: "Answer Completeness", ai_judge: 74, human_expert: 78 },
      ],
      xKey: "metric",
      series: [
        { key: "ai_judge",     color: "#a78bfa", label: "LLM-as-Judge Score" },
        { key: "human_expert", color: "#34d399", label: "Human Expert Score" },
      ],
    },
    tools: ["Google Gemini (AI model)", "Neo4j (knowledge graph database)", "LangGraph (AI reasoning framework)", "Google Cloud", "Phoenix (evaluation tracking)"],
  },
  {
    title: "Research Assistant",
    company: "City University of Hong Kong",
    location: "Hong Kong SAR",
    period: "February 2024 – July 2025",
    type: "Department of Management",
    headline: "What companies write in job postings reveals more than what they say in interviews",
    situation: "Most of what we know about how organizations behave comes from surveys and self-reported data — what companies *say* about themselves. I spent 18 months in Hong Kong working on a different question: what does the language data tell us? Across three research projects, I helped uncover behavioral patterns that official communications don't reveal.",
    discovery: "One of the most striking findings: the specific words a company uses in job postings — not just what roles they're hiring for, but *how* they describe them — encode genuine signals about organizational trust and culture. Companies that use language patterns associated with psychological safety tend to have measurably different employee outcomes. We could detect this not through surveys, but through text analysis at scale.",
    challenge: "The data pipeline was the hardest part. We were processing 200,000+ job postings and integrating eye-tracking data, behavioral surveys, and Google Analytics into a unified analysis — each source with different formats, inconsistencies, and missing values. I built automated pipelines that could handle the messy reality of research-grade data.",
    impactStat: { value: "200K+", label: "records processed across research projects" },
    impactBadges: ["Behavioral Analytics", "NLP at Scale", "Causal Inference", "Organizational Research"],
    chart: {
      type: "bar",
      title: "Research Scale Across Three Projects",
      insight: "Each project required building the data infrastructure from scratch — no two datasets looked the same",
      data: [
        { project: "Job Market NLP", records: 200, unit: "K postings" },
        { project: "Eye-Tracking Study", records: 4,   unit: "K participants" },
        { project: "Trust Signals Analysis", records: 85,  unit: "K data points" },
      ],
      xKey: "project",
      series: [{ key: "records", color: "#a78bfa", label: "Scale (thousands)" }],
    },
    tools: ["Python + Selenium (automated data collection)", "R (statistical modeling)", "Stata (causal inference)", "Google Analytics", "Latent variable modeling"],
  },
  {
    title: "Research Assistant",
    company: "Emory University",
    location: "Atlanta, GA",
    period: "January 2023 – January 2024",
    type: "Department of Economics",
    headline: "Decades of financial wisdom were locked in paper — we taught AI to read it",
    situation: "Imagine shelves of Moody's financial manuals from the 1960s through the 1990s — meticulously compiled records of enormous value for economic research, but existing only as scanned images. The knowledge was there, frozen in time, inaccessible to any modern analysis tool. My task was to teach AI systems to read these documents the way a trained analyst would: understanding not just the words, but the structure.",
    discovery: "The breakthrough wasn't about finding a smarter AI — it was about framing the problem correctly. Document parsing fails when you treat a financial manual as a bag of words. Tables, headers, footnotes, and multi-column layouts all encode meaning that a line-by-line reader destroys. Once we started treating documents as structured artifacts with spatial relationships, accuracy jumped significantly.",
    challenge: "How do you know when your AI is reading correctly? You can't manually verify 50 years of financial records. We ran rigorous A/B testing — pitting different AI approaches against each other on benchmark subsets — to systematically find what worked and why each approach failed where it did.",
    impactStat: { value: "40%", label: "improvement in parsing accuracy" },
    impactBadges: ["Document AI", "Historical Data", "A/B Testing", "Systematic Evaluation"],
    chart: {
      type: "bar",
      title: "Parsing Accuracy: The A/B Testing Journey",
      insight: "Each iteration revealed a different failure mode — structure-awareness turned out to be the decisive factor",
      data: [
        { approach: "Baseline OCR", accuracy: 51 },
        { approach: "Naïve Bayes",  accuracy: 62 },
        { approach: "Amazon Textract", accuracy: 71 },
        { approach: "Structure-Aware AI", accuracy: 85 },
      ],
      xKey: "approach",
      series: [{ key: "accuracy", color: "#a78bfa", label: "Parsing Accuracy (%)" }],
    },
    tools: ["Amazon Textract", "Google Document AI", "AWS SageMaker", "Naïve Bayes classifiers", "Tableau (results visualization)"],
  },
  {
    title: "Marketing Analyst Intern",
    company: "Intellipro Group",
    location: "Santa Clara, CA",
    period: "September 2022 – December 2022",
    headline: "An 89% accurate forecast changed where a company decided to expand",
    situation: "Intellipro is a staffing and recruiting firm eyeing expansion into Latin American IT markets. Before committing resources, they needed to understand how local businesses actually perceived their services — not through surveys, but through what people were genuinely saying. I built the analytics infrastructure that turned that question into a data problem.",
    discovery: "Sentiment in business language shifts regionally in ways that simple translation completely misses. A phrase signaling confidence in one market reads as hedging in another. By building sentiment classification models trained on regional language patterns, we could map market perceptions with a nuance that no standard market research report could capture.",
    challenge: "The database was a mess. Query times were painfully slow because no one had designed the schema with analysis in mind. I rebuilt the MySQL architecture — properly normalized, indexed for the queries that actually mattered — cutting query times by 50% and making real-time analysis actually possible.",
    impactStat: { value: "89%", label: "sales forecast accuracy" },
    impactBadges: ["Market Intelligence", "Sentiment Analysis", "Time Series Forecasting", "Database Design"],
    chart: {
      type: "line",
      title: "Sales Forecast vs. Actual Performance",
      insight: "ARMA/SARIMA time series models produced forecasts reliable enough to drive international expansion decisions",
      data: [
        { month: "Sept", forecast: 100, actual: 108 },
        { month: "Oct",  forecast: 118, actual: 114 },
        { month: "Nov",  forecast: 133, actual: 129 },
        { month: "Dec",  forecast: 151, actual: 155 },
      ],
      xKey: "month",
      series: [
        { key: "forecast", color: "#a78bfa", label: "Forecast" },
        { key: "actual",   color: "#34d399", label: "Actual" },
      ],
    },
    tools: ["MySQL (database architecture)", "Random Forest + SVM (sentiment classification)", "ARMA/SARIMA (time series forecasting)", "R"],
  },
];

const education = [
  {
    degree: "Master of Science in Machine Learning and Data Science",
    school: "Northwestern University",
    location: "Evanston, IL",
    period: "Expected December 2026"
  },
  {
    degree: "Bachelor of Science (Double Major) in Applied Mathematics and Economics",
    school: "Emory University",
    location: "Atlanta, GA",
    period: "December 2023"
  },
  {
    degree: "Data and Policy Summer Scholar",
    school: "University of Chicago",
    location: "Chicago, IL",
    period: "June – July 2022",
    focus: "Data Processing, Data Analytics, R Programming"
  }
];

type ProjectMetric = { label: string; value: string };
type ProjectLink = { label: string; url: string; icon: "github" | "pdf" | "external" };

type Project = {
  id: string;
  category: "Industry" | "Research" | "Academic";
  title: string;
  tagline: string;
  /** Prominent impact number shown on card face */
  headline: string;
  image?: string;
  skills: string[];
  story: {
    problem: string;
    approach: string;
    results: ProjectMetric[];
  };
  links?: ProjectLink[];
};

const projects: Project[] = [
  // ── Industry ──────────────────────────────────────────────────────────────
  {
    id: "zebra-rag",
    category: "Industry",
    title: "Zebra Agentic RAG System",
    tagline: "Production AI — from manual PDF navigation to <10 second troubleshooting answers",
    headline: "80%+ Fortune 500",
    skills: ["LangGraph", "Neo4j GraphRAG", "Weaviate", "Gemini VLM", "Python", "Arize Phoenix"],
    story: {
      problem: "Zebra Technologies field technicians needed instant answers buried across 2,470+ pages of printer manuals. Manual PDF navigation cost minutes per query across a global workforce serving a $5B enterprise — customers include 80%+ of the Fortune 500 across 100+ countries.",
      approach: "Built a dual-pipeline agentic RAG: Neo4j GraphRAG (Problem→Cause→Solution traversal) + Weaviate hybrid vector search (BM25 + dense retrieval, MMR reranking). Gemini VLM extracted structured data from complex multi-column layouts using a sliding window approach. LangGraph orchestrated stateful agentic workflows with dynamic routing between pipelines. Validated via automated eval (BLEU, ROUGE-L, BERTScore, LLM-as-Judge) across 48 queries per device; monitored with Arize Phoenix.",
      results: [
        { label: "Embedding Similarity", value: "0.89" },
        { label: "ROUGE-L F1",          value: "45.1" },
        { label: "Pages Indexed",        value: "2,470+" },
        { label: "Response Time",        value: "<10 sec" },
      ],
    },
  },
  {
    id: "boss-zhipin",
    category: "Industry",
    title: "BOSS Zhipin Job Platform NLP",
    tagline: "A/B tested AI-enhanced job postings → 40% lift in applicant conversion",
    headline: "+40% Conversion",
    skills: ["Python", "XGBoost", "LDA Topic Modeling", "NLP", "A/B Testing", "Sentiment Analysis"],
    story: {
      problem: "BOSS Zhipin (53M+ MAU, NASDAQ: BZ — China's largest job platform) needed to know what linguistic patterns actually drive applicant engagement. Which words signal urgency vs. culture vs. work-life balance? And does optimizing for them move the needle?",
      approach: "Built a domain-specific lexicon via NLP sentiment analysis and LDA topic modeling. Trained XGBoost to predict high-performing postings (AUC=0.87) on NLP-derived features. Designed and ran a platform-wide A/B test comparing AI-enhanced vs. baseline job postings. Findings achieved 40% lift in applicant conversion rate and were adopted by C-suite for platform-wide recruiter guidance strategy.",
      results: [
        { label: "XGBoost AUC",     value: "0.87" },
        { label: "Conversion Lift", value: "+40%" },
        { label: "Platform MAU",    value: "53M+" },
        { label: "Impact",          value: "C-Suite Adopted" },
      ],
    },
  },
  // ── Research ──────────────────────────────────────────────────────────────
  {
    id: "eye-tracking",
    category: "Research",
    title: "Consumer Trust Eye-Tracking Study",
    tagline: "Factorial experiment reveals what really drives willingness to pay for social value",
    headline: "+28% Sales Growth",
    skills: ["R", "SEM", "Factor Analysis", "Eye-Tracking", "2×2 Factorial Design", "Stata"],
    story: {
      problem: "A disability-inclusive bakery wanted to understand: does price transparency or third-party certification (verifying disabled employment) drive consumer willingness to pay? The question had real implications for their pricing and marketing strategy.",
      approach: "Designed a 2×2 factorial eye-tracking experiment (n=200) manipulating price transparency and certification presence. Applied factor analysis and Structural Equation Modeling (SEM) in R. Found that certification — signaling disabled employment — was a stronger purchase intent driver than price transparency. Findings informed targeted interventions contributing to 28% monthly sales growth.",
      results: [
        { label: "Sample Size",   value: "n=200" },
        { label: "Design",        value: "2×2 Factorial" },
        { label: "Method",        value: "SEM + Eye-Track" },
        { label: "Sales Impact",  value: "+28%" },
      ],
    },
  },
  {
    id: "chicago-pd",
    category: "Research",
    title: "Chicago PD Causal Inference",
    tagline: "Instrumental variables reveal how early discipline shapes 20-year career trajectories",
    headline: "200K+ Officers",
    skills: ["Python", "Selenium", "SQL", "Instrumental Variables (2SLS)", "ETL", "Causal Inference"],
    story: {
      problem: "Do early-career disciplinary outcomes causally shape long-term trajectories for police officers? The question matters for policy but is hard to study — selection effects corrupt any simple correlation, requiring a causal identification strategy.",
      approach: "Built a Python/Selenium ETL pipeline integrating SEC corporate misconduct records with Chicago PD officer personnel and disciplinary records (200,000+ officers — second largest municipal police force in the U.S.). Applied instrumental variables estimation (2SLS) to address endogeneity and establish causal estimates of early discipline on long-term career outcomes.",
      results: [
        { label: "Officers",      value: "200K+" },
        { label: "Method",        value: "IV / 2SLS" },
        { label: "Data Sources",  value: "SEC + CPD" },
        { label: "Pipeline",      value: "Automated ETL" },
      ],
    },
  },
  {
    id: "moodys-ocr",
    category: "Research",
    title: "Moody's Document AI Pipeline",
    tagline: "Teaching AI to read 40 years of financial manuals — layout-aware OCR at scale",
    headline: "+40% Accuracy",
    image: moodysManualsImage,
    skills: ["Amazon Textract", "Google Document AI", "AWS SageMaker", "Naïve Bayes", "SQL", "Tableau"],
    story: {
      problem: "Decades of Moody's financial manuals (1909–1949, covering thousands of U.S. companies) existed only as scanned images — inaccessible to any modern analysis tool. Standard OCR failed on complex multi-column financial layouts.",
      approach: "Benchmarked Amazon Textract vs. Google Document AI to identify the optimal layout-aware OCR pipeline. Achieved 40% higher parsing accuracy on AWS SageMaker using structure-aware extraction. Designed a Naïve Bayes QC system to filter low-quality OCR artifacts, cutting data prep time by 20%. Clustered 10,000+ company profiles via K-Means and built interactive Tableau dashboards for analyst verification.",
      results: [
        { label: "Accuracy Gain",  value: "+40%" },
        { label: "Prep Time Cut",  value: "-20%" },
        { label: "Profiles",       value: "10,000+" },
        { label: "Era Covered",    value: "1909–1949" },
      ],
    },
  },
  // ── Academic ──────────────────────────────────────────────────────────────
  {
    id: "instacart",
    category: "Academic",
    title: "Instacart Market Basket Analysis",
    tagline: "Predicting grocery reorders across 3M+ transactions with tuned ensemble ML",
    headline: "PR-AUC 0.796",
    skills: ["Python", "XGBoost", "LightGBM", "Scikit-learn", "Hyperopt", "SHAP"],
    story: {
      problem: "Predicting which previously purchased items a user will reorder is genuinely hard — sparse data, severe class imbalance, and wildly variable user behavior. Getting this right powers personalized cart pre-population at scale.",
      approach: "Engineered 9 behavioral features from 3M+ historical transactions. Ran a systematic model horse-race (Logistic Regression → LightGBM) using Bayesian hyperparameter search (Hyperopt) with PR-AUC as north star given class imbalance. SHAP values for model interpretability.",
      results: [
        { label: "PR-AUC",       value: "0.796" },
        { label: "ROC-AUC",      value: "0.729" },
        { label: "F1 Score",     value: "0.764" },
        { label: "Transactions", value: "3M+" },
      ],
    },
    links: [{ label: "Read the Paper", url: "/MLDS_420_Final_Project.pdf", icon: "pdf" }],
  },
  {
    id: "mbta",
    category: "Academic",
    title: "MBTA Transit Analytics Dashboard",
    tagline: "Geospatial delay analysis across Boston's entire transit network",
    headline: "Full Network",
    image: mbtaMapImage,
    skills: ["Python", "Pandas", "Folium", "Geospatial Analytics", "Data Visualization"],
    story: {
      problem: "Boston's MBTA generates enormous trip timing data, but no easy way existed to see which stations had worst delay patterns or how distributions shifted between peak and off-peak hours.",
      approach: "Built an interactive Folium geospatial dashboard mapping every MBTA stop by route. Clicking any station surfaces its full delay distribution — p50, p95 — alongside observed trip volume, making systemic patterns immediately visible.",
      results: [
        { label: "Trips Analyzed", value: "229" },
        { label: "Delay Perc.",    value: "p50 / p95" },
        { label: "Routes Mapped",  value: "Full MBTA" },
        { label: "Interaction",    value: "Click-through" },
      ],
    },
  },
  {
    id: "rag-chunking",
    category: "Academic",
    title: "Document Chunking Strategies for RAG",
    tagline: "How you split text determines how well your AI answers questions",
    headline: "4 Strategies",
    skills: ["Python", "LangChain", "RAG", "NLP", "Vector Search", "Document Intelligence"],
    story: {
      problem: "RAG quality depends heavily on chunking, but most teams treat it as an afterthought. Chunk size, overlap, and boundary logic have massive effects on retrieval quality and grounding fidelity.",
      approach: "Systematically compared 4 strategies — fixed-size, sliding window, structure-aware, and semantic — on dense technical documents. Measured retrieval relevance, grounding fidelity, and answer quality for each approach.",
      results: [
        { label: "Strategies Tested", value: "4+" },
        { label: "Corpus",            value: "Technical Docs" },
        { label: "Eval Metric",       value: "Retrieval + Grounding" },
        { label: "Framework",         value: "LangChain" },
      ],
    },
  },
];

const publications = [
  {
    title: "Life Insurance Reinvented: A Cross-National Analysis on Annuity Payments",
    venue: "96th International Atlantic Economic Conference",
    location: "Philadelphia, PA",
    date: "October 2023",
    type: "Presentation"
  },
  {
    title: "Re-imagining the Future of Forest Management -- An Age-Dependent Approach towards Harvesting",
    venue: "arXiv",
    date: "August 2023",
    doi: "10.48550/arXiv.2308.03198",
    type: "Publication"
  }
];

const skillIcons: Record<string, React.ReactNode> = {
  "Machine Learning & AI": <Brain className="w-5 h-5" />,
  "Programming": <Code2 className="w-5 h-5" />,
  "Analytics & Visualization": <BarChart3 className="w-5 h-5" />,
  "Cloud & MLOps": <Cloud className="w-5 h-5" />
};

const categoryColors: Record<string, string> = {
  "Industry":  "bg-emerald-100 text-emerald-700 border-emerald-200",
  "Research":  "bg-violet-100 text-violet-700 border-violet-200",
  "Academic":  "bg-sky-100 text-sky-700 border-sky-200",
};

const funFacts = [
  {
    emoji: "🐾",
    category: "Dog Mom",
    front: "I have a four-legged co-founder",
    back: "My dog has attended every single late-night debugging session — mostly asleep, but present. She has an uncanny ability to demand a walk at exactly the moment I'm most stuck on a problem. She's usually right. Best productivity hack I've found.",
    color: "from-violet-100 to-purple-50 border-violet-200",
    textColor: "text-violet-700",
  },
  {
    emoji: "🎾",
    category: "Tennis",
    front: "I bring data brain to the tennis court",
    back: "After every match I lose, I spend time analyzing what went wrong — serve placement, footwork patterns, when I started rushing. My friends say this is \"too much.\" My win rate says otherwise. Tennis taught me that consistency beats brilliance every time.",
    color: "from-emerald-100 to-green-50 border-emerald-200",
    textColor: "text-emerald-700",
  },
  {
    emoji: "🌏",
    category: "Traveller",
    front: "Hong Kong rewired how I think",
    back: "Living and working in Hong Kong for 18 months taught me that the same data point tells completely different stories depending on who's reading it and what they've lived. Good data science requires cultural fluency, not just statistical fluency. I'm still learning both.",
    color: "from-sky-100 to-blue-50 border-sky-200",
    textColor: "text-sky-700",
  },
  {
    emoji: "🍜",
    category: "Food & Family",
    front: "My best ideas come from dinner tables",
    back: "In my family, a meal isn't over until everyone has argued at least once and changed their mind at least once. Long dinners with too many dishes and no agenda are where I've had some of my clearest thinking. There's something about unhurried conversation that unlocks things a focused work session never does.",
    color: "from-rose-100 to-orange-50 border-rose-200",
    textColor: "text-rose-700",
  },
];

// ─── Section definitions for side nav ────────────────────────────────────────
const navSections = [
  { id: "hero",         label: "Home" },
  { id: "about",        label: "About" },
  { id: "projects",     label: "Projects" },
  { id: "experience",   label: "Experience" },
  { id: "skills",       label: "Skills" },
  { id: "education",    label: "Education" },
  { id: "publications", label: "Research" },
  { id: "personal",     label: "Personal" },
  { id: "contact",      label: "Contact" },
];

const ALL_CATEGORIES = ["All", "Industry", "Research", "Academic"];

// ─── Side navigation dots ─────────────────────────────────────────────────────
function SideNavDots({ activeSection, onDotClick }: { activeSection: string; onDotClick: (id: string) => void }) {
  return (
    <div className="fixed right-5 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col gap-2.5">
      {navSections.map((s) => (
        <button
          key={s.id}
          onClick={() => onDotClick(s.id)}
          title={s.label}
          className="group flex items-center justify-end gap-2"
        >
          <span className="hidden group-hover:inline-block text-xs text-foreground bg-card border rounded px-2 py-0.5 shadow-sm whitespace-nowrap">
            {s.label}
          </span>
          <div className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
            activeSection === s.id
              ? "bg-accent scale-125 shadow-[0_0_8px_rgba(251,191,36,0.7)]"
              : "bg-muted-foreground/30 hover:bg-muted-foreground/60"
          }`} />
        </button>
      ))}
    </div>
  );
}

// ─── Experience chart (used in modal) ────────────────────────────────────────
function ExperienceChartBlock({ chart }: { chart: NonNullable<StoryExperience["chart"]> }) {
  const ChartComponent = chart.type === "line" ? LineChart : BarChart;
  return (
    <div className="mt-4 p-4 rounded-xl bg-muted/40 border border-border/60">
      <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1">{chart.title}</p>
      <p className="text-xs text-muted-foreground italic mb-3">{chart.insight}</p>
      <ResponsiveContainer width="100%" height={180}>
        <ChartComponent data={chart.data} margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis dataKey={chart.xKey} tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} />
          <YAxis tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "8px",
              fontSize: 12,
            }}
          />
          <Legend wrapperStyle={{ fontSize: 11 }} />
          {chart.series.map((s) =>
            chart.type === "line" ? (
              <Line key={s.key} type="monotone" dataKey={s.key} stroke={s.color} name={s.label} strokeWidth={2} dot={{ r: 3 }} />
            ) : (
              <Bar key={s.key} dataKey={s.key} fill={s.color} name={s.label} radius={[4, 4, 0, 0]} />
            )
          )}
        </ChartComponent>
      </ResponsiveContainer>
    </div>
  );
}

// ─── Experience story modal ───────────────────────────────────────────────────
function ExperienceModal({ exp, onClose }: { exp: StoryExperience | null; onClose: () => void }) {
  useEffect(() => {
    if (!exp) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [exp, onClose]);

  if (!exp) return null;
  return (
    <AnimatePresence>
      <motion.div
        key="exp-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="bg-card rounded-2xl w-full max-w-2xl max-h-[88vh] overflow-y-auto shadow-2xl border"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Sticky header */}
          <div className="sticky top-0 bg-card/95 backdrop-blur border-b border-border z-10 px-6 py-4 flex items-start justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold">{exp.title} — {exp.company}</h3>
              <p className="text-xs text-muted-foreground mt-0.5">{exp.period} · {exp.location}</p>
            </div>
            <button onClick={onClose} className="shrink-0 p-1.5 rounded-lg hover:bg-muted transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6 space-y-5">
            <p className="text-xl font-semibold leading-snug">"{exp.headline}"</p>

            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1.5">The Situation</p>
              <p className="text-sm text-foreground/80 leading-relaxed">{exp.situation}</p>
            </div>

            <div className="border-l-2 border-accent pl-4">
              <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1.5">The Discovery</p>
              <p className="text-sm text-foreground/80 leading-relaxed">{exp.discovery}</p>
            </div>

            {exp.chart && <ExperienceChartBlock chart={exp.chart} />}

            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1.5">What Made It Hard</p>
              <p className="text-sm text-foreground/80 leading-relaxed">{exp.challenge}</p>
            </div>

            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2">Tools That Made It Possible</p>
              <div className="flex flex-wrap gap-2">
                {exp.tools.map((tool, i) => (
                  <span key={i} className="text-xs bg-muted px-3 py-1.5 rounded-full border border-border text-foreground/70">
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// ─── Project story modal ──────────────────────────────────────────────────────
function ProjectModal({ project, onClose }: { project: Project | null; onClose: () => void }) {
  useEffect(() => {
    if (!project) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [project, onClose]);

  if (!project) return null;

  const linkIcon = (icon: string) => {
    if (icon === "github") return <Github className="w-3.5 h-3.5" />;
    if (icon === "pdf")    return <FileText className="w-3.5 h-3.5" />;
    return <ExternalLink className="w-3.5 h-3.5" />;
  };

  return (
    <AnimatePresence>
      <motion.div
        key="proj-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="bg-card rounded-2xl w-full max-w-2xl max-h-[88vh] overflow-y-auto shadow-2xl border"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Sticky header */}
          <div className="sticky top-0 bg-card/95 backdrop-blur border-b border-border z-10 px-6 py-4 flex items-start justify-between gap-4">
            <div>
              <span className={`inline-block text-xs font-semibold px-2.5 py-0.5 rounded-full border mb-1 ${categoryColors[project.category] ?? "bg-muted text-muted-foreground border-border"}`}>
                {project.category}
              </span>
              <h3 className="text-lg font-semibold">{project.title}</h3>
            </div>
            <button onClick={onClose} className="shrink-0 p-1.5 rounded-lg hover:bg-muted transition-colors mt-1">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6 space-y-5">
            {project.image && (
              <div className="relative h-36 rounded-xl overflow-hidden">
                <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />
              </div>
            )}

            <p className="text-muted-foreground text-sm">{project.tagline}</p>

            <div className="flex flex-wrap gap-1.5">
              {project.skills.map((skill, i) => (
                <Badge key={i} variant="secondary" className="text-xs">{skill}</Badge>
              ))}
            </div>

            <div className="flex gap-3">
              <div className="shrink-0 mt-0.5 p-1.5 rounded-lg bg-rose-50 text-rose-500">
                <Lightbulb className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1">The Problem</p>
                <p className="text-sm text-foreground/80 leading-relaxed">{project.story.problem}</p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="shrink-0 mt-0.5 p-1.5 rounded-lg bg-violet-50 text-violet-500">
                <Microscope className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1">The Approach</p>
                <p className="text-sm text-foreground/80 leading-relaxed">{project.story.approach}</p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="shrink-0 mt-0.5 p-1.5 rounded-lg bg-emerald-50 text-emerald-500">
                <TrendingUp className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">Key Results</p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {project.story.results.map((r, i) => (
                    <div key={i} className="flex flex-col items-center bg-muted/50 rounded-xl px-3 py-3 border border-border/60">
                      <span className="text-xl font-bold text-foreground">{r.value}</span>
                      <span className="text-[10px] text-muted-foreground uppercase tracking-wide text-center mt-0.5">{r.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {project.links && project.links.length > 0 && (
              <div className="flex flex-wrap gap-3">
                {project.links.map((link, i) => (
                  <a
                    key={i}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-accent text-accent-foreground text-sm font-medium hover:bg-accent/90 transition-colors"
                  >
                    {linkIcon(link.icon)}
                    {link.label}
                  </a>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// ─── Academic journey timeline (About section) ───────────────────────────────
const academicJourney = [
  {
    school: "Emory University",
    degree: "BS Applied Mathematics & Economics",
    detail: "Double Major — Dean's List",
    period: "2019 – 2023",
    location: "Atlanta, GA",
    gradient: "from-sky-500 to-blue-600",
    bg: "bg-sky-50 border-sky-200",
    text: "text-sky-700",
  },
  {
    school: "University of Chicago",
    degree: "Data & Policy Summer Scholar",
    detail: "Data Processing · Analytics · R Programming",
    period: "Summer 2022",
    location: "Chicago, IL",
    gradient: "from-violet-500 to-purple-600",
    bg: "bg-violet-50 border-violet-200",
    text: "text-violet-700",
  },
  {
    school: "Northwestern University",
    degree: "MS Machine Learning & Data Science",
    detail: "Expected December 2026",
    period: "2024 – Present",
    location: "Evanston, IL",
    gradient: "from-rose-500 to-pink-600",
    bg: "bg-rose-50 border-rose-200",
    text: "text-rose-700",
    current: true,
  },
];

function AcademicTimeline() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <div className="relative">
      <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-6 flex items-center gap-2">
        <GraduationCap className="w-4 h-4" /> Academic Journey
      </p>

      {/* Vertical connector line */}
      <div className="absolute left-[18px] top-12 bottom-0 w-0.5 bg-gradient-to-b from-sky-400 via-violet-400 to-rose-400 opacity-40" />

      <div className="space-y-5">
        {academicJourney.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.12 }}
            className="relative flex gap-4"
          >
            {/* Node dot */}
            <button
              onClick={() => setActive(active === i ? null : i)}
              className={`shrink-0 w-9 h-9 rounded-full bg-gradient-to-br ${item.gradient} flex items-center justify-center z-10 shadow-md hover:scale-110 transition-transform`}
              aria-label={`Toggle ${item.school} details`}
            >
              <GraduationCap className="w-4 h-4 text-white" />
            </button>

            {/* Content */}
            <div className="flex-1 pb-1">
              <button
                onClick={() => setActive(active === i ? null : i)}
                className="text-left w-full group"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-semibold leading-snug group-hover:text-accent transition-colors">
                        {item.school}
                      </p>
                      {item.current && (
                        <span className="text-[9px] font-bold uppercase tracking-widest text-accent bg-accent/10 border border-accent/20 rounded-full px-1.5 py-0.5">
                          Now
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">{item.degree}</p>
                  </div>
                  <span className="text-[10px] text-muted-foreground/70 whitespace-nowrap shrink-0 mt-0.5">{item.period}</span>
                </div>
              </button>

              {/* Expandable detail */}
              <AnimatePresence>
                {active === i && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className={`mt-2 px-3 py-2 rounded-lg border text-xs ${item.bg}`}>
                      <p className={`font-semibold mb-0.5 ${item.text}`}>{item.detail}</p>
                      <p className="text-muted-foreground">{item.location}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ─── Experience journey timeline ──────────────────────────────────────────────
// Ordered chronologically: oldest → newest
const journeyOrder = [...experiences].reverse(); // Intellipro → Emory → CityU → Zebra

const journeyColors = [
  { dot: "from-amber-400 to-orange-500",  ring: "border-amber-300",  bg: "bg-amber-50 border-amber-200",  text: "text-amber-700"  },
  { dot: "from-sky-400 to-blue-500",      ring: "border-sky-300",    bg: "bg-sky-50 border-sky-200",      text: "text-sky-700"    },
  { dot: "from-violet-400 to-purple-500", ring: "border-violet-300", bg: "bg-violet-50 border-violet-200",text: "text-violet-700" },
  { dot: "from-emerald-400 to-teal-500",  ring: "border-emerald-300",bg: "bg-emerald-50 border-emerald-200",text: "text-emerald-700"},
];

function ExperienceTimeline({ onOpenStory }: { onOpenStory: (exp: StoryExperience) => void }) {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  const toggle = (i: number) => setActiveIdx(activeIdx === i ? null : i);

  return (
    <div className="flex flex-col h-full">
      {/* Section header */}
      <div className="flex-shrink-0 mb-6">
        <div className="flex items-center gap-3 mb-1">
          <Briefcase className="w-6 h-6 text-accent" />
          <h2 className="font-display text-3xl md:text-4xl font-bold">Experience</h2>
        </div>
        <p className="text-sm text-muted-foreground">
          A journey through the work — click any stop to read the story.
        </p>
      </div>

      {/* Timeline */}
      <div className="flex-1 min-h-0 overflow-y-auto relative pr-1">
        {/* Vertical connector — spans between first and last node */}
        <div className="absolute left-[18px] top-5 bottom-5 w-0.5 bg-gradient-to-b from-amber-400 via-sky-400 via-violet-400 to-emerald-400 opacity-30" />

        <div className="space-y-3">
          {journeyOrder.map((exp, i) => {
            const color = journeyColors[i];
            const isOpen = activeIdx === i;

            return (
              <div key={i} className="relative flex gap-4">
                {/* Node */}
                <button
                  onClick={() => toggle(i)}
                  aria-expanded={isOpen}
                  className={`shrink-0 w-9 h-9 rounded-full bg-gradient-to-br ${color.dot} flex items-center justify-center z-10 shadow-md hover:scale-110 transition-all duration-200 border-2 border-white`}
                >
                  <span className="text-white text-xs font-bold">{i + 1}</span>
                </button>

                {/* Row content */}
                <div className="flex-1 min-w-0">
                  {/* Header row — always visible */}
                  <button
                    onClick={() => toggle(i)}
                    className="text-left w-full group"
                  >
                    <div className="flex items-start justify-between gap-2 py-1.5">
                      <div className="min-w-0">
                        <p className="text-sm font-semibold leading-tight group-hover:text-accent transition-colors truncate">
                          {exp.company}
                        </p>
                        <p className="text-xs text-muted-foreground truncate">{exp.title}</p>
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0">
                        <span className="text-[10px] text-muted-foreground/70 whitespace-nowrap hidden sm:block">
                          {exp.period.split("–")[0].trim()}
                        </span>
                        <motion.div animate={{ rotate: isOpen ? 90 : 0 }} transition={{ duration: 0.2 }}>
                          <ChevronRight className="w-3.5 h-3.5 text-muted-foreground" />
                        </motion.div>
                      </div>
                    </div>
                  </button>

                  {/* Expandable story preview */}
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.28, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className={`mb-3 p-4 rounded-xl border ${color.bg}`}>
                          {/* Location + period */}
                          <p className={`text-[10px] font-bold uppercase tracking-widest mb-2 ${color.text}`}>
                            {exp.location} · {exp.period}
                          </p>

                          {/* Headline */}
                          <p className="text-sm font-semibold leading-snug text-foreground mb-3 font-display">
                            "{exp.headline}"
                          </p>

                          {/* Impact stat */}
                          <div className="flex items-center gap-2 mb-3">
                            <span className="text-xl font-bold text-accent">{exp.impactStat.value}</span>
                            <span className="text-xs text-muted-foreground leading-tight">{exp.impactStat.label}</span>
                          </div>

                          {/* Badges */}
                          <div className="flex flex-wrap gap-1 mb-3">
                            {exp.impactBadges.map((b, bi) => (
                              <Badge key={bi} variant="outline" className="text-[10px] px-1.5 py-0">{b}</Badge>
                            ))}
                          </div>

                          {/* Full story button */}
                          <button
                            onClick={() => onOpenStory(exp)}
                            className="flex items-center gap-1 text-xs font-semibold text-accent hover:text-accent/80 transition-colors group"
                          >
                            <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                            Read the full story
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ─── Compact project card ─────────────────────────────────────────────────────
function CompactProjectCard({ project, index, onOpen }: { project: Project; index: number; onOpen: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.07 }}
      className="h-full"
    >
      <Card
        className="p-4 h-full hover:shadow-lg hover:border-accent/40 transition-all duration-200 cursor-pointer group flex flex-col"
        onClick={onOpen}
      >
        {/* Category + headline impact on same row */}
        <div className="flex items-start justify-between gap-2 mb-2">
          <span className={`inline-block text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full border ${categoryColors[project.category] ?? "bg-muted text-muted-foreground border-border"}`}>
            {project.category}
          </span>
          <span className="text-base font-bold text-accent leading-tight shrink-0 text-right">
            {project.headline}
          </span>
        </div>

        <h3 className="font-semibold text-sm leading-snug mb-1">{project.title}</h3>
        <p className="text-xs text-muted-foreground line-clamp-2 flex-1 mb-3">{project.tagline}</p>

        {/* 2 key metrics */}
        <div className="flex gap-1.5 mb-3">
          {project.story.results.slice(0, 2).map((r, i) => (
            <div key={i} className="flex flex-col items-center bg-muted/60 rounded-lg px-2 py-1 min-w-[52px]">
              <span className="text-xs font-bold leading-tight">{r.value}</span>
              <span className="text-[9px] text-muted-foreground uppercase tracking-wide leading-tight text-center">{r.label}</span>
            </div>
          ))}
        </div>

        <span className="flex items-center gap-1 text-xs text-accent font-medium mt-auto">
          Read the story
          <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </span>
      </Card>
    </motion.div>
  );
}

// ─── Projects section (snap page version) ────────────────────────────────────
function ProjectsSection({ onOpenProject }: { onOpenProject: (project: Project) => void }) {
  const [activeCategory, setActiveCategory] = useState("All");
  const filtered = activeCategory === "All" ? projects : projects.filter((p) => p.category === activeCategory);

  return (
    <div className="flex flex-col h-full">
      <div className="flex-shrink-0 mb-4">
        <div className="flex items-center gap-3 mb-1.5">
          <Layers className="w-6 h-6 text-accent" />
          <h2 className="font-display text-3xl md:text-4xl font-bold">Projects</h2>
        </div>
        <p className="text-sm text-muted-foreground mb-3">Industry work, research, and academic builds — click any card for the full story.</p>

        <div className="flex flex-wrap gap-1.5">
          {ALL_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1 rounded-full text-xs font-medium border transition-all duration-200 ${
                activeCategory === cat
                  ? "bg-accent text-accent-foreground border-accent shadow-sm"
                  : "bg-background text-muted-foreground border-border hover:border-accent/50 hover:text-foreground"
              }`}
            >
              {cat}
              {cat !== "All" && (
                <span className="ml-1 opacity-60">{projects.filter((p) => p.category === cat).length}</span>
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto">
        <motion.div layout className="grid grid-cols-2 lg:grid-cols-3 gap-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <CompactProjectCard
                key={project.id}
                project={project}
                index={i}
                onOpen={() => onOpenProject(project)}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}

// ─── Flip card component ──────────────────────────────────────────────────────
function FlipCard({ fact, index }: { fact: typeof funFacts[0]; index: number }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="cursor-pointer"
      style={{ perspective: 1000 }}
      onClick={() => setFlipped(!flipped)}
    >
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
        style={{ transformStyle: "preserve-3d", position: "relative", width: "100%", paddingBottom: "100%" }}
      >
        {/* Front */}
        <div
          className={`absolute inset-0 rounded-2xl border bg-gradient-to-br ${fact.color} p-4 flex flex-col justify-between`}
          style={{ backfaceVisibility: "hidden" }}
        >
          <span className="text-3xl">{fact.emoji}</span>
          <div>
            <p className={`text-xs font-bold uppercase tracking-widest mb-1 ${fact.textColor}`}>{fact.category}</p>
            <p className="text-sm font-semibold text-foreground leading-snug">{fact.front}</p>
          </div>
          <p className="text-[9px] text-muted-foreground">Tap to flip ↗</p>
        </div>
        {/* Back */}
        <div
          className="absolute inset-0 rounded-2xl border bg-foreground p-4 flex flex-col justify-between"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <span className="text-2xl">{fact.emoji}</span>
          <p className="text-xs text-background/90 leading-relaxed">{fact.back}</p>
          <p className="text-[9px] text-background/40">Tap to flip back</p>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Home page ────────────────────────────────────────────────────────────────
export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState("hero");
  const [selectedExp, setSelectedExp] = useState<StoryExperience | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Track active section using IntersectionObserver
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    navSections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { threshold: 0.4 }
      );
      observer.observe(el);
      observers.push(observer);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const scrollToSection = (id: string) => {
    const container = containerRef.current;
    const el = document.getElementById(id);
    if (!container || !el) return;
    const containerTop = container.getBoundingClientRect().top;
    const elTop = el.getBoundingClientRect().top;
    container.scrollTo({ top: container.scrollTop + (elTop - containerTop), behavior: "smooth" });
  };

  return (
    <>
      {/* Modals rendered above everything */}
      <ExperienceModal exp={selectedExp} onClose={() => setSelectedExp(null)} />
      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />

      {/* Fixed top navigation */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/50"
      >
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => scrollToSection("hero")}
              className="font-display text-xl font-semibold tracking-tight hover:text-accent transition-colors"
            >
              Yuanyuan Xie
            </button>
            <div className="hidden md:flex items-center gap-6">
              {[
                ["about",        "About"],
                ["projects",     "Projects"],
                ["experience",   "Experience"],
                ["skills",       "Skills"],
                ["education",    "Education"],
                ["publications", "Research"],
                ["contact",      "Contact"],
              ].map(([id, label]) => (
                <button
                  key={id}
                  onClick={() => scrollToSection(id)}
                  className={`text-sm transition-colors ${
                    activeSection === id
                      ? "text-foreground font-medium"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Side navigation dots */}
      <SideNavDots activeSection={activeSection} onDotClick={scrollToSection} />

      {/* ── Scroll-snap container ── */}
      <div
        ref={containerRef}
        className="h-screen overflow-y-scroll snap-container"
        style={{ scrollSnapType: "y mandatory" }}
      >

        {/* ── HERO ── */}
        <section
          id="hero"
          style={{ scrollSnapAlign: "start" }}
          className="relative h-screen flex items-center justify-center overflow-hidden grain"
        >
          <HeroCanvas />
          <div className="absolute inset-0 z-[2] bg-gradient-to-b from-background/70 via-background/50 to-background" />

          <motion.div
            initial="initial"
            animate="animate"
            variants={stagger}
            className="relative z-[3] max-w-4xl mx-auto px-6 text-center"
          >
            <motion.div variants={fadeInUp} className="mb-8">
              <div className="relative inline-block">
                <div className="w-36 h-36 md:w-44 md:h-44 rounded-full overflow-hidden border-4 border-background shadow-2xl mx-auto">
                  <img src={profilePhoto} alt="Yuanyuan Xie" className="w-full h-full object-cover" />
                </div>
                <div className="absolute -bottom-2 -right-2 bg-accent text-accent-foreground rounded-full p-2 shadow-lg">
                  <Sparkles className="w-5 h-5" />
                </div>
              </div>
            </motion.div>

            <motion.div variants={fadeInUp} className="mb-4">
              <Badge variant="secondary" className="px-4 py-1.5 text-sm font-medium">
                <Database className="w-3.5 h-3.5 mr-2" />
                Data Scientist & ML Engineer
              </Badge>
            </motion.div>

            <motion.h1 variants={fadeInUp} className="font-display text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6">
              Yuanyuan Xie
            </motion.h1>

            <motion.p variants={fadeInUp} className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed">
              Building intelligent systems at the intersection of
              <span className="text-foreground font-medium"> Machine Learning</span>,
              <span className="text-foreground font-medium"> NLP</span>, and
              <span className="text-foreground font-medium"> Data-Driven Decision Making</span>
            </motion.p>

            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="gap-2 px-8" onClick={() => scrollToSection("contact")}>
                <Mail className="w-4 h-4" />
                Get in Touch
              </Button>
            </motion.div>

            <motion.div variants={fadeInUp} className="flex items-center justify-center gap-6 mt-8 text-sm text-muted-foreground">
              <span className="flex items-center gap-2"><MapPin className="w-4 h-4" /> Evanston, IL</span>
              <span className="flex items-center gap-2"><GraduationCap className="w-4 h-4" /> Northwestern University</span>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[3]"
          >
            <button onClick={() => scrollToSection("about")} className="text-muted-foreground hover:text-foreground transition-colors">
              <ChevronDown className="w-6 h-6 animate-bounce" />
            </button>
          </motion.div>
        </section>

        {/* ── ABOUT ── */}
        <section
          id="about"
          style={{ scrollSnapAlign: "start" }}
          className="h-screen flex items-center justify-center px-6 bg-muted/20"
        >
          <div className="max-w-5xl w-full">
            <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-start">

              {/* Left — bio text */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">About Me</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p className="text-base leading-relaxed">
                    I'm a Data Scientist and Machine Learning Engineer pursuing my MS in Machine Learning and Data Science at Northwestern University. With a foundation in Applied Mathematics and Economics from Emory, I bridge theoretical rigor with practical implementation.
                  </p>
                  <p className="text-base leading-relaxed">
                    My expertise spans building production-ready RAG systems, ETL pipelines at scale, and deploying ML models on cloud infrastructure. I'm driven by making AI accessible — and understandable — to anyone who needs it.
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 mt-6">
                  {["Graph RAG", "NLP & LLMs", "Statistical Modeling", "Cloud ML", "Research"].map((tag) => (
                    <span key={tag} className="px-3 py-1 bg-accent/10 border border-accent/20 text-accent rounded-full text-xs font-medium">
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>

              {/* Right — academic journey timeline */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <AcademicTimeline />
              </motion.div>

            </div>
          </div>
        </section>

        {/* ── PROJECTS ── (moved up — primary showcase) */}
        <section
          id="projects"
          style={{ scrollSnapAlign: "start" }}
          className="h-screen flex flex-col overflow-hidden"
        >
          <div className="flex-1 min-h-0 max-w-5xl mx-auto w-full px-6 pt-20 pb-8 flex flex-col">
            <ProjectsSection onOpenProject={setSelectedProject} />
          </div>
        </section>

        {/* ── EXPERIENCE ── */}
        <section
          id="experience"
          style={{ scrollSnapAlign: "start" }}
          className="h-screen flex flex-col overflow-hidden bg-muted/20"
        >
          <div className="flex-1 min-h-0 max-w-4xl mx-auto w-full px-6 pt-20 pb-8 flex flex-col">
            <ExperienceTimeline onOpenStory={setSelectedExp} />
          </div>
        </section>

        {/* ── SKILLS ── */}
        <section
          id="skills"
          style={{ scrollSnapAlign: "start" }}
          className="h-screen flex items-center justify-center px-6"
        >
          <div className="max-w-4xl w-full">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-3 mb-8"
            >
              <Code2 className="w-6 h-6 text-accent" />
              <h2 className="font-display text-3xl md:text-4xl font-bold">Technical Skills</h2>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-5">
              {Object.entries(skills).map(([category, items], index) => (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="p-5 hover:shadow-lg transition-shadow">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 rounded-lg bg-accent/10 text-accent">
                        {skillIcons[category]}
                      </div>
                      <h3 className="font-semibold text-sm">{category}</h3>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {items.map((skill, sIndex) => (
                        <Badge key={sIndex} variant="secondary" className="text-xs">{skill}</Badge>
                      ))}
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── EDUCATION ── */}
        <section
          id="education"
          style={{ scrollSnapAlign: "start" }}
          className="h-screen flex items-center justify-center px-6 bg-muted/20"
        >
          <div className="max-w-4xl w-full">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-3 mb-8"
            >
              <GraduationCap className="w-6 h-6 text-accent" />
              <h2 className="font-display text-3xl md:text-4xl font-bold">Education</h2>
            </motion.div>

            <div className="space-y-4">
              {education.map((edu, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="p-5 md:p-6 hover:shadow-lg transition-shadow">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2">
                      <div>
                        <h3 className="text-base font-semibold">{edu.degree}</h3>
                        <p className="text-accent font-medium text-sm">{edu.school}</p>
                        {edu.focus && <p className="text-xs text-muted-foreground mt-1">{edu.focus}</p>}
                      </div>
                      <div className="text-sm text-muted-foreground md:text-right shrink-0">
                        <p>{edu.period}</p>
                        <p>{edu.location}</p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── PUBLICATIONS + IMPACT ── */}
        <section
          id="publications"
          style={{ scrollSnapAlign: "start" }}
          className="h-screen flex flex-col overflow-hidden"
        >
          <div className="flex-1 min-h-0 max-w-4xl mx-auto w-full px-6 pt-20 pb-8 overflow-y-auto">
            {/* Publications */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-3 mb-6"
            >
              <BookOpen className="w-6 h-6 text-accent" />
              <h2 className="font-display text-3xl md:text-4xl font-bold">Research</h2>
            </motion.div>

            <div className="space-y-4 mb-8">
              {publications.map((pub, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="p-5 hover:shadow-lg transition-shadow">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <Badge variant="outline" className="mb-2 text-xs">{pub.type}</Badge>
                        <h3 className="text-sm font-semibold mb-1.5">{pub.title}</h3>
                        <p className="text-muted-foreground text-xs">
                          {pub.venue}{pub.location && `, ${pub.location}`} • {pub.date}
                        </p>
                        {pub.doi && (
                          <a
                            href={`https://doi.org/${pub.doi}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-xs text-accent hover:underline mt-1.5"
                          >
                            DOI: {pub.doi}
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Social Impact */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex items-center gap-3 mb-4"
            >
              <Users className="w-5 h-5 text-accent" />
              <h3 className="font-display text-xl font-bold">Service & Social Impact</h3>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Card className="p-5 hover:shadow-lg transition-shadow">
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  Beyond my technical work, I collaborate with nonprofit leaders on data-driven initiatives focused on gender equity and social impact. I volunteer with women-led organizations, contributing to mentorship, leadership, and cross-regional collaboration efforts.
                </p>
                <div className="flex flex-wrap gap-1.5">
                  <Badge variant="secondary" className="text-xs">Gender Equity</Badge>
                  <Badge variant="secondary" className="text-xs">Women in Leadership</Badge>
                  <Badge variant="secondary" className="text-xs">Community Fundraising</Badge>
                  <Badge variant="secondary" className="text-xs">Cross-Regional Collaboration</Badge>
                </div>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* ── BEYOND THE DATA ── */}
        <section
          id="personal"
          style={{ scrollSnapAlign: "start" }}
          className="h-screen flex flex-col overflow-hidden bg-muted/20"
        >
          <div className="flex-1 min-h-0 max-w-5xl mx-auto w-full px-6 pt-20 pb-8 flex flex-col">
            {/* Header */}
            <div className="flex-shrink-0 mb-6">
              <div className="flex items-center gap-3 mb-1.5">
                <Heart className="w-6 h-6 text-accent" />
                <h2 className="font-display text-3xl md:text-4xl font-bold">Beyond the Data</h2>
              </div>
              <p className="text-sm text-muted-foreground">
                The things that keep me curious, grounded, and occasionally humbled.{" "}
                <span className="font-medium text-foreground">Flip each card.</span>
              </p>
            </div>

            {/* Flip cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 flex-shrink-0 mb-6">
              {funFacts.map((fact, i) => <FlipCard key={i} fact={fact} index={i} />)}
            </div>

            {/* Dog photos */}
            <div className="flex gap-4 justify-center flex-1 min-h-0">
              <motion.div whileHover={{ scale: 1.02 }} className="rounded-2xl overflow-hidden shadow-lg flex-1 max-w-xs">
                <img src={dogPhoto1} alt="Sunset walk with my dog" className="w-full h-full object-cover" />
              </motion.div>
              <motion.div whileHover={{ scale: 1.02 }} className="rounded-2xl overflow-hidden shadow-lg flex-1 max-w-xs">
                <img src={dogPhoto2} alt="My happy companion" className="w-full h-full object-cover" />
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── CONTACT ── */}
        <section
          id="contact"
          style={{ scrollSnapAlign: "start" }}
          className="h-screen flex flex-col items-center justify-center px-6"
        >
          <div className="max-w-4xl w-full text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">Let's Connect</h2>
              <p className="text-lg text-muted-foreground mb-10 max-w-xl mx-auto">
                I'm currently seeking opportunities in Data Science and Machine Learning.
                Feel free to reach out to discuss potential collaborations.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
                <a
                  href="mailto:yyuanxie1101@gmail.com"
                  className="flex items-center gap-2 px-6 py-3 rounded-lg bg-card border hover:bg-muted transition-colors"
                >
                  <Mail className="w-5 h-5 text-accent" />
                  <span>yyuanxie1101@gmail.com</span>
                </a>
                <a
                  href="tel:+17732007920"
                  className="flex items-center gap-2 px-6 py-3 rounded-lg bg-card border hover:bg-muted transition-colors"
                >
                  <Phone className="w-5 h-5 text-accent" />
                  <span>+1 (773) 200-7920</span>
                </a>
              </div>

              <a
                href="https://www.linkedin.com/in/yuanyuan-x-663145220"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-accent hover:underline mb-16"
              >
                <Linkedin className="w-5 h-5" />
                Connect on LinkedIn
                <ExternalLink className="w-4 h-4" />
              </a>
            </motion.div>
          </div>

          {/* Footer */}
          <div className="absolute bottom-6 text-center text-xs text-muted-foreground">
            © 2026 Yuanyuan Xie · Built with passion for data and design
          </div>
        </section>

      </div>
    </>
  );
}
