'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Mail, Phone, ArrowUpRight } from 'lucide-react'

const team = [
  {
    name: 'Anna Kowalska',
    role: 'CEO & Founder',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956',
    bio: 'Ekspert w dziedzinie projektowania stron internetowych z 8-letnim doświadczeniem.',
    specialties: ['Web Design', 'UX/UI', 'Zarządzanie Projektami'],
    contact: {
      email: 'anna@mwis.pl',
      phone: '+48 500 600 700'
    }
  },
  {
    name: 'Piotr Nowak',
    role: 'Lead Developer',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e',
    bio: 'Programista full-stack specjalizujący się w nowoczesnych technologiach webowych.',
    specialties: ['React', 'Node.js', 'TypeScript'],
    contact: {
      email: 'piotr@mwis.pl',
      phone: '+48 500 600 800'
    }
  }
]

export default function TeamSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [selectedMember, setSelectedMember] = useState<number | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    const section = document.getElementById('team-section')
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
    <section id="team-section" className="py-24 bg-white relative overflow-hidden">
      {/* Dekoracyjne tło */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_500px_at_50%_200px,#f3f8ff,transparent)]" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className={`
          mb-20
          transition-all duration-700 delay-200
          ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
        `}>
          <div className="max-w-xl">
            <h2 className="text-4xl md:text-5xl font-serif text-gray-900 mb-4">
              Nasz <span className="text-blue-600">Zespół</span>
            </h2>
            <p className="text-gray-600">
              Poznaj ekspertów, którzy zadbają o Twój projekt. Każdy z nas specjalizuje się 
              w innym obszarze, co pozwala nam tworzyć kompleksowe rozwiązania.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
          {team.map((member, index) => (
            <div
              key={member.name}
              className={`
                group relative
                transition-all duration-700 delay-[${(index + 1) * 100}ms]
                ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
              `}
            >
              {/* Karta członka zespołu */}
              <div 
                className={`
                  relative p-6 bg-white rounded-2xl transition-all duration-300
                  ${selectedMember === index ? 'ring-2 ring-blue-600 shadow-xl' : 'hover:shadow-lg'}
                `}
                onMouseEnter={() => setSelectedMember(index)}
                onMouseLeave={() => setSelectedMember(null)}
              >
                {/* Zdjęcie i podstawowe info */}
                <div className="flex items-start space-x-6 mb-6">
                  <div className="relative w-24 h-24 rounded-xl overflow-hidden flex-shrink-0">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{member.name}</h3>
                    <p className="text-blue-600 font-medium mb-2">{member.role}</p>
                    <p className="text-sm text-gray-600">{member.bio}</p>
                  </div>
                </div>

                {/* Specjalizacje */}
                <div className="mb-6">
                  <div className="flex flex-wrap gap-2">
                    {member.specialties.map((specialty) => (
                      <span 
                        key={specialty}
                        className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm font-medium"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Kontakt */}
                <div className={`
                  space-y-3 pt-4 border-t border-gray-100
                  transition-all duration-300
                  ${selectedMember === index ? 'opacity-100' : 'opacity-50'}
                `}>
                  <a 
                    href={`mailto:${member.contact.email}`}
                    className="flex items-center text-gray-600 hover:text-blue-600 transition-colors group"
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    <span className="text-sm">{member.contact.email}</span>
                    <ArrowUpRight className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                  <a 
                    href={`tel:${member.contact.phone}`}
                    className="flex items-center text-gray-600 hover:text-blue-600 transition-colors group"
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    <span className="text-sm">{member.contact.phone}</span>
                    <ArrowUpRight className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
} 