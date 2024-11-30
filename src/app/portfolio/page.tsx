'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { ExternalLink, Code, Github, Globe, Zap, Lock, Users, ArrowRight } from 'lucide-react'

const categories = ['Wszystkie', 'Web Apps', 'E-commerce', 'Landing Pages', 'Aplikacje']

const projects = [
  {
    id: 1,
    title: 'System ERP',
    category: 'Web Apps',
    image: '/projects/erp.jpg',
    description: 'Kompleksowy system zarządzania zasobami przedsiębiorstwa z modułami finansów, HR i logistyki.',
    technologies: ['React', 'Node.js', 'PostgreSQL', 'Docker'],
    features: [
      'Real-time dashboards',
      'System uprawnień',
      'Integracja API',
      'Automatyczne raporty'
    ],
    stats: {
      users: '500+',
      transactions: '1M+',
      uptime: '99.9%'
    },
    demoUrl: '#',
    githubUrl: '#',
    liveSite: true
  },
  {
    id: 2,
    title: 'E-commerce Platform',
    category: 'E-commerce',
    image: '/projects/shop.jpg',
    description: 'Zaawansowana platforma e-commerce z systemem zarządzania produktami i integracją płatności.',
    technologies: ['Next.js', 'TypeScript', 'Stripe', 'MongoDB'],
    features: [
      'Koszyk zakupowy',
      'System płatności',
      'Panel admina',
      'Analityka sprzedaży'
    ],
    stats: {
      products: '10k+',
      orders: '50k+',
      conversion: '3.2%'
    },
    demoUrl: '#',
    githubUrl: '#',
    liveSite: true
  },
  {
    id: 3,
    title: 'Landing Page Restauracji',
    category: 'Landing Pages',
    image: '/projects/restaurant.jpg',
    description: 'Nowoczesna strona restauracji z systemem rezerwacji stolików i menu online.',
    technologies: ['Next.js', 'Tailwind CSS', 'Framer Motion'],
    features: [
      'Rezerwacje online',
      'Menu cyfrowe',
      'Galeria zdjęć',
      'Integracja z social media'
    ],
    stats: {
      visitors: '15k+',
      reservations: '500+',
      rating: '4.9/5'
    },
    demoUrl: '#',
    liveSite: true
  },
  {
    id: 4,
    title: 'Aplikacja Fitness',
    category: 'Aplikacje',
    image: '/projects/fitness.jpg',
    description: 'Aplikacja do śledzenia treningów i diety z personalizowanymi planami.',
    technologies: ['React Native', 'Firebase', 'Node.js'],
    features: [
      'Plany treningowe',
      'Licznik kalorii',
      'Postępy użytkownika',
      'Powiadomienia'
    ],
    stats: {
      downloads: '25k+',
      activeUsers: '8k+',
      workouts: '100k+'
    },
    demoUrl: '#',
    githubUrl: '#'
  },
  {
    id: 5,
    title: 'Portfolio Fotografa',
    category: 'Landing Pages',
    image: '/projects/portfolio.jpg',
    description: 'Minimalistyczne portfolio fotografa z zaawansowaną galerią i animacjami.',
    technologies: ['Gatsby', 'GSAP', 'Netlify CMS'],
    features: [
      'Galeria masonry',
      'Lazy loading',
      'Blog',
      'Formularz kontaktowy'
    ],
    stats: {
      photos: '200+',
      clients: '50+',
      views: '30k+'
    },
    demoUrl: '#',
    liveSite: true
  },
  {
    id: 6,
    title: 'Panel Administracyjny',
    category: 'Web Apps',
    image: '/projects/admin.jpg',
    description: 'Zaawansowany panel administracyjny z analizą danych i raportami.',
    technologies: ['Vue.js', 'Laravel', 'MySQL', 'Redis'],
    features: [
      'Dashboard analityczny',
      'Zarządzanie użytkownikami',
      'System raportów',
      'Eksport danych'
    ],
    stats: {
      actions: '1M+',
      reports: '5k+',
      dataPoints: '10M+'
    },
    demoUrl: '#',
    githubUrl: '#',
    liveSite: true
  },
  {
    id: 7,
    title: 'Sklep z Elektroniką',
    category: 'E-commerce',
    image: '/projects/electronics.jpg',
    description: 'Sklep internetowy z elektroniką i systemem porównywania produktów.',
    technologies: ['Shopify', 'Next.js', 'GraphQL'],
    features: [
      'Porównywarka produktów',
      'Filtrowanie zaawansowane',
      'Opinie klientów',
      'Integracja z dostawcami'
    ],
    stats: {
      products: '5k+',
      sales: '1M+',
      customers: '50k+'
    },
    demoUrl: '#',
    liveSite: true
  },
  {
    id: 8,
    title: 'Aplikacja CRM',
    category: 'Web Apps',
    image: '/projects/crm.jpg',
    description: 'System CRM do zarządzania relacjami z klientami i sprzedażą.',
    technologies: ['Angular', 'Django', 'PostgreSQL'],
    features: [
      'Pipeline sprzedaży',
      'Automatyzacja zadań',
      'Integracja z email',
      'Raporty sprzedażowe'
    ],
    stats: {
      leads: '100k+',
      deals: '10k+',
      automation: '1k+'
    },
    demoUrl: '#',
    githubUrl: '#'
  }
]

