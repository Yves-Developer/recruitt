"use client"

import * as React from "react"
import { useForm, useFieldArray } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Field,
  FieldContent,
  FieldError,
  FieldLabel,
} from "@/components/ui/field"
import { IconPlus, IconTrash, IconUser, IconBriefcase, IconCode } from "@tabler/icons-react"
import { toast } from "sonner"
import { Separator } from "@/components/ui/separator"

import { api } from "@/lib/api"
import { Applicant } from "@repo/shared"

const manualApplicantSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email"),
  headline: z.string().min(2, "Headline is required"),
  location: z.string().min(2, "Location is required"),
  summary: z.string().optional(),
  experience: z.array(z.object({
    role: z.string().min(1, "Role is required"),
    company: z.string().min(1, "Company is required"),
    description: z.string().min(1, "Description is required"),
    startDate: z.string().min(1, "Start date is required"),
    isCurrent: z.boolean(),
  })).min(1, "Add at least one experience"),
  education: z.array(z.object({
    institution: z.string().min(1, "Institution is required"),
    degree: z.string().min(1, "Degree is required"),
    fieldOfStudy: z.string().min(1, "Field of study is required"),
    startYear: z.number().min(1900),
  })).min(1, "Add at least one education"),
  projects: z.array(z.object({
    name: z.string().min(1, "Project name is required"),
    description: z.string().min(1, "Description is required"),
    role: z.string().min(1, "Role is required"),
    startDate: z.string().min(1, "Start date is required"),
  })).min(1, "Add at least one project"),
  languages: z.string().optional(),
  linkedin: z.string().url().optional().or(z.literal("")),
  github: z.string().url().optional().or(z.literal("")),
  skills: z.string().min(1, "Add at least one skill"),
})

type ManualApplicantFormValues = z.infer<typeof manualApplicantSchema>

interface ApplicantManualFormProps {
  jobId: string;
  onSuccess?: () => void;
}

export function ApplicantManualForm({ jobId, onSuccess }: ApplicantManualFormProps) {
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const form = useForm<ManualApplicantFormValues>({
    resolver: zodResolver(manualApplicantSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      headline: "",
      location: "",
      summary: "",
      experience: [{ role: "", company: "", description: "", startDate: "2022-01", isCurrent: true }],
      education: [{ institution: "", degree: "", fieldOfStudy: "", startYear: 2020 }],
      projects: [{ name: "", description: "", role: "", startDate: "2023-01" }],
      languages: "English, French",
      linkedin: "",
      github: "",
      skills: "",
    },
  })

  const { fields: expFields, append: expAppend, remove: expRemove } = useFieldArray({
    control: form.control,
    name: "experience",
  })

  const { fields: eduFields, append: eduAppend, remove: eduRemove } = useFieldArray({
    control: form.control,
    name: "education",
  })

  const { fields: projFields, append: projAppend, remove: projRemove } = useFieldArray({
    control: form.control,
    name: "projects",
  })

  async function onSubmit(data: ManualApplicantFormValues) {
    try {
      setIsSubmitting(true)
      const payload: any = {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        headline: data.headline,
        bio: data.summary,
        location: data.location,
        jobId: jobId,
        languages: data.languages?.split(",").map(l => ({ name: l.trim(), proficiency: "Fluent" })) || [],
        socialLinks: {
          linkedin: data.linkedin || undefined,
          github: data.github || undefined,
        },
        skills: data.skills.split(",").map(s => ({
          name: s.trim(),
          level: "Intermediate",
          yearsOfExperience: 2
        })).filter(s => s.name !== ""),
        experience: data.experience.map(exp => ({
          ...exp,
          technologies: [],
        })),
        education: data.education,
        projects: data.projects.map(proj => ({
          ...proj,
          technologies: [],
        })),
        availability: { status: "Available", type: "Full-time" }, // Defaults
      }

      await api.createApplicantStructured(payload as Applicant)
      toast.success("Candidate profile created successfully!")
      form.reset()
      onSuccess?.()
    } catch (error: any) {
      toast.error(error.message || "Failed to create candidate profile")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="w-full">
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* Personal Info */}
        <Card>
          <CardHeader className="flex flex-row items-center gap-4">
            <div className="p-2 rounded bg-primary/10 text-primary">
              <IconUser size={24} />
            </div>
            <div>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Primary contact details and headline.</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="grid gap-6 sm:grid-cols-2">
            <Field>
              <FieldLabel htmlFor="firstName">First Name</FieldLabel>
              <FieldContent>
                <Input id="firstName" placeholder="Jane" {...form.register("firstName")} disabled={isSubmitting} />
                <FieldError>{form.formState.errors.firstName?.message}</FieldError>
              </FieldContent>
            </Field>
            <Field>
              <FieldLabel htmlFor="lastName">Last Name</FieldLabel>
              <FieldContent>
                <Input id="lastName" placeholder="Doe" {...form.register("lastName")} disabled={isSubmitting} />
                <FieldError>{form.formState.errors.lastName?.message}</FieldError>
              </FieldContent>
            </Field>
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <FieldContent>
                <Input id="email" type="email" placeholder="jane@example.com" {...form.register("email")} disabled={isSubmitting} />
                <FieldError>{form.formState.errors.email?.message}</FieldError>
              </FieldContent>
            </Field>
            <Field>
              <FieldLabel htmlFor="location">Location</FieldLabel>
              <FieldContent>
                <Input id="location" placeholder="Kigali, Rwanda" {...form.register("location")} disabled={isSubmitting} />
                <FieldError>{form.formState.errors.location?.message}</FieldError>
              </FieldContent>
            </Field>
            <Field className="sm:col-span-2">
              <FieldLabel htmlFor="headline">Professional Headline</FieldLabel>
              <FieldContent>
                <Input id="headline" placeholder="Senior Product Designer with AI focus" {...form.register("headline")} disabled={isSubmitting} />
                <FieldError>{form.formState.errors.headline?.message}</FieldError>
              </FieldContent>
            </Field>
          </CardContent>
        </Card>

        {/* Experience */}
        <Card>
          <CardHeader className="flex flex-row items-center gap-4">
            <div className="p-2 rounded bg-primary/10 text-primary">
              <IconBriefcase size={24} />
            </div>
            <div>
              <CardTitle>Work Experience</CardTitle>
              <CardDescription>Chronological career history.</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {expFields.map((field, index) => (
              <div key={field.id} className="space-y-4 p-4 border rounded-lg relative bg-muted/30">
                <Button 
                  type="button" 
                  variant="ghost" 
                  size="icon" 
                  className="absolute top-2 right-2 h-8 w-8 text-destructive"
                  onClick={() => expRemove(index)}
                  disabled={expFields.length === 1}
                >
                  <IconTrash size={16} />
                </Button>
                
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field>
                    <FieldLabel>Role Title</FieldLabel>
                    <FieldContent>
                      <Input placeholder="Frontend Lead" {...form.register(`experience.${index}.role` as const)} disabled={isSubmitting} />
                    </FieldContent>
                  </Field>
                  <Field>
                    <FieldLabel>Company</FieldLabel>
                    <FieldContent>
                      <Input placeholder="Tech Corp" {...form.register(`experience.${index}.company` as const)} disabled={isSubmitting} />
                    </FieldContent>
                  </Field>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field>
                    <FieldLabel>Start Date (YYYY-MM)</FieldLabel>
                    <FieldContent>
                      <Input placeholder="2022-01" {...form.register(`experience.${index}.startDate` as const)} disabled={isSubmitting} />
                    </FieldContent>
                  </Field>
                </div>
                <Field>
                  <FieldLabel>Achievements/Responsibilities</FieldLabel>
                  <FieldContent>
                    <Textarea placeholder="Led a team of 5, migrated to Next.js..." {...form.register(`experience.${index}.description` as const)} disabled={isSubmitting} />
                  </FieldContent>
                </Field>
              </div>
            ))}
            <Button 
              type="button" 
              variant="outline" 
              className="w-full border-dashed"
              onClick={() => expAppend({ role: "", company: "", description: "", startDate: "", isCurrent: false })}
              disabled={isSubmitting}
            >
              <IconPlus size={16} className="mr-2" /> Add Experience Row
            </Button>
          </CardContent>
        </Card>

        {/* Education */}
        <Card>
          <CardHeader className="flex flex-row items-center gap-4">
            <div className="p-2 rounded bg-primary/10 text-primary">
              <IconCode size={24} />
            </div>
            <div>
              <CardTitle>Academic Background</CardTitle>
              <CardDescription>University degrees and certifications.</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {eduFields.map((field, index) => (
              <div key={field.id} className="space-y-4 p-4 border rounded-lg relative bg-muted/30">
                <Button 
                  type="button" 
                  variant="ghost" 
                  size="icon" 
                  className="absolute top-2 right-2 h-8 w-8 text-destructive"
                  onClick={() => eduRemove(index)}
                  disabled={eduFields.length === 1}
                >
                  <IconTrash size={16} />
                </Button>
                
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field>
                    <FieldLabel>Institution</FieldLabel>
                    <FieldContent>
                      <Input placeholder="University of Rwanda" {...form.register(`education.${index}.institution` as const)} disabled={isSubmitting} />
                    </FieldContent>
                  </Field>
                  <Field>
                    <FieldLabel>Degree</FieldLabel>
                    <FieldContent>
                      <Input placeholder="Bachelor's" {...form.register(`education.${index}.degree` as const)} disabled={isSubmitting} />
                    </FieldContent>
                  </Field>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                   <Field>
                    <FieldLabel>Field of Study</FieldLabel>
                    <FieldContent>
                      <Input placeholder="Computer Science" {...form.register(`education.${index}.fieldOfStudy` as const)} disabled={isSubmitting} />
                    </FieldContent>
                  </Field>
                  <Field>
                    <FieldLabel>Start Year</FieldLabel>
                    <FieldContent>
                      <Input type="number" {...form.register(`education.${index}.startYear` as const, { valueAsNumber: true })} disabled={isSubmitting} />
                    </FieldContent>
                  </Field>
                </div>
              </div>
            ))}
            <Button 
              type="button" 
              variant="outline" 
              className="w-full border-dashed"
              onClick={() => eduAppend({ institution: "", degree: "", fieldOfStudy: "", startYear: 2020 })}
              disabled={isSubmitting}
            >
              <IconPlus size={16} className="mr-2" /> Add Education Row
            </Button>
          </CardContent>
        </Card>

        {/* Projects */}
        <Card>
          <CardHeader className="flex flex-row items-center gap-4">
            <div className="p-2 rounded bg-primary/10 text-primary">
              <IconPlus size={24} />
            </div>
            <div>
              <CardTitle>Portfolio Projects</CardTitle>
              <CardDescription>Key technical projects you've built.</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {projFields.map((field, index) => (
              <div key={field.id} className="space-y-4 p-4 border rounded-lg relative bg-muted/30">
                <Button 
                  type="button" 
                  variant="ghost" 
                  size="icon" 
                  className="absolute top-2 right-2 h-8 w-8 text-destructive"
                  onClick={() => projRemove(index)}
                  disabled={projFields.length === 1}
                >
                  <IconTrash size={16} />
                </Button>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field>
                    <FieldLabel>Project Name</FieldLabel>
                    <FieldContent>
                      <Input placeholder="E-commerce Platform" {...form.register(`projects.${index}.name` as const)} disabled={isSubmitting} />
                    </FieldContent>
                  </Field>
                  <Field>
                    <FieldLabel>Your Role</FieldLabel>
                    <FieldContent>
                      <Input placeholder="Lead Developer" {...form.register(`projects.${index}.role` as const)} disabled={isSubmitting} />
                    </FieldContent>
                  </Field>
                </div>
                <Field>
                  <FieldLabel>Start Date (YYYY-MM)</FieldLabel>
                  <FieldContent>
                    <Input placeholder="2023-01" {...form.register(`projects.${index}.startDate` as const)} disabled={isSubmitting} />
                  </FieldContent>
                </Field>
                <Field>
                  <FieldLabel>Project Description</FieldLabel>
                  <FieldContent>
                    <Textarea placeholder="Built with Next.js and Tailwind... Scored 90% in performance." {...form.register(`projects.${index}.description` as const)} disabled={isSubmitting} />
                  </FieldContent>
                </Field>
              </div>
            ))}
            <Button 
              type="button" 
              variant="outline" 
              className="w-full border-dashed"
              onClick={() => projAppend({ name: "", description: "", role: "", startDate: "" })}
              disabled={isSubmitting}
            >
              <IconPlus size={16} className="mr-2" /> Add Project Row
            </Button>
          </CardContent>
        </Card>

        {/* Skills */}
        <Card>
          <CardHeader className="flex flex-row items-center gap-4">
            <div className="p-2 rounded bg-primary/10 text-primary">
              <IconCode size={24} />
            </div>
            <div>
              <CardTitle>Skills & Expertise</CardTitle>
              <CardDescription>Core competencies and technology stack.</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <Field>
              <FieldLabel>Key Skills (Comma separated)</FieldLabel>
              <FieldContent>
                <Input placeholder="React, TypeScript, GraphQL, Node.js..." {...form.register("skills")} disabled={isSubmitting} />
                <FieldError>{form.formState.errors.skills?.message}</FieldError>
              </FieldContent>
            </Field>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field>
                <FieldLabel>Languages</FieldLabel>
                <FieldContent>
                  <Input placeholder="English, French..." {...form.register("languages")} disabled={isSubmitting} />
                </FieldContent>
              </Field>
              <Field>
                <FieldLabel>LinkedIn URL</FieldLabel>
                <FieldContent>
                  <Input placeholder="https://linkedin.com/in/..." {...form.register("linkedin")} disabled={isSubmitting} />
                </FieldContent>
              </Field>
            </div>
            <Field>
              <FieldLabel>GitHub URL</FieldLabel>
              <FieldContent>
                <Input placeholder="https://github.com/..." {...form.register("github")} disabled={isSubmitting} />
              </FieldContent>
            </Field>
          </CardContent>
          <CardFooter className="justify-end border-t pt-6">
            <Button type="submit" size="lg" className="px-8" disabled={isSubmitting}>
              {isSubmitting ? "Processing..." : "Finalize Profile Ingestion"}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  )
}
