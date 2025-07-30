"use client"

import { Menu, X } from "lucide-react"

import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
  DrawerClose,
} from "@/components/ui/drawer"

export function MainMenu() {
  return (
    <Drawer direction="right">
      <DrawerTrigger asChild>
        <button
          aria-label="Abrir menú"
          className="text-white hover:text-yellow-400 transition"
        >
          <Menu className="w-8 h-8" />
        </button>
      </DrawerTrigger>

      <DrawerContent className="bg-black text-white p-6 flex flex-col gap-6 items-start max-w-sm ml-auto">
        <div className="flex justify-between items-center w-full">
          <h2 className="text-lg font-bold text-yellow-400">Menú</h2>
          <DrawerClose asChild>
            <button aria-label="Cerrar menú">
              <X className="w-6 h-6 text-white" />
            </button>
          </DrawerClose>
        </div>

        <nav className="flex flex-col gap-4 mt-4 text-lg font-medium">
          <a href="/" className="hover:text-yellow-400 transition">Inicio</a>
          <a href="#servicios" className="hover:text-yellow-400 transition">Servicios</a>
          <a href="/proyectos" className="hover:text-yellow-400 transition">Proyectos</a>
          <a href="#quienes-somos" className="hover:text-yellow-400 transition">Quiénes somos</a>
          <a href="#contacto" className="hover:text-yellow-400 transition">Contacto</a>
        </nav>
      </DrawerContent>
    </Drawer>
  )
}
