"use client";

import { useEffect } from "react";
import { usePageTitle } from "@/app/contexts/page-title-context";
import { OrganizationInfo, Organization } from "./sections/OrganizationInfo";
import { QuickStats, Stat } from "./sections/QuickStats";
import { QuickActions, QuickAction } from "./sections/QuickActions";
import { RecentProjects, Project } from "./sections/RecentProjects";
import { RecentActivity, Activity } from "./sections/RecentActivity";
import ChatbotConfig from "./sections/chatbotConfig";

interface DashboardProps {
  stats?: Stat[];
  activities?: Activity[];
  projects?: Project[];
  org?: Organization;
  actions?: QuickAction[];
}

// Default data (can be overridden by props)
const DEFAULT_STATS: Stat[] = [
  { label: "Active Projects", value: 1 },
  { label: "Total Employees", value: 300 },
  { label: "Installed Games", value: 50 },
  { label: "Avg Score", value: 5 },
  { label: "Completion Rate", value: "80%" },
];

const DEFAULT_ACTIVITIES: Activity[] = [
  { text: "New Project Created: Marketing Onboarding", time: "2 hours ago" },
  { text: "New event Created : Lorem ipsum", time: "4 hours ago" },
  { text: "Journey Edited: First Week by Mark Davis", time: "Yesterday" },
  { text: "New Participant: Emma Wilson joined Developer Onboarding", time: "Yesterday" },
  { text: "New Project Created: Marketing Onboarding", time: "2 hours ago" },
  { text: "New event Created : Lorem ipsum", time: "Yesterday" },
  { text: "Journey Edited: First Week by Mark Davis", time: "Yesterday" },
];

const DEFAULT_PROJECTS: Project[] = [
  {
    name: "Rock your star",
    created: "5 days ago",
    stage: "Onboarding",
    avatars: 3,
    status: "Active",
    progress: 65,
  },
  {
    name: "Rock your star",
    created: "2 days ago",
    stage: "Pre-Onboarding",
    avatars: 2,
    status: "Active",
    progress: 65,
  },
  {
    name: "Rock your star",
    created: "2 days ago",
    stage: "Training",
    avatars: 2,
    status: "Active",
    progress: 65,
  },
];

const DEFAULT_ORG: Organization = {
  name: "Organization Name",
  created: "Jul 15, 2025",
  updated: "Jan 30, 2026",
};

const DEFAULT_ACTIONS: QuickAction[] = [
  {
    label: "Add project",
    bgColor: "#8BC194",
  },
  {
    label: "Add Organization",
    bgColor: "#7B7BFF",
  },
];

export function Dashboard({
  stats = DEFAULT_STATS,
  activities = DEFAULT_ACTIVITIES,
  projects = DEFAULT_PROJECTS,
  org = DEFAULT_ORG,
  actions = DEFAULT_ACTIONS,
}: DashboardProps) {
  const { setPageTitle } = usePageTitle();

  useEffect(() => {
    setPageTitle('Dashboard');
  }, [setPageTitle]);

    return (
        <div className="p-4 sm:p-6 bg-white min-h-screen">
            <h2 className="text-lg text-black font-semibold mb-4">
                Overview of your organization and recent activity <span role="img" aria-label="wave">👋</span>
            </h2>
            <div className="grid grid-cols-12 gap-4 md:gap-6">
                <div className="col-span-3">
                    <OrganizationInfo org={org} />
                </div>

                <div className="col-span-6 flex flex-col gap-4 md:gap-7">
                    <QuickStats stats={stats} />
                    <ChatbotConfig />

                </div>

                <div className="col-span-3 row-span-2">
                    <div className="flex flex-col gap-4 md:gap-6">
                        <QuickActions actions={actions} />
                        <RecentActivity activities={activities} />

                    </div>
                </div>


                <div className="col-span-9">
                    <RecentProjects projects={projects} />
                </div>
            </div>
        </div>
    );
}