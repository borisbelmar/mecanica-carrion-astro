import { useCallback, useEffect, useState } from "react";

import type { Testimonial } from "@/lib/sanity";

function chunk<T>(arr: T[], size: number): T[][] {
  return Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
    arr.slice(i * size, i * size + size)
  )
}

export function useTestimonialsSlider(testimonials: Testimonial[]) {
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

  return {
    pages,
    index,
    direction,
    isMobile,
    paginate,
  }
}