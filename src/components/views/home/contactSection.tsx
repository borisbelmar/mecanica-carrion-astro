import { MapPin } from "lucide-react"
import { IconBrandWhatsapp, IconBrandInstagram } from "@tabler/icons-react";


export function ContactSection() {
  return (
    <section className="bg-yellow-400 text-black py-20 px-6" id="contact">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-8">
          <h2 className="text-3xl md:text-5xl font-extrabold">
            Ven a conocernos
          </h2>
          <p className="text-lg">
            Si tienes una moto que necesita mantenimiento, una restauración pendiente o sueñas con una modificación única, contáctanos.
          </p>
          <ul className="space-y-4">
            <li className="flex items-center gap-4">
              <IconBrandInstagram stroke={2} className="w-6 h-6" />
              <a
                href="https://www.instagram.com/mecanica_carrion"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-zinc-800"
              >
                @mecanica_carrion
              </a>
            </li>
            <li className="flex items-center gap-4">
              <IconBrandWhatsapp className="w-6 h-6" />
              <a
                href="https://wa.me/56941252285"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-zinc-800"
              >
                +56 9 4125 2285
              </a>
            </li>
            <li className="flex items-center gap-4">
              <MapPin className="w-6 h-6" />
              <span>Taller en Quinta Normal, Santiago, Chile</span>
            </li>
          </ul>
        </div>
        <div className="rounded-xl overflow-hidden shadow-lg">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3329.8031736905737!2d-70.71147722409387!3d-33.428375496382344!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9662c57dc0737455%3A0x4965d1732f41ac2d!2s%40Mecanica_Carrion!5e0!3m2!1sen!2scl!4v1754251438482!5m2!1sen!2scl"
            width="100%"
            height="320"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </section>
  )
}
