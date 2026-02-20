"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import {
  Search, Trash2, Clock, FileText, User, Calendar, MapPin,
  Lock, Building2, History, AlertTriangle, Receipt, Shield,
  Eye, X, ArrowLeft, CreditCard, Smartphone, CheckCircle2
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const savedSearches = [
  { id: 1, query: "DD-2024-001234", date: "Mar 15, 2024", results: 1 },
  { id: 2, query: "Georgetown Residential", date: "Mar 10, 2024", results: 12 },
  { id: 3, query: "Commercial Main Street", date: "Mar 5, 2024", results: 5 },
  { id: 4, query: "DD-2023-008721", date: "Feb 28, 2024", results: 1 },
  { id: 5, query: "Agricultural Region 5", date: "Feb 20, 2024", results: 8 },
  { id: 6, query: "DD-2022-012345", date: "Feb 15, 2024", results: 1 },
]

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

const paymentMethods = [
  { id: "ecocash", name: "EcoCash", icon: Smartphone, color: "bg-[var(--green-main)]", desc: "Pay with EcoCash mobile money" },
  { id: "innbucks", name: "InnBucks", icon: Smartphone, color: "bg-[var(--blue-main)]", desc: "Pay with InnBucks wallet" },
  { id: "visa", name: "Visa", icon: CreditCard, color: "bg-[#1a1f71]", desc: "Pay with Visa card" },
  { id: "mastercard", name: "Mastercard", icon: CreditCard, color: "bg-[#eb001b]", desc: "Pay with Mastercard" },
]

