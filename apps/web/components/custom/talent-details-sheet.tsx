"use client"

import * as React from "react"
import { Applicant } from "@repo/shared"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { IconMapPin, IconMail, IconBriefcase, IconSchool, IconRocket, IconCertificate, IconLanguage, IconBrandLinkedin, IconBrandGithub, IconWorld, IconExternalLink } from "@tabler/icons-react"
import { Separator } from "@/components/ui/separator"

interface TalentDetailsSheetProps {
  applicant: Applicant | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function TalentDetailsSheet({ applicant, open, onOpenChange }: TalentDetailsSheetProps) {
  React.useEffect(() => {
    if (open && applicant) {
      console.log("Sheet Applicant Data:", applicant);
    }
  }, [open, applicant]);

  if (!applicant) return null;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:w-[540px] md:w-[650px] p-0 flex flex-col border-l bg-background shadow-2xl">
        {/* ... existing header ... */}
        <div className="p-10 pb-6 shrink-0">
          <SheetHeader className="text-left space-y-4">
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <SheetTitle className="text-4xl font-semibold tracking-tight">
                  {applicant.firstName} {applicant.lastName}
                </SheetTitle>
                <p className="text-xl text-primary/80 font-medium">
                  {applicant.headline}
                </p>
              </div>
              <Badge variant="outline" className="text-xs font-semibold py-1">
                {applicant.availability?.status || "Open to Opportunities"}
              </Badge>
            </div>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-muted-foreground pt-2">
              <span className="flex items-center gap-1.5"><IconMapPin size={16} /> {applicant.location}</span>
              <span className="flex items-center gap-1.5"><IconMail size={16} /> {applicant.email}</span>
              <div className="flex items-center gap-3 ml-2 border-l pl-6">
                {applicant.socialLinks?.linkedin && <a href={applicant.socialLinks.linkedin} target="_blank" className="hover:text-primary transition-colors"><IconBrandLinkedin size={20} /></a>}
                {applicant.socialLinks?.github && <a href={applicant.socialLinks.github} target="_blank" className="hover:text-primary transition-colors"><IconBrandGithub size={20} /></a>}
                {applicant.socialLinks?.portfolio && <a href={applicant.socialLinks.portfolio} target="_blank" className="hover:text-primary transition-colors"><IconWorld size={20} /></a>}
              </div>
            </div>
          </SheetHeader>
        </div>

        <Separator />

        <div className="flex-1 overflow-y-auto">
          <div className="p-10 space-y-12">

            {/* Summary */}
            {applicant.bio && (
              <section>
                <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">About</h4>
                <p className="text-muted-foreground leading-relaxed max-w-2xl">{applicant.bio}</p>
              </section>
            )}

            {/* Experience */}
            <section className="space-y-6">
              <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">Work Experience</h4>
              <div className="space-y-10 relative left-1 before:absolute before:inset-y-0 before:left-[-1rem] before:w-[1px] before:bg-border">
                {(applicant.experience || []).length > 0 ? (
                  (applicant.experience || []).map((exp, i) => (
                    <div key={i} className="relative pl-6">
                      <div className="absolute left-[-1.25rem] top-1.5 size-2 rounded-full bg-primary" />
                      <div className="flex justify-between items-start mb-1">
                        <h5 className="font-bold text-lg">{exp.role}</h5>
                        <span className="text-xs text-muted-foreground font-medium">{exp.startDate} — {exp.endDate || "Present"}</span>
                      </div>
                      <p className="text-primary/70 font-semibold text-sm mb-3">{exp.company}</p>
                      <p className="text-sm text-muted-foreground leading-relaxed mb-4">{exp.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {exp.technologies?.map((tech, j) => (
                          <span key={j} className="text-[10px] px-2 py-0.5 rounded border bg-muted/30 text-muted-foreground uppercase tracking-tight">{tech}</span>
                        ))}
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-muted-foreground italic pl-6">No experience records found.</p>
                )}
              </div>
            </section>

            {/* Combined Skills & Info */}
            <div className="grid md:grid-cols-2 gap-12 pt-4">
              <section>
                <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-6">Expertise</h4>
                <div className="flex flex-wrap gap-2">
                  {(applicant.skills || []).length > 0 ? (
                    (applicant.skills || []).map((skill, i) => (
                      <div key={i} className="px-3 py-1.5 rounded-lg border text-sm font-medium hover:bg-muted/50 transition-colors">
                        {skill.name} <span className="text-[10px] text-muted-foreground ml-1.5">{skill.yearsOfExperience}y</span>
                      </div>
                    ))
                  ) : (
                    <p className="text-xs text-muted-foreground italic">No technical skills listed.</p>
                  )}
                </div>
              </section>

              <section>
                <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-6">Academic Background</h4>
                <div className="space-y-6">
                  {(applicant.education || []).length > 0 ? (
                    (applicant.education || []).map((edu, i) => (
                      <div key={i} className="space-y-1">
                        <p className="font-bold text-sm">{edu.degree}</p>
                        <p className="text-xs text-muted-foreground">{edu.institution} • {edu.fieldOfStudy}</p>
                        <p className="text-[10px] text-muted-foreground opacity-60 uppercase">{edu.startYear} - {edu.endYear || "Ongoing"}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-xs text-muted-foreground italic">No academic history provided.</p>
                  )}
                </div>
              </section>
            </div>

            {/* Projects Section */}
            {(applicant.projects || []).length > 0 && (
              <section>
                <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-6">Key Projects</h4>
                <div className="grid sm:grid-cols-2 gap-4">
                  {(applicant.projects || []).map((proj, i) => (
                    <div key={i} className="p-5 rounded-xl border group hover:border-primary/50 transition-all">
                      <div className="flex justify-between items-center mb-2">
                        <h5 className="font-bold text-sm">{proj.name}</h5>
                        {proj.link && <a href={proj.link} target="_blank"><IconExternalLink size={14} className="text-muted-foreground hover:text-primary" /></a>}
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed mb-3">{proj.description}</p>
                      <div className="flex flex-wrap gap-1">
                        {proj.technologies?.map((t, j) => (
                          <span key={j} className="text-[9px] text-primary/70 font-bold">#{t}</span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Footer metadata */}
            <div className="pt-8 border-t flex flex-wrap gap-10">
              <div>
                <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground mb-3">Languages</h4>
                <div className="flex flex-wrap gap-4">
                  {(applicant.languages || []).length > 0 ? (
                    (applicant.languages || []).map((l, i) => (
                      <span key={i} className="text-sm font-medium">{l.name} <span className="text-[10px] text-muted-foreground opacity-60">({l.proficiency})</span></span>
                    ))
                  ) : (
                    <span className="text-xs text-muted-foreground">Not specified</span>
                  )}
                </div>
              </div>
              {(applicant.certifications || []).length > 0 && (
                <div>
                  <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground mb-3">Certificates</h4>
                  <div className="flex flex-wrap gap-4">
                    {applicant.certifications?.map((c, i) => (
                      <span key={i} className="text-sm font-medium">{c.name}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
