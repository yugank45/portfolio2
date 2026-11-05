import { motion } from 'framer-motion'
import { Award, Trophy, GitPullRequest, Briefcase, Cloud, CheckCircle } from 'lucide-react'
import { achievements } from '../data/portfolioData'

export function Achievements() {
  const getIcon = (tag: string) => {
    switch (tag) {
      case 'Academic Excellence':
        return <Award size={20} className="text-amber-400" />
      case 'Competitive Coding':
        return <Trophy size={20} className="text-purple-400" />
      case 'Open Source':
        return <GitPullRequest size={20} className="text-pink-400" />
      case 'Industry Experience':
        return <Briefcase size={20} className="text-emerald-400" />
      default:
        return <Cloud size={20} className="text-sky-400" />
    }
  }

  return (
    <section id="achievements" className="page-width proof-section">
      <div className="section-label">05 / Verified Achievements &amp; Proof</div>

      <div className="section-heading mb-8">
        <p className="eyebrow">
          <span />
          Proof of Work
        </p>
        <h2>
          Milestones, rankings &amp;
          <br />
          <span>production contributions.</span>
        </h2>
        <p className="section-copy">
          Real numbers, verified certifications, and focused contributions to community software.
        </p>
      </div>

      <div className="achievements-grid">
        {achievements.map((item, idx) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.08 }}
            className="achievement-card"
          >
            <div className="achievement-top">
              <div className="achievement-icon-box">{getIcon(item.tag)}</div>
              <span className="achievement-badge">{item.badge}</span>
            </div>

            <span className="achievement-metric">{item.metric}</span>
            <h3 className="achievement-title">{item.title}</h3>
            <p className="achievement-org">{item.organization}</p>
            <p className="achievement-desc">{item.description}</p>

            <div className="achievement-footer">
              <span className="achievement-tag-pill">{item.tag}</span>
              <span className="flex items-center gap-1 text-[10px] text-emerald-400 font-mono">
                <CheckCircle size={11} /> Documented
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Experience Timeline */}
      <div className="journey-grid-container mt-12">
        <div className="journey-left">
          <h3 className="text-lg font-bold text-white mb-2">Experience &amp; contribution</h3>
          <p className="text-xs text-neutral-400 leading-relaxed">
            Hands-on software development through an internship and open-source contribution.
          </p>
        </div>

        <div className="timeline-container">
          <div className="timeline-item">
            <div className="timeline-marker" />
            <div className="timeline-content">
              <p className="timeline-date">SEPTEMBER — OCTOBER 2026 · REMOTE</p>
              <h4>
                Admin Panel Intern <span>@ Torkk (BLACKORIGINX)</span>
              </h4>
              <p className="timeline-copy">
                Worked on React-based admin panel development and contributed to role-based access control (RBAC) for administrative workflows.
              </p>
            </div>
          </div>

          <div className="timeline-item">
            <div className="timeline-marker" />
            <div className="timeline-content">
              <p className="timeline-date">OPEN SOURCE · HISAABO COMMUNITY</p>
              <h4>
                Open-Source Contributor <span>accounting workflows</span>
              </h4>
              <p className="timeline-copy">
                Contributed to the TDS receivable-side payment workflow, tax code registry, payment integration, accounting consistency, and test coverage.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
