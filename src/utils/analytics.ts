// Definicja typu dla gtag
declare global {
  interface Window {
    gtag: (
      command: 'event' | 'consent',
      action: string,
      params: Record<string, unknown>
    ) => void
  }
}

// Funkcja do śledzenia zdarzeń w Google Analytics
export const trackEvent = (eventName: string, properties?: Record<string, unknown>) => {
  try {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', eventName, {
        ...properties,
      })
    }
  } catch (error) {
    console.error('Error tracking event:', error)
  }
}

// Predefiniowane wydarzenia
export const trackPageView = (url: string, title: string) => {
  trackEvent('page_view', {
    page_location: url,
    page_title: title
  })
}

export const trackNavigation = (destination: string) => {
  trackEvent('navigation_click', {
    destination,
    source: typeof window !== 'undefined' ? window.location.pathname : 'unknown'
  })
}

export const trackFormSubmission = (formName: string, success: boolean) => {
  trackEvent('form_submission', {
    form_name: formName,
    success
  })
}

export const trackServiceClick = (serviceName: string) => {
  trackEvent('service_click', {
    service_name: serviceName
  })
}

export const trackPortfolioView = (projectName: string) => {
  trackEvent('portfolio_view', {
    project_name: projectName
  })
}

export const trackContactClick = (method: string) => {
  trackEvent('contact_click', {
    contact_method: method
  })
} 