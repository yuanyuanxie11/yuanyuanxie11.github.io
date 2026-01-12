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
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import heroBackground from "@assets/generated_images/abstract_data_mesh_hero_background.png";
import profilePhoto from "@assets/9271de4dedc83313cad8f76c8b278f98_1768159283863.JPG";
import dogPhoto1 from "@assets/d647bccb827b7f34d9a33ef52a095576_1768160415110.JPG";
import dogPhoto2 from "@assets/Screenshot_2026-01-11_at_13.36.02_1768160425298.png";

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

const experiences = [
  {
    title: "Data Scientist",
    company: "Zebra Technologies",
    location: "Chicago, IL",
    period: "September 2025 – Present",
    type: "Industry Practicum with Northwestern",
    narrative: "Leading the development of an enterprise-grade AI troubleshooting system that transforms how field technicians diagnose device issues. I architected a hybrid RAG system that seamlessly blends vector search with knowledge graph retrieval, enabling natural language queries to surface precise, context-aware solutions.",
    impact: ["Enterprise AI Systems", "RAG Architecture", "MLOps at Scale"],
    highlight: "Built end-to-end evaluation pipelines measuring retrieval quality and response reliability across thousands of real-world queries.",
    skills: ["Python", "LangGraph", "Neo4j", "Gemini", "Google Cloud", "Phoenix", "RAG", "Vector Search", "MLOps"]
  },
  {
    title: "Research Assistant",
    company: "City University of Hong Kong",
    location: "Hong Kong SAR",
    period: "February 2024 – July 2025",
    type: "Department of Management",
    narrative: "Explored the intersection of behavioral science and data engineering across multiple research initiatives. Built automated ETL pipelines using Python and Selenium that processed 200,000+ records for causal inference studies with Stata. Designed eye-tracking experiments and integrated Google Analytics with behavioral data, applying latent-variable modeling in R to reveal how trust signals influence decision-making.",
    impact: ["Behavioral Analytics", "Causal Inference", "NLP Research"],
    highlight: "Pioneered novel approaches to analyzing job market dynamics through language pattern recognition.",
    skills: ["Python", "Selenium", "Stata", "R", "Google Analytics", "2SLS", "Factor Analysis", "SEM", "JavaScript", "NLP"]
  },
  {
    title: "Research Assistant",
    company: "Emory University",
    location: "Atlanta, GA",
    period: "January 2023 – January 2024",
    type: "Department of Economics",
    narrative: "Contributed to a large-scale historical digitization project that required solving complex document intelligence challenges. Developed AI-powered systems that could parse decades-old financial manuals with precision, transforming unstructured archives into searchable, analyzable datasets.",
    impact: ["Document AI", "Historical Data Mining", "Quality Systems"],
    highlight: "Achieved 40% improvement in parsing accuracy through systematic A/B testing of competing AI approaches.",
    skills: ["AWS SageMaker", "Amazon Textract", "Google Document AI", "K-Means", "Tableau", "Naïve Bayes", "A/B Testing"]
  },
  {
    title: "Marketing Analyst Intern",
    company: "Intellipro Group",
    location: "Santa Clara, CA",
    period: "September 2022 – December 2022",
    narrative: "Delivered actionable market intelligence through end-to-end analytics. Designed MySQL database architectures and ERD schemas that cut query times by 50%. Built sentiment classification models using Random Forest, SVM, and Logistic Regression to decode regional market perceptions across Latin America's IT sector.",
    impact: ["Market Intelligence", "Predictive Analytics", "Database Design"],
    highlight: "Forecasted sales trends with 89% accuracy, directly informing international expansion strategy.",
    skills: ["MySQL", "ERD Design", "Random Forest", "SVM", "Logistic Regression", "R", "ARMA", "SARIMA", "Time Series"]
  }
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

function ExperienceCard({ exp, index }: { exp: typeof experiences[0]; index: number }) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card 
        className="p-6 md:p-8 hover:shadow-lg transition-all duration-300 cursor-pointer group"
        onClick={() => setIsExpanded(!isExpanded)}
        data-testid={`card-experience-${index}`}
      >
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-5">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-xl font-semibold">{exp.title}</h3>
              <motion.div
                animate={{ rotate: isExpanded ? 90 : 0 }}
                transition={{ duration: 0.2 }}
                className="text-muted-foreground"
              >
                <ChevronRight className="w-5 h-5" />
              </motion.div>
            </div>
            <p className="text-accent font-medium">{exp.company}</p>
            {exp.type && (
              <p className="text-sm text-muted-foreground">{exp.type}</p>
            )}
          </div>
          <div className="text-sm text-muted-foreground md:text-right">
            <p>{exp.period}</p>
            <p>{exp.location}</p>
          </div>
        </div>
        
        <p className="text-muted-foreground leading-relaxed mb-5">
          {exp.narrative}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {exp.impact.map((theme, tIndex) => (
            <Badge key={tIndex} variant="outline" className="text-xs font-medium">
              {theme}
            </Badge>
          ))}
        </div>
        
        <p className="text-sm text-foreground/80 italic border-l-2 border-accent pl-4 mb-4">
          {exp.highlight}
        </p>
        
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="pt-4 border-t border-border">
                <p className="text-sm font-medium text-foreground mb-3">Technologies & Skills Used</p>
                <div className="flex flex-wrap gap-2">
                  {exp.skills.map((skill, sIndex) => (
                    <motion.div
                      key={sIndex}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: sIndex * 0.03 }}
                    >
                      <Badge variant="secondary" className="text-xs bg-accent/10 text-accent border-accent/20">
                        {skill}
                      </Badge>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        <div className="flex items-center gap-1 text-xs text-muted-foreground mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
          <span>{isExpanded ? "Click to collapse" : "Click to see technologies"}</span>
        </div>
      </Card>
    </motion.div>
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
              <a href="#impact" className="text-sm text-muted-foreground hover:text-foreground transition-colors" data-testid="nav-impact">Impact</a>
              <a href="#contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors" data-testid="nav-contact">Contact</a>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden grain">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url(${heroBackground})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
        
        <motion.div 
          initial="initial"
          animate="animate"
          variants={stagger}
          className="relative z-10 max-w-4xl mx-auto px-6 text-center"
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
            <span className="text-foreground font-medium"> Cloud Infrastructure</span>
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
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
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
            <p className="text-muted-foreground mb-12">Click on each role to explore the technologies used</p>
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

      {/* Publications Section */}
      <section id="publications" className="py-24 px-6">
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
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-12">
              <Heart className="w-6 h-6 text-accent" />
              <h2 className="font-display text-3xl md:text-4xl font-bold" data-testid="section-personal">
                Beyond the Data
              </h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  When I'm not working with data and models, I enjoy the grounding rhythm of everyday routines, including sharing meals, spending time with my dog, and appreciating small moments of joy. I also enjoy staying active through tennis and other sports, unwinding with music, traveling, and finding perspective through reading. These routines help me recharge and bring focus and clarity back into my work.
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="rounded-xl overflow-hidden shadow-lg"
                >
                  <img 
                    src={dogPhoto1} 
                    alt="Sunset walk with my dog" 
                    className="w-full h-48 object-cover"
                    data-testid="img-dog-1"
                  />
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="rounded-xl overflow-hidden shadow-lg"
                >
                  <img 
                    src={dogPhoto2} 
                    alt="My happy companion" 
                    className="w-full h-48 object-cover"
                    data-testid="img-dog-2"
                  />
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

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
