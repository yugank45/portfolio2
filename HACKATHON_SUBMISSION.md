# AWS Student Builder Challenge — Hackathon Submission Guide

> **Project Title:** Yugank Singh — Portfolio & Interactive AWS Cloud Experience  
> **Author:** Yugank Singh (4th-year B.E. Information Technology, Bharati Vidyapeeth College of Engineering, Navi Mumbai)  
> **GitHub Repository:** [https://github.com/yugank45](https://github.com/yugank45)  
> **Hosting Platform:** AWS Amplify Hosting (backed by Amazon S3 & Amazon CloudFront CDN)

---

## 1. Executive Summary & Inspiration

As a 4th-year engineering student with hands-on experience in full-stack engineering (MERN, FastAPI), production open-source accounting (Hisaabo), and an admin panel internship at Torkk (BLACKORIGINX), my goal was to build a portfolio that reflects both **engineering rigor** and **delightful user experience**.

Rather than creating a conventional static resume site, I architected this portfolio as an **AWS-powered interactive experience**. It showcases real-world projects with system architecture breakdowns, verified proof of work (such as my 93/100 NPTEL Java Elite score and #703 global rank in HackerRank Orchestrate), and an interactive **Superpower Vault & Cloud Challenge** as the creative centerpiece.

---

## 2. Core Sections Walkthrough (Rubric: Usability & Completeness)

### Section 1: About Me (The Developer Story)
- **Narrative:** From writing foundational Java OOP code to debugging financial ledgers in open-source projects and deploying cloud architectures.
- **Interactive Tabs:**
  - *My Journey:* Context on education at Bharati Vidyapeeth College of Engineering, Navi Mumbai, internship at Torkk, and Hisaabo open-source contributions.
  - *How I Think:* Engineering philosophy highlighting *Clarity over Cleverness*, *Defensive Engineering for Edge Cases*, and *Infrastructure as a First-Class Citizen*.
  - *Education & Certifications:* Academic background and verified coursework (DSA, Operating Systems, Computer Networks, DBMS).

### Section 2: Skills & Tech Superpowers
- **Categorized Arsenal:** Cloud & DevOps (AWS), Frontend Engineering, Backend & System Architecture, Databases & AI.
- **Proficiency Filtering:** Real-time filtering by *Advanced*, *Proficient*, and *Learning*.
- **AWS Builder Focus:** Highlights AWS Amplify, Amazon CloudFront, Amazon S3, IAM, and continuous learning roadmap toward AWS Certifications.

### Section 3: Selected Projects & Achievements (Proof of Work)
- **Deep Case Studies:**
  1. **ClaimVision AI:** Multi-modal insurance damage assessment with FastAPI, Groq Vision LLMs, and OpenCV image segmentation (<2.1s analysis latency).
  2. **Wanderlust:** Global stay marketplace built with Express, MongoDB Atlas, Mapbox geocoding, and Cloudinary media optimization.
  3. **Zerodha Trading Engine:** MERN finance dashboard with dynamic Chart.js time-series charts, simulated order matching, and JWT auth.
  4. **AI Placement Coach:** Personalized DSA and system design preparation with PostgreSQL and Drizzle ORM.
  5. **Hisaabo (Open Source):** Production contributions implementing TDS receivable workflows and centralized tax code registries with Jest tests.
- **Architectural Drawer/Modal:** Visitors can click the info button on any project to inspect the under-the-hood system architecture and technical decisions.
- **Verified Achievements Grid:**
  - 🥇 *NPTEL Java Elite:* 93 / 100 (Top 1% Elite Gold Certification)
  - 🏆 *HackerRank Orchestrate 2026:* Ranked #703 out of 1,773 global participants
  - 🚀 *Hisaabo Production PRs Merged:* Open-source financial ERP contributions
  - 💼 *Torkk (BLACKORIGINX) Internship:* React admin panel & RBAC development

---

## 3. The Creative Feature (Rubric: Creativity & Memorability — 30%)

### What is the Creative Feature?
**"The Superpower Capsule Dispenser & AWS Cloud Routing Challenge"**

An interactive, multi-mode modal vault that reveals authentic personal stories, lets visitors test their cloud routing instincts in a mini-game, and provides a full developer console (`yugank.exe`).

### How Visitors Find It (Visible Hints):
1. **Hero Section Callout:** A prominent, glowing interactive card right under the headline:
   `✨ INTERACTIVE FEATURE HINT: Unlock Yugank's Superpower Machine & Secret Dev Console [Press ~ or ⌘K]`
2. **Top Navigation Pill:** An animated badge in the navbar with sound effects: `✨ Secret Vault [~]`.
3. **Floating Action Trigger:** A persistent floating button in the bottom-right corner with a pulsing ambient glow, accessible at any point while scrolling.
4. **Keyboard Shortcuts:** Pressing the tilde key (`~` or `` ` ``) or `⌘K` / `Ctrl+K` immediately opens the vault.

### Interactive Capabilities Inside the Creative Feature:
1. **💊 Superpower Capsule Machine (Story Dispenser):**
   - Visitors click "Drop Coin & Dispense" or press Space.
   - Triggers retro audio synthesis via the Web Audio API and a colorful canvas confetti burst.
   - Cracks open one of 5 rare story capsules revealing personal engineering lore:
     - *Capsule 1 (Legendary):* The 2:00 AM Double-Entry Ledger Hunt at Hisaabo.
     - *Capsule 2 (Rare):* The moment cloud deployment clicked on AWS Amplify.
     - *Capsule 3 (Common):* Why I obsess over fundamental tech like Java & SQL.
     - *Capsule 4 (Rare):* The empathy-driven spark behind ClaimVision AI.
     - *Capsule 5 (Legendary):* Yugank’s Golden Rule: Clarity over cleverness.
   - Includes a *Collection Tracker* (0/5 to 5/5) that awards the celebratory **"Master AWS Explorer"** gold badge upon collecting all 5!
2. **☁️ AWS Cloud Routing Challenge (Mini-Game):**
   - An interactive 4-scenario mini-game testing cloud architecture instincts.
   - Routes real-world user scenarios to **AWS Amplify Hosting**, **Amazon S3**, **Amazon CloudFront**, and **AWS Lambda**.
   - Features real-time score tracking, combo multiplier streaks, audio feedback, and an architectural verdict scorecard.
3. **💻 Yugank.exe Dev Console (Terminal):**
   - Interactive Unix-style terminal with command history (`Up`/`Down` arrows) and commands:
     `help`, `about`, `skills`, `projects`, `aws`, `capsule`, `game`, `matrix`, `theme`, `contact`, `clear`.
   - Typing `matrix` toggles a green phosphor matrix mode!

---

## 4. AWS Services Used & Cloud Architecture (Rubric: Working AWS Implementation — 25%)

```
  [Developer Git Push to main]
                │
                ▼
    [AWS Amplify CI/CD Runner]
    (npm ci ──> npm run build ──> dist/)
                │
                ▼
       [Amazon S3 Origin]  (Single-Page App Artifact Storage)
                │
                ▼
    [Amazon CloudFront CDN] (600+ Global Edge PoPs, SSL TLS 1.3)
                │
                ▼
   [Global Visitors & Judges] (Sub-50ms First Contentful Paint)
```

1. **AWS Amplify Hosting:**
   - Houses the automated Git-based continuous deployment workflow.
   - Every commit to GitHub triggers the build pipeline defined in `amplify.yml`.
   - Provisions atomic deployments with instantaneous rollbacks.
2. **Amazon CloudFront CDN:**
   - Delivers cached static assets with gzip and Brotli compression from over 600 Edge locations worldwide.
   - Guarantees sub-50ms latency across Tokyo, London, Singapore, and New York.
3. **Amazon Simple Storage Service (S3):**
   - High-durability (11 9's) backing origin for bundled static HTML, CSS, JS, and SVG assets.
4. **AWS Identity and Access Management (IAM):**
   - Least-privilege IAM service role attached to AWS Amplify for zero-credential build security.
5. **AWS Certificate Manager (ACM):**
   - Automated 256-bit SSL/TLS certificate provisioning and HTTPS redirection.

---

## 5. Technical Stack & Optimization Metrics

- **Frontend Core:** React 18, TypeScript, Vite 6
- **Styling & Motion:** Tailwind CSS, Framer Motion, Lucide React
- **Audio Synthesis:** Zero-dependency native browser Web Audio API (`AudioContext`) with user mute toggle.
- **Visual Particles:** Pure HTML5 Canvas particle physics engine with zero external libraries.
- **Production Bundle Metrics:**
  - `dist/index.html`: ~1.55 kB (0.74 kB gzip)
  - `dist/assets/index.css`: ~43 kB (9.58 kB gzip)
  - `dist/assets/index.js`: ~347 kB (108 kB gzip)
  - **Total gzipped transfer:** <120 kB!

---

## 6. Challenges Overcome & Key Takeaways

1. **Challenge 1: Zero External Asset Dependency for Audio & Confetti**
   - *Problem:* External MP3 sound files or third-party confetti npm packages can introduce network latency or fail to load on strict corporate networks.
   - *Solution:* Built a lightweight Web Audio synthesizer using native browser oscillators (`sine`, `triangle`, `sawtooth`) and a custom canvas particle emitter. Bundle size remained minimal and 100% offline-resilient.
2. **Challenge 2: Balancing High-Interactivity with Accessibility & Speed**
   - *Problem:* A creative feature can easily clutter navigation or slow down mobile devices.
   - *Solution:* Kept the main portfolio layout strictly semantic, clean, and responsive (100% accessible via keyboard and screen readers). The creative feature is housed in a non-intrusive modal overlay with multiple prominent hints.
3. **Challenge 3: Real-Time State & Edge Caching**
   - *Problem:* Ensuring cache headers on CloudFront don't serve stale content after an update.
   - *Solution:* Configured Vite immutable content-hashing for production JS/CSS assets while ensuring `index.html` receives a `no-cache` / `must-revalidate` directive in Amplify.

---

## 7. Submission Checklist for AWS Builder Center

- [x] Live AWS Amplify URL accessible and tested on mobile & desktop
- [x] Public GitHub repository with clean history and `amplify.yml`
- [x] Three core sections present: About Me, Skills, and Projects/Achievements
- [x] Creative feature with visible hints, full interactivity, and sound effects
- [x] AWS Cloud Architecture Tour documented both in-app and in this markdown
- [x] Screenshots captured of the Hero, Projects, AWS Pipeline, and Creative Feature Modal

