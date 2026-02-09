import { Card } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import {  Plus } from "lucide-react";
import Image from "next/image";

export interface Activity {
  text: string;
  time: string;
}

interface RecentActivityProps {
  activities?: Activity[];
  title?: string;
}

const DEFAULT_ACTIVITIES: Activity[] = [
  { text: "New Project Created: Marketing Onboarding", time: "2 hours ago" },
  { text: "New event Created : Lorem ipsum", time: "4 hours ago" },
  { text: "Journey Edited: First Week by Mark Davis", time: "Yesterday" },
  { text: "New Participant: Emma Wilson joined Developer Onboarding", time: "Yesterday" },
  { text: "New Project Created: Marketing Onboarding", time: "2 hours ago" },
  { text: "New event Created : Lorem ipsum", time: "Yesterday" },
  { text: "Journey Edited: First Week by Mark Davis", time: "Yesterday" },
];

export function RecentActivity({ activities = DEFAULT_ACTIVITIES, title = "Recent activity" }: RecentActivityProps) {
  return (
    <Card className="col-span-1 p-5 !rounded-[18px] shadow-card">
      <div className="flex items-center gap-2 mb-4">
      <Image src="/assets/logos/recentActivity.svg" alt="Recent Activity" width={20} height={20} className="w-5 h-5" />
      <div className="font-semibold text-black">{title}</div>
      </div>
      <div className="flex flex-col gap-3">
      {activities.map((act, idx) => (
        <div key={idx} className="flex items-start gap-2">
        <Plus className="w-7 h-8 text-purple mt-1 rounded-full bg-light-purple flex-shrink-0" />
        <div className="flex-1 min-w-0">
          <div className="text-h7 text-black">{act.text}</div>
          <div className="text-h6 text-gray">{act.time}</div>
        </div>
        </div>
      ))}
      </div>
      <div className="flex justify-center mt-4">
        <Button className="text-purple" variant="purple_link" size="sm">View all activities</Button>
      </div>
    </Card>
  );
}