export default function SearchesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [showSearchModal, setShowSearchModal] = useState(false)
  const [activeDeed, setActiveDeed] = useState<string | null>(null)
  const [isUnlocked, setIsUnlocked] = useState(false)
  const searchParams = useSearchParams()

  // Payment flow state
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState<string | null>(null)
  const [paymentStep, setPaymentStep] = useState<"select" | "details" | "processing" | "success">("select")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [cardNumber, setCardNumber] = useState("")
  const [cardName, setCardName] = useState("")
  const [cardExpiry, setCardExpiry] = useState("")
  const [cardCvv, setCardCvv] = useState("")
  const [pendingDeedQuery, setPendingDeedQuery] = useState<string | null>(null)

  // Auto-open deed view if redirected from hero search (already paid)
  useEffect(() => {
    const q = searchParams.get("q")
    if (q) {
      setActiveDeed(q)
    }
  }, [searchParams])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      // Search found a deed — show payment modal
      setPendingDeedQuery(searchQuery.trim())
      setShowSearchModal(false)
      setSearchQuery("")
      setShowPaymentModal(true)
      setPaymentStep("select")
      setPaymentMethod(null)
    }
  }

  const handleSavedSearchClick = (query: string) => {
    // Clicking a saved search also requires payment
    setPendingDeedQuery(query)
    setShowPaymentModal(true)
    setPaymentStep("select")
    setPaymentMethod(null)
  }

  const handleProcessPayment = () => {
    setPaymentStep("processing")
    setTimeout(() => setPaymentStep("success"), 2500)
  }

  const handlePaymentSuccess = () => {
    setShowPaymentModal(false)
    if (pendingDeedQuery) {
      setActiveDeed(pendingDeedQuery)
      setIsUnlocked(true)
      setPendingDeedQuery(null)
    }
    // Reset payment state
    setPaymentStep("select")
    setPaymentMethod(null)
    setPhoneNumber("")
    setCardNumber("")
    setCardName("")
    setCardExpiry("")
    setCardCvv("")
  }

  const closePaymentModal = () => {
    setShowPaymentModal(false)
    setPendingDeedQuery(null)
    setPaymentStep("select")
    setPaymentMethod(null)
  }

  // Payment Modal Content
  const renderPaymentModal = () => {
    if (!showPaymentModal) return null

    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
        <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-background shadow-2xl">
          <button
            onClick={closePaymentModal}
            className="absolute top-4 right-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-muted hover:bg-muted/80 transition-colors"
          >
            <X className="h-4 w-4 text-foreground" />
          </button>

          {paymentStep === "processing" && (
            <div className="p-8 sm:p-12 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[var(--tertiary-color)] mx-auto mb-6">
                <span className="h-8 w-8 rounded-full border-3 border-primary border-t-transparent animate-spin block" />
              </div>
              <h2 className="text-xl font-bold text-foreground">Processing Payment</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                {paymentMethod === "ecocash" || paymentMethod === "innbucks"
                  ? "Check your phone to approve the payment..."
                  : "Securely processing your card payment..."}
              </p>
            </div>
          )}

          {paymentStep === "success" && (
            <div className="p-8 sm:p-12 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[var(--green-main)]/10 mx-auto mb-6">
                <CheckCircle2 className="h-8 w-8 text-[var(--green-main)]" />
              </div>
              <h2 className="text-2xl font-bold text-foreground">Payment Successful</h2>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed max-w-sm mx-auto">
                You now have full access to the deed details.
              </p>

              <div className="mt-6 rounded-2xl bg-[var(--tertiary-color)] p-5 text-left max-w-sm mx-auto">
                <div className="flex flex-col gap-2">
                  {[
                    { label: "Transaction ID", value: "TXN-2024-003421" },
                    { label: "Deed Number", value: pendingDeedQuery || "" },
                    { label: "Amount Paid", value: "$15.00" },
                    { label: "Method", value: paymentMethod?.charAt(0).toUpperCase() + (paymentMethod?.slice(1) || "") },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">{item.label}</span>
                      <span className="text-xs font-medium text-foreground">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                <Button
                  className="rounded-full px-8 bg-primary text-primary-foreground hover:bg-primary/90"
                  onClick={handlePaymentSuccess}
                >
                  <Eye className="mr-2 h-4 w-4" />
                  View Full Deed
                </Button>
                <Button variant="outline" className="rounded-full px-6" onClick={closePaymentModal}>
                  Close
                </Button>
              </div>
            </div>
          )}

          {paymentStep === "details" && paymentMethod && (() => {
            const isMobile = paymentMethod === "ecocash" || paymentMethod === "innbucks"
            return (
              <div className="p-6 sm:p-8">
                <button
                  onClick={() => setPaymentStep("select")}
                  className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors mb-5"
                >
                  <ArrowLeft className="h-3 w-3" />
                  Back to methods
                </button>

                <h2 className="text-lg font-bold text-foreground mb-1">
                  Pay with {paymentMethods.find(m => m.id === paymentMethod)?.name}
                </h2>
                <p className="text-sm text-muted-foreground mb-6">
                  Complete your payment of <span className="font-semibold text-foreground">$15.00</span> for deed access
                </p>

                {isMobile ? (
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-medium text-foreground">Phone Number</label>
                      <Input
                        type="tel"
                        placeholder="07X XXX XXXX"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        className="rounded-full h-11 border-border"
                      />
                    </div>
                    <Button
                      onClick={handleProcessPayment}
                      className="rounded-full h-12 bg-primary text-primary-foreground hover:bg-primary/90 w-full"
                    >
                      <Smartphone className="mr-2 h-4 w-4" />
                      Send Payment Request
                    </Button>
                    <p className="text-xs text-muted-foreground text-center">
                      A payment prompt will be sent to your phone. Approve it to complete the transaction.
                    </p>
                  </div>
                ) : (
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-medium text-foreground">Card Number</label>
                      <div className="relative">
                        <CreditCard className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          type="text"
                          placeholder="1234 5678 9012 3456"
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value)}
                          className="rounded-full pl-10 h-11 border-border"
                          maxLength={19}
                        />
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-medium text-foreground">Cardholder Name</label>
                      <Input
                        type="text"
                        placeholder="Full Name"
                        value={cardName}
                        onChange={(e) => setCardName(e.target.value)}
                        className="rounded-full h-11 border-border"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-foreground">Expiry</label>
                        <Input
                          type="text"
                          placeholder="MM/YY"
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          className="rounded-full h-11 border-border"
                          maxLength={5}
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-foreground">CVV</label>
                        <div className="relative">
                          <Input
                            type="text"
                            placeholder="123"
                            value={cardCvv}
                            onChange={(e) => setCardCvv(e.target.value)}
                            className="rounded-full h-11 border-border"
                            maxLength={4}
                          />
                          <Lock className="absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        </div>
                      </div>
                    </div>
                    <Button
                      onClick={handleProcessPayment}
                      className="rounded-full h-12 bg-primary text-primary-foreground hover:bg-primary/90 w-full mt-1"
                    >
                      <Lock className="mr-2 h-4 w-4" />
                      Pay $15.00
                    </Button>
                    <p className="text-xs text-muted-foreground text-center flex items-center justify-center gap-1">
                      <Lock className="h-3 w-3" />
                      Secured with SSL encryption
                    </p>
                  </div>
                )}
              </div>
            )
          })()}

          {paymentStep === "select" && (
            <div className="p-6 sm:p-8">
              <h2 className="text-lg font-bold text-foreground mb-1">Deed Found — Pay to View</h2>
              <p className="text-sm text-muted-foreground mb-6">
                Select how you would like to pay <span className="font-semibold text-foreground">$15.00</span> for full deed access
              </p>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {paymentMethods.map((method) => (
                  <button
                    key={method.id}
                    onClick={() => {
                      setPaymentMethod(method.id)
                      setPaymentStep("details")
                    }}
                    className="flex items-center gap-4 rounded-2xl border border-border p-4 text-left transition-all hover:border-primary/30 hover:shadow-md group"
                  >
                    <div className={`flex h-11 w-11 items-center justify-center rounded-full ${method.color} shrink-0`}>
                      <method.icon className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">{method.name}</p>
                      <p className="text-xs text-muted-foreground">{method.desc}</p>
                    </div>
                  </button>
                ))}
              </div>

              <div className="mt-6 rounded-2xl bg-[var(--tertiary-color)] p-4">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Deed Access Fee</span>
                  <span className="font-medium text-foreground">$15.00</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Processing Fee</span>
                  <span className="font-medium text-foreground">$0.00</span>
                </div>
                <div className="border-t border-border mt-3 pt-3 flex items-center justify-between">
                  <span className="text-sm font-semibold text-foreground">Total</span>
                  <span className="text-lg font-bold text-foreground">$15.00</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }

  // If viewing a deed result (after payment)
  if (activeDeed) {
    const deed = mockDeed

    return (
      <>
        {/* Back button */}
        <button
          onClick={() => { setActiveDeed(null); setIsUnlocked(false) }}
          className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Searches
        </button>

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
                    onClick={() => {
                      setPendingDeedQuery(activeDeed)
                      setShowPaymentModal(true)
                      setPaymentStep("select")
                      setPaymentMethod(null)
                    }}
                  >
                    <Eye className="mr-2 h-4 w-4" />
                    Pay to View — $15
                  </Button>
                  <Button variant="outline" className="rounded-full px-8" asChild>
                    <Link href="/pricing">View Service Plans</Link>
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="flex flex-col gap-6">
            {/* Quick Actions */}
            <div className="rounded-2xl bg-background p-6 border border-border">
              <h3 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wider">Quick Actions</h3>
              <div className="flex flex-col gap-2">
                <Button variant="outline" className="rounded-full justify-start" disabled={!isUnlocked}>
                  <Receipt className="h-4 w-4 mr-2" />
                  Download Receipt
                </Button>
                <Button variant="outline" className="rounded-full justify-start" asChild>
                  <Link href="/dashboard/vip-requests">
                    <AlertTriangle className="h-4 w-4 mr-2" />
                    Request VIP Access
                  </Link>
                </Button>
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
                {savedSearches.map((search) => (
                  <button
                    key={search.id}
                    onClick={() => handleSavedSearchClick(search.query)}
                    className="w-full flex items-center gap-3 p-3 hover:bg-muted/20 transition-colors text-left"
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
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Floating Search Button */}
        <button
          onClick={() => setShowSearchModal(true)}
          className="fixed bottom-8 right-8 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white shadow-lg hover:bg-primary/90 transition-all hover:scale-105 z-50"
        >
          <Search className="h-6 w-6" />
        </button>

        {/* Search Modal */}
        {showSearchModal && (
          <div className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh]">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowSearchModal(false)} />
            <div className="relative w-full max-w-2xl mx-4 animate-in fade-in slide-in-from-bottom-4 duration-300">
              <div className="rounded-2xl bg-background p-6 shadow-2xl border border-border">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-bold text-foreground">Search Deeds</h2>
                  <button
                    onClick={() => setShowSearchModal(false)}
                    className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-muted transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                <form onSubmit={handleSearch}>
                  <div className="flex items-center gap-0 rounded-full bg-muted/50 p-1.5 border border-border">
                    <div className="flex flex-1 items-center gap-2 px-4">
                      <Search className="h-5 w-5 text-muted-foreground shrink-0" />
                      <Input
                        type="text"
                        placeholder="Enter Deed Number, Property Address, or Owner Name..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="border-0 bg-transparent shadow-none focus-visible:ring-0 text-foreground placeholder:text-muted-foreground"
                        autoFocus
                      />
                    </div>
                    <Button
                      type="submit"
                      className="rounded-full px-6 h-11 bg-primary text-white hover:bg-primary/90 shrink-0"
                    >
                      Search
                    </Button>
                  </div>
                </form>

                <div className="mt-6">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-3">Recent Searches</p>
                  <div className="flex flex-wrap gap-2">
                    {savedSearches.slice(0, 4).map((s) => (
                      <button
                        key={s.id}
                        onClick={() => { setSearchQuery(s.query); }}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-muted/50 border border-border text-sm text-muted-foreground hover:text-foreground hover:border-foreground/20 transition-colors"
                      >
                        <Clock className="h-3 w-3" />
                        {s.query}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Payment Modal */}
        {renderPaymentModal()}
      </>
    )
  }

  // Default: Saved Searches list view
  return (
    <>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground font-serif-display">Saved Searches</h1>
          <p className="mt-1 text-sm text-muted-foreground">Your recent and saved search queries.</p>
        </div>
        <Button
          onClick={() => setShowSearchModal(true)}
          className="rounded-full px-6 bg-primary text-white hover:bg-primary/90"
        >
          <Search className="h-4 w-4 mr-2" />
          New Search
        </Button>
      </div>

      <div className="rounded-2xl bg-background border border-border overflow-hidden">
        <div className="flex flex-col divide-y divide-border">
          {savedSearches.map((search) => (
            <div key={search.id} className="flex items-center gap-4 p-4 hover:bg-muted/20 transition-colors">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--cream-main)] shrink-0">
                <Search className="h-4 w-4 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground font-mono truncate">{search.query}</p>
                <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                  <Clock className="h-3 w-3" />
                  {search.date} | {search.results} result{search.results !== 1 ? "s" : ""}
                </p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-full"
                  onClick={() => handleSavedSearchClick(search.query)}
                >
                  <Search className="h-4 w-4 mr-1" />
                  View
                </Button>
                <Button variant="ghost" size="sm" className="rounded-full text-muted-foreground hover:text-destructive">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Floating Search Button */}
      <button
        onClick={() => setShowSearchModal(true)}
        className="fixed bottom-8 right-8 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white shadow-lg hover:bg-primary/90 transition-all hover:scale-105 z-50"
      >
        <Search className="h-6 w-6" />
      </button>

      {/* Search Modal */}
      {showSearchModal && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh]">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowSearchModal(false)} />
          <div className="relative w-full max-w-2xl mx-4 animate-in fade-in slide-in-from-bottom-4 duration-300">
            <div className="rounded-2xl bg-background p-6 shadow-2xl border border-border">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-foreground">Search Deeds</h2>
                <button
                  onClick={() => setShowSearchModal(false)}
                  className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-muted transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <form onSubmit={handleSearch}>
                <div className="flex items-center gap-0 rounded-full bg-muted/50 p-1.5 border border-border">
                  <div className="flex flex-1 items-center gap-2 px-4">
                    <Search className="h-5 w-5 text-muted-foreground shrink-0" />
                    <Input
                      type="text"
                      placeholder="Enter Deed Number, Property Address, or Owner Name..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="border-0 bg-transparent shadow-none focus-visible:ring-0 text-foreground placeholder:text-muted-foreground"
                      autoFocus
                    />
                  </div>
                  <Button
                    type="submit"
                    className="rounded-full px-6 h-11 bg-primary text-white hover:bg-primary/90 shrink-0"
                  >
                    Search
                  </Button>
                </div>
              </form>

              <div className="mt-6">
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-3">Recent Searches</p>
                <div className="flex flex-wrap gap-2">
                  {savedSearches.slice(0, 4).map((s) => (
                    <button
                      key={s.id}
                      onClick={() => { setSearchQuery(s.query); }}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-muted/50 border border-border text-sm text-muted-foreground hover:text-foreground hover:border-foreground/20 transition-colors"
                    >
                      <Clock className="h-3 w-3" />
                      {s.query}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Payment Modal */}
      {renderPaymentModal()}
    </>
  )
}
