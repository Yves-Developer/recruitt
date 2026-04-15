"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { IconSearch, IconSparkles, IconAlertTriangle, IconChecklist } from "@tabler/icons-react"

import { ScreeningResult } from "@repo/shared"

interface LeaderboardProps {
  results: (ScreeningResult & { applicantId: any })[];
  jobTitle: string;
}

export function Leaderboard({ results, jobTitle }: LeaderboardProps) {
  const displayResults = results.length > 0 ? results : [];
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <IconChecklist className="text-primary" /> Matrix Results
        </h2>
        <span className="text-sm text-muted-foreground">{results.length} candidates evaluated</span>
      </div>

      <div className="grid gap-4">
        {displayResults.map((result, index) => (
          <div key={result.id || index} className="group border rounded-xl overflow-hidden bg-card transition-all hover:border-primary/50">
            <div className="p-4 flex items-center gap-4">
              <div className="flex flex-col items-center justify-center h-12 w-12 rounded-full bg-primary/10 text-primary font-bold border border-primary/20">
                #{index + 1}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-lg">
                    {result.applicantId.firstName} {result.applicantId.lastName}
                  </h3>
                  <Badge className="bg-primary/20 text-primary border-primary/20">
                    {result.matchScore}% Match
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground truncate">{result.applicantId.headline}</p>
              </div>

              <div className="hidden sm:block w-32">
                <Progress value={result.matchScore} className="h-1.5" />
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
                    <p className="text-sm italic italic">"{result.finalRecommendation}"</p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        ))}
        {displayResults.length === 0 && (
          <div className="text-center py-12 border rounded-xl border-dashed">
            <p className="text-muted-foreground">No evaluation data available. Run the screening matrix first.</p>
          </div>
        )}
      </div>
    </div>
  )
}
