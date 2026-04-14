import { JobList } from "@/components/custom/job-list"
import { CreateJobDialog } from "@/components/custom/create-job-dialog"

export default function JobsPage() {
  return (
    <div className="flex flex-col gap-6 p-4 md:p-6 lg:p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Job Openings</h1>
          <p className="text-muted-foreground mt-1">
            Manage your active vacancies and recruitment pipelines.
          </p>
        </div>
        <CreateJobDialog />
      </div>
      
      <JobList />
    </div>
  )
}
