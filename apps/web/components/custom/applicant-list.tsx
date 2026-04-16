"use client"

import * as React from "react"
import { Applicant } from "@repo/shared"
import { Card, CardContent, CardHeader, CardTitle, CardAction } from "@/components/ui/card"
import { IconMapPin, IconMail, IconArrowRight, IconUser, IconLoader2, IconRefresh, IconEye } from "@tabler/icons-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

import { TalentDetailsSheet } from "@/components/custom/talent-details-sheet"

interface ApplicantListProps {
  applicants: Applicant[];
  isLoading: boolean;
  onRefresh: () => void;
}

export function ApplicantList({ applicants, isLoading, onRefresh }: ApplicantListProps) {
  const [selectedApplicant, setSelectedApplicant] = React.useState<Applicant | null>(null)
  const [isDetailsOpen, setIsDetailsOpen] = React.useState(false)

  const handleViewProfile = (applicant: Applicant) => {
    setSelectedApplicant(applicant)
    setIsDetailsOpen(true)
  }

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
        <IconLoader2 className="animate-spin text-primary" size={40} />
        <p className="text-muted-foreground animate-pulse font-medium">Synchronizing talent database...</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <TalentDetailsSheet 
        applicant={selectedApplicant} 
        open={isDetailsOpen} 
        onOpenChange={setIsDetailsOpen} 
      />
      
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Active Talent Pool</h2>
          <p className="text-muted-foreground text-sm">
            {applicants.length} candidates associated with this position.
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={onRefresh} className="gap-2">
           <IconRefresh size={16} /> Refresh
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-1 xl:grid-cols-2">
        {applicants.map((applicant) => (
          <Card key={applicant._id || applicant.id} className="group hover:border-primary/50 transition-all shadow-sm min-w-0">
            <CardHeader className="pb-3">
              <div className="flex gap-3 min-w-0">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  <IconUser size={20} />
                </div>
                <div className="min-w-0 flex-1">
                  <CardTitle className="text-lg truncate font-bold" title={`${applicant.firstName} ${applicant.lastName}`}>
                    {applicant.firstName} {applicant.lastName}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground font-medium truncate" title={applicant.headline}>
                    {applicant.headline}
                  </p>
                </div>
              </div>
              <CardAction>
                <Badge variant="secondary" className="bg-primary/5 text-primary border-primary/10 shrink-0 whitespace-nowrap">
                  {applicant.availability?.status || "Active"}
                </Badge>
              </CardAction>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex flex-wrap gap-2">
                {(applicant.skills || []).slice(0, 3).map((skill, i) => (
                  <Badge key={i} variant="outline" className="text-[10px] uppercase tracking-wider">
                    {skill.name}
                  </Badge>
                ))}
                {(applicant.skills || []).length > 3 && (
                   <span className="text-[10px] text-muted-foreground flex items-center">+{(applicant.skills || []).length - 3} more</span>
                )}
              </div>
              
              <div className="flex items-center justify-between pt-2 border-t text-sm text-muted-foreground gap-2">
                <div className="flex items-center gap-3 min-w-0 flex-1">
                   <span className="flex items-center gap-1 truncate" title={applicant.location}>
                     <IconMapPin size={14} className="shrink-0" /> {applicant.location}
                   </span>
                   <span className="hidden sm:flex items-center gap-1 truncate" title={applicant.email}>
                     <IconMail size={14} className="shrink-0" /> {applicant.email.split('@')[0]}...
                   </span>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-8 px-2 group-hover:text-primary transition-colors flex items-center shrink-0"
                  onClick={() => handleViewProfile(applicant)}
                >
                  <span className="hidden sm:inline mr-2">View Profile</span> <IconEye size={16} />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}

        {applicants.length === 0 && (
          <div className="col-span-full py-20 text-center border-2 border-dashed rounded-xl bg-muted/30">
            <IconUser className="mx-auto text-muted-foreground/50 mb-4" size={48} />
            <h3 className="text-lg font-medium text-muted-foreground">No applicants yet</h3>
            <p className="text-sm text-muted-foreground/70 max-w-sm mx-auto mt-1">
              Start by uploading resumes or manually entering candidate data using the tabs on the left.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
