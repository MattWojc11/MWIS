import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

<section className="py-20 bg-gray-50">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    {/* Zawartość sekcji */}
    
    {/* Przycisk "Zobacz więcej" */}
    <div className="mt-16 flex justify-center">
      <Link 
        href="/uslugi" 
        className="group relative inline-flex items-center gap-4"
      >
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-blue-400 rounded-xl opacity-0 group-hover:opacity-20 blur transition-opacity" />
        <div className="relative flex items-center gap-3 px-8 py-4 bg-[#0A0F1C] hover:bg-[#0F1629] rounded-xl transition-colors">
          <span className="text-white font-medium">
            Zobacz wszystkie nasze usługi
          </span>
          <div className="relative flex items-center justify-center w-6 h-6">
            <div className="absolute w-6 h-6 bg-blue-600 rounded-full animate-ping opacity-20" />
            <ArrowRight className="w-4 h-4 text-blue-400 transform group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </Link>
    </div>
  </div>
</section> 