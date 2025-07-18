import { MapPin } from "lucide-react";
import SvgIso from "../svgIso";
import SvgLogo from "../svgLogo";
import { cn } from "@/lib/utils";
import WhatsappButton from "../whatsappButton";

export default function UnderConstruction() {
  return (
    <section className="flex flex-col items-center justify-center min-h-screen">
      <div className="flex flex-col items-center justify-center z-10 text-center px-2">
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
        <div className="flex flex-col md:flex-row items-center justify-center mt-8 gap-2">
          <MapPin className="h-6 w-6 text-white" />
          <a href="https://maps.app.goo.gl/ArdJr3d9eBFVDMzv7" target="_blank" rel="noopener noreferrer" className="text-base md:text-lg text-gray-300 underline hover:text-white">
            Molina Lavin 1749, Quinta Normal, Santiago
          </a>
        </div>
      </div>
      <WhatsappButton />
      <div
        className={cn(
          "fixed top-0 w-screen h-screen",
          "bg-[url('/images/bg-mobile-en-construccion.webp')] bg-cover bg-center",
          "md:bg-[url('/images/bg-desktop-en-construccion.webp')] bg-no-repeat",
          "backdrop-blur-lg brightness-50"
        )}
        style={{ zIndex: -1 }}
      />
    </section>
  )
}
