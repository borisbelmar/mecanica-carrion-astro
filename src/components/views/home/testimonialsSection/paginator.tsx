import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginatorProps {
  paginate: (direction: 'right' | 'left') => void;
}

export function Paginator({ paginate }: PaginatorProps) {
  return (
    <div className="flex justify-center mt-8 gap-6">
      <button
        onClick={() => paginate("left")}
        className="p-2 rounded-full bg-white/10 hover:bg-yellow-400/20 transition"
      >
        <ChevronLeft className="text-white" />
      </button>
      <button
        onClick={() => paginate("right")}
        className="p-2 rounded-full bg-white/10 hover:bg-yellow-400/20 transition"
      >
        <ChevronRight className="text-white" />
      </button>
    </div>
  )
}