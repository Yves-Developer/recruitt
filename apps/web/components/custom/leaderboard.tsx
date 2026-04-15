"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { IconSearch, IconSparkles, IconAlertTriangle, IconChecklist, IconUserCheck, IconUserX, IconDotsCircleHorizontal, IconEye } from "@tabler/icons-react"
import { toast } from "sonner"
import { api } from "@/lib/api"
import * as React from "react"

import { ScreeningResult } from "@repo/shared"

import { TalentDetailsSheet } from "@/components/custom/talent-details-sheet"

interface LeaderboardProps {
  results: (ScreeningResult & { _id?: string, applicantId: any, status?: string })[];
  jobTitle: string;
}

export function Leaderboard({ results: initialResults, jobTitle }: LeaderboardProps) {
  const [results, setResults] = React.useState(initialResults);
  const [selectedApplicant, setSelectedApplicant] = React.useState<any | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = React.useState(false);

  React.useEffect(() => {
    setResults(initialResults);
  }, [initialResults]);

  const handleShowProfile = (applicant: any) => {
    setSelectedApplicant(applicant);
    setIsDetailsOpen(true);
  };

  const handleStatusUpdate = async (resultId: string, newStatus: string) => {
    try {
      const updated = await api.updateScreeningStatus(resultId, newStatus);
      setResults(prev => prev.map(r => (r._id === resultId || r.id === resultId) ? { ...r, status: newStatus } : r));
      toast.success(`Candidate marked as ${newStatus}`);
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  const getStatusBadge = (status?: string) => {
    switch (status) {
      case "Shortlisted":
        return <Badge className="bg-green-500/20 text-green-500 border-green-500/20 gap-1"><IconUserCheck size={12}/> Shortlisted</Badge>;
      case "Rejected":
        return <Badge variant="destructive" className="gap-1"><IconUserX size={12}/> Rejected</Badge>;
      case "Review later":
        return <Badge variant="outline" className="text-amber-500 border-amber-500/20 gap-1"><IconDotsCircleHorizontal size={12}/> Reviewing</Badge>;
      default:
        return <Badge variant="secondary">Evaluated</Badge>;
    }
  };

  return (
    <div className="space-y-4">
      <TalentDetailsSheet 
        applicant={selectedApplicant} 
        open={isDetailsOpen} 
        onOpenChange={setIsDetailsOpen} 
      />

      <div className="flex items-center justify-between mb-2">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <IconChecklist className="text-primary" /> Matrix Results
        </h2>
        <span className="text-sm text-muted-foreground">{results.filter(r => r.applicantId).length} candidates evaluated</span>
      </div>

      <div className="grid gap-4">
        {results.filter(r => r.applicantId).map((result, index) => (
          <div key={result._id || result.id || index} className={`group border rounded-xl overflow-hidden bg-card transition-all hover:border-primary/50 ${result.status === 'Rejected' ? 'opacity-60 grayscale-[0.5]' : ''}`}>
            <div className="p-4 flex items-center gap-4">
              <div className="flex flex-col items-center justify-center h-12 w-12 rounded-full bg-primary/10 text-primary font-bold border border-primary/20">
                #{index + 1}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-bold text-lg">
                    {result.applicantId?.firstName} {result.applicantId?.lastName}
                  </h3>
                  <Badge className="bg-primary/20 text-primary border-primary/20">
                    {result.matchScore}% Match
                  </Badge>
                  {getStatusBadge(result.status)}
                </div>
                <p className="text-sm text-muted-foreground truncate">{result.applicantId?.headline || "Unknown Candidate"}</p>
              </div>

              <div className="flex gap-2">
                <Button 
                  size="sm" 
                  variant="outline"
                  className="hover:text-primary"
                  onClick={() => handleShowProfile(result.applicantId)}
                  title="View Full Profile"
                >
                  <IconEye size={18} />
                </Button>
                <Button 
                  size="sm" 
                  variant={result.status === 'Shortlisted' ? 'default' : 'outline'} 
                  className={result.status === 'Shortlisted' ? 'bg-green-600 hover:bg-green-700' : 'hover:text-green-600'}
                  onClick={() => handleStatusUpdate((result._id || result.id)!, "Shortlisted")}
                >
                  <IconUserCheck size={18} />
                </Button>
                <Button 
                  size="sm" 
                  variant={result.status === 'Rejected' ? 'destructive' : 'outline'} 
                  className={result.status === 'Rejected' ? '' : 'hover:text-red-600'}
                  onClick={() => handleStatusUpdate((result._id || result.id)!, "Rejected")}
                >
                  <IconUserX size={18} />
                </Button>
              </div>
            </div>

            <Accordion type="single" collapsible className="border-t px-4">
              <AccordionItem value="details" className="border-none">
                <AccordionTrigger className="py-3 text-sm hover:no-underline text-muted-foreground hover:text-foreground">
                  View Detailed AI Assessment
                </AccordionTrigger>
                <AccordionContent className="pb-4 space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-1">
                      <h4 className="flex items-center gap-2 text-sm font-semibold text-green-500">
                        <IconSparkles size={14} /> Key Strengths
                      </h4>
                      <ul className="text-sm leading-relaxed list-disc list-inside">
                        {result.strengths.map((s, i) => <li key={i}>{s}</li>)}
                      </ul>
                    </div>
                    <div className="space-y-1">
                      <h4 className="flex items-center gap-2 text-sm font-semibold text-amber-500">
                        <IconAlertTriangle size={14} /> Gaps / Risks
                      </h4>
                      <ul className="text-sm leading-relaxed list-disc list-inside">
                        {result.gapsRisks.map((g, i) => <li key={i}>{g}</li>)}
                      </ul>
                    </div>
                  </div>
                  <div className="p-3 rounded bg-muted/50 border-l-4 border-primary">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">AI Recommendation</h4>
                    <p className="text-sm italic">"{result.finalRecommendation}"</p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        ))}
      </div>
    </div>
  )
}
