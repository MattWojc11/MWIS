'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { ArrowRight, Globe, ShoppingCart, BarChart3, Laptop } from 'lucide-react'
import Link from 'next/link'

const projects = [
  {
    id: 1,
    title: 'E-commerce Premium',
    type: 'Sklep Internetowy',
    image: 'https://images.unsplash.com/photo-1661956602868-6ae368943878',
    tech: ['Next.js', 'Tailwind CSS', 'Stripe'],
    description: 'Nowoczesny sklep internetowy z zaawansowanym systemem płatności',
    icon: ShoppingCart,
    link: '#'
  },
  {
    id: 2,
    title: 'Dashboard Analytics',
    type: 'Panel Administracyjny',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71',
    tech: ['React', 'TypeScript', 'Chart.js'],
    description: 'System analityczny z zaawansowaną wizualizacją danych',
    icon: BarChart3,
    link: '#'
  },
  {
    id: 3,
    title: 'Corporate Website',
    type: 'Strona Firmowa',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f',
    tech: ['WordPress', 'PHP', 'MySQL'],
    description: 'Responsywna strona z systemem CMS dla dużej firmy',
    icon: Globe,
    link: '#'
  },
  {
    id: 4,
    title: 'SaaS Platform',
    type: 'Aplikacja Webowa',
    image: 'https://images.unsplash.com/photo-1547658719-da2b51169166',
    tech: ['Vue.js', 'Node.js', 'MongoDB'],
    description: 'Platforma do zarządzania projektami online',
    icon: Laptop,
    link: '#'
  }
]

export default function PortfolioSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [hoveredProject, setHoveredProject] = useState<number | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    const section = document.getElementById('portfolio-section')
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
    <section id="portfolio-section" className="py-24 bg-gray-900 relative overflow-hidden">
      {/* Tło */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#080808_1px,transparent_1px),linear-gradient(to_bottom,#080808_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className={`
          text-center mb-16
          transition-all duration-700 delay-200
          ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
        `}>
          <h2 className="text-4xl md:text-5xl font-serif text-white mb-4">
            Nasze <span className="text-blue-400">Realizacje</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Sprawdź przykłady naszych najnowszych projektów i przekonaj się o jakości naszych rozwiązań
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className={`
                group relative bg-gray-800/50 rounded-2xl overflow-hidden backdrop-blur-sm
                transition-all duration-700 delay-[${(index + 1) * 100}ms]
                ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
              `}
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              {/* Tło projektu */}
              <div className="absolute inset-0">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent" />
              </div>

              {/* Zawartość */}
              <div className="relative p-8 h-full flex flex-col">
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 bg-blue-500/20 rounded-xl">
                    <project.icon className="w-6 h-6 text-blue-400" />
                  </div>
                  <div className="flex gap-2">
                    {project.tech.map((tech) => (
                      <span 
                        key={tech}
                        className="px-3 py-1 text-xs font-medium bg-gray-800/80 text-gray-300 rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-auto">
                  <p className="text-blue-400 text-sm font-medium mb-2">
                    {project.type}
                  </p>
                  <h3 className="text-2xl font-bold text-white mb-3">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 mb-6">
                    {project.description}
                  </p>

                  <a
                    href={project.link}
                    className={`
                      inline-flex items-center text-sm font-medium
                      transition-all duration-300
                      ${hoveredProject === project.id ? 'text-blue-400' : 'text-gray-400'}
                    `}
                  >
                    Zobacz szczegóły
                    <ArrowRight className={`
                      ml-2 w-4 h-4 transition-transform duration-300
                      ${hoveredProject === project.id ? 'translate-x-2' : ''}
                    `} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Przycisk "Zobacz więcej" */}
        <div className="mt-16 flex justify-center">
          <Link 
            href="/portfolio" 
            className="group relative inline-flex items-center gap-4 px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-500 rounded-full overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-blue-600 translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
            <span className="relative text-white font-medium">
              Zobacz wszystkie nasze projekty
            </span>
            <div className="relative w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
              <ArrowRight className="w-4 h-4 text-white transform group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </div>
      </div>
    </section>
  )
} 