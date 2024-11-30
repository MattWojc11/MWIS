'use client'

import { useEffect, useState } from 'react'
import { Layout, Zap, Clock, CheckCircle, ArrowRight } from 'lucide-react'

const services = [
  {
    title: 'Landing Page',
    variants: [
      {
        name: 'Z gotowego portfolio',
        price: '300',
        features: [
          'Szybka realizacja',
          'Responsywny design',
          'Podstawowa optymalizacja SEO',
          'Minimalistyczny design'
        ]
      },
      {
        name: 'Indywidualny projekt',
        price: '500',
        popular: true,
        features: [
          'Unikalna identyfikacja wizualna',
          'Dostosowany do Twoich potrzeb',
          'Zaawansowana optymalizacja SEO',
          'Nieograniczone poprawki'
        ]
      }
    ],
    description: 'Idealne rozwiązanie dla osób i firm, które potrzebują szybkiej, minimalistycznej i przyciągającej uwagę strony, zawierającej wszystkie kluczowe informacje w jednym miejscu.'
  },
  {
    title: 'Strona z Podstronami',
    variants: [
      {
        name: 'Z gotowego portfolio',
        price: '800',
        features: [
          'Do 5 podstron',
          'System zarządzania treścią',
          'Podstawowa optymalizacja SEO',
          'Responsywny design'
        ]
      },
      {
        name: 'Indywidualny projekt',
        price: '1000',
        popular: true,
        features: [
          'Nielimitowane podstrony',
          'Zaawansowany CMS',
          'Pełna optymalizacja SEO',
          'Unikalna identyfikacja wizualna'
        ]
      }
    ],
    description: 'Kompleksowe rozwiązanie dla firm, które chcą przyciągnąć klientów poprzez przejrzystą strukturę informacji i lepsze pozycjonowanie w wyszukiwarkach.'
  }
]

const benefits = [
  {
    title: 'Szybka realizacja',
    description: 'Każdą stronę tworzymy w oparciu o nowoczesne standardy, zapewniając estetyczny wygląd i łatwą obsługę.',
    icon: Clock,
    features: [
      'Realizacja w ciągu 7-14 dni',
      'Szybkie poprawki i zmiany',
      'Natychmiastowe wdrożenie'
    ]
  },
  {
    title: 'Indywidualne podejście',
    description: 'Projekt strony jest dostosowany do Twoich potrzeb i oczekiwań – jeśli masz wizję, stworzymy ją dla Ciebie!',
    icon: Layout,
    features: [
      'Konsultacje projektowe',
      'Dostosowanie do branży',
      'Spersonalizowany design'
    ]
  },
  {
    title: 'Transparentne ceny',
    description: 'Koszt jest z góry określony, bez ukrytych opłat i niespodzianek.',
    icon: CheckCircle,
    features: [
      'Jasny cennik usług',
      'Brak ukrytych kosztów',
      'Elastyczne formy płatności'
    ]
  }
]

// Dodajmy nową funkcję pomocniczą dla animacji
const slideVariants = (index: number, direction: 'x' | 'y' = 'y') => ({
  hidden: {
    opacity: 0,
    [direction === 'x' ? 'translateX' : 'translateY']: direction === 'x' ? 
      (index % 2 === 0 ? -40 : 40) : 40
  },
  visible: {
    opacity: 1,
    [direction === 'x' ? 'translateX' : 'translateY']: 0,
    transition: {
      duration: 0.5,
      delay: index * 0.2,
      ease: [0.43, 0.13, 0.23, 0.96]
    }
  }
})

