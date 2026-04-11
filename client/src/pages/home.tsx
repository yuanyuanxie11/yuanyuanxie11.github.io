import { useState } from "react";
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
  ChevronUp,
  Layers,
  Github,
  FileText,
  TrendingUp,
  Lightbulb,
  Microscope
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

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

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
  category: string;
  title: string;
  tagline: string;
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
  {
    id: "instacart",
    category: "ML Pipeline",
    title: "Instacart Market Basket Analysis",
    tagline: "Predicting grocery reorders across 3M+ transactions with tuned ensemble ML",
    skills: ["Python", "XGBoost", "LightGBM", "Scikit-learn", "Hyperopt", "SHAP", "Feature Engineering"],
    story: {
      problem: "Instacart handles millions of grocery orders but predicting which previously purchased items a user will reorder is genuinely hard — the data is sparse, highly skewed, and user behavior varies wildly. Getting this right has direct impact on personalized cart pre-population.",
      approach: "We engineered 9 behavioral features from 3M+ historical transactions capturing user habits, product popularity, and temporal patterns. We then ran a systematic model horse-race — Logistic Regression through LightGBM — using Bayesian hyperparameter search (Hyperopt) with PR-AUC as our north star metric given the class imbalance.",
      results: [
        { label: "PR-AUC", value: "0.796" },
        { label: "ROC-AUC", value: "0.729" },
        { label: "F1 Score", value: "0.764" },
        { label: "Transactions", value: "3M+" },
      ],
    },
    links: [
      { label: "Read the Paper", url: "/MLDS_420_Final_Project.pdf", icon: "pdf" },
    ],
  },
  {
    id: "mbta",
    category: "Analytics",
    title: "Boston MBTA Transit Analytics Dashboard",
    tagline: "Geospatial delay analysis across Boston’s entire transit network",
    image: mbtaMapImage,
    skills: ["Python", "Pandas", "Folium", "Geospatial Analytics", "Data Visualization"],
    story: {
      problem: "Boston’s MBTA network generates enormous amounts of trip timing data, but there was no easy way to understand which stations had the worst delay patterns — or how delay distributions differed between peak and off-peak hours.",
      approach: "Built an interactive Folium-based geospatial dashboard that maps every MBTA stop by route. Clicking any station surfaces its full delay distribution — average, median, and 95th-percentile — alongside observed trip volume, making systemic delay patterns immediately visible.",
      results: [
        { label: "Trips Analyzed", value: "229" },
        { label: "Delay Percentiles", value: "p50/p95" },
        { label: "Routes Mapped", value: "Full MBTA" },
        { label: "Interaction Type", value: "Click-through" },
      ],
    },
  },
  {
    id: "rag-chunking",
    category: "NLP / LLM",
    title: "Document Chunking Strategies for RAG",
    tagline: "How you split text determines how well your AI answers questions",
    image: moodysManualsImage,
    skills: ["Python", "LangChain", "RAG", "NLP", "Document Intelligence", "Vector Search"],
    story: {
      problem: "RAG systems are only as good as what they retrieve. But most teams treat chunking as an afterthought — yet chunk size, overlap, and boundary strategy have a massive effect on retrieval quality and how well responses are grounded in source documents.",
      approach: "Systematically investigated four chunking strategies — fixed-size, sliding window, structure-aware (headings/paragraphs), and semantic — across a corpus of dense technical documents. Measured retrieval relevance, grounding fidelity, and answer quality for each approach.",
      results: [
        { label: "Strategies Tested", value: "4+" },
        { label: "Corpus Type", value: "Technical Docs" },
        { label: "Eval Metric", value: "Retrieval + Grounding" },
        { label: "Framework", value: "LangChain" },
      ],
    },
  },
  {
    id: "titanic",
    category: "ML Pipeline",
    title: "Titanic Survival Prediction",
    tagline: "End-to-end ML pipeline with feature engineering and model interpretability",
    skills: ["Python", "XGBoost", "Scikit-learn", "Feature Engineering", "SHAP", "Model Evaluation"],
    story: {
      problem: "The Titanic dataset is deceptively tricky: high correlation between features, missing values in key columns, and a target that blends luck with class and demographics. Getting high accuracy is easy; building a model that genuinely generalizes is harder.",
      approach: "Built a rigorous end-to-end pipeline: systematic missing value imputation, creative feature engineering (family size, title extraction from names, cabin deck), stratified k-fold cross-validation to prevent data leakage, XGBoost training with Bayesian hyperparameter tuning, and SHAP values for interpretability.",
      results: [
        { label: "Validation Strategy", value: "Stratified K-Fold" },
        { label: "Interpretability", value: "SHAP Values" },
        { label: "Tuning Method", value: "Bayesian Search" },
        { label: "Features Engineered", value: "10+" },
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
  "ML Pipeline":   "bg-violet-100 text-violet-700 border-violet-200",
  "Rec Systems":   "bg-rose-100 text-rose-700 border-rose-200",
  "Analytics":     "bg-sky-100 text-sky-700 border-sky-200",
  "NLP / LLM":     "bg-emerald-100 text-emerald-700 border-emerald-200",
};

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const linkIcon = (icon: string) => {
    if (icon === "github") return <Github className="w-3.5 h-3.5" />;
    if (icon === "pdf")    return <FileText className="w-3.5 h-3.5" />;
    return <ExternalLink className="w-3.5 h-3.5" />;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: index * 0.08 }}
      layout
    >
      <Card
        className={`overflow-hidden transition-all duration-300 hover:shadow-xl ${isExpanded ? "shadow-lg ring-1 ring-accent/20" : "hover:shadow-md"}`}
      >
        {/* Project image */}
        {project.image && (
          <div className="relative h-52 overflow-hidden bg-muted">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/70 to-transparent" />
          </div>
        )}

        {/* Card header — always visible */}
        <div className="p-6 md:p-8">
          <div className="flex items-start justify-between gap-4 mb-3">
            <div className="flex-1">
              <span className={`inline-block text-xs font-semibold px-2.5 py-0.5 rounded-full border mb-2 ${categoryColors[project.category] ?? "bg-muted text-muted-foreground border-border"}`}>
                {project.category}
              </span>
              <h3 className="text-xl font-semibold leading-snug">{project.title}</h3>
              <p className="text-sm text-muted-foreground mt-1">{project.tagline}</p>
            </div>
          </div>

          {/* Tech tags */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.skills.map((skill, i) => (
              <Badge key={i} variant="secondary" className="text-xs bg-accent/10 text-accent border-accent/20">
                {skill}
              </Badge>
            ))}
          </div>

          {/* Metric pills (compact preview) */}
          {!isExpanded && (
            <div className="flex flex-wrap gap-3 mb-4">
              {project.story.results.slice(0, 3).map((r, i) => (
                <div key={i} className="flex flex-col items-center bg-muted/60 rounded-lg px-3 py-1.5 min-w-[70px]">
                  <span className="text-base font-bold text-foreground">{r.value}</span>
                  <span className="text-[10px] text-muted-foreground uppercase tracking-wide">{r.label}</span>
                </div>
              ))}
            </div>
          )}

          {/* Expand / collapse toggle */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-1.5 text-sm text-accent hover:text-accent/80 font-medium transition-colors group"
          >
            {isExpanded ? (
              <>
                <ChevronUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
                Hide case study
              </>
            ) : (
              <>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                Read the story
              </>
            )}
          </button>
        </div>

        {/* Expandable case study */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="px-6 md:px-8 pb-8 border-t border-border pt-6 space-y-6">

                {/* Problem */}
                <div className="flex gap-3">
                  <div className="shrink-0 mt-0.5 p-1.5 rounded-lg bg-rose-50 text-rose-500">
                    <Lightbulb className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1">The Problem</p>
                    <p className="text-sm text-foreground/80 leading-relaxed">{project.story.problem}</p>
                  </div>
                </div>

                {/* Approach */}
                <div className="flex gap-3">
                  <div className="shrink-0 mt-0.5 p-1.5 rounded-lg bg-violet-50 text-violet-500">
                    <Microscope className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1">The Approach</p>
                    <p className="text-sm text-foreground/80 leading-relaxed">{project.story.approach}</p>
                  </div>
                </div>

                {/* Results */}
                <div className="flex gap-3">
                  <div className="shrink-0 mt-0.5 p-1.5 rounded-lg bg-emerald-50 text-emerald-500">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">Key Results</p>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {project.story.results.map((r, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: i * 0.07 }}
                          className="flex flex-col items-center bg-muted/50 rounded-xl px-3 py-3 border border-border/60"
                        >
                          <span className="text-xl font-bold text-foreground">{r.value}</span>
                          <span className="text-[10px] text-muted-foreground uppercase tracking-wide text-center mt-0.5">{r.label}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Links */}
                {project.links && project.links.length > 0 && (
                  <div className="flex flex-wrap gap-3 pt-2">
                    {project.links.map((link, i) => (
                      <a
                        key={i}
                        href={link.url}
                        target={link.icon === "pdf" ? "_blank" : "_blank"}
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
          )}
        </AnimatePresence>
      </Card>
    </motion.div>
  );
}

function ExperienceChart({ chart }: { chart: NonNullable<StoryExperience["chart"]> }) {
  const ChartComponent = chart.type === "line" ? LineChart : BarChart;
  return (
    <div className="mt-6 p-4 rounded-xl bg-muted/40 border border-border/60">
      <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1">{chart.title}</p>
      <p className="text-xs text-muted-foreground italic mb-4">{chart.insight}</p>
      <ResponsiveContainer width="100%" height={200}>
        <ChartComponent data={chart.data} margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis dataKey={chart.xKey} tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} />
          <YAxis tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "8px",
              fontSize: 12,
            }}
          />
          <Legend wrapperStyle={{ fontSize: 12 }} />
          {chart.series.map((s) =>
            chart.type === "line" ? (
              <Line key={s.key} type="monotone" dataKey={s.key} stroke={s.color} name={s.label} strokeWidth={2} dot={{ r: 4 }} />
            ) : (
              <Bar key={s.key} dataKey={s.key} fill={s.color} name={s.label} radius={[4, 4, 0, 0]} />
            )
          )}
        </ChartComponent>
      </ResponsiveContainer>
    </div>
  );
}

