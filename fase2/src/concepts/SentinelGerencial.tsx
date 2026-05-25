import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { ArrowDown, Smartphone, Users, TrendingUp } from 'lucide-react'
import { leaders, type Leader, type Employee } from '@/data/mockData'
import { getSemaforoColor, getSemaforoHex, cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
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

function Initials({ name }: { name: string }) {
  const parts = name.split(' ')
  const initials = parts.slice(0, 2).map(p => p[0]).join('')
  return <span>{initials}</span>
}

function ScoreMeter({
  label,
  value,
  sub,
}: {
  label: string
  value: number
  sub: string
}) {
  const color = getSemaforoHex(value)
  const semaforo = getSemaforoColor(value)
  const semaforoLabel = { verde: 'Verde', ambar: 'Ámbar', rojo: 'Rojo' }[semaforo]

  return (
    <div className="flex-1 rounded-xl border border-border bg-card p-5 text-center space-y-3">
      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</p>
      <div
        className="w-20 h-20 rounded-full mx-auto flex items-center justify-center text-white text-3xl font-bold shadow-md"
        style={{ backgroundColor: color }}
      >
        {value}
      </div>
      <div>
        <Badge
          variant={semaforo === 'verde' ? 'success' : semaforo === 'ambar' ? 'warning' : 'danger'}
          className="mb-1"
        >
          {semaforoLabel}
        </Badge>
        <p className="text-xs text-muted-foreground">{sub}</p>
      </div>
    </div>
  )
}

function TeamMemberCard({ emp, leaderCascada }: { emp: Employee; leaderCascada: number }) {
  const color = getSemaforoHex(emp.score)
  const riesgoSecundario = leaderCascada > 50

  return (
    <div className="rounded-lg border border-border bg-card p-3 space-y-2 min-w-[140px]">
      <div className="flex items-center gap-2">
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0"
          style={{ backgroundColor: color }}
        >
          {emp.nombre.split(' ')[0][0]}{emp.nombre.split(' ')[1]?.[0] ?? ''}
        </div>
        <div className="min-w-0">
          <p className="text-xs font-medium truncate">{emp.nombre.split(' ')[0]} {emp.nombre.split(' ')[1]}</p>
          <p className="text-xs text-muted-foreground truncate">{emp.puesto.split(' ').slice(0, 2).join(' ')}</p>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-xs text-muted-foreground">Score</span>
        <span className="text-sm font-bold" style={{ color }}>{emp.score}</span>
      </div>
      {riesgoSecundario && (
        <Badge variant="warning" className="text-[10px] w-full justify-center">
          Riesgo secundario
        </Badge>
      )}
    </div>
  )
}

export default function SentinelGerencial() {
  const [selectedLeader, setSelectedLeader] = useState<Leader>(leaders[0])
  const [mobilityModal, setMobilityModal] = useState(false)

  return (
    <div className="space-y-6">
      {/* Selector de líder */}
      <div>
        <p className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wide">
          Seleccionar líder
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {leaders.map((leader) => {
            const color = getSemaforoHex(leader.scoreIndividual)
            const isSelected = leader.id === selectedLeader.id
            return (
              <motion.button
                key={leader.id}
                onClick={() => setSelectedLeader(leader)}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className={cn(
                  'rounded-xl border p-4 text-left transition-all duration-200 space-y-2',
                  isSelected
                    ? 'border-primary bg-primary/5 shadow-md ring-1 ring-primary/30'
                    : 'border-border bg-card hover:border-primary/40 hover:shadow-sm'
                )}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm"
                    style={{ backgroundColor: color }}
                  >
                    <Initials name={leader.nombre} />
                  </div>
                  <div>
                    <p className="font-semibold text-sm leading-tight">{leader.nombre}</p>
                    <p className="text-xs text-muted-foreground">{leader.puesto}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <div className="flex-1 bg-muted rounded p-1.5 text-center">
                    <p className="text-xs text-muted-foreground">Individual</p>
                    <p className="text-base font-bold" style={{ color }}>{leader.scoreIndividual}</p>
                  </div>
                  <div className="flex-1 bg-muted rounded p-1.5 text-center">
                    <p className="text-xs text-muted-foreground">Cascada</p>
                    <p className="text-base font-bold" style={{ color: getSemaforoHex(leader.scoreCascada) }}>
                      {leader.scoreCascada}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="size-3 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">{leader.equipo.length} personas en equipo</span>
                </div>
              </motion.button>
            )
          })}
        </div>
      </div>

      {/* Panel del líder seleccionado */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedLeader.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="space-y-6"
        >
          {/* Medidores */}
          <div className="flex gap-4 flex-col sm:flex-row">
            <ScoreMeter
              label="Score Individual"
              value={selectedLeader.scoreIndividual}
              sub="Burnout personal del líder"
            />
            <ScoreMeter
              label="Score de Cascada"
              value={selectedLeader.scoreCascada}
              sub="Impacto estimado al equipo"
            />
          </div>

          {/* Diagrama de cascada */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <TrendingUp className="size-4 text-primary" />
                Efecto Cascada — {selectedLeader.nombre}
              </CardTitle>
              <CardDescription>
                El estrés del líder se transfiere al equipo. Score cascada &gt; 50 indica riesgo secundario.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Líder en cascada */}
              <div className="flex justify-center">
                <div className="rounded-xl border-2 border-primary bg-primary/5 p-4 text-center space-y-2 w-52">
                  <div
                    className="w-14 h-14 rounded-full mx-auto flex items-center justify-center text-white text-lg font-bold"
                    style={{ backgroundColor: getSemaforoHex(selectedLeader.scoreIndividual) }}
                  >
                    <Initials name={selectedLeader.nombre} />
                  </div>
                  <p className="font-semibold text-sm">{selectedLeader.nombre.split(' ')[0]} {selectedLeader.nombre.split(' ')[1]}</p>
                  <p className="text-xs text-muted-foreground">{selectedLeader.puesto}</p>
                  <div className="flex justify-center gap-2">
                    <Badge variant={getSemaforoColor(selectedLeader.scoreIndividual) === 'verde' ? 'success' : getSemaforoColor(selectedLeader.scoreIndividual) === 'ambar' ? 'warning' : 'danger'}>
                      Score {selectedLeader.scoreIndividual}
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="flex justify-center">
                <div className="flex flex-col items-center gap-1 text-muted-foreground">
                  <ArrowDown className="size-5" />
                  <span className="text-xs">Cascada ({selectedLeader.scoreCascada}%)</span>
                  <ArrowDown className="size-5" />
                </div>
              </div>

              {/* Equipo */}
              <div className="flex gap-3 overflow-x-auto pb-2 justify-center flex-wrap">
                {selectedLeader.equipo.map((emp) => (
                  <TeamMemberCard
                    key={emp.id}
                    emp={emp}
                    leaderCascada={selectedLeader.scoreCascada}
                  />
                ))}
              </div>

              {/* Progreso del efecto cascada */}
              <div className="rounded-lg bg-muted p-3 space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Intensidad del efecto cascada</span>
                  <span className="font-bold" style={{ color: getSemaforoHex(selectedLeader.scoreCascada) }}>
                    {selectedLeader.scoreCascada}%
                  </span>
                </div>
                <Progress
                  value={selectedLeader.scoreCascada}
                  indicatorClassName={cn(
                    selectedLeader.scoreCascada <= 30 ? 'bg-sentinel-green' :
                    selectedLeader.scoreCascada <= 60 ? 'bg-sentinel-amber' : 'bg-sentinel-red'
                  )}
                  className="h-3"
                />
                <p className="text-xs text-muted-foreground">
                  {selectedLeader.scoreCascada > 50
                    ? 'El equipo está siendo afectado por el estado del líder. Se recomienda intervención prioritaria.'
                    : 'El impacto al equipo está dentro de rangos manejables. Monitoreo preventivo activo.'}
                </p>
              </div>
            </CardContent>
          </Card>

          {selectedLeader.scoreIndividual > 50 && (
            <div className="flex justify-center">
              <Button variant="sentinel" onClick={() => setMobilityModal(true)}>
                <Smartphone className="size-4" />
                Activar SENTINEL MOBILITY
              </Button>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      <Dialog open={mobilityModal} onOpenChange={setMobilityModal}>
        <DialogContent>
          <DialogHeader>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-8 h-8 rounded-lg bg-sentinel-green/15 flex items-center justify-center">
                <Smartphone className="size-4 text-sentinel-green" />
              </div>
              <DialogTitle>SENTINEL MOBILITY</DialogTitle>
            </div>
            <DialogDescription>
              Se analizará el perfil de traslado de{' '}
              <span className="font-semibold text-foreground">{selectedLeader.nombre}</span> para
              generar una recomendación de modalidad laboral personalizada.
            </DialogDescription>
          </DialogHeader>
          <div className="rounded-lg bg-muted p-3 space-y-1 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Score Individual</span>
              <span className="font-bold" style={{ color: getSemaforoHex(selectedLeader.scoreIndividual) }}>
                {selectedLeader.scoreIndividual}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Puesto</span>
              <span className="font-medium">{selectedLeader.puesto}</span>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="secondary">Cancelar</Button>
            </DialogClose>
            <Button variant="sentinel" onClick={() => setMobilityModal(false)}>
              Confirmar análisis
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
