"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { IconFileUpload, IconForms } from "@tabler/icons-react"
import { ApplicantUpload } from "@/components/custom/applicant-upload"
import { ApplicantManualForm } from "@/components/custom/applicant-manual-form"

export default function ApplicantsPage() {
  return (
    <div className="flex flex-col gap-6 p-4 md:p-6 lg:p-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Applicant Intake</h1>
        <p className="text-muted-foreground mt-1">
          Add new candidates to your talent pool via AI parsing or manual entry.
        </p>
      </div>

      <Tabs defaultValue="upload" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2 mb-8">
          <TabsTrigger value="upload" className="gap-2">
            <IconFileUpload size={18} /> Resume Upload
          </TabsTrigger>
          <TabsTrigger value="manual" className="gap-2">
            <IconForms size={18} /> Manual Entry
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="upload">
          <ApplicantUpload />
        </TabsContent>
        
        <TabsContent value="manual">
          <ApplicantManualForm />
        </TabsContent>
      </Tabs>
    </div>
  )
}
