import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import {
  MapPin,
  Clock,
  Route,
  CheckCircle2,
  Home,
  Building2,
  Calendar,
  Monitor,
  CheckCheck,
} from 'lucide-react'
import { mobilityProfiles, type MobilityProfile, type Modalidad } from '@/data/mockData'
import { getSemaforoHex, cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

const modalidades: {
  key: Modalidad
  label: string
  icon: React.ElementType
  descripcion: string
  pros: string[]
}[] = [
  {
    key: 'presencial',
    label: 'Presencial',
    icon: Building2,
    descripcion: '5 días en agencia o sede',
    pros: ['Colaboración directa', 'Cultura organizacional', 'Atención presencial al cliente'],
  },
  {
    key: 'hibrido-flexible',
    label: 'Híbrido Flexible',
    icon: Calendar,
    descripcion: '2-3 días presencial / semana',
    pros: ['Balance vida-trabajo', 'Reducción traslados', 'Autonomía en gestión del tiempo'],
  },
  {
    key: 'hibrido-estructurado',
    label: 'Híbrido Estructurado',
    icon: Route,
    descripcion: '3 días presencial + 2 remoto fijos',
    pros: ['Previsibilidad', 'Cobertura garantizada', 'Estructura clara'],
  },
  {
    key: 'remoto-supervisado',
    label: 'Remoto Supervisado',
    icon: Monitor,
    descripcion: 'Trabajo desde casa con check-ins',
    pros: ['Máxima flexibilidad geográfica', 'Ahorro en traslados', 'Indicado para zonas lejanas'],
  },
]

function CFIGauge({ cfi }: { cfi: number }) {
  const color = getSemaforoHex(cfi)
  const radius = 52
  const circumference = 2 * Math.PI * radius
  const progress = cfi / 100
  const offset = circumference * (1 - progress)

  return (
    <div className="flex flex-col items-center gap-3">
      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        Índice de Fricción de Traslado (CFI)
      </p>
      <div className="relative w-32 h-32">
        <svg className="w-32 h-32 -rotate-90" viewBox="0 0 120 120">
          <circle
            cx="60"
            cy="60"
            r={radius}
            fill="none"
            stroke="hsl(var(--muted))"
            strokeWidth="10"
          />
          <motion.circle
            cx="60"
            cy="60"
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1, ease: 'easeOut' }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-bold" style={{ color }}>{cfi}</span>
          <span className="text-xs text-muted-foreground">/ 100</span>
        </div>
      </div>
      <div className="text-center">
        {cfi > 60 ? (
          <Badge variant="danger">Fricción alta</Badge>
        ) : cfi > 30 ? (
          <Badge variant="warning">Fricción moderada</Badge>
        ) : (
          <Badge variant="success">Fricción baja</Badge>
        )}
      </div>
    </div>
  )
}

function ModalidadCard({
  m,
  isRecommended,
}: {
  m: typeof modalidades[0]
  isRecommended: boolean
}) {
  return (
    <div
      className={cn(
        'rounded-xl border p-4 space-y-3 transition-all duration-200',
        isRecommended
          ? 'border-sentinel-green bg-sentinel-green/5 shadow-md ring-1 ring-sentinel-green/30'
          : 'border-border bg-card'
      )}
    >
      <div className="flex items-center gap-2">
        <div
          className={cn(
            'w-8 h-8 rounded-lg flex items-center justify-center shrink-0',
            isRecommended ? 'bg-sentinel-green/15' : 'bg-muted'
          )}
        >
          <m.icon
            className={cn('size-4', isRecommended ? 'text-sentinel-green' : 'text-muted-foreground')}
          />
        </div>
        <p className={cn('font-semibold text-sm', isRecommended && 'text-sentinel-green')}>
          {m.label}
        </p>
        {isRecommended && (
          <Badge variant="success" className="ml-auto shrink-0">
            Recomendado
          </Badge>
        )}
      </div>
      <p className="text-xs text-muted-foreground">{m.descripcion}</p>
      <ul className="space-y-1">
        {m.pros.map((pro) => (
          <li key={pro} className="text-xs flex items-start gap-1.5">
            <CheckCircle2
              className={cn(
                'size-3 mt-0.5 shrink-0',
                isRecommended ? 'text-sentinel-green' : 'text-muted-foreground'
              )}
            />
            {pro}
          </li>
        ))}
      </ul>
    </div>
  )
}

