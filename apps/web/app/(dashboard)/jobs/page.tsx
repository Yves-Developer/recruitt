"use client"

import * as React from "react"
import { JobList } from "@/components/custom/job-list"
import { CreateJobDialog } from "@/components/custom/create-job-dialog"
import { api } from "@/lib/api"
import { Job } from "@repo/shared"
import { toast } from "sonner"

export default function JobsPage() {
  const [jobs, setJobs] = React.useState<Job[]>([])
  const [isLoading, setIsLoading] = React.useState(true)

  const fetchJobs = async () => {
    try {
      setIsLoading(true)
      const data = await api.getJobs()
      setJobs(data)
    } catch (error) {
      toast.error("Failed to load jobs")
    } finally {
      setIsLoading(false)
    }
  }

  React.useEffect(() => {
    fetchJobs()
  }, [])

  return (
    <div className="flex flex-col gap-6 p-4 md:p-6 lg:p-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Job Openings</h1>
          <p className="text-sm sm:text-base text-muted-foreground max-w-2xl leading-relaxed">
            Manage your open jobs and see how your hiring is going.
          </p>
        </div>
        <CreateJobDialog onSuccess={fetchJobs} />
      </div>
      
      <JobList jobs={jobs} isLoading={isLoading} onUpdate={fetchJobs} />
    </div>
  )
}
