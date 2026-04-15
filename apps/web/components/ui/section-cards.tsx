import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react"

import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export function SectionCards() {
  return (
    <div className="grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4 dark:*:data-[slot=card]:bg-card">
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Umurava Profiles</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            842
          </CardTitle>
          <CardAction>
            <Badge variant="outline" className="text-primary border-primary/20">
              <IconTrendingUp />
              +5.4%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Syncing Scenario 1 data <IconTrendingUp className="size-4" />
          </div>
          <div className="text-muted-foreground">
            Structured talent profiles ingested
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>External Resumes</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            442
          </CardTitle>
          <CardAction>
            <Badge variant="outline" className="text-orange-500 border-orange-500/20">
              <IconTrendingUp />
              +12%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Scenario 2 parsing active <IconTrendingUp className="size-4" />
          </div>
          <div className="text-muted-foreground">
            Parsed PDFs and CSV spreadsheets
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Shortlisted (Top 10/20)</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            156
          </CardTitle>
          <CardAction>
            <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
              <IconTrendingUp />
              +22
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            High-confidence matches <IconTrendingUp className="size-4" />
          </div>
          <div className="text-muted-foreground">AI-vetted candidates ready for review</div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Explainability Score</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            98.2%
          </CardTitle>
          <CardAction>
            <Badge variant="outline" className="text-green-500 border-green-500/20">
              <IconTrendingUp />
              +0.5%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Transparent reasoning <IconTrendingUp className="size-4" />
          </div>
          <div className="text-muted-foreground">Human-in-the-loop validation accuracy</div>
        </CardFooter>
      </Card>
    </div>
  )
}
