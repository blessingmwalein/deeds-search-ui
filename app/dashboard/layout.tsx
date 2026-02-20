import { Navbar } from "@/components/navbar"
import { DashboardTabs } from "@/components/dashboard/dashboard-tabs"

export const metadata = {
  title: "Dashboard - Deeds Registry",
  description: "Manage your account, view transactions, and track deed access.",
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col pt-16">
      <Navbar />
      <DashboardTabs />
      <main className="flex-1 bg-[var(--tertiary-color)]/30">
        <div className="mx-auto max-w-5xl px-4 py-6 sm:py-8">
          {children}
        </div>
      </main>
    </div>
  )
}
