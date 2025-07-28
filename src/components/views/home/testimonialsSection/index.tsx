
'use client'

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "motion/react"
import { useQuery } from "@tanstack/react-query"

import { TestimonialCard } from "./testimonialCard"
import { Paginator } from "./paginator"

import { queryClient } from "@/lib/query"
import { fetchTestimonials, type Testimonial } from "@/lib/sanity"


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
                <TestimonialCard key={i} testimonial={testimonial} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
        {pages.length > 1 && (
          <Paginator paginate={paginate} />
        )}
      </div>
    </section>
  )
}