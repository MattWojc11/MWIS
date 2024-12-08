'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ExternalLink } from 'lucide-react'

const projects = [
  {
    title: 'Aplikacja Treningowa',
    description: 'Kompleksowa aplikacja mobilna do planowania treningów i monitorowania postępów.',
    image: '/images/apk1.png',
    link: '/portfolio',
    category: 'Mobile App'
  },
  {
    title: 'Strona Przychodni',
    description: 'Profesjonalna strona internetowa przychodni medycznej z systemem rezerwacji wizyt.',
    image: '/images/doc1.png',
    link: '/portfolio',
    category: 'Web App'
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
    <section id="portfolio-section" className="py-24 relative overflow-hidden bg-[#0A0F1C]">
      {/* Tło */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1a1f2e_1px,transparent_1px),linear-gradient(to_bottom,#1a1f2e_1px,transparent_1px)] bg-[size:64px_64px]" />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950/50 via-transparent to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Nagłówek */}
        <div className={`
          max-w-3xl mx-auto text-center mb-16
          transition-all duration-700 delay-200
          ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
        `}>
          <h2 className="text-5xl md:text-6xl font-serif text-white mb-6">
            Nasze <span className="text-blue-400">Realizacje</span>
          </h2>
          <p className="text-xl text-gray-400">
            Projekty, które definiują naszą jakość i profesjonalizm
          </p>
        </div>

        {/* Projekty */}
        <div className="grid md:grid-cols-2 gap-12">
          {projects.map((project, index) => (
            <Link
              href={project.link}
              key={project.title}
              className={`
                group relative
                transition-all duration-700 delay-[${(index + 1) * 100}ms]
                ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
              `}
              onMouseEnter={() => setHoveredProject(index)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              {/* Karta projektu */}
              <div className="relative h-full">
                {/* Obrazek */}
                <div className="relative h-[300px] rounded-2xl overflow-hidden mb-6">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    quality={75}
                    placeholder="blur"
                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4eHRoaHSQtJSEkMjU1LC0yMi4xODY6PTw0OT45MjM8RUZFOEBHREVMTkxQUVFQQD//2wBDAR"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F1C] to-transparent opacity-80" />
                  
                  {/* Kategoria */}
                  <div className="absolute top-6 left-6">
                    <span className="px-4 py-2 bg-blue-500/20 backdrop-blur-sm text-blue-300 rounded-full text-sm font-medium">
                      {project.category}
                    </span>
                  </div>
                </div>

                {/* Treść */}
                <div>
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors">
                      {project.title}
                    </h3>
                    <div className={`
                      w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center
                      transform transition-all duration-300
                      ${hoveredProject === index ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'}
                    `}>
                      <ArrowRight className="w-5 h-5 text-blue-400" />
                    </div>
                  </div>
                  <p className="text-gray-400 text-lg leading-relaxed">
                    {project.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Przycisk "Zobacz więcej" */}
        <div className="flex justify-center mt-16">
          <Link
            href="/portfolio"
            className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-500 rounded-xl overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-blue-600 translate-x-[101%] group-hover:translate-x-0 transition-transform duration-300" />
            <div className="relative flex items-center gap-3">
              <span className="text-white font-medium">
                Zobacz pełne portfolio
              </span>
              <ExternalLink className="w-4 h-4 text-white transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </div>
          </Link>
        </div>
      </div>
    </section>
  )
} 