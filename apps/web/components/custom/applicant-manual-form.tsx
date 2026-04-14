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

const manualApplicantSchema = z.object({
  fullName: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email"),
  headline: z.string().min(2, "Headline is required"),
  summary: z.string().optional(),
  experience: z.array(z.object({
    role: z.string().min(1, "Role is required"),
    company: z.string().min(1, "Company is required"),
    description: z.string().optional(),
  })).min(1, "Add at least one experience"),
  skills: z.string().min(1, "Add at least one skill"),
})

type ManualApplicantFormValues = z.infer<typeof manualApplicantSchema>

export function ApplicantManualForm() {
  const form = useForm<ManualApplicantFormValues>({
    resolver: zodResolver(manualApplicantSchema),
    defaultValues: {
      fullName: "",
      email: "",
      headline: "",
      summary: "",
      experience: [{ role: "", company: "", description: "" }],
      skills: "",
    },
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "experience",
  })

  async function onSubmit(data: ManualApplicantFormValues) {
    try {
      const payload = {
        ...data,
        skills: data.skills.split(",").map(s => s.trim()).filter(s => s !== ""),
      }
      console.log("Submitting applicant:", payload)
      toast.success("Candidate profile created successfully!")
      form.reset()
    } catch (error) {
      toast.error("Failed to create candidate profile")
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
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
              <FieldLabel htmlFor="fullName">Full Name</FieldLabel>
              <FieldContent>
                <Input id="fullName" placeholder="Jane Doe" {...form.register("fullName")} />
                <FieldError>{form.formState.errors.fullName?.message}</FieldError>
              </FieldContent>
            </Field>
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <FieldContent>
                <Input id="email" type="email" placeholder="jane@example.com" {...form.register("email")} />
                <FieldError>{form.formState.errors.email?.message}</FieldError>
              </FieldContent>
            </Field>
            <Field className="sm:col-span-2">
              <FieldLabel htmlFor="headline">Professional Headline</FieldLabel>
              <FieldContent>
                <Input id="headline" placeholder="Senior Product Designer with AI focus" {...form.register("headline")} />
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
            {fields.map((field, index) => (
              <div key={field.id} className="space-y-4 p-4 border rounded-lg relative bg-muted/30">
                <Button 
                  type="button" 
                  variant="ghost" 
                  size="icon" 
                  className="absolute top-2 right-2 h-8 w-8 text-destructive"
                  onClick={() => remove(index)}
                  disabled={fields.length === 1}
                >
                  <IconTrash size={16} />
                </Button>
                
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field>
                    <FieldLabel>Role Title</FieldLabel>
                    <FieldContent>
                      <Input placeholder="Frontend Lead" {...form.register(`experience.${index}.role` as const)} />
                    </FieldContent>
                  </Field>
                  <Field>
                    <FieldLabel>Company</FieldLabel>
                    <FieldContent>
                      <Input placeholder="Tech Corp" {...form.register(`experience.${index}.company` as const)} />
                    </FieldContent>
                  </Field>
                </div>
                <Field>
                  <FieldLabel>Achievements/Responsibilities</FieldLabel>
                  <FieldContent>
                    <Textarea placeholder="Led a team of 5, migrated to Next.js..." {...form.register(`experience.${index}.description` as const)} />
                  </FieldContent>
                </Field>
              </div>
            ))}
            <Button 
              type="button" 
              variant="outline" 
              className="w-full border-dashed"
              onClick={() => append({ role: "", company: "", description: "" })}
            >
              <IconPlus size={16} className="mr-2" /> Add Experience Row
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
          <CardContent>
            <Field>
              <FieldLabel>Key Skills (Comma separated)</FieldLabel>
              <FieldContent>
                <Input placeholder="React, TypeScript, GraphQL, Node.js..." {...form.register("skills")} />
                <FieldError>{form.formState.errors.skills?.message}</FieldError>
              </FieldContent>
            </Field>
          </CardContent>
          <CardFooter className="justify-end border-t pt-6">
            <Button type="submit" size="lg" className="px-8">Finalize Profile Ingestion</Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  )
}
