'use client'

import { useEffect, useState } from 'react'

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section className="min-h-screen bg-[#0A0F1C] text-white overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32">
        <div className="relative">
          <div className={`
            inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm mb-8
            transition-all duration-700 delay-300
            ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
          `}>
            <span className="w-2 h-2 bg-green-400 rounded-full"></span>
            <span>Głogów, PL</span>
          </div>

          <div className="overflow-hidden mb-8">
            <h1 className={`
              text-6xl md:text-8xl font-serif
              transition-all duration-700 delay-500
              ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-full'}
            `}>
              Twoja Wizja,<br />
              <span className="text-blue-400">Nasza</span><br />
              <span className="italic">Realizacja</span>
            </h1>
          </div>

          <p className={`
            text-lg text-gray-300 max-w-2xl mb-24
            transition-all duration-700 delay-700
            ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
          `}>
            Tworzymy profesjonalne strony internetowe, które wyróżnią Twoją firmę w sieci. 
            Nowoczesny design i niezawodne rozwiązania.
          </p>

          <div className={`
            grid grid-cols-3 gap-8 max-w-3xl
            transition-all duration-700 delay-1000
            ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
          `}>
            <div>
              <div className="text-6xl font-bold mb-2">95%</div>
              <p className="text-sm text-gray-400 uppercase tracking-wider">
                Zadowolonych klientów
              </p>
            </div>
            <div>
              <div className="text-6xl font-bold mb-2">25+</div>
              <p className="text-sm text-gray-400 uppercase tracking-wider">
                Zrealizowanych projektów
              </p>
            </div>
            <div>
              <div className="text-6xl font-bold mb-2">5+</div>
              <p className="text-sm text-gray-400 uppercase tracking-wider">
                Stron pod opieką
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 