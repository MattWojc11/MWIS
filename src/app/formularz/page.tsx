'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import emailjs from '@emailjs/browser'
import { Package, User, Mail, MessageSquare, Send } from 'lucide-react'

// Initialize EmailJS with environment variable
if (typeof window !== 'undefined') {
  emailjs.init(process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || '')
}

// Stała dla minimalnego odstępu między wysyłkami (50 sekund)
const MIN_SUBMISSION_INTERVAL = 50000

export default function FormPage() {
  const searchParams = useSearchParams()
  const [isVisible, setIsVisible] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [lastSubmitTime, setLastSubmitTime] = useState<number>(0)
  const [cooldownRemaining, setCooldownRemaining] = useState<number>(0)
  
  const [formData, setFormData] = useState({
    package: searchParams.get('package') || '',
    price: searchParams.get('price') || '',
    firstName: '',
    lastName: '',
    email: '',
    message: ''
  })

  useEffect(() => {
    setIsVisible(true)
  }, [])

  // Efekt dla odliczania cooldownu
  useEffect(() => {
    if (cooldownRemaining > 0) {
      const timer = setInterval(() => {
        setCooldownRemaining(prev => Math.max(0, prev - 1000))
      }, 1000)
      return () => clearInterval(timer)
    }
  }, [cooldownRemaining])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Sprawdź czy minął wymagany czas od ostatniego wysłania
    const now = Date.now()
    const timeSinceLastSubmit = now - lastSubmitTime
    
    if (timeSinceLastSubmit < MIN_SUBMISSION_INTERVAL) {
      const remainingTime = MIN_SUBMISSION_INTERVAL - timeSinceLastSubmit
      setCooldownRemaining(remainingTime)
      setSubmitStatus('error')
      return
    }

    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const templateParams = {
        to_email: 'mateusz.wojcikk11@gmail.com',
        package_name: formData.package,
        package_price: formData.price,
        from_name: `${formData.firstName} ${formData.lastName}`,
        from_email: formData.email,
        message: formData.message,
        subject: `Nowe zamówienie strony: ${formData.package}`,
        reply_to: formData.email,
        email_title: 'Nowe zamówienie strony internetowej',
        package_title: 'Szczegóły wybranego pakietu',
        contact_title: 'Dane kontaktowe klienta',
        message_title: 'Treść wiadomości od klienta',
        footer_text: 'Wiadomość wysłana automatycznie z formularza zamówień na stronie VeloWeb.'
      }

      if (!process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 
          !process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID) {
        throw new Error('Brak konfiguracji EmailJS')
      }

      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
        templateParams
      )

      setLastSubmitTime(now)
      setCooldownRemaining(MIN_SUBMISSION_INTERVAL)
      setSubmitStatus('success')
      setFormData(prev => ({
        package: prev.package,
        price: prev.price,
        firstName: '',
        lastName: '',
        email: '',
        message: ''
      }))
    } catch (error) {
      console.error('Błąd wysyłania wiadomości:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  // Funkcja pomocnicza do formatowania pozostałego czasu
  const formatCooldownTime = (ms: number): string => {
    const seconds = Math.ceil(ms / 1000)
    return `${seconds} sekund`
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  return (
    <main className="pt-24 min-h-screen bg-[#0A0F1C] text-white">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_500px_at_50%_200px,#1a365d20,transparent)]" />
      <div className="absolute inset-0" style={{
        backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.05) 1px, transparent 0)',
        backgroundSize: '40px 40px'
      }} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative">
        <div className={`
          transition-all duration-1000
          ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
        `}>
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center p-3 bg-blue-500/10 rounded-2xl mb-6">
              <Send className="w-8 h-8 text-blue-400" />
            </div>
            <h1 className="text-4xl md:text-5xl font-serif mb-4">
              Formularz <span className="text-blue-400">zamówienia</span>
            </h1>
            <p className="text-gray-400 max-w-xl mx-auto">
              Wypełnij poniższy formularz, aby rozpocząć współpracę. 
              Skontaktujemy się z Tobą w ciągu 24 godzin.
            </p>
          </div>

          {/* Wybrany pakiet - wyróżniona sekcja */}
          <div className="mb-12 transform hover:scale-[1.02] transition-all duration-300">
            <div className="bg-gradient-to-br from-blue-600/20 to-blue-400/5 backdrop-blur-sm rounded-2xl p-8 border border-blue-500/20 shadow-lg">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-blue-500/20 rounded-xl">
                  <Package className="w-6 h-6 text-blue-400" />
                </div>
                <h2 className="text-2xl font-semibold text-white">Wybrany pakiet</h2>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <p className="text-sm text-blue-200 mb-2 uppercase tracking-wider">Nazwa pakietu</p>
                  <p className="text-lg text-white font-medium">{formData.package}</p>
                </div>
                <div>
                  <p className="text-sm text-blue-200 mb-2 uppercase tracking-wider">Cena</p>
                  <div className="flex items-baseline">
                    <span className="text-3xl font-bold text-blue-400">{formData.price}</span>
                    <span className="ml-2 text-blue-200">PLN</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Formularz */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-white/10 shadow-xl">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Imię i Nazwisko w jednym rzędzie */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="group">
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
                    <User className="w-4 h-4" />
                    Imię
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white/10 border border-white/10 rounded-lg text-white placeholder-gray-500 
                             focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-300
                             group-hover:border-blue-500/50"
                    placeholder="Twoje imię"
                  />
                </div>
                <div className="group">
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
                    <User className="w-4 h-4" />
                    Nazwisko
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white/10 border border-white/10 rounded-lg text-white placeholder-gray-500 
                             focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-300
                             group-hover:border-blue-500/50"
                    placeholder="Twoje nazwisko"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="group">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
                  <Mail className="w-4 h-4" />
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white/10 border border-white/10 rounded-lg text-white placeholder-gray-500 
                           focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-300
                           group-hover:border-blue-500/50"
                  placeholder="twoj@email.com"
                />
              </div>

              {/* Wiadomość */}
              <div className="group">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
                  <MessageSquare className="w-4 h-4" />
                  Wiadomość
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full px-4 py-3 bg-white/10 border border-white/10 rounded-lg text-white placeholder-gray-500 
                           focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-300 resize-none
                           group-hover:border-blue-500/50"
                  placeholder="Twoja wiadomość..."
                />
              </div>

              {/* Status wiadomości */}
              {submitStatus === 'success' && (
                <div className="p-4 bg-green-500/20 border border-green-500/50 rounded-lg text-green-400 animate-fade-in">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    <p>Wiadomość została wysłana pomyślnie!</p>
                  </div>
                  {cooldownRemaining > 0 && (
                    <p className="mt-2 text-sm">
                      Następną wiadomość będzie można wysłać za {formatCooldownTime(cooldownRemaining)}
                    </p>
                  )}
                </div>
              )}
              {submitStatus === 'error' && cooldownRemaining > 0 ? (
                <div className="p-4 bg-yellow-500/20 border border-yellow-500/50 rounded-lg text-yellow-400 animate-fade-in">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
                    <p>Proszę poczekać {formatCooldownTime(cooldownRemaining)} przed wysłaniem kolejnej wiadomości.</p>
                  </div>
                </div>
              ) : submitStatus === 'error' && (
                <div className="p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-400 animate-fade-in">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse" />
                    <p>Wystąpił błąd podczas wysyłania wiadomości. Spróbuj ponownie później.</p>
                  </div>
                </div>
              )}

              {/* Przycisk wysyłania */}
              <button
                type="submit"
                disabled={isSubmitting || cooldownRemaining > 0}
                className={`
                  w-full px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-xl
                  text-white font-medium transition-all duration-300
                  disabled:opacity-50 disabled:cursor-not-allowed
                  flex items-center justify-center gap-3
                  group relative overflow-hidden
                  ${isSubmitting ? 'animate-pulse' : ''}
                `}
              >
                <span className="relative z-10">
                  {isSubmitting ? 'Wysyłanie...' : 
                   cooldownRemaining > 0 ? `Poczekaj ${formatCooldownTime(cooldownRemaining)}` : 
                   'Wyślij formularz'}
                </span>
                <Send className={`w-5 h-5 transition-transform duration-300 ${isSubmitting ? 'translate-x-2' : 'group-hover:translate-x-1'}`} />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-700 transform transition-transform duration-300 group-hover:scale-110" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  )
} 