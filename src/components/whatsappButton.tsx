import { IconBrandWhatsapp } from "@tabler/icons-react";

export default function WhatsappButton() {
  return (
    <a
      href="https://wa.me/56941252285?text=Hola%2C%20quiero%20agendar%20una%20cita"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed right-6 bottom-6 z-20 flex items-center px-4 py-2 bg-green-500 text-white rounded-full shadow-lg hover:bg-green-600 transition-colors gap-2"
    >
      <IconBrandWhatsapp stroke={2} />
      <span className="text-sm">Agendar cita</span>
    </a>
  )
}