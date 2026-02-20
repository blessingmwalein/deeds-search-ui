import { Suspense } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { HeroSection } from "@/components/home/hero-section"
import { AboutSection } from "@/components/home/about-section"
import { TierCardsSection } from "@/components/home/tier-cards-section"
import { FeaturesSection } from "@/components/home/features-section"
import { FaqSection } from "@/components/home/faq-section"
import { CtaSection } from "@/components/home/cta-section"

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar transparent />
      <main className="flex-1">
        <Suspense>
          <HeroSection />
        </Suspense>
        <AboutSection />
        <TierCardsSection />
        <FeaturesSection />
        <FaqSection />
        <CtaSection />
      </main>
      <Footer />
    </div>
  )
}
