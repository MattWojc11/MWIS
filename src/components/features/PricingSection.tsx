'use client'

import { useEffect, useState } from 'react'
import { Check, Star, Zap, Shield, ArrowRight } from 'lucide-react'
import Link from 'next/link'

const plans = [
  {
    name: 'Landing Page',
    icon: Star,
    variants: [
      {
        name: 'Z gotowego portfolio',
        price: '599',
        features: [
          'Strona jednostronicowa',
          'Projekt z gotowego portfolio',
          'Responsywny design',
          'Podstawowa optymalizacja SEO',
          'Szybka realizacja',
          'Hosting i domena (osobno płatne)'
        ]
      },
      {
        name: 'Indywidualny projekt',
        price: '899',
        popular: true,
        features: [
          'Strona jednostronicowa',
          'Indywidualny projekt',
          'Responsywny design',
          'Podstawowa optymalizacja SEO',
          'Szybka realizacja',
          'Hosting i domena (osobno płatne)'
        ]
      }
    ]
  },
  {
    name: 'Strona z Podstronami',
    icon: Zap,
    variants: [
      {
        name: 'Z gotowego portfolio',
        price: '1059',
        features: [
          'Strona główna + podstrony',
          'Projekt z gotowego portfolio',
          'Responsywny design',
          'Rozszerzona optymalizacja SEO',
          'Hosting i domena (osobno płatne)'
        ]
      },
      {
        name: 'Indywidualny projekt',
        price: '1299',
        popular: true,
        features: [
          'Strona główna + podstrony',
          'Indywidualny projekt',
          'Responsywny design',
          'Rozszerzona optymalizacja SEO',
          'Hosting i domena (osobno płatne)'
        ]
      }
    ]
  }
]

export default function PricingSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [activeType, setActiveType] = useState(0)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    const section = document.getElementById('pricing-section')
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
    <section id="pricing-section" className="py-24 bg-white relative overflow-hidden">
      {/* Dekoracyjne tło */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white" />
      <div className="absolute inset-y-0 right-0 w-1/2 bg-blue-50/50" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className={`
          text-center mb-16
          transition-all duration-700 delay-200
          ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
        `}>
          <h2 className="text-4xl md:text-5xl font-serif text-gray-900 mb-4">
            Przejrzyste <span className="text-blue-600">Ceny</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Wybierz pakiet najlepiej dopasowany do Twoich potrzeb
          </p>
        </div>

        {/* Przełącznik typów stron */}
        <div className="flex justify-center mb-16">
          <div className="inline-flex p-2 bg-gray-100 rounded-xl">
            {plans.map((plan, index) => (
              <button
                key={plan.name}
                onClick={() => setActiveType(index)}
                className={`
                  flex items-center px-6 py-3 rounded-lg font-medium transition-all duration-300
                  ${activeType === index 
                    ? 'bg-white text-blue-600 shadow-md' 
                    : 'text-gray-600 hover:text-gray-900'}
                `}
              >
                <plan.icon className="w-5 h-5 mr-2" />
                {plan.name}
              </button>
            ))}
          </div>
        </div>

        {/* Karty cenowe */}
        <div className="grid md:grid-cols-2 gap-8">
          {plans[activeType].variants.map((variant, index) => (
            <div
              key={variant.name}
              className={`
                relative bg-white rounded-2xl p-8 transition-all duration-500
                ${variant.popular ? 'ring-2 ring-blue-600 shadow-xl' : 'shadow-lg'}
                ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
              `}
              style={{ transitionDelay: `${(index + 1) * 100}ms` }}
            >
              {variant.popular && (
                <div className="absolute top-0 right-6 transform -translate-y-1/2">
                  <div className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                    Popularny wybór
                  </div>
                </div>
              )}

              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{variant.name}</h3>
                <div className="flex items-baseline">
                  <span className="text-4xl font-bold text-blue-600">{variant.price}</span>
                  <span className="text-gray-600 ml-2">PLN</span>
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {variant.features.map((feature) => (
                  <li key={feature} className="flex items-start">
                    <Check className="w-5 h-5 text-blue-600 mr-3 flex-shrink-0 mt-1" />
                    <span className="text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link 
                href={`/formularz?package=${encodeURIComponent(`${plans[activeType].name} - ${variant.name}`)}&price=${variant.price}`}
                className={`
                  block w-full py-4 rounded-xl font-medium text-center transition-all duration-300
                  ${variant.popular 
                    ? 'bg-blue-600 text-white hover:bg-blue-700' 
                    : 'bg-gray-100 text-gray-900 hover:bg-gray-200'}
                `}
              >
                Wybierz pakiet
              </Link>
            </div>
          ))}
        </div>

        {/* Informacja o hostingu */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center px-4 py-2 bg-blue-50 rounded-full">
            <Shield className="w-5 h-5 text-blue-600 mr-2" />
            <span className="text-sm text-gray-600">
              Do każdej ceny należy doliczyć koszt domeny i hostingu
            </span>
          </div>
        </div>

        <div className="mt-16 flex justify-center">
          <Link 
            href="/uslugi" 
            className="group relative inline-flex items-center gap-4"
          >
            <div className="absolute inset-0 bg-blue-600/10 rounded-lg group-hover:bg-blue-600/20 transition-colors" />
            <div className="relative flex items-center gap-3 px-8 py-4">
              <span className="text-blue-600 font-medium">
                Zobacz szczegóły oferty
              </span>
              <div className="relative w-6 h-6 overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center transform group-hover:-translate-y-full transition-transform">
                  <ArrowRight className="w-4 h-4 text-blue-600" />
                </div>
                <div className="absolute inset-0 flex items-center justify-center transform translate-y-full group-hover:translate-y-0 transition-transform">
                  <ArrowRight className="w-4 h-4 text-blue-600" />
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </section>
  )
} 