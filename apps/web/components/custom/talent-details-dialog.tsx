"use client"

import * as React from "react"
import { Applicant } from "@repo/shared"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { IconMapPin, IconMail, IconBriefcase, IconSchool, IconRocket, IconCertificate, IconLanguage, IconBrandLinkedin, IconBrandGithub, IconWorld } from "@tabler/icons-react"
import { Separator } from "@/components/ui/separator"

interface TalentDetailsDialogProps {
  applicant: Applicant | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function TalentDetailsDialog({ applicant, open, onOpenChange }: TalentDetailsDialogProps) {
  if (!applicant) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl h-[85vh] p-0 overflow-hidden flex flex-col border-primary/20 bg-card">
        <div className="bg-primary/5 p-6 border-b shrink-0">
          <DialogHeader className="flex flex-row items-start justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-3">
                 <h2 className="text-3xl font-bold tracking-tight">{applicant.firstName} {applicant.lastName}</h2>
                 <Badge className="bg-primary/20 text-primary border-primary/20">{applicant.availability.status}</Badge>
              </div>
              <p className="text-xl text-muted-foreground font-medium">{applicant.headline}</p>
              <div className="flex flex-wrap gap-4 pt-2 text-sm text-muted-foreground">
                 <span className="flex items-center gap-1.5"><IconMapPin size={16} /> {applicant.location}</span>
                 <span className="flex items-center gap-1.5"><IconMail size={16} /> {applicant.email}</span>
                 <span className="flex items-center gap-1.5"><IconBriefcase size={16} /> {applicant.availability.type}</span>
              </div>
            </div>
          </DialogHeader>
          
          <div className="flex gap-3 mt-6">
            {applicant.socialLinks?.linkedin && (
              <a href={applicant.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-background border hover:bg-muted transition-colors">
                <IconBrandLinkedin size={20} className="text-primary" />
              </a>
            )}
            {applicant.socialLinks?.github && (
              <a href={applicant.socialLinks.github} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-background border hover:bg-muted transition-colors">
                <IconBrandGithub size={20} />
              </a>
            )}
            {applicant.socialLinks?.portfolio && (
              <a href={applicant.socialLinks.portfolio} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-background border hover:bg-muted transition-colors">
                <IconWorld size={20} />
              </a>
            )}
          </div>
        </div>

        <ScrollArea className="flex-1 p-6">
          <div className="space-y-10">
            {/* Bio */}
            {applicant.bio && (
              <section>
                <div className="flex items-center gap-2 mb-3 text-primary uppercase text-xs font-bold tracking-widest">
                  <IconUser size={16} /> Bio & Summary
                </div>
                <p className="text-muted-foreground leading-relaxed">{applicant.bio}</p>
              </section>
            )}

            {/* Skills */}
            <section>
               <div className="flex items-center gap-2 mb-4 text-primary uppercase text-xs font-bold tracking-widest">
                  <IconRocket size={16} /> Expertised Technical Stack
               </div>
               <div className="flex flex-wrap gap-2">
                 {applicant.skills.map((skill, i) => (
                   <div key={i} className="flex flex-col gap-1 p-3 rounded-xl border bg-muted/30 min-w-32">
                     <span className="font-semibold text-sm">{skill.name}</span>
                     <div className="flex justify-between items-center text-[10px] text-muted-foreground font-bold">
                        <span>{skill.level}</span>
                        <span>{skill.yearsOfExperience}y exp</span>
                     </div>
                   </div>
                 ))}
               </div>
            </section>

            {/* Experience */}
            <section className="space-y-6">
               <div className="flex items-center gap-2 mb-4 text-primary uppercase text-xs font-bold tracking-widest">
                  <IconBriefcase size={16} /> Career Trajectory
               </div>
               <div className="space-y-8 relative before:absolute before:inset-y-0 before:left-3 before:w-px before:bg-border">
                  {applicant.experience.map((exp, i) => (
                    <div key={i} className="relative pl-10">
                      <div className="absolute left-0 top-1 size-6 rounded-full border bg-background flex items-center justify-center text-primary z-10 shadow-sm">
                         <div className="size-2 rounded-full bg-current" />
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-bold text-lg">{exp.role}</h4>
                          <span className="text-xs bg-muted border px-2 py-1 rounded text-muted-foreground font-mono font-bold">
                             {exp.startDate} - {exp.endDate || "Present"}
                          </span>
                        </div>
                        <p className="text-primary font-medium">{exp.company}</p>
                        <p className="text-sm text-muted-foreground py-2 leading-relaxed">{exp.description}</p>
                        <div className="flex flex-wrap gap-1.5 pt-2">
                           {exp.technologies?.map((tech, j) => (
                             <Badge key={j} variant="outline" className="text-[10px] px-2 opacity-70">{tech}</Badge>
                           ))}
                        </div>
                      </div>
                    </div>
                  ))}
               </div>
            </section>

            {/* Projects */}
            {applicant.projects?.length > 0 && (
              <section className="space-y-6">
                <div className="flex items-center gap-2 mb-4 text-primary uppercase text-xs font-bold tracking-widest">
                    <IconRocket size={16} /> Portfolio & Projects
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                    {applicant.projects.map((proj, i) => (
                      <div key={i} className="p-4 rounded-xl border bg-muted/20 hover:bg-muted/40 transition-colors">
                        <div className="flex justify-between items-start mb-2">
                           <h4 className="font-bold">{proj.name}</h4>
                           {proj.link && <a href={proj.link} target="_blank"><IconWorld size={14} className="hover:text-primary transition-colors" /></a>}
                        </div>
                        <p className="text-xs text-muted-foreground mb-3">{proj.description}</p>
                        <div className="flex flex-wrap gap-1">
                           {proj.technologies?.map((t, j) => (
                             <span key={j} className="text-[9px] font-bold text-primary/80">#{t}</span>
                           ))}
                        </div>
                      </div>
                    ))}
                </div>
              </section>
            )}

            {/* Education & Certs */}
            <div className="grid gap-8 md:grid-cols-2">
              <section>
                 <div className="flex items-center gap-2 mb-4 text-primary uppercase text-xs font-bold tracking-widest">
                    <IconSchool size={16} /> Academic Background
                 </div>
                 <div className="space-y-4">
                    {applicant.education.map((edu, i) => (
                      <div key={i} className="border-l-2 border-primary/30 pl-3">
                        <p className="font-bold text-sm">{edu.degree}</p>
                        <p className="text-xs text-primary">{edu.institution} • {edu.fieldOfStudy}</p>
                        <p className="text-[10px] text-muted-foreground font-bold">{edu.startYear} - {edu.endYear || "N/A"}</p>
                      </div>
                    ))}
                 </div>
              </section>

              <section>
                 <div className="flex items-center gap-2 mb-4 text-primary uppercase text-xs font-bold tracking-widest">
                    <IconCertificate size={16} /> Credentials
                 </div>
                 <div className="space-y-3">
                    {applicant.certifications?.map((cert, i) => (
                      <div key={i} className="text-sm p-3 rounded-lg border bg-muted/10">
                        <p className="font-bold">{cert.name}</p>
                        <p className="text-xs text-muted-foreground">{cert.issuer} • {cert.issueDate}</p>
                      </div>
                    ))}
                 </div>
              </section>
            </div>

            {/* Languages */}
            <section>
               <div className="flex items-center gap-2 mb-4 text-primary uppercase text-xs font-bold tracking-widest">
                  <IconLanguage size={16} /> Language Proficiency
               </div>
               <div className="flex flex-wrap gap-6">
                  {applicant.languages?.map((lang, i) => (
                    <div key={i} className="flex flex-col">
                       <span className="font-bold text-sm">{lang.name}</span>
                       <span className="text-xs text-primary font-medium">{lang.proficiency}</span>
                    </div>
                  ))}
               </div>
            </section>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}

const IconUser = ({ size, className }: { size?: number, className?: string }) => (
  <svg 
    width={size || 24} 
    height={size || 24} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);
