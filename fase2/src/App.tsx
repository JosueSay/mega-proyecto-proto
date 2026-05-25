import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Moon, Sun, Shield } from 'lucide-react'
import { cn } from '@/lib/utils'
import SentinelOperativo from '@/concepts/SentinelOperativo'
import SentinelGerencial from '@/concepts/SentinelGerencial'
import SentinelEstrategico from '@/concepts/SentinelEstrategico'
import SentinelFlow from '@/concepts/SentinelFlow'
import SentinelMobility from '@/concepts/SentinelMobility'

type Concept = 'operativo' | 'gerencial' | 'estrategico' | 'flow' | 'mobility'

const concepts: { key: Concept; code: string; label: string; color: string }[] = [
  { key: 'operativo', code: 'C01', label: 'Sentinel Operativo', color: 'text-sentinel-blue' },
  { key: 'gerencial', code: 'C02', label: 'Sentinel Gerencial', color: 'text-sentinel-navy' },
  { key: 'estrategico', code: 'C03', label: 'Sentinel Estratégico', color: 'text-primary' },
  { key: 'flow', code: 'C04', label: 'SENTINEL FLOW', color: 'text-sentinel-amber' },
  { key: 'mobility', code: 'C05', label: 'SENTINEL MOBILITY', color: 'text-sentinel-green' },
]

const conceptDescriptions: Record<Concept, string> = {
  operativo: 'Score JD-R 0–100 por colaborador con semáforo verde/ámbar/rojo y detección temprana de burnout individual.',
  gerencial: 'Modelo de burnout del líder y efecto cascada al equipo. Visibilidad estratégica para TyC.',
  estrategico: 'Mapa de calor organizacional por VP/área con motor prescriptivo de 5 intervenciones priorizadas.',
  flow: 'Predicción de renuncia P(renuncia 90d) por colaborador usando Random Forest con >90% de precisión.',
  mobility: 'Commute Friction Index + recomendación de modalidad laboral personalizada por perfil de traslado.',
}

function ConceptComponent({ concept }: { concept: Concept }) {
  switch (concept) {
    case 'operativo': return <SentinelOperativo />
    case 'gerencial': return <SentinelGerencial />
    case 'estrategico': return <SentinelEstrategico />
    case 'flow': return <SentinelFlow />
    case 'mobility': return <SentinelMobility />
  }
}

export default function App() {
  const [activeConcept, setActiveConcept] = useState<Concept>('operativo')
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    const html = document.documentElement
    if (darkMode) {
      html.classList.add('dark')
    } else {
      html.classList.remove('dark')
    }
  }, [darkMode])

  const current = concepts.find(c => c.key === activeConcept)!

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="gradient-navy w-9 h-9 rounded-xl flex items-center justify-center shadow-md">
                <Shield className="size-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg sm:text-xl font-extrabold tracking-tight bg-gradient-to-r from-sentinel-navy to-sentinel-blue bg-clip-text text-transparent dark:from-blue-300 dark:to-blue-100">
                  SENTINEL
                </h1>
                <p className="text-[10px] text-muted-foreground leading-none font-medium">
                  BAM × UVG · 2026
                </p>
              </div>
            </div>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-lg border border-border bg-card hover:bg-muted transition-colors"
              aria-label="Cambiar tema"
            >
              {darkMode ? <Sun className="size-4" /> : <Moon className="size-4" />}
            </button>
          </div>
        </div>
      </header>

      {/* Concept selector */}
      <nav className="border-b border-border bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex gap-1 overflow-x-auto py-2 scrollbar-none" style={{ scrollbarWidth: 'none' }}>
            {concepts.map((c) => {
              const isActive = c.key === activeConcept
              return (
                <button
                  key={c.key}
                  onClick={() => setActiveConcept(c.key)}
                  className={cn(
                    'flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all duration-200 relative',
                    isActive
                      ? 'bg-primary text-primary-foreground shadow-sm'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  )}
                >
                  <span
                    className={cn(
                      'text-[10px] font-bold rounded px-1 py-0.5',
                      isActive
                        ? 'bg-white/20 text-white'
                        : 'bg-muted text-muted-foreground'
                    )}
                  >
                    {c.code}
                  </span>
                  <span>{c.label}</span>
                </button>
              )
            })}
          </div>
        </div>
      </nav>

      {/* Concept header */}
      <div className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-start gap-3">
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-bold text-muted-foreground bg-muted px-2 py-0.5 rounded">
                  {current.code}
                </span>
                <h2 className={cn('text-xl font-bold', current.color)}>{current.label}</h2>
              </div>
              <p className="text-sm text-muted-foreground mt-1 max-w-2xl">
                {conceptDescriptions[activeConcept]}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 py-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeConcept}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
          >
            <ConceptComponent concept={activeConcept} />
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card/50 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              <Shield className="size-3" />
              <span>Prototipo · R3VOLUTION TyC · Fase 2 · 2026</span>
            </div>
            <div className="flex items-center gap-2">
              <span>BAM — Banco Agromercantil de Guatemala</span>
              <span>·</span>
              <span>Universidad del Valle de Guatemala</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
