'use client'

import { useEffect, useState, useRef } from 'react'
import { Mail, Phone, Send, Clock, MapPin } from 'lucide-react'
import emailjs from '@emailjs/browser'
import ReCAPTCHA from 'react-google-recaptcha'

const contactInfo = [
  {
    title: 'Kontakt',
    description: 'Skontaktuj się z nami w sprawie Twojego projektu',
    email: 'mateusz.wojcikk11@gmail.com',
    phone: '+48 512 847 175'
  },
  {
    title: 'Wsparcie techniczne',
    description: 'Pomożemy Ci rozwiązać każdy problem techniczny',
    email: 'mateusz.wojcikk11@gmail.com'
  }
]

const workingHours = [
  { days: 'Poniedziałek - Piątek', hours: '9:00 - 17:00' },
  { days: 'Sobota', hours: '10:00 - 14:00' },
  { days: 'Niedziela', hours: 'Zamknięte' }
]

// Stała dla minimalnego odstępu między wysyłkami (50 sekund)
const MIN_SUBMISSION_INTERVAL = 50000

export default function ContactPage() {
  const [isVisible, setIsVisible] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [lastSubmitTime, setLastSubmitTime] = useState<number>(0)
  const [cooldownRemaining, setCooldownRemaining] = useState<number>(0)
  const recaptchaRef = useRef<ReCAPTCHA>(null)
  const [recaptchaValue, setRecaptchaValue] = useState<string | null>(null)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  useEffect(() => {
    emailjs.init({
      publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY,
      blockHeadless: false,
    })
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

  // Funkcja pomocnicza do formatowania pozostałego czasu
  const formatCooldownTime = (ms: number): string => {
    const seconds = Math.ceil(ms / 1000)
    return `${seconds} sekund`
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!recaptchaValue) {
      alert('Proszę potwierdzić, że nie jesteś robotem')
      return
    }

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
      const result = await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_CONTACT_TEMPLATE_ID!,
        {
          from_name: formData.name,
          from_email: formData.email,
          phone: formData.phone || 'Nie podano',
          subject: formData.subject,
          message: formData.message,
          to_email: 'mateusz.wojcikk11@gmail.com',
          reply_to: formData.email,
          'g-recaptcha-response': recaptchaValue
        }
      )

      if (result.status === 200) {
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: ''
        })
        setRecaptchaValue(null)
        recaptchaRef.current?.reset()
        setLastSubmitTime(now)
        setCooldownRemaining(MIN_SUBMISSION_INTERVAL)
        setSubmitStatus('success')
      } else {
        throw new Error('Błąd wysyłania wiadomości')
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error('Błąd wysyłania:', error.message)
      } else {
        console.error('Nieznany błąd:', error)
      }
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleRecaptchaChange = (value: string | null) => {
    setRecaptchaValue(value)
  }

  return (
    <main className="pt-24">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden bg-[#0A0F1C] text-white">
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
              <span className="w-2 h-2 bg-green-400 rounded-full"></span>
              <span>Jesteśmy online</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-serif mb-6">
              Porozmawiajmy o Twoim <br />
              <span className="text-blue-400">projekcie</span>
            </h1>
            <p className="text-xl text-gray-300">
              Jesteśmy tutaj, aby pomóc Ci stworzyć idealną stronę internetową. 
              Skontaktuj się z nami i opowiedz o swoich potrzebach.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Left Column - Contact Info */}
            <div className="space-y-8">
              {contactInfo.map((info, index) => (
                <div 
                  key={index}
                  className={`
                    relative p-8 bg-white rounded-xl border border-gray-100 shadow-sm
                    hover:shadow-lg hover:border-blue-100 transition-all duration-300
                    transition-all duration-700 delay-[${(index + 1) * 100}ms]
                    ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
                  `}
                >
                  <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50 rounded-full blur-2xl -z-10 opacity-60" />
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">{info.title}</h2>
                  <p className="text-gray-600 mb-6">{info.description}</p>
                  <div className="space-y-4">
                    {info.email && (
                      <a 
                        href={`mailto:${info.email}`}
                        className="flex items-center text-gray-600 hover:text-blue-600 transition-colors group"
                      >
                        <div className="p-2 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors">
                          <Mail className="w-5 h-5 text-blue-600" />
                        </div>
                        <span className="ml-3">{info.email}</span>
                      </a>
                    )}
                    {info.phone && (
                      <a 
                        href={`tel:${info.phone}`}
                        className="flex items-center text-gray-600 hover:text-blue-600 transition-colors group"
                      >
                        <div className="p-2 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors">
                          <Phone className="w-5 h-5 text-blue-600" />
                        </div>
                        <span className="ml-3">{info.phone}</span>
                      </a>
                    )}
                  </div>
                </div>
              ))}

              {/* Working Hours */}
              <div className={`
                relative p-8 bg-white rounded-xl border border-gray-100 shadow-sm
                transition-all duration-700 delay-500
                ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
              `}>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-blue-50 rounded-full blur-2xl -z-10 opacity-60" />
                <div className="flex items-center mb-8">
                  <div className="p-2 bg-blue-50 rounded-lg">
                    <Clock className="w-6 h-6 text-blue-600" />
                  </div>
                  <h2 className="ml-4 text-xl font-semibold text-gray-900">Godziny pracy</h2>
                </div>
                <div className="space-y-4">
                  {workingHours.map((time) => (
                    <div 
                      key={time.days}
                      className="flex justify-between items-center py-3 border-b border-gray-100 last:border-0"
                    >
                      <span className="text-gray-600">{time.days}</span>
                      <span className="font-medium text-gray-900">{time.hours}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Contact Form */}
            <div className={`
              relative p-8 bg-white rounded-xl border border-gray-100 shadow-sm
              hover:shadow-lg transition-all duration-300
              ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
            `}>
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full blur-2xl -z-10 opacity-60" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-50 rounded-full blur-2xl -z-10 opacity-60" />

              <h2 className="text-2xl font-serif text-gray-900 mb-2">Napisz do nas</h2>
              <p className="text-gray-600 mb-8">Odpowiemy najszybciej jak to możliwe</p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="relative group">
                    <input
                      type="text"
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="peer w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-lg text-gray-900
                        focus:ring-0 focus:bg-white transition-all placeholder-transparent
                        group-hover:bg-gray-200"
                      placeholder="Imię i nazwisko"
                      required
                    />
                    <label 
                      htmlFor="name"
                      className="absolute left-4 -top-2.5 text-sm font-medium text-gray-700 bg-white px-1
                        transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 
                        peer-placeholder-shown:top-3 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-blue-600"
                    >
                      Imię i nazwisko
                    </label>
                    <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 
                      transition-all duration-300 group-hover:w-full peer-focus:w-full" />
                  </div>

                  <div className="relative group">
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="peer w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-lg text-gray-900
                        focus:ring-0 focus:bg-white transition-all placeholder-transparent
                        group-hover:bg-gray-200"
                      placeholder="Email"
                      required
                    />
                    <label 
                      htmlFor="email"
                      className="absolute left-4 -top-2.5 text-sm font-medium text-gray-700 bg-white px-1
                        transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 
                        peer-placeholder-shown:top-3 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-blue-600"
                    >
                      Email
                    </label>
                    <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 
                      transition-all duration-300 group-hover:w-full peer-focus:w-full" />
                  </div>
                </div>

                <div className="relative group">
                  <input
                    type="tel"
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="peer w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-lg text-gray-900
                      focus:ring-0 focus:bg-white transition-all placeholder-transparent
                      group-hover:bg-gray-200"
                    placeholder="Numer telefonu"
                    required
                  />
                  <label 
                    htmlFor="phone"
                    className="absolute left-4 -top-2.5 text-sm font-medium text-gray-700 bg-white px-1
                      transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 
                      peer-placeholder-shown:top-3 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-blue-600"
                  >
                    Numer telefonu
                  </label>
                  <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 
                    transition-all duration-300 group-hover:w-full peer-focus:w-full" />
                </div>

                <div className="relative group">
                  <input
                    type="text"
                    id="subject"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="peer w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-lg text-gray-900
                      focus:ring-0 focus:bg-white transition-all placeholder-transparent
                      group-hover:bg-gray-200"
                    placeholder="Temat"
                    required
                  />
                  <label 
                    htmlFor="subject"
                    className="absolute left-4 -top-2.5 text-sm font-medium text-gray-700 bg-white px-1
                      transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 
                      peer-placeholder-shown:top-3 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-blue-600"
                  >
                    Temat
                  </label>
                  <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 
                    transition-all duration-300 group-hover:w-full peer-focus:w-full" />
                </div>

                <div className="relative group">
                  <textarea
                    id="message"
                    rows={6}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="peer w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-lg text-gray-900
                      focus:ring-0 focus:bg-white transition-all placeholder-transparent resize-none
                      group-hover:bg-gray-200"
                    placeholder="Wiadomość"
                    required
                  />
                  <label 
                    htmlFor="message"
                    className="absolute left-4 -top-2.5 text-sm font-medium text-gray-700 bg-white px-1
                      transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 
                      peer-placeholder-shown:top-3 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-blue-600"
                  >
                    Wiadomość
                  </label>
                  <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 
                    transition-all duration-300 group-hover:w-full peer-focus:w-full" />
                </div>

                {/* ReCAPTCHA */}
                <div className="flex justify-center mb-6">
                  <div className="bg-white rounded-lg p-2">
                    <ReCAPTCHA
                      ref={recaptchaRef}
                      sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
                      onChange={handleRecaptchaChange}
                      theme="light"
                    />
                  </div>
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

                <button
                  type="submit"
                  disabled={isSubmitting || cooldownRemaining > 0 || !recaptchaValue}
                  className={`
                    relative w-full py-4 bg-blue-600 text-white rounded-lg font-medium
                    overflow-hidden group transition-all duration-300
                    ${isSubmitting ? 'opacity-75 cursor-not-allowed' : 'hover:bg-blue-700'}
                  `}
                >
                  <div className="absolute inset-0 w-0 bg-white transition-all duration-300 ease-out group-hover:w-full opacity-10" />
                  <div className="relative flex items-center justify-center space-x-2">
                    <span className="transform group-hover:translate-x-1 transition-transform duration-300">
                      {isSubmitting ? 'Wysyłanie...' : 
                       cooldownRemaining > 0 ? `Poczekaj ${formatCooldownTime(cooldownRemaining)}` : 
                       'Wyślij wiadomość'}
                    </span>
                    <Send className={`
                      w-5 h-5 transform transition-all duration-300
                      ${isSubmitting ? 'animate-pulse' : 'group-hover:translate-x-2'}
                    `} />
                  </div>
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`
            relative bg-white rounded-lg shadow-lg overflow-hidden
            transition-all duration-700 delay-600
            ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
          `}>
            <div className="relative h-[500px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2493.1043656893166!2d16.07519937726831!3d51.66575397281701!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x470fc241b0d6e3b5%3A0x5cf49a7ebad3c1da!2zSsSZZHJ6ZWphIGkgSmFuYSDFm25pYWRlY2tpY2ggMTgsIDY3LTIwMCBHxYJvZ8Ozdw!5e0!3m2!1spl!2spl!4v1701726583744!5m2!1spl!2spl"
                width="100%"
                height="100%"
                style={{ border: 0, position: 'absolute', inset: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-lg"
              ></iframe>
            </div>
            <div className="absolute bottom-8 left-8 right-8 bg-white/90 backdrop-blur-sm p-4 rounded-lg shadow-lg">
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-blue-500" />
                <span>Głogów, Jędrzeja i Jana Śniadeckich 18</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
} 