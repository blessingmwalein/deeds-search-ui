import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { PaymentContent } from "@/components/payment/payment-content"

export const metadata = {
  title: "Payment - DeedSearch Portal",
  description: "Complete your payment for deed access. Secure payment processing with instant receipts.",
}

export default function PaymentPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 bg-[var(--tertiary-color)]/30">
        <PaymentContent />
      </main>
      <Footer />
    </div>
  )
}
