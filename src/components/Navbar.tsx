import { useEffect, useState } from 'react'
import { Command, Menu, X, Volume2, VolumeX, Sparkles, Cloud } from 'lucide-react'
import { sound } from '../utils/audio'

interface NavbarProps {
  onOpenVault: () => void
}

export function Navbar({ onOpenVault }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [scrolled, setScrolled] = useState(false)
  const [currentTime, setCurrentTime] = useState('')

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Live IST (Navi Mumbai) time
  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      const timeStr = now.toLocaleTimeString('en-IN', {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      })
      setCurrentTime(timeStr)
    }
    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  const toggleSound = () => {
    const next = !soundEnabled
    setSoundEnabled(next)
    sound.setEnabled(next)
    if (next) sound.playPop()
  }

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMobileMenuOpen(false)
  }

  return (
    <header className={`site-header-wrapper ${scrolled ? 'header-scrolled' : ''}`}>
      <div className="site-header page-width">
        <a href="#" className="brand" aria-label="Yugank Singh Homepage">
          <span className="brand-mark">&lt;/&gt;</span>
          <div className="brand-text">
            <span>yugank<span className="muted">.dev</span></span>
            <span className="brand-sub">AWS Builder</span>
          </div>
        </a>

        {/* Live IST Status indicator */}
        <div className="header-status-badge hidden lg:flex">
          <span className="pulse-dot" />
          <span>Navi Mumbai, IN: {currentTime || 'IST'}</span>
        </div>

        <nav className={`nav-links ${mobileMenuOpen ? 'open' : ''}`}>
          <button onClick={() => scrollTo('about')}>About</button>
          <button onClick={() => scrollTo('superpowers')}>Superpowers</button>
          <button onClick={() => scrollTo('work')}>Projects</button>
          <button onClick={() => scrollTo('aws-architecture')} className="nav-highlight">
            <Cloud size={13} className="text-amber-400 inline mr-1" />
            AWS Cloud
          </button>
          <button onClick={() => scrollTo('achievements')}>Achievements</button>
          <button onClick={() => scrollTo('contact')}>Contact</button>

          {/* Sound toggle button */}
          <button
            onClick={toggleSound}
            className="sound-toggle-btn"
            title={soundEnabled ? 'Mute sound effects' : 'Enable sound effects'}
            aria-label="Toggle sound effects"
          >
            {soundEnabled ? <Volume2 size={15} /> : <VolumeX size={15} />}
          </button>

          {/* Creative Feature Trigger Button */}
          <button
            onClick={() => {
              sound.playCoin()
              onOpenVault()
            }}
            className="nav-vault-trigger group"
            title="Open Interactive Superpower Vault & Terminal [~]"
          >
            <Sparkles size={14} className="sparkle-icon" />
            <span>Secret Vault</span>
            <span className="nav-key-badge">~</span>
          </button>
        </nav>

        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={() => {
              sound.playCoin()
              onOpenVault()
            }}
            className="mobile-vault-btn"
            aria-label="Open Superpower Vault"
          >
            <Sparkles size={16} />
          </button>

          <button
            className="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>
    </header>
  )
}

