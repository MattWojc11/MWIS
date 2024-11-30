'use client'

import Image from 'next/image'

const brands = [
  { id: 1, name: 'Marka 1', logo: 'https://picsum.photos/id/10/150/150' },
  { id: 2, name: 'Marka 2', logo: 'https://picsum.photos/id/11/150/150' },
  { id: 3, name: 'Marka 3', logo: 'https://picsum.photos/id/12/150/150' },
  { id: 4, name: 'Marka 4', logo: 'https://picsum.photos/id/13/150/150' },
  { id: 5, name: 'Marka 5', logo: 'https://picsum.photos/id/14/150/150' }
]

export default function BrandShowcase() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-semibold text-center mb-12">Zaufali Nam</h2>
        <div className="flex flex-wrap justify-center gap-8">
          {brands.map((brand) => (
            <div
              key={brand.id}
              className="relative w-[150px] h-[150px] grayscale hover:grayscale-0 transition-all"
            >
              <Image
                src={brand.logo}
                alt={brand.name}
                fill
                className="object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
} 