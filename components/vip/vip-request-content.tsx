"use client"

import { useState } from "react"
import Link from "next/link"
import {
  Crown, FileText, Upload, ArrowLeft, CheckCircle2,
  AlertTriangle, Clock, Shield, Info, X
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function VipRequestContent() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [files, setFiles] = useState<string[]>([])
  const [formData, setFormData] = useState({
    deedNumber: "",
    requestType: "",
    justification: "",
    organization: "",
    urgency: "",
  })

  const updateField = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleFileAdd = () => {
    setFiles((prev) => [...prev, `Supporting_Document_${prev.length + 1}.pdf`])
  }

  const handleRemoveFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSubmitted(true)
    }, 1500)
  }

  if (submitted) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 lg:px-6">
        <div className="rounded-3xl bg-background p-10 sm:p-14 shadow-sm border border-border text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[var(--green-main)]/10 mx-auto mb-6">
            <CheckCircle2 className="h-8 w-8 text-[var(--green-main)]" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">Request Submitted</h1>
          <p className="mt-3 text-sm text-muted-foreground leading-relaxed max-w-md mx-auto">
            Your VIP access request has been submitted for review. Our administrative team will process your request and you will receive a notification with the outcome.
          </p>

          <div className="mt-8 rounded-2xl bg-[var(--tertiary-color)] p-5 text-left">
            <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold mb-3">Request Details</p>
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Request ID</span>
                <span className="text-sm font-medium text-foreground font-mono">VIP-2024-0087</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Deed Number</span>
                <span className="text-sm font-medium text-foreground font-mono">{formData.deedNumber || "DD-2024-001234"}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Status</span>
                <span className="flex items-center gap-1.5 text-sm font-medium text-[var(--blue-main)]">
                  <Clock className="h-3.5 w-3.5" />
                  Pending Review
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Estimated Review</span>
                <span className="text-sm font-medium text-foreground">2-5 Business Days</span>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Button className="rounded-full px-8 bg-primary text-primary-foreground hover:bg-primary/90" asChild>
              <Link href="/dashboard/vip-requests">Track Request</Link>
            </Button>
            <Button variant="outline" className="rounded-full px-8" asChild>
              <Link href="/search">Continue Searching</Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 lg:px-6">
      {/* Header */}
      <div className="mb-8">
        <Link href="/search" className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4">
          <ArrowLeft className="h-4 w-4" />
          Back to Search
        </Link>
        <div className="flex items-center gap-3 mb-2">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <Crown className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">VIP / Restricted Records Request</h1>
            <p className="text-sm text-muted-foreground">Submit a formal request for restricted deed access</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Form */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="rounded-3xl bg-background p-6 sm:p-8 shadow-sm border border-border">
            <h2 className="text-lg font-semibold text-foreground mb-6">Request Details</h2>

            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <Label htmlFor="deedNumber" className="text-sm text-foreground">Deed Number</Label>
                <div className="relative">
                  <FileText className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="deedNumber"
                    type="text"
                    placeholder="e.g. DD-2024-001234"
                    value={formData.deedNumber}
                    onChange={(e) => updateField("deedNumber", e.target.value)}
                    className="rounded-full pl-10 h-11 border-border"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <Label className="text-sm text-foreground">Request Type</Label>
                  <Select value={formData.requestType} onValueChange={(val) => updateField("requestType", val)}>
                    <SelectTrigger className="rounded-full h-11 border-border">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="legal">Legal / Court Proceedings</SelectItem>
                      <SelectItem value="financial">Financial / Mortgage</SelectItem>
                      <SelectItem value="government">Government / Official</SelectItem>
                      <SelectItem value="research">Research / Academic</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex flex-col gap-2">
                  <Label className="text-sm text-foreground">Urgency Level</Label>
                  <Select value={formData.urgency} onValueChange={(val) => updateField("urgency", val)}>
                    <SelectTrigger className="rounded-full h-11 border-border">
                      <SelectValue placeholder="Select urgency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="standard">Standard (5 Business Days)</SelectItem>
                      <SelectItem value="priority">Priority (2-3 Business Days)</SelectItem>
                      <SelectItem value="urgent">Urgent (1 Business Day)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="organization" className="text-sm text-foreground">Organization (Optional)</Label>
                <Input
                  id="organization"
                  type="text"
                  placeholder="Company or institution name"
                  value={formData.organization}
                  onChange={(e) => updateField("organization", e.target.value)}
                  className="rounded-full h-11 border-border"
                />
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="justification" className="text-sm text-foreground">Justification</Label>
                <Textarea
                  id="justification"
                  placeholder="Explain why you require access to the restricted record..."
                  value={formData.justification}
                  onChange={(e) => updateField("justification", e.target.value)}
                  className="min-h-28 rounded-2xl border-border resize-none"
                />
              </div>

              {/* File Upload */}
              <div className="flex flex-col gap-2">
                <Label className="text-sm text-foreground">Supporting Documents</Label>
                <div
                  className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-border p-8 text-center cursor-pointer hover:border-primary/40 transition-colors"
                  onClick={handleFileAdd}
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--tertiary-color)] mb-3">
                    <Upload className="h-6 w-6 text-primary" />
                  </div>
                  <p className="text-sm font-medium text-foreground">Click to upload documents</p>
                  <p className="text-xs text-muted-foreground mt-1">PDF, JPG, PNG up to 10MB each</p>
                </div>

                {files.length > 0 && (
                  <div className="flex flex-col gap-2 mt-2">
                    {files.map((file, index) => (
                      <div key={index} className="flex items-center justify-between rounded-xl bg-[var(--tertiary-color)] p-3">
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-primary" />
                          <span className="text-sm text-foreground">{file}</span>
                        </div>
                        <button onClick={() => handleRemoveFile(index)} className="text-muted-foreground hover:text-destructive">
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <Button
                type="submit"
                className="rounded-full h-11 bg-primary text-primary-foreground hover:bg-primary/90 w-full mt-2"
                disabled={loading}
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="h-4 w-4 rounded-full border-2 border-primary-foreground border-t-transparent animate-spin" />
                    Submitting Request...
                  </span>
                ) : (
                  <>
                    <Crown className="mr-2 h-4 w-4" />
                    Submit VIP Request - $50
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>

        {/* Sidebar Info */}
        <div className="flex flex-col gap-6">
          <div className="rounded-3xl bg-background p-6 shadow-sm border border-border">
            <div className="flex items-center gap-2 mb-4">
              <Info className="h-5 w-5 text-primary" />
              <h3 className="text-sm font-semibold text-foreground">How It Works</h3>
            </div>
            <div className="flex flex-col gap-4">
              {[
                { step: "1", title: "Submit Request", desc: "Fill in the deed number and provide justification" },
                { step: "2", title: "Admin Review", desc: "Your request is reviewed by our administrative team" },
                { step: "3", title: "Notification", desc: "Receive approval or feedback via email notification" },
                { step: "4", title: "Access Granted", desc: "View the restricted record upon approval" },
              ].map((item) => (
                <div key={item.step} className="flex items-start gap-3">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold shrink-0">
                    {item.step}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{item.title}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl bg-[var(--tertiary-color)] p-6">
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle className="h-5 w-5 text-primary" />
              <h3 className="text-sm font-semibold text-foreground">Important Notice</h3>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              VIP access requests are subject to administrative review and approval. Certain records may require additional verification. Processing fees are non-refundable regardless of the request outcome.
            </p>
          </div>

          <div className="rounded-3xl bg-background p-6 shadow-sm border border-border">
            <div className="flex items-center gap-2 mb-3">
              <Shield className="h-5 w-5 text-primary" />
              <h3 className="text-sm font-semibold text-foreground">Data Protection</h3>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              All submissions are encrypted and stored securely. Access to restricted records is logged for compliance and audit purposes.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
