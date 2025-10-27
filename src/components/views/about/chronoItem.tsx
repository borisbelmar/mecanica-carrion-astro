import type { AboutPageData } from "@/lib/sanity";
import { cn } from "@/lib/utils";

interface ChronoItemProps {
  generationBlock: AboutPageData['historyBlocks'][0]
  className?: string
  inverted?: boolean
  index: number
}

export function ChronoItem({ generationBlock, className, inverted, index }: ChronoItemProps) {
  // El cuarto elemento (índice 3) tiene un diseño especial con texto centrado y 3 fotos
  if (index === 3) {
    return (
      <div className={cn('flex flex-col items-center text-center', className)}>
        <div className="my-16">
          <div className="mb-4">
            <span className="inline-block px-2.5 py-1.5 bg-yellow-400 text-black text-xs font-bold rounded-lg">
              {generationBlock.decade}
            </span>
          </div>
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
            {generationBlock.title}
          </h3>
          <p className="text-yellow-400 font-light mb-4 text-lg italic">
            {generationBlock.subtitle}
          </p>
          <p className="text-gray-300 leading-relaxed">
            {generationBlock.description}
          </p>
        </div>
        
        {generationBlock.images && generationBlock.images.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl">
            {generationBlock.images.slice(0, 3).map((img, imgIndex) => (
              <img 
                key={imgIndex}
                src={img} 
                alt={`${generationBlock.decade} - ${generationBlock.title} - Imagen ${imgIndex + 1}`}
                className="w-full h-48 object-cover rounded-lg shadow-lg"
              />
            ))}
          </div>
        )}
      </div>
    )
  }

  // Diseño normal para los primeros 3 elementos
  const textContent = (
    <div className="flex flex-col justify-center">
      <div className="mb-2">
        <span className="inline-block px-2.5 py-1.5 bg-yellow-400 text-black text-xs font-bold rounded-lg">
          {generationBlock.decade}
        </span>
      </div>
      <h3 className="text-2xl md:text-3xl font-bold text-white mb-0">
        {generationBlock.title}
      </h3>
      <p className="text-yellow-400 font-light mb-4 text-lg italic">
        {generationBlock.subtitle}
      </p>
      <p className="text-gray-300 leading-relaxed text-sm">
        {generationBlock.description}
      </p>
    </div>
  );

  const imageContent = generationBlock.images ? (
    <div className="grid grid-cols-1 gap-4">
      {generationBlock.images.map((img, index) => (
        <img
          key={index}
          src={img}
          alt={`${generationBlock.decade} - ${generationBlock.title} - Imagen ${index + 1}`}
          className="w-full h-48 object-cover rounded-lg"
        />
      ))}
    </div>
  ) : generationBlock.image ? (
    <img
      src={generationBlock.image}
      alt={`${generationBlock.decade} - ${generationBlock.title}`}
      className="w-full md:1/3 h-64 object-cover rounded-lg"
    />
  ) : null;

  return (
    <div className={cn(
      'grid grid-cols-1 md:grid-cols-2 gap-8 items-center',
      inverted ? 'md:grid-cols-[1fr_2fr]' : 'md:grid-cols-[2fr_1fr]',
      className
    )}>
      <div className="md:hidden">
        {textContent}
      </div>
      <div className="md:hidden">
        {imageContent}
      </div>
      <div className="hidden md:contents">
        {inverted ? (
          <>
            {imageContent}
            {textContent}
          </>
        ) : (
          <>
            {textContent}
            {imageContent}
          </>
        )}
      </div>
    </div>
  )
}