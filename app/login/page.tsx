import { Navbar } from "@/components/navbar"
import { LoginForm } from "@/components/auth/login-form"

export const metadata = {
  title: "Sign In - DeedSearch Portal",
  description: "Sign in to your DeedSearch Portal account.",
}

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex flex-1 items-center justify-center bg-[var(--tertiary-color)]/30 px-4 py-12">
        <LoginForm />
      </main>
    </div>
  )
}
