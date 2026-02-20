import { Navbar } from "@/components/navbar"
import { ForgotPasswordForm } from "@/components/auth/forgot-password-form"

export const metadata = {
  title: "Reset Password - DeedSearch Portal",
  description: "Reset your DeedSearch Portal account password.",
}

export default function ForgotPasswordPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex flex-1 items-center justify-center bg-[var(--tertiary-color)]/30 px-4 py-12">
        <ForgotPasswordForm />
      </main>
    </div>
  )
}
