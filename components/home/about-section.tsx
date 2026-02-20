import { CheckCircle2, Users, Building2, ShieldCheck } from "lucide-react"

export function AboutSection() {
  return (
    <section className="bg-background py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 lg:px-6">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 items-start">
          {/* Left Text */}
          <div>
            <p className="text-sm font-medium uppercase tracking-widest text-[var(--secondary-color)] mb-4">
              About the Portal
            </p>
            {/* <h2 className="text-2xl font-bold text-foreground sm:text-3xl lg:text-4xl leading-tight text-balance">
              A next-generation digital portal for{" "}
              <span className="text-primary">secure property deed access</span>{" "}
              and transparent land administration.
            </h2> */}
            <p className="mt-6 text-base text-muted-foreground leading-relaxed">
              The Customer Service Portal provides structured, secure, and fee-based digital access to property title deed information for the general public, government officials, legal practitioners, and financial institutions.
            </p>

            <div className="mt-8 flex flex-col gap-4">
              {[
                "Improved service delivery efficiency",
                "Enhanced public access to property records",
                "Strengthened data governance and security",
                "Sustainable revenue generation",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[var(--green-main)]/10">
                    <CheckCircle2 className="h-4 w-4 text-[var(--green-main)]" />
                  </div>
                  <span className="text-sm text-foreground">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Stats */}
          <div className="flex flex-col gap-6">
            {/* <div className="rounded-2xl bg-[var(--tertiary-color)] p-8">
              <p className="text-4xl font-bold text-[var(--green-main)]">6+ Years</p>
              <p className="mt-1 text-lg font-semibold text-foreground">Digital Administration</p>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                Successfully digitizing land administration processes with enhanced security and public transparency.
              </p>
            </div> */}
            <div className="rounded-2xl bg-[var(--tertiary-color)] p-8">
              <p className="text-4xl font-bold text-[var(--green-main)]">50,000+</p>
              <p className="mt-1 text-lg font-semibold text-foreground">Records Digitized</p>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                Comprehensive digitization of property deed records ensuring accurate and accessible information for all stakeholders.
              </p>
            </div>

            {/* Feature Pills */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {[
                { icon: Users, label: "User-Focused", desc: "Intuitive experiences for all users" },
                { icon: Building2, label: "Transparent", desc: "Open and accountable processes" },
                { icon: ShieldCheck, label: "Secure", desc: "Enterprise-grade data protection" },
              ].map((feature) => (
                <div key={feature.label} className="rounded-2xl bg-[var(--tertiary-color)] p-5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 mb-3">
                    <feature.icon className="h-5 w-5 text-primary" />
                  </div>
                  <p className="text-sm font-semibold text-foreground">{feature.label}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
