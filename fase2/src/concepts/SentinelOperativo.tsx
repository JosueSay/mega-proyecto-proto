import { useState } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'motion/react'
import {
  TrendingUp,
  TrendingDown,
  Minus,
  X,
  AlertTriangle,
  Users,
  Activity,
  ArrowRight,
  Zap,
} from 'lucide-react'
import { employees, type Employee } from '@/data/mockData'
import { getSemaforoColor, getSemaforoHex, cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog'

type Filtro = 'todos' | 'verde' | 'ambar' | 'rojo'

function ScoreBar({ score }: { score: number }) {
  const color = getSemaforoHex(score)
  return (
    <div className="flex items-center gap-2 min-w-[120px]">
      <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{ width: `${score}%`, backgroundColor: color }}
        />
      </div>
      <span className="text-sm font-bold tabular-nums" style={{ color }}>
        {score}
      </span>
    </div>
  )
}

function SemaforoBadge({ score }: { score: number }) {
  const s = getSemaforoColor(score)
  const labels = { verde: 'Verde', ambar: 'Ámbar', rojo: 'Rojo' }
  const variants = { verde: 'success', ambar: 'warning', rojo: 'danger' } as const
  return <Badge variant={variants[s]}>{labels[s]}</Badge>
}

function TendenciaIcon({ t }: { t: Employee['tendencia'] }) {
  if (t === 'alza') return <TrendingUp className="size-4 text-sentinel-red" />
  if (t === 'baja') return <TrendingDown className="size-4 text-sentinel-green" />
  return <Minus className="size-4 text-muted-foreground" />
}

function MiniChart({ historial }: { historial: number[] }) {
  const max = 100
  const w = 80
  const h = 36
  const pts = historial.map((v, i) => {
    const x = (i / (historial.length - 1)) * w
    const y = h - (v / max) * h
    return `${x},${y}`
  }).join(' ')
  const lastScore = historial[historial.length - 1]
  const color = getSemaforoHex(lastScore)
  return (
    <svg width={w} height={h} className="overflow-visible">
      <polyline
        points={pts}
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {historial.map((v, i) => (
        <circle
          key={i}
          cx={(i / (historial.length - 1)) * w}
          cy={h - (v / max) * h}
          r="3"
          fill={color}
        />
      ))}
    </svg>
  )
}