export default function ServicesPage() {
  const [isVisible, setIsVisible] = useState(false)
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <main className="pt-24 bg-gray-50">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden bg-white">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-transparent" />
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(0,0,0,0.03) 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }} />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className={`
            max-w-3xl mx-auto text-center
            transition-all duration-1000
            ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
          `}>
            <div className="inline-flex items-center space-x-2 bg-blue-50 px-4 py-2 rounded-full text-sm mb-8">
              <Clock className="w-4 h-4 text-blue-600" />
              <span className="text-blue-600">Szybka realizacja</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-serif mb-6 text-gray-900">
              Nasze <span className="text-blue-600">Oferty</span>
            </h1>
            <p className="text-xl text-gray-600">
              Specjalizujemy się w tworzeniu funkcjonalnych i estetycznych stron internetowych, 
              które pomagają firmom i markom efektywnie prezentować się w sieci.
            </p>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {services.map((service, index) => (
              <div
                key={service.title}
                className={`
                  relative bg-white rounded-2xl overflow-hidden group/card
                  hover:shadow-xl transition-all duration-700
                  ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
                `}
                style={{ transitionDelay: `${index * 200}ms` }}
                onMouseEnter={() => setHoveredCard(service.title)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Animated background effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/0 to-blue-50/50 opacity-0 
                  group-hover/card:opacity-100 transition-opacity duration-700" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent)] 
                  opacity-0 group-hover/card:opacity-100 transition-opacity duration-700" />

                {/* Service Header with floating animation */}
                <div className="relative p-8 bg-gradient-to-br from-gray-50 to-white border-b border-gray-100
                  animate-float">
                  <div className="absolute top-0 right-0 w-40 h-40 bg-blue-50 rounded-full blur-3xl opacity-50 -z-10" />
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 group-hover/card:text-blue-600 transition-colors">
                    {service.title}
                  </h2>
                  <p className="text-gray-600 leading-relaxed">
                    {service.description}
                  </p>
                  <div className="mt-4 flex items-center space-x-2 text-sm text-gray-500">
                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full" />
                    <p className="italic">
                      Do ceny należy doliczyć koszt domeny + hostingu, który zaproponuję
                    </p>
                  </div>
                </div>

                {/* Variants with staggered animation */}
                <div className="p-8">
                  <div className="grid sm:grid-cols-2 gap-8">
                    {service.variants.map((variant, vIndex) => (
                      <div 
                        key={variant.name}
                        className={`
                          relative p-6 bg-white rounded-xl
                          group/variant cursor-pointer
                          transition-all duration-500 ease-out
                          hover:shadow-lg animate-fade-in
                          ${variant.popular ? 'ring-2 ring-blue-600' : 'border border-gray-100'}
                        `}
                        style={{ animationDelay: `${(index * 200) + (vIndex * 100)}ms` }}
                      >
                        {/* Hover effect ripple */}
                        <div className="absolute inset-0 bg-blue-50 rounded-xl scale-0 group-hover/variant:scale-100 
                          transition-transform duration-500 origin-center -z-10" />

                        {/* Popular badge */}
                        {variant.popular && (
                          <div className="absolute -top-3 -right-3">
                            <div className="relative">
                              <div className="absolute inset-0 bg-blue-600 blur-sm opacity-50" />
                              <div className="relative px-3 py-1 bg-blue-600 text-white text-sm font-medium rounded-full">
                                Popularny wybór
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Content */}
                        <div className="relative">
                          <h3 className="text-lg font-semibold text-gray-900 mb-4 group-hover/variant:text-blue-600 transition-colors">
                            {variant.name}
                          </h3>

                          {/* Price */}
                          <div className="flex items-baseline mb-6">
                            <span className="text-3xl font-bold text-blue-600">{variant.price}</span>
                            <span className="ml-2 text-gray-500">PLN</span>
                          </div>

                          {/* Animated features */}
                          <ul className="space-y-3 mb-6">
                            {variant.features.map((feature, fIndex) => (
                              <li 
                                key={feature} 
                                className="flex items-center text-gray-600 translate-x-0 transition-all duration-300"
                                style={{
                                  transform: hoveredCard === service.title ? 'translateX(8px)' : 'translateX(0)',
                                  transitionDelay: `${fIndex * 50}ms`
                                }}
                              >
                                <div className="mr-3 flex-shrink-0 w-5 h-5 rounded-lg bg-blue-50 flex items-center justify-center">
                                  <CheckCircle className="w-4 h-4 text-blue-600" />
                                </div>
                                <span className="text-sm">{feature}</span>
                              </li>
                            ))}
                          </ul>

                          {/* Animated button */}
                          <button className="w-full py-2.5 px-4 bg-white border-2 border-blue-600 text-blue-600 
                            rounded-lg font-medium relative overflow-hidden group-hover/variant:text-white
                            transition-colors duration-300">
                            <span className="relative z-10">Wybierz plan</span>
                            <div className="absolute inset-0 bg-blue-600 -translate-x-full 
                              group-hover/variant:translate-x-0 transition-transform duration-300" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Maintenance Service */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`
            relative bg-white rounded-xl border border-gray-100 overflow-hidden p-8
            hover:shadow-xl group/maintenance transition-all duration-500
            ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
          `}>
            {/* Animated background patterns */}
            <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(59,130,246,0.05)_25%,rgba(59,130,246,0.05)_50%,transparent_50%,transparent_75%,rgba(59,130,246,0.05)_75%)] bg-[length:64px_64px] opacity-0 group-hover/maintenance:opacity-100 transition-opacity duration-500" />
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/0 via-white to-blue-50/20" />

            <div className="grid md:grid-cols-2 gap-8 items-center relative">
              <div>
                <div className="inline-flex items-center space-x-2 bg-blue-50 px-4 py-2 rounded-full text-sm mb-6">
                  <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse" />
                  <span className="text-blue-600 font-medium">Aktywne wsparcie 24/7</span>
                </div>

                <h2 className="text-2xl font-semibold text-gray-900 mb-4 group-hover/maintenance:text-blue-600 transition-colors">
                  Administrowanie Stroną
                </h2>
                <p className="text-gray-600 mb-6">
                  Zapewniamy kompleksową obsługę i utrzymanie Twojej strony internetowej, 
                  abyś mógł skupić się na prowadzeniu swojego biznesu. Nasza usługa 
                  administracji gwarantuje bezpieczeństwo, aktualność i ciągłość działania 
                  Twojej witryny.
                </p>
                <ul className="space-y-4 mb-8">
                  {[
                    'Regularne aktualizacje systemu i wtyczek',
                    'Monitoring bezpieczeństwa i kopie zapasowe',
                    'Wsparcie techniczne i drobne modyfikacje',
                    'Optymalizacja wydajności i szybkości'
                  ].map((feature, idx) => (
                    <li 
                      key={feature} 
                      className="flex items-center text-gray-600 group-hover/maintenance:translate-x-2 transition-transform"
                      style={{ transitionDelay: `${idx * 75}ms` }}
                    >
                      <div className="relative">
                        <div className="absolute inset-0 bg-blue-600 rounded-full group-hover/maintenance:animate-ping opacity-30" />
                        <CheckCircle className="w-5 h-5 text-blue-600 mr-3 relative z-10" />
                      </div>
                      <span className="group-hover/maintenance:text-gray-900 transition-colors">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="relative">
                {/* Animated card background */}
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 to-blue-400 rounded-2xl opacity-5 blur-xl group-hover/maintenance:opacity-10 transition-opacity" />
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-white rounded-xl" />
                
                <div className="relative bg-white p-8 rounded-xl border border-gray-100 shadow-sm group-hover/maintenance:shadow-xl transition-all">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-100 to-transparent rounded-full blur-2xl opacity-0 group-hover/maintenance:opacity-60 transition-opacity" />
                  
                  <div className="text-center mb-6">
                    <span className="text-sm font-medium text-blue-600 bg-blue-50 px-4 py-2 rounded-full">
                      Miesięczna subskrypcja
                    </span>
                  </div>
                  
                  <div className="flex justify-center items-baseline mb-6 group-hover/maintenance:scale-110 transition-transform">
                    <span className="text-5xl font-bold text-gray-900">100</span>
                    <span className="text-xl text-gray-500 ml-2">PLN</span>
                    <span className="text-gray-500 ml-2">/msc</span>
                  </div>
                  
                  <div className="text-center mb-8">
                    <p className="text-sm text-gray-600">
                      Brak długoterminowych zobowiązań - możesz zrezygnować w dowolnym momencie
                    </p>
                  </div>

                  <button className="relative w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg overflow-hidden group/button">
                    <div className="absolute inset-0 bg-white opacity-0 group-hover/button:opacity-20 transition-opacity" />
                    <div className="relative flex items-center justify-center space-x-2">
                      <span className="font-medium group-hover/button:translate-x-1 transition-transform">
                        Zamów usługę
                      </span>
                      <div className="w-5 h-5 group-hover/button:translate-x-2 transition-transform">
                        <div className="absolute w-5 h-5 animate-ping opacity-30">
                          <ArrowRight className="w-5 h-5" />
                        </div>
                        <ArrowRight className="w-5 h-5" />
                      </div>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-serif text-gray-900 mb-4">
              Korzyści ze <span className="text-blue-600">Współpracy</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Wybierając naszą firmę, otrzymujesz nie tylko profesjonalną stronę internetową, 
              ale także kompleksową obsługę i wsparcie na każdym etapie realizacji.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon
              return (
                <div
                  key={benefit.title}
                  className={`
                    relative p-8 bg-white rounded-xl border border-gray-100 
                    hover:shadow-lg hover:border-blue-100 group
                    transition-all duration-700
                    ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
                  `}
                  style={{ transitionDelay: `${(index + 2) * 100}ms` }}
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full blur-2xl -z-10 opacity-0 group-hover:opacity-60 transition-opacity" />
                  
                  <div className="p-3 bg-blue-50 rounded-xl w-fit mb-6 group-hover:bg-blue-100 transition-colors">
                    <Icon className="w-6 h-6 text-blue-600" />
                  </div>

                  <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 mb-6">
                    {benefit.description}
                  </p>

                  <ul className="space-y-3">
                    {benefit.features.map((feature) => (
                      <li key={feature} className="flex items-center text-sm text-gray-600">
                        <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-3" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Note */}
      <div className="mt-12 text-center">
        <p className="text-sm text-gray-500">
          
        </p>
      </div>
    </main>
  )
} 