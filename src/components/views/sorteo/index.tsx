import qrCode from './qr.png'
import bgVideo from './bg-video.mp4'
import logo from '@/assets/logo.svg'

export default function SorteoView() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6 py-12">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src={bgVideo} type="video/mp4" />
      </video>
      
      <div className="absolute inset-0 bg-black/85" />

      <div className="relative z-10 max-w-lg w-full text-center">
        <div className="mb-8 flex justify-center">
          <img src={logo.src} alt="Mecánica Carrión" className="w-24 h-auto brightness-0 invert" />
        </div>

        <h1 className="text-4xl font-bold text-yellow-400 mb-6">
          ¡En Mecánica Carrión tenemos sorteo!
        </h1>
        <p className="text-base text-gray-300 mb-8">
          Escanea el código QR a continuación para ingresar al sorteo y tener la oportunidad de ganar increíbles premios para ti y tu moto. Para participar síguenos en Instagram <b>@mecanica_carrion</b>.
        </p>
        <div className="flex justify-center mb-8">
          <img src={qrCode.src} alt="Código QR para el sorteo" className="w-54 h-54 bg-white p-2 rounded-md" />
        </div>
        <p className="text-sm text-gray-400">
          El sorteo se realizará el 29 de noviembre 2025. Consulta los términos y condiciones en nuestro sitio web.
        </p>
      </div>
    </div>
  )
}