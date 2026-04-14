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
import { IconBrain, IconCpu, IconRocket, IconLoader2, IconSparkles } from "@tabler/icons-react"
import { Progress } from "@/components/ui/progress"
import { toast } from "sonner"
import { Badge } from "@/components/ui/badge"
import { Leaderboard } from "@/components/custom/leaderboard"

export default function ScreeningPage() {
  const [jobId, setJobId] = React.useState<string>("")
  const [isProcessing, setIsProcessing] = React.useState(false)
  const [step, setStep] = React.useState(0)
  const [progress, setProgress] = React.useState(0)

  const steps = [
    "Fetching applicant profiles...",
    "Embedding semantic vectors...",
    "Running Gemini LLM Analysis...",
    "Calculating match scores...",
    "Finalizing leaderboard rankings..."
  ]

  const handleStartScreening = () => {
    if (!jobId) {
      toast.error("Please select a job to screen for.")
      return
    }

    setIsProcessing(true)
    setStep(0)
    setProgress(0)

    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + 1
        if (next % 20 === 0 && next < 100) {
          setStep((s) => s + 1)
        }
        if (next >= 100) {
          clearInterval(interval)
          setTimeout(() => {
            setIsProcessing(false)
            toast.success("AI Matrix Assessment complete!")
          }, 500)
          return 100
        }
        return next
      })
    }, 100)
  }

  return (
    <div className="flex flex-col gap-6 p-4 md:p-6 lg:p-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">AI Screening Matrix</h1>
        <p className="text-muted-foreground mt-1">
          Orchestrate the automated evaluation of applicants against your job criteria.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="outline" className="text-primary border-primary/30 bg-primary/5">
                <IconSparkles size={12} className="mr-1" /> Powered by Gemini Flash
              </Badge>
            </div>
            <CardTitle>Initialize Evaluation</CardTitle>
            <CardDescription>
              Select an active job opening to begin the AI-driven screening process.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Target Job Opening</label>
              <Select onValueChange={setJobId}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a job position..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="job-1">Senior Fullstack Engineer</SelectItem>
                  <SelectItem value="job-2">AI Product Manager</SelectItem>
                  <SelectItem value="job-4">Marketing Lead</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {isProcessing && (
              <div className="p-6 rounded-xl bg-muted/30 border space-y-4">
                <div className="flex justify-between items-center text-sm">
                  <span className="font-medium flex items-center gap-2">
                    <IconLoader2 className="animate-spin text-primary" size={16} />
                    {steps[step]}
                  </span>
                  <span className="text-muted-foreground">{progress}%</span>
                </div>
                <Progress value={progress} className="h-2" />
                <div className="flex gap-1">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <div 
                      key={i} 
                      className={`h-1 flex-1 rounded-full transition-colors ${i <= step ? "bg-primary" : "bg-muted"}`} 
                    />
                  ))}
                </div>
              </div>
            )}
          </CardContent>
          <CardFooter className="border-t pt-6">
            <Button 
              className="w-full gap-2 text-lg h-12" 
              disabled={isProcessing || !jobId}
              onClick={handleStartScreening}
            >
              {isProcessing ? (
                <>Evaluating Candidates...</>
              ) : (
                <>
                  <IconRocket size={20} /> Initialize AI Matrix Assessment
                </>
              )}
            </Button>
          </CardFooter>
        </Card>

        <Card className="bg-primary/5 border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <IconBrain className="text-primary" /> How it works
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm leading-relaxed">
            <p>
              Our AI engine performs a **multi-dimensional match analysis** between candidate profiles and your job requirements.
            </p>
            <ul className="space-y-2 list-disc pl-4 text-muted-foreground">
              <li>Semantic skill gap analysis</li>
              <li>Experience weight correlation</li>
              <li>Project relevance scoring</li>
              <li>Cultural alignment prediction</li>
            </ul>
            <p className="font-medium text-foreground">
              Results are sorted by match score and presented in the Leaderboard.
            </p>
          </CardContent>
        </Card>

        {progress === 100 && !isProcessing && (
          <div className="lg:col-span-3 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <Leaderboard />
          </div>
        )}
      </div>
    </div>
  )
}
