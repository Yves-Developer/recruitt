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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Job Openings</h1>
          <p className="text-muted-foreground mt-1">
            Manage your active vacancies and recruitment pipelines.
          </p>
        </div>
        <CreateJobDialog onSuccess={fetchJobs} />
      </div>
      
      <JobList jobs={jobs} isLoading={isLoading} onUpdate={fetchJobs} />
    </div>
  )
}