function DetailPanel({ emp, onClose, onActivateFlow }: { emp: Employee; onClose: () => void; onActivateFlow: (e: Employee) => void }) {
  return (
    <motion.div
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ type: 'spring', damping: 30, stiffness: 280 }}
      className="fixed right-0 top-0 h-full w-full max-w-sm bg-card border-l border-border shadow-2xl z-50 overflow-y-auto"
    >
      <div className="p-6 space-y-5">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-bold text-base leading-tight">{emp.nombre}</h3>
            <p className="text-sm text-muted-foreground mt-0.5">{emp.puesto}</p>
            <p className="text-xs text-muted-foreground">{emp.agencia}</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-md hover:bg-muted transition-colors"
          >
            <X className="size-4" />
          </button>
        </div>

        <div className="flex items-center gap-3">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center text-white text-2xl font-bold"
            style={{ backgroundColor: getSemaforoHex(emp.score) }}
          >
            {emp.score}
          </div>
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium">Score JD-R</p>
            <SemaforoBadge score={emp.score} />
            <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
              <TendenciaIcon t={emp.tendencia} />
              {emp.tendencia === 'alza' ? 'En aumento' : emp.tendencia === 'baja' ? 'En descenso' : 'Estable'}
            </p>
          </div>
        </div>

        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Desglose JD-R</p>
          <div className="space-y-2">
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-muted-foreground">Demandas laborales</span>
                <span className="font-medium text-sentinel-red">{emp.demandas}</span>
              </div>
              <Progress value={emp.demandas} indicatorClassName="bg-sentinel-red" />
            </div>
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-muted-foreground">Recursos disponibles</span>
                <span className="font-medium text-sentinel-green">{emp.recursos}</span>
              </div>
              <Progress value={emp.recursos} indicatorClassName="bg-sentinel-green" />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Indicadores clave</p>
          <div className="grid grid-cols-3 gap-2">
            <div className="rounded-md bg-muted p-2 text-center">
              <p className="text-xs text-muted-foreground">Sin vacac.</p>
              <p className="font-bold text-sm">{emp.diasSinVacaciones}d</p>
            </div>
            <div className="rounded-md bg-muted p-2 text-center">
              <p className="text-xs text-muted-foreground">Ausentismo</p>
              <p className="font-bold text-sm">{emp.ausentismoMes}d/m</p>
            </div>
            <div className="rounded-md bg-muted p-2 text-center">
              <p className="text-xs text-muted-foreground">Hrs extra</p>
              <p className="font-bold text-sm">{emp.horasExtra}h</p>
            </div>
          </div>
        </div>

        {emp.factoresRiesgo.length > 0 && (
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground flex items-center gap-1">
              <AlertTriangle className="size-3 text-sentinel-red" />
              Factores de riesgo
            </p>
            <ul className="space-y-1.5">
              {emp.factoresRiesgo.map((f, i) => (
                <li key={i} className="text-xs flex items-start gap-2">
                  <span className="mt-1 size-1.5 rounded-full bg-sentinel-red shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Evolución (3 meses)</p>
          <div className="flex items-end gap-2">
            <MiniChart historial={emp.historial} />
            <div className="text-xs text-muted-foreground space-y-0.5">
              {emp.historial.map((v, i) => (
                <div key={i}>M-{emp.historial.length - 1 - i}: <span className="font-medium">{v}</span></div>
              ))}
            </div>
          </div>
        </div>

        {emp.semaforo === 'rojo' && (
          <Button
            className="w-full bg-sentinel-red hover:bg-sentinel-red/90 text-white"
            onClick={() => onActivateFlow(emp)}
          >
            Activar SENTINEL FLOW
            <ArrowRight className="size-4" />
          </Button>
        )}
      </div>
    </motion.div>
  )
}

export default function SentinelOperativo() {
  const [filtro, setFiltro] = useState<Filtro>('todos')
  const [selected, setSelected] = useState<Employee | null>(null)
  const [flowModal, setFlowModal] = useState<Employee | null>(null)

  const rojos = employees.filter(e => e.semaforo === 'rojo').length
  const ambar = employees.filter(e => e.semaforo === 'ambar').length
  const verde = employees.filter(e => e.semaforo === 'verde').length

  const filtered = filtro === 'todos' ? employees : employees.filter(e => e.semaforo === filtro)

  const stats = [
    { icon: Users, label: 'Total empleados', value: '1,100', sub: 'activos BAM GT', color: 'text-primary' },
    { icon: AlertTriangle, label: 'En Rojo', value: rojos.toString(), sub: 'requieren intervención urgente', color: 'text-sentinel-red' },
    { icon: Activity, label: 'En Ámbar', value: ambar.toString(), sub: 'seguimiento preventivo', color: 'text-sentinel-amber' },
  ]

  const filtros: { key: Filtro; label: string }[] = [
    { key: 'todos', label: `Todos (${employees.length})` },
    { key: 'verde', label: `Verde (${verde})` },
    { key: 'ambar', label: `Ámbar (${ambar})` },
    { key: 'rojo', label: `Rojo (${rojos})` },
  ]

  return (
    <div className="space-y-6 relative">
      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {stats.map((s) => (
          <Card key={s.label} className="card-hover">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <s.icon className={cn('size-4', s.color)} />
                <span className="text-xs text-muted-foreground font-medium">{s.label}</span>
              </div>
              <p className={cn('text-2xl font-bold', s.color)}>{s.value}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{s.sub}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filtros */}
      <div className="flex gap-2 flex-wrap">
        {filtros.map((f) => (
          <button
            key={f.key}
            onClick={() => setFiltro(f.key)}
            className={cn(
              'px-4 py-1.5 rounded-full text-sm font-medium transition-all border',
              filtro === f.key
                ? 'bg-primary text-primary-foreground border-primary shadow-sm'
                : 'bg-muted text-muted-foreground border-transparent hover:border-border hover:text-foreground'
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Tabla */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Empleados — Score JD-R Sentinel</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="text-left p-3 font-medium text-muted-foreground">Nombre</th>
                  <th className="text-left p-3 font-medium text-muted-foreground hidden md:table-cell">Puesto</th>
                  <th className="text-left p-3 font-medium text-muted-foreground hidden lg:table-cell">Agencia</th>
                  <th className="text-left p-3 font-medium text-muted-foreground">Score</th>
                  <th className="text-left p-3 font-medium text-muted-foreground">Semáforo</th>
                  <th className="text-center p-3 font-medium text-muted-foreground">Tend.</th>
                  <th className="text-left p-3 font-medium text-muted-foreground">Acción</th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence mode="popLayout">
                  {filtered.map((emp) => (
                    <motion.tr
                      key={emp.id}
                      layout
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className={cn(
                        'border-b border-border/50 hover:bg-muted/30 transition-colors',
                        selected?.id === emp.id && 'bg-muted/50'
                      )}
                    >
                      <td className="p-3 font-medium">{emp.nombre}</td>
                      <td className="p-3 text-muted-foreground hidden md:table-cell">{emp.puesto}</td>
                      <td className="p-3 text-muted-foreground text-xs hidden lg:table-cell">{emp.agencia}</td>
                      <td className="p-3">
                        <ScoreBar score={emp.score} />
                      </td>
                      <td className="p-3">
                        <SemaforoBadge score={emp.score} />
                      </td>
                      <td className="p-3 text-center">
                        <TendenciaIcon t={emp.tendencia} />
                      </td>
                      <td className="p-3">
                        <Button
                          size="sm"
                          variant={emp.semaforo === 'rojo' ? 'destructive' : 'ghost'}
                          onClick={() => setSelected(emp.id === selected?.id ? null : emp)}
                          className="text-xs h-7"
                        >
                          {emp.semaforo === 'rojo' ? 'Ver detalle' : 'Ver perfil'}
                        </Button>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Panel lateral — portal para escapar del stacking context de Framer Motion */}
      {createPortal(
        <AnimatePresence>
          {selected && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/40 z-40"
                onClick={() => setSelected(null)}
              />
              <DetailPanel
                emp={selected}
                onClose={() => setSelected(null)}
                onActivateFlow={(e) => { setSelected(null); setFlowModal(e) }}
              />
            </>
          )}
        </AnimatePresence>,
        document.body
      )}

      {/* Modal SENTINEL FLOW */}
      <Dialog open={!!flowModal} onOpenChange={(open) => { if (!open) setFlowModal(null) }}>
        <DialogContent>
          <DialogHeader>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-8 h-8 rounded-lg bg-sentinel-red/15 flex items-center justify-center">
                <Zap className="size-4 text-sentinel-red" />
              </div>
              <DialogTitle>SENTINEL FLOW</DialogTitle>
            </div>
            <DialogDescription>
              Se iniciará el flujo de intervención quirúrgica para{' '}
              <span className="font-semibold text-foreground">{flowModal?.nombre}</span>.
            </DialogDescription>
          </DialogHeader>
          {flowModal && (
            <div className="rounded-lg bg-muted p-3 space-y-1 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Score JD-R</span>
                <span className="font-bold" style={{ color: getSemaforoHex(flowModal.score) }}>{flowModal.score}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Puesto</span>
                <span className="font-medium">{flowModal.puesto}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Agencia</span>
                <span className="font-medium">{flowModal.agencia}</span>
              </div>
            </div>
          )}
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="secondary">Cancelar</Button>
            </DialogClose>
            <Button
              className="bg-sentinel-red hover:bg-sentinel-red/90 text-white"
              onClick={() => setFlowModal(null)}
            >
              Confirmar activación
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
