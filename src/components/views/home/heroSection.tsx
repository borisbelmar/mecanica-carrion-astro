// components/HeroSection.tsx
import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ height: "calc(100vh - 6rem)" }}
    >
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        src="/videos/home-video.mp4"
      />
      <div className="absolute inset-0 bg-black/60 backdrop-brightness-75 bg-blend-overlay" />
        <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-center md:items-start md:text-left max-w-6xl mx-auto">
        <div className="w-24 h-2 bg-yellow-400 mb-6 hidden md:block" />
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white leading-tight">
          Pasión que ruge. <br /> Mecánica con historia.
        </h1>
        <p className="mt-4 text-lg sm:text-2xl text-white/80 italic">
          Desde hace tres generaciones.
        </p>
        <Button size="lg" className="mt-8 bg-yellow-400 text-black font-semibold hover:bg-yellow-500 transition">
          Ver más
        </Button>
      </div>
    </section>
  )
}
