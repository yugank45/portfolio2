import { useState } from 'react'
import { motion } from 'framer-motion'
import { Cloud, Layout, Server, Database, Sparkles, Check, Zap, ExternalLink } from 'lucide-react'
import { skillCategories } from '../data/portfolioData'
import { sound } from '../utils/audio'

interface SkillsProps {
  onOpenVault: (tab?: 'capsule' | 'game' | 'terminal') => void
  onNavigate: (id: string) => void
}

export function Skills({ onOpenVault, onNavigate }: SkillsProps) {
  const [filter, setFilter] = useState<'All' | 'Used in projects' | 'Familiar' | 'Learning'>('All')

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Cloud':
        return <Cloud size={18} className="text-amber-400" />
      case 'Layout':
        return <Layout size={18} className="text-purple-400" />
      case 'Server':
        return <Server size={18} className="text-cyan-400" />
      case 'Database':
        return <Database size={18} className="text-emerald-400" />
      default:
        return <Zap size={18} className="text-indigo-400" />
    }
  }

  return (
    <section id="superpowers" className="page-width stack-section">
      <div className="section-label">02 / Skills &amp; Tech Superpowers</div>

      <div className="stack-layout">
        <div className="stack-left">
          <div className="section-heading">
            <p className="eyebrow">
              <span />
              The Arsenal
            </p>
            <h2>
              Engineering tools &amp;
              <br />
              <span>tech superpowers.</span>
            </h2>
          </div>
          <p className="section-copy">
          A practical stack spanning full-stack development, relational and document databases, and computer vision AI. AWS is the current learning focus for this hackathon.
          </p>

          {/* Filter Pills */}
          <div className="skills-filter-row">
            {(['All', 'Used in projects', 'Familiar', 'Learning'] as const).map((lvl) => (
              <button
                key={lvl}
                className={`skills-filter-btn ${filter === lvl ? 'active' : ''}`}
                onClick={() => {
                  sound.playPop()
                  setFilter(lvl)
                }}
              >
                {lvl}
              </button>
            ))}
          </div>

          {/* Interactive Cloud Mini-Game Callout */}
          <div className="skills-interactive-callout">
            <div className="flex items-center gap-2 text-amber-400 font-mono text-xs uppercase tracking-wider mb-2">
              <Sparkles size={14} />
              <span>Test Your Cloud Knowledge</span>
            </div>
            <p className="text-xs text-neutral-300 leading-relaxed mb-3">
              Put your architecture instincts to work in Yugank&apos;s interactive AWS Routing Mini-Game!
            </p>
            <button
              onClick={() => {
                sound.playCoin()
                onOpenVault('game')
              }}
              className="skills-game-launch-btn"
            >
              <span>Launch AWS Mini-Game</span>
              <span className="keycap">Play</span>
            </button>
          </div>
        </div>

        <div className="stack-right">
          <div className="skills-category-grid">
            {skillCategories.map((cat, idx) => {
              const filteredSkills = cat.skills.filter(
                (s) => filter === 'All' || s.level === filter
              )

              if (filteredSkills.length === 0) return null

              return (
                <motion.div
                  key={cat.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.08 }}
                  className="skill-category-card"
                >
                  <div className="skill-cat-header">
                    <div className="skill-cat-icon">{getCategoryIcon(cat.iconName)}</div>
                    <div>
                      <h3 className="skill-cat-title">{cat.title}</h3>
                      <p className="skill-cat-desc">{cat.description}</p>
                    </div>
                  </div>

                  <div className="skills-pill-cloud">
                    {filteredSkills.map((skill) => (
                      <span
                        key={skill.name}
                        className={`skill-pill ${skill.highlight ? 'highlighted' : ''}`}
                      >
                        {skill.highlight && <span className="highlight-dot" />}
                        <span className="skill-pill-name">{skill.name}</span>
                        <span className={`skill-pill-level level-${skill.level.toLowerCase()}`}>
                          {skill.level}
                        </span>
                      </span>
                    ))}
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* AWS Spotlight Banner */}
          <motion.div
            className="aws-spotlight-card cursor-pointer"
            onClick={() => onNavigate('aws-architecture')}
            whileHover={{ scale: 1.01 }}
          >
            <div className="aws-spotlight-icon">
              <Cloud size={24} className="text-amber-400" />
            </div>
            <div className="aws-spotlight-content">
              <div className="flex items-center gap-2 mb-1">
                <span className="aws-tag">AWS Builder Focus</span>
                <span className="text-xs text-neutral-400 font-mono">Continuous Cloud Mastery</span>
              </div>
              <h4 className="text-sm font-bold text-white mb-1">
                Architected with AWS Amplify Hosting &amp; CloudFront CDN
              </h4>
              <p className="text-xs text-neutral-300 leading-relaxed">
                This portfolio is configured for AWS Amplify Hosting with a reproducible Vite build and GitHub-friendly deployment flow.
              </p>
            </div>
            <button className="aws-spotlight-btn" aria-label="Inspect AWS Architecture">
              <ExternalLink size={16} />
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