export default function PortfolioPage() {
  const [isVisible, setIsVisible] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('Wszystkie')
  const [hoveredProject, setHoveredProject] = useState<number | null>(null)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const filteredProjects = selectedCategory === 'Wszystkie'
    ? projects
    : projects.filter(project => project.category === selectedCategory)

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
            <div className="flex justify-center space-x-4">
              <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors">
                Skontaktuj się
              </button>
              <button className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-lg transition-colors">
                Zobacz projekty
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-20 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className={`
              space-y-8
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
                  <h4 className="font-medium mb-2">Widoczność w sieci</h4>
                  <p className="text-sm text-gray-400">
                    Stawiaj na jak najlepszą widoczność w sieci! Podstawa to profesjonalna strona 
                    i optymalizacja pod względem SEO.
                  </p>
                </div>
                <div className="bg-white/5 p-4 rounded-lg backdrop-blur-sm">
                  <h4 className="font-medium mb-2">Konwersja</h4>
                  <p className="text-sm text-gray-400">
                    Zadbamy, aby Twoja witryna miała dobrą konwersję pod kampanie reklamowe.
                  </p>
                </div>
              </div>
            </div>

            <div className={`
              relative aspect-square rounded-2xl overflow-hidden
              transition-all duration-1000 delay-400
              ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}
            `}>
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-transparent" />
              <Image
                src="/images/code.jpg"
                alt="Code preview"
                fill
                className="object-cover"
              />
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
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
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
                    {project.githubUrl && (
                      <a href={project.githubUrl} className="p-2 bg-white/10 hover:bg-white/20 rounded-lg backdrop-blur-sm transition-colors">
                        <Github className="w-5 h-5 text-white" />
                      </a>
                    )}
                    {project.demoUrl && (
                      <a href={project.demoUrl} className="p-2 bg-white/10 hover:bg-white/20 rounded-lg backdrop-blur-sm transition-colors">
                        <ExternalLink className="w-5 h-5 text-white" />
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

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.map((tech) => (
                      <span 
                        key={tech}
                        className="px-3 py-1 bg-blue-500/10 text-blue-400 rounded-full text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Features */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    {project.features.map((feature) => (
                      <div key={feature} className="flex items-center text-sm text-gray-400">
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2" />
                        {feature}
                      </div>
                    ))}
                  </div>

                  {/* Stats */}
                  <div className="pt-6 border-t border-white/10">
                    <div className="grid grid-cols-3 gap-4">
                      {Object.entries(project.stats).map(([key, value]) => (
                        <div key={key} className="text-center">
                          <div className="text-lg font-bold text-blue-400">{value}</div>
                          <div className="text-xs text-gray-400 capitalize">{key}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
} 