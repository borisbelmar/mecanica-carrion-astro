import { cn } from "@/lib/utils"

interface ProcessStep {
  step: string
  title: string
  description: string
}

interface ServiceProcessProps {
  processSteps: ProcessStep[]
  className?: string
}

export default function ServiceProcess({ processSteps, className }: ServiceProcessProps) {
  return (
    <div className={cn('text-center', className)}>
      <h3 className="text-2xl text-yellow-400 mb-12 font-light tracking-widest uppercase">
        Nuestro Proceso
      </h3>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
        {processSteps.map((step, stepIndex) => (
          <div key={stepIndex} className="group">
            <div className="relative">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full border border-yellow-400/30 bg-black/20 backdrop-blur-sm flex items-center justify-center group-hover:border-yellow-400 transition-all duration-300">
                <span className="text-yellow-400 font-mono text-lg">
                  {step.step}
                </span>
              </div>
              
              {stepIndex < processSteps.length - 1 && (
                <div className="hidden lg:block absolute top-10 left-full w-full h-px bg-gradient-to-r from-yellow-400/50 to-transparent"></div>
              )}
            </div>
            
            <h4 className="text-white font-medium mb-2">
              {step.title}
            </h4>
            <p className="text-gray-400 text-sm">
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}