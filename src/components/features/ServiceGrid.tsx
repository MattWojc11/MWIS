'use client'

import { Globe, Rocket, Clock, Shield, LineChart, Cog } from 'lucide-react'
import { useEffect, useState } from 'react'

const services = [
  {
    icon: Globe,
    title: 'Landing Page',
    description: 'Minimalistyczne i przyciągające uwagę strony jednostronicowe, idealne dla prostej prezentacji.'
  },
  {
    icon: Rocket,
    title: 'Strony z Podstronami',
    description: 'Rozbudowane strony z kompleksową prezentacją Twojej działalności.'
  },
  {
    icon: Clock,
    title: 'Szybka Realizacja',
    description: 'Tworzymy strony w oparciu o nowoczesne standardy, zapewniając szybką realizację.'
  },
  {
    icon: Shield,
    title: 'Bezpieczeństwo',
    description: 'Gwarantujemy bezpieczny hosting i regularne kopie zapasowe Twojej strony.'
  },
  {
    icon: LineChart,
    title: 'Optymalizacja SEO',
    description: 'Dbamy o widoczność Twojej strony w wyszukiwarkach internetowych.'
  },
  {
    icon: Cog,
    title: 'Wsparcie Techniczne',
    description: 'Zapewniamy stałe wsparcie techniczne i pomoc w obsłudze strony.'
  }
]

export default function ServiceGrid() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    const section = document.getElementById('services-section')
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
    <section id="services-section" className="py-32 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className={`
          text-center mb-20
          transition-all duration-700 delay-200
          ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
        `}>
          <h2 className="text-4xl md:text-5xl font-serif text-gray-900 mb-4">
            Nasze <span className="text-blue-600">Usługi</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Oferujemy kompleksowe rozwiązania w zakresie tworzenia stron internetowych
          </p>
        </div>

        {/* Services grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={service.title}
              className={`
                group relative
                transition-all duration-700 delay-[${(index + 1) * 100}ms]
                ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
              `}
            >
              <div className="relative p-[1px] rounded-2xl bg-gradient-to-br from-blue-500 via-blue-400 to-blue-300">
                <div className="relative bg-white p-8 rounded-xl group-hover:bg-blue-50/80 transition-all duration-300">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
                  
                  {/* Content */}
                  <div className="relative z-10">
                    <div className="flex items-center space-x-4 mb-6">
                      <div className="p-2 rounded-lg bg-blue-50 group-hover:bg-blue-100/80 transition-colors duration-300">
                        <service.icon className="h-6 w-6 text-blue-600" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900">{service.title}</h3>
                    </div>
                    <p className="text-gray-600 group-hover:text-gray-700 transition-colors">
                      {service.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
} 