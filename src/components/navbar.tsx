import SvgIso from "./svgIso"
import SvgLogo from "./svgLogo"
import { MainMenu } from "./mainMenu"

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 h-24 bg-black backdrop-blur border-b border-white/10">
      <div className="flex items-center justify-between h-full px-4 max-w-7xl mx-auto">
        <div className="w-6 sm:w-8" />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <a
            href="/"
            className="text-white text-xl font-bold tracking-wide whitespace-nowrap"
          >
           <figure className="flex items-center">
              <SvgIso className="h-12 mr-2" />
              <SvgLogo className="h-8" />
            </figure>
          </a>
        </div>
        <MainMenu />
      </div>
    </header>
  )
}
