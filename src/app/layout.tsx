import type { Metadata } from 'next'
import { Inter, Playfair_Display, Cinzel_Decorative } from 'next/font/google'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Script from 'next/script'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const playfair = Playfair_Display({ 
  subsets: ['latin'], 
  variable: '--font-playfair'
})
const cinzel = Cinzel_Decorative({
  weight: ['400', '700', '900'],
  subsets: ['latin'],
  variable: '--font-cinzel'
})

export const metadata: Metadata = {
  metadataBase: new URL('https://veloweb.pl'),
  title: 'VeloWeb - Tworzenie Stron Internetowych Głogów | Projektowanie WWW',
  description: 'Profesjonalne tworzenie stron internetowych w Głogowie. ✓ Nowoczesny design ✓ Optymalizacja SEO ✓ Responsywne strony WWW dla firm ✓ Skuteczne pozycjonowanie. Zamów swoją stronę!',
  keywords: 'tworzenie stron internetowych, strony www Głogów, projektowanie stron internetowych, strony dla firm, web development Głogów, responsywne strony www, pozycjonowanie stron, SEO Głogów',
  authors: [{ name: 'VeloWeb', url: 'https://veloweb.pl' }],
  creator: 'VeloWeb',
  publisher: 'VeloWeb',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: '/',
    languages: {
      'pl-PL': '/',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'pl_PL',
    url: 'https://veloweb.pl',
    title: 'VeloWeb - Profesjonalne Tworzenie Stron Internetowych w Głogowie',
    description: 'Tworzymy nowoczesne strony internetowe dla firm w Głogowie i okolicach. Responsywny design, optymalizacja SEO i niezawodne rozwiązania. Sprawdź naszą ofertę!',
    siteName: 'VeloWeb',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'VeloWeb - Profesjonalne Strony Internetowe w Głogowie'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'VeloWeb - Profesjonalne Tworzenie Stron Internetowych w Głogowie',
    description: 'Tworzymy nowoczesne strony internetowe dla firm w Głogowie i okolicach. Responsywny design, optymalizacja SEO i niezawodne rozwiązania.',
    images: ['/images/og-image.jpg'],
    creator: '@veloweb',
    site: '@veloweb'
  },
  verification: {
    google: 'twój-kod-weryfikacyjny-google',
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pl" className={`scroll-smooth ${inter.variable} ${playfair.variable} ${cinzel.variable}`}>
      <head>
        <link rel="icon" type="image/x-icon" href="/images/velowebico.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <link rel="sitemap" type="application/xml" href="/sitemap.xml" />
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}');
          `}
        </Script>
        <Script id="schema-org" type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "WebDesignCompany",
              "name": "VeloWeb",
              "url": "https://veloweb.pl",
              "logo": "https://veloweb.pl/images/velowebico.ico",
              "description": "Profesjonalne tworzenie stron internetowych w Głogowie. Nowoczesny design, optymalizacja SEO i responsywne strony WWW dla firm.",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Głogów",
                "addressRegion": "Dolnośląskie",
                "addressCountry": "PL"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": "51.6628",
                "longitude": "16.0784"
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+48-512-847-175",
                "contactType": "customer service",
                "email": "veloweb.contact@gmail.com",
                "availableLanguage": ["Polish", "English"]
              },
              "sameAs": [
                "https://www.linkedin.com/company/velowebpl",
                "https://www.instagram.com/velowebpl/"
              ],
              "openingHoursSpecification": {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": [
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday"
                ],
                "opens": "09:00",
                "closes": "17:00"
              },
              "priceRange": "$$",
              "areaServed": {
                "@type": "GeoCircle",
                "geoMidpoint": {
                  "@type": "GeoCoordinates",
                  "latitude": "51.6628",
                  "longitude": "16.0784"
                },
                "geoRadius": "100000"
              }
            }
          `}
        </Script>
      </head>
      <body className="bg-[#0A0F1C]">
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
