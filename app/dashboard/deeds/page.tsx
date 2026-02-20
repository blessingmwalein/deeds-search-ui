"use client"

import Link from "next/link"
import { FileText, Eye, Calendar, MapPin, User, Building2, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const purchasedDeeds = [
  { id: "DD-2024-001234", property: "Residential Plot, Block 14, Lot 25, Georgetown", owner: "John M. Richardson", date: "Mar 15, 2024", office: "Georgetown Registry", type: "Residential", deedType: "Transport" },
  { id: "DD-2024-001235", property: "Commercial Building, Main Street, Suite 200", owner: "Apex Holdings Ltd.", date: "Feb 28, 2024", office: "Central Registry", type: "Commercial", deedType: "Lease" },
  { id: "DD-2023-008721", property: "Agricultural Land, Region 5, Parcel 42", owner: "Maria S. Fernandez", date: "Nov 10, 2023", office: "Regional Office - East", type: "Agricultural", deedType: "Transport" },
  { id: "DD-2023-005432", property: "Residential Apartment, Tower C, Unit 12B", owner: "David & Sarah Thompson", date: "Aug 22, 2023", office: "Georgetown Registry", type: "Residential", deedType: "Transport" },
]

export default function PurchasedDeedsPage() {
  return (
    <>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">Purchased Deeds</h1>
        <p className="mt-1 text-sm text-muted-foreground">Deeds you have unlocked with detailed access.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {purchasedDeeds.map((deed) => (
          <div key={deed.id} className="rounded-2xl bg-background p-5 border border-border hover:border-primary/20 hover:shadow-md transition-all">
            {/* Header */}
            <div className="flex items-start justify-between gap-3 mb-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--cream-main)] shrink-0">
                  <FileText className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-bold text-foreground font-mono">{deed.id}</p>
                  <p className="text-xs text-muted-foreground">{deed.deedType} Deed</p>
                </div>
              </div>
              <Badge className="rounded-full bg-[var(--green-main)]/10 text-[var(--green-main)] border-0 text-xs px-2.5 py-0.5">
                Active
              </Badge>
            </div>

            {/* Info sub-cards matching deed detail style */}
            <div className="grid grid-cols-2 gap-2 mb-4">
              <div className="flex items-center gap-2.5 rounded-xl bg-[var(--cream-main)]/60 px-3 py-2.5">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10 shrink-0">
                  <Building2 className="h-3.5 w-3.5 text-primary" />
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] text-muted-foreground">Property</p>
                  <p className="text-xs font-medium text-foreground mt-0.5 leading-snug truncate">{deed.property}</p>
                </div>
              </div>
              <div className="flex items-center gap-2.5 rounded-xl bg-[var(--cream-main)]/60 px-3 py-2.5">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10 shrink-0">
                  <User className="h-3.5 w-3.5 text-primary" />
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] text-muted-foreground">Owner</p>
                  <p className="text-xs font-medium text-foreground mt-0.5 truncate">{deed.owner}</p>
                </div>
              </div>
              <div className="flex items-center gap-2.5 rounded-xl bg-[var(--cream-main)]/60 px-3 py-2.5">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10 shrink-0">
                  <Calendar className="h-3.5 w-3.5 text-primary" />
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] text-muted-foreground">Registration Date</p>
                  <p className="text-xs font-medium text-foreground mt-0.5">{deed.date}</p>
                </div>
              </div>
              <div className="flex items-center gap-2.5 rounded-xl bg-[var(--cream-main)]/60 px-3 py-2.5">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10 shrink-0">
                  <MapPin className="h-3.5 w-3.5 text-primary" />
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] text-muted-foreground">Processing Office</p>
                  <p className="text-xs font-medium text-foreground mt-0.5 truncate">{deed.office}</p>
                </div>
              </div>
            </div>

            <Button variant="outline" size="sm" className="rounded-full w-full" asChild>
              <Link href={`/deed/${deed.id}`}>
                <Eye className="h-4 w-4 mr-1" />
                View Details
              </Link>
            </Button>
          </div>
        ))}
      </div>
    </>
  )
}
