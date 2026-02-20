"use client"

import { Crown, Clock, CheckCircle2, XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const vipRequests = [
  { id: "VIP-001", deedId: "DD-2022-012345", justification: "Legal dispute resolution - court order reference", status: "Approved", submittedDate: "Mar 5, 2024", resolvedDate: "Mar 8, 2024" },
  { id: "VIP-002", deedId: "DD-2021-009876", justification: "Property transfer verification for bank mortgage", status: "Pending", submittedDate: "Mar 12, 2024", resolvedDate: null },
  { id: "VIP-003", deedId: "DD-2020-005432", justification: "Estate settlement - probate proceedings", status: "Denied", submittedDate: "Feb 20, 2024", resolvedDate: "Feb 25, 2024" },
]

const statusConfig = {
  Approved: { icon: CheckCircle2, color: "bg-[var(--green-main)]/10 text-[var(--green-main)]" },
  Pending: { icon: Clock, color: "bg-[var(--gold-main)]/15 text-[var(--gold-main)]" },
  Denied: { icon: XCircle, color: "bg-destructive/10 text-destructive" },
} as const

export default function VipRequestsPage() {
  return (
    <>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-foreground">VIP Requests</h1>
          <p className="mt-1 text-sm text-muted-foreground">Track your restricted record access requests.</p>
        </div>
        <Button className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90" asChild>
          <Link href="/vip-request">
            <Crown className="h-4 w-4 mr-2" />
            New Request
          </Link>
        </Button>
      </div>

      <div className="rounded-2xl bg-background border border-border overflow-hidden">
        <div className="flex flex-col divide-y divide-border">
          {vipRequests.map((req) => {
            const statusInfo = statusConfig[req.status as keyof typeof statusConfig]
            const StatusIcon = statusInfo.icon
            return (
              <div key={req.id} className="p-5 hover:bg-muted/20 transition-colors">
                <div className="flex flex-wrap items-center justify-between gap-4 mb-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--cream-main)] shrink-0">
                      <Crown className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">{req.id}</p>
                      <p className="text-xs text-muted-foreground font-mono">{req.deedId}</p>
                    </div>
                  </div>
                  <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${statusInfo.color}`}>
                    <StatusIcon className="h-3 w-3" />
                    {req.status}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-3">{req.justification}</p>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><Clock className="h-3 w-3" />Submitted: {req.submittedDate}</span>
                  {req.resolvedDate && <span>Resolved: {req.resolvedDate}</span>}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}
