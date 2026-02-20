"use client"

import { useState } from "react"
import { User, Mail, Phone, Lock, Bell, Shield, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

export default function SettingsPage() {
  const [profile, setProfile] = useState({
    fullName: "John M. Richardson",
    email: "john@example.com",
    phone: "+263 7X XXX XXXX",
  })

  return (
    <>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">Settings</h1>
        <p className="mt-1 text-sm text-muted-foreground">Manage your account preferences and security.</p>
      </div>

      <div className="flex flex-col gap-6">
        {/* Profile Section */}
        <div className="rounded-2xl bg-background p-6 border border-border">
          <div className="flex items-center gap-2 mb-6">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[var(--cream-main)]">
              <User className="h-4 w-4 text-primary" />
            </div>
            <h2 className="text-sm font-semibold text-foreground uppercase tracking-wider">Profile Information</h2>
          </div>

          <div className="flex flex-col gap-5">
            <div className="flex items-center gap-4 mb-2">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary text-primary-foreground text-lg font-bold">
                JR
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">{profile.fullName}</p>
                <p className="text-xs text-muted-foreground">Individual Account</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <Label className="text-sm text-foreground">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input value={profile.fullName} onChange={(e) => setProfile(p => ({...p, fullName: e.target.value}))} className="rounded-full pl-10 h-11 border-border" />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <Label className="text-sm text-foreground">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input value={profile.email} onChange={(e) => setProfile(p => ({...p, email: e.target.value}))} className="rounded-full pl-10 h-11 border-border" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <Label className="text-sm text-foreground">Phone</Label>
                <div className="relative">
                  <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input value={profile.phone} onChange={(e) => setProfile(p => ({...p, phone: e.target.value}))} className="rounded-full pl-10 h-11 border-border" />
                </div>
              </div>
            </div>

            <Button className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90 self-start mt-2">
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          </div>
        </div>

        {/* Security */}
        <div className="rounded-2xl bg-background p-6 border border-border">
          <div className="flex items-center gap-2 mb-6">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[var(--cream-main)]">
              <Shield className="h-4 w-4 text-primary" />
            </div>
            <h2 className="text-sm font-semibold text-foreground uppercase tracking-wider">Security</h2>
          </div>
          <div className="flex flex-col divide-y divide-border">
            <div className="flex items-center justify-between py-4 first:pt-0 last:pb-0">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--cream-main)] shrink-0">
                  <Lock className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Change Password</p>
                  <p className="text-xs text-muted-foreground">Update your password regularly for security</p>
                </div>
              </div>
              <Button variant="outline" size="sm" className="rounded-full">Change</Button>
            </div>
            <div className="flex items-center justify-between py-4 first:pt-0 last:pb-0">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--cream-main)] shrink-0">
                  <Shield className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Two-Factor Authentication</p>
                  <p className="text-xs text-muted-foreground">Add an extra layer of security</p>
                </div>
              </div>
              <Switch />
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="rounded-2xl bg-background p-6 border border-border">
          <div className="flex items-center gap-2 mb-6">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[var(--cream-main)]">
              <Bell className="h-4 w-4 text-primary" />
            </div>
            <h2 className="text-sm font-semibold text-foreground uppercase tracking-wider">Notification Preferences</h2>
          </div>
          <div className="flex flex-col divide-y divide-border">
            {[
              { label: "Payment Confirmations", desc: "Get notified when payments are processed" },
              { label: "VIP Request Updates", desc: "Status changes on your VIP requests" },
              { label: "Security Alerts", desc: "Sign-in alerts and security notifications" },
              { label: "Newsletter", desc: "Portal updates and new features" },
            ].map((pref) => (
              <div key={pref.label} className="flex items-center justify-between py-3 first:pt-0 last:pb-0">
                <div>
                  <p className="text-sm font-medium text-foreground">{pref.label}</p>
                  <p className="text-xs text-muted-foreground">{pref.desc}</p>
                </div>
                <Switch defaultChecked />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
