'use client'

import { useEffect, useState } from 'react'
import { MessageCircle, ArrowRight, Star, Coffee, Smile } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export default function PersonalMessage() {
  const [isVisible, setIsVisible] = useState(false)
  const [activeCard, setActiveCard] = useState<number | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    const section = document.getElementById('personal-message')
    if (section) {
      observer.observe(section)
    }

    return () => {
      if (section) {
        observer.unobserve(section)
      }
    }
  }, [])

  const highlights = [
    {
      icon: Star,
      title: 'Indywidualne Podejście',
      description: 'Każdy projekt traktujemy wyjątkowo'
    },
    {
      icon: Coffee,
      title: 'Przyjazna Atmosfera',
      description: 'Luźne rozmowy przy kawie'
    },
    {
      icon: Smile,
      title: 'Pełne Wsparcie',
      description: 'Zawsze służymy pomocą'
    }
  ]

  return (
    <section id="personal-message" className="py-24 relative overflow-hidden">
      {/* Tło */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-blue-50" />
      <div className="absolute inset-0" style={{
        backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(0,0,0,0.05) 1px, transparent 0)',
        backgroundSize: '40px 40px'
      }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className={`
          max-w-5xl mx-auto
          transition-all duration-700
          ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
        `}>
          {/* Nagłówek z ikoną */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center p-3 bg-blue-100 rounded-2xl mb-6">
              <MessageCircle className="w-8 h-8 text-blue-600" />
            </div>
            <h2 className="text-4xl md:text-5xl font-serif text-gray-900 mb-4">
              Rozmawiasz z <span className="text-blue-600">człowiekiem</span>,<br />
              nie z agencją!
            </h2>
          </div>

          {/* Główna treść w karcie */}
          <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 relative overflow-hidden z-0">
            {/* Dekoracyjne elementy */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full transform translate-x-16 -translate-y-16" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-50 rounded-full transform -translate-x-16 translate-y-16" />
            
            <div className="relative">
              <div className="flex flex-col md:flex-row gap-12 items-center">
                <div className="flex-1">
                  <p className="text-lg text-gray-700 leading-relaxed mb-6">
                    Wiem że zależy ci na przejrzystej, intuicyjnej i w pełni przystępnej stronie www. 
                    Słyszałem to już wiele razy: ma być jak miłość od pierwszego wejrzenia. 
                    Właściwie nawet musi być, bo twoi odbiorcy szybko się nudzą.
                  </p>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    Dlatego mogę cię zapewnić, że razem z moim świetnym zespołem stworzymy twoją wizytówkę 
                    z sercem i pasją. Poświęć chwilkę i obejrzyj nasze projekty, sprawdź co ci się przyda i działajmy!
                  </p>
                </div>
                <div className="flex-none w-64 h-64 relative">
                  <Image
                    src="https://images.unsplash.com/photo-1560250097-0b93528c311a"
                    alt="Professional developer"
                    fill
                    className="object-cover rounded-2xl"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-6 mt-12">
                {highlights.map((item, index) => (
                  <div
                    key={item.title}
                    className="group relative p-6 bg-gray-50 rounded-xl cursor-pointer transition-all duration-300 hover:bg-blue-50"
                    onMouseEnter={() => setActiveCard(index)}
                    onMouseLeave={() => setActiveCard(null)}
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`
                        p-3 rounded-lg transition-colors duration-300
                        ${activeCard === index ? 'bg-blue-100' : 'bg-white'}
                      `}>
                        <item.icon className={`
                          w-6 h-6 transition-colors duration-300
                          ${activeCard === index ? 'text-blue-600' : 'text-gray-600'}
                        `} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{item.title}</h3>
                        <p className="text-sm text-gray-600">{item.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Przycisk "Poznaj mnie bliżej" - na wierzchu */}
          <div className="flex justify-center -mt-8 relative z-10">
            <Link 
              href="/o-nas" 
              className="group inline-flex items-center gap-4 px-8 py-4 bg-white hover:bg-gray-50 rounded-xl border border-gray-200 shadow-lg transition-all duration-300"
            >
              <span className="text-gray-700 font-medium text-lg">
                Poznaj mnie bliżej
              </span>
              <div className="w-px h-5 bg-gray-200" />
              <ArrowRight className="w-5 h-5 text-blue-600 transform group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
} 