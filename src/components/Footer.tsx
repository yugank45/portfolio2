import { ArrowUp, Cloud, Github, Mail, Phone, Sparkles } from 'lucide-react'
import { personalInfo } from '../data/portfolioData'
import { sound } from '../utils/audio'

interface FooterProps {
  onOpenVault: (tab?: 'capsule' | 'game' | 'terminal') => void
}

export function Footer({ onOpenVault }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="site-footer-wrapper">
      <div className="contact-section" id="contact">
        <div className="page-width contact-inner">
          <p className="eyebrow">
            <span />
            06 / Connect
          </p>
          <h2 className="contact-headline">
            Let&apos;s build something
            <br />
            <em>extraordinary.</em>
          </h2>
          <p className="contact-copy">
            Whether it&apos;s an internship opportunity, full-time engineering role, an open-source collaboration, or just a deep conversation about distributed cloud architecture — my inbox is always open.
          </p>

          <div className="contact-actions-row">
            <a
              href="https://github.com/yugank45"
              target="_blank"
              rel="noreferrer"
              className="button button-primary"
            >
              <Github size={16} /> github.com/yugank45
            </a>

            <a
              href="mailto:yugankyogeshsingh2020@gmail.com"
              className="button button-ghost"
            >
              <Mail size={16} /> Email me
            </a>

            <a
              href="tel:+919356920426"
              className="button button-ghost"
            >
              <Phone size={16} /> Call
            </a>

            <button
              onClick={() => {
                sound.playCoin()
                onOpenVault('capsule')
              }}
              className="button button-secondary"
            >
              <Sparkles size={16} className="text-amber-400" />
              <span>Explore Lore Capsules [~]</span>
            </button>
          </div>
        </div>
      </div>

      <div className="page-width footer-bottom-bar">
        <div className="footer-left">
          <a href="#" className="brand" aria-label="Yugank Singh Home">
            <span className="brand-mark">&lt;/&gt;</span>
            <div className="brand-text">
              <span>yugank<span className="muted">.dev</span></span>
            </div>
          </a>
          <span className="footer-copyright">
            © {new Date().getFullYear()} Yugank Singh · Built for AWS Student Builder Challenge
          </span>
        </div>

        <div className="footer-center">
          <div className="aws-live-pill">
            <Cloud size={13} className="text-amber-400" />
            <span>Configured for <strong>AWS Amplify</strong></span>
          </div>
        </div>

        <div className="footer-right">
          <a
            href="https://github.com/yugank45"
            target="_blank"
            rel="noreferrer"
            className="footer-social-link"
            aria-label="GitHub"
          >
            <Github size={16} />
          </a>

          <button
            onClick={scrollToTop}
            className="footer-top-btn"
            title="Back to Top"
            aria-label="Back to top"
          >
            <ArrowUp size={16} />
          </button>
        </div>
      </div>
    </footer>
  )
}
