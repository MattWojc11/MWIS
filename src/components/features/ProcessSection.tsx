'use client'

import { useEffect, useState } from 'react'

const processes = [
  {
    number: '01',
    title: 'Konsultacja',
    description: 'Poznajemy Twoje potrzeby i cele biznesowe, doradzamy najlepsze rozwiązania.'
  },
  {
    number: '02',
    title: 'Rozwój',
    description: 'Tworzymy stronę z wykorzystaniem nowoczesnych technologii i najlepszych praktyk.'
  },
  {
    number: '03',
    title: 'Optymalizacja',
    description: 'Dbamy o szybkość działania i pozycjonowanie w wyszukiwarkach.'
  },
  {
    number: '04',
    title: 'Wdrożenie',
    description: 'Publikujemy stronę i przeprowadzamy niezbędne testy.'
  },
  {
    number: '05',
    title: 'Wsparcie',
    description: 'Zapewniamy stałą administrację i rozwój Twojej strony.'
  }
]

export default function ProcessSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [activeStep, setActiveStep] = useState<number | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    const section = document.getElementById('process-section')
    if (section) {
      observer.observe(section)
    }

    return () => {
      if (section) {
        observer.unobserve(section)
      }
    }
  }, [])

  return (
    <section id="process-section" className="py-24 bg-gradient-to-br from-gray-50 to-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`
          text-center mb-20
          transition-all duration-700 delay-200
          ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
        `}>
          <h2 className="text-4xl md:text-5xl font-serif text-gray-900 mb-4">
            Proces <span className="text-blue-600">Realizacji</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Nasze podejście do projektów zapewnia przewidywalność i wysoką jakość
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          <div className="md:col-span-2">
            <ProcessCard process={processes[0]} index={0} isVisible={isVisible} activeStep={activeStep} setActiveStep={setActiveStep} />
          </div>
          <div className="md:col-span-3">
            <ProcessCard process={processes[1]} index={1} isVisible={isVisible} activeStep={activeStep} setActiveStep={setActiveStep} />
          </div>

          <div className="md:col-span-3">
            <ProcessCard process={processes[2]} index={2} isVisible={isVisible} activeStep={activeStep} setActiveStep={setActiveStep} />
          </div>
          <div className="md:col-span-2">
            <ProcessCard process={processes[3]} index={3} isVisible={isVisible} activeStep={activeStep} setActiveStep={setActiveStep} />
          </div>

          <div className="md:col-span-5">
            <ProcessCard process={processes[4]} index={4} isVisible={isVisible} activeStep={activeStep} setActiveStep={setActiveStep} />
          </div>
        </div>
      </div>
    </section>
  )
}

interface ProcessCardProps {
  process: typeof processes[0]
  index: number
  isVisible: boolean
  activeStep: number | null
  setActiveStep: (index: number | null) => void
}

function ProcessCard({ process, index, isVisible, activeStep, setActiveStep }: ProcessCardProps) {
  return (
    <div
      className={`
        group relative h-full
        transition-all duration-500 delay-[${(index + 1) * 100}ms]
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
      `}
      onMouseEnter={() => setActiveStep(index)}
      onMouseLeave={() => setActiveStep(null)}
    >
      {/* Tło */}
      <div className="absolute inset-0 bg-white shadow-lg rounded-2xl transform -skew-x-3 transition-transform duration-300 group-hover:skew-x-0" />
      
      {/* Zawartość */}
      <div className="relative p-6 h-full">
        <div className="flex items-start space-x-4 h-full">
          {/* Numer */}
          <div className={`
            flex-none w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600
            flex items-center justify-center rounded-xl transform -rotate-6
            transition-all duration-300 group-hover:rotate-0 group-hover:scale-110
          `}>
            <span className="text-xl font-bold text-white">{process.number}</span>
          </div>

          {/* Tekst */}
          <div className="flex-1 pt-2">
            <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
              {process.title}
            </h3>
            <p className="text-gray-600">
              {process.description}
            </p>
          </div>
        </div>

        {/* Dekoracyjna linia */}
        <div className={`
          absolute bottom-0 left-0 h-1 bg-gradient-to-r from-blue-500 to-blue-600
          transition-all duration-300 rounded-full
          ${activeStep === index ? 'w-full opacity-100' : 'w-0 opacity-0'}
        `} />
      </div>
    </div>
  )
} 