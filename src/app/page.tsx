import HeroSection from '@/components/home/HeroSection'
import StatsBar from '@/components/home/StatsBar'
import ActivitiesPreview from '@/components/home/ActivitiesPreview'
import OpcShowcase from '@/components/home/OpcShowcase'
import ProductShowcase from '@/components/home/ProductShowcase'
import EcosystemMap from '@/components/home/EcosystemMap'
import PartnersWall from '@/components/home/PartnersWall'

export default function Home() {
  return (
    <>
      <HeroSection />
      <StatsBar />
      <ActivitiesPreview />
      <OpcShowcase />
      <ProductShowcase />
      <EcosystemMap />
      <PartnersWall />
    </>
  )
}
