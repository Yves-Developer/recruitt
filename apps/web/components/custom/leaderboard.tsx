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

const mockResults = [
  {
    id: "c1",
    name: "Alex Rivera",
    matchScore: 94,
    headline: "Senior Fullstack Engineer | Ex-Google",
    strengths: "Extensive experience with distributed systems and Large Language Models. Strong ownership and mentorship record.",
    gaps: "Relatively new to the specific UI framework used in the project (Base UI), though proficient in similar ones.",
    recommendation: "Strongest candidate. Technical expertise and leadership skills perfectly align with the Seniory lead role."
  },
  {
    id: "c2",
    name: "Sarah Chen",
    matchScore: 88,
    headline: "Product Designer & UI Engineer",
    strengths: "Perfect blend of design and engineering. Deep understanding of accessibility and design systems.",
    gaps: "Less backend experience than requested for a 'Fullstack' designated role.",
    recommendation: "Excellent fit for a UI-heavy Fullstack role. Highly recommended for her design-centric technical approach."
  },
  {
    id: "c3",
    name: "Jordan Smith",
    matchScore: 72,
    headline: "Frontend Developer | 4 YOE",
    strengths: "Fast learner, excellent communication, strong React fundamentals.",
    gaps: "Missing required Node.js backend experience. Lacks experience with system architecture at scale.",
    recommendation: "Solid mid-level candidate. Might need more ramp-up time for the 'Senior' responsibilities."
  }
]

export function Leaderboard() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <IconChecklist className="text-primary" /> Matrix Results
        </h2>
        <span className="text-sm text-muted-foreground">{mockResults.length} candidates evaluated</span>
      </div>

      <div className="grid gap-4">
        {mockResults.map((candidate, index) => (
          <div key={candidate.id} className="group border rounded-xl overflow-hidden bg-card transition-all hover:border-primary/50">
            <div className="p-4 flex items-center gap-4">
              <div className="flex flex-col items-center justify-center h-12 w-12 rounded-full bg-primary/10 text-primary font-bold border border-primary/20">
                #{index + 1}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-lg">{candidate.name}</h3>
                  <Badge className="bg-primary/20 text-primary border-primary/20">
                    {candidate.matchScore}% Match
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground truncate">{candidate.headline}</p>
              </div>

              <div className="hidden sm:block w-32">
                <Progress value={candidate.matchScore} className="h-1.5" />
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
                      <p className="text-sm leading-relaxed">{candidate.strengths}</p>
                    </div>
                    <div className="space-y-1">
                      <h4 className="flex items-center gap-2 text-sm font-semibold text-amber-500">
                        <IconAlertTriangle size={14} /> Gaps / Risks
                      </h4>
                      <p className="text-sm leading-relaxed">{candidate.gaps}</p>
                    </div>
                  </div>
                  <div className="p-3 rounded bg-muted/50 border-l-4 border-primary">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">AI Recommendation</h4>
                    <p className="text-sm italic italic">"{candidate.recommendation}"</p>
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