function ExperienceCard({ exp, index }: { exp: StoryExperience; index: number }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card className="overflow-hidden hover:shadow-xl transition-all duration-300" data-testid={`card-experience-${index}`}>
        {/* Header */}
        <div className="p-6 md:p-8 pb-0">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-1 mb-4">
            <div>
              <h3 className="text-lg font-semibold">{exp.title}</h3>
              <p className="text-accent font-medium">{exp.company}</p>
              {exp.type && <p className="text-xs text-muted-foreground mt-0.5">{exp.type}</p>}
            </div>
            <div className="text-sm text-muted-foreground md:text-right shrink-0">
              <p>{exp.period}</p>
              <p>{exp.location}</p>
            </div>
          </div>

          {/* Headline — the business story hook */}
          <p className="text-xl md:text-2xl font-display font-semibold leading-snug text-foreground mb-5">
            "{exp.headline}"
          </p>

          {/* Impact stat — prominent */}
          <div className="inline-flex items-center gap-3 bg-accent/10 border border-accent/20 rounded-xl px-4 py-3 mb-5">
            <span className="text-2xl font-bold text-accent">{exp.impactStat.value}</span>
            <span className="text-sm text-muted-foreground leading-tight max-w-[180px]">{exp.impactStat.label}</span>
          </div>

          {/* Theme badges */}
          <div className="flex flex-wrap gap-1.5 mb-5">
            {exp.impactBadges.map((b, i) => (
              <Badge key={i} variant="outline" className="text-xs">{b}</Badge>
            ))}
          </div>
        </div>

        {/* Expand toggle */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full flex items-center justify-between px-6 md:px-8 py-3 border-t border-border/60 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/30 transition-colors group"
        >
          <span>{isExpanded ? "Hide the full story" : "Read the full story →"}</span>
          <motion.div animate={{ rotate: isExpanded ? 180 : 0 }} transition={{ duration: 0.25 }}>
            <ChevronDown className="w-4 h-4" />
          </motion.div>
        </button>

        {/* Expandable story */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="px-6 md:px-8 pb-8 space-y-5">

                {/* Situation */}
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1.5">The Situation</p>
                  <p className="text-sm text-foreground/80 leading-relaxed">{exp.situation}</p>
                </div>

                {/* Discovery */}
                <div className="border-l-2 border-accent pl-4">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1.5">The Discovery</p>
                  <p className="text-sm text-foreground/80 leading-relaxed">{exp.discovery}</p>
                </div>

                {/* Chart */}
                {exp.chart && <ExperienceChart chart={exp.chart} />}

                {/* Challenge */}
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1.5">What Made It Hard</p>
                  <p className="text-sm text-foreground/80 leading-relaxed">{exp.challenge}</p>
                </div>

                {/* Tools */}
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2">Tools That Made It Possible</p>
                  <div className="flex flex-wrap gap-2">
                    {exp.tools.map((tool, i) => (
                      <motion.span
                        key={i}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.04 }}
                        className="text-xs bg-muted px-3 py-1.5 rounded-full border border-border text-foreground/70"
                      >
                        {tool}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>
    </motion.div>
  );
}

// ─── Fun-fact flip cards ──────────────────────────────────────────────────────

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

function FlipCard({ fact, index }: { fact: typeof funFacts[0]; index: number }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="h-52 cursor-pointer"
      style={{ perspective: 1000 }}
      onClick={() => setFlipped(!flipped)}
    >
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
        style={{ transformStyle: "preserve-3d", position: "relative", width: "100%", height: "100%" }}
      >
        {/* Front */}
        <div
          className={`absolute inset-0 rounded-2xl border bg-gradient-to-br ${fact.color} p-5 flex flex-col justify-between`}
          style={{ backfaceVisibility: "hidden" }}
        >
          <span className="text-4xl">{fact.emoji}</span>
          <div>
            <p className={`text-xs font-bold uppercase tracking-widest mb-1 ${fact.textColor}`}>{fact.category}</p>
            <p className="text-sm font-semibold text-foreground leading-snug">{fact.front}</p>
          </div>
          <p className="text-[10px] text-muted-foreground">Click to flip ↗</p>
        </div>

        {/* Back */}
        <div
          className="absolute inset-0 rounded-2xl border bg-foreground p-5 flex flex-col justify-between"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <span className="text-2xl">{fact.emoji}</span>
          <p className="text-sm text-background/90 leading-relaxed">{fact.back}</p>
          <p className="text-[10px] text-background/40">Click to flip back</p>
        </div>
      </motion.div>
    </motion.div>
  );
}

function BeyondTheDataSection() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <Heart className="w-6 h-6 text-accent" />
            <h2 className="font-display text-3xl md:text-4xl font-bold" data-testid="section-personal">
              Beyond the Data
            </h2>
          </div>
          <p className="text-muted-foreground mb-10">
            The things that keep me curious, grounded, and occasionally humbled. <span className="font-medium text-foreground">Flip each card.</span>
          </p>
        </motion.div>

        {/* Flip cards grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-14">
          {funFacts.map((fact, i) => (
            <FlipCard key={i} fact={fact} index={i} />
          ))}
        </div>

        {/* Dog photos */}
        <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto md:max-w-none md:flex md:justify-center md:gap-6">
          <motion.div whileHover={{ scale: 1.03 }} className="rounded-2xl overflow-hidden shadow-lg">
            <img src={dogPhoto1} alt="Sunset walk with my dog" className="w-full h-48 md:h-56 object-cover" data-testid="img-dog-1" />
          </motion.div>
          <motion.div whileHover={{ scale: 1.03 }} className="rounded-2xl overflow-hidden shadow-lg">
            <img src={dogPhoto2} alt="My happy companion" className="w-full h-48 md:h-56 object-cover" data-testid="img-dog-2" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

const ALL_CATEGORIES = ["All", "ML Pipeline", "Rec Systems", "Analytics", "NLP / LLM"];

function ProjectsSection() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = activeCategory === "All"
    ? projects
    : projects.filter((p) => p.category === activeCategory);

  return (
    <section id="projects" className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <Layers className="w-6 h-6 text-accent" />
            <h2 className="font-display text-3xl md:text-4xl font-bold" data-testid="section-projects">
              Projects
            </h2>
          </div>
          <p className="text-muted-foreground mb-8">
            Click <span className="font-medium text-foreground">"Read the story"</span> on any project to see the problem, approach, and results.
          </p>

          {/* Category filter pills */}
          <div className="flex flex-wrap gap-2 mb-10">
            {ALL_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all duration-200 ${
                  activeCategory === cat
                    ? "bg-accent text-accent-foreground border-accent shadow-sm"
                    : "bg-background text-muted-foreground border-border hover:border-accent/50 hover:text-foreground"
                }`}
              >
                {cat}
                {cat !== "All" && (
                  <span className="ml-1.5 text-xs opacity-60">
                    {projects.filter((p) => p.category === cat).length}
                  </span>
                )}
              </button>
            ))}
          </div>
        </motion.div>

        <motion.div layout className="grid md:grid-cols-2 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <motion.nav 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/50"
      >
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <span className="font-display text-xl font-semibold tracking-tight" data-testid="nav-logo">
              Yuanyuan Xie
            </span>
            <div className="hidden md:flex items-center gap-8">
              <a href="#about" className="text-sm text-muted-foreground hover:text-foreground transition-colors" data-testid="nav-about">About</a>
              <a href="#experience" className="text-sm text-muted-foreground hover:text-foreground transition-colors" data-testid="nav-experience">Experience</a>
              <a href="#skills" className="text-sm text-muted-foreground hover:text-foreground transition-colors" data-testid="nav-skills">Skills</a>
              <a href="#education" className="text-sm text-muted-foreground hover:text-foreground transition-colors" data-testid="nav-education">Education</a>
              <a href="#projects" className="text-sm text-muted-foreground hover:text-foreground transition-colors" data-testid="nav-projects">Projects</a>
              <a href="#impact" className="text-sm text-muted-foreground hover:text-foreground transition-colors" data-testid="nav-impact">Impact</a>
              <a href="#contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors" data-testid="nav-contact">Contact</a>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden grain">
        {/* 3-D neural mesh — live WebGL canvas */}
        <HeroCanvas />
        {/* Gradient vignette so text stays readable */}
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
                <img 
                  src={profilePhoto} 
                  alt="Yuanyuan Xie" 
                  className="w-full h-full object-cover"
                  data-testid="img-profile"
                />
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
          
          <motion.h1 
            variants={fadeInUp}
            className="font-display text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6"
            data-testid="hero-title"
          >
            Yuanyuan Xie
          </motion.h1>
          
          <motion.p 
            variants={fadeInUp}
            className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed"
            data-testid="hero-description"
          >
            Building intelligent systems at the intersection of 
            <span className="text-foreground font-medium"> Machine Learning</span>,
            <span className="text-foreground font-medium"> NLP</span>, and
            <span className="text-foreground font-medium"> Data-Driven Decision Making</span>
          </motion.p>
          
          <motion.div 
            variants={fadeInUp}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button size="lg" className="gap-2 px-8" data-testid="button-contact">
              <Mail className="w-4 h-4" />
              Get in Touch
            </Button>
          </motion.div>
          
          <motion.div 
            variants={fadeInUp}
            className="flex items-center justify-center gap-6 mt-8 text-sm text-muted-foreground"
          >
            <span className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              Evanston, IL
            </span>
            <span className="flex items-center gap-2">
              <GraduationCap className="w-4 h-4" />
              Northwestern University
            </span>
          </motion.div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[3]"
        >
          <a href="#about" className="text-muted-foreground hover:text-foreground transition-colors">
            <ChevronDown className="w-6 h-6 animate-bounce" />
          </a>
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-8" data-testid="section-about">
              About Me
            </h2>
            <div className="prose prose-lg max-w-none text-muted-foreground">
              <p className="text-lg leading-relaxed mb-4">
                I'm a Data Scientist and Machine Learning Engineer currently pursuing my Master's degree in Machine Learning and Data Science at Northwestern University. With a strong foundation in Applied Mathematics and Economics from Emory University, I bridge the gap between theoretical rigor and practical implementation.
              </p>
              <p className="text-lg leading-relaxed">
                My expertise spans building production-ready RAG systems, developing ETL pipelines at scale, and deploying machine learning models on cloud infrastructure. I'm passionate about leveraging AI to solve complex real-world problems, from enterprise troubleshooting systems to behavioral analytics research.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-24 px-6 bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <Briefcase className="w-6 h-6 text-accent" />
              <h2 className="font-display text-3xl md:text-4xl font-bold" data-testid="section-experience">
                Experience
              </h2>
            </div>
            <p className="text-muted-foreground mb-12">Stories from the work — written for curious humans, not just technical ones. Click any card to read the full story.</p>
          </motion.div>
          
          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <ExperienceCard key={index} exp={exp} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-12">
              <Code2 className="w-6 h-6 text-accent" />
              <h2 className="font-display text-3xl md:text-4xl font-bold" data-testid="section-skills">
                Technical Skills
              </h2>
            </div>
          </motion.div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {Object.entries(skills).map(([category, items], index) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="p-6 h-full hover:shadow-lg transition-shadow" data-testid={`card-skill-${index}`}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-lg bg-accent/10 text-accent">
                      {skillIcons[category]}
                    </div>
                    <h3 className="font-semibold">{category}</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {items.map((skill, sIndex) => (
                      <Badge key={sIndex} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-24 px-6 bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-12">
              <GraduationCap className="w-6 h-6 text-accent" />
              <h2 className="font-display text-3xl md:text-4xl font-bold" data-testid="section-education">
                Education
              </h2>
            </div>
          </motion.div>
          
          <div className="space-y-6">
            {education.map((edu, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="p-6 md:p-8 hover:shadow-lg transition-shadow" data-testid={`card-education-${index}`}>
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2">
                    <div>
                      <h3 className="text-xl font-semibold">{edu.degree}</h3>
                      <p className="text-accent font-medium">{edu.school}</p>
                      {edu.focus && (
                        <p className="text-sm text-muted-foreground mt-1">{edu.focus}</p>
                      )}
                    </div>
                    <div className="text-sm text-muted-foreground md:text-right">
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

      {/* Project Highlights Section */}
      <ProjectsSection />

      {/* Publications Section */}
      <section id="publications" className="py-24 px-6 bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-12">
              <BookOpen className="w-6 h-6 text-accent" />
              <h2 className="font-display text-3xl md:text-4xl font-bold" data-testid="section-publications">
                Publications & Presentations
              </h2>
            </div>
          </motion.div>
          
          <div className="space-y-6">
            {publications.map((pub, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="p-6 md:p-8 hover:shadow-lg transition-shadow" data-testid={`card-publication-${index}`}>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <Badge variant="outline" className="mb-3 text-xs">
                        {pub.type}
                      </Badge>
                      <h3 className="text-lg font-semibold mb-2">{pub.title}</h3>
                      <p className="text-muted-foreground text-sm">
                        {pub.venue}{pub.location && `, ${pub.location}`} • {pub.date}
                      </p>
                      {pub.doi && (
                        <a 
                          href={`https://doi.org/${pub.doi}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-sm text-accent hover:underline mt-2"
                          data-testid={`link-publication-${index}`}
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
        </div>
      </section>

      {/* Service & Social Impact Section */}
      <section id="impact" className="py-24 px-6 bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-12">
              <Users className="w-6 h-6 text-accent" />
              <h2 className="font-display text-3xl md:text-4xl font-bold" data-testid="section-impact">
                Service & Social Impact
              </h2>
            </div>
            
            <Card className="p-6 md:p-8 hover:shadow-lg transition-shadow" data-testid="card-social-impact">
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                Beyond my technical work, I collaborate with nonprofit leaders on data-driven initiatives focused on gender equity and social impact. I have worked with the CEO of a leading nonprofit organization on analytics to support gender equity efforts and volunteer with women-led organizations, contributing to initiatives in mentorship, leadership, and cross-regional collaboration.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                I also support community-driven fundraising and relief efforts in Hong Kong, believing that technology and data can be powerful tools for positive social change.
              </p>
              
              <div className="flex flex-wrap gap-2 mt-6">
                <Badge variant="secondary">Gender Equity</Badge>
                <Badge variant="secondary">Women in Leadership</Badge>
                <Badge variant="secondary">Community Fundraising</Badge>
                <Badge variant="secondary">Cross-Regional Collaboration</Badge>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Personal Section - Beyond the Data */}
      <BeyondTheDataSection />

      {/* Contact Section */}
      <section id="contact" className="py-24 px-6 bg-muted/30">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4" data-testid="section-contact">
              Let's Connect
            </h2>
            <p className="text-lg text-muted-foreground mb-12 max-w-xl mx-auto">
              I'm currently seeking opportunities in Data Science and Machine Learning. 
              Feel free to reach out to discuss potential collaborations.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <a 
                href="mailto:yyuanxie1101@gmail.com"
                className="flex items-center gap-2 px-6 py-3 rounded-lg bg-card border hover:bg-muted transition-colors"
                data-testid="link-email"
              >
                <Mail className="w-5 h-5 text-accent" />
                <span>yyuanxie1101@gmail.com</span>
              </a>
              <a 
                href="tel:+17732007920"
                className="flex items-center gap-2 px-6 py-3 rounded-lg bg-card border hover:bg-muted transition-colors"
                data-testid="link-phone"
              >
                <Phone className="w-5 h-5 text-accent" />
                <span>+1 (773) 200-7920</span>
              </a>
            </div>
            
            <a 
              href="https://www.linkedin.com/in/yuanyuan-x-663145220"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-accent hover:underline"
              data-testid="link-linkedin"
            >
              <Linkedin className="w-5 h-5" />
              Connect on LinkedIn
              <ExternalLink className="w-4 h-4" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t">
        <div className="max-w-4xl mx-auto text-center text-sm text-muted-foreground">
          <p>© 2026 Yuanyuan Xie. Built with passion for data and design.</p>
        </div>
      </footer>
    </div>
  );
}
