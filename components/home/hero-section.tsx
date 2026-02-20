"use client"

import { useState, useEffect } from "react"
import { Search, Eye, Lock, X, CreditCard, Smartphone, CheckCircle2, UserPlus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { useSearchParams, useRouter } from "next/navigation"

export function HeroSection() {
  const [deedNumber, setDeedNumber] = useState("")
  const [showResult, setShowResult] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [showPayment, setShowPayment] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState<string | null>(null)
  const [paymentStep, setPaymentStep] = useState<"select" | "details" | "processing" | "success">("select")
  const [phoneNumber, setPhoneNumber] = useState("")
  const searchParams = useSearchParams()
  const router = useRouter()

  // On mount: check login status and restore pending deed search
  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true"
    setIsLoggedIn(loggedIn)

    const pendingDeed = searchParams.get("deed") || localStorage.getItem("pendingDeed")
    if (loggedIn && pendingDeed) {
      localStorage.removeItem("pendingDeed")
      // Continue with payment flow after login
      setDeedNumber(pendingDeed)
      setShowResult(true)
      setShowPayment(true)
      setPaymentStep("select")
    }
  }, [searchParams])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (deedNumber.trim()) {
      setShowResult(true)
      if (isLoggedIn) {
        // Logged in: go straight to payment
        setShowPayment(true)
        setPaymentStep("select")
      } else {
        // Not logged in: show login/register modal
        setShowPayment(false)
        setPaymentStep("select")
        setPaymentMethod(null)
      }
    }
  }

  const handleLoginRedirect = (path: string) => {
    // Store deed number so the flow can continue after auth
    localStorage.setItem("pendingDeed", deedNumber)
    window.location.href = path
  }

  const handlePayNow = () => {
    setShowPayment(true)
    setPaymentStep("select")
  }

  const handleProcessPayment = () => {
    setPaymentStep("processing")
    setTimeout(() => setPaymentStep("success"), 2500)
  }

  const closeModal = () => {
    setShowResult(false)
    setShowPayment(false)
    setPaymentStep("select")
    setPaymentMethod(null)
  }

  return (
    <>
      <section className="relative overflow-hidden h-[750px] flex items-start">
        {/* Background Image — Victoria Falls */}
        <div className="absolute inset-0">
          <img
            src="/images/IMG_8924.webp"
            alt=""
            className="h-full w-full object-cover"
          />
          {/* Gradient overlay: dark from top fading down */}
          <div className="absolute inset-x-0 top-0 h-[70%] bg-gradient-to-b from-black/70 to-transparent" />
        </div>

        <div className="relative mx-auto w-full max-w-7xl px-2 pt-36 pb-32 lg:px-4">
          <div className="mx-auto max-w-5xl text-center">
            <h1 className="text-3xl font-medium text-white sm:text-4xl lg:text-6xl tracking-tight">
              <span className="block ">Search, Discover</span>
              <span className="block mt-2">and Secure Your Deeds</span>
            </h1>

             <p className="mt-6 text-2xl font-medium sm:text-2xl tracking-wide">
              <span className="text-white/70">Access verified property title deed records</span>
              <span className="text-white/70">  instantly</span>
            </p>

            {/* Search Bar - Centered */}
            <form onSubmit={handleSearch} className="mt-20 mx-auto max-w-xl">
              <div className="flex items-center gap-0 rounded-full bg-white p-1.5 shadow-2xl">
                <div className="flex flex-1 items-center gap-2 px-4">
                  <Search className="h-5 w-5 text-muted-foreground shrink-0" />
                  <Input
                    type="text"
                    placeholder="Enter Deed Number..."
                    value={deedNumber}
                    onChange={(e) => setDeedNumber(e.target.value)}
                    className="border-0 bg-transparent shadow-none focus-visible:ring-0 text-foreground placeholder:text-muted-foreground"
                  />
                </div>
                <Button
                  type="submit"
                  className="rounded-full px-6 sm:px-8 h-11 bg-primary text-white hover:bg-primary/90 shrink-0"
                >
                  <Search className="h-4 w-4 sm:mr-2" />
                  <span className="hidden sm:inline">Search</span>
                </Button>
              </div>
            </form>

           
          </div>
        </div>
      </section>

      {/* Deed Result Modal */}
      {showResult && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-background shadow-2xl">
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-muted hover:bg-muted/80 transition-colors"
            >
              <X className="h-4 w-4 text-foreground" />
            </button>

            {!showPayment ? (
              <div className="p-6 sm:p-8">
                {/* Blurred Deed Preview */}
                <div className="relative rounded-2xl border border-border overflow-hidden">
                  <div className="select-none pointer-events-none blur-lg opacity-50">
                    <div className="p-5 bg-[var(--tertiary-color)]/50">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Deed of Transfer</span>
                        <span className="inline-flex items-center rounded-full bg-[var(--green-main)]/10 px-3 py-1 text-xs font-medium text-[var(--green-main)]">
                          Active
                        </span>
                      </div>
                      <p className="text-sm font-medium text-foreground">Residential Property</p>
                      <p className="text-xs text-muted-foreground mt-1">Deeds Registry Office</p>
                    </div>
                    <div className="p-5 flex flex-col gap-3">
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Property Description</p>
                        <p className="text-sm text-foreground">Stand XXXX, Township Name, Measuring XXXX Square Meters</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Registered Owner</p>
                        <p className="text-sm text-foreground">J***n M. R********n</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Encumbrances</p>
                        <p className="text-sm text-foreground">Bond registered in favour of *** Bank</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Registration Date</p>
                        <p className="text-sm text-foreground">XXXX-XX-XX</p>
                      </div>
                    </div>
                  </div>

                  {/* Lock overlay */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/50 backdrop-blur-[2px]">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-4 ring-4 ring-primary/5">
                      <Lock className="h-7 w-7 text-primary" />
                    </div>
                    <p className="text-base font-semibold text-foreground">Deed Details Protected</p>
                    <p className="text-sm text-muted-foreground mt-1.5 text-center max-w-xs">
                      {isLoggedIn
                        ? "Pay to unlock and view full deed information"
                        : "Sign in or create an account to access full deed information"}
                    </p>
                  </div>
                </div>

                {/* Action Buttons - different for logged in vs not */}
                {isLoggedIn ? (
                  <div className="mt-8 flex flex-col gap-3">
                    <Button
                      onClick={handlePayNow}
                      className="rounded-full h-13 w-full text-sm font-semibold bg-primary text-primary-foreground shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 hover:bg-primary/90 transition-all duration-200"
                    >
                      <Eye className="mr-2 h-4 w-4" />
                      Pay to View - $15.00
                    </Button>
                    <p className="mt-1 text-xs text-muted-foreground text-center">
                      <Lock className="inline h-3 w-3 mr-1 -mt-0.5" />
                      Secure payment &middot; Instant access after payment
                    </p>
                  </div>
                ) : (
                  <div className="mt-8 flex flex-col gap-3">
                    <Button
                      onClick={() => handleLoginRedirect("/login")}
                      className="rounded-full h-13 w-full text-sm font-semibold bg-primary text-primary-foreground shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 hover:bg-primary/90 transition-all duration-200"
                    >
                      <Eye className="mr-2 h-4 w-4" />
                      Login & Pay to View
                    </Button>
                    <Button
                      onClick={() => handleLoginRedirect("/signup")}
                      variant="outline"
                      className="rounded-full h-13 w-full text-sm font-semibold border-2 border-primary/20 hover:border-primary/40 hover:bg-primary/5 transition-all duration-200"
                    >
                      <UserPlus className="mr-2 h-4 w-4" />
                      Register to View
                    </Button>
                    <p className="mt-1 text-xs text-muted-foreground text-center">
                      <Lock className="inline h-3 w-3 mr-1 -mt-0.5" />
                      Secure access &middot; Pay only $15.00 per deed
                    </p>
                  </div>
                )}
              </div>
            ) : (
              /* Payment Flow Inside Modal */
              <PaymentFlow
                paymentStep={paymentStep}
                paymentMethod={paymentMethod}
                setPaymentMethod={setPaymentMethod}
                setPaymentStep={setPaymentStep}
                handleProcessPayment={handleProcessPayment}
                phoneNumber={phoneNumber}
                setPhoneNumber={setPhoneNumber}
                deedId={deedNumber}
                closeModal={closeModal}
              />
            )}
          </div>
        </div>
      )}
    </>
  )
}

