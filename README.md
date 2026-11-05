# Yugank Singh — Portfolio & AWS Cloud Builder

A responsive developer portfolio and interactive AWS cloud experience built with React, TypeScript, Vite, Tailwind CSS, Framer Motion, and Lucide React. Prepared for the **AWS Student Builders Portfolio Hackathon**.

---

## ✨ Features & Architecture Highlights

- **Obsidian & Amber Cloud Design:** Editorial dark interface with subtle ambient radial gradients, glassmorphism (`backdrop-blur-md`), and responsive layouts.
- **Three Core Required Sections:**
  - **About Me:** Authentic story, engineering philosophy tabs (*Clarity over Cleverness*, *Defensive Engineering*), and academic background at Bharati Vidyapeeth College of Engineering, Navi Mumbai.
  - **Skills & Tech Superpowers:** Filterable technical arsenal (Cloud & DevOps, Frontend, Backend, Databases & AI) with AWS builder focus.
  - **Projects & Achievements:** In-depth case studies for **ClaimVision AI**, **Wanderlust**, **Zerodha Trading Engine**, **AI Placement Coach**, and **Hisaabo Open Source** with architectural deep-dive modals.
- **Dedicated AWS Cloud Architecture Tour:** An interactive, clearly labeled reference architecture for **AWS Amplify Hosting**, **Amazon CloudFront CDN**, **Amazon S3**, and **AWS IAM**. The project does not claim live AWS metrics or provision infrastructure.
- **Interactive Creative Feature (30% Rubric):**
  - **Visible Hints:** Glowing Hero banner, top navigation badge, keyboard shortcut keys (`~` or `⌘K`), and a persistent floating trigger pill.
  - **Superpower Capsule Dispenser:** Vending machine UI with coin drop, audio feedback (Web Audio API), confetti explosions, and 5 collectible personal lore capsules.
  - **AWS Cloud Routing Challenge:** 4-scenario mini-game testing real-world cloud architecture instincts with score multiplier streaks and badges.
  - **Yugank.exe Dev Console:** Terminal with bash autocomplete, arrow history, commands, and a toggleable digital phosphor matrix rain mode (`matrix`).
- **Zero Heavy Assets:** Custom synthesized sound via Web Audio API and pure canvas particle physics (0 external MP3s or confetti dependencies).

---

## 🚀 Local Development

```bash
# Install dependencies
npm install

# Start local development server
npm run dev
```

Build for production:
```bash
npm run build
```

Preview production build:
```bash
npm run preview
```

---

## ☁️ Deploying to AWS Amplify Hosting

This repository is pre-configured for automated continuous deployment with AWS Amplify via `amplify.yml`:

1. Push your repository to GitHub:
   ```bash
   git add .
   git commit -m "feat: upgrade portfolio to premium AWS builder experience"
   git push origin main
   ```
2. Log in to the [AWS Management Console](https://console.aws.amazon.com/amplify).
3. Choose **AWS Amplify** > **Deploy an app** > Select **GitHub**.
4. Authorize GitHub, select your repository (`Portfolio`) and branch (`main`).
5. Amplify will auto-detect the build settings in `amplify.yml`.
6. Click **Save and Deploy**, then verify the generated build and routes in the Amplify console.

---

## 📋 Hackathon Submission Guide

The creative feature documentation and architecture tour are included in this README and in the in-app experience.
