export default function Slider() {
  return (
    <div
      className="relative flex flex-col items-center justify-center flex-1 min-h-screen"
    >
      <div className="absolute inset-0 bg-black">
        <picture>
          <source
            srcSet="/images/bg-desktop-en-construccion.webp"
            media="(min-width: 768px)"
          />
          <img
            src="/images/bg-mobile-en-construccion.webp"
            alt="Background"
            className="w-full h-full object-cover"
          />
        </picture>
      </div>
      <div className="z-10 text-center p-4">
        <h1 className="text-white text-4xl md:text-6xl font-bold text-center drop-shadow-lg">
          "Tu confianza, nuestro compromiso"
        </h1>
      </div>
    </div>
  )
}