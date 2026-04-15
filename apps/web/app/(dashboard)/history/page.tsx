"use client"

import * as React from "react"
import { DataTable } from "@/components/ui/data-table"
import { api } from "@/lib/api"
import { toast } from "sonner"
import { IconHistory } from "@tabler/icons-react"

export default function HistoryPage() {
  const [recentScreenings, setRecentScreenings] = React.useState<any[]>([])
  const [isLoading, setIsLoading] = React.useState(true)

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const screeningsData = await api.getAllRecentScreenings()
        
        const transformedScreenings = screeningsData.map((item: any) => ({
          id: item._id,
          candidate: `${item.applicantId?.firstName} ${item.applicantId?.lastName}`,
          jobRole: item.jobId?.title || "Unknown Position",
          matchScore: `${item.matchScore}%`,
          status: item.matchScore >= 80 ? "Qualified" : item.matchScore >= 50 ? "In Review" : "Rejected",
          date: new Date(item.createdAt).toISOString().split('T')[0]
        }))
        setRecentScreenings(transformedScreenings)
      } catch (error) {
        toast.error("Failed to load screening history")
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [])

  return (
    <div className="p-4 md:p-6 lg:p-8 w-full max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
          <IconHistory size={32} className="text-primary" /> Screening History
        </h1>
        <p className="text-muted-foreground text-sm">Full audit log of AI-vetted candidate assessments across all jobs.</p>
      </div>
      
      <div className="bg-card border rounded-2xl p-6 shadow-sm">
        <DataTable data={recentScreenings} isLoading={isLoading} />
      </div>
    </div>
  )
}
