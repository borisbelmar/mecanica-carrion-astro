import type { ReactNode } from "react"
import { MessageCircle, Eye } from "lucide-react"
import { IconBrandWhatsapp } from "@tabler/icons-react"

interface ServiceItemProps {
  icon: ReactNode
  title: string
  description: string
  bgImage: string
  index: number
  slug?: string
}

const processSteps = [
  { step: "01", title: "Visita", description: "Agenda tu cita" },
  { step: "02", title: "Cotización", description: "Evaluamos tu moto" },
  { step: "03", title: "Foto Inicial", description: "Registro del estado" },
  { step: "04", title: "Proceso", description: "Trabajo especializado" },
  { step: "05", title: "Foto Final", description: "Resultado obtenido" },
  { step: "06", title: "Entrega", description: "Tu moto lista" }
]

export default function ServiceItem({ icon, title, description, bgImage, slug }: ServiceItemProps) {
  const serviceSlug = slug || title.toLowerCase()
  
  const getWhatsAppMessage = () => {
    return `Hola! Me interesa el servicio de ${title.toLowerCase()}. ¿Podrían ayudarme con más información para agendar una cita?`
  }

  const getWhatsAppUrl = () => {
    const phoneNumber = "56941252285"
    const message = encodeURIComponent(getWhatsAppMessage())
    return `https://wa.me/${phoneNumber}?text=${message}`
  }

  const getProjectsUrl = () => {
    // URLs para cada tipo de servicio
    const serviceUrls = {
      'mantenimiento': '/proyectos?categoria=mantenimiento',
      'restauracion': '/proyectos?categoria=restauracion', 
      'modificaciones': '/proyectos?categoria=modificaciones'
    }
    return serviceUrls[serviceSlug as keyof typeof serviceUrls] || '/proyectos'
  }

  return (
    <section 
      id={serviceSlug}
      className="relative min-h-screen w-full overflow-hidden flex items-center justify-center"
    >
      <div
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{ backgroundImage: `url(${bgImage})` }}
      />
      
      <div className="absolute inset-0 bg-black/80" />
      
      <div className="relative z-10 max-w-6xl mx-auto px-4 py-20 text-center">
        <div className="mb-12">
          <div className="flex justify-center mb-8">
            <div className="p-6 rounded-full border border-yellow-400/30 bg-black/20 backdrop-blur-sm">
              {icon}
            </div>
          </div>
          
          <h2 className="text-2xl lg:text-5xl font-bold text-white mb-8 tracking-wide">
            {title}
          </h2>
          
          <p className="text-lg lg:text-xl text-gray-300 leading-relaxed max-w-4xl mx-auto font-light">
            {description}
          </p>
        </div>

        <div className="mt-12 mb-8 flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a
            href={getWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-green-600/25 transform hover:scale-105 flex items-center gap-2 text-sm"
          >
            <IconBrandWhatsapp className="w-5 h-5" stroke={2} />
            <span>Agendar Cita</span>
          </a>
          
          <a
            href={getProjectsUrl()}
            className="group relative px-6 py-3 bg-transparent border border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black font-medium rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-yellow-400/25 transform hover:scale-105 flex items-center gap-2 text-sm"
          >
            <Eye className="w-4 h-4" />
            <span>Ver Proyectos</span>
          </a>
        </div>
      </div>
      
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2">
        <div className="w-px h-12 bg-gradient-to-b from-yellow-400 to-transparent"></div>
      </div>
    </section>
  )
}