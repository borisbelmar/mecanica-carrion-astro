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
  const [isUserInteracting, setIsUserInteracting] = useState(false)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)
  const touchThreshold = 50 // Minimum distance for a swipe

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
    const chunkSize = isMobile ? 1 : 3
    if (testimonials.length <= chunkSize) {
      setPages([testimonials])
      setIndex(0)
      return 
    }
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
    // Reset user interaction after a delay
    setIsUserInteracting(true)
    setTimeout(() => setIsUserInteracting(false), 3000)
  }, [pages.length])

  useEffect(() => {
    if (pages.length === 0 || isUserInteracting) return
    const interval = setInterval(() => {
      paginate("right")
    }, 15000)
    return () => clearInterval(interval)
  }, [pages, index, paginate, isUserInteracting])

    const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > touchThreshold
    const isRightSwipe = distance < -touchThreshold

    if (isLeftSwipe && pages.length > 1) {
      paginate("right")
    }
    if (isRightSwipe && pages.length > 1) {
      paginate("left")
    }
  }


  return {
    pages,
    index,
    direction,
    isMobile,
    paginate,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd
  }
}