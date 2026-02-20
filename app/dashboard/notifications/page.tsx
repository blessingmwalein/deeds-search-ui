"use client"

import { Crown, CreditCard, Shield, FileText, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"

const notifications = [
  { id: 1, title: "Payment Confirmed", message: "Your payment of $15.00 for deed DD-2024-001234 has been processed.", time: "2 hours ago", read: false, icon: CreditCard },
  { id: 2, title: "VIP Request Updated", message: "Your VIP request VIP-001 has been approved. You can now access the restricted record.", time: "1 day ago", read: false, icon: Crown },
  { id: 3, title: "Security Alert", message: "A new sign-in was detected from a new device. If this was you, no action is needed.", time: "2 days ago", read: true, icon: Shield },
  { id: 4, title: "Deed Record Updated", message: "The deed DD-2023-008721 you viewed has been updated with new information.", time: "3 days ago", read: true, icon: FileText },
  { id: 5, title: "VIP Request Denied", message: "Your VIP request VIP-003 was denied. Please review the feedback and resubmit if needed.", time: "5 days ago", read: true, icon: Crown },
]

export default function NotificationsPage() {
  return (
    <>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Notifications</h1>
          <p className="mt-1 text-sm text-muted-foreground">Stay updated on your account activity.</p>
        </div>
        <Button variant="outline" className="rounded-full text-sm">
          Mark All Read
        </Button>
      </div>

      <div className="rounded-2xl bg-background border border-border overflow-hidden">
        <div className="flex flex-col divide-y divide-border">
          {notifications.map((notif) => (
            <div key={notif.id} className={`flex items-start gap-4 p-5 transition-colors ${!notif.read ? "bg-primary/5" : "hover:bg-muted/20"}`}>
              <div className={`flex h-9 w-9 items-center justify-center rounded-xl shrink-0 ${notif.read ? "bg-[var(--cream-main)]" : "bg-primary/10"}`}>
                <notif.icon className={`h-4 w-4 ${notif.read ? "text-muted-foreground" : "text-primary"}`} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className={`text-sm font-medium ${notif.read ? "text-foreground" : "text-primary"}`}>{notif.title}</p>
                  {!notif.read && (
                    <span className="h-2 w-2 rounded-full bg-primary shrink-0" />
                  )}
                </div>
                <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{notif.message}</p>
                <p className="text-xs text-muted-foreground/70 mt-1.5 flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {notif.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
