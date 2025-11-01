import React from "react"
import { Gauge, Sparkles, Wrench } from "lucide-react"
import ServiceItem from "./serviceItem"
import Gallery from "@/components/gallery"

const services = [
  {
    icon: <Gauge className="w-20 h-20 text-yellow-400" />,
    title: "Mantenimiento",
    description: "Mantén tu motocicleta en perfecto estado con nuestro servicio de mantenimiento preventivo y correctivo. Diagnosticamos, reparamos y optimizamos cada componente para garantizar un rendimiento óptimo.",
    bgImage: 'https://images.unsplash.com/photo-1572452571879-3d67d5b2a39f?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1920'
  },
  {
    icon: <Sparkles className="w-20 h-20 text-yellow-400" />,
    title: "Restauración",
    description: "Devolvemos la vida a motocicletas clásicas y vintage. Un proceso meticuloso que respeta la esencia original mientras modernizamos componentes críticos para la seguridad y funcionalidad.",
    bgImage: 'https://images.unsplash.com/photo-1558981359-219d6364c9c8?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1920'
  },
  {
    icon: <Wrench className="w-20 h-20 text-yellow-400" />,
    title: "Modificaciones",
    description: "Transformamos tu visión en realidad. Desde modificaciones estéticas hasta mejoras de rendimiento, creamos motocicletas únicas que reflejan tu personalidad y estilo de conducción.",
    bgImage: 'https://images.unsplash.com/photo-1558981852-426c6c22a060?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1920'
  },
]

const workshopGallery = {
  title: "Nuestro Taller",
  description: "Conoce las instalaciones donde realizamos nuestro trabajo especializado en motocicletas",
  images: [
    'https://picsum.photos/400/600?random=1',
    'https://picsum.photos/400/500?random=2',
    'https://picsum.photos/400/700?random=3',
    'https://picsum.photos/400/450?random=4',
    'https://picsum.photos/400/550?random=5',
    'https://picsum.photos/400/650?random=6',
    'https://picsum.photos/400/480?random=7',
    'https://picsum.photos/400/620?random=8',
    'https://picsum.photos/400/570?random=9',
    'https://picsum.photos/400/530?random=10',
    'https://picsum.photos/400/680?random=11',
    'https://picsum.photos/400/460?random=12'
  ]
}

export default function ServicesView() {
  // Agregar scroll smooth global
  React.useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth'
    return () => {
      document.documentElement.style.scrollBehavior = 'auto'
    }
  }, [])

  return (
    <div className="w-full">
      <section className="min-h-screen flex items-center justify-center bg-black text-center px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-semibold lg:text-7xl text-white mb-8">
            Servicios
          </h1>
          <p className="text-xl text-gray-400 font-light tracking-wide mb-16">
            Más de 20 años perfeccionando el arte de la mecánica
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {services.map((service, index) => (
              <div key={index} className="group cursor-pointer">
                <a 
                  href={`#${service.title.toLowerCase()}`}
                  className="block"
                  onClick={(e) => {
                    e.preventDefault()
                    const element = document.getElementById(service.title.toLowerCase())
                    if (element) {
                      element.scrollIntoView({ 
                        behavior: 'smooth',
                        block: 'start'
                      })
                    }
                  }}
                >
                  <div className="flex flex-col items-center space-y-4 p-6 rounded-2xl border border-gray-800 bg-gray-900/20 backdrop-blur-sm hover:border-yellow-400/30 transition-all duration-300 group-hover:transform group-hover:scale-105">
                    <div className="p-3 rounded-full border border-yellow-400/30 bg-black/20 group-hover:border-yellow-400 transition-all duration-300">
                      {React.cloneElement(service.icon, { 
                        className: "w-8 h-8 text-yellow-400" 
                      })}
                    </div>
                    <h3 className="text-lg font-light text-white tracking-wide group-hover:text-yellow-400 transition-colors duration-300">
                      {service.title}
                    </h3>
                  </div>
                </a>
              </div>
            ))}
          </div>
          
          <div className="w-px h-20 bg-gradient-to-b from-yellow-400 to-transparent mx-auto"></div>
        </div>
      </section>

      {services.map((service, index) => (
        <ServiceItem
          key={index}
          index={index}
          icon={service.icon}
          title={service.title}
          description={service.description}
          bgImage={service.bgImage}
        />
      ))}

      <Gallery
        title={workshopGallery.title}
        description={workshopGallery.description}
        images={workshopGallery.images}
      />
    </div>
  )
}