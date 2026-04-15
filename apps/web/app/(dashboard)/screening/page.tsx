"use client"

import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { IconBrain, IconCpu, IconRocket, IconLoader2, IconSparkles, IconArrowLeft, IconCommand } from "@tabler/icons-react"
import { Progress } from "@/components/ui/progress"
import { toast } from "sonner"
import { Badge } from "@/components/ui/badge"
import { Leaderboard } from "@/components/custom/leaderboard"
import { api } from "@/lib/api"
import { Job, ScreeningResult } from "@repo/shared"

export default function ScreeningPage() {
  const [jobs, setJobs] = React.useState<Job[]>([])
  const [results, setResults] = React.useState<ScreeningResult[]>([])
  const [isLoadingJobs, setIsLoadingJobs] = React.useState(true)
  const [jobId, setJobId] = React.useState<string | undefined>(undefined)
  const [isProcessing, setIsProcessing] = React.useState(false)
  const [showResults, setShowResults] = React.useState(false)
  const [progress, setProgress] = React.useState(0)
  const [step, setStep] = React.useState(0)

  const steps = [
    "Fetching applicant profiles...",
    "Embedding semantic vectors...",
    "Running Gemini LLM Analysis...",
    "Calculating match scores...",
    "Finalizing leaderboard rankings..."
  ]

  React.useEffect(() => {
    const fetchJobs = async () => {
      try {
        const data = await api.getJobs()
        setJobs(data)
      } catch (error) {
        toast.error("Failed to fetch jobs")
      } finally {
        setIsLoadingJobs(false)
      }
    }
    fetchJobs()
  }, [])

  const [hasPreviousResults, setHasPreviousResults] = React.useState(false)

  React.useEffect(() => {
    const checkPrevious = async () => {
      if (jobId) {
        try {
          const existing = await api.getScreeningResults(jobId)
          setHasPreviousResults(existing.length > 0)
        } catch (error) {
          setHasPreviousResults(false)
        }
      }
    }
    checkPrevious()
  }, [jobId])

  const handleLoadPrevious = async () => {
    if (!jobId) return
    setIsLoadingJobs(true)
    try {
      const existing = await api.getScreeningResults(jobId)
      setResults(existing)
      setShowResults(true)
    } catch (error) {
      toast.error("Failed to load previous results")
    } finally {
      setIsLoadingJobs(false)
    }
  }

  const handleStartScreening = async () => {
    if (!jobId) {
      toast.error("Please select a job to screen for.")
      return
    }

    setIsProcessing(true)
    setShowResults(false)
    setStep(0)
    setProgress(0)

    // Parallel simulation of progress while waiting for backend
    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + 1
        if (next % 20 === 0 && next < 100) {
          setStep((s) => s + 1)
        }
        return next > 95 ? 95 : next // Hold at 95 until real API finishes
      })
    }, 150)

    try {
      await api.triggerScreening(jobId)
      const screeningResults = await api.getScreeningResults(jobId)
      setResults(screeningResults)
      
      clearInterval(interval)
      setProgress(100)
      setStep(4)
      
      setTimeout(() => {
        setIsProcessing(false)
        setShowResults(true)
        setHasPreviousResults(true)
        toast.success("AI Matrix Assessment complete!")
      }, 500)
    } catch (error: any) {
      clearInterval(interval)
      setIsProcessing(false)
      toast.error(error.message || "AI Screening failed")
    }
  }

  const handleReset = () => {
    setShowResults(false)
    setIsProcessing(false)
    setProgress(0)
    setStep(0)
  }

  return (
    <div className="flex flex-col gap-6 p-4 md:p-6 lg:p-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">AI Screening Matrix</h1>
          <p className="text-muted-foreground mt-1">
            {showResults 
              ? `Reviewing Top Matches for Selected Position`
              : `Orchestrate the automated evaluation of applicants against your job criteria.`
            }
          </p>
        </div>
        
        {showResults && (
          <Button 
            variant="outline" 
            className="w-fit gap-2 border-primary/20 hover:bg-primary/5"
            onClick={handleReset}
          >
            <IconArrowLeft size={18} /> New Assessment
          </Button>
        )}
      </div>

      {!isProcessing && !showResults && (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 animate-in slide-in-from-bottom-2 duration-500">
          <Card className="lg:col-span-2">
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline" className="text-primary border-primary/30 bg-primary/5">
                  <IconSparkles size={12} className="mr-1" /> Powered by Gemini
                </Badge>
              </div>
              <CardTitle>Initialize Evaluation</CardTitle>
              <CardDescription>
                Select an active job opening to begin the AI-driven screening process.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 text-foreground">
              <div className="space-y-2">
                <label className="text-sm font-medium">Target Job Opening</label>
                <Select onValueChange={setJobId} value={jobId || undefined}>
                  <SelectTrigger className="h-12 text-base">
                    <SelectValue placeholder="Select a job position..." />
                  </SelectTrigger>
                  <SelectContent>
                    {jobs.map((job) => (
                      <SelectItem key={job._id || job.id} value={(job._id || job.id)!}>
                        {job.title}
                      </SelectItem>
                    ))}
                    {jobs.length === 0 && !isLoadingJobs && (
                      <div className="p-2 text-sm text-muted-foreground">No jobs found</div>
                    )}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter className="border-t pt-6 gap-4">
              {hasPreviousResults && (
                <Button 
                  variant="outline"
                  className="flex-1 gap-2 h-14"
                  onClick={handleLoadPrevious}
                  disabled={!jobId}
                >
                  <IconBrain size={20} className="text-primary" /> View Previous Results
                </Button>
              )}
              <Button 
                className={`gap-2 text-lg h-14 shadow-lg shadow-primary/20 ${hasPreviousResults ? "flex-1" : "w-full"}`}
                disabled={!jobId}
                onClick={handleStartScreening}
              >
                <IconRocket size={20} /> {hasPreviousResults ? "Re-trigger AI Bio-Matrix" : "Initialize AI Matrix Assessment"}
              </Button>
            </CardFooter>
          </Card>

          <Card className="bg-primary/5 border-primary/20 bg-linear-to-br from-primary/5 to-transparent">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-primary">
                <IconBrain size={24} /> How it works
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm leading-relaxed">
              <p>
                Our AI engine performs a **multi-dimensional match analysis** between candidate profiles and your job requirements.
              </p>
              <ul className="space-y-3 list-none text-muted-foreground">
                <li className="flex items-start gap-2 italic">
                  <span className="text-primary font-bold">01.</span> Semantic skill gap analysis
                </li>
                <li className="flex items-start gap-2 italic">
                  <span className="text-primary font-bold">02.</span> Experience weight correlation
                </li>
                <li className="flex items-start gap-2 italic">
                  <span className="text-primary font-bold">03.</span> Project relevance scoring
                </li>
                <li className="flex items-start gap-2 italic">
                  <span className="text-primary font-bold">04.</span> Cultural alignment prediction
                </li>
              </ul>
              <div className="pt-4 p-4 rounded-lg bg-white/50 dark:bg-black/20 border border-primary/10">
                <p className="font-medium text-foreground flex items-center gap-2">
                  <IconCommand size={16} /> Leaderboard sorting logic
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Results are ranked by composite AI Score, then by years of critical experience.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {isProcessing && (
        <div className="flex flex-col items-center justify-center min-h-[400px] gap-8 animate-in zoom-in-95 duration-500">
          <div className="relative size-40">
             <div className="absolute inset-0 rounded-full border-4 border-primary/10 border-t-primary animate-spin" />
             <div className="absolute inset-4 rounded-full border-4 border-primary/5 border-b-primary/40 animate-spin [animation-duration:3s]" />
             <div className="absolute inset-0 flex items-center justify-center">
                <IconSparkles size={40} className="text-primary animate-pulse" />
             </div>
          </div>
          
          <div className="max-w-md w-full space-y-6 text-center">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold tracking-tight">{steps[step]}</h2>
              <p className="text-muted-foreground">{progress}% Complete</p>
            </div>
            
            <Progress value={progress} className="h-3 shadow-inner" />
            
            <div className="flex justify-center gap-2">
              {[0, 1, 2, 3, 4].map((i) => (
                <div 
                  key={i} 
                  className={`h-2 w-12 rounded-full transition-all duration-500 ${i <= step ? "bg-primary scale-110" : "bg-muted"}`} 
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {showResults && (
        <div className="space-y-6 animate-in slide-in-from-bottom-8 fade-in duration-700">
          <Leaderboard results={results} jobTitle={jobs.find(j => (j._id || j.id) === jobId)?.title || "Selected Job"} />
        </div>
      )}
    </div>
  )
}
