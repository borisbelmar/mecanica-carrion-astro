'use client'

import { motion, AnimatePresence } from "motion/react"
import { useQuery } from "@tanstack/react-query"

import { TestimonialCard } from "./testimonialCard"
import { Paginator } from "./paginator"
import { useTestimonialsSlider } from "./useTestimonialsSlider"

import { queryClient } from "@/lib/query"
import { fetchTestimonials } from "@/lib/sanity"

export function TestimonialsSection() {
  const { data: testimonials = [] } = useQuery({
    queryKey: ["testimonials"],
    queryFn: fetchTestimonials,
  }, queryClient)

  const {
    pages,
    index,
    direction,
    paginate,
    isMobile,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd
  } = useTestimonialsSlider(testimonials)

  return (
    <section className="bg-black text-white px-6 py-32">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-5xl font-extrabold text-yellow-400 mb-12">
          Lo que dicen nuestros clientes
        </h2>
        <div 
          className={`relative h-[240px] overflow-hidden ${isMobile ? 'touch-pan-x' : ''}`}
          onTouchStart={isMobile ? handleTouchStart : undefined}
          onTouchMove={isMobile ? handleTouchMove : undefined}
          onTouchEnd={isMobile ? handleTouchEnd : undefined}
          style={{ touchAction: isMobile ? 'pan-y' : 'auto' }}
        >
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={index}
              custom={direction}
              initial={{ opacity: 0, x: direction === "right" ? 100 : -100 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ opacity: 0, x: direction === "right" ? -100 : 100 }}
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