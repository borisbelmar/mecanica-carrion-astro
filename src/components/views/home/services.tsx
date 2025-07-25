import ServiceItem from "./serviceItem";

export default function Services() {
  return (
    <section className="py-24 bg-gray-900">
      <div className="max-w-6xl mx-auto px-8">
        <h2 className="text-xl sm:text-3xl font-bold text-white text-center mb-8">
          Nuestros Servicios
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <ServiceItem
            title="Mantención"
            description="Revisiones periódicas para mantener tu moto en óptimas condiciones."
            imageUrl="/images/mantenciones.webp"
          />
          <ServiceItem
            title="Modificaciones"
            description="Personaliza tu moto con modificaciones estéticas y de rendimiento."
            imageUrl="/images/modificaciones.webp"
          />
          <ServiceItem
            title="Restauración"
            description="Deja tu moto como nueva con nuestro servicio de restauración."
            imageUrl="/images/restauraciones.webp"
          />
        </div>
      </div>
    </section>
  )
}