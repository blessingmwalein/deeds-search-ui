import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { TierCardsSection } from "@/components/home/tier-cards-section"
import { FaqSection } from "@/components/home/faq-section"
import { CtaSection } from "@/components/home/cta-section"

export const metadata = {
  title: "Service Plans & Pricing - Deeds Registry",
  description: "Choose your level of access to property deed records. Basic search, detailed view, and VIP access tiers available.",
}

export default function PricingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <TierCardsSection />
        <FaqSection />
        <CtaSection />
      </main>
      <Footer />
    </div>
  )
}
