import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { SearchPageContent } from "@/components/search/search-page-content"
import { Suspense } from "react"

export const metadata = {
  title: "Search Deeds - DeedSearch Portal",
  description: "Search property title deed records by deed number or property address.",
}

export default function SearchPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 bg-[var(--tertiary-color)]/30">
        <Suspense fallback={<div className="flex items-center justify-center py-20"><div className="h-8 w-8 rounded-full border-2 border-primary border-t-transparent animate-spin" /></div>}>
          <SearchPageContent />
        </Suspense>
      </main>
      <Footer />
    </div>
  )
}
