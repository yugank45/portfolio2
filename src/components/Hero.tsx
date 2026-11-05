import { motion } from 'framer-motion'
import { ArrowUpRight, Cloud, Github, Sparkles, Terminal, ChevronRight, CheckCircle2 } from 'lucide-react'
import { sound } from '../utils/audio'

interface HeroProps {
  onOpenVault: (tab?: 'capsule' | 'game' | 'terminal') => void
  onNavigate: (id: string) => void
}

export function Hero({ onOpenVault, onNavigate }: HeroProps) {
  return (
    <section className="hero page-width" id="hero">
      <div className="hero-copy">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="status-pill-row"
        >
          <span className="status-pill">
            <span className="status-dot animate-pulse" />
            <span>Available for SDE &amp; Cloud Internships</span>
          </span>
          <span className="aws-amplify-pill">
            <Cloud size={13} className="text-amber-400" />
            <span>AWS Amplify ready</span>
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="hero-headline"
        >
          Building practical products,
          <br />
          <em>intuitive interfaces</em>,
          <br />
          and cloud-ready systems.
        </motion.h1>

        <motion.p
          className="hero-intro"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.25 }}
        >
          I&apos;m <strong>Yugank Singh</strong> — a 4th-year B.E. Information Technology student at Bharati Vidyapeeth College of Engineering, Navi Mumbai. I build full-stack web platforms, experiment with computer vision AI, and I&apos;m learning how to ship reliably on <strong>AWS</strong>.
        </motion.p>

        {/* Visible hint for the creative feature */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="hero-creative-hint-container"
        >
          <button
            onClick={() => {
              sound.playCoin()
              onOpenVault('capsule')
            }}
            className="hero-creative-hint-card group"
            aria-label="Unlock Yugank's Interactive Superpower Dispenser and Secret Dev Console"
          >
            <div className="hint-pill-header">
              <span className="hint-pulsing-badge">
                <Sparkles size={13} className="animate-spin text-amber-300" style={{ animationDuration: '4s' }} />
                <span>INTERACTIVE FEATURE HINT</span>
              </span>
              <span className="hint-keycaps">
                <span className="keycap">~</span> or <span className="keycap">⌘K</span>
              </span>
            </div>
            <div className="hint-body">
              <p className="hint-title">
                Unlock Yugank&apos;s Superpower Machine &amp; Secret Dev Console
              </p>
              <p className="hint-sub">
                Drop a virtual coin to unlock 5 rare personal stories, play the AWS Cloud Routing Mini-Game, or explore the terminal.
              </p>
            </div>
            <div className="hint-action">
              <span>Open Interactive Vault</span>
              <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </button>
        </motion.div>

        {/* Action buttons */}
        <motion.div
          className="hero-actions"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.45 }}
        >
          <button
            className="button button-primary"
            onClick={() => onNavigate('work')}
          >
            Explore Projects <ArrowUpRight size={16} />
          </button>

          <button
            className="button button-secondary"
            onClick={() => onNavigate('aws-architecture')}
          >
            <Cloud size={16} className="text-amber-400" />
            AWS Architecture Tour
          </button>

          <a
            className="button button-ghost"
            href="https://github.com/yugank45"
            target="_blank"
            rel="noreferrer"
          >
            <Github size={16} /> GitHub
          </a>
        </motion.div>
      </div>

      {/* Orbit Graphic */}
      <motion.div
        className="hero-art"
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className="orbit orbit-one" />
        <div className="orbit orbit-two" />
        <div className="orbit orbit-three" />

        <div className="art-core">
          <div className="art-core-inner">
            <span className="core-symbol">&lt;/&gt;</span>
            <span className="core-text">ideas → cloud</span>
          </div>
        </div>

        {/* Floating Interactive Badge 1: AWS Amplify */}
        <motion.div
          className="float-card card-top cursor-pointer"
          whileHover={{ scale: 1.05 }}
          onClick={() => onNavigate('aws-architecture')}
        >
          <div className="float-card-header">
            <span className="mini-label">Infrastructure</span>
            <span className="aws-tag">AWS Amplify</span>
          </div>
          <strong>Global Edge Deployment</strong>
          <span className="card-sub text-xs text-neutral-400 flex items-center gap-1">
            <CheckCircle2 size={12} className="text-emerald-400" /> Amplify-ready build
          </span>
          <span className="card-accent">↗</span>
        </motion.div>

        {/* Floating Interactive Badge 2: ClaimVision AI */}
        <motion.div
          className="float-card card-bottom cursor-pointer"
          whileHover={{ scale: 1.05 }}
          onClick={() => onNavigate('work')}
        >
          <div className="float-card-header">
            <span className="mini-label">Featured AI Build</span>
            <span className="ai-tag">Groq + OpenCV</span>
          </div>
          <strong>ClaimVision AI</strong>
          <span className="card-sub text-xs text-neutral-400">
            Automated Damage Verification
          </span>
          <span className="card-accent">✦</span>
        </motion.div>

        {/* Terminal quick-launch badge */}
        <motion.button
          className="float-card card-terminal cursor-pointer"
          whileHover={{ scale: 1.05 }}
          onClick={() => {
            sound.playCoin()
            onOpenVault('terminal')
          }}
        >
          <div className="flex items-center gap-2">
            <Terminal size={14} className="text-purple-400" />
            <strong className="text-xs">yugank.exe</strong>
          </div>
          <span className="text-[10px] text-neutral-400 font-mono">Press [~] to launch</span>
        </motion.button>
      </motion.div>
    </section>
  )
}
