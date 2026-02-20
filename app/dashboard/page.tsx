"use client"

import Link from "next/link"
import { FileText, Search, CreditCard, Crown, ArrowRight, Eye, Clock, CheckCircle2, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"

const stats = [
  { label: "Purchased Deeds", value: "12", icon: FileText, color: "bg-primary/10 text-primary" },
  { label: "Saved Searches", value: "8", icon: Search, color: "bg-[var(--gold-main)]/15 text-[var(--gold-main)]" },
  { label: "Total Spent", value: "$185", icon: CreditCard, color: "bg-[var(--earth-main)]/15 text-[var(--earth-main)]" },
  { label: "VIP Requests", value: "2", icon: Crown, color: "bg-[var(--cream-main)] text-primary" },
]

const recentActivity = [
  { type: "search", title: "Searched for DD-2024-001234", time: "2 hours ago", icon: Search },
  { type: "purchase", title: "Purchased detailed view for DD-2024-001235", time: "1 day ago", icon: CreditCard },
  { type: "view", title: "Viewed deed DD-2023-008721", time: "2 days ago", icon: Eye },
  { type: "vip", title: "VIP request submitted for DD-2022-012345", time: "3 days ago", icon: Crown },
  { type: "search", title: "Searched for Commercial properties", time: "5 days ago", icon: Search },
]

const recentDeeds = [
  { id: "DD-2024-001234", property: "Residential Plot, Block 14, Lot 25", status: "Active", date: "Mar 15, 2024" },
  { id: "DD-2024-001235", property: "Commercial Building, Main Street", status: "Active", date: "Feb 28, 2024" },
  { id: "DD-2023-008721", property: "Agricultural Land, Region 5", status: "Active", date: "Nov 10, 2023" },
]

export default function DashboardPage() {
  return (
    <>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground ">Dashboard</h1>
        <p className="mt-1 text-sm text-muted-foreground">Welcome back, John. Here is your account overview.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 mb-8">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-2xl bg-background p-5 border border-border">
            <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${stat.color} mb-3`}>
              <stat.icon className="h-5 w-5" />
            </div>
            <p className="text-2xl font-bold text-foreground tracking-tight">{stat.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
        {/* Recent Activity */}
        <div className="lg:col-span-3 rounded-2xl bg-background p-6 border border-border">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-sm font-semibold text-foreground uppercase tracking-wider">Recent Activity</h2>
          </div>
          <div className="flex flex-col divide-y divide-border">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center gap-4 py-3 first:pt-0 last:pb-0">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--cream-main)] shrink-0">
                  <activity.icon className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-foreground truncate">{activity.title}</p>
                  <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                    <Clock className="h-3 w-3" />
                    {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Deeds */}
        <div className="lg:col-span-2 rounded-2xl bg-background p-6 border border-border">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-sm font-semibold text-foreground uppercase tracking-wider">Purchased Deeds</h2>
            <Button variant="ghost" size="sm" className="rounded-full text-xs" asChild>
              <Link href="/dashboard/deeds">
                View All
                <ArrowRight className="ml-1 h-3 w-3" />
              </Link>
            </Button>
          </div>
          <div className="flex flex-col divide-y divide-border">
            {recentDeeds.map((deed) => (
              <Link
                key={deed.id}
                href={`/deed/${deed.id}`}
                className="flex flex-col py-3 first:pt-0 last:pb-0 hover:opacity-80 transition-opacity"
              >
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-foreground font-mono">{deed.id}</p>
                  <span className="flex items-center gap-1 text-xs text-[var(--green-main)]">
                    <CheckCircle2 className="h-3 w-3" />
                    {deed.status}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-1 truncate">{deed.property}</p>
                <p className="text-xs text-muted-foreground/70 mt-0.5">{deed.date}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {[
          { href: "/search", label: "Search Deeds", desc: "Find property records", icon: Search, bg: "bg-primary", iconColor: "text-primary-foreground" },
          { href: "/vip-request", label: "VIP Request", desc: "Access restricted records", icon: Crown, bg: "bg-[var(--gold-main)]", iconColor: "text-white" },
          { href: "/pricing", label: "View Plans", desc: "Upgrade your access", icon: TrendingUp, bg: "bg-[var(--gray-1)]", iconColor: "text-white" },
        ].map((action) => (
          <Link
            key={action.href}
            href={action.href}
            className="flex items-center gap-4 rounded-2xl bg-background p-5 border border-border hover:border-primary/20 hover:shadow-md transition-all"
          >
            <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${action.bg} shrink-0`}>
              <action.icon className={`h-5 w-5 ${action.iconColor}`} />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">{action.label}</p>
              <p className="text-xs text-muted-foreground">{action.desc}</p>
            </div>
          </Link>
        ))}
      </div>
    </>
  )
}
