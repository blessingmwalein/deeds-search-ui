"use client"

import { CreditCard, Download, CheckCircle2, XCircle, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"

const transactions = [
  { id: "TXN-001", type: "Basic Search", deedId: "DD-2024-001234", amount: "$5.00", date: "Mar 15, 2024", status: "Completed" },
  { id: "TXN-002", type: "Detailed View", deedId: "DD-2024-001235", amount: "$15.00", date: "Mar 14, 2024", status: "Completed" },
  { id: "TXN-003", type: "Detailed View", deedId: "DD-2023-008721", amount: "$15.00", date: "Mar 10, 2024", status: "Completed" },
  { id: "TXN-004", type: "VIP Request", deedId: "DD-2022-012345", amount: "$50.00", date: "Mar 5, 2024", status: "Completed" },
  { id: "TXN-005", type: "Basic Search", deedId: "DD-2024-003456", amount: "$5.00", date: "Feb 28, 2024", status: "Failed" },
  { id: "TXN-006", type: "Detailed View", deedId: "DD-2023-005432", amount: "$15.00", date: "Feb 25, 2024", status: "Completed" },
]

export default function TransactionsPage() {
  return (
    <>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">Transaction History</h1>
        <p className="mt-1 text-sm text-muted-foreground">All your payment transactions and receipts.</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 mb-8">
        <div className="rounded-2xl bg-background p-5 border border-border">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 mb-3">
            <CreditCard className="h-5 w-5 text-primary" />
          </div>
          <p className="text-2xl font-bold text-foreground tracking-tight">$105.00</p>
          <p className="text-xs text-muted-foreground mt-1">Total Spent</p>
        </div>
        <div className="rounded-2xl bg-background p-5 border border-border">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--gold-main)]/15 mb-3">
            <Clock className="h-5 w-5 text-[var(--gold-main)]" />
          </div>
          <p className="text-2xl font-bold text-foreground tracking-tight">$85.00</p>
          <p className="text-xs text-muted-foreground mt-1">This Month</p>
        </div>
        <div className="rounded-2xl bg-background p-5 border border-border">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--cream-main)] mb-3">
            <CheckCircle2 className="h-5 w-5 text-primary" />
          </div>
          <p className="text-2xl font-bold text-foreground tracking-tight">6</p>
          <p className="text-xs text-muted-foreground mt-1">Transactions</p>
        </div>
      </div>

      {/* Transactions List */}
      <div className="rounded-2xl bg-background border border-border overflow-hidden">
        {/* Desktop Table */}
        <div className="hidden sm:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Transaction</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Type</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Deed</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Amount</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Date</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Status</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider"></th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((txn) => (
                <tr key={txn.id} className="border-b border-border last:border-b-0 hover:bg-muted/20 transition-colors">
                  <td className="px-5 py-4 text-sm font-mono text-foreground">{txn.id}</td>
                  <td className="px-5 py-4 text-sm text-foreground">{txn.type}</td>
                  <td className="px-5 py-4 text-sm font-mono text-muted-foreground">{txn.deedId}</td>
                  <td className="px-5 py-4 text-sm font-semibold text-foreground">{txn.amount}</td>
                  <td className="px-5 py-4 text-sm text-muted-foreground">{txn.date}</td>
                  <td className="px-5 py-4">
                    <span className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium ${
                      txn.status === "Completed"
                        ? "bg-[var(--green-main)]/10 text-[var(--green-main)]"
                        : "bg-destructive/10 text-destructive"
                    }`}>
                      {txn.status === "Completed" ? <CheckCircle2 className="h-3 w-3" /> : <XCircle className="h-3 w-3" />}
                      {txn.status}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    {txn.status === "Completed" && (
                      <Button variant="ghost" size="sm" className="rounded-full">
                        <Download className="h-4 w-4" />
                        <span className="sr-only">Download receipt</span>
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="sm:hidden flex flex-col divide-y divide-border">
          {transactions.map((txn) => (
            <div key={txn.id} className="flex items-center gap-4 p-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--cream-main)] shrink-0">
                <CreditCard className="h-4 w-4 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-foreground">{txn.type}</p>
                  <p className="text-sm font-semibold text-foreground">{txn.amount}</p>
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">{txn.deedId} | {txn.date}</p>
                <span className={`inline-flex items-center gap-1 mt-1 text-xs ${
                  txn.status === "Completed" ? "text-[var(--green-main)]" : "text-destructive"
                }`}>
                  {txn.status === "Completed" ? <CheckCircle2 className="h-3 w-3" /> : <XCircle className="h-3 w-3" />}
                  {txn.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
