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
      title: "Dashboard",
      url: "/",
      icon: IconDashboard,
    },
    {
      title: "Jobs",
      url: "/jobs",
      icon: IconListDetails,
    },
    {
      title: "Applicants",
      url: "/applicants",
      icon: IconUsers,
    },
    {
      title: "AI Screening",
      url: "/screening",
      icon: IconSparkles,
    },
    {
      title: "History",
      url: "/history",
      icon: IconHistory,
    },
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "/settings",
      icon: IconSettings,
    },
  ],
}

import Image from "next/image"

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
              <a href="/" className="flex items-center gap-2.5 group/logo">
                <Image
                  src="/RecruittLogoIcon.svg"
                  alt="Recruitt Logo"
                  width={12}
                  height={12}
                  className="size-4 rounded-xs transition-transform duration-300"
                />
                <span className="text-lg font-bold tracking-tight">Recruitt</span>
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
