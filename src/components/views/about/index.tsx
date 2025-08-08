import type { HistoryBlock } from "@/lib/sanity";
import { ChronoItem } from "./chronoItem"

interface AboutPageProps {
  historyBlocks: HistoryBlock[]
  galleryImages: { src: string; alt: string }[]
}

export function AboutPage({
  historyBlocks,
  galleryImages
}: AboutPageProps) {
  return (
    <div>
      {/* Hero limpio y moderno */}
      <section
        className="relative h-screen flex items-center"
        style={{ height: "calc(100vh - 6rem)" }}
      >
        <div className="absolute inset-0">
          <img
            src="/images/bg-quienes-somos-min.jpg"
            alt="Historia de Mecánica Carrión"
            className="w-full h-full object-cover object-left-top"
          />
          <div className="absolute inset-0 bg-black/70" />
        </div>

        <div className="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-12 py-20">
          <div className="max-w-4xl">
            <div className="mb-8">
              <span className="inline-block px-6 py-2 bg-yellow-400 text-black text-sm font-bold rounded-full">
                Desde 1980
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-8">
              Una historia de tres generaciones
              <br />
              <span className="text-yellow-400">al servicio de la pasión por las motos</span>
            </h1>
            <p className="text-xl text-gray-200 max-w-2xl leading-relaxed">
              Más de 40 años de experiencia, tradición familiar y amor por las motocicletas nos respaldan.
            </p>
          </div>
        </div>
      </section>

      <section className="py-36 px-8 bg-neutral-950">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-yellow-400 mb-6">
              Nuestro Legado
            </h2>
            <p className="text-xl text-neutral-400 max-w-3xl mx-auto leading-relaxed">
              Tres generaciones preservando la tradición del trabajo artesanal y la pasión por las motocicletas
            </p>
          </div>
          <div>
            <div className="flex flex-col gap-8">
              {historyBlocks.map((block, index) => (
                <ChronoItem
                  key={index}
                  generationBlock={block}
                  inverted={index % 2 === 1}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Galería ordenada */}
      <section className="py-20 bg-neutral-900">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-yellow-500 mb-4">
              Nuestro Taller
            </h2>
            <p className="text-lg text-neutral-200 max-w-2xl mx-auto">
              Cada rincón cuenta una historia de dedicación y pasión por las motocicletas
            </p>
          </div>

          <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
            {galleryImages.map((img, i) => (
              <div
                key={i}
                className="relative group overflow-hidden rounded-xl bg-neutral-800 shadow-lg hover:shadow-xl transition-all duration-300 break-inside-avoid mb-6"
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA limpio y claro */}
      <section className="py-20 bg-neutral-800">
        <div className="max-w-4xl mx-auto px-6 md:px-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Forma parte de nuestra historia
          </h2>
          <p className="text-xl text-gray-300 mb-8 leading-relaxed max-w-3xl mx-auto">
            Confía en más de 40 años de experiencia y pasión por las motocicletas. 
            Tu moto merece el cuidado que solo tres generaciones de maestros pueden ofrecer.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/#contact" className="px-8 py-4 bg-yellow-400 text-black font-bold rounded-xl hover:bg-yellow-500 transition-all duration-300">
              Contacta con nosotros
            </a>
            <a href="/#services" className="px-8 py-4 border-2 border-yellow-400 text-yellow-400 font-bold rounded-xl hover:bg-yellow-400 hover:text-black transition-all duration-300">
              Ver nuestros servicios
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
