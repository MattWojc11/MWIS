import Hero from '@/components/layout/Hero'
import ServiceGrid from '@/components/features/ServiceGrid'
import PersonalMessage from '@/components/features/PersonalMessage'
import ProcessSection from '@/components/features/ProcessSection'
import PortfolioSection from '@/components/features/PortfolioSection'
import PricingSection from '@/components/features/PricingSection'
import TeamSection from '@/components/features/TeamSection'
import BrandShowcase from '@/components/features/BrandShowcase'

export default function Home() {
  return (
    <>
      <Hero />
      <ServiceGrid />
      <PersonalMessage />
      <ProcessSection />
      <PortfolioSection />
      <PricingSection />
      <TeamSection />
      <BrandShowcase />
    </>
  )
}
