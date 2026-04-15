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

export function SectionCards({ stats }: { stats: any }) {
  if (!stats) return null;

  return (
    <div className="grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4 dark:*:data-[slot=card]:bg-card">
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Umurava Profiles</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {stats.umuravaProfiles || 0}
          </CardTitle>
          <CardAction>
            <Badge variant="outline" className="text-primary border-primary/20">
              <IconTrendingUp />
              Syncing
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium text-muted-foreground">
            Structured talent profiles
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>External Resumes</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {stats.externalResumes || 0}
          </CardTitle>
          <CardAction>
            <Badge variant="outline" className="text-orange-500 border-orange-500/20">
              <IconTrendingUp />
              Live
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium text-muted-foreground">
            Parsed PDFs and CSVs
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Shortlisted (Match &gt; 80%)</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {stats.shortlisted || 0}
          </CardTitle>
          <CardAction>
            <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
              <IconTrendingUp />
              High Conf.
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium text-muted-foreground">
            Vetted candidates
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Explainability Score</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {stats.explainabilityScore}%
          </CardTitle>
          <CardAction>
            <Badge variant="outline" className="text-green-500 border-green-500/20">
              <IconTrendingUp />
              Accurate
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium text-muted-foreground">
            Human-in-the-loop accuracy
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