function ValidationPanel() {
  const checks = [
    { label: 'SLA de agencia', status: 'Cubierto' },
    { label: 'Cobertura mínima presencial', status: 'Cumplida' },
    { label: 'Infraestructura remota', status: 'Disponible' },
    { label: 'Aprobación de jefatura directa', status: 'Pendiente' },
  ]
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-xl border border-sentinel-green/30 bg-sentinel-green/5 p-4 space-y-3"
    >
      <div className="flex items-center gap-2">
        <CheckCheck className="size-4 text-sentinel-green" />
        <p className="font-semibold text-sm text-sentinel-green">Validación con Operaciones</p>
      </div>
      <div className="space-y-2">
        {checks.map(c => (
          <div key={c.label} className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">{c.label}</span>
            <Badge
              variant={c.status === 'Pendiente' ? 'warning' : 'success'}
            >
              {c.status === 'Pendiente' ? 'Pendiente' : `✓ ${c.status}`}
            </Badge>
          </div>
        ))}
      </div>
      <p className="text-xs text-muted-foreground pt-1">
        Validación automática realizada por SENTINEL en tiempo real. La aprobación de jefatura se gestiona vía flujo de trabajo interno.
      </p>
    </motion.div>
  )
}

export default function SentinelMobility() {
  const [selectedProfile, setSelectedProfile] = useState<MobilityProfile>(mobilityProfiles[0])
  const [showValidation, setShowValidation] = useState(false)

  return (
    <div className="space-y-6">
      {/* Selector de perfil */}
      <div>
        <p className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wide">
          Seleccionar colaborador
        </p>
        <div className="flex gap-3 pb-2 flex-wrap justify-center">
          {mobilityProfiles.map((profile) => {
            const color = getSemaforoHex(profile.cfi)
            const isSelected = profile.id === selectedProfile.id
            return (
              <motion.button
                key={profile.id}
                onClick={() => {
                  setSelectedProfile(profile)
                  setShowValidation(false)
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={cn(
                  'rounded-xl border p-3 text-left transition-all duration-200 min-w-[160px] space-y-2',
                  isSelected
                    ? 'border-primary bg-primary/5 shadow-md ring-1 ring-primary/30'
                    : 'border-border bg-card hover:shadow-sm'
                )}
              >
                <div className="flex items-center gap-2">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0"
                    style={{ backgroundColor: color }}
                  >
                    {profile.nombre.split(' ')[0][0]}{profile.nombre.split(' ')[1][0]}
                  </div>
                  <div>
                    <p className="text-xs font-semibold leading-tight">
                      {profile.nombre.split(' ')[0]} {profile.nombre.split(' ')[1]}
                    </p>
                    <p className="text-[10px] text-muted-foreground">{profile.zona}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-muted-foreground">CFI</span>
                  <span className="text-sm font-bold" style={{ color }}>{profile.cfi}</span>
                </div>
              </motion.button>
            )
          })}
        </div>
      </div>

      {/* Panel principal del perfil */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedProfile.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="space-y-5"
        >
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {/* CFI y datos de traslado */}
            <Card className="lg:col-span-1">
              <CardContent className="p-5 space-y-5">
                <CFIGauge cfi={selectedProfile.cfi} />
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-2">
                    <MapPin className="size-4 text-primary shrink-0" />
                    <div>
                      <p className="text-xs text-muted-foreground">Ubicación</p>
                      <p className="font-medium">{selectedProfile.zona}</p>
                      <p className="text-xs text-muted-foreground">{selectedProfile.coloniaBarrio}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="size-4 text-primary shrink-0" />
                    <div>
                      <p className="text-xs text-muted-foreground">Tiempo de traslado</p>
                      <p className="font-medium">{selectedProfile.tiempoTraslado} minutos (ida)</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Route className="size-4 text-primary shrink-0" />
                    <div>
                      <p className="text-xs text-muted-foreground">Distancia</p>
                      <p className="font-medium">{selectedProfile.distancia} km</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Home className="size-4 text-primary shrink-0" />
                    <div>
                      <p className="text-xs text-muted-foreground">Modalidad actual</p>
                      <p className="font-medium capitalize">{selectedProfile.modalidadActual}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Modalidades */}
            <div className="lg:col-span-2 space-y-4">
              <div>
                <h3 className="font-semibold mb-1">{selectedProfile.nombre}</h3>
                <p className="text-sm text-muted-foreground">{selectedProfile.puesto} · {selectedProfile.agencia}</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {modalidades.map((m) => (
                  <ModalidadCard
                    key={m.key}
                    m={m}
                    isRecommended={m.key === selectedProfile.modalidadRecomendada}
                  />
                ))}
              </div>
              <Button
                onClick={() => setShowValidation(!showValidation)}
                variant={showValidation ? 'secondary' : 'sentinel'}
                className="w-full sm:w-auto"
              >
                <CheckCheck className="size-4" />
                {showValidation ? 'Ocultar validación' : 'Validar con Operaciones'}
              </Button>
              <AnimatePresence>
                {showValidation && <ValidationPanel />}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

    </div>
  )
}
