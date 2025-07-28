
'use client'

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "motion/react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useQuery } from "@tanstack/react-query"

import { fetchTestimonials, type Testimonial } from "@/lib/sanity"
import { queryClient } from "@/lib/query"

function chunk<T>(arr: T[], size: number): T[][] {
  return Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
    arr.slice(i * size, i * size + size)
  )
}

export function TestimonialsSection() {
  const { data: testimonials = [] } = useQuery({
    queryKey: ["testimonials"],
    queryFn: fetchTestimonials,
  }, queryClient)

  const [pages, setPages] = useState<Testimonial[][]>([])
  const [index, setIndex] = useState(0)
  const [direction, setDirection] = useState<"left" | "right">("right")
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useEffect(() => {
    if (testimonials.length < 1) return
    if (testimonials.length <= 3) {
      setPages([testimonials])
      setIndex(0)
      return 
    }
    const chunkSize = isMobile ? 1 : 3
    setPages(chunk(testimonials, chunkSize))
    setIndex(0)
  }, [isMobile, testimonials])

  const paginate = useCallback((dir: "left" | "right") => {
    setDirection(dir)
    setIndex((prev) =>
      dir === "right"
        ? (prev + 1) % pages.length
        : (prev - 1 + pages.length) % pages.length
    )
  }, [pages.length])

  useEffect(() => {
    if (pages.length === 0) return
    const interval = setInterval(() => {
      paginate("right")
    }, 15000)
    return () => clearInterval(interval)
  }, [pages, index, paginate])

  return (
    <section className="bg-black text-white px-6 py-32">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-5xl font-extrabold text-yellow-400 mb-12">
          Lo que dicen nuestros clientes
        </h2>
        <div className="relative h-[240px] overflow-hidden">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={index}
              custom={direction}
              initial={{ opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute w-full flex flex-col md:flex-row gap-6 justify-center"
            >
              {pages[index]?.map((testimonial, i) => (
                <div
                  key={i}
                  className="flex-1 bg-white/5 border border-yellow-400/20 backdrop-blur p-6 rounded-xl flex flex-col justify-center text-left min-h-[240px] max-h-[240px] max-w-xl mx-auto"
                >
                  <p className="text-white/90 italic mb-6 text-sm sm:text-base">
                    “{testimonial.quote}”
                  </p>
                  <div className="flex items-center gap-3 mt-auto">
                    {testimonial.avatar ? (
                      <img
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-yellow-400 text-black font-bold flex items-center justify-center text-sm">
                        {testimonial.name.charAt(0)}
                      </div>
                    )}
                    <div className="text-left">
                      <p className="font-semibold text-yellow-400">
                        {testimonial.name}
                      </p>
                      <div className="flex items-center gap-1 text-sm text-white/70">
                        <p>{testimonial.bike}</p>
                        {testimonial.instagram && (
                          <>
                            <span>|</span>
                            <a
                              href={`https://www.instagram.com/${testimonial.instagram}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-yellow-400 hover:underline"
                            >
                              @{testimonial.instagram}
                            </a>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
        {pages.length > 1 && (
          <div className="flex justify-center mt-8 gap-6">
            <button
              onClick={() => paginate("left")}
              className="p-2 rounded-full bg-white/10 hover:bg-yellow-400/20 transition"
            >
              <ChevronLeft className="text-white" />
            </button>
            <button
              onClick={() => paginate("right")}
              className="p-2 rounded-full bg-white/10 hover:bg-yellow-400/20 transition"
            >
              <ChevronRight className="text-white" />
            </button>
          </div>
        )}
      </div>
    </section>
  )
}