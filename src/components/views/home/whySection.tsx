import type { HomePageData } from "@/lib/sanity"

interface WhySectionProps {
  data?: HomePageData | null
}

export function WhySection({ data }: WhySectionProps) {
  const whySection = data?.whySection || {
    title: "No somos solo un taller.",
    paragraphs: [
      "Somos una familia que lleva tres generaciones viviendo la mecánica como forma de vida. Aquí, cada moto que entra es tratada como si fuera nuestra.",
      "Porque no reparamos por rutina. Lo hacemos por pasión. Porque entendemos lo que significa esa moto para ti: libertad, carácter y una historia que continúa."
    ],
    image: "/images/reason-why.png"
  }
  return (
    <section className="bg-black text-white px-6 py-12 md:py-28 relative overflow-hidden">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-12 pb-64 md:pb-0">
        <div className="text-center md:text-left md:w-1/2 z-10">
          <h2 className="text-yellow-400 text-3xl sm:text-4xl md:text-5xl font-extrabold mb-6">
            {whySection.title}
          </h2>
          {whySection.paragraphs.map((paragraph, index) => (
            <p key={index} className="text-lg text-white/90 mb-4 leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>

        <div className="sm:w-1/2 absolute md:relative opacity-50 md:opacity-100 bottom-16 md:bottom-0">
          <img
            src={whySection.image}
            alt="Nuestro equipo trabajando"
            className="rounded-lg shadow-lg"
          />
        </div>
      </div>
    </section>
  )
}
