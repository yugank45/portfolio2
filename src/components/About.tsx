import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  GraduationCap,
  MapPin,
  Terminal,
  Code2,
  Sparkles,
  BookOpen,
  Compass,
  Cpu,
  Layers,
  CheckCircle2,
} from 'lucide-react'
import { personalInfo } from '../data/portfolioData'
import { sound } from '../utils/audio'

interface AboutProps {
  onOpenVault: (tab?: 'capsule' | 'game' | 'terminal') => void
}

export function About({ onOpenVault }: AboutProps) {
  const [activeTab, setActiveTab] = useState<'story' | 'philosophy' | 'education'>('story')

  return (
    <section id="about" className="page-width about-section">
      <div className="section-label">01 / About Me</div>

      <div className="about-grid">
        <div className="about-left">
          <div className="section-heading">
            <p className="eyebrow">
              <span />
              The Developer Story
            </p>
            <h2>
              Driven by curiosity.
              <br />
              <span>Disciplined by craft.</span>
            </h2>
          </div>

          <p className="section-copy">
            I am a builder who loves the sweet spot where robust systems architecture meets thoughtful human design.
          </p>

          {/* Quick interactive card pointing to creative feature */}
          <div className="about-secret-callout">
            <div className="flex items-center gap-2 text-amber-400 font-mono text-xs uppercase tracking-wider mb-2">
              <Sparkles size={14} />
              <span>Personal Lore Unlocked</span>
            </div>
            <p className="text-xs text-neutral-300 leading-relaxed mb-3">
              Want to explore the lessons behind my Hisaabo contribution or why cloud deployment clicked for me?
            </p>
            <button
              onClick={() => {
                sound.playCoin()
                onOpenVault('capsule')
              }}
              className="about-secret-btn"
            >
              <span>Dispense Story Capsule</span>
              <span className="keycap">~</span>
            </button>
          </div>

          {/* Quick Meta tags */}
          <div className="about-meta-badges">
            <span className="about-meta-pill">
              <GraduationCap size={15} className="text-purple-400" />
              <span>B.E. Information Technology</span>
            </span>
            <span className="about-meta-pill">
              <MapPin size={15} className="text-emerald-400" />
              <span>Navi Mumbai, India</span>
            </span>
            <span className="about-meta-pill">
              <Cpu size={15} className="text-amber-400" />
              <span>AWS Cloud &amp; Full-Stack</span>
            </span>
          </div>
        </div>

        <div className="about-right">
          {/* Tabs for rich interactive exploration */}
          <div className="about-tabs-header">
            <button
              className={`about-tab-btn ${activeTab === 'story' ? 'active' : ''}`}
              onClick={() => {
                sound.playPop()
                setActiveTab('story')
              }}
            >
              <Compass size={14} />
              <span>My Journey</span>
            </button>
            <button
              className={`about-tab-btn ${activeTab === 'philosophy' ? 'active' : ''}`}
              onClick={() => {
                sound.playPop()
                setActiveTab('philosophy')
              }}
            >
              <Layers size={14} />
              <span>How I Think</span>
            </button>
            <button
              className={`about-tab-btn ${activeTab === 'education' ? 'active' : ''}`}
              onClick={() => {
                sound.playPop()
                setActiveTab('education')
              }}
            >
              <BookOpen size={14} />
              <span>Education</span>
            </button>
          </div>

          <div className="about-tab-content">
            {activeTab === 'story' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="about-story-pane"
              >
                <p>
                  I’m a 4th-year engineering student at <strong>Bharati Vidyapeeth College of Engineering, Navi Mumbai</strong>. My journey started with a fascination for Java and object-oriented principles, which led me to earn the <strong>NPTEL Java Elite Certification with a top score of 93/100</strong>.
                </p>
                <p>
                  As I moved deeper into production development, I interned at <strong>Torkk (BLACKORIGINX)</strong>, where I developed modular React admin panel interfaces and engineered role-based access control (RBAC) mechanisms for team workflows.
                </p>
                <p>
                  To push beyond textbook problems, I joined the open-source engineering community for <strong>Hisaabo</strong>, an accounting application. There, I contributed to the TDS receivable-side payment workflow, tax code registry, payment integration, accounting consistency, and test coverage.
                </p>
                <p>
                  Today, I spend my time exploring modern AI toolchains like <strong>Groq Vision &amp; OpenCV</strong> in projects like ClaimVision AI, while learning AWS deployment patterns through this portfolio.
                </p>
              </motion.div>
            )}

            {activeTab === 'philosophy' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="about-philosophy-pane"
              >
                <div className="philosophy-item">
                  <div className="philosophy-icon">
                    <CheckCircle2 size={16} className="text-emerald-400" />
                  </div>
                  <div>
                    <h4>Clarity Over Cleverness</h4>
                    <p>
                      I value code that a teammate can read and debug at 2 AM with zero context over convoluted one-liners. Explicit is always better than implicit.
                    </p>
                  </div>
                </div>

                <div className="philosophy-item">
                  <div className="philosophy-icon">
                    <CheckCircle2 size={16} className="text-amber-400" />
                  </div>
                  <div>
                    <h4>Infrastructure as a First-Class Citizen</h4>
                    <p>
                      A great feature that takes 10 seconds to load or fails during a deployment is a broken feature. I design applications with CI/CD, caching, and edge distribution in mind from day one.
                    </p>
                  </div>
                </div>

                <div className="philosophy-item">
                  <div className="philosophy-icon">
                    <CheckCircle2 size={16} className="text-purple-400" />
                  </div>
                  <div>
                    <h4>Defensive Engineering in Edge Cases</h4>
                    <p>
                      Working on financial ledgers at Hisaabo taught me that 90% of user trust is earned in the 10% of weird edge cases — network drops, floating-point roundoffs, and invalid payloads.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'education' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="about-education-pane"
              >
                <div className="edu-card">
                  <div className="edu-header">
                    <div>
                      <h4>Bachelor of Engineering in Information Technology</h4>
                      <p className="edu-school">Bharati Vidyapeeth College of Engineering, Navi Mumbai</p>
                    </div>
                    <span className="edu-year">2023 — 2027</span>
                  </div>
                  <p className="edu-details">
                    Expected graduation in 2027 · Current CGPA: 7.23 / 10. Coursework includes Data Structures &amp; Algorithms, DBMS, Operating Systems, Computer Networks, and Software Engineering.
                  </p>
                  <div className="edu-tags">
                    <span>DSA</span>
                    <span>System Design</span>
                    <span>Computer Networks</span>
                    <span>Cloud Architecture</span>
                    <span>RDBMS</span>
                  </div>
                </div>

                <div className="edu-card mt-3">
                  <div className="edu-header">
                    <div>
                      <h4>NPTEL Java Programming Certification (Elite)</h4>
                      <p className="edu-school">IIT Kharagpur / Ministry of Education, Govt. of India</p>
                    </div>
                    <span className="edu-score-badge">93 / 100</span>
                  </div>
                  <p className="edu-details">
                    Awarded Elite Gold certification with a score of 93%, demonstrating in-depth mastery of OOP, thread concurrency, JVM internals, and collection frameworks.
                  </p>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
