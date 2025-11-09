import { Wrench, Sparkles, Gauge } from "lucide-react"
import type { HomePageData } from "@/lib/sanity"

interface ServicesSectionProps {
  data?: HomePageData | null
}

// Mapeo de iconos
const iconMap = {
  gauge: <Gauge className="w-10 h-10 text-yellow-400" />,
  sparkles: <Sparkles className="w-10 h-10 text-yellow-400" />,
  wrench: <Wrench className="w-10 h-10 text-yellow-400" />
} as const

const fallbackServices = [
  {
    icon: "gauge",
    title: "Mantenimiento",
    description: "Deja tu moto al día con diagnósticos precisos y cuidado profesional.",
  },
  {
    icon: "sparkles",
    title: "Restauración",
    description: "Rescatamos la esencia original y devolvemos la gloria a tu moto.",
  },
  {
    icon: "wrench",
    title: "Modificaciones",
    description: "Creamos motos únicas que reflejan tu personalidad y estilo.",
  },
]

export function ServicesSection({ data }: ServicesSectionProps) {
  const servicesSection = data?.servicesSection || {
    title: "Nuestros Servicios",
    description: "En Mecánica Carrión, ofrecemos un servicio integral para tu moto, desde el mantenimiento preventivo hasta modificaciones personalizadas.",
    backgroundImage: "/images/services.webp",
    services: fallbackServices
  }

  return (
    <section
      className="relative bg-fixed bg-center bg-cover text-white py-32 px-6"
      style={{
        backgroundImage: `url(${servicesSection.backgroundImage})`,
      }}
    >
      <div className="absolute inset-0 bg-black/70 backdrop-brightness-50 z-0" />

      <div className="relative z-10 max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-5xl font-extrabold text-yellow-400 mb-12">
          {servicesSection.title}
        </h2>

        <p className="text-lg md:text-xl text-white/90 mb-12">
          {servicesSection.description}
        </p>

        <div className="grid gap-10 md:grid-cols-3">
          {servicesSection.services.map((service, i) => {
            const iconKey = service.icon as keyof typeof iconMap
            const serviceIcon = iconMap[iconKey] || iconMap.wrench
            
            return (
              <div
                key={i}
                className="bg-white/5 border border-yellow-400/20 backdrop-blur-md rounded-xl p-8 hover:bg-yellow-400/10 transition-all"
              >
                <div className="flex justify-center mb-4">{serviceIcon}</div>
                <h3 className="text-xl font-bold mb-2 text-yellow-400">
                  {service.title}
                </h3>
                <p className="text-white/90 text-base">{service.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
