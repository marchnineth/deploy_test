import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { StorySection } from "@/components/story-section"
import { StatsSection } from "@/components/stats-section"
import { CollectionSection } from "@/components/collection-section"
import { CTASection } from "@/components/cta-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <AboutSection />
      <StorySection />
      <StatsSection />
      <CollectionSection />
      <CTASection />
      <Footer />
    </main>
  )
}
