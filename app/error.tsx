"use client"

import { useEffect } from "react"
import Link from "next/link"
import { AlertTriangle, RefreshCw, Home } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
      <div className="mx-auto max-w-md text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-destructive/10 mx-auto mb-6">
          <AlertTriangle className="h-10 w-10 text-destructive" />
        </div>

        <h1 className="text-2xl font-bold text-foreground mb-3">Something went wrong</h1>
        <p className="text-sm text-muted-foreground leading-relaxed mb-8">
          An unexpected error occurred. Please try again or contact support if the issue persists.
        </p>

        <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Button className="rounded-full px-6 bg-primary text-primary-foreground hover:bg-primary/90" onClick={() => reset()}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Try Again
          </Button>
          <Button variant="outline" className="rounded-full px-6" asChild>
            <Link href="/">
              <Home className="mr-2 h-4 w-4" />
              Go Home
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
