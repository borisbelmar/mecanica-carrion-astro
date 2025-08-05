import type { HistoryBlock } from "@/lib/sanity";
import { cn } from "@/lib/utils";

interface ChronoItemProps {
  generationBlock: HistoryBlock
  className?: string
  inverted?: boolean
}

export function ChronoItem({ generationBlock, className, inverted }: ChronoItemProps) {
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

  const imageContent = (
    <img
      src={generationBlock.image}
      alt={`${generationBlock.decade} - ${generationBlock.title}`}
      className="w-full md:1/3 h-64 object-cover rounded-lg"
    />
  );

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