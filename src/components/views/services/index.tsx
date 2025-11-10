import React from "react"
import { Gauge, Sparkles, Wrench } from "lucide-react"
import ServiceItem from "./serviceItem"
import Gallery from "@/components/gallery"
import type { ServicesPageData } from "@/lib/sanity"

interface ServicesViewProps {
  servicesData: ServicesPageData
}

// Mapeo de iconos
const iconMap = {
  gauge: <Gauge className="w-20 h-20 text-yellow-400" />,
  sparkles: <Sparkles className="w-20 h-20 text-yellow-400" />,
  wrench: <Wrench className="w-20 h-20 text-yellow-400" />
} as const

export default function ServicesView({ servicesData }: ServicesViewProps) {
  // Agregar scroll smooth global
  React.useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth'
    return () => {
      document.documentElement.style.scrollBehavior = 'auto'
    }
  }, [])

  // Use data from Sanity or fallback
  const services = servicesData.services || []
  const workshopGallery = servicesData.workshopGallery

  return (
    <div className="w-full">
      <section className="py-32 flex items-center justify-center bg-black text-center px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-semibold lg:text-7xl text-white mb-8">
            {servicesData.heroTitle}
          </h1>
          <p className="text-xl text-gray-400 font-light tracking-wide mb-16">
            {servicesData.heroSubtitle}
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const iconKey = service.icon as keyof typeof iconMap
              const serviceIcon = iconMap[iconKey] || iconMap.wrench
              
              return (
                <div key={index} className="group cursor-pointer">
                  <a 
                    href={`#${service.slug || service.title.toLowerCase()}`}
                    className="block"
                    onClick={(e) => {
                      e.preventDefault()
                      const element = document.getElementById(service.slug || service.title.toLowerCase())
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
                        {React.cloneElement(serviceIcon, { 
                          className: "w-8 h-8 text-yellow-400" 
                        })}
                      </div>
                      <h3 className="text-lg font-light text-white tracking-wide group-hover:text-yellow-400 transition-colors duration-300">
                        {service.title}
                      </h3>
                    </div>
                  </a>
                </div>
              )
            })}
          </div>
        </div>
      </section>
      {services.map((service, index) => {
        const iconKey = service.icon as keyof typeof iconMap
        const serviceIcon = iconMap[iconKey] || iconMap.wrench
        
        return (
          <ServiceItem
            key={index}
            index={index}
            icon={serviceIcon}
            title={service.title}
            description={service.description}
            bgImage={service.bgImage}
            slug={service.slug}
          />
        )
      })}

      <Gallery
        title={workshopGallery.title}
        description={workshopGallery.description}
        images={workshopGallery.images || []}
      />
    </div>
  )
}