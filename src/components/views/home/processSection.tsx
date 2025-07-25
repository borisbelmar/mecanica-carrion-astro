import {
  ClipboardList,
  FileText,
  Hammer,
  CheckCircle2,
} from "lucide-react"

export function ProcessSection() {
  const steps = [
    {
      icon: <ClipboardList className="w-8 h-8 text-yellow-400" />,
      title: "Diagnóstico",
      description: "Revisamos tu moto contigo y evaluamos el trabajo necesario.",
    },
    {
      icon: <FileText className="w-8 h-8 text-yellow-400" />,
      title: "Presupuesto",
      description: "Te entregamos una propuesta clara, justa y sin sorpresas.",
    },
    {
      icon: <Hammer className="w-8 h-8 text-yellow-400" />,
      title: "Trabajo en marcha",
      description: "Comenzamos a trabajar y te mantenemos informado del progreso.",
    },
    {
      icon: <CheckCircle2 className="w-8 h-8 text-yellow-400" />,
      title: "Entrega",
      description: "Recibes tu moto lista para rugir otra vez. Garantía incluida.",
    },
  ]

  return (
    <section className="bg-black text-white px-6 py-24">
      <div className="max-w-6xl mx-auto text-center">
        <div className="mb-16">
          <h2 className="text-2xl md:text-5xl font-extrabold text-yellow-400 mb-4">
            Nuestro Proceso
          </h2>
          <p className="text-lg md:text-xl text-white/90 mb-4 leading-relaxed">
            En Mecánica Carrión, seguimos un proceso claro y transparente para garantizar la satisfacción de nuestros clientes.
          </p>
        </div>

        <div className="grid gap-12 md:grid-cols-4">
          {steps.map((step, i) => (
            <div
              key={i}
              className="flex flex-col items-center text-center px-4"
            >
              <div className="mb-4">{step.icon}</div>
              <h3 className="text-xl font-bold text-yellow-400 mb-2">
                {step.title}
              </h3>
              <p className="text-white/80 text-base">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
