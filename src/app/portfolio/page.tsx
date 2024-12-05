'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { ExternalLink, Code, X } from 'lucide-react'

const categories = ['Wszystkie', 'One-Page Websites', 'Strony Internetowe', 'Aplikacje']

const projectImages = [
  '/images/apk1.png',
  '/images/apk2.png',
  '/images/apk3.png',
  '/images/apk4.png',
  '/images/apk5.png'
]

const documentationImages = [
  '/images/doc1.png',
  '/images/doc2.png',
  '/images/doc3.png',
  '/images/doc4.png'
]

const beautyImages = [
  '/images/beautymain.png',
  '/images/beauty1.png',
  '/images/beauty2.png',
  '/images/beauty3.png',
  
  '/images/beauty5.png'
]

const biuroImages = [
  '/images/biuroarch1.png',
  '/images/biuroarch2.png',
  '/images/biuroarch3.png',
  '/images/biuroarch4.png',
  '/images/biuroarch5.png'
]

const projects = [
  {
    id: 1,
    title: 'Aplikacja Treningowa',
    category: 'Aplikacje',
    image: '/images/apk1.png',
    gallery: projectImages,
    description: 'Kompleksowa aplikacja mobilna do planowania treningów i monitorowania postępów. Intuicyjny interfejs pozwala na łatwe śledzenie aktywności fizycznej.',
    features: [
      'Plany treningowe',
      'Śledzenie postępów',
      'Biblioteka ćwiczeń',
      'Statystyki treningowe'
    ],
    demoUrl: '#',
    githubUrl: '#',
    liveSite: true
  },
  {
    id: 2,
    title: 'Strona Przychodni Lekarskiej',
    category: 'Strony Internetowe',
    image: '/images/doc1.png',
    gallery: documentationImages,
    description: 'Profesjonalna strona internetowa przychodni medycznej z systemem umawiania wizyt online i dostępem do dokumentacji medycznej.',
    features: [
      'System rezerwacji wizyt',
      'Panel pacjenta',
      'Historia leczenia',
      'Dokumentacja medyczna'
    ],
    demoUrl: 'https://doctorsite-pearl.vercel.app',
    githubUrl: '#',
    liveSite: true
  },
  {
    id: 3,
    title: 'Beauty Salon',
    category: 'One-Page Websites',
    image: '/images/beautymain.png',
    gallery: beautyImages,
    description: 'Elegancka strona typu one-page dla salonu kosmetycznego, prezentująca ofertę zabiegów i umożliwiająca łatwe umawianie wizyt.',
    features: [
      'Prezentacja zabiegów',
      'Formularz kontaktowy',
      'Galeria realizacji',
      'Cennik usług'
    ],
    demoUrl: 'https://beautylab.vercel.app',
    githubUrl: '#',
    liveSite: true
  },
  {
    id: 4,
    title: 'Biuro Architektoniczne',
    category: 'Strony Internetowe',
    image: '/images/biuroarch1.png',
    gallery: biuroImages,
    description: 'Profesjonalna strona internetowa dla biura architektonicznego, prezentująca portfolio projektów i usługi projektowe.',
    features: [
      'Portfolio projektów',
      'Prezentacja usług',
      'Interaktywne wizualizacje',
      'Formularz kontaktowy'
    ],
    demoUrl: 'https://biuroprojektowe.vercel.app',
    githubUrl: '#',
    liveSite: true
  }
]

