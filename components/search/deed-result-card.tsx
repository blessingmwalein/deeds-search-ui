import Link from "next/link"
import { FileText, User, Calendar, MapPin, ArrowRight, Home, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"

interface DeedResultCardProps {
  deed: {
    id: string
    propertyDescription: string
    ownerName: string
    registrationDate: string
    status: string
    processingOffice: string
    propertyType: string
  }
}

export function DeedResultCard({ deed }: DeedResultCardProps) {
  const statusColor = deed.status === "Active"
    ? "bg-[var(--green-main)]/10 text-[var(--green-main)] border-[var(--green-main)]/20"
    : "bg-[var(--secondary-color)]/20 text-[var(--blue-main)] border-[var(--secondary-color)]/30"

  return (
    <div className="group relative overflow-hidden rounded-3xl bg-background border-2 border-border shadow-lg transition-all duration-300 hover:shadow-2xl hover:border-primary/30">
      {/* Header Section with Gradient */}
      <div className="relative bg-gradient-to-br from-[var(--tertiary-color)] to-background p-6 border-b border-border">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 border border-primary/20">
              <FileText className="h-7 w-7 text-primary" />
            </div>
            <div>
              <p className="text-lg font-bold text-foreground font-mono">{deed.id}</p>
              <div className="flex items-center gap-2 mt-1">
                <Home className="h-3.5 w-3.5 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">{deed.propertyType}</p>
              </div>
            </div>
          </div>
          <span className={`inline-flex items-center rounded-full border px-4 py-1.5 text-xs font-semibold ${statusColor}`}>
            {deed.status}
          </span>
        </div>

        <p className="text-base font-medium text-foreground leading-relaxed">
          {deed.propertyDescription}
        </p>
      </div>

      {/* Details Section */}
      <div className="p-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 mb-6">
          <div className="flex items-start gap-3 rounded-xl bg-[var(--tertiary-color)] p-4">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-background shrink-0">
              <User className="h-4 w-4 text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Owner</p>
              <p className="text-sm font-medium text-foreground">{deed.ownerName}</p>
            </div>
          </div>

          <div className="flex items-start gap-3 rounded-xl bg-[var(--tertiary-color)] p-4">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-background shrink-0">
              <Calendar className="h-4 w-4 text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Registered</p>
              <p className="text-sm font-medium text-foreground">
                {new Date(deed.registrationDate).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 rounded-xl bg-[var(--tertiary-color)] p-4 sm:col-span-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-background shrink-0">
              <MapPin className="h-4 w-4 text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Processing Office</p>
              <p className="text-sm font-medium text-foreground">{deed.processingOffice}</p>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <Button
          className="rounded-full h-12 w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold shadow-lg hover:shadow-xl transition-all group"
          asChild
        >
          <Link href={`/deed/${deed.id}`}>
            <Lock className="mr-2 h-4 w-4" />
            View Full Details - $15.00
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Button>
      </div>
    </div>
  )
}
