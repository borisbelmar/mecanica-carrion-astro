"use client"

import { useRef } from "react"

type Props = React.ComponentProps<"a">

export function SliderSafeLink({ onClick, onPointerDown, onPointerMove, onPointerUp, ...props }: Props) {
  const dragRef = useRef({ isDragging: false })

  return (
    <a
      {...props}
      onClick={(e) => {
        if (dragRef.current.isDragging) {
          e.preventDefault()
        }
        if (onClick) onClick(e)
      }}
      onPointerDown={(e) => {
        dragRef.current.isDragging = false
        if (onPointerDown) onPointerDown(e)
      }}
      onPointerMove={(e) => {
        dragRef.current.isDragging = true
        if (onPointerMove) onPointerMove(e)
      }}
      onPointerUp={(e) => {
        setTimeout(() => {
          dragRef.current.isDragging = false
        }, 0)
        if (onPointerUp) onPointerUp(e)
      }}
      draggable={false}
    />
  )
}
