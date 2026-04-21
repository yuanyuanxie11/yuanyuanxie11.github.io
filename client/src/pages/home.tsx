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

// ─── Hero rotating badge ──────────────────────────────────────────────────────
const BADGE_ROLES = ["Data Scientist", "ML Engineer", "AI Architect"];

function RotatingBadge() {
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setRoleIndex((i) => (i + 1) % BADGE_ROLES.length), 2200);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary border border-border text-sm font-medium overflow-hidden">
      <Brain className="w-3.5 h-3.5 text-accent shrink-0" />
      <span className="relative inline-block h-5 overflow-hidden w-36">
        <AnimatePresence mode="wait">
          <motion.span
            key={roleIndex}
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            exit={{ y: "-100%", opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="absolute inset-0 flex items-center"
          >
            {BADGE_ROLES[roleIndex]}
          </motion.span>
        </AnimatePresence>
      </span>
    </div>
  );
}

// ─── Hero typing rotator ──────────────────────────────────────────────────────
const HERO_PHRASES = [
  "the magician who turns data into business clarity",
  "your bridge between data and real decisions",
  "turning complex data into decisions people can act on",
];

function TypingRotator() {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const current = HERO_PHRASES[phraseIndex];
    if (isPaused) {
      const t = setTimeout(() => { setIsPaused(false); setIsDeleting(true); }, 2000);
      return () => clearTimeout(t);
    }
    if (!isDeleting && displayed.length < current.length) {
      const t = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 55);
      return () => clearTimeout(t);
    }
    if (!isDeleting && displayed.length === current.length) {
      setIsPaused(true);
      return;
    }
    if (isDeleting && displayed.length > 0) {
      const t = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 28);
      return () => clearTimeout(t);
    }
    if (isDeleting && displayed.length === 0) {
      setIsDeleting(false);
      setPhraseIndex((phraseIndex + 1) % HERO_PHRASES.length);
    }
  }, [displayed, isDeleting, isPaused, phraseIndex]);

  return (
    <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed min-h-[3rem] md:min-h-[3.5rem]">
      <span className="whitespace-nowrap">
        I am{" "}
        <span className="text-foreground font-medium">{displayed}</span>
        <span className="inline-block w-[2px] h-5 md:h-6 bg-accent ml-0.5 animate-pulse align-middle rounded-full" />
      </span>
    </p>
  );
}

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
  category: "LLM" | "NLP" | "OCR" | "ML";
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
    category: "LLM",
    title: "Agentic RAG System",
    tagline: "Production AI — from manual PDF navigation to <10 second troubleshooting answers",
    headline: "80%+ Fortune 500",
    skills: ["LangGraph", "Neo4j GraphRAG", "Weaviate", "Gemini VLM", "Python", "Arize Phoenix"],
    story: {
      problem: "Zebra Technologies field technicians needed instant answers buried across 2,470+ pages of printer manuals. Manual PDF navigation cost minutes per query across a global workforce serving a $5B enterprise — customers include 80%+ of the Fortune 500 across 100+ countries.",
      approach: "Built a dual-pipeline agentic RAG combining knowledge graph traversal (GraphRAG, following Problem→Cause→Solution chains) with traditional vector search — so the AI reasons across connected concepts rather than just retrieving similar text. A vision language model handled the messy reality of multi-column PDF layouts, extracting structured data that standard parsers get wrong. An agentic orchestration layer dynamically routes each query to the right pipeline based on question type. Validated across 48 test queries per device using both automated metrics and domain expert review — because automated scoring alone turned out to miss the reasoning quality our graph-based approach actually delivered.",
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
    category: "NLP",
    title: "Job Platform NLP",
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
    category: "ML",
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
    category: "ML",
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
    category: "OCR",
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
    category: "ML",
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
    category: "ML",
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
    category: "LLM",
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
  "LLM": "bg-violet-100 text-violet-700 border-violet-200 dark:bg-violet-950/40 dark:text-violet-400 dark:border-violet-800/50",
  "NLP": "bg-sky-100 text-sky-700 border-sky-200 dark:bg-sky-950/40 dark:text-sky-400 dark:border-sky-800/50",
  "OCR": "bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-400 dark:border-amber-800/50",
  "ML":  "bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-800/50",
};

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

const ALL_CATEGORIES = ["All", "LLM", "NLP", "OCR", "ML"];

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


