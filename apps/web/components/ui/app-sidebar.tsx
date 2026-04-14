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
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/",
      icon: IconDashboard,
    },
    {
      title: "Job Openings",
      url: "/jobs",
      icon: IconListDetails,
    },
    {
      title: "Applicants",
      url: "/applicants",
      icon: IconUsers,
    },
    {
      title: "AI Matrix",
      url: "/screening",
      icon: IconSparkles,
    },
  ],
  navManagement: [
    {
      title: "Talent Pools",
      icon: IconFolder,
      isActive: true,
      url: "#",
      items: [
        {
          title: "Senior Engineering",
          url: "#",
        },
        {
          title: "Product & Design",
          url: "#",
        },
        {
          title: "Marketing Lead",
          url: "#",
        },
      ],
    },
    {
      title: "Active Campaigns",
      icon: IconTimeline,
      url: "#",
      items: [
        {
          title: "Q2 Growth Hire",
          url: "#",
        },
        {
          title: "Technical Sourcing",
          url: "#",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Prompt Library",
      url: "#",
      icon: IconBulb,
    },
    {
      title: "Settings",
      url: "#",
      icon: IconSettings,
    },
    {
      title: "Help Center",
      url: "#",
      icon: IconHelp,
    },
  ],
  reports: [
    {
      name: "Pipeline Analytics",
      url: "#",
      icon: IconReportAnalytics,
    },
    {
      name: "AI Benchmarks",
      url: "#",
      icon: IconTrophy,
    },
    {
      name: "Screening History",
      url: "#",
      icon: IconHistory,
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
        <NavManagement items={data.navManagement} />
        <NavDocuments items={data.reports} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
