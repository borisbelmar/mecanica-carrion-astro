import { Button } from "@/components/ui/button";

export function WorkshopSection() {
  return (
    <section className="bg-yellow-500 px-6 py-24 text-black">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="grid grid-cols-2 grid-rows-2 gap-4 h-full">
          <img
            src="/images/taller-1.webp"
            alt="Taller Mecánica Carrión"
            className="row-span-2 w-full h-full object-cover rounded-xl shadow-lg"
          />
          <img
            src="/images/taller-2.webp"
            alt="Detalle del taller"
            className="w-full h-full object-cover rounded-xl shadow-lg"
          />
          <img
            src="/images/taller-3.webp"
            alt="Moto en proceso"
            className="w-full h-full object-cover rounded-xl shadow-lg"
          />
        </div>

        <div className="text-center md:text-left">
          <h2 className="text-2xl md:text-4xl font-extrabold mb-6">
            Nuestro Taller
          </h2>
          <p className="text-base md:text-lg text-black/80 leading-relaxed">
            Aquí es donde todo sucede.  
            Un taller lleno de herramientas, historia, grasa, y muchas motos que han pasado por nuestras manos.
          </p>
          <p className="mt-4 text-base md:text-lg text-black/80 leading-relaxed">
            Es un espacio que respira mecánica, donde el pasado y el futuro se cruzan.  
            Ven a conocerlo, y a vivir la experiencia Carrión.
          </p>
          <Button size="lg" variant="outline" className="mt-8">
            Conocer más
          </Button>
        </div>
      </div>
    </section>
  )
}
