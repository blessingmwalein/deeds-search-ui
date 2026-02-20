import { Shield, Zap, FileSearch, CreditCard, Lock, Globe } from "lucide-react"

const features = [
  {
    icon: FileSearch,
    title: "Instant Deed Search",
    description: "Search property title deeds by deed number or address with real-time results and comprehensive information.",
  },
  {
    icon: Shield,
    title: "Secure Access Control",
    description: "Role-based access with encrypted communication, ensuring your data is protected at every step.",
  },
  {
    icon: CreditCard,
    title: "Integrated Payments",
    description: "Seamless payment processing for deed access with multiple payment options and instant receipts.",
  },
  {
    icon: Zap,
    title: "Fast Processing",
    description: "Lightning-fast search results with optimized queries and cloud-based infrastructure for 99.9% uptime.",
  },
  {
    icon: Lock,
    title: "Document Security",
    description: "Watermarked attachments, non-downloadable secure viewer, and full audit trail for compliance.",
  },
  {
    icon: Globe,
    title: "24/7 Availability",
    description: "Access deed information anytime, anywhere. Our cloud infrastructure ensures round-the-clock availability.",
  },
]

export function FeaturesSection() {
  return (
    <section className="bg-background py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 lg:px-6">
        <div className="text-center mb-14">
          <p className="text-sm font-medium uppercase tracking-widest text-[var(--secondary-color)] mb-3">
            Best Features
          </p>
          <h2 className="text-2xl font-bold text-foreground sm:text-3xl lg:text-4xl text-balance">
            Top Features That Elevate Your Experience
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className={`group flex flex-col rounded-3xl p-7 transition-all duration-200 hover:shadow-lg ${
                index % 3 === 0
                  ? "bg-[var(--tertiary-color)]"
                  : index % 3 === 1
                  ? "bg-background border border-border"
                  : "bg-[var(--tertiary-color)]"
              }`}
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-5 group-hover:bg-primary/20 transition-colors">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">{feature.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
