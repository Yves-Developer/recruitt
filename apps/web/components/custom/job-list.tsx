"use client"

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
import { IconDots, IconEye, IconTrash, IconLoader2 } from "@tabler/icons-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Job } from "@repo/shared"

interface JobListProps {
  jobs: Job[];
  isLoading: boolean;
}

export function JobList({ jobs, isLoading }: JobListProps) {
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center p-12 border rounded-xl bg-card gap-4">
        <IconLoader2 className="animate-spin text-primary" size={32} />
        <p className="text-muted-foreground animate-pulse">Loading active vacancies...</p>
      </div>
    )
  }

  return (
    <div className="rounded-xl border bg-card">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead className="w-[300px]">Position</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Technicals</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {jobs.map((job) => (
            <TableRow key={job.id} className="group transition-colors">
              <TableCell className="font-medium">
                {job.title}
              </TableCell>
              <TableCell>
                <Badge 
                  variant={job.status === "open" ? "default" : "secondary"}
                  className={job.status === "open" ? "bg-primary/20 text-primary hover:bg-primary/30" : ""}
                >
                  {job.status || "open"}
                </Badge>
              </TableCell>
              <TableCell>
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
                    <DropdownMenuItem className="gap-2">
                      <IconEye size={14} /> View Details
                    </DropdownMenuItem>
                    <DropdownMenuItem className="gap-2 text-destructive">
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
  )
}
