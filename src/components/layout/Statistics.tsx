'use client'

import { useEffect, useState } from 'react'
import { Users, Globe, Cog } from 'lucide-react'

export default function Statistics() {
  const [count, setCount] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setCount(prev => prev < 95 ? prev + 1 : prev)
    }, 50)

    // Dodajemy efekt pojawienia się przy scrollowaniu
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    const section = document.getElementById('stats-section')
    if (section) {
      observer.observe(section)
    }

    return () => {
      clearInterval(timer)
      if (section) {
        observer.unobserve(section)
      }
    }
  }, [])

  return (
    <section id="stats-section" className="py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`
          grid md:grid-cols-3 gap-12 
          opacity-0 translate-y-8
          ${isVisible ? 'animate-fade-in-up' : ''}
        `}>
          {/* Zadowoleni Klienci */}
          <div className="relative group">
            <div className="absolute inset-0 bg-blue-100 rounded-2xl transform rotate-3 group-hover:rotate-0 transition-transform duration-300"></div>
            <div className="relative bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300">
              <div className="flex items-center justify-center mb-4">
                <Users className="w-12 h-12 text-blue-500" />
              </div>
              <div className="text-5xl font-bold text-blue-600 mb-2 text-center">
                {count}%
              </div>
              <p className="text-gray-600 text-center font-medium">
                Zadowolonych Klientów
              </p>
            </div>
          </div>

          {/* Stworzone Strony */}
          <div className="relative group md:translate-y-8">
            <div className="absolute inset-0 bg-purple-100 rounded-2xl transform -rotate-2 group-hover:rotate-0 transition-transform duration-300"></div>
            <div className="relative bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300">
              <div className="flex items-center justify-center mb-4">
                <Globe className="w-12 h-12 text-purple-500" />
              </div>
              <div className="text-5xl font-bold text-purple-600 mb-2 text-center">
                200+
              </div>
              <p className="text-gray-600 text-center font-medium">
                Stworzonych Stron
              </p>
            </div>
          </div>

          {/* Strony Pod Opieką */}
          <div className="relative group">
            <div className="absolute inset-0 bg-indigo-100 rounded-2xl transform rotate-1 group-hover:rotate-0 transition-transform duration-300"></div>
            <div className="relative bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300">
              <div className="flex items-center justify-center mb-4">
                <Cog className="w-12 h-12 text-indigo-500" />
              </div>
              <div className="text-5xl font-bold text-indigo-600 mb-2 text-center">
                50+
              </div>
              <p className="text-gray-600 text-center font-medium">
                Stron Pod Opieką
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 