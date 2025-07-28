import type { Testimonial } from "@/lib/sanity"

interface TestimonialCardProps {
  testimonial: Testimonial
}

export function TestimonialCard ({ testimonial }: TestimonialCardProps) {
  return (
    <div
      className="flex-1 bg-white/5 border border-yellow-400/20 backdrop-blur p-6 rounded-xl flex flex-col justify-center text-left min-h-[240px] max-h-[240px] max-w-xl mx-auto"
    >
      <p className="text-white/90 italic mb-6 text-sm sm:text-base">
        “{testimonial.quote}”
      </p>
      <div className="flex items-center gap-3 mt-auto">
        {testimonial.avatar ? (
          <img
            src={testimonial.avatar}
            alt={testimonial.name}
            className="w-10 h-10 rounded-full object-cover"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-yellow-400 text-black font-bold flex items-center justify-center text-sm">
            {testimonial.name.charAt(0)}
          </div>
        )}
        <div className="text-left">
          <p className="font-semibold text-yellow-400">
            {testimonial.name}
          </p>
          <div className="flex items-center gap-1 text-sm text-white/70">
            <p>{testimonial.bike}</p>
            {testimonial.instagram && (
              <>
                <span>|</span>
                <a
                  href={`https://www.instagram.com/${testimonial.instagram}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-yellow-400 hover:underline"
                >
                  @{testimonial.instagram}
                </a>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}