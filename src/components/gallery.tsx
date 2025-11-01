interface GalleryProps {
  title: string
  description: string
  images: string[]
}

export default function Gallery({
  title,
  description,
  images
}: GalleryProps) {
  return (
    <section className="py-20 bg-neutral-900">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-yellow-500 mb-4">
              {title}
            </h2>
            <p className="text-lg text-neutral-200 max-w-2xl mx-auto">
              {description}
            </p>
          </div>

          <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
            {images.map((img, i) => (
              <div
                key={i}
                className="relative group overflow-hidden rounded-xl bg-neutral-800 shadow-lg hover:shadow-xl transition-all duration-300 break-inside-avoid mb-6"
              >
                <img
                  src={img}
                  alt={`Imagen ${i + 1} de la galería`}
                  className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
  )
}
