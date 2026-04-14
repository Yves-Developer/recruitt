import { IconTrendingDown, IconTrendingUp, IconUsers, IconBriefcase, IconSparkles, IconCrown } from "@tabler/icons-react"

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
          <div className="flex items-center gap-2">
            <div className="p-2 rounded bg-primary/10 text-primary">
              <IconBriefcase size={20} />
            </div>
            <CardDescription>Active Jobs</CardDescription>
          </div>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            18
          </CardTitle>
          <CardAction>
            <Badge variant="outline" className="text-primary border-primary/30">
              <IconTrendingUp size={14} className="mr-1" />
              +2 new
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Active vacancies <IconTrendingUp className="size-4" />
          </div>
          <div className="text-muted-foreground">
            3 closing in the next 48h
          </div>
        </CardFooter>
      </Card>

      <Card className="@container/card">
        <CardHeader>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded bg-primary/10 text-primary">
              <IconUsers size={20} />
            </div>
            <CardDescription>Applied Candidates</CardDescription>
          </div>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            1,284
          </CardTitle>
          <CardAction>
            <Badge variant="outline" className="text-primary border-primary/30">
              <IconTrendingUp size={14} className="mr-1" />
              +12%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            New profiles added <IconTrendingUp className="size-4" />
          </div>
          <div className="text-muted-foreground">
            High volumes for UI roles
          </div>
        </CardFooter>
      </Card>

      <Card className="@container/card">
        <CardHeader>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded bg-primary/10 text-primary">
              <IconSparkles size={20} />
            </div>
            <CardDescription>AI Screened</CardDescription>
          </div>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            842
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              65.5%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Screening coverage <IconTrendingUp className="size-4" />
          </div>
          <div className="text-muted-foreground">Gemini analysis in progress</div>
        </CardFooter>
      </Card>

      <Card className="@container/card">
        <CardHeader>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded bg-primary/10 text-primary">
              <IconCrown size={20} />
            </div>
            <CardDescription>Top Matches</CardDescription>
          </div>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            42
          </CardTitle>
          <CardAction>
            <Badge variant="outline" className="text-green-500 border-green-500/30 bg-green-500/5">
              Ideal Fit
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium font-bold text-green-500">
            Highly recommended <IconTrendingUp className="size-4" />
          </div>
          <div className="text-muted-foreground">Scored above 90% match</div>
        </CardFooter>
      </Card>
    </div>
  )
}
