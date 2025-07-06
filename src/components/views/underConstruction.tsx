import { MapPin } from "lucide-react";
import SvgIso from "../svgIso";
import SvgLogo from "../svgLogo";
import { IconBrandWhatsapp } from "@tabler/icons-react"

export default function UnderConstruction() {
  return (
    <section className="flex flex-col items-center justify-center min-h-screen">
      <div className="flex flex-col items-center justify-center z-10 text-center">
        <SvgIso className="h-18 md:h-32 text-white" />
        <SvgLogo className="w-32 md:w-64 text-white mt-4" />
        <h1 className="text-xl md:text-2xl text-white mt-8">
          Estamos trabajando en algo nuevo
        </h1>
        <p className="text-base md:text-lg text-gray-300 mt-2">
          Vuelve pronto para descubrir nuestras novedades.
        </p>
        <p className="text-base md:text-lg text-gray-300 mt-2">
          Síguenos en Instagram{" "}
          <a href="https://instagram.com/mecanica_carrion" className="font-bold hover:underline">
            @mecanica_carrion
          </a>
          {" "}para actualizaciones.
        </p>
        <div className="flex items-center justify-center mt-8 gap-2">
          <MapPin className="h-6 w-6 text-white" />
          <a href="https://maps.app.goo.gl/ArdJr3d9eBFVDMzv7" target="_blank" rel="noopener noreferrer" className="text-base md:text-lg text-gray-300 underline hover:text-white">
            Molina Lavin 1749, Quinta Normal, Santiago
          </a>
        </div>
      </div>
      <a
        href="https://wa.me/56941252285?text=Hola%2C%20quiero%20agendar%20una%20cita"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed right-6 bottom-6 z-20 flex items-center px-4 py-2 bg-green-500 text-white rounded-full shadow-lg hover:bg-green-600 transition-colors gap-2"
      >
        <IconBrandWhatsapp stroke={2} />
        <span className="text-sm">Agendar cita</span>
      </a>
      <div className="fixed top-0 w-screen h-screen bg-gray-900" style={{ zIndex: -1 }}>
        <img src="/images/moto-dark-bg-min.jpg" alt="Moto Background" className="w-full h-full object-cover" />
      </div>
    </section>
  )
}
