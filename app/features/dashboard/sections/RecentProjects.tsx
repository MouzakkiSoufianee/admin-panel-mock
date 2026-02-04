"use client";

import { useState } from "react";
import { Card } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Tag } from "@/app/components/ui/tag";
import { Avatar } from "@/app/components/ui/avatar";
import { Badge } from "@/app/components/ui/badge";
import { Progress } from "@/app/components/ui/progress";
import { Settings, EllipsisVertical, SquarePen, Trash2 } from "lucide-react";
import Image from "next/image";

export interface Project {
  name: string;
  created: string;
  stage: string;
  avatars: number;
  status: string;
  progress: number;
}

interface RecentProjectsProps {
  projects?: Project[];
  title?: string;
  onEdit?: (projectName: string) => void;
  onDelete?: (projectName: string) => void;
}

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

export function RecentProjects({ 
  projects = DEFAULT_PROJECTS,
  title = "Recent Projects",
  onEdit,
  onDelete
}: RecentProjectsProps) {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const handleEdit = (projectName: string) => {
    if (onEdit) {
      onEdit(projectName);
    } else {
      console.log("Edit:", projectName);
    }
  };

  const handleDelete = (projectName: string) => {
    if (onDelete) {
      onDelete(projectName);
    } else {
      console.log("Delete:", projectName);
    }
  };

  return (
    <Card className="p-5">
      <div className="flex justify-between items-center mb-4">
        <div className="font-bold text-black">{title}</div>
        <Button variant="purple_link" size="sm">View all projects</Button>
        
      </div>
      <div className="flex flex-col gap-4">
        {projects.map((proj, idx) => (
          <div 
            key={idx} 
            className={`relative bg-gray-50 rounded-lg transition-all duration-300 `}
          >
            {/* Action Buttons - appears behind the sliding card */}
            <div 
              className={`absolute top-0 right-0 h-full flex flex-col items-center justify-center gap-2 rounded-r-3xl p-3 bg-[rgba(206,206,254,0.5)]`}
            >
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => handleEdit(proj.name)}
                  className="text-blue-500 hover:bg-blue-200"
                >
                  <Image src="/assets/logos/edit.svg" alt="Edit" className="w-4 h-4" width="16" height="16" />
                </Button>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => handleDelete(proj.name)}
                className="text-red-500 hover:bg-red-200"
              >
                <Image src="/assets/logos/delete.svg" alt="Delete" className="w-4 h-4" width="16" height="16" />
              </Button>
            </div>

            {/* Main Card Content - slides left when expanded */}
            <div 
              className={`grid grid-cols-12 gap-3 bg-white shadow items-center p-3 transition-all rounded-2xl duration-300 transform bg-gray-50 ${
                expandedId === idx ? "-translate-x-11" : "translate-x-0"
              }`}
            >
              <div className="col-span-3">
                <div className="font-medium text-black">{proj.name}</div>
                <div className="text-xs text-gray-400">Created {proj.created}</div>
              </div>
              <div className="col-span-2">
                <Tag color="blue">{proj.stage}</Tag>
              </div>
              <div className="col-span-2 flex -space-x-2">
                {[...Array(proj.avatars)].map((_, i) => (
                  <Avatar key={i} />
                ))}
                {proj.avatars > 2 && (
                  <span className="text-xs bg-gray-200 rounded-full px-2 py-0.5 ml-1">+{proj.avatars - 2}</span>
                )}
              </div>
              <div className="col-span-2">
                <Badge variant="default" className="bg-green-300 rounded-full">{proj.status}</Badge>
              </div>
              <div className="col-span-2">
                <Progress value={proj.progress} />
              </div>
              <div className="col-span-1 flex justify-end">
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => setExpandedId(expandedId === idx ? null : idx)}
                >
                  <EllipsisVertical className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
          
        ))}
      </div>
    </Card>
  );
}
