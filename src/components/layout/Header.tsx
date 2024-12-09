'use client'

import { Menu, X } from 'lucide-react'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { trackNavigation, trackContactClick } from '@/utils/analytics'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  // Strony z jasnym tłem, gdzie header powinien być widoczny
  const isLightPage = ['/uslugi', '/o-nas'].includes(pathname)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMenuOpen])

  const handleNavigation = (destination: string) => {
    trackNavigation(destination)
    setIsMenuOpen(false)
  }

  return (
    <>
      <header className={`
        fixed top-0 w-full z-50 transition-all duration-300
        ${scrolled || isLightPage ? 'bg-[#0A0F1C]/95 backdrop-blur-sm py-2' : 'py-4'}
      `}>
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-8 lg:px-16">
          <div className="flex justify-between items-center relative z-50">
            <Link 
              href="/" 
              className="text-2xl font-bold text-white"
              onClick={() => handleNavigation('home')}
            >
              VeloWeb
            </Link>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="flex items-center space-x-2 bg-blue-600/20 hover:bg-blue-600/30 px-4 py-2 rounded-full text-white transition-all duration-300"
            >
              <span className="text-sm font-medium">{isMenuOpen ? 'Zamknij' : 'Menu'}</span>
              {isMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </header>

      <div className={`
        fixed inset-0 bg-[#0A0F1C] z-40
        transition-all duration-500 ease-in-out
        ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
      `}>
        <div className="h-screen flex flex-col justify-center max-w-screen-2xl mx-auto px-4 sm:px-8 lg:px-16">
          <nav className="space-y-12">
            {[
              { href: '/', label: 'Strona główna' },
              { href: '/uslugi', label: 'Usługi' },
              { href: '/o-nas', label: 'O nas' },
              { href: '/portfolio', label: 'Portfolio' },
              { href: '/kontakt', label: 'Kontakt' },
            ].map((link, index) => (
              <div
                key={link.href}
                className="overflow-hidden"
                style={{ 
                  transitionDelay: `${(index + 1) * 100}ms`
                }}
              >
                <Link
                  href={link.href}
                  onClick={() => handleNavigation(link.label.toLowerCase())}
                  className={`
                    block text-5xl font-serif text-white hover:text-blue-400 transition-all duration-300
                    transform ${isMenuOpen ? 'translate-y-0' : 'translate-y-full'}
                  `}
                >
                  {link.label}
                </Link>
              </div>
            ))}
          </nav>

          <div className={`
            mt-12 text-gray-400 transition-all duration-500 delay-500
            transform ${isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}
          `}>
            <p className="text-sm uppercase tracking-wider mb-2">Kontakt</p>
            <a 
              href="mailto:veloweb.contact@gmail.com" 
              className="text-white hover:text-blue-400 transition-colors"
              onClick={() => trackContactClick('email')}
            >
              veloweb.contact@gmail.com
            </a>
          </div>
        </div>
      </div>
    </>
  )
} 