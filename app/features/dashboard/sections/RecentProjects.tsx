import { Card } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Tag } from "@/app/components/ui/tag";
import { Avatar } from "@/app/components/ui/avatar";
import { Badge } from "@/app/components/ui/badge";
import { Progress } from "@/app/components/ui/progress";
import { Settings } from "lucide-react";

const recentProjects = [
  {
    name: "Rock your star",
    created: "5 days ago",
    stage: "Onboarding",
    avatars: 4,
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

export default function RecentProjects() {
  return (
    <Card className="p-5">
      <div className="flex justify-between items-center mb-4">
        <div className="font-semibold">Recent Projects</div>
        <Button variant="link" size="sm">View all projects</Button>
      </div>
      <div className="flex flex-col gap-4">
        {recentProjects.map((proj, idx) => (
          <div key={idx} className="flex items-center justify-between bg-gray-50 rounded-lg p-3">
            <div>
              <div className="font-medium">{proj.name}</div>
              <div className="text-xs text-gray-400">Created {proj.created}</div>
            </div>
            <Tag color="blue" className="mr-2">{proj.stage}</Tag>
            <div className="flex -space-x-2 mr-2">
              {[...Array(proj.avatars)].map((_, i) => (
                <Avatar key={i} />
              ))}
              {proj.avatars > 2 && (
                <span className="text-xs bg-gray-200 rounded-full px-2 py-0.5 ml-1">+{proj.avatars - 2}</span>
              )}
            </div>
            <Badge color="green" className="mr-2">{proj.status}</Badge>
            <div className="w-32">
              <Progress value={proj.progress} />
            </div>
            <Button variant="ghost" size="icon">
              <Settings />
            </Button>
          </div>
        ))}
      </div>
    </Card>
  );
}
