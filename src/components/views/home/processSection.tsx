import {
  ClipboardList,
  FileText,
  Hammer,
  CheckCircle2,
} from "lucide-react"
import type { HomePageData } from "@/lib/sanity"

interface ProcessSectionProps {
  data?: HomePageData | null
}

// Mapeo de iconos
const iconMap = {
  clipboardList: <ClipboardList className="w-8 h-8 text-yellow-400" />,
  fileText: <FileText className="w-8 h-8 text-yellow-400" />,
  hammer: <Hammer className="w-8 h-8 text-yellow-400" />,
  checkCircle2: <CheckCircle2 className="w-8 h-8 text-yellow-400" />,
} as const

const fallbackSteps = [
  {
    icon: "clipboardList",
    title: "Diagnóstico",
    description: "Revisamos tu moto contigo y evaluamos el trabajo necesario.",
  },
  {
    icon: "fileText",
    title: "Presupuesto",
    description: "Te entregamos una propuesta clara, justa y sin sorpresas.",
  },
  {
    icon: "hammer",
    title: "Trabajo en marcha",
    description: "Comenzamos a trabajar y te mantenemos informado del progreso.",
  },
  {
    icon: "checkCircle2",
    title: "Entrega",
    description: "Recibes tu moto lista para rugir otra vez. Garantía incluida.",
  },
]

export function ProcessSection({ data }: ProcessSectionProps) {
  const processSection = data?.processSection || {
    title: "Nuestro Proceso",
    description: "En Mecánica Carrión, seguimos un proceso claro y transparente para garantizar la satisfacción de nuestros clientes.",
    steps: fallbackSteps
  }

  return (
    <section className="bg-black text-white px-6 py-24">
      <div className="max-w-6xl mx-auto text-center">
        <div className="mb-16">
          <h2 className="text-2xl md:text-5xl font-extrabold text-yellow-400 mb-4">
            {processSection.title}
          </h2>
          <p className="text-lg md:text-xl text-white/90 mb-4 leading-relaxed">
            {processSection.description}
          </p>
        </div>

        <div className="grid gap-12 md:grid-cols-4">
          {processSection.steps.map((step, i) => {
            const iconKey = step.icon as keyof typeof iconMap
            const stepIcon = iconMap[iconKey] || iconMap.clipboardList
            
            return (
              <div
                key={i}
                className="flex flex-col items-center text-center px-4"
              >
                <div className="mb-4">{stepIcon}</div>
                <h3 className="text-xl font-bold text-yellow-400 mb-2">
                  {step.title}
                </h3>
                <p className="text-white/80 text-base">{step.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