export default function PortfolioPage() {
  const [isVisible, setIsVisible] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('Wszystkie')
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [isGalleryOpen, setIsGalleryOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [activeProject, setActiveProject] = useState<typeof projects[0] | null>(null)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const filteredProjects = selectedCategory === 'Wszystkie'
    ? projects
    : projects.filter(project => project.category === selectedCategory)

  const openGallery = (project: typeof projects[0], e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setActiveProject(project)
    setIsGalleryOpen(true)
    setCurrentImageIndex(0)
  }

  const closeGallery = () => {
    setIsGalleryOpen(false)
    setActiveProject(null)
    setCurrentImageIndex(0)
  }

  const nextImage = () => {
    if (!activeProject) return
    setCurrentImageIndex((prev) => 
      prev === activeProject.gallery.length - 1 ? 0 : prev + 1
    )
  }

  const prevImage = () => {
    if (!activeProject) return
    setCurrentImageIndex((prev) => 
      prev === 0 ? activeProject.gallery.length - 1 : prev - 1
    )
  }

  return (
    <main className="pt-24 min-h-screen bg-[#0A0F1C] text-white">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-transparent" />
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.05) 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }} />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className={`
            max-w-3xl mx-auto text-center
            transition-all duration-1000
            ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
          `}>
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm mb-8">
              <Code className="w-4 h-4" />
              <span>Portfolio projektów</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-serif mb-6">
              Obejrzyj moje <span className="text-blue-400">projekty</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Znajdź coś dla siebie i przekonaj się o jakości naszych rozwiązań technologicznych.
            </p>
          </div>
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-20 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className={`
              space-y-12
              transition-all duration-1000 delay-200
              ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}
            `}>
              <div>
                <h2 className="text-3xl font-serif mb-4">
                  Inspiracja dla Twojego <span className="text-blue-400">biznesu</span>
                </h2>
                <p className="text-gray-400">
                  Jeśli nie masz jeszcze konkretnego pomysłu na stronę, rzuć okiem na moje wcześniejsze prace. 
                  Może akurat coś ci się spodoba i będziemy mogli to rozwinąć?
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3">Więcej niż strona WWW</h3>
                <p className="text-gray-400">
                  Mój potencjał to nie tylko dobrze wyglądająca strona www, a stworzenie projektu, 
                  który przyniesie Tobie jeszcze lepszą sprzedaż.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <div className="bg-white/5 p-4 rounded-lg backdrop-blur-sm">
                  <h4 className="font-medium mb-2">Nowoczesny Design</h4>
                  <p className="text-sm text-gray-400">
                    Tworzę strony z wykorzystaniem najnowszych trendów w projektowaniu, 
                    zapewniając estetyczny i profesjonalny wygląd.
                  </p>
                </div>
                <div className="bg-white/5 p-4 rounded-lg backdrop-blur-sm">
                  <h4 className="font-medium mb-2">Responsywność</h4>
                  <p className="text-sm text-gray-400">
                    Wszystkie projekty są w pełni responsywne, działają idealnie 
                    na każdym urządzeniu i przeglądarce.
                  </p>
                </div>
              </div>
            </div>

            {/* Zdjęcie zespołu */}
            <div className={`
              relative aspect-square rounded-2xl overflow-hidden
              transition-all duration-1000 delay-400 group
              ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}
            `}>
              <Image
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80"
                alt="Team working together"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F1C] via-transparent to-transparent" />
              <div className="absolute inset-0 bg-blue-900/20" />
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section className="py-20 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Categories */}
          <div className="flex justify-center mb-16 overflow-x-auto">
            <div className="inline-flex p-1 bg-white/5 rounded-xl backdrop-blur-sm">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`
                    px-6 py-3 rounded-lg font-medium transition-all duration-300
                    ${selectedCategory === category 
                      ? 'bg-blue-600 text-white' 
                      : 'text-gray-400 hover:text-white'}
                  `}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Projects Grid */}
          <div className="grid lg:grid-cols-2 gap-8">
            {filteredProjects.map((project, index) => (
              <div
                key={project.id}
                className={`
                  group relative bg-white/5 rounded-xl overflow-hidden border border-white/10
                  hover:border-blue-500/50 backdrop-blur-sm
                  transition-all duration-500
                  ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
                `}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {/* Project Image */}
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F1C] via-transparent to-transparent" />
                  
                  {/* Live indicator */}
                  {project.liveSite && (
                    <div className="absolute top-4 left-4 flex items-center space-x-2 bg-green-500/20 backdrop-blur-sm px-3 py-1 rounded-full">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                      <span className="text-xs text-green-500">Live</span>
                    </div>
                  )}

                  {/* Links */}
                  <div className="absolute top-4 right-4 flex space-x-2">
                    {project.id === 1 ? (
                      <button 
                        onClick={(e) => openGallery(project, e)}
                        type="button"
                        className="px-4 py-2 bg-blue-600/80 hover:bg-blue-600 rounded-lg backdrop-blur-sm transition-all duration-300 flex items-center gap-2"
                      >
                        <span className="text-sm font-medium">Zobacz</span>
                        <ExternalLink className="w-4 h-4 text-white" />
                      </button>
                    ) : project.demoUrl && (
                      <a 
                        href={project.demoUrl} 
                        className="px-4 py-2 bg-blue-600/80 hover:bg-blue-600 rounded-lg backdrop-blur-sm transition-all duration-300 flex items-center gap-2"
                      >
                        <span className="text-sm font-medium">Zobacz</span>
                        <ExternalLink className="w-4 h-4 text-white" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Project Info */}
                <div className="p-6">
                  <div className="mb-4">
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-400 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-gray-400">
                      {project.description}
                    </p>
                  </div>

                  {/* Features */}
                  <div className="grid grid-cols-2 gap-4">
                    {project.features.map((feature) => (
                      <div key={feature} className="flex items-center text-sm text-gray-400">
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2" />
                        {feature}
                      </div>
                    ))}
                  </div>

                  {/* Gallery */}
                  {project.gallery && (
                    <div className="mt-6 pt-6 border-t border-white/10">
                      <h4 className="text-lg font-semibold mb-4 text-white">Galeria projektu</h4>
                      <div className="grid grid-cols-6 gap-4">
                        {/* Duże główne zdjęcie */}
                        <div 
                          className="col-span-6 md:col-span-4 relative h-64 rounded-lg overflow-hidden cursor-pointer group"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            openGallery(project, e);
                            setCurrentImageIndex(0);
                          }}
                        >
                          <Image
                            src={project.gallery[0]}
                            alt={`${project.title} - główne zdjęcie`}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                            onError={() => {
                              console.error('Error loading image:', project.gallery[0]);
                            }}
                          />
                          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                        {/* Mniejsze zdjęcia */}
                        <div className="col-span-6 md:col-span-2 grid grid-cols-2 gap-4">
                          {project.gallery.slice(1).map((img, idx) => (
                            <div 
                              key={img}
                              className="relative aspect-square rounded-lg overflow-hidden group cursor-pointer"
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                openGallery(project, e);
                                setCurrentImageIndex(idx + 1);
                              }}
                            >
                              <Image
                                src={img}
                                alt={`${project.title} - zdjęcie ${idx + 2}`}
                                fill
                                className="object-cover transition-transform duration-300 group-hover:scale-110"
                                onError={() => {
                                  console.error('Error loading image:', img);
                                }}
                              />
                              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Gallery Modal */}
      {isGalleryOpen && activeProject && (
        <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center">
          <div className="absolute inset-0 z-0" onClick={closeGallery} />
          
          <div className="relative w-full max-w-7xl px-4">
            {/* Close button */}
            <button 
              onClick={closeGallery}
              className="absolute top-4 right-4 p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors z-20"
            >
              <X className="w-6 h-6 text-white" />
            </button>

            {/* Main image container */}
            <div className="relative">
              {/* Main image */}
              <div className="relative aspect-video mb-8">
                <Image
                  src={activeProject.gallery[currentImageIndex]}
                  alt={`${activeProject.title} - zdjęcie ${currentImageIndex + 1}`}
                  fill
                  className="object-contain"
                />
              </div>

              {/* Navigation arrows - now outside the image */}
              <button
                onClick={prevImage}
                className="absolute -left-24 top-1/2 -translate-y-1/2 p-4 bg-black/90 hover:bg-black rounded-xl hover:scale-110 transition-all duration-300 border border-white/20 shadow-xl"
              >
                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={nextImage}
                className="absolute -right-24 top-1/2 -translate-y-1/2 p-4 bg-black/90 hover:bg-black rounded-xl hover:scale-110 transition-all duration-300 border border-white/20 shadow-xl"
              >
                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Thumbnails */}
            <div className="grid grid-cols-5 gap-4 max-w-4xl mx-auto">
              {activeProject.gallery.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentImageIndex(idx)}
                  className={`
                    relative aspect-square rounded-lg overflow-hidden
                    ${currentImageIndex === idx ? 'ring-2 ring-blue-500' : 'opacity-50 hover:opacity-100'}
                    transition-all duration-300
                  `}
                >
                  <Image
                    src={img}
                    alt={`Miniatura ${idx + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Image Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button 
            className="absolute top-4 right-4 p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
            onClick={() => setSelectedImage(null)}
          >
            <X className="w-6 h-6 text-white" />
          </button>
          <div className="relative w-full max-w-5xl aspect-video">
            <Image
              src={selectedImage}
              alt="Powiększone zdjęcie"
              fill
              className="object-contain"
            />
          </div>
        </div>
      )}
    </main>
  )
} 