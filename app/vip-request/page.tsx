import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { VipRequestContent } from "@/components/vip/vip-request-content"

export const metadata = {
  title: "VIP / Restricted Records Request - DeedSearch Portal",
  description: "Submit a formal request for restricted or VIP deed record access. Requires justification and supporting documentation.",
}

export default function VipRequestPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 bg-[var(--tertiary-color)]/30">
        <VipRequestContent />
      </main>
      <Footer />
    </div>
  )
}
