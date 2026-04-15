"use client"

import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { IconCloudUpload, IconFileText, IconLoader2, IconCircleCheck } from "@tabler/icons-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { toast } from "sonner"

import { api } from "@/lib/api"

interface ApplicantUploadProps {
  jobId: string;
  onSuccess?: () => void;
}

export function ApplicantUpload({ jobId, onSuccess }: ApplicantUploadProps) {
  const [isUploading, setIsUploading] = React.useState(false)
  const [file, setFile] = React.useState<File | null>(null)
  const [progress, setProgress] = React.useState(0)
  const [status, setStatus] = React.useState<"idle" | "uploading" | "parsing" | "complete">("idle")

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
      setStatus("idle")
    }
  }

  const startUpload = async () => {
    if (!file || !jobId) return

    setIsUploading(true)
    setStatus("uploading")
    setProgress(30)

    try {
      const formData = new FormData()
      formData.append("resume", file)
      formData.append("jobId", jobId)

      setProgress(60)
      setStatus("parsing")
      
      await api.uploadResume(formData)
      
      setProgress(100)
      setStatus("complete")
      setIsUploading(false)
      toast.success("Resume parsed successfully! Talent profile created.")
      onSuccess?.()
    } catch (error: any) {
      setIsUploading(false)
      setStatus("idle")
      toast.error(error.message || "Failed to upload and parse resume")
    }
  }

  return (
    <Card className="w-full border-dashed border-2 bg-card/50">
      <CardHeader>
        <CardTitle>AI Resume Parser</CardTitle>
        <CardDescription>
          Upload a PDF or DOCX file. Our AI will automatically extract experience, skills, and education.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center py-12">
        {!file ? (
          <div className="flex flex-col items-center gap-4">
            <div className="p-6 rounded-full bg-primary/10 text-primary">
              <IconCloudUpload size={48} />
            </div>
            <div className="text-center">
              <p className="font-medium">Click to upload or drag and drop</p>
              <p className="text-sm text-muted-foreground">PDF, DOCX up to 10MB</p>
            </div>
            <input
              type="file"
              className="hidden"
              id="resume-upload"
              accept=".pdf,.docx"
              onChange={handleFileChange}
            />
            <Button asChild variant="outline">
              <label htmlFor="resume-upload" className="cursor-pointer">Select File</label>
            </Button>
          </div>
        ) : (
          <div className="w-full flex flex-col gap-6">
            <div className="flex items-center gap-4 bg-muted/50 p-4 rounded-lg border">
              <div className="p-2 rounded bg-primary/20 text-primary">
                <IconFileText size={24} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">{file.name}</p>
                <p className="text-xs text-muted-foreground">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
              </div>
              {status === "complete" && (
                <IconCircleCheck className="text-green-500" size={24} />
              )}
            </div>

            {isUploading && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>{status === "uploading" ? "Uploading..." : "AI Parsing Experience..."}</span>
                  <span>{progress}%</span>
                </div>
                <Progress value={progress} className="h-2" />
                {status === "parsing" && (
                  <p className="text-center text-xs text-muted-foreground animate-pulse mt-2">
                    Gemini FLASH is analyzing the document structure...
                  </p>
                )}
              </div>
            )}

            {!isUploading && status !== "complete" && (
              <div className="flex gap-2 justify-end">
                <Button variant="ghost" onClick={() => setFile(null)}>Cancel</Button>
                <Button onClick={startUpload}>Start AI Ingestion</Button>
              </div>
            )}

            {status === "complete" && (
              <Button variant="outline" className="w-full" onClick={() => {setFile(null); setStatus("idle")}}>
                Upload Another
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
