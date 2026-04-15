"use client"

import * as React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Field,
  FieldContent,
  FieldError,
  FieldLabel,
} from "@/components/ui/field"
import { IconPlus } from "@tabler/icons-react"
import { toast } from "sonner"

const jobSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters long"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  requirements: z.string().min(1, "At least one requirement is required"),
  skills: z.string().min(1, "At least one skill is required"),
})

type JobFormValues = z.infer<typeof jobSchema>

import { api } from "@/lib/api"

interface CreateJobDialogProps {
  onSuccess: () => void;
}

export function CreateJobDialog({ onSuccess }: CreateJobDialogProps) {
  const [open, setOpen] = React.useState(false)
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const form = useForm<JobFormValues>({
    resolver: zodResolver(jobSchema),
    defaultValues: {
      title: "",
      description: "",
      requirements: "",
      skills: "",
    },
  })

  async function onSubmit(data: JobFormValues) {
    try {
      setIsSubmitting(true)
      // Convert comma-separated strings to arrays as expected by backend
      const payload = {
        title: data.title,
        description: data.description,
        requirements: data.requirements.split("\n").filter(r => r.trim() !== ""),
        skills: data.skills.split(",").map(s => s.trim()).filter(s => s !== ""),
        status: "open" as const
      }

      await api.createJob(payload)
      
      toast.success("Job opening created successfully!")
      setOpen(false)
      form.reset()
      onSuccess()
    } catch (error) {
      toast.error("Failed to create job opening")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
          <IconPlus size={18} className="mr-2" />
          Post New Job
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Create Job Opening</DialogTitle>
          <DialogDescription>
            Fill in the details for the new recruitment position.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
          <Field>
            <FieldLabel htmlFor="title">Job Title</FieldLabel>
            <FieldContent>
              <Input
                id="title"
                placeholder="e.g. Senior Frontend Engineer"
                {...form.register("title")}
              />
              <FieldError>{form.formState.errors.title?.message}</FieldError>
            </FieldContent>
          </Field>
          
          <Field>
            <FieldLabel htmlFor="description">Description</FieldLabel>
            <FieldContent>
              <Textarea
                id="description"
                placeholder="Briefly describe the role and mission..."
                className="min-h-[100px]"
                {...form.register("description")}
              />
              <FieldError>{form.formState.errors.description?.message}</FieldError>
            </FieldContent>
          </Field>

          <Field>
            <FieldLabel htmlFor="requirements">Requirements (One per line)</FieldLabel>
            <FieldContent>
              <Textarea
                id="requirements"
                placeholder="Bachelor's degree in CS&#10;5+ years of React experience..."
                className="min-h-[80px]"
                {...form.register("requirements")}
              />
              <FieldError>{form.formState.errors.requirements?.message}</FieldError>
            </FieldContent>
          </Field>

          <Field>
            <FieldLabel htmlFor="skills">Key Skills (Comma separated)</FieldLabel>
            <FieldContent>
              <Input
                id="skills"
                placeholder="React, TypeScript, Node.js, AWS"
                {...form.register("skills")}
              />
              <FieldError>{form.formState.errors.skills?.message}</FieldError>
            </FieldContent>
          </Field>

          <DialogFooter>
            <Button type="submit" className="w-full sm:w-auto" disabled={isSubmitting}>
              {isSubmitting ? "Creating..." : "Create Job"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
