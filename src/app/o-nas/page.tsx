'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Users, Target, Award, Clock, ArrowRight } from 'lucide-react'

const achievements = [
  {
    icon: Users,
    number: '200+',
    label: 'Zadowolonych Klientów',
    description: 'Zaufali nam przedsiębiorcy z różnych branż'
  },
  {
    icon: Target,
    number: '95%',
    label: 'Skuteczność',
    description: 'Projektów zakończonych sukcesem'
  },
  {
    icon: Award,
    number: '8+',
    label: 'Lat Doświadczenia',
    description: 'W tworzeniu stron internetowych'
  },
  {
    icon: Clock,
    number: '100%',
    label: 'Terminowość',
    description: 'Projekty dostarczane na czas'
  }
]

const values = [
  {
    title: 'Jakość',
    description: 'Każdy projekt traktujemy jako wyzwanie do stworzenia czegoś wyjątkowego.'
  },
  {
    title: 'Przejrzystość',
    description: 'Stawiamy na jasną komunikację i transparentne zasady współpracy.'
  },
  {
    title: 'Innowacyjność',
    description: 'Śledzimy najnowsze trendy i wykorzystujemy sprawdzone technologie.'
  }
]

export default function AboutPage() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <main className="pt-24 bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-white" />
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(0,0,0,0.05) 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }} />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative pt-16 pb-24">
          <div className={`
            max-w-3xl transition-all duration-1000
            ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
          `}>
            <h1 className="text-5xl md:text-6xl font-serif text-gray-900 mb-6">
              Tworzymy <span className="text-blue-600">strony internetowe</span> z pasją
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              Jesteśmy zespołem specjalistów, którzy łączą technologiczną wiedzę z kreatywnością. 
              Każdy projekt traktujemy indywidualnie, dbając o najdrobniejsze szczegóły.
            </p>
            <div className="flex items-center text-blue-600 font-medium cursor-pointer group">
              <span>Poznaj naszą historię</span>
              <ArrowRight className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </section>

      {/* Osiągnięcia */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => (
              <div
                key={achievement.label}
                className={`
                  text-center transition-all duration-700
                  ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
                `}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="inline-flex items-center justify-center p-3 bg-blue-50 rounded-xl mb-4">
                  <achievement.icon className="w-6 h-6 text-blue-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">
                  {achievement.number}
                </div>
                <div className="text-lg font-semibold text-gray-900 mb-1">
                  {achievement.label}
                </div>
                <p className="text-gray-600">
                  {achievement.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Nasza Historia */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className={`
              transition-all duration-700 delay-200
              ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}
            `}>
              <h2 className="text-4xl font-serif text-gray-900 mb-6">
                Nasza <span className="text-blue-600">Historia</span>
              </h2>
              <div className="prose prose-lg text-gray-600">
                <p>
                  Od początku naszej działalności skupiamy się na dostarczaniu najwyższej jakości 
                  stron internetowych. Zaczynaliśmy jako mały zespół pasjonatów, a dziś jesteśmy 
                  zaufanym partnerem dla firm z różnych branż.
                </p>
                <p>
                  Naszą misją jest tworzenie stron internetowych, które nie tylko świetnie wyglądają, 
                  ale przede wszystkim skutecznie realizują cele biznesowe naszych klientów.
                </p>
              </div>
            </div>
            <div className={`
              relative transition-all duration-700 delay-400
              ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}
            `}>
              <div className="relative h-[600px] rounded-2xl overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c"
                  alt="Zespół MWIS"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Nasze Wartości */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-serif text-center text-gray-900 mb-16">
            Nasze <span className="text-blue-600">Wartości</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-12">
            {values.map((value, index) => (
              <div
                key={value.title}
                className={`
                  relative p-8 bg-gray-50 rounded-2xl
                  transition-all duration-700
                  ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
                `}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <h3 className="text-xl font-bold text-gray-900 mb-4">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
} 