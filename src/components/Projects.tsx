import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowUpRight,
  Code2,
  ExternalLink,
  Github,
  Layers,
  Sparkles,
  Info,
  Check,
  ChevronDown,
  X,
} from 'lucide-react'
import { projects } from '../data/portfolioData'
import { Project } from '../types'
import { sound } from '../utils/audio'

export function Projects() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null)

  const categories = ['All', 'Full-Stack', 'AI & Vision', 'Open Source']

  const filteredProjects = projects.filter((p) => {
    if (selectedCategory === 'All') return true
    return p.category === selectedCategory
  })

  return (
    <section id="work" className="page-width work-section">
      <div className="section-label">03 / Selected Projects</div>

      <div className="work-header">
        <div className="section-heading">
          <p className="eyebrow">
            <span />
            Proof in Code
          </p>
          <h2>
            A few ideas,
            <br />
            <span>built with intent.</span>
          </h2>
        </div>

        <div className="work-filter-tabs">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`work-filter-btn ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => {
                sound.playPop()
                setSelectedCategory(cat)
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="projects-grid">
        {filteredProjects.map((project, index) => (
          <motion.article
            key={project.id}
            className={`project-card accent-${project.accent}`}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ delay: index * 0.07 }}
          >
            <div className="project-top">
              <span className="project-number">{project.number}</span>
              <span className={`project-cat-pill cat-${project.accent}`}>
                {project.category}
              </span>
              <div className="project-links">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`View ${project.name} on GitHub`}
                    className="project-icon-link"
                  >
                    <Github size={17} />
                  </a>
                )}
                <button
                  onClick={() => {
                    sound.playPop()
                    setActiveModalProject(project)
                  }}
                  className="project-icon-link"
                  title="View Architecture Details"
                  aria-label="View Architecture Details"
                >
                  <Info size={17} />
                </button>
              </div>
            </div>

            <p className="project-label">{project.label}</p>
            <h3 className="project-title">{project.name}</h3>

            <p className="project-description">{project.description}</p>

            {/* Architecture Highlight Box */}
            <div className="project-arch-box">
              <div className="arch-box-title">
                <Layers size={13} className="text-amber-400" />
                <span>Architecture Under the Hood</span>
              </div>
              <p className="arch-box-copy">{project.architectureHighlight}</p>
            </div>

            {/* Key Features */}
            <ul className="project-features-list">
              {project.features.map((feat) => (
                <li key={feat}>
                  <Check size={13} className="feature-check" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>

            {/* Metric badge if any */}
            {project.metrics && (
              <div className="project-metric-badge">
                <Sparkles size={12} className="text-amber-300" />
                <span>{project.metrics}</span>
              </div>
            )}

            {/* Tech Stack Pills */}
            <div className="tag-row">
              {project.stack.map((tech) => (
                <span key={tech} className="tag-pill">
                  {tech}
                </span>
              ))}
            </div>
          </motion.article>
        ))}
      </div>

      {/* Interactive Project Architecture Modal */}
      <AnimatePresence>
        {activeModalProject && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveModalProject(null)}
          >
            <motion.div
              className="modal-window"
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-header">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs text-amber-400">
                    Project Deep-Dive
                  </span>
                  <span className="text-neutral-500">/</span>
                  <strong className="text-white text-sm">
                    {activeModalProject.name}
                  </strong>
                </div>
                <button
                  onClick={() => setActiveModalProject(null)}
                  className="modal-close-btn"
                  aria-label="Close modal"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="modal-body">
                <div className="mb-4">
                  <span className="text-xs uppercase font-mono tracking-wider text-neutral-400">
                    {activeModalProject.label}
                  </span>
                  <h3 className="text-2xl font-bold text-white mt-1">
                    {activeModalProject.name}
                  </h3>
                  <p className="text-neutral-300 text-sm mt-2 leading-relaxed">
                    {activeModalProject.description}
                  </p>
                </div>

                <div className="p-4 bg-neutral-900/80 border border-neutral-800 rounded-lg mb-4">
                  <h4 className="text-xs font-mono text-amber-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Layers size={14} /> System Architecture Breakdown
                  </h4>
                  <p className="text-xs text-neutral-300 leading-relaxed">
                    {activeModalProject.architectureHighlight}
                  </p>
                </div>

                <div className="mb-4">
                  <h4 className="text-xs font-mono text-neutral-400 uppercase tracking-wider mb-2">
                    Core Capabilities
                  </h4>
                  <ul className="space-y-2">
                    {activeModalProject.features.map((feat) => (
                      <li key={feat} className="text-xs text-neutral-300 flex items-start gap-2">
                        <Check size={14} className="text-emerald-400 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mb-6">
                  <h4 className="text-xs font-mono text-neutral-400 uppercase tracking-wider mb-2">
                    Technology Stack
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {activeModalProject.stack.map((t) => (
                      <span
                        key={t}
                        className="text-xs px-2.5 py-1 bg-neutral-800 border border-neutral-700 rounded text-neutral-300 font-mono"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3 pt-4 border-t border-neutral-800">
                  {activeModalProject.githubUrl && (
                    <a
                      href={activeModalProject.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="button button-primary text-xs"
                    >
                      <Github size={15} /> View Source Code
                    </a>
                  )}
                  <button
                    onClick={() => setActiveModalProject(null)}
                    className="button button-ghost text-xs"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
