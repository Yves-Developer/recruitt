"use client"

import * as React from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { IconFileUpload, IconForms, IconBriefcase, IconUsers } from "@tabler/icons-react"
import { ApplicantUpload } from "@/components/custom/applicant-upload"
import { ApplicantManualForm } from "@/components/custom/applicant-manual-form"
import { ApplicantList } from "@/components/custom/applicant-list"
import { api } from "@/lib/api"
import { Job, Applicant } from "@repo/shared"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { toast } from "sonner"

export default function ApplicantsPage() {
  const [jobs, setJobs] = React.useState<Job[]>([])
  const [jobId, setJobId] = React.useState<string | undefined>(undefined)
  const [isLoading, setIsLoading] = React.useState(true)

  React.useEffect(() => {
    const initData = async () => {
      try {
        const jobsData = await api.getJobs()
        setJobs(jobsData)
      } catch (error) {
        toast.error("Failed to load jobs")
      } finally {
        setIsLoading(false)
      }
    }
    initData()
  }, [])

  const [pool, setPool] = React.useState<Applicant[]>([])
  const [isPoolLoading, setIsPoolLoading] = React.useState(false)

  const fetchPool = async (id: string) => {
    try {
      setIsPoolLoading(true)
      const data = await api.getApplicantsByJob(id)
      setPool(data)
    } catch (error) {
      toast.error("Failed to fetch talent pool")
    } finally {
      setIsPoolLoading(false)
    }
  }

  React.useEffect(() => {
    if (jobId) {
      fetchPool(jobId)
    }
  }, [jobId])

  return (
    <div className="p-4 md:p-6 lg:p-8 w-full max-w-7xl mx-auto">
      <div className="mb-10 p-6 rounded-2xl bg-card border shadow-sm border-primary/10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <IconBriefcase className="text-primary" /> Select Target Job
            </h2>
            <p className="text-sm text-muted-foreground">Applicants must be associated with a specific opening.</p>
          </div>
          <div className="w-full md:w-80">
            <Select onValueChange={setJobId} value={jobId || ""}>
              <SelectTrigger className="h-12 text-base">
                <SelectValue placeholder="Select a job position..." />
              </SelectTrigger>
              <SelectContent>
                {jobs.map((job) => (
                  <SelectItem key={job._id || job.id} value={(job._id || job.id)!}>
                    {job.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <Tabs defaultValue="pool" orientation="vertical" className="flex flex-col md:flex-row gap-8 lg:gap-12 w-full">

        {/* Left Column: Context & Navigation */}
        <div className="w-full md:w-72 lg:w-80 shrink-0 space-y-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Talent Hub</h1>
            <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
              Orchestrate your applicant pipeline and review candidate profiles.
            </p>
          </div>

          <TabsList className="flex flex-col h-auto w-full items-stretch bg-transparent space-y-3 p-0">
            <TabsTrigger
              value="pool"
              disabled={!jobId}
              className="justify-start gap-3 h-14 px-4 shadow-none bg-accent/30 data-[state=active]:bg-primary/15 data-[state=active]:text-primary data-[state=active]:border-primary/30 border border-transparent rounded-xl transition-all text-base disabled:opacity-50"
            >
              <IconUsers size={22} className="text-primary" /> Job Talent Pool
            </TabsTrigger>
            <div className="h-px bg-border/50 my-2 mx-1" />
            <TabsTrigger
              value="upload"
              disabled={!jobId}
              className="justify-start gap-3 h-14 px-4 shadow-none bg-accent/30 data-[state=active]:bg-primary/15 data-[state=active]:text-primary data-[state=active]:border-primary/30 border border-transparent rounded-xl transition-all text-base disabled:opacity-50"
            >
              <IconFileUpload size={22} className="text-primary" /> AI Resume Parser
            </TabsTrigger>
            <TabsTrigger
              value="manual"
              disabled={!jobId}
              className="justify-start gap-3 h-14 px-4 shadow-none bg-accent/30 data-[state=active]:bg-primary/15 data-[state=active]:text-primary data-[state=active]:border-primary/30 border border-transparent rounded-xl transition-all text-base disabled:opacity-50"
            >
              <IconForms size={22} className="text-primary" /> Manual Data Entry
            </TabsTrigger>
          </TabsList>
          
          {!jobId && (
            <p className="text-xs text-amber-500 font-medium animate-pulse">
              * Select a job opening above to enable specific tools.
            </p>
          )}
        </div>

        {/* Right Column: Active Form Content */}
        <div className="flex-1 min-w-0">
          <TabsContent value="pool" className="mt-0 outline-none animate-in fade-in slide-in-from-right-4 duration-500">
            <ApplicantList applicants={pool} isLoading={isPoolLoading} onRefresh={() => jobId && fetchPool(jobId)} />
          </TabsContent>

          <TabsContent value="upload" className="mt-0 outline-none animate-in fade-in slide-in-from-right-4 duration-500">
            {jobId && <ApplicantUpload jobId={jobId} onSuccess={() => fetchPool(jobId)} />}
          </TabsContent>

          <TabsContent value="manual" className="mt-0 outline-none animate-in fade-in slide-in-from-right-4 duration-500">
            {jobId && <ApplicantManualForm jobId={jobId} onSuccess={() => fetchPool(jobId)} />}
          </TabsContent>
        </div>

      </Tabs>
    </div>
  )
}
