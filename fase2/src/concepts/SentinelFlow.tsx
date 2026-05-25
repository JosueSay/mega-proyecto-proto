import { useState } from 'react'
import { motion } from 'motion/react'
import {
  ArrowRight,
  AlertTriangle,
  Activity,
  Target,
  Zap,
  ChevronDown,
  ChevronUp,
} from 'lucide-react'
import { flowCandidates, type FlowCandidate } from '@/data/mockData'
import { getSemaforoHex, cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'

const pipelineSteps = [
  {
    icon: AlertTriangle,
    label: 'Score Rojo',
    desc: 'JD-R > 60',
    color: '#C03A2B',
  },
  {
    icon: Activity,
    label: 'Alerta a TyC',
    desc: 'Notificación automática',
    color: '#D46B08',
  },
  {
    icon: Zap,
    label: 'FLOW Activo',
    desc: 'Modelo predictivo RF',
    color: '#1E5CAA',
  },
  {
    icon: Target,
    label: 'Intervención focalizada',
    desc: 'P(renuncia 90d) → acción',
    color: '#107C41',
  },
]

function PipelineDiagram() {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base">Flujo de activación SENTINEL FLOW</CardTitle>
        <CardDescription>Proceso automático desde detección hasta intervención quirúrgica</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row items-stretch w-full gap-2 sm:gap-0">
          {pipelineSteps.map((step, i) => (
            <div key={step.label} className="flex flex-col sm:flex-row items-center sm:flex-1 gap-2 sm:gap-0">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.08 }}
                className="flex flex-col items-center gap-2 p-4 rounded-xl border bg-card text-center w-full"
                style={{ borderColor: step.color + '40' }}
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: step.color + '15' }}
                >
                  <step.icon className="size-5" style={{ color: step.color }} />
                </div>
                <p className="text-xs font-semibold leading-tight">{step.label}</p>
                <p className="text-[10px] text-muted-foreground">{step.desc}</p>
              </motion.div>
              {i < pipelineSteps.length - 1 && (
                <div className="flex justify-center sm:block shrink-0">
                  <ChevronDown className="size-4 text-muted-foreground sm:hidden" />
                  <ArrowRight className="size-4 text-muted-foreground hidden sm:block mx-2" />
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

function FlowStats() {
  const stats = [
    { label: 'Salidas estimadas/año', value: '165', unit: 'colaboradores', color: 'text-sentinel-red' },
    { label: 'Horizonte de predicción', value: '90', unit: 'días', color: 'text-primary' },
    { label: 'Precisión del modelo RF', value: '>90%', unit: 'IJSAT 2025', color: 'text-sentinel-green' },
  ]
  return (
    <div className="grid grid-cols-3 gap-3">
      {stats.map(s => (
        <Card key={s.label} className="card-hover">
          <CardContent className="p-4 text-center">
            <p className={cn('text-2xl font-bold', s.color)}>{s.value}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{s.unit}</p>
            <p className="text-xs font-medium mt-1">{s.label}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

function ProbabilityBar({ value }: { value: number }) {
  const pct = Math.round(value * 100)
  let color = '#107C41'
  if (pct > 70) color = '#C03A2B'
  else if (pct > 50) color = '#D46B08'
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-2.5 rounded-full bg-muted overflow-hidden min-w-[80px]">
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{ width: `${pct}%`, backgroundColor: color }}
        />
      </div>
      <span className="text-sm font-bold tabular-nums" style={{ color }}>{pct}%</span>
    </div>
  )
}

function CandidateRow({
  candidate,
  rank,
  isSelected,
  onClick,
}: {
  candidate: FlowCandidate
  rank: number
  isSelected: boolean
  onClick: () => void
}) {
  const priority = rank <= 3
  const pct = Math.round(candidate.probabilidadRenuncia * 100)

  return (
    <>
      <tr
        className={cn(
          'cursor-pointer transition-colors',
          !isSelected && 'border-b border-border/50',
          isSelected ? 'bg-primary/5' : 'hover:bg-muted/30',
          priority && !isSelected && 'bg-sentinel-red/5',
          priority && isSelected && 'bg-primary/5'
        )}
        onClick={onClick}
      >
        <td className="p-3">
          <div className="flex items-center gap-2">
            <div
              className={cn(
                'w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold',
                priority
                  ? 'bg-sentinel-red text-white'
                  : 'bg-muted text-muted-foreground'
              )}
            >
              {rank}
            </div>
            {priority && (
              <Badge variant="danger" className="text-[10px]">
                Intervención quirúrgica
              </Badge>
            )}
          </div>
        </td>
        <td className="p-3">
          <p className="font-medium text-sm">{candidate.nombre}</p>
          <p className="text-xs text-muted-foreground">{candidate.puesto}</p>
        </td>
        <td className="p-3">
          <span
            className="text-sm font-bold"
            style={{ color: getSemaforoHex(candidate.score) }}
          >
            {candidate.score}
          </span>
        </td>
        <td className="p-3 min-w-[140px]">
          <ProbabilityBar value={candidate.probabilidadRenuncia} />
        </td>
        <td className="p-3">
          <span className="text-xs text-muted-foreground">{candidate.diasEnRojo}d</span>
        </td>
        <td className="p-3">
          {isSelected ? (
            <ChevronUp className="size-4 text-muted-foreground" />
          ) : (
            <ChevronDown className="size-4 text-muted-foreground" />
          )}
        </td>
      </tr>
      <tr className={cn(isSelected && 'border-b border-border/50')}>
        <td colSpan={6} className="p-0">
          <motion.div
            initial={false}
            animate={{ height: isSelected ? 'auto' : 0, opacity: isSelected ? 1 : 0 }}
            transition={{ duration: 0.28, ease: [0.04, 0.62, 0.23, 0.98] }}
            style={{ overflow: 'hidden' }}
          >
            <div className="px-3 pt-3 pb-3">
              <div className="rounded-lg border border-primary/20 bg-primary/5 p-3 ml-8 space-y-1">
                <p className="text-xs font-semibold uppercase tracking-wide text-primary">
                  Intervención recomendada por SENTINEL FLOW
                </p>
                <p className="text-sm">{candidate.intervencionRecomendada}</p>
                <p className="text-xs text-muted-foreground">
                  P(renuncia 90d) = {pct}% — {candidate.diasEnRojo} días en estado Rojo
                </p>
              </div>
            </div>
          </motion.div>
        </td>
      </tr>
    </>
  )
}

export default function SentinelFlow() {
  const [selectedId, setSelectedId] = useState<string | null>(flowCandidates[0].id)

  const sorted = [...flowCandidates].sort((a, b) => b.probabilidadRenuncia - a.probabilidadRenuncia)

  return (
    <div className="space-y-6">
      <FlowStats />
      <PipelineDiagram />

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Target className="size-4 text-primary" />
            Candidatos prioritarios — P(renuncia 90d)
          </CardTitle>
          <CardDescription>
            Empleados en estado Rojo ordenados por probabilidad de renuncia predicha por Random Forest.
            Haz clic en una fila para ver la intervención recomendada.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="text-left p-3 font-medium text-muted-foreground">Prioridad</th>
                  <th className="text-left p-3 font-medium text-muted-foreground">Empleado</th>
                  <th className="text-left p-3 font-medium text-muted-foreground">Score</th>
                  <th className="text-left p-3 font-medium text-muted-foreground">P(renuncia)</th>
                  <th className="text-left p-3 font-medium text-muted-foreground">Días en Rojo</th>
                  <th className="p-3" />
                </tr>
              </thead>
              <tbody>
                {sorted.map((candidate, i) => (
                  <CandidateRow
                    key={candidate.id}
                    candidate={candidate}
                    rank={i + 1}
                    isSelected={selectedId === candidate.id}
                    onClick={() =>
                      setSelectedId(selectedId === candidate.id ? null : candidate.id)
                    }
                  />
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

    </div>
  )
}
