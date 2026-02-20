import { Navbar } from "@/components/navbar"
import { SignupForm } from "@/components/auth/signup-form"

export const metadata = {
  title: "Create Account - Deeds Registry",
  description: "Create your Deeds Registry account for detailed deed access.",
}

export default function SignupPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex flex-1 items-center justify-center bg-[var(--tertiary-color)]/30 mt-10 px-4 py-12">
        <SignupForm />
      </main>
    </div>
  )
}
