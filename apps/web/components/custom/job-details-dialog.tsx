"use client"

import * as React from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Job } from "@repo/shared"
import { IconBriefcase, IconMapPin, IconCalendar, IconCircleCheck } from "@tabler/icons-react"

interface JobDetailsDialogProps {
  job: Job;
  trigger?: React.ReactNode;
}

export function JobDetailsDialog({ job, trigger }: JobDetailsDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-2 mb-2">
            <Badge variant={job.status === "open" ? "default" : "secondary"}>
              {job.status || "open"}
            </Badge>
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              <IconCalendar size={12} />
              Posted on {new Date(job.createdAt || Date.now()).toLocaleDateString()}
            </span>
          </div>
          <DialogTitle className="text-2xl font-bold">{job.title}</DialogTitle>
          <div className="flex items-center gap-4 text-muted-foreground mt-1">
            <span className="flex items-center gap-1 text-sm">
              <IconMapPin size={16} />
              {job.location}
            </span>
            <span className="flex items-center gap-1 text-sm">
              <IconBriefcase size={16} />
              Full-time
            </span>
          </div>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <section>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-2">Description</h4>
            <p className="text-sm leading-relaxed whitespace-pre-wrap">{job.description}</p>
          </section>

          <section>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-2">Key Requirements</h4>
            <ul className="space-y-2">
              {job.requirements.map((req, i) => (
                <li key={i} className="flex gap-2 text-sm items-start">
                  <IconCircleCheck size={18} className="text-primary mt-0.5 shrink-0" />
                  <span>{req}</span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-2">Skills & Technologies</h4>
            <div className="flex flex-wrap gap-2">
              {job.skills.map((skill) => (
                <Badge key={skill} variant="secondary" className="bg-secondary/50">
                  {skill}
                </Badge>
              ))}
            </div>
          </section>
        </div>
      </DialogContent>
    </Dialog>
  )
}
