"use client"

import { useState } from "react"
import Link from "next/link"
import {
  CreditCard, Lock, CheckCircle2, ArrowLeft, Shield,
  FileText, Receipt, ArrowRight
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function PaymentContent() {
  const [step, setStep] = useState<"form" | "processing" | "success">("form")
  const [paymentMethod, setPaymentMethod] = useState<"card" | "subscription">("card")
  const [cardData, setCardData] = useState({
    number: "",
    name: "",
    expiry: "",
    cvv: "",
  })

  const updateField = (field: string, value: string) => {
    setCardData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setStep("processing")
    setTimeout(() => setStep("success"), 2000)
  }

  if (step === "processing") {
    return (
      <div className="mx-auto max-w-lg px-4 py-20 lg:px-6">
        <div className="rounded-3xl bg-background p-12 shadow-sm border border-border text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[var(--tertiary-color)] mx-auto mb-6">
            <span className="h-8 w-8 rounded-full border-3 border-primary border-t-transparent animate-spin" />
          </div>
          <h2 className="text-xl font-bold text-foreground">Processing Payment</h2>
          <p className="mt-2 text-sm text-muted-foreground">Please wait while we securely process your payment...</p>
        </div>
      </div>
    )
  }

  if (step === "success") {
    return (
      <div className="mx-auto max-w-lg px-4 py-20 lg:px-6">
        <div className="rounded-3xl bg-background p-10 sm:p-12 shadow-sm border border-border text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[var(--green-main)]/10 mx-auto mb-6">
            <CheckCircle2 className="h-8 w-8 text-[var(--green-main)]" />
          </div>
          <h2 className="text-2xl font-bold text-foreground">Payment Successful</h2>
          <p className="mt-3 text-sm text-muted-foreground leading-relaxed max-w-sm mx-auto">
            Your payment has been processed successfully. You now have access to the detailed deed information.
          </p>

          <div className="mt-8 rounded-2xl bg-[var(--tertiary-color)] p-5 text-left">
            <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold mb-3">Transaction Summary</p>
            <div className="flex flex-col gap-2.5">
              {[
                { label: "Transaction ID", value: "TXN-2024-003421" },
                { label: "Deed Number", value: "DD-2024-001234" },
                { label: "Access Level", value: "Detailed View" },
                { label: "Amount Paid", value: "$15.00" },
                { label: "Date", value: new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }) },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">{item.label}</span>
                  <span className="text-sm font-medium text-foreground">{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Button className="rounded-full px-8 bg-primary text-primary-foreground hover:bg-primary/90" asChild>
              <Link href="/deed/DD-2024-001234">
                View Deed Details
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" className="rounded-full px-6">
              <Receipt className="mr-2 h-4 w-4" />
              Download Receipt
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 lg:px-6">
      <Link href="/search" className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6">
        <ArrowLeft className="h-4 w-4" />
        Back
      </Link>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
        {/* Payment Form */}
        <div className="lg:col-span-3">
          <div className="rounded-3xl bg-background p-6 sm:p-8 shadow-sm border border-border">
            <h1 className="text-xl font-bold text-foreground mb-6">Payment Details</h1>

            {/* Payment Method Toggle */}
            <div className="flex items-center gap-2 mb-6 p-1 rounded-full bg-[var(--tertiary-color)]">
              <button
                onClick={() => setPaymentMethod("card")}
                className={`flex-1 rounded-full py-2.5 text-sm font-medium transition-colors ${
                  paymentMethod === "card"
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Credit / Debit Card
              </button>
              <button
                onClick={() => setPaymentMethod("subscription")}
                className={`flex-1 rounded-full py-2.5 text-sm font-medium transition-colors ${
                  paymentMethod === "subscription"
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Subscription Plan
              </button>
            </div>

            {paymentMethod === "card" ? (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="cardNumber" className="text-sm text-foreground">Card Number</Label>
                  <div className="relative">
                    <CreditCard className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="cardNumber"
                      type="text"
                      placeholder="1234 5678 9012 3456"
                      value={cardData.number}
                      onChange={(e) => updateField("number", e.target.value)}
                      className="rounded-full pl-10 h-11 border-border"
                      maxLength={19}
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <Label htmlFor="cardName" className="text-sm text-foreground">Cardholder Name</Label>
                  <Input
                    id="cardName"
                    type="text"
                    placeholder="John Richardson"
                    value={cardData.name}
                    onChange={(e) => updateField("name", e.target.value)}
                    className="rounded-full h-11 border-border"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="expiry" className="text-sm text-foreground">Expiry Date</Label>
                    <Input
                      id="expiry"
                      type="text"
                      placeholder="MM/YY"
                      value={cardData.expiry}
                      onChange={(e) => updateField("expiry", e.target.value)}
                      className="rounded-full h-11 border-border"
                      maxLength={5}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="cvv" className="text-sm text-foreground">CVV</Label>
                    <div className="relative">
                      <Input
                        id="cvv"
                        type="text"
                        placeholder="123"
                        value={cardData.cvv}
                        onChange={(e) => updateField("cvv", e.target.value)}
                        className="rounded-full h-11 border-border"
                        maxLength={4}
                      />
                      <Lock className="absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    </div>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="rounded-full h-12 bg-primary text-primary-foreground hover:bg-primary/90 w-full mt-2 text-base"
                >
                  <Lock className="mr-2 h-4 w-4" />
                  Pay $15.00
                </Button>

                <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                  <Shield className="h-3.5 w-3.5" />
                  <span>Secured with SSL encryption</span>
                </div>
              </form>
            ) : (
              <div className="flex flex-col gap-4">
                {[
                  { name: "Basic Plan", price: "$29/mo", desc: "10 basic searches per month", features: ["Basic deed information", "Email receipts", "Search history"] },
                  { name: "Professional", price: "$79/mo", desc: "Unlimited basic + 20 detailed views", features: ["Full deed details", "Ownership history", "Priority support"], popular: true },
                  { name: "Corporate", price: "$199/mo", desc: "Unlimited access + VIP processing", features: ["Everything in Professional", "VIP record access", "Dedicated account manager"] },
                ].map((plan) => (
                  <div
                    key={plan.name}
                    className={`flex items-center justify-between rounded-2xl p-5 border transition-colors cursor-pointer ${
                      plan.popular
                        ? "border-primary bg-primary/5"
                        : "border-border bg-background hover:border-primary/20"
                    }`}
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-semibold text-foreground">{plan.name}</p>
                        {plan.popular && (
                          <span className="rounded-full bg-primary px-2.5 py-0.5 text-[10px] font-semibold text-primary-foreground">
                            Popular
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5">{plan.desc}</p>
                    </div>
                    <p className="text-lg font-bold text-foreground ml-4">{plan.price}</p>
                  </div>
                ))}
                <Button className="rounded-full h-12 bg-primary text-primary-foreground hover:bg-primary/90 w-full mt-2 text-base">
                  Subscribe Now
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-2">
          <div className="rounded-3xl bg-background p-6 shadow-sm border border-border sticky top-24">
            <h2 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-5">Order Summary</h2>

            <div className="flex items-center gap-3 rounded-2xl bg-[var(--tertiary-color)] p-4 mb-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 shrink-0">
                <FileText className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">Detailed Deed View</p>
                <p className="text-xs text-muted-foreground font-mono">DD-2024-001234</p>
              </div>
            </div>

            <div className="flex flex-col gap-2.5 mb-5">
              {[
                { label: "Deed Access Fee", value: "$15.00" },
                { label: "Processing Fee", value: "$0.00" },
                { label: "Tax", value: "$0.00" },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{item.label}</span>
                  <span className="text-foreground">{item.value}</span>
                </div>
              ))}
            </div>

            <div className="border-t border-border pt-3 flex items-center justify-between">
              <span className="text-sm font-semibold text-foreground">Total</span>
              <span className="text-lg font-bold text-foreground">$15.00</span>
            </div>

            <div className="mt-5 rounded-2xl bg-[var(--tertiary-color)] p-4">
              <p className="text-xs text-muted-foreground leading-relaxed">
                By completing this payment you agree to our Terms of Service. All transactions are non-refundable. Access is granted immediately upon payment confirmation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
