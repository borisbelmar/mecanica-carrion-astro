"use client"

import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { SliderSafeLink } from "@/components/sliderSafeLink"
import { fetchBrands, type Brand } from "@/lib/sanity"

function chunkArray<T>(array: T[], size: number): T[][] {
  const chunks: T[][] = []
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size))
  }
  return chunks
}

export function BrandsCarousel() {
  const intervalDuration = 4000
  const [chunkSize, setChunkSize] = useState(3)
  const [brands, setBrands] = useState<Brand[]>([])

  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState<"left" | "right">("right")

  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const chunks = chunkArray(brands, chunkSize)
  const currentChunk = chunks[currentIndex] ?? []

  useEffect(() => {
    fetchBrands()
      .then(data => setBrands(data))
      .catch(err => console.error("Error fetching brands:", err))
  }, [])

  const resetAutoScroll = () => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    intervalRef.current = setInterval(() => {
      setDirection("right")
      setCurrentIndex((prev) => (prev + 1) % chunks.length)
    }, intervalDuration)
  }

  useEffect(() => {
    const checkSize = () => {
      const desktop = window.matchMedia("(min-width: 768px)").matches
      setChunkSize(desktop ? 5 : 3)
    }

    checkSize()
    window.addEventListener("resize", checkSize)
    return () => window.removeEventListener("resize", checkSize)
  }, [])

  useEffect(() => {
    resetAutoScroll()
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [chunks.length])

  const handleManualChange = (i: number) => {
    if (i === currentIndex) return
    setDirection(i > currentIndex ? "right" : "left")
    setCurrentIndex(i)
    resetAutoScroll()
  }

  const handleSwipe = (swipe: number) => {
    if (swipe > 50) {
      const next = (currentIndex - 1 + chunks.length) % chunks.length
      setDirection("left")
      setCurrentIndex(next)
      resetAutoScroll()
    } else if (swipe < -50) {
      const next = (currentIndex + 1) % chunks.length
      setDirection("right")
      setCurrentIndex(next)
      resetAutoScroll()
    }
  }

  return (
    <section className="bg-black py-20 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-2xl md:text-3xl font-extrabold text-yellow-400 mb-12">
          Marcas y Clientes que confiaron en nosotros
        </h2>

        {/* Wrapper del slide */}
        <div className="relative h-36 flex items-center justify-center overflow-hidden">

          {/* Pre-renderizado invisible del slide activo */}
          <div className="absolute opacity-0 pointer-events-none">
            <div className="flex gap-6">
              {currentChunk.map((brand, i) => (
                <div
                  key={i}
                  className="w-24 h-24 md:w-28 md:h-28 rounded-lg overflow-hidden"
                >
                  <img
                    src={brand.image}
                    alt={brand.name}
                    className="w-full h-full object-cover"
                    draggable={false}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Carrusel animado */}
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              initial={{ x: direction === "right" ? 300 : -300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: direction === "right" ? -300 : 300, opacity: 0 }}
              transition={{ duration: 0.5 }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={(_e, info) => handleSwipe(info.offset.x)}
              className="absolute flex gap-6"
            >
              {currentChunk.map((brand, i) => (
                <SliderSafeLink
                  key={brand._id}
                  href={brand.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-24 h-24 md:w-35 md:h-35 rounded-lg overflow-hidden transition flex-shrink-0"
                >
                  <img
                    src={brand.image}
                    alt={brand.name}
                    className="w-full h-full object-contain bg-white p-2 hover:scale-105 transition-transform duration-300"
                    draggable={false}
                  />
                </SliderSafeLink>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {chunks.length > 1 && (
          <div className="flex justify-center mt-6 gap-2">
            {chunks.map((_, i) => (
              <button
                key={i}
                onClick={() => handleManualChange(i)}
                className={`relative w-2.5 h-2.5 rounded-full overflow-hidden transition-all duration-300 ${
                  i === currentIndex ? "bg-yellow-400/30 w-5" : "bg-zinc-500"
                }`}
              >
                {i === currentIndex && (
                  <motion.div
                    key={i}
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: intervalDuration / 1000, ease: "linear" }}
                    className="absolute top-0 left-0 h-full bg-yellow-400 opacity-100"
                  />
                )}
              </button>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
