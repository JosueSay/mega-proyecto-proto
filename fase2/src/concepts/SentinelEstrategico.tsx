import { useState } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'motion/react'
import { X, TrendingUp, TrendingDown, Minus, Award, BarChart3 } from 'lucide-react'
import { departments, type Department } from '@/data/mockData'
import { getSemaforoColor, cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'

function TendenciaIcon({ t }: { t: Department['tendencia'] }) {
  if (t === 'alza') return <TrendingUp className="size-3 text-sentinel-red" />
  if (t === 'baja') return <TrendingDown className="size-3 text-sentinel-green" />
  return <Minus className="size-3 text-muted-foreground" />
}

function RiskColor(riesgo: number) {
  if (riesgo <= 30) return '#107C41'
  if (riesgo <= 60) return '#D46B08'
  return '#C03A2B'
}

function DeptCard({ dept, isSelected, onClick }: {
  dept: Department
  isSelected: boolean
  onClick: () => void
}) {
  const color = RiskColor(dept.riesgo)
  const semaforo = getSemaforoColor(dept.riesgo)
  const intensity = dept.riesgo / 100

  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      className={cn(
        'rounded-xl border text-left p-4 space-y-3 transition-all duration-200 w-full',
        isSelected
          ? 'border-primary ring-1 ring-primary/30 shadow-lg'
          : 'border-border hover:shadow-md hover:border-primary/30'
      )}
      style={{
        background: isSelected
          ? undefined
          : `linear-gradient(135deg, hsl(var(--card)) 60%, ${color}${Math.round(intensity * 25).toString(16).padStart(2, '0')} 100%)`,
      }}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="font-semibold text-sm">{dept.nombre}</p>
          <p className="text-xs text-muted-foreground">{dept.tamano} personas</p>
        </div>
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold shadow"
          style={{ backgroundColor: color }}
        >
          {dept.riesgo}
        </div>
      </div>

      <div className="space-y-1.5">
        <div className="flex justify-between text-xs">
          <span className="text-muted-foreground">Riesgo organizacional</span>
          <span className="font-medium flex items-center gap-1">
            <TendenciaIcon t={dept.tendencia} />
            <span style={{ color }}>{dept.riesgo}%</span>
          </span>
        </div>
        <div className="h-2 rounded-full bg-muted overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-700"
            style={{ width: `${dept.riesgo}%`, backgroundColor: color }}
          />
        </div>
      </div>

      <div className="flex items-center justify-between">
        <Badge
          variant={semaforo === 'verde' ? 'success' : semaforo === 'ambar' ? 'warning' : 'danger'}
          className="text-[10px]"
        >
          {semaforo === 'verde' ? 'Verde' : semaforo === 'ambar' ? 'Ámbar' : 'Rojo'}
        </Badge>
        <p className="text-xs text-muted-foreground truncate max-w-[120px]">{dept.lider}</p>
      </div>
    </motion.button>
  )
}

function IntervencionRow({ int: i, index }: { int: Department['intervenciones'][0]; index: number }) {
  const impactoVariant = { alto: 'danger', medio: 'warning', bajo: 'secondary' } as const
  return (
    <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
      <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center shrink-0">
        {index + 1}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <p className="text-sm font-semibold">{i.nombre}</p>
          <Badge variant={impactoVariant[i.impacto]} className="text-[10px]">
            {i.impacto === 'alto' ? 'Alto impacto' : i.impacto === 'medio' ? 'Impacto medio' : 'Impacto bajo'}
          </Badge>
        </div>
        <p className="text-xs text-muted-foreground mt-0.5">{i.descripcion}</p>
      </div>
      <div className="text-right shrink-0">
        <span className="text-xs font-bold text-sentinel-green whitespace-nowrap">{i.roi}</span>
      </div>
    </div>
  )
}

function DeptPanel({ dept, onClose }: { dept: Department; onClose: () => void }) {
  const color = RiskColor(dept.riesgo)
  return (
    <motion.div
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ type: 'spring', damping: 30, stiffness: 280 }}
      className="fixed right-0 top-0 h-full w-full max-w-md bg-card border-l border-border shadow-2xl z-50 overflow-y-auto"
    >
      <div className="p-6 space-y-5">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-bold text-lg">{dept.nombre}</h3>
            <p className="text-sm text-muted-foreground">Líder: {dept.lider}</p>
            <p className="text-xs text-muted-foreground">{dept.tamano} colaboradores</p>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-md hover:bg-muted transition-colors">
            <X className="size-4" />
          </button>
        </div>

        <div className="flex items-center gap-4 rounded-xl border p-4 bg-muted/30">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-md"
            style={{ backgroundColor: color }}
          >
            {dept.riesgo}
          </div>
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium">Índice de Riesgo</p>
            <div className="flex items-center gap-2 mt-1">
              <TendenciaIcon t={dept.tendencia} />
              <span className="text-sm text-muted-foreground">
                {dept.tendencia === 'alza' ? 'Aumentando' : dept.tendencia === 'baja' ? 'Disminuyendo' : 'Estable'}
              </span>
            </div>
            <div className="h-2 w-32 rounded-full bg-secondary mt-2 overflow-hidden">
              <div
                className="h-full rounded-full"
                style={{ width: `${dept.riesgo}%`, backgroundColor: color }}
              />
            </div>
          </div>
        </div>

        <Separator />

        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Award className="size-4 text-primary" />
            <p className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">
              Motor Prescriptivo — 5 Intervenciones
            </p>
          </div>
          <p className="text-xs text-muted-foreground">
            Intervenciones priorizadas por algoritmo de ROI para el área de {dept.nombre}.
          </p>
          <div className="space-y-2">
            {dept.intervenciones.map((int, i) => (
              <IntervencionRow key={int.id} int={int} index={i} />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function SentinelEstrategico() {
  const [selectedDept, setSelectedDept] = useState<Department | null>(null)

  const rojos = departments.filter(d => d.riesgo > 60).length
  const ambar = departments.filter(d => d.riesgo > 30 && d.riesgo <= 60).length
  const verde = departments.filter(d => d.riesgo <= 30).length

  return (
    <div className="space-y-6 relative">
      {/* Stats + leyenda */}
      <div className="flex flex-wrap gap-4 items-center">
        <div className="flex items-center gap-2">
          <BarChart3 className="size-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Leyenda:</span>
        </div>
        <div className="flex gap-3 flex-wrap">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-sentinel-red" />
            <span className="text-sm">Rojo — {rojos} {rojos === 1 ? 'área' : 'áreas'}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-sentinel-amber" />
            <span className="text-sm">Ámbar — {ambar} {ambar === 1 ? 'área' : 'áreas'}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-sentinel-green" />
            <span className="text-sm">Verde — {verde} {verde === 1 ? 'área' : 'áreas'}</span>
          </div>
        </div>
        <p className="text-xs text-muted-foreground ml-auto">Haz clic en un área para ver intervenciones</p>
      </div>

      {/* Mapa de calor */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {departments.map((dept) => (
          <DeptCard
            key={dept.id}
            dept={dept}
            isSelected={selectedDept?.id === dept.id}
            onClick={() => setSelectedDept(selectedDept?.id === dept.id ? null : dept)}
          />
        ))}
      </div>

      {/* Panel lateral — portal para escapar del stacking context de Framer Motion */}
      {createPortal(
        <AnimatePresence>
          {selectedDept && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/40 z-40"
                onClick={() => setSelectedDept(null)}
              />
              <DeptPanel dept={selectedDept} onClose={() => setSelectedDept(null)} />
            </>
          )}
        </AnimatePresence>,
        document.body
      )}
    </div>
  )
}