function PaymentFlow({
  paymentStep,
  paymentMethod,
  setPaymentMethod,
  setPaymentStep,
  handleProcessPayment,
  phoneNumber,
  setPhoneNumber,
  deedId,
  closeModal,
}: {
  paymentStep: string
  paymentMethod: string | null
  setPaymentMethod: (m: string) => void
  setPaymentStep: (s: "select" | "details" | "processing" | "success") => void
  handleProcessPayment: () => void
  phoneNumber: string
  setPhoneNumber: (v: string) => void
  deedId: string
  closeModal: () => void
}) {
  const [cardNumber, setCardNumber] = useState("")
  const [cardName, setCardName] = useState("")
  const [cardExpiry, setCardExpiry] = useState("")
  const [cardCvv, setCardCvv] = useState("")

  const paymentMethods = [
    { id: "ecocash", name: "EcoCash", icon: Smartphone, color: "bg-[var(--green-main)]", desc: "Pay with EcoCash mobile money" },
    { id: "innbucks", name: "InnBucks", icon: Smartphone, color: "bg-[var(--blue-main)]", desc: "Pay with InnBucks wallet" },
    { id: "visa", name: "Visa", icon: CreditCard, color: "bg-[#1a1f71]", desc: "Pay with Visa card" },
    { id: "mastercard", name: "Mastercard", icon: CreditCard, color: "bg-[#eb001b]", desc: "Pay with Mastercard" },
  ]

  if (paymentStep === "processing") {
    return (
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
    )
  }

  if (paymentStep === "success") {
    return (
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
              { label: "Deed Number", value: deedId },
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
          <Button className="rounded-full px-8 bg-primary text-primary-foreground hover:bg-primary/90" asChild>
            <Link href={`/dashboard/searches?q=${encodeURIComponent(deedId)}`}>
              <Eye className="mr-2 h-4 w-4" />
              View Full Deed
            </Link>
          </Button>
          <Button variant="outline" className="rounded-full px-6" onClick={closeModal}>
            Close
          </Button>
        </div>
      </div>
    )
  }

  if (paymentStep === "details" && paymentMethod) {
    const isMobile = paymentMethod === "ecocash" || paymentMethod === "innbucks"

    return (
      <div className="p-6 sm:p-8">
        <button
          onClick={() => setPaymentStep("select")}
          className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors mb-5"
        >
          <X className="h-3 w-3" />
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
                placeholder={paymentMethod === "ecocash" ? "07X XXX XXXX" : "07X XXX XXXX"}
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
  }

  // Payment method selection
  return (
    <div className="p-6 sm:p-8">
      <h2 className="text-lg font-bold text-foreground mb-1">Choose Payment Method</h2>
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
  )
}
