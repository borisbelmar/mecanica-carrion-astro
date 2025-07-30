import { useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { PortableText } from '@portabletext/react'
import { Wrench, Sparkles, Gauge, Calendar, ArrowLeft, ChevronLeft, ChevronRight, X } from "lucide-react"
import type { Project } from "@/lib/sanity"

interface ProjectDetailProps {
  project: Project
}

export function ProjectDetail({ project }: ProjectDetailProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [isGalleryOpen, setIsGalleryOpen] = useState(false)

  const handleBack = () => {
    window.history.back()
  }

  // Componentes personalizados para PortableText
  const portableTextComponents = {
    block: {
      h1: ({ children }: any) => <h1 className="text-3xl font-bold text-yellow-400 mb-6">{children}</h1>,
      h2: ({ children }: any) => <h2 className="text-2xl font-semibold text-yellow-400 mb-4 mt-8">{children}</h2>,
      h3: ({ children }: any) => <h3 className="text-xl font-semibold text-neutral-200 mb-3 mt-6">{children}</h3>,
      normal: ({ children }: any) => <p className="text-neutral-300 leading-relaxed mb-4">{children}</p>,
      blockquote: ({ children }: any) => (
        <blockquote className="border-l-4 border-yellow-400 pl-4 italic text-neutral-300 my-6">
          {children}
        </blockquote>
      ),
    },
    list: {
      bullet: ({ children }: any) => <ul className="list-disc list-inside text-neutral-300 mb-4 space-y-2">{children}</ul>,
      number: ({ children }: any) => <ol className="list-decimal list-inside text-neutral-300 mb-4 space-y-2">{children}</ol>,
    },
    listItem: {
      bullet: ({ children }: any) => <li className="text-neutral-300">{children}</li>,
      number: ({ children }: any) => <li className="text-neutral-300">{children}</li>,
    },
    marks: {
      strong: ({ children }: any) => <strong className="font-semibold text-yellow-400">{children}</strong>,
      em: ({ children }: any) => <em className="italic text-neutral-200">{children}</em>,
      link: ({ children, value }: any) => (
        <a 
          href={value.href} 
          className="text-yellow-400 hover:text-yellow-300 underline transition-colors"
          target="_blank"
          rel="noopener noreferrer"
        >
          {children}
        </a>
      ),
    },
  }

  const getProjectTypeIcon = (type: string | undefined) => {
    switch (type?.toLowerCase()) {
      case "mantencion":
      case "mantenimiento":
        return <Gauge className="w-5 h-5" />
      case "restauracion":
        return <Sparkles className="w-5 h-5" />
      case "modificacion":
        return <Wrench className="w-5 h-5" />
      default:
        return null
    }
  }

  const getProjectTypeColor = (type: string | undefined) => {
    switch (type?.toLowerCase()) {
      case "mantencion":
      case "mantenimiento":
        return "text-blue-400"
      case "restauracion":
        return "text-purple-400"
      case "modificacion":
        return "text-green-400"
      default:
        return "text-neutral-400"
    }
  }

  const allImages = [project.image, ...(project.gallery || [])].filter(Boolean) as string[]

  const nextImage = () => {
    setSelectedImageIndex((prev) => (prev + 1) % allImages.length)
  }

  const prevImage = () => {
    setSelectedImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length)
  }

  return (
    <div className="bg-black text-white min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[70vh] overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        </div>

        {/* Back Button */}
        <button
          onClick={handleBack}
          className="absolute top-6 left-6 z-10 flex items-center gap-2 px-4 py-2 bg-black/50 backdrop-blur rounded-lg border border-white/20 hover:bg-black/70 transition-all duration-300 pointer-events-auto"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm">Volver</span>
        </button>

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-12 pointer-events-auto">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <span className={`${getProjectTypeColor(project.type)} flex items-center gap-2`}>
                  {getProjectTypeIcon(project.type)}
                  <span className="text-sm font-medium capitalize">{project.type}</span>
                </span>
                <span className="text-neutral-400">•</span>
                <span className="text-neutral-400 flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {project.year}
                </span>
              </div>
              
              <h1 className="text-4xl lg:text-6xl font-extrabold text-yellow-400 mb-4">
                {project.title}
              </h1>
              
              <p className="text-xl text-neutral-300 mb-8">
                {project.model}
              </p>

              {allImages.length > 1 && (
                <button
                  onClick={() => {
                    setSelectedImageIndex(0) // Empezar desde la imagen hero
                    setIsGalleryOpen(true)
                  }}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-yellow-400 text-black font-medium rounded-lg hover:bg-yellow-300 transition-all duration-300"
                >
                  Ver Galería ({allImages.length} fotos)
                </button>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      {project.body && project.body.length > 0 && (
        <section className="py-16 px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="text-3xl font-bold text-yellow-400 mb-8">Detalles del Proyecto</h2>
              <div className="prose prose-lg max-w-none">
                <PortableText 
                  value={project.body} 
                  components={portableTextComponents}
                />
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Gallery Section */}
      {project.gallery && project.gallery.length > 0 && (
        <section className="py-16 px-6 bg-neutral-900/50">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h2 className="text-3xl font-bold text-yellow-400 mb-12 text-center">
                Galería del Proyecto
              </h2>
              
              <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6">
                {project.gallery.map((image, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="break-inside-avoid mb-6 group cursor-pointer overflow-hidden rounded-lg bg-neutral-800/50 border border-neutral-700/30 hover:border-yellow-400/50 transition-all duration-300"
                    onClick={() => {
                      setSelectedImageIndex(index + 1) // +1 porque la imagen principal es index 0
                      setIsGalleryOpen(true)
                    }}
                  >
                    <img
                      src={image}
                      alt={`${project.title} - Imagen ${index + 1}`}
                      className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Gallery Modal */}
      <AnimatePresence>
        {isGalleryOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur flex items-center justify-center"
            onClick={() => setIsGalleryOpen(false)}
          >
            <button
              onClick={() => setIsGalleryOpen(false)}
              className="absolute top-6 right-6 p-2 text-white hover:text-yellow-400 transition-colors"
            >
              <X className="w-8 h-8" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation()
                prevImage()
              }}
              className="absolute left-6 p-2 text-white hover:text-yellow-400 transition-colors"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation()
                nextImage()
              }}
              className="absolute right-6 p-2 text-white hover:text-yellow-400 transition-colors"
            >
              <ChevronRight className="w-8 h-8" />
            </button>

            <motion.img
              key={selectedImageIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              src={allImages[selectedImageIndex]}
              alt={`${project.title} - Imagen ${selectedImageIndex + 1}`}
              className="max-w-[90vw] max-h-[90vh] object-contain"
              onClick={(e) => e.stopPropagation()}
            />

            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2">
              {allImages.map((_, index) => (
                <button
                  key={index}
                  onClick={(e) => {
                    e.stopPropagation()
                    setSelectedImageIndex(index)
                  }}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === selectedImageIndex ? 'bg-yellow-400' : 'bg-white/30'
                  }`}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
