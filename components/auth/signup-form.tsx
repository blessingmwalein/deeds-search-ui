"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, FileText, Mail, Lock, User, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function SignupForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    accountType: "",
  })
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const updateField = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    if (!formData.fullName || !formData.email || !formData.password || !formData.confirmPassword) {
      setError("Please fill in all required fields.")
      return
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.")
      return
    }
    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters.")
      return
    }
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      localStorage.setItem("isLoggedIn", "true")
      const pendingDeed = localStorage.getItem("pendingDeed")
      if (pendingDeed) {
        router.push(`/?deed=${encodeURIComponent(pendingDeed)}`)
      } else {
        router.push("/dashboard")
      }
    }, 1200)
  }

  return (
    <div className="w-full max-w-2xl">
      <div className="rounded-3xl bg-background p-8 sm:p-10 shadow-lg border border-border">
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary">
              <FileText className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-semibold text-foreground">Deeds Registry</span>
          </div>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-foreground">Create Account</h1>
          <p className="mt-2 text-sm text-muted-foreground">Sign up for detailed deed access and account features.</p>
        </div>

        {error && (
          <div className="mb-6 rounded-2xl bg-destructive/10 p-3 text-sm text-destructive text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* Row 1: Full Name + Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="fullName" className="text-sm text-foreground">Full Name</Label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="fullName"
                  type="text"
                  placeholder="John Richardson"
                  value={formData.fullName}
                  onChange={(e) => updateField("fullName", e.target.value)}
                  className="rounded-full pl-10 h-11 border-border"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="signupEmail" className="text-sm text-foreground">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="signupEmail"
                  type="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) => updateField("email", e.target.value)}
                  className="rounded-full pl-10 h-11 border-border"
                />
              </div>
            </div>
          </div>

          {/* Row 2: Phone + Account Type */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="phone" className="text-sm text-foreground">Phone (Optional)</Label>
              <div className="relative">
                <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+263 7X XXX XXXX"
                  value={formData.phone}
                  onChange={(e) => updateField("phone", e.target.value)}
                  className="rounded-full pl-10 h-11 border-border"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <Label className="text-sm text-foreground">Account Type</Label>
              <Select value={formData.accountType} onValueChange={(val) => updateField("accountType", val)}>
                <SelectTrigger className="rounded-full h-11 border-border">
                  <SelectValue placeholder="Select account type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="individual">Individual</SelectItem>
                  <SelectItem value="legal">Legal Practitioner</SelectItem>
                  <SelectItem value="financial">Financial Institution</SelectItem>
                  <SelectItem value="government">Government Official</SelectItem>
                  <SelectItem value="corporate">Corporate / Agency</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Row 3: Password + Confirm Password */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="signupPassword" className="text-sm text-foreground">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="signupPassword"
                  type={showPassword ? "text" : "password"}
                  placeholder="Min. 8 characters"
                  value={formData.password}
                  onChange={(e) => updateField("password", e.target.value)}
                  className="rounded-full pl-10 pr-10 h-11 border-border"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="confirmPassword" className="text-sm text-foreground">Confirm Password</Label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={(e) => updateField("confirmPassword", e.target.value)}
                  className="rounded-full pl-10 h-11 border-border"
                />
              </div>
            </div>
          </div>

          <Button
            type="submit"
            className="rounded-full h-11 bg-primary text-primary-foreground hover:bg-primary/90 w-full mt-2"
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <span className="h-4 w-4 rounded-full border-2 border-primary-foreground border-t-transparent animate-spin" />
                Creating account...
              </span>
            ) : (
              "Create Account"
            )}
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link href="/login" className="font-medium text-primary hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  )
}