// ─── Experience card colors ───────────────────────────────────────────────────
const expCardColors = [
  { accent: "text-emerald-600 dark:text-emerald-400", bar: "bg-emerald-500", pill: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-800/50", top: "from-emerald-500/10 to-transparent" },
  { accent: "text-violet-600 dark:text-violet-400",   bar: "bg-violet-500",  pill: "bg-violet-50 text-violet-700 border-violet-200 dark:bg-violet-950/40 dark:text-violet-400 dark:border-violet-800/50",   top: "from-violet-500/10 to-transparent" },
  { accent: "text-sky-600 dark:text-sky-400",         bar: "bg-sky-500",     pill: "bg-sky-50 text-sky-700 border-sky-200 dark:bg-sky-950/40 dark:text-sky-400 dark:border-sky-800/50",         top: "from-sky-500/10 to-transparent" },
  { accent: "text-amber-600 dark:text-amber-400",     bar: "bg-amber-500",   pill: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-400 dark:border-amber-800/50",     top: "from-amber-500/10 to-transparent" },
];

function ExperienceCards({ onOpenStory }: { onOpenStory: (exp: StoryExperience) => void }) {
  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex-shrink-0 mb-6">
        <div className="flex items-center gap-3 mb-1">
          <Briefcase className="w-6 h-6 text-accent" />
          <h2 className="font-display text-3xl md:text-4xl font-bold">Experience</h2>
        </div>
        <p className="text-sm text-muted-foreground">Click any card to read the full story.</p>
      </div>

      {/* 2×2 card grid */}
      <div className="flex-1 min-h-0 overflow-y-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {experiences.map((exp, i) => {
            const c = expCardColors[i % expCardColors.length];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
              >
                <Card
                  className="relative overflow-hidden h-full flex flex-col cursor-pointer hover:shadow-lg hover:border-accent/40 transition-all duration-200 group"
                  onClick={() => onOpenStory(exp)}
                >
                  {/* Subtle top gradient accent */}
                  <div className={`absolute top-0 left-0 right-0 h-1 ${c.bar}`} />

                  <div className="p-5 flex flex-col flex-1 pt-6">
                    {/* Company + period */}
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="font-display font-bold text-lg leading-tight">{exp.company}</h3>
                      <span className="text-[10px] text-muted-foreground whitespace-nowrap shrink-0 mt-1 font-medium">
                        {exp.period.split("–")[0].trim()}
                      </span>
                    </div>

                    {/* Role + location */}
                    <p className={`text-xs font-semibold uppercase tracking-widest mb-1 ${c.accent}`}>{exp.title}</p>
                    <p className="text-xs text-muted-foreground mb-4">{exp.location}</p>

                    {/* Headline quote */}
                    <p className="text-sm text-foreground/80 leading-relaxed italic mb-4 flex-1">
                      "{exp.headline}"
                    </p>

                    {/* Impact stat */}
                    <div className="mb-4">
                      <span className={`text-2xl font-bold ${c.accent}`}>{exp.impactStat.value}</span>
                      <p className="text-xs text-muted-foreground leading-snug mt-0.5">{exp.impactStat.label}</p>
                    </div>

                    {/* Skill pills */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {exp.impactBadges.slice(0, 3).map((b, bi) => (
                        <span key={bi} className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${c.pill}`}>{b}</span>
                      ))}
                    </div>

                    {/* CTA */}
                    <div className="flex items-center gap-1 text-xs font-semibold text-accent group-hover:gap-2 transition-all">
                      Read the full story
                      <ChevronRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ─── Single-column project card ───────────────────────────────────────────────
function SingleProjectCard({ project, index, onOpen }: { project: Project; index: number; onOpen: () => void }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: Math.min(index * 0.05, 0.25) }}
    >
      <Card className="p-5 hover:border-accent/40 transition-all duration-200 group">
        {/* Row 1: Category badge + headline stat */}
        <div className="flex items-center justify-between gap-3 mb-3">
          <span className={`inline-block text-[10px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full border ${categoryColors[project.category] ?? "bg-muted text-muted-foreground border-border"}`}>
            {project.category}
          </span>
          <span className="text-sm font-bold text-accent shrink-0">{project.headline}</span>
        </div>

        {/* Title + tagline */}
        <h3 className="font-semibold text-base leading-snug mb-1">{project.title}</h3>
        <p className="text-sm text-muted-foreground mb-3 leading-relaxed">{project.tagline}</p>

        {/* 2 key metrics inline */}
        <div className="flex gap-3 mb-3">
          {project.story.results.slice(0, 2).map((r, i) => (
            <div key={i} className="bg-muted/60 rounded-lg px-3 py-1.5 text-center min-w-[80px]">
              <span className="text-sm font-bold leading-tight block">{r.value}</span>
              <span className="text-[9px] text-muted-foreground uppercase tracking-wide">{r.label}</span>
            </div>
          ))}
        </div>

        {/* Learn more toggle */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-1.5 text-xs font-medium text-accent hover:text-accent/80 transition-colors"
        >
          <motion.div animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration: 0.2 }}>
            <ChevronDown className="w-3.5 h-3.5" />
          </motion.div>
          {expanded ? "Show less" : "Learn more"}
        </button>

        {/* Expandable summary */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="mt-3 pt-3 border-t border-border/60">
                <p className="text-sm text-muted-foreground leading-relaxed mb-3">{project.story.problem}</p>
                <button
                  onClick={onOpen}
                  className="flex items-center gap-1 text-xs font-semibold text-accent hover:text-accent/80 transition-colors group"
                >
                  Full story
                  <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
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
        <motion.div layout className="grid grid-cols-1 gap-3 max-w-2xl mx-auto">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <SingleProjectCard
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
              <RotatingBadge />
            </motion.div>

            <motion.h1 variants={fadeInUp} className="font-display text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6">
              Yuanyuan Xie
            </motion.h1>

            <motion.div variants={fadeInUp}>
              <TypingRotator />
            </motion.div>

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
          <div className="max-w-3xl w-full">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-8">About Me</h2>
              <div className="space-y-4 text-muted-foreground">
                <p className="text-base leading-relaxed">
                  I am passionate about building intelligent systems that create real business and human impact. My work goes beyond developing models — I focus on delivering solutions that help people make faster, smarter, and more confident decisions, whether that means improving access to technical knowledge, uncovering patterns in large-scale data, or translating analytics into strategy.
                </p>
                <p className="text-base leading-relaxed">
                  My background in mathematics, economics, and machine learning allows me to combine strong technical depth with business judgment. I have experience building production RAG systems, designing scalable ETL pipelines, and developing evaluation frameworks to measure AI quality, reliability, and performance. I believe successful AI is not only about generation, but also about rigorous evaluation, continuous improvement, and ensuring outputs are trustworthy in real-world settings.
                </p>
                <p className="text-base leading-relaxed">
                  I also bring strong communication and leadership skills. I have experience presenting insights and recommendations to senior stakeholders — including C-suite leadership — translating complex technical findings into clear business decisions. I work effectively across technical and non-technical teams, align priorities, and help move projects from early ideas to successful execution. I am energized by solving meaningful problems, leading with curiosity, and turning advanced technology into measurable results.
                </p>
              </div>
              <div className="flex flex-wrap gap-2 mt-8">
                {["Agentic AI", "RAG Systems", "ML Engineering", "Cross-functional Leadership", "Evaluation Frameworks"].map((tag) => (
                  <span key={tag} className="px-3 py-1.5 bg-accent/10 border border-accent/20 text-accent rounded-full text-sm font-medium">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
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
          <div className="flex-1 min-h-0 max-w-5xl mx-auto w-full px-6 pt-20 pb-8 flex flex-col">
            <ExperienceCards onOpenStory={setSelectedExp} />
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
            <div className="flex-shrink-0 mb-8">
              <div className="flex items-center gap-3 mb-1.5">
                <Heart className="w-6 h-6 text-accent" />
                <h2 className="font-display text-3xl md:text-4xl font-bold">Beyond the Data</h2>
              </div>
              <p className="text-sm text-muted-foreground">
                The things that ground me, inspire me, and remind me there's a world outside the terminal.
              </p>
            </div>

            {/* Two-column layout */}
            <div className="flex-1 min-h-0 grid md:grid-cols-2 gap-8 overflow-hidden">

              {/* Left — personal narrative cards */}
              <div className="flex flex-col gap-5 overflow-y-auto">
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4 }}
                >
                  <Card className="p-5 border-violet-200 bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-950/30 dark:to-purple-950/20 dark:border-violet-800/40">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-2xl">🐾</span>
                      <h3 className="font-semibold text-violet-700 dark:text-violet-400">Dog Mom, First and Foremost</h3>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      My dog has attended every late-night debugging session — mostly asleep, but always present. She has an uncanny talent for demanding a walk at exactly the moment I'm most stuck on a problem. She's usually right. Best productivity reset I've found.
                    </p>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.12 }}
                >
                  <Card className="p-5 border-sky-200 bg-gradient-to-br from-sky-50 to-blue-50 dark:from-sky-950/30 dark:to-blue-950/20 dark:border-sky-800/40">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-2xl">🌏</span>
                      <h3 className="font-semibold text-sky-700 dark:text-sky-400">18 Months in Hong Kong</h3>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Living and working in Hong Kong rewired how I think about data. The same number tells completely different stories depending on who's reading it and what they've lived. Good data science requires cultural fluency — not just statistical fluency. I'm still learning both.
                    </p>
                  </Card>
                </motion.div>
              </div>

              {/* Right — dog photos */}
              <div className="grid grid-rows-2 gap-4 min-h-0 overflow-hidden">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                  className="rounded-2xl overflow-hidden shadow-lg"
                >
                  <img src={dogPhoto1} alt="My dog" className="w-full h-full object-cover" />
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                  className="rounded-2xl overflow-hidden shadow-lg"
                >
                  <img src={dogPhoto2} alt="My happy companion" className="w-full h-full object-cover" />
                </motion.div>
              </div>

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
