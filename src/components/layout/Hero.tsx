'use client'

import { useEffect, useState } from 'react'

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section className="min-h-[100svh] bg-[#0A0F1C] text-white overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 sm:pt-32 md:pt-40">
        <div className="relative">
          <div className={`
            inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-sm sm:text-base mb-8 sm:mb-10
            transition-all duration-700 delay-300
            ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
          `}>
            <span className="w-2 sm:w-2.5 h-2 sm:h-2.5 bg-green-400 rounded-full"></span>
            <span>Głogów, PL</span>
          </div>

          <div className="overflow-hidden mb-8 sm:mb-10">
            <h1 className={`
              text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-serif leading-[1.1]
              transition-all duration-700 delay-500
              ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-full'}
            `}>
              Twoja Wizja,<br />
              <span className="text-blue-400">Nasza</span><br />
              <span className="italic">Realizacja</span>
            </h1>
          </div>

          <p className={`
            text-lg sm:text-xl text-gray-300 max-w-2xl sm:max-w-3xl mb-10 sm:mb-14
            transition-all duration-700 delay-700
            ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
          `}>
            Tworzymy profesjonalne strony internetowe, które wyróżnią Twoją firmę w sieci. 
            Nowoczesny design i niezawodne rozwiązania.
          </p>

          <div className={`
            grid grid-cols-3 gap-4 sm:gap-10 max-w-lg sm:max-w-3xl mx-auto sm:mx-0
            transition-all duration-700 delay-1000
            ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
          `}>
            <div className="text-center sm:text-left">
              <div className="text-3xl sm:text-5xl md:text-6xl font-bold mb-2 sm:mb-3">100%</div>
              <p className="text-xs sm:text-base text-gray-400 uppercase tracking-wider">
                Zadowolonych klientów
              </p>
            </div>
            <div className="text-center sm:text-left">
              <div className="text-3xl sm:text-5xl md:text-6xl font-bold mb-2 sm:mb-3">25+</div>
              <p className="text-xs sm:text-base text-gray-400 uppercase tracking-wider">
                Zrealizowanych projektów
              </p>
            </div>
            <div className="text-center sm:text-left">
              <div className="text-3xl sm:text-5xl md:text-6xl font-bold mb-2 sm:mb-3">5+</div>
              <p className="text-xs sm:text-base text-gray-400 uppercase tracking-wider">
                Stron pod opieką
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 