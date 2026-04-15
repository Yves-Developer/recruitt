"use client"

import * as React from "react"
import { SectionCards } from '@/components/ui/section-cards'
import { ChartAreaInteractive } from '@/components/ui/chart-area-interactive'
import { DataTable } from '@/components/ui/data-table'
import { api } from "@/lib/api"
import { toast } from "sonner"

export default function Page() {
  const [recentScreenings, setRecentScreenings] = React.useState<any[]>([])
  const [isLoading, setIsLoading] = React.useState(true)

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await api.getAllRecentScreenings()
        // Transform backend data for DataTable if needed
        const transformedData = data.map((item: any) => ({
          id: item._id,
          candidate: `${item.applicantId?.firstName} ${item.applicantId?.lastName}`,
          jobRole: item.jobId?.title || "Unknown Position",
          matchScore: `${item.matchScore}%`,
          status: item.matchScore >= 80 ? "Qualified" : item.matchScore >= 50 ? "In Review" : "Rejected",
          date: new Date(item.createdAt).toISOString().split('T')[0]
        }))
        setRecentScreenings(transformedData)
      } catch (error) {
        toast.error("Failed to load dashboard data")
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [])

  return (
    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
      <SectionCards />
      <div className="px-4 lg:px-6">
        <ChartAreaInteractive />
      </div>
      <div className="px-4 lg:px-6 space-y-4">
        <div className="flex flex-col gap-1">
          <h2 className="text-xl font-bold tracking-tight">Recent Screening Activity</h2>
          <p className="text-muted-foreground text-sm">Overview of the latest AI evaluations across all active jobs.</p>
        </div>
        <DataTable data={recentScreenings} isLoading={isLoading} />
      </div>
    </div>
  )
}
