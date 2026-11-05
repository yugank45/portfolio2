import React, { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  X,
  Sparkles,
  Command,
  Cloud,
  Gamepad2,
  Terminal,
  Trophy,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Flame,
  Award,
  ChevronRight,
  Send,
  HelpCircle,
} from 'lucide-react'
import { storyCapsules, awsQuizQuestions, terminalCommands, personalInfo } from '../data/portfolioData'
import { StoryCapsule } from '../types'
import { sound } from '../utils/audio'
import { triggerConfetti } from '../utils/confetti'

interface CreativeFeatureModalProps {
  initialTab?: 'capsule' | 'game' | 'terminal'
  onClose: () => void
}

export function CreativeFeatureModal({ initialTab = 'capsule', onClose }: CreativeFeatureModalProps) {
  const [activeTab, setActiveTab] = useState<'capsule' | 'game' | 'terminal'>(initialTab)

  // -------------------------------------------------------------
  // TAB 1: CAPSULE VENDING MACHINE STATE
  // -------------------------------------------------------------
  const [unlockedCapsules, setUnlockedCapsules] = useState<number[]>([1]) // start with first unlocked
  const [activeCapsule, setActiveCapsule] = useState<StoryCapsule>(storyCapsules[0])
  const [isDispensing, setIsDispensing] = useState(false)

  const dispenseNextCapsule = () => {
    if (isDispensing) return
    setIsDispensing(true)
    sound.playCoin()

    setTimeout(() => {
      // Pick next uncollected capsule or random
      const remaining = storyCapsules.filter((c) => !unlockedCapsules.includes(c.id))
      const nextCapsule = remaining.length > 0 ? remaining[0] : storyCapsules[Math.floor(Math.random() * storyCapsules.length)]

      setActiveCapsule(nextCapsule)
      if (!unlockedCapsules.includes(nextCapsule.id)) {
        const updated = [...unlockedCapsules, nextCapsule.id]
        setUnlockedCapsules(updated)
        if (updated.length === storyCapsules.length) {
          triggerConfetti()
          sound.playSuccess()
        } else {
          sound.playPop()
        }
      } else {
        sound.playPop()
      }

      setIsDispensing(false)
    }, 600)
  }

  // -------------------------------------------------------------
  // TAB 2: AWS ROUTING MINI-GAME STATE
  // -------------------------------------------------------------
  const [questionIdx, setQuestionIdx] = useState(0)
  const [score, setScore] = useState(0)
  const [streak, setStreak] = useState(0)
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [gameOver, setGameOver] = useState(false)

  const currentQ = awsQuizQuestions[questionIdx]

  const handleOptionSelect = (optIdx: number) => {
    if (selectedOption !== null || gameOver) return
    setSelectedOption(optIdx)

    const isCorrect = currentQ.options[optIdx].correct
    if (isCorrect) {
      sound.playSuccess()
      setScore((s) => s + 100 + streak * 25)
      setStreak((st) => st + 1)
    } else {
      sound.playError()
      setStreak(0)
    }

    setTimeout(() => {
      if (questionIdx + 1 < awsQuizQuestions.length) {
        setQuestionIdx((q) => q + 1)
        setSelectedOption(null)
      } else {
        setGameOver(true)
        triggerConfetti()
      }
    }, 1200)
  }

  const restartQuiz = () => {
    setQuestionIdx(0)
    setScore(0)
    setStreak(0)
    setSelectedOption(null)
    setGameOver(false)
    sound.playPop()
  }

  // -------------------------------------------------------------
  // TAB 3: YUGANK.EXE TERMINAL STATE
  // -------------------------------------------------------------
  const [lines, setLines] = useState<string[]>([
    'Yugank.exe v2.1.0 — AWS Builder Dev Console',
    'Interactive Shell connected. Type "help" to list available commands.',
    'Try: "about", "skills", "aws", "capsule", "game", "matrix", or "contact".',
    '',
  ])
  const [termInput, setTermInput] = useState('')
  const [history, setHistory] = useState<string[]>([])
  const [historyIdx, setHistoryIdx] = useState(-1)
  const [isMatrixMode, setIsMatrixMode] = useState(false)
  const termEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (activeTab === 'terminal') {
      inputRef.current?.focus()
    }
  }, [activeTab])

  useEffect(() => {
    termEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [lines])

  const submitTerm = (e?: React.FormEvent) => {
    e?.preventDefault()
    const cmd = termInput.trim().toLowerCase()
    if (!cmd) return

    const nextLines = [...lines, `visitor@yugank:~$ ${cmd}`]

    if (cmd === 'clear') {
      setLines([])
    } else if (cmd === 'matrix') {
      setIsMatrixMode(!isMatrixMode)
      setLines([...nextLines, `[Matrix Mode ${!isMatrixMode ? 'ENABLED' : 'DISABLED'}]`, ''])
      sound.playSuccess()
    } else if (cmd === 'capsule') {
      dispenseNextCapsule()
      setActiveTab('capsule')
    } else if (cmd === 'game') {
      restartQuiz()
      setActiveTab('game')
    } else if (terminalCommands[cmd]) {
      setLines([...nextLines, ...terminalCommands[cmd], ''])
      sound.playPop()
    } else {
      setLines([
        ...nextLines,
        `command not found: "${cmd}"`,
        'Type "help" to see all valid commands.',
        '',
      ])
      sound.playError()
    }

    setHistory((prev) => [cmd, ...prev.filter((c) => c !== cmd)])
    setHistoryIdx(-1)
    setTermInput('')
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      const next = history[Math.min(historyIdx + 1, history.length - 1)]
      if (next) {
        setTermInput(next)
        setHistoryIdx(historyIdx + 1)
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      const nextIdx = Math.max(historyIdx - 1, -1)
      setHistoryIdx(nextIdx)
      setTermInput(nextIdx === -1 ? '' : history[nextIdx])
    }
  }

  return (
    <motion.div
      className="vault-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className={`vault-window ${isMatrixMode ? 'matrix-theme' : ''}`}
        initial={{ y: 24, scale: 0.98 }}
        animate={{ y: 0, scale: 1 }}
        exit={{ y: 24, scale: 0.98 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Control Bar */}
        <div className="vault-topbar">
          <div className="vault-dots">
            <span className="dot-red" onClick={onClose} />
            <span className="dot-yellow" />
            <span className="dot-green" />
          </div>

          {/* Mode Switcher Tabs */}
          <div className="vault-tabs">
            <button
              className={`vault-tab ${activeTab === 'capsule' ? 'active' : ''}`}
              onClick={() => {
                sound.playPop()
                setActiveTab('capsule')
              }}
            >
              <Sparkles size={14} className="text-amber-400" />
              <span>Story Dispenser</span>
              <span className="vault-badge">{unlockedCapsules.length}/5</span>
            </button>

            <button
              className={`vault-tab ${activeTab === 'game' ? 'active' : ''}`}
              onClick={() => {
                sound.playPop()
                setActiveTab('game')
              }}
            >
              <Gamepad2 size={14} className="text-sky-400" />
              <span>AWS Mini-Game</span>
            </button>

            <button
              className={`vault-tab ${activeTab === 'terminal' ? 'active' : ''}`}
              onClick={() => {
                sound.playPop()
                setActiveTab('terminal')
              }}
            >
              <Terminal size={14} className="text-purple-400" />
              <span>yugank.exe</span>
            </button>
          </div>

          <button className="vault-close-btn" onClick={onClose} aria-label="Close interactive vault">
            <X size={17} />
          </button>
        </div>

        {/* ===================================================== */}
        {/* TAB 1: CAPSULE STORY VENDING MACHINE */}
        {/* ===================================================== */}
        {activeTab === 'capsule' && (
          <div className="capsule-vending-pane">
            <div className="vending-sidebar">
              <div className="mb-4">
                <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400 block mb-1">
                  Unique Personal Lore
                </span>
                <h3 className="text-sm font-bold text-white">Superpower Capsules</h3>
                <p className="text-[11px] text-neutral-400 mt-1 leading-relaxed">
                  Dispense virtual capsules to reveal unfiltered stories about Yugank&apos;s real-world engineering experiences.
                </p>
              </div>

              {/* Progress Tracker */}
              <div className="capsule-progress-card">
                <div className="flex justify-between items-center text-xs mb-1 font-mono">
                  <span className="text-neutral-400">Capsules Unlocked</span>
                  <span className="text-amber-400 font-bold">{unlockedCapsules.length} / 5</span>
                </div>
                <div className="progress-bar-bg">
                  <div
                    className="progress-bar-fill"
                    style={{ width: `${(unlockedCapsules.length / 5) * 100}%` }}
                  />
                </div>
                {unlockedCapsules.length === 5 && (
                  <div className="flex items-center gap-1.5 text-[11px] text-emerald-400 font-mono mt-2">
                    <Trophy size={13} />
                    <span>Master AWS Explorer Badge Unlocked!</span>
                  </div>
                )}
              </div>

              {/* Dispenser Action Button */}
              <button
                onClick={dispenseNextCapsule}
                disabled={isDispensing}
                className="dispense-coin-btn group"
              >
                <div className="coin-slot-icon">
                  <Sparkles size={16} className={isDispensing ? 'animate-spin' : ''} />
                </div>
                <div className="text-left">
                  <span className="block font-bold text-xs">
                    {isDispensing ? 'Cracking Capsule...' : 'Drop Coin & Dispense'}
                  </span>
                  <span className="text-[10px] text-amber-200/70 font-mono">
                    {unlockedCapsules.length < 5
                      ? `${5 - unlockedCapsules.length} more remaining`
                      : 'Re-roll random lore'}
                  </span>
                </div>
              </button>

              {/* Unlocked Capsule Quick-list */}
              <div className="mt-4">
                <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-500 block mb-2">
                  Collection Shelf
                </span>
                <div className="space-y-1.5">
                  {storyCapsules.map((cap) => {
                    const isUnlocked = unlockedCapsules.includes(cap.id)
                    const isCurrent = activeCapsule.id === cap.id
                    return (
                      <button
                        key={cap.id}
                        disabled={!isUnlocked}
                        onClick={() => {
                          if (isUnlocked) {
                            sound.playPop()
                            setActiveCapsule(cap)
                          }
                        }}
                        className={`capsule-shelf-item ${isCurrent ? 'active' : ''} ${
                          !isUnlocked ? 'locked' : ''
                        }`}
                      >
                        <span className="shelf-num font-mono text-[10px]">0{cap.id}</span>
                        <span className="shelf-title text-xs truncate">
                          {isUnlocked ? cap.title : '??? (Locked Capsule)'}
                        </span>
                        {isUnlocked ? (
                          <span className="rarity-dot" style={{ backgroundColor: cap.color }} />
                        ) : (
                          <span className="text-[10px] text-neutral-600">🔒</span>
                        )}
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* Capsule Display Card */}
            <div className="capsule-display-area">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCapsule.id}
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.94 }}
                  transition={{ duration: 0.25 }}
                  className="capsule-story-card"
                  style={{
                    borderColor: `${activeCapsule.color}50`,
                    boxShadow: `0 0 40px ${activeCapsule.color}15`,
                  }}
                >
                  <div className="capsule-card-header">
                    <div className="flex items-center gap-2">
                      <span
                        className="rarity-pill font-mono"
                        style={{
                          backgroundColor: `${activeCapsule.color}20`,
                          color: activeCapsule.color,
                          borderColor: `${activeCapsule.color}40`,
                        }}
                      >
                        {activeCapsule.rarity} Capsule #0{activeCapsule.id}
                      </span>
                      <span className="text-xs text-neutral-500">/</span>
                      <span className="text-xs text-neutral-400 font-mono">
                        {activeCapsule.category}
                      </span>
                    </div>

                    <div className="superpower-tag">
                      <Sparkles size={12} className="text-amber-400" />
                      <span>{activeCapsule.superpower}</span>
                    </div>
                  </div>

                  <h3 className="capsule-title">{activeCapsule.title}</h3>

                  <div className="capsule-body">
                    <p className="capsule-story-text">{activeCapsule.story}</p>

                    <div className="capsule-lesson-box">
                      <strong className="text-xs font-mono uppercase tracking-wider text-amber-400 block mb-1">
                        Core Takeaway
                      </strong>
                      <p className="text-xs text-neutral-300 italic leading-relaxed">
                        &ldquo;{activeCapsule.lesson}&rdquo;
                      </p>
                    </div>
                  </div>

                  <div className="capsule-card-footer">
                    <span className="text-[10px] text-neutral-500 font-mono">
                      Yugank Singh Verified Lore · AWS Builder 2026
                    </span>
                    <button
                      onClick={dispenseNextCapsule}
                      className="text-xs text-amber-400 hover:text-amber-300 font-mono flex items-center gap-1"
                    >
                      <span>Next Capsule</span>
                      <ChevronRight size={14} />
                    </button>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        )}

        {/* ===================================================== */}
        {/* TAB 2: AWS ROUTING MINI-GAME */}
        {/* ===================================================== */}
        {activeTab === 'game' && (
          <div className="game-pane">
            {!gameOver ? (
              <div className="quiz-container">
                <div className="quiz-header">
                  <div className="flex items-center gap-2">
                    <Cloud size={16} className="text-amber-400" />
                    <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                      AWS Cloud Routing Challenge
                    </span>
                    <span className="text-xs text-neutral-500 font-mono">
                      Question {questionIdx + 1} of {awsQuizQuestions.length}
                    </span>
                  </div>

                  <div className="flex items-center gap-4 text-xs font-mono">
                    <span className="text-amber-400 font-bold">Score: {score}</span>
                    {streak > 1 && (
                      <span className="flex items-center gap-1 text-orange-400 animate-pulse font-bold">
                        <Flame size={13} /> {streak}x Streak
                      </span>
                    )}
                  </div>
                </div>

                <div className="quiz-scenario-box">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 block mb-1">
                    Incoming Architecture Scenario:
                  </span>
                  <p className="text-sm md:text-base font-semibold text-white leading-relaxed">
                    {currentQ.scenario}
                  </p>
                </div>

                <div className="quiz-options-list">
                  {currentQ.options.map((opt, idx) => {
                    let btnStyle = 'quiz-option-btn'
                    if (selectedOption !== null) {
                      if (opt.correct) btnStyle += ' correct'
                      else if (selectedOption === idx) btnStyle += ' wrong'
                      else btnStyle += ' dimmed'
                    }

                    return (
                      <button
                        key={opt.service}
                        disabled={selectedOption !== null}
                        onClick={() => handleOptionSelect(idx)}
                        className={btnStyle}
                      >
                        <div className="flex items-center justify-between w-full">
                          <span className="font-bold text-xs md:text-sm">{opt.label}</span>
                          {selectedOption !== null && opt.correct && (
                            <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
                          )}
                          {selectedOption === idx && !opt.correct && (
                            <AlertCircle size={16} className="text-rose-400 shrink-0" />
                          )}
                        </div>
                        {selectedOption !== null && (opt.correct || selectedOption === idx) && (
                          <p className="text-[11px] text-neutral-300 mt-2 font-mono text-left leading-relaxed">
                            {opt.reason}
                          </p>
                        )}
                      </button>
                    )
                  })}
                </div>
              </div>
            ) : (
              <div className="game-result-card">
                <div className="text-center py-6">
                  <div className="inline-flex p-3 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/40 mb-3">
                    <Trophy size={36} />
                  </div>
                  <h3 className="text-xl font-bold text-white">Challenge Completed!</h3>
                  <p className="text-xs text-neutral-400 mt-1">
                    You routed production AWS traffic like a seasoned cloud architect.
                  </p>

                  <div className="score-summary-pill mt-4 mb-6">
                    <span className="text-xs font-mono text-neutral-400">Total Score:</span>
                    <strong className="text-2xl text-amber-400 font-mono ml-2">{score} pts</strong>
                  </div>

                  <div className="p-4 bg-neutral-900 border border-neutral-800 rounded-lg max-w-md mx-auto text-left mb-6">
                    <span className="text-[10px] font-mono uppercase text-emerald-400 block mb-1">
                      Architectural Verdict:
                    </span>
                    <p className="text-xs text-neutral-300 leading-relaxed">
                      {score >= 400
                        ? '🌟 AWS Cloud Legend: You understand Amplify hosting, S3 storage, CloudFront CDN, and Lambda serverless patterns with flawless accuracy!'
                        : '⚡ AWS Apprentice: Great instincts! Review the AWS Architecture tab on this portfolio to master edge CDN distribution and CI/CD.'}
                    </p>
                  </div>

                  <button onClick={restartQuiz} className="button button-primary text-xs">
                    <RefreshCw size={14} /> Play Again
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ===================================================== */}
        {/* TAB 3: YUGANK.EXE DEV CONSOLE (TERMINAL) */}
        {/* ===================================================== */}
        {activeTab === 'terminal' && (
          <div className="terminal-pane">
            <div className="terminal-body" onClick={() => inputRef.current?.focus()}>
              {lines.map((line, idx) => (
                <div
                  key={`${line}-${idx}`}
                  className={line.startsWith('visitor') ? 'terminal-prompt' : 'terminal-line'}
                >
                  {line || '\u00a0'}
                </div>
              ))}
              <div ref={termEndRef} />

              <form onSubmit={submitTerm} className="terminal-input-row">
                <span className="prompt-label">visitor@yugank:~$</span>
                <input
                  ref={inputRef}
                  value={termInput}
                  onChange={(e) => setTermInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="terminal-input"
                  autoComplete="off"
                  spellCheck="false"
                  aria-label="Terminal command input"
                />
                <span className="cursor-block" />
              </form>
            </div>

            <div className="terminal-bottom-bar">
              <span className="text-[10px] font-mono text-neutral-500">
                Commands: help · about · skills · aws · capsule · game · matrix · contact · clear
              </span>
              <div className="flex items-center gap-3 text-[10px] font-mono text-neutral-500">
                <span>↑↓ history</span>
                <span>esc close</span>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  )
}

