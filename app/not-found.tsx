import Link from "next/link"
import { FileText, Search, Home, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
      <div className="mx-auto max-w-md text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[var(--tertiary-color)] mx-auto mb-6">
          <FileText className="h-10 w-10 text-primary" />
        </div>

        <p className="text-7xl font-bold text-primary mb-4">404</p>
        <h1 className="text-2xl font-bold text-foreground mb-3">Page Not Found</h1>
        <p className="text-sm text-muted-foreground leading-relaxed mb-8">
          The page you are looking for does not exist or has been moved. Please check the URL or navigate back to a known page.
        </p>

        <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Button className="rounded-full px-6 bg-primary text-primary-foreground hover:bg-primary/90" asChild>
            <Link href="/">
              <Home className="mr-2 h-4 w-4" />
              Go Home
            </Link>
          </Button>
          <Button variant="outline" className="rounded-full px-6" asChild>
            <Link href="/search">
              <Search className="mr-2 h-4 w-4" />
              Search Deeds
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
