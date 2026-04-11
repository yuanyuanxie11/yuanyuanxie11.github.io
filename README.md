# Yuanyuan Xie — Personal Portfolio

[![Live Site](https://img.shields.io/badge/Live-yuanyuanxie11.github.io-blue?style=flat-square&logo=github)](https://yuanyuanxie11.github.io)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1-06B6D4?style=flat-square&logo=tailwindcss)](https://tailwindcss.com)

A personal portfolio website for Yuanyuan Xie — Data Scientist & ML Engineer at Northwestern University. Built with a modern full-stack setup, featuring interactive project case studies, animated UI, and a forthcoming AI chatbot.

**Live:** [yuanyuanxie11.github.io](https://yuanyuanxie11.github.io)

---

## Features

- **Interactive project case studies** — click any project card to expand a full narrative (problem → approach → key results with metrics)
- **Category-filtered project grid** — browse by ML Pipeline, Recommendation Systems, Analytics, or NLP/LLM
- **Animated experience timeline** — expandable role cards with technology stacks
- **Smooth animations** throughout, powered by Framer Motion
- **Responsive design** — mobile-first layout with Tailwind CSS
- **PDF paper hosting** — coursework research papers served directly from the site
- **Full-stack ready** — Express backend with PostgreSQL/Drizzle ORM for future features (chatbot, contact form)

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 19, TypeScript |
| Build tool | Vite 7 |
| Styling | Tailwind CSS 4, shadcn/ui |
| Animation | Framer Motion |
| Backend | Express.js, Node.js |
| Database | PostgreSQL + Drizzle ORM |
| Routing | Wouter |
| Icons | Lucide React |
| Hosting | GitHub Pages (frontend) |

---

## Project Structure

```
.
├── client/                 # React frontend
│   ├── src/
│   │   ├── pages/
│   │   │   └── home.tsx    # Main portfolio page (all sections)
│   │   ├── components/ui/  # shadcn/ui component library
│   │   ├── hooks/          # Custom React hooks
│   │   └── lib/            # Utilities
│   └── public/             # Static assets (PDFs, etc.)
├── server/                 # Express backend
│   ├── index.ts            # App entry point
│   ├── routes.ts           # API routes
│   └── storage.ts          # Data layer (Drizzle ORM)
├── shared/                 # Shared types & schemas
│   └── schema.ts           # Drizzle DB schema + Zod validation
├── attached_assets/        # Images and media assets
└── vite.config.ts          # Vite configuration
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/yuanyuanxie11/yuanyuanxie11.github.io.git
cd yuanyuanxie11.github.io

# Install dependencies
npm install
```

### Development

```bash
# Start the development server (frontend + backend)
npm run dev
```

The app will be available at `http://localhost:5000`.

### Build for Production

```bash
npm run build
```

Output is generated in `dist/public/` for static hosting.

---

## Sections

| Section | Description |
|---------|-------------|
| Hero | Intro, title, and call-to-action |
| About | Background and research focus |
| Experience | 4 professional roles with expandable skill details |
| Skills | Categorized technical skills (ML/AI, Programming, Analytics, Cloud) |
| Education | Northwestern, Emory, UChicago |
| Projects | 5 interactive case study cards with category filters |
| Publications | Academic publications and conference presentations |
| Impact | Social impact and nonprofit work |
| Beyond the Data | Personal interests and life outside work |
| Contact | Email, phone, LinkedIn |

---

## Projects Featured

| Project | Category | Key Result |
|---------|----------|-----------|
| Instacart Market Basket Analysis | ML Pipeline | PR-AUC 0.796 with Tuned XGBoost |
| Netflix Prize Recommendation System | Rec Systems | SVD RMSE ~0.95 with hybrid CF |
| Boston MBTA Transit Analytics Dashboard | Analytics | 229 trips, station-level delay distributions |
| Document Chunking Strategies for RAG | NLP / LLM | 4+ chunking strategies evaluated with LangChain |
| Titanic Survival Prediction | ML Pipeline | Stratified K-Fold + SHAP interpretability |

---

## Deploying to GitHub Pages

This repo is configured as a GitHub user site (`yuanyuanxie11.github.io`), so the `main` branch is served at the root URL automatically.

```bash
# Build and push — GitHub Pages serves the built output
npm run build
git add dist/ && git commit -m "deploy: update build" && git push
```

> If using a GitHub Actions workflow for CI/CD, the build output directory is `dist/public`.

---

## Contact

**Yuanyuan Xie**
- Email: [yyuanxie1101@gmail.com](mailto:yyuanxie1101@gmail.com)
- LinkedIn: [linkedin.com/in/yuanyuan-x-663145220](https://www.linkedin.com/in/yuanyuan-x-663145220)
- GitHub: [github.com/yuanyuanxie11](https://github.com/yuanyuanxie11)

---

*Built with React, TypeScript, and Tailwind CSS. Designed to tell stories, not just list credentials.*
