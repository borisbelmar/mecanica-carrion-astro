import { Button } from "@/components/ui/button";
import type { HomePageData } from "@/lib/sanity"

interface WorkshopSectionProps {
  data?: HomePageData | null
}

export function WorkshopSection({ data }: WorkshopSectionProps) {
  const workshopSection = data?.workshopSection || {
    title: "Nuestro Taller",
    paragraphs: [
      "Aquí es donde todo sucede. Un taller lleno de herramientas, historia, grasa, y muchas motos que han pasado por nuestras manos.",
      "Es un espacio que respira mecánica, donde el pasado y el futuro se cruzan. Ven a conocerlo, y a vivir la experiencia Carrión."
    ],
    buttonText: "Conocer más",
    buttonUrl: "/quienes-somos",
    images: ["/images/taller-1.webp", "/images/taller-2.webp", "/images/taller-3.webp"]
  }
  return (
    <section className="bg-yellow-500 px-6 py-24 text-black">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="grid grid-cols-2 grid-rows-2 gap-4 h-full">
          <img
            src={workshopSection.images[0]}
            alt="Taller Mecánica Carrión"
            className="row-span-2 w-full h-full object-cover rounded-xl shadow-lg"
          />
          <img
            src={workshopSection.images[1]}
            alt="Detalle del taller"
            className="w-full h-full object-cover rounded-xl shadow-lg"
          />
          <img
            src={workshopSection.images[2]}
            alt="Moto en proceso"
            className="w-full h-full object-cover rounded-xl shadow-lg"
          />
        </div>

        <div className="text-center md:text-left">
          <h2 className="text-2xl md:text-4xl font-extrabold mb-6">
            {workshopSection.title}
          </h2>
          {workshopSection.paragraphs.map((paragraph, index) => (
            <p key={index} className="text-base md:text-lg text-black/80 leading-relaxed mb-4">
              {paragraph}
            </p>
          ))}
          <a href={workshopSection.buttonUrl}>
            <Button size="lg" variant="outline" className="mt-8">
              {workshopSection.buttonText}
            </Button>
          </a>
        </div>
      </div>
    </section>
  )
}
