'use client'

import Link from 'next/link'
import { Facebook, Instagram, Mail, MapPin, Phone } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* O nas */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-4">MWIS</h3>
            <p className="text-gray-400 mb-4">
              Tworzymy profesjonalne strony internetowe, które pomagają firmom zaistnieć w sieci.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-blue-500 transition-colors">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="hover:text-pink-500 transition-colors">
                <Instagram className="h-6 w-6" />
              </a>
              <a href="mailto:kontakt@mwis.pl" className="hover:text-blue-400 transition-colors">
                <Mail className="h-6 w-6" />
              </a>
            </div>
          </div>

          {/* Szybkie linki */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Szybkie Linki</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/uslugi" className="hover:text-blue-400 transition-colors">
                  Usługi
                </Link>
              </li>
              <li>
                <Link href="/o-nas" className="hover:text-blue-400 transition-colors">
                  O nas
                </Link>
              </li>
              <li>
                <Link href="/kontakt" className="hover:text-blue-400 transition-colors">
                  Kontakt
                </Link>
              </li>
            </ul>
          </div>

          {/* Usługi */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Nasze Usługi</h4>
            <ul className="space-y-2">
              <li>Landing Page</li>
              <li>Strony z Podstronami</li>
              <li>Optymalizacja SEO</li>
              <li>Wsparcie Techniczne</li>
            </ul>
          </div>

          {/* Kontakt */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Kontakt</h4>
            <ul className="space-y-4">
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-2" />
                +48 123 456 789
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-2" />
                kontakt@mwis.pl
              </li>
              <li className="flex items-center">
                <MapPin className="h-5 w-5 mr-2" />
                Warszawa, Polska
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p>&copy; {new Date().getFullYear()} MWIS. Wszelkie prawa zastrzeżone.</p>
        </div>
      </div>
    </footer>
  )
} 