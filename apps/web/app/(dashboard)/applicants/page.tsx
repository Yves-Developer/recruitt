"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { IconFileUpload, IconForms } from "@tabler/icons-react"
import { ApplicantUpload } from "@/components/custom/applicant-upload"
import { ApplicantManualForm } from "@/components/custom/applicant-manual-form"
export default function ApplicantsPage() {
  return (
    <div className="p-4 md:p-6 lg:p-8 w-full max-w-7xl mx-auto">
      <Tabs defaultValue="upload" orientation="vertical" className="flex flex-col md:flex-row gap-8 lg:gap-12 w-full">

        {/* Left Column: Context & Navigation */}
        <div className="w-full md:w-72 lg:w-80 shrink-0 space-y-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Applicant Intake</h1>
            <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
              Add new candidates to your talent pool. You can let our AI automatically extract data from resumes, or manually input their candidate profiles.
            </p>
          </div>

          <TabsList className="flex flex-col h-auto w-full items-stretch bg-transparent space-y-3 p-0">
            <TabsTrigger
              value="upload"
              className="justify-start gap-3 h-14 px-4 shadow-none bg-accent/30 data-[state=active]:bg-primary/15 data-[state=active]:text-primary data-[state=active]:border-primary/30 border border-transparent rounded-xl transition-all text-base"
            >
              <IconFileUpload size={22} className="text-primary" /> AI Resume Parser
            </TabsTrigger>
            <TabsTrigger
              value="manual"
              className="justify-start gap-3 h-14 px-4 shadow-none bg-accent/30 data-[state=active]:bg-primary/15 data-[state=active]:text-primary data-[state=active]:border-primary/30 border border-transparent rounded-xl transition-all text-base"
            >
              <IconForms size={22} className="text-primary" /> Manual Data Entry
            </TabsTrigger>
          </TabsList>
        </div>

        {/* Right Column: Active Form Content */}
        <div className="flex-1 min-w-0">
          <TabsContent value="upload" className="mt-0 outline-none animate-in fade-in slide-in-from-right-4 duration-500">
            <ApplicantUpload />
          </TabsContent>

          <TabsContent value="manual" className="mt-0 outline-none animate-in fade-in slide-in-from-right-4 duration-500">
            <ApplicantManualForm />
          </TabsContent>
        </div>

      </Tabs>
    </div>
  )
}
