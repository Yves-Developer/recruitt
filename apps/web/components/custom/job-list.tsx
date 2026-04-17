"use client"

import * as React from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { IconDots, IconEye, IconTrash, IconLoader2, IconPencil } from "@tabler/icons-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Job } from "@repo/shared"
import { api } from "@/lib/api"
import { toast } from "sonner"
import { CreateJobDialog } from "./create-job-dialog"
import { JobDetailsDialog } from "./job-details-dialog"

interface JobListProps {
  jobs: Job[];
  isLoading: boolean;
  onUpdate: () => void;
}

export function JobList({ jobs, isLoading, onUpdate }: JobListProps) {
  const [currentPage, setCurrentPage] = React.useState(1);
  const pageSize = 5;
  const totalPages = Math.ceil(jobs.length / pageSize);
  
  const paginatedJobs = jobs.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this job opening?")) return;
    try {
      await api.deleteJob(id);
      toast.success("Job deleted successfully");
      onUpdate();
    } catch (error) {
      toast.error("Failed to delete job");
    }
  }

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center p-12 border rounded-xl bg-card gap-4">
        <IconLoader2 className="animate-spin text-primary" size={32} />
        <p className="text-muted-foreground animate-pulse">Loading active vacancies...</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="rounded-xl border bg-card overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="w-full md:w-[300px]">Position</TableHead>
              <TableHead className="hidden md:table-cell">Status</TableHead>
              <TableHead className="hidden lg:table-cell">Technicals</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedJobs.map((job) => (
              <TableRow key={job._id || job.id} className="group transition-colors">
                <TableCell className="font-medium">
                  <div className="flex flex-col gap-1">
                    <JobDetailsDialog 
                      job={job}
                      trigger={
                        <button className="hover:text-primary transition-colors text-left font-semibold">
                          {job.title}
                        </button>
                      }
                    />
                    <div className="flex items-center gap-2 md:hidden">
                      <Badge 
                        variant={job.status === "open" ? "default" : "secondary"}
                        className={cn(
                          "text-[10px] px-1.5 h-4",
                          job.status === "open" ? "bg-primary/20 text-primary hover:bg-primary/30" : ""
                        )}
                      >
                        {job.status || "open"}
                      </Badge>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  <Badge 
                    variant={job.status === "open" ? "default" : "secondary"}
                    className={job.status === "open" ? "bg-primary/20 text-primary hover:bg-primary/30" : ""}
                  >
                    {job.status || "open"}
                  </Badge>
                </TableCell>
                <TableCell className="hidden lg:table-cell">
                  <div className="flex flex-wrap gap-1">
                    {job.skills.slice(0, 3).map((skill) => (
                      <Badge key={skill} variant="outline" className="text-[10px] px-1.5 py-0 border-primary/20">
                        {skill}
                      </Badge>
                    ))}
                    {job.skills.length > 3 && (
                      <span className="text-[10px] text-muted-foreground">+{job.skills.length - 3} more</span>
                    )}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <IconDots size={16} />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <JobDetailsDialog 
                        job={job} 
                        trigger={
                          <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="gap-2 cursor-pointer">
                            <IconEye size={14} /> View Details
                          </DropdownMenuItem>
                        }
                      />
                      <CreateJobDialog 
                        job={job} 
                        onSuccess={onUpdate} 
                        trigger={
                          <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="gap-2 cursor-pointer">
                            <IconPencil size={14} /> Edit Details
                          </DropdownMenuItem>
                        }
                      />
                      <DropdownMenuItem 
                        className="gap-2 text-destructive cursor-pointer"
                        onClick={() => handleDelete((job._id || job.id)!)}
                      >
                        <IconTrash size={14} /> Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
            {jobs.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} className="h-24 text-center text-muted-foreground">
                  No job openings found. Create one to get started.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between px-2 pt-4">
          <p className="text-xs text-muted-foreground font-medium">
            Page {currentPage} of {totalPages}
          </p>
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="h-8 text-xs px-3"
            >
              Previous
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="h-8 text-xs px-3"
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
