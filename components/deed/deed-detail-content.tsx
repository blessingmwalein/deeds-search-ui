"use client"

import { useState } from "react"
import Link from "next/link"
import {
  FileText, User, Calendar, MapPin, ArrowLeft, Lock, Download,
  Eye, Building2, History, AlertTriangle, Receipt, Shield, ChevronRight,
  Search, Clock
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

interface DeedDetailContentProps {
  deedId: string
}

const mockDeed = {
  id: "DD-2024-001234",
  propertyDescription: "Residential Plot, Block 14, Lot 25, Georgetown",
  ownerName: "John M. Richardson",
  registrationDate: "2024-03-15",
  status: "Active",
  processingOffice: "Georgetown Registry",
  propertyType: "Residential",
  fullAddress: "Block 14, Lot 25, Georgetown East Coast Demerara",
  landSize: "1,200 sq. ft.",
  deedType: "Transport",
  registrationNumber: "REG-2024-003421",
  previousOwner: "Patricia A. Williams",
  transferDate: "2024-03-15",
  encumbrances: "None",
  attachments: [
    { name: "Transport Document.pdf", size: "2.4 MB", type: "PDF" },
    { name: "Survey Plan.pdf", size: "1.8 MB", type: "PDF" },
    { name: "Site Map.png", size: "560 KB", type: "Image" },
  ],
  ownershipHistory: [
    { owner: "John M. Richardson", from: "2024-03-15", to: "Present", type: "Transport" },
    { owner: "Patricia A. Williams", from: "2018-06-22", to: "2024-03-15", type: "Transport" },
    { owner: "Georgetown Estates Ltd.", from: "2010-01-10", to: "2018-06-22", type: "Lease" },
  ],
}

export function DeedDetailContent({ deedId }: DeedDetailContentProps) {
  const [isUnlocked, setIsUnlocked] = useState(false)
  const deed = mockDeed

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 lg:px-6">
      {/* Breadcrumb */}
      <div className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/search" className="flex items-center gap-1 hover:text-foreground transition-colors">
          <ArrowLeft className="h-4 w-4" />
          Back to Results
        </Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-foreground font-medium">{deedId}</span>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          {/* Header Card */}
          <div className="rounded-2xl bg-background p-6 border border-border">
            <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--cream-main)]">
                    <FileText className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h1 className="text-xl font-bold text-foreground sm:text-2xl font-mono">{deed.id}</h1>
                    <p className="text-sm text-muted-foreground">{deed.deedType} Deed</p>
                  </div>
                </div>
              </div>
              <Badge className="rounded-full bg-[var(--green-main)]/10 text-[var(--green-main)] hover:bg-[var(--green-main)]/20 border-0 px-4 py-1">
                {deed.status}
              </Badge>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {[
                { icon: Building2, label: "Property", value: deed.propertyDescription },
                { icon: User, label: "Owner", value: deed.ownerName },
                { icon: Calendar, label: "Registration Date", value: new Date(deed.registrationDate).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }) },
                { icon: MapPin, label: "Processing Office", value: deed.processingOffice },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-3 rounded-xl bg-[var(--cream-main)]/60 px-4 py-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 shrink-0">
                    <item.icon className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-[11px] text-muted-foreground">{item.label}</p>
                    <p className="text-sm font-medium text-foreground">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tabs for Detailed Info */}
          {isUnlocked ? (
            <div className="rounded-2xl bg-background border border-border overflow-hidden">
              <Tabs defaultValue="details" className="w-full">
                <TabsList className="w-full rounded-none border-b border-border bg-transparent h-12 p-0">
                  <TabsTrigger value="details" className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none h-full px-6 text-sm">
                    Full Details
                  </TabsTrigger>
                  <TabsTrigger value="history" className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none h-full px-6 text-sm">
                    Ownership History
                  </TabsTrigger>
                  <TabsTrigger value="attachments" className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none h-full px-6 text-sm">
                    Attachments
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="details" className="p-6">
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    {[
                      { label: "Full Address", value: deed.fullAddress },
                      { label: "Land Size", value: deed.landSize },
                      { label: "Deed Type", value: deed.deedType },
                      { label: "Registration #", value: deed.registrationNumber },
                      { label: "Property Type", value: deed.propertyType },
                      { label: "Encumbrances", value: deed.encumbrances },
                    ].map((item) => (
                      <div key={item.label} className="flex flex-col gap-1">
                        <p className="text-xs text-muted-foreground uppercase tracking-wider">{item.label}</p>
                        <p className="text-sm font-medium text-foreground">{item.value}</p>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="history" className="p-6">
                  <div className="flex flex-col divide-y divide-border">
                    {deed.ownershipHistory.map((entry, index) => (
                      <div key={index} className="flex items-start gap-4 py-4 first:pt-0 last:pb-0">
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--cream-main)] shrink-0">
                          <History className="h-4 w-4 text-primary" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-foreground">{entry.owner}</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {entry.from} — {entry.to} | {entry.type}
                          </p>
                        </div>
                        {index === 0 && (
                          <Badge className="rounded-full bg-[var(--green-main)]/10 text-[var(--green-main)] border-0 text-xs">
                            Current
                          </Badge>
                        )}
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="attachments" className="p-6">
                  <div className="mb-4 flex items-center gap-2 rounded-xl border border-primary/20 bg-primary/5 p-4 text-sm text-primary">
                    <Shield className="h-4 w-4 shrink-0" />
                    <span>Documents are watermarked and view-only for security compliance.</span>
                  </div>
                  <div className="flex flex-col divide-y divide-border">
                    {deed.attachments.map((att) => (
                      <div key={att.name} className="flex items-center justify-between py-4 first:pt-0 last:pb-0">
                        <div className="flex items-center gap-3">
                          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--cream-main)]">
                            <FileText className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-foreground">{att.name}</p>
                            <p className="text-xs text-muted-foreground">{att.size} | {att.type}</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm" className="rounded-full">
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          ) : (
            <div className="rounded-2xl bg-background p-8 sm:p-12 border border-border text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[var(--cream-main)] mx-auto mb-5">
                <Lock className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-lg font-bold text-foreground">Detailed Information Locked</h3>
              <p className="mt-2 text-sm text-muted-foreground max-w-md mx-auto leading-relaxed">
                To view full deed details, ownership history, and attachments, a fee-based access payment is required.
              </p>
              <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                <Button
                  className="rounded-full px-8 bg-primary text-primary-foreground hover:bg-primary/90"
                  onClick={() => setIsUnlocked(true)}
                >
                  Unlock Full Details — $15
                </Button>
                <Button variant="outline" className="rounded-full px-8" asChild>
                  <Link href="/pricing">View Service Plans</Link>
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar - stretch to fill height */}
        <div className="flex flex-col gap-6 lg:row-span-2">
          {/* Quick Actions */}
          <div className="rounded-2xl bg-background p-6 border border-border">
            <h3 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wider">Quick Actions</h3>
            <div className="flex flex-col gap-2">
              <Button variant="outline" className="rounded-full justify-start" disabled={!isUnlocked}>
                <Receipt className="h-4 w-4 mr-2" />
                Download Receipt
              </Button>
              <Button variant="outline" className="rounded-full justify-start" asChild>
                <Link href="/vip-request">
                  <AlertTriangle className="h-4 w-4 mr-2" />
                  Request VIP Access
                </Link>
              </Button>
              {/* <Button variant="outline" className="rounded-full justify-start" asChild>
                <Link href="/search">
                  <FileText className="h-4 w-4 mr-2" />
                  New Search
                </Link>
              </Button> */}
            </div>
          </div>

          {/* Security Notice */}
          <div className="flex items-center gap-3 rounded-xl border border-primary/20 bg-primary/5 p-4 text-sm">
            <Shield className="h-4 w-4 text-primary shrink-0" />
            <p className="text-xs text-muted-foreground leading-relaxed">
              All data is protected with SSL encryption, role-based access control, and full audit trail logging.
            </p>
          </div>

          {/* Saved Searches Widget */}
          <div className="rounded-2xl bg-background border border-border overflow-hidden">
            <div className="p-4 border-b border-border">
              <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">Saved Searches</h3>
              <p className="text-xs text-muted-foreground mt-0.5">Your recent and saved search queries.</p>
            </div>
            <div className="max-h-[240px] overflow-y-auto divide-y divide-border">
              {[
                { query: "DD-2024-001234", date: "Mar 15, 2024" },
                { query: "Georgetown Residential", date: "Mar 10, 2024" },
                { query: "Commercial Main Street", date: "Mar 5, 2024" },
                { query: "DD-2023-008721", date: "Feb 28, 2024" },
                { query: "Agricultural Region 5", date: "Feb 20, 2024" },
              ].map((search) => (
                <Link
                  key={search.query}
                  href={`/dashboard/searches`}
                  className="flex items-center gap-3 p-3 hover:bg-muted/20 transition-colors"
                >
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[var(--cream-main)] shrink-0">
                    <Search className="h-3.5 w-3.5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground font-mono truncate">{search.query}</p>
                    <p className="text-[11px] text-muted-foreground flex items-center gap-1">
                      <Clock className="h-2.5 w-2.5" />
                      {search.date}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
