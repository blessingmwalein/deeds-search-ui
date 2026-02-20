"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard, FileText, Search, CreditCard,
  Crown, Settings, Bell, LogOut, User, ChevronLeft, Menu
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"

const sidebarLinks = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/searches", label: "Saved Searches", icon: Search },
  { href: "/dashboard/transactions", label: "Transactions", icon: CreditCard },
  { href: "/dashboard/deeds", label: "Purchased Deeds", icon: FileText },
  { href: "/dashboard/vip-requests", label: "VIP Requests", icon: Crown },
  { href: "/dashboard/notifications", label: "Notifications", icon: Bell },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
]

function SidebarContent({ collapsed = false }: { collapsed?: boolean }) {
  const pathname = usePathname()
  const router = useRouter()

  const handleSignOut = () => {
    localStorage.removeItem("isLoggedIn")
    router.push("/")
  }

  return (
    <div className="flex flex-col h-full">
      <nav className="flex flex-col gap-1 p-4 flex-1">
        {sidebarLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
              pathname === link.href
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground hover:bg-muted"
            )}
          >
            <link.icon className="h-4 w-4 shrink-0" />
            {!collapsed && <span>{link.label}</span>}
          </Link>
        ))}
      </nav>

      {/* User Section */}
      <div className="border-t border-border p-4">
        <div className="flex items-center gap-3 mb-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-semibold shrink-0">
            JR
          </div>
          {!collapsed && (
            <div className="min-w-0">
              <p className="text-sm font-medium text-foreground truncate">John Richardson</p>
              <p className="text-xs text-muted-foreground truncate">john@example.com</p>
            </div>
          )}
        </div>
        {!collapsed && (
          <Button variant="ghost" className="rounded-xl w-full justify-start text-sm text-muted-foreground hover:text-destructive" onClick={handleSignOut}>
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
          </Button>
        )}
      </div>
    </div>
  )
}

export function DashboardSidebar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <>
      {/* Mobile Trigger */}
      <div className="fixed bottom-4 left-4 z-50 lg:hidden">
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild>
            <Button size="icon" className="rounded-full h-12 w-12 shadow-lg bg-primary text-primary-foreground">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Open sidebar</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-0">
            <SheetTitle className="sr-only">Dashboard Menu</SheetTitle>
            <SidebarContent />
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-64 flex-col border-r border-border bg-background shrink-0">
        <SidebarContent />
      </aside>
    </>
  )
}
