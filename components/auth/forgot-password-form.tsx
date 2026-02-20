"use client"

import { useState } from "react"
import Link from "next/link"
import { FileText, Mail, ArrowLeft, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function ForgotPasswordForm() {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSubmitted(true)
    }, 1200)
  }

  return (
    <div className="w-full max-w-md">
      <div className="rounded-3xl bg-background p-8 sm:p-10 shadow-lg border border-border">
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary">
              <FileText className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-semibold text-foreground">Deeds Registry</span>
          </div>
        </div>

        {submitted ? (
          <div className="text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--green-main)]/10 mx-auto mb-5">
              <CheckCircle2 className="h-7 w-7 text-[var(--green-main)]" />
            </div>
            <h2 className="text-xl font-bold text-foreground">Check your email</h2>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
              {"We've sent a password reset link to "}
              <span className="font-medium text-foreground">{email}</span>
              {". Please check your inbox."}
            </p>
            <Button className="rounded-full mt-6 w-full bg-primary text-primary-foreground hover:bg-primary/90" asChild>
              <Link href="/login">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Sign In
              </Link>
            </Button>
          </div>
        ) : (
          <>
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-foreground">Reset Password</h1>
              <p className="mt-2 text-sm text-muted-foreground">
                {"Enter your email address and we'll send you a reset link."}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <Label htmlFor="resetEmail" className="text-sm text-foreground">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="resetEmail"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="rounded-full pl-10 h-11 border-border"
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="rounded-full h-11 bg-primary text-primary-foreground hover:bg-primary/90 w-full"
                disabled={loading}
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="h-4 w-4 rounded-full border-2 border-primary-foreground border-t-transparent animate-spin" />
                    Sending...
                  </span>
                ) : (
                  "Send Reset Link"
                )}
              </Button>
            </form>

            <p className="mt-6 text-center text-sm text-muted-foreground">
              <Link href="/login" className="font-medium text-primary hover:underline flex items-center justify-center gap-1">
                <ArrowLeft className="h-3 w-3" />
                Back to Sign In
              </Link>
            </p>
          </>
        )}
      </div>
    </div>
  )
}
