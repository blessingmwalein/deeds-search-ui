import Link from "next/link"
import { ShieldOff, LogIn, Home } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/navbar"

export const metadata = {
  title: "Unauthorized - DeedSearch Portal",
  description: "You do not have permission to access this resource.",
}

export default function UnauthorizedPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex flex-1 items-center justify-center px-4 py-20">
        <div className="mx-auto max-w-md text-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-destructive/10 mx-auto mb-6">
            <ShieldOff className="h-10 w-10 text-destructive" />
          </div>

          <h1 className="text-2xl font-bold text-foreground mb-3">Access Denied</h1>
          <p className="text-sm text-muted-foreground leading-relaxed mb-8">
            You do not have permission to access this resource. Please sign in or create an account to continue. If you believe this is an error, contact our support team.
          </p>

          <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Button className="rounded-full px-6 bg-primary text-primary-foreground hover:bg-primary/90" asChild>
              <Link href="/login">
                <LogIn className="mr-2 h-4 w-4" />
                Sign In
              </Link>
            </Button>
            <Button variant="outline" className="rounded-full px-6" asChild>
              <Link href="/">
                <Home className="mr-2 h-4 w-4" />
                Go Home
              </Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}
