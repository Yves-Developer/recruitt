"use client"

import * as React from "react"
import {
  IconCamera,
  IconChartBar,
  IconDashboard,
  IconDatabase,
  IconFileAi,
  IconFileDescription,
  IconFileWord,
  IconFolder,
  IconInnerShadowTop,
  IconHelp,
  IconSettings,
  IconUsers,
  IconTimeline,
  IconTrophy,
  IconBulb,
  IconHistory,
  IconSparkles,
  IconReportAnalytics,
  IconListDetails,
} from "@tabler/icons-react"


import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import { NavUser } from "./nav-user"
import { NavMain } from "./nav-main"
import { NavDocuments } from "./nav-documents"
import { NavSecondary } from "./nav-secondary"
import { NavManagement } from "./nav-management"

const data = {
  navMain: [
    {
      title: "Command Center",
      url: "/",
      icon: IconDashboard,
    },
    {
      title: "Job Workspace",
      url: "/jobs",
      icon: IconListDetails,
    },
    {
      title: "Talent Hub",
      url: "/applicants",
      icon: IconUsers,
    },
    {
      title: "AI Screening Matrix",
      url: "/screening",
      icon: IconSparkles,
    },
    {
      title: "Screening History",
      url: "/history",
      icon: IconHistory,
    },
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "/",
      icon: IconSettings,
    },
    {
      title: "Help & Support",
      url: "/",
      icon: IconHelp,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:p-1.5!"
            >
              <a href="/">
                <IconInnerShadowTop className="size-5! text-primary" />
                <span className="text-base font-semibold">Recruitt</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  )
}
