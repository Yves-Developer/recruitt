import data from "./data.json"
import { SectionCards } from '@/components/ui/section-cards'
import { ChartAreaInteractive } from '@/components/ui/chart-area-interactive'
import { DataTable } from '@/components/ui/data-table'

export default function Page() {
  return (
    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
      <SectionCards />
      <div className="px-4 lg:px-6">
        <ChartAreaInteractive />
      </div>
      <div className="px-4 lg:px-6 space-y-4">
        <div className="flex flex-col gap-1">
          <h2 className="text-xl font-bold tracking-tight">Recent Screening Activity</h2>
          <p className="text-muted-foreground text-sm">Overview of the latest AI evaluations across all active jobs.</p>
        </div>
        <DataTable data={data} />
      </div>
    </div>
  )
}
