'use client'

import { useState, useEffect } from 'react'

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false)

  useEffect(() => {
    // Sprawdź czy użytkownik już dokonał wyboru
    const consent = localStorage.getItem('cookie-consent')
    if (!consent) {
      setShowBanner(true)
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'true')
    setShowBanner(false)
    
    // Włącz Analytics
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'cookie_consent', {
        analytics_storage: 'granted'
      })
    }
  }

  const handleDecline = () => {
    localStorage.setItem('cookie-consent', 'false')
    setShowBanner(false)
    
    // Wyłącz Analytics
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'cookie_consent', {
        analytics_storage: 'denied'
      })
    }
  }

  if (!showBanner) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[9999]">
      <div className="bg-[#0A0F1C]/95 backdrop-blur-sm border-t border-white/10">
        <div className="max-w-7xl mx-auto p-4 md:p-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-300 text-center sm:text-left">
              Używamy plików cookie do celów analitycznych, aby lepiej zrozumieć, jak korzystasz z naszej strony.
            </p>
            <div className="flex gap-3 w-full sm:w-auto">
              <button
                onClick={handleDecline}
                className="flex-1 sm:flex-initial px-4 py-2 text-sm border border-white/10 
                         rounded-lg hover:bg-white/5 transition-colors"
              >
                Odrzuć
              </button>
              <button
                onClick={handleAccept}
                className="flex-1 sm:flex-initial px-4 py-2 text-sm bg-blue-600 
                         rounded-lg hover:bg-blue-700 transition-colors"
              >
                Akceptuj
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 