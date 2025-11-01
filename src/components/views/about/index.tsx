import type { AboutPageData } from "@/lib/sanity";
import { ChronoItem } from "./chronoItem"
import Gallery from "@/components/gallery";

interface AboutPageProps {
  aboutPageData: AboutPageData
}

export function AboutPage({
  aboutPageData
}: AboutPageProps) {
  return (
    <div>
      <section
        className="relative h-screen flex items-center"
        style={{ height: "calc(100vh - 6rem)" }}
      >
        <div className="absolute inset-0">
          <img
            src={aboutPageData.heroImage}
            alt="Historia de Mecánica Carrión"
            className="w-full h-full object-cover object-left-top"
          />
          <div className="absolute inset-0 bg-black/70" />
        </div>

        <div className="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-12 py-20">
          <div className="max-w-4xl">
            <div className="mb-8">
              <span className="inline-block px-6 py-2 bg-yellow-400 text-black text-sm font-bold rounded-full">
                {aboutPageData.heroBadge}
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-8">
              {aboutPageData.heroTitle}
            </h1>
            <p className="text-xl text-gray-200 max-w-2xl leading-relaxed">
              {aboutPageData.heroSubtitle}
            </p>
          </div>
        </div>
      </section>

      <section className="py-36 px-8 bg-neutral-950">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-yellow-400 mb-6">
              {aboutPageData.sectionTitle}
            </h2>
            <p className="text-xl text-neutral-400 max-w-3xl mx-auto leading-relaxed">
              {aboutPageData.sectionDescription}
            </p>
          </div>
          <div>
            <div className="flex flex-col gap-16">
              {aboutPageData.historyBlocks.map((block, index) => (
                <ChronoItem
                  key={index}
                  generationBlock={block}
                  inverted={index % 2 === 1}
                  index={index}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <Gallery
        title={aboutPageData.galleryTitle}
        description={aboutPageData.galleryDescription}
        images={aboutPageData.galleryImages}
      />

      <section className="py-20 bg-neutral-800">
        <div className="max-w-4xl mx-auto px-6 md:px-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            {aboutPageData.ctaTitle}
          </h2>
          <p className="text-xl text-gray-300 mb-8 leading-relaxed max-w-3xl mx-auto">
            {aboutPageData.ctaDescription}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/#contact" className="px-8 py-4 bg-yellow-400 text-black font-bold rounded-xl hover:bg-yellow-500 transition-all duration-300">
              {aboutPageData.primaryButtonText}
            </a>
            <a href="/#services" className="px-8 py-4 border-2 border-yellow-400 text-yellow-400 font-bold rounded-xl hover:bg-yellow-400 hover:text-black transition-all duration-300">
              {aboutPageData.secondaryButtonText}
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
