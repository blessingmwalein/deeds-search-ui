import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function CtaSection() {
  return (
    <section className="bg-primary py-20 lg:py-24">
      <div className="mx-auto max-w-3xl px-4 text-center lg:px-6">
        <h2 className="text-2xl font-bold text-primary-foreground sm:text-3xl lg:text-4xl text-balance">
          Ready to Access Property Deed Records?
        </h2>
        <p className="mt-4 text-base text-primary-foreground/70 leading-relaxed max-w-xl mx-auto">
          Start searching today with our secure, efficient portal. Create an account for extended access and exclusive features.
        </p>
        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Button
            size="lg"
            className="rounded-full bg-primary-foreground text-primary hover:bg-primary-foreground/90 px-8"
            asChild
          >
            <Link href="/search">
              Search Deeds Now
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="rounded-full border-primary-foreground/30 text-primary hover:bg-primary-foreground/10 hover:text-primary-foreground px-8"
            asChild
          >
            <Link href="/signup">Create Account</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
