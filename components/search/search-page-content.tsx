"use client"

import { useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Search, SlidersHorizontal, MapPin, Calendar, FileText, Building2, ChevronDown, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DeedResultCard } from "./deed-result-card"

const mockResults = [
  {
    id: "DD-2024-001234",
    propertyDescription: "Residential Plot, Block 14, Lot 25, Georgetown",
    ownerName: "John M. Richardson",
    registrationDate: "2024-03-15",
    status: "Active",
    processingOffice: "Georgetown Registry",
    propertyType: "Residential",
  },
  {
    id: "DD-2024-001235",
    propertyDescription: "Commercial Building, Main Street, Suite 200",
    ownerName: "Apex Holdings Ltd.",
    registrationDate: "2024-02-28",
    status: "Active",
    processingOffice: "Central Registry",
    propertyType: "Commercial",
  },
  {
    id: "DD-2023-008721",
    propertyDescription: "Agricultural Land, Region 5, Parcel 42",
    ownerName: "Maria S. Fernandez",
    registrationDate: "2023-11-10",
    status: "Active",
    processingOffice: "Regional Office - East",
    propertyType: "Agricultural",
  },
  {
    id: "DD-2023-005432",
    propertyDescription: "Residential Apartment, Tower C, Unit 12B",
    ownerName: "David & Sarah Thompson",
    registrationDate: "2023-08-22",
    status: "Pending Transfer",
    processingOffice: "Georgetown Registry",
    propertyType: "Residential",
  },
  {
    id: "DD-2022-012345",
    propertyDescription: "Industrial Warehouse, Zone 3, Plot 8",
    ownerName: "Global Logistics Inc.",
    registrationDate: "2022-12-05",
    status: "Active",
    processingOffice: "Industrial Zone Registry",
    propertyType: "Industrial",
  },
  {
    id: "DD-2024-003456",
    propertyDescription: "Vacant Lot, Sunrise Development, Phase 2",
    ownerName: "Sunrise Dev. Corp.",
    registrationDate: "2024-01-18",
    status: "Active",
    processingOffice: "Georgetown Registry",
    propertyType: "Residential",
  },
]

export function SearchPageContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const initialQuery = searchParams.get("q") || ""
  const [query, setQuery] = useState(initialQuery)
  const [showFilters, setShowFilters] = useState(false)
  const [sortBy, setSortBy] = useState("relevance")
  const [propertyType, setPropertyType] = useState("all")
  const [status, setStatus] = useState("all")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    router.push(`/search?q=${encodeURIComponent(query)}`)
  }

  const filteredResults = mockResults.filter((result) => {
    if (propertyType !== "all" && result.propertyType !== propertyType) return false
    if (status !== "all" && result.status !== status) return false
    return true
  })

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 lg:px-6">
      {/* Search Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground sm:text-3xl">Search Deed Records</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Enter a deed number or property address to search our records.
        </p>
      </div>

      {/* Search Bar */}
      <form onSubmit={handleSearch} className="mb-6">
        <div className="flex items-center gap-0 rounded-full bg-background p-1.5 shadow-md border border-border">
          <div className="flex flex-1 items-center gap-2 px-4">
            <Search className="h-5 w-5 text-muted-foreground shrink-0" />
            <Input
              type="text"
              placeholder="Enter Deed Number or Property Address..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="border-0 bg-transparent shadow-none focus-visible:ring-0 text-foreground placeholder:text-muted-foreground"
            />
          </div>
          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="rounded-full"
              onClick={() => setShowFilters(!showFilters)}
            >
              <SlidersHorizontal className="h-4 w-4" />
            </Button>
            <Button type="submit" className="rounded-full px-6 h-10 bg-primary text-primary-foreground hover:bg-primary/90">
              <Search className="h-4 w-4 sm:mr-2" />
              <span className="hidden sm:inline">Search</span>
            </Button>
          </div>
        </div>
      </form>

      {/* Filters */}
      {showFilters && (
        <div className="mb-6 flex flex-wrap items-center gap-3 rounded-2xl bg-background p-4 shadow-sm border border-border animate-in slide-in-from-top-2 duration-200">
          <div className="flex items-center gap-2">
            <Building2 className="h-4 w-4 text-muted-foreground" />
            <Select value={propertyType} onValueChange={setPropertyType}>
              <SelectTrigger className="h-9 w-40 rounded-full border-border text-sm">
                <SelectValue placeholder="Property Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="Residential">Residential</SelectItem>
                <SelectItem value="Commercial">Commercial</SelectItem>
                <SelectItem value="Agricultural">Agricultural</SelectItem>
                <SelectItem value="Industrial">Industrial</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2">
            <FileText className="h-4 w-4 text-muted-foreground" />
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger className="h-9 w-40 rounded-full border-border text-sm">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Pending Transfer">Pending Transfer</SelectItem>
                <SelectItem value="Archived">Archived</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="h-9 w-44 rounded-full border-border text-sm">
                <SelectValue placeholder="Sort By" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="relevance">Most Relevant</SelectItem>
                <SelectItem value="date-desc">Newest First</SelectItem>
                <SelectItem value="date-asc">Oldest First</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {(propertyType !== "all" || status !== "all") && (
            <Button
              variant="ghost"
              size="sm"
              className="rounded-full text-xs"
              onClick={() => { setPropertyType("all"); setStatus("all") }}
            >
              <X className="h-3 w-3 mr-1" />
              Clear Filters
            </Button>
          )}
        </div>
      )}

      {/* Results Header */}
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing <span className="font-medium text-foreground">{filteredResults.length}</span> results
          {initialQuery && (
            <> for <span className="font-medium text-foreground">&quot;{initialQuery}&quot;</span></>
          )}
        </p>
      </div>

      {/* Results Grid */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {filteredResults.map((result) => (
          <DeedResultCard key={result.id} deed={result} />
        ))}
      </div>

      {filteredResults.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted mb-4">
            <Search className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold text-foreground">No results found</h3>
          <p className="mt-2 text-sm text-muted-foreground max-w-sm">
            Try adjusting your search terms or filters to find what you&apos;re looking for.
          </p>
        </div>
      )}

      {/* Pagination */}
      {filteredResults.length > 0 && (
        <div className="mt-8 flex items-center justify-center gap-2">
          <Button variant="outline" className="rounded-full" disabled>
            Previous
          </Button>
          {[1, 2, 3].map((page) => (
            <Button
              key={page}
              variant={page === 1 ? "default" : "outline"}
              className="rounded-full h-10 w-10 p-0"
            >
              {page}
            </Button>
          ))}
          <Button variant="outline" className="rounded-full">
            Next
          </Button>
        </div>
      )}
    </div>
  )
}
