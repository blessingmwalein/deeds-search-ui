import Link from "next/link"
import { Search, Eye, Crown, ArrowRight, Check } from "lucide-react"
import { Button } from "@/components/ui/button"

const tiers = [
  {
    icon: Search,
    title: "Basic Search",
    subtitle: "No Account Required",
    price: "$5",
    pricePer: "per search",
    color: "bg-[var(--tertiary-color)]",
    iconBg: "bg-primary/10",
    iconColor: "text-primary",
    features: [
      "Search by Deed Number",
      "Property Description",
      "Owner Name(s)",
      "Registration Date",
      "Deed Status",
      "Processing Office",
    ],
    cta: "Start Searching",
    href: "/search",
    popular: false,
  },
  {
    icon: Eye,
    title: "Detailed View",
    subtitle: "Account Recommended",
    price: "$15",
    pricePer: "per deed",
    color: "bg-primary",
    iconBg: "bg-primary-foreground/20",
    iconColor: "text-primary-foreground",
    features: [
      "Full Deed Information",
      "Ownership History",
      "Encumbrances (if any)",
      "Secure Attachment Viewer",
      "Transaction History",
      "Receipt Generation",
    ],
    cta: "Get Detailed Access",
    href: "/signup",
    popular: true,
  },
  {
    icon: Crown,
    title: "VIP / Restricted",
    subtitle: "Approval Required",
    price: "$50",
    pricePer: "per request",
    color: "bg-[var(--tertiary-color)]",
    iconBg: "bg-[var(--green-main)]/10",
    iconColor: "text-[var(--green-main)]",
    features: [
      "Restricted Records Access",
      "Formal Request Process",
      "Admin Review & Approval",
      "Priority Processing",
      "Supporting Doc Upload",
      "Status Tracking",
    ],
    cta: "Request VIP Access",
    href: "/vip-request",
    popular: false,
  },
]

export function TierCardsSection() {
  return (
    <section className="bg-[var(--tertiary-color)]/50 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 lg:px-6">
        <div className="text-center mb-14">
          <p className="text-sm font-medium uppercase tracking-widest text-[var(--secondary-color)] mb-3">
            Service Plans
          </p>
          <h2 className="text-2xl font-bold text-foreground sm:text-3xl lg:text-4xl text-balance">
            Choose Your Level of Access
          </h2>
          <p className="mt-4 text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Our tiered system ensures you get exactly the information you need, with security and transparency at every level.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 max-w-5xl mx-auto">
          {tiers.map((tier) => (
            <div
              key={tier.title}
              className={`relative flex flex-col rounded-3xl p-7 transition-all duration-200 ${
                tier.popular
                  ? "bg-primary text-primary-foreground shadow-2xl scale-[1.02]"
                  : "bg-background text-foreground shadow-md hover:shadow-lg"
              }`}
            >
              {tier.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[var(--green-main)] px-4 py-1 text-xs font-semibold text-[var(--green-main-foreground,#fff)]">
                  Most Popular
                </span>
              )}

              <div className={`flex h-12 w-12 items-center justify-center rounded-full ${tier.popular ? "bg-primary-foreground/20" : "bg-primary/10"} mb-5`}>
                <tier.icon className={`h-6 w-6 ${tier.popular ? "text-primary-foreground" : "text-primary"}`} />
              </div>

              <h3 className="text-xl font-bold">{tier.title}</h3>
              <p className={`text-sm mt-1 ${tier.popular ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                {tier.subtitle}
              </p>

              <div className="mt-5 mb-6">
                <span className="text-3xl font-bold">{tier.price}</span>
                <span className={`text-sm ml-1 ${tier.popular ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                  {tier.pricePer}
                </span>
              </div>

              <div className="flex flex-col gap-3 flex-1 mb-7">
                {tier.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-2">
                    <Check className={`h-4 w-4 shrink-0 ${tier.popular ? "text-[var(--green-main)]" : "text-[var(--green-main)]"}`} />
                    <span className={`text-sm ${tier.popular ? "text-primary-foreground/90" : "text-foreground"}`}>
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              <Button
                className={`rounded-full w-full ${
                  tier.popular
                    ? "bg-primary-foreground text-primary hover:bg-primary-foreground/90"
                    : "bg-primary text-primary-foreground hover:bg-primary/90"
                }`}
                asChild
              >
                <Link href={tier.href}>
                  {tier.cta}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
