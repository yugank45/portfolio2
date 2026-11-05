import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Sparkles, Terminal, Cloud } from 'lucide-react'
import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { About } from './components/About'
import { Skills } from './components/Skills'
import { Projects } from './components/Projects'
import { AwsArchitecture } from './components/AwsArchitecture'
import { Achievements } from './components/Achievements'
import { Footer } from './components/Footer'
import { CreativeFeatureModal } from './components/CreativeFeatureModal'
import { sound } from './utils/audio'

export function App() {
  const [vaultOpen, setVaultOpen] = useState(false)
  const [vaultTab, setVaultTab] = useState<'capsule' | 'game' | 'terminal'>('capsule')

  // Global keyboard shortcuts: `~`, ``, or `Cmd/Ctrl + K`
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '~' || e.key === '`') {
        e.preventDefault()
        sound.playCoin()
        setVaultTab('capsule')
        setVaultOpen(true)
      } else if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        sound.playCoin()
        setVaultTab('terminal')
        setVaultOpen(true)
      } else if (e.key === 'Escape') {
        setVaultOpen(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const handleOpenVault = (tab: 'capsule' | 'game' | 'terminal' = 'capsule') => {
    setVaultTab(tab)
    setVaultOpen(true)
  }

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="app-shell">
      {/* Background ambient lighting */}
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />
      <div className="ambient ambient-aws" />

      {/* Top Navigation */}
      <Navbar onOpenVault={() => handleOpenVault('capsule')} />

      {/* Main Content Sections */}
      <main>
        <Hero
          onOpenVault={handleOpenVault}
          onNavigate={scrollTo}
        />

        <About onOpenVault={handleOpenVault} />

        <Skills
          onOpenVault={handleOpenVault}
          onNavigate={scrollTo}
        />

        <Projects />

        <AwsArchitecture
          onOpenTerminal={() => handleOpenVault('terminal')}
        />

        <Achievements />
      </main>

      {/* Footer & Contact */}
      <Footer onOpenVault={handleOpenVault} />

      {/* Floating Interactive Badge (Visible Hint everywhere on page) */}
      <motion.button
        className="floating-vault-trigger"
        onClick={() => {
          sound.playCoin()
          handleOpenVault('capsule')
        }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        title="Open Yugank's Superpower Machine & Dev Console [~]"
        aria-label="Open Superpower Machine"
      >
        <span className="floating-sparkle">
          <Sparkles size={16} className="text-amber-300 animate-spin" style={{ animationDuration: '6s' }} />
        </span>
        <div className="text-left hidden sm:block">
          <span className="block text-xs font-bold text-white leading-tight">Secret Lore &amp; Mini-Game</span>
          <span className="text-[10px] text-amber-200/80 font-mono">Press ~ or click</span>
        </div>
        <span className="floating-keycap sm:hidden">~</span>
      </motion.button>

      {/* Creative Feature Modal Centerpiece */}
      <AnimatePresence>
        {vaultOpen && (
          <CreativeFeatureModal
            initialTab={vaultTab}
            onClose={() => setVaultOpen(false)}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

export default App
