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
import { IconDots, IconEye, IconTrash } from "@tabler/icons-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const mockJobs = [
  {
    id: "1",
    title: "Senior Fullstack Engineer",
    status: "Open",
    applicants: 24,
    postedAt: "2 days ago",
  },
  {
    id: "2",
    title: "AI Product Manager",
    status: "Open",
    applicants: 12,
    postedAt: "5 days ago",
  },
  {
    id: "3",
    title: "UX Designer",
    status: "Closed",
    applicants: 45,
    postedAt: "1 week ago",
  },
  {
    id: "4",
    title: "Marketing Lead",
    status: "Open",
    applicants: 8,
    postedAt: "3 hours ago",
  },
]

export function JobList() {
  return (
    <div className="rounded-xl border bg-card">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead className="w-[300px]">Position</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Applicants</TableHead>
            <TableHead>Posted</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockJobs.map((job) => (
            <TableRow key={job.id} className="group transition-colors">
              <TableCell className="font-medium">
                {job.title}
              </TableCell>
              <TableCell>
                <Badge 
                  variant={job.status === "Open" ? "default" : "secondary"}
                  className={job.status === "Open" ? "bg-primary/20 text-primary hover:bg-primary/30" : ""}
                >
                  {job.status}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">{job.applicants}</span>
                  <span className="text-muted-foreground text-xs">candidates</span>
                </div>
              </TableCell>
              <TableCell className="text-muted-foreground">
                {job.postedAt}
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
        </TableBody>
      </Table>
    </div>
  )
}
