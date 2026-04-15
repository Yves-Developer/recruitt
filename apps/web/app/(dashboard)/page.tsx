"use client"

import * as React from "react"
import { SectionCards } from '@/components/ui/section-cards'
import { ChartAreaInteractive } from '@/components/ui/chart-area-interactive'
import { api } from "@/lib/api"
import { toast } from "sonner"

export default function Page() {
  const [stats, setStats] = React.useState<any>(null)
  const [isLoading, setIsLoading] = React.useState(true)

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const statsData = await api.getStats()
        setStats(statsData)
      } catch (error) {
        console.error(error)
        toast.error("Failed to load dashboard data")
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [])

  return (
    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
      <SectionCards stats={stats?.summary} />
      <div className="px-4 lg:px-6">
        <ChartAreaInteractive data={stats?.screeningHistory || []} />
      </div>
    </div>
  )
}
