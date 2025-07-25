'use client'

import SvgIso from "./svgIso"
import SvgLogo from "./svgLogo"
import { MainMenu } from "./mainMenu"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > window.innerHeight / 4)
    }
      window.addEventListener("scroll", handleScroll)
      return () => window.removeEventListener("scroll", handleScroll)
    }, [])

  return (
    <header
      className={cn(
        'sticky top-0 z-50 bg-black backdrop-blur border-b border-white/10 transition-all duration-300',
        scrolled ? 'h-12' : 'h-24'
      )}
    >
      <div className="flex items-center justify-between h-full px-4 max-w-7xl mx-auto">
      <div className="w-6 sm:w-8" />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <a
        href="/"
        className="text-white text-xl font-bold tracking-wide whitespace-nowrap"
        >
        <figure className="flex items-center">
          <SvgIso className={cn("h-12 mr-2 transition", scrolled && 'h-8')} />
          <SvgLogo className={cn("h-8 transition", scrolled && 'h-6')} />
        </figure>
        </a>
      </div>
      <MainMenu />
      </div>
    </header>
  )
}
