import Link from "next/link"
import { FileText, Mail, Phone, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-[var(--gray-1)] text-white/90">
      <div className="mx-auto max-w-7xl px-4 py-16 lg:px-6">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary">
                <FileText className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="text-lg font-semibold text-white">Deeds Registry</span>
            </div>
            <p className="text-sm text-white/60 leading-relaxed">
              Secure digital access to property title deed information. Modernizing land administration for everyone.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Quick Links</h3>
            <nav className="flex flex-col gap-2">
              {[
                { href: "/search", label: "Search Deeds" },
                { href: "/pricing", label: "Service Plans" },
                { href: "/vip-request", label: "VIP Request" },
                { href: "/dashboard", label: "My Account" },
              ].map((link) => (
                <Link key={link.href} href={link.href} className="text-sm text-white/50 hover:text-white/90 transition-colors">
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Support */}
          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Support</h3>
            <nav className="flex flex-col gap-2">
              {[
                { href: "/help", label: "Help Center" },
                { href: "/faq", label: "FAQ" },
                { href: "/privacy", label: "Privacy Policy" },
                { href: "/terms", label: "Terms of Service" },
              ].map((link) => (
                <Link key={link.href} href={link.href} className="text-sm text-white/50 hover:text-white/90 transition-colors">
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Contact</h3>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2 text-sm text-white/50">
                <Mail className="h-4 w-4 shrink-0" />
                <span>support@deedsearch.gov</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-white/50">
                <Phone className="h-4 w-4 shrink-0" />
                <span>+1 (800) 555-0199</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-white/50">
                <MapPin className="h-4 w-4 shrink-0" />
                <span>Land Administration Office</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
          <p className="text-xs text-white/40">
            &copy; {new Date().getFullYear()} Deeds Registry. All rights reserved.
          </p>
          <p className="text-xs text-white/40">
            Digital Land Administration Platform
          </p>
        </div>
      </div>
    </footer>
  )
}
