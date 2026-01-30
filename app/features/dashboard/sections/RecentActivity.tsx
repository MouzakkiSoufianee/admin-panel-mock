import { Card } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Plus } from "lucide-react";

const activities = [
  { text: "New Project Created: Marketing Onboarding", time: "2 hours ago" },
  { text: "New event Created : Lorem ipsum", time: "4 hours ago" },
  { text: "Journey Edited: First Week by Mark Davis", time: "Yesterday" },
  { text: "New Participant: Emma Wilson joined Developer Onboarding", time: "Yesterday" },
  { text: "New Project Created: Marketing Onboarding", time: "2 hours ago" },
  { text: "New event Created : Lorem ipsum", time: "Yesterday" },
  { text: "Journey Edited: First Week by Mark Davis", time: "Yesterday" },
];

export default function RecentActivity() {
  return (
    <Card className="col-span-1 p-5">
      <div className="font-semibold mb-4">Recent activity</div>
      <div className="flex flex-col gap-3">
        {activities.map((act, idx) => (
          <div key={idx} className="flex items-start gap-2">
            <Plus className="text-blue-400 mt-1" />
            <div>
              <div className="text-sm">{act.text}</div>
              <div className="text-xs text-gray-400">{act.time}</div>
            </div>
          </div>
        ))}
      </div>
      <Button variant="link" size="sm" className="mt-4">View all activities</Button>
    </Card>
  );
}
