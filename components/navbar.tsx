"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"
import { Menu, X, User, Globe, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"

const baseNavLinks = [
  { href: "/", label: "Home" },
  { href: "/login", label: "Search Deeds", authHref: "/dashboard/searches" },
  { href: "/pricing", label: "Service Plans" },
]

const languages = [
  { code: "en", label: "English" },
  { code: "sn", label: "Shona" },
  { code: "nd", label: "Ndebele" },
]

interface NavbarProps {
  transparent?: boolean
}

export function Navbar({ transparent = false }: NavbarProps) {
  const pathname = usePathname()
  const router = useRouter()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [currentLang, setCurrentLang] = useState("en")
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    setIsLoggedIn(localStorage.getItem("isLoggedIn") === "true")
  }, [])

  const navLinks = baseNavLinks.map((link) => ({
    ...link,
    href: link.authHref && isLoggedIn ? link.authHref : link.href,
  }))

  const handleSignOut = () => {
    localStorage.removeItem("isLoggedIn")
    setIsLoggedIn(false)
    router.push("/")
  }

  useEffect(() => {
    if (!transparent) return
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [transparent])

  const isTransparent = transparent && !scrolled

  return (
    <header
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-300",
        isTransparent
          ? "bg-transparent"
          : "bg-background/95 backdrop-blur-sm border-b border-border "
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 lg:px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5">
          <Image
            src="/images/deeds-logo.svg"
            alt="Deeds Registry"
            width={42}
            height={36}
            className="h-14 w-auto transition-all"
          />
          <div className="flex flex-col leading-none">
            <span className={cn("text-sm font-bold tracking-tight", isTransparent ? "text-white" : "text-foreground")}>
              Deeds
            </span>
            <span className={cn("text-[10px] font-semibold uppercase tracking-widest", isTransparent ? "text-white/70" : "text-muted-foreground")}>
              Registry
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-all",
                  isActive
                    ? isTransparent
                      ? "bg-white/10 border border-white/50 text-white backdrop-blur-sm"
                      : "bg-primary/5 border border-primary text-primary"
                    : isTransparent
                      ? "text-white/70 hover:text-white hover:bg-white/10"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
              >
                {link.label}
              </Link>
            )
          })}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden lg:flex items-center gap-2">
          {/* Language Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className={cn(
                  "rounded-full h-9 px-3 gap-1.5 text-xs font-medium transition-all",
                  isTransparent
                    ? "bg-white/10 text-white hover:bg-white/20"
                    : "bg-muted text-foreground hover:bg-muted/80"
                )}
              >
                <Globe className="h-3.5 w-3.5" />
                {languages.find(l => l.code === currentLang)?.label}
                <ChevronDown className="h-3 w-3 opacity-60" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-36 rounded-xl">
              {languages.map((lang) => (
                <DropdownMenuItem
                  key={lang.code}
                  onClick={() => setCurrentLang(lang.code)}
                  className={cn("cursor-pointer", currentLang === lang.code && "font-semibold text-primary")}
                >
                  {lang.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {isLoggedIn ? (
            /* Logged-in: user name + dashboard link + logout */
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                className={cn(
                  "rounded-full h-9 px-4 gap-2 text-sm font-medium transition-all",
                  isTransparent
                    ? "bg-white/10 text-white hover:bg-white/20"
                    : "bg-primary/10 text-primary hover:bg-primary/20"
                )}
                asChild
              >
                <Link href="/dashboard/settings">
                  <User className="h-4 w-4" />
                  John R.
                </Link>
              </Button>
              <Button
                variant="ghost"
                onClick={handleSignOut}
                className={cn(
                  "rounded-full h-9 px-4 text-sm font-medium transition-all",
                  isTransparent
                    ? "bg-white/10 text-white hover:bg-white/20"
                    : "bg-muted text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                )}
              >
                Logout
              </Button>
            </div>
          ) : (
            /* Auth buttons for guests */
            <>
              <Button
                variant="ghost"
                className={cn(
                  "rounded-full h-9 px-4 text-sm font-medium transition-all",
                  isTransparent
                    ? "bg-white/10 text-white hover:bg-white/20"
                    : "text-foreground hover:bg-muted"
                )}
                asChild
              >
                <Link href="/login">Login</Link>
              </Button>
              <Button
                className={cn(
                  "rounded-full h-9 px-5 text-sm font-semibold transition-all",
                  isTransparent
                    ? "bg-white/10 text-white hover:bg-white/20"
                    : "bg-primary text-primary-foreground hover:bg-primary/90"
                )}
                asChild
              >
                <Link href="/signup">Create Account</Link>
              </Button>
            </>
          )}
        </div>

        {/* Mobile Menu */}
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild className="lg:hidden">
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "rounded-full h-10 w-10",
                isTransparent
                  ? "bg-white/10 text-white hover:bg-white/20"
                  : "bg-muted text-foreground hover:bg-muted/80"
              )}
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Open menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-72 p-0">
            <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between p-4 border-b border-border">
                <div className="flex items-center gap-2">
                  <Image src="/images/deeds-logo.svg" alt="Deeds Registry" width={28} height={24} className="h-6 w-auto" />
                  <span className="text-sm font-bold text-foreground">Deeds Registry</span>
                </div>
                <Button variant="ghost" size="icon" className="rounded-full h-9 w-9" onClick={() => setMobileOpen(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>

              <nav className="flex flex-col gap-1 p-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      "px-4 py-3 rounded-xl text-sm font-medium transition-colors",
                      pathname === link.href
                        ? "border border-primary text-primary bg-primary/5"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>

              {/* Language selector in mobile */}
              <div className="px-4 pb-3">
                <p className="text-xs font-medium text-muted-foreground mb-2 px-1">Language</p>
                <div className="flex gap-1.5">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => setCurrentLang(lang.code)}
                      className={cn(
                        "flex-1 py-2 rounded-lg text-xs font-medium transition-colors",
                        currentLang === lang.code
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground hover:text-foreground"
                      )}
                    >
                      {lang.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-auto p-4 border-t border-border flex flex-col gap-2">
                {isLoggedIn ? (
                  <>
                    <Button className="rounded-full w-full bg-primary text-primary-foreground hover:bg-primary/90" asChild>
                      <Link href="/dashboard" onClick={() => setMobileOpen(false)}>Dashboard</Link>
                    </Button>
                    <Button variant="outline" className="rounded-full w-full text-destructive border-destructive/30 hover:bg-destructive/5" onClick={() => { handleSignOut(); setMobileOpen(false) }}>
                      Sign Out
                    </Button>
                  </>
                ) : (
                  <>
                    <Button className="rounded-full w-full bg-primary text-primary-foreground hover:bg-primary/90" asChild>
                      <Link href="/login" onClick={() => setMobileOpen(false)}>Login</Link>
                    </Button>
                    <Button variant="outline" className="rounded-full w-full" asChild>
                      <Link href="/signup" onClick={() => setMobileOpen(false)}>Create Account</Link>
                    </Button>
                  </>
                )}
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
