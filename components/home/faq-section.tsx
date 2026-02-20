"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqs = [
  {
    question: "What information do I need to search for a deed?",
    answer: "You need the deed number to perform a basic search. For property address searches, you can enter the full or partial address. Additional filters may be available depending on your access tier.",
  },
  {
    question: "Do I need an account to search for deeds?",
    answer: "No, basic searches can be performed without an account. However, creating an account is recommended for detailed deed views, as it provides transaction history, saved searches, and receipt generation.",
  },
  {
    question: "How does the payment system work?",
    answer: "We operate on a pay-per-use model. Basic searches have a fixed fee, detailed views have an additional fee, and VIP/restricted record requests have a processing fee. Corporate subscription packages are also available for law firms, banks, and real estate agencies.",
  },
  {
    question: "What are VIP / Restricted Records?",
    answer: "Certain deed records are classified as restricted or VIP due to confidentiality and data protection regulations. Access requires a formal written request with justification and supporting documentation, followed by administrative review and approval.",
  },
  {
    question: "Can I download deed attachments?",
    answer: "Deed attachments are viewable through our secure embedded viewer with watermarking. Downloads are not available to maintain document integrity and prevent unauthorized distribution.",
  },
  {
    question: "Is my data secure on this platform?",
    answer: "Absolutely. We implement encrypted SSL communication, role-based access control, full audit trail logging, secure authentication, anti-scraping controls, and regular security audits to protect all user data and deed information.",
  },
]

export function FaqSection() {
  return (
    <section className="bg-[var(--tertiary-color)]/50 py-20 lg:py-28">
      <div className="mx-auto max-w-3xl px-4 lg:px-6">
        <div className="text-center mb-12">
          <p className="text-sm font-medium uppercase tracking-widest text-[var(--secondary-color)] mb-3">
            FAQ
          </p>
          <h2 className="text-2xl font-bold text-foreground sm:text-3xl text-balance">
            Frequently Asked Questions
          </h2>
        </div>

        <Accordion type="single" collapsible className="flex flex-col gap-3">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="rounded-2xl bg-background border-0 px-6 shadow-sm"
            >
              <AccordionTrigger className="text-left text-sm font-medium text-foreground hover:no-underline py-5">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground leading-relaxed pb-5">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
