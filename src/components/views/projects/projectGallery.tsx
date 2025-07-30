import { useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { Wrench, Sparkles, Gauge, Grid3X3 } from "lucide-react"
import type { Project } from "@/lib/sanity"

interface ProjectGalleryProps {
  projects: Project[]
}

type FilterType = "all" | "mantencion" | "restauracion" | "modificacion"

export function ProjectGallery({ projects }: ProjectGalleryProps) {
  const [activeFilter, setActiveFilter] = useState<FilterType>("all")

  const filteredProjects = projects.filter(project => {
    if (activeFilter === "all") return true
    return project.type?.toLowerCase() === activeFilter
  })

  const filterButtons = [
    { key: "all" as FilterType, label: "Todos", icon: <Grid3X3 className="w-4 h-4" /> },
    { key: "mantencion" as FilterType, label: "Mantención", icon: <Gauge className="w-4 h-4" /> },
    { key: "restauracion" as FilterType, label: "Restauración", icon: <Sparkles className="w-4 h-4" /> },
    { key: "modificacion" as FilterType, label: "Modificación", icon: <Wrench className="w-4 h-4" /> }
  ]

  const getProjectTypeIcon = (type: string | undefined) => {
    switch (type?.toLowerCase()) {
      case "mantencion":
        return <Gauge className="w-3 h-3" />
      case "restauracion":
        return <Sparkles className="w-3 h-3" />
      case "modificacion":
        return <Wrench className="w-3 h-3" />
      default:
        return null
    }
  }
  return (
    <section className="bg-black text-white px-6 py-16 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl md:text-5xl font-extrabold text-yellow-400 mb-8 text-center">
          Nuestros Proyectos
        </h1>
        <p className="text-center text-white/70 mb-12">
          Aquí puedes ver algunos de los proyectos más destacados que hemos realizado.
        </p>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-16">
          {filterButtons.map((button) => (
            <button
              key={button.key}
              onClick={() => setActiveFilter(button.key)}
              className={`
                relative px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg font-medium transition-all duration-300 text-sm sm:text-base flex items-center
                ${activeFilter === button.key 
                  ? 'bg-yellow-400 text-black shadow-xl shadow-yellow-400/20' 
                  : 'bg-neutral-800/80 text-white hover:bg-neutral-700/80 border border-neutral-600/50 hover:border-yellow-400/40'
                }
              `}
            >
              <span className="mr-2">{button.icon}</span>
              {button.label}
              {activeFilter === button.key && filteredProjects.length > 0 && (
                <span className="ml-2 bg-black/30 text-xs px-2 py-0.5 rounded-full">
                  {filteredProjects.length}
                </span>
              )}
            </button>
          ))}
        </div>

        {filteredProjects.length > 0 ? (
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 sm:gap-6">
            <AnimatePresence mode="wait">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={`${activeFilter}-${project._id}`}
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.98 }}
                  transition={{ 
                    duration: 0.4, 
                    delay: index * 0.05,
                    ease: [0.25, 0.25, 0, 1]
                  }}
                  className="break-inside-avoid mb-4 sm:mb-6 overflow-hidden rounded-lg bg-neutral-900/60 border border-neutral-700/50 backdrop-blur transition-all duration-300 group hover:border-yellow-400/50 hover:shadow-lg hover:shadow-yellow-400/10"
                >
                  <a href={`/proyectos/${project.slug.current}`} className="block">
                    <div className="relative overflow-hidden">
                      <img
                        src={project.image}
                        alt={project.model}
                        className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    <div className="p-4">
                      <h2 className="text-yellow-400 font-semibold text-lg mb-2 group-hover:text-yellow-300 transition-colors">
                        {project.title}
                      </h2>
                      <div className="space-y-1">
                        <p className="text-sm text-neutral-400">
                          Año {project.year}
                        </p>
                        <p className="text-sm text-neutral-400 capitalize flex items-center gap-1">
                          {getProjectTypeIcon(project.type)}
                          {project.type || "Tipo no especificado"}
                        </p>
                      </div>
                    </div>
                  </a>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <motion.div 
            key="empty-state"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: [0.25, 0.25, 0, 1] }}
            className="flex flex-col items-center justify-center py-20"
          >
            <div className="text-neutral-400 mb-6">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-xl text-neutral-300 mb-2 font-medium">No hay proyectos disponibles</h3>
            <p className="text-neutral-500 text-center max-w-md">
              {activeFilter === "all" 
                ? "Aún no hay proyectos para mostrar" 
                : `No se encontraron proyectos de ${filterButtons.find(b => b.key === activeFilter)?.label.toLowerCase()}`
              }
            </p>
          </motion.div>
        )}
      </div>
    </section>
  )
}
