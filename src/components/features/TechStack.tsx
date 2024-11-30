'use client'

const technologies = [
  { name: 'WordPress', category: 'CMS' },
  { name: 'WooCommerce', category: 'E-commerce' },
  { name: 'Next.js', category: 'Frontend' },
  { name: 'React', category: 'Frontend' },
  { name: 'PHP', category: 'Backend' },
  { name: 'MySQL', category: 'Database' },
  { name: 'Cloudflare', category: 'Security' },
  { name: 'Google Analytics', category: 'Analytics' },
  { name: 'Shopify', category: 'E-commerce' },
  { name: 'PrestaShop', category: 'E-commerce' }
]

export default function TechStack() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Technologie</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Wykorzystujemy najnowsze technologie i sprawdzone rozwiązania, aby dostarczać niezawodne i skalowalne systemy.
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-4">
          {technologies.map((tech) => (
            <div
              key={tech.name}
              className="px-6 py-3 bg-gray-50 rounded-full text-sm font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
            >
              {tech.name}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
} 