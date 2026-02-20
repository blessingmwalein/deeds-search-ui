import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { DeedDetailContent } from "@/components/deed/deed-detail-content"

export const metadata = {
  title: "Deed Details - DeedSearch Portal",
  description: "View detailed property title deed information.",
}

export default async function DeedDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 bg-[var(--tertiary-color)]/30">
        <DeedDetailContent deedId={id} />
      </main>
      <Footer />
    </div>
  )
}
