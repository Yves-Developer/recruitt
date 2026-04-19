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

  const isBulkFile = file && (file.name.endsWith('.csv') || file.name.endsWith('.xlsx'))

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
      formData.append(isBulkFile ? "file" : "resume", file)
      formData.append("jobId", jobId)

      setProgress(60)
      setStatus("parsing")
      
      if (isBulkFile) {
        const res = await api.uploadBulk(formData)
        toast.success(`Done! ${res.count} applicants added.`)
      } else {
        await api.uploadResume(formData)
        toast.success("Resume uploaded and read successfully.")
      }
      
      setProgress(100)
      setStatus("complete")
      setIsUploading(false)
      onSuccess?.()
    } catch (error: any) {
      setIsUploading(false)
      setStatus("idle")
      toast.error(error.message || "Failed to upload and parse data")
    }
  }

  return (
    <Card className="w-full border-dashed border-2 bg-card/50">
      <CardHeader>
        <CardTitle>{isBulkFile ? "Add multiple applicants" : "Upload resume"}</CardTitle>
        <CardDescription>
          {isBulkFile 
            ? "Upload a spreadsheet (CSV/XLSX). We'll automatically add each person to your list."
            : "Upload PDF resumes or spreadsheets. We'll automatically find the details for you."
          }
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
              <p className="text-sm text-muted-foreground">PDF, CSV, XLSX up to 10MB</p>
            </div>
            <input
              type="file"
              className="hidden"
              id="resume-upload"
              accept=".pdf,.csv,.xlsx"
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
                  <span>{status === "uploading" ? "Uploading..." : (isBulkFile ? "Reading rows..." : "Reading experience...")}</span>
                  <span>{progress}%</span>
                </div>
                <Progress value={progress} className="h-2" />
                {status === "parsing" && (
                  <p className="text-center text-xs text-muted-foreground animate-pulse mt-2">
                    Finding the right information...
                  </p>
                )}
              </div>
            )}

            {!isUploading && status !== "complete" && (
              <div className="flex gap-2 justify-end">
                <Button variant="ghost" onClick={() => setFile(null)}>Cancel</Button>
                <Button onClick={startUpload}>Start {isBulkFile ? "adding applicants" : "reading resume"}</Button>
              </div>
            )}

            {status === "complete" && (
              <Button variant="outline" className="w-full" onClick={() => {setFile(null); setStatus("idle")}}>
                Process Another File
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
