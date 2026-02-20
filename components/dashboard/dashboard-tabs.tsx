"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard, FileText, Search, CreditCard, Crown
} from "lucide-react"
import { cn } from "@/lib/utils"

const tabs = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/deeds", label: "Deeds", icon: FileText },
  { href: "/dashboard/searches", label: "Searches", icon: Search },
  { href: "/dashboard/transactions", label: "Transactions", icon: CreditCard },
  { href: "/dashboard/vip-requests", label: "VIP Request", icon: Crown },
]

export function DashboardTabs() {
  const pathname = usePathname()

  return (
    <div className="sticky top-16 z-40 bg-[var(--tertiary-color)]/30 backdrop-blur-md">
      <nav className="mx-auto max-w-5xl flex items-center justify-center flex-wrap gap-1.5 px-6 py-3">
        {tabs.map((tab) => {
          const isActive = tab.href === "/dashboard"
            ? pathname === tab.href
            : pathname.startsWith(tab.href)
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={cn(
                "flex items-center gap-2 pl-1.5 pr-4 py-1.5 rounded-full text-sm font-semibold tracking-wide transition-all",
                isActive
                  ? "bg-[var(--gray-1)] text-white shadow-md"
                  : "bg-background text-muted-foreground border border-border hover:border-[var(--gray-1)]/20 hover:shadow-sm"
              )}
            >
              <span
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-xl transition-all shrink-0",
                  isActive
                    ? "bg-white/20 text-white"
                    : "bg-[var(--cream-main)] text-[var(--gray-1)]"
                )}
              >
                <tab.icon className="h-4 w-4" />
              </span>
              {tab.label}
            </Link>
          )
        })}
      </nav>
    </div>
  )
}
