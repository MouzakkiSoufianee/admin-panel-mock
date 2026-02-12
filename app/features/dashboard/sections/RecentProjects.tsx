"use client";

import { useState, useEffect } from "react";
import { Card } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Avatar } from "@/app/components/ui/avatar";
import { Badge } from "@/app/components/ui/badge";
import { Progress } from "@/app/components/ui/progress";
import { SlideableActionCard } from "@/app/components/ui/slideable-action-card";
import Image from "next/image";
import { fetchProjects } from "@/app/data/api";
import { getProjectStageColors } from "@/app/utils/helpers";

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

export function RecentProjects({ 
  projects: initialProjects,
  title = "Recent Projects",
  onEdit,
  onDelete
}: RecentProjectsProps) {
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [projects, setProjects] = useState<Project[]>(initialProjects || []);
  const [loading, setLoading] = useState(!initialProjects);

  useEffect(() => {
    if (initialProjects) {
      setProjects(initialProjects);
      return;
    }

    const loadProjects = async () => {
      try {
        const apiProjects = await fetchProjects();
        const transformed = apiProjects.slice(0, 5).map((project: any) => ({
          name: project.name,
          created: project.createdDate,
          stage: project.stage,
          avatars: project.members.length,
          status: project.status,
          progress: project.progress,
        }));
        setProjects(transformed);
      } catch (error) {
        console.error("Failed to fetch projects:", error);
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, [initialProjects]);

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
    <Card className="p-5 !rounded-[18px] shadow-card">
      <div className="flex justify-between items-center mb-4">
        <div className="text-h2 text-black">{title}</div>
        <Button className="text-purple" variant="purple_link" size="sm">View all projects</Button>
      </div>
      <div className="flex flex-col gap-4">
        {projects.map((proj, idx) => (
          <SlideableActionCard
            key={idx}
            isExpanded={expandedId === idx}
            onToggleExpand={() => setExpandedId(expandedId === idx ? null : idx)}
            actions={[
              {
                icon: <Image src="/assets/logos/edit.svg" alt="Edit" className="w-4 h-4" width="16" height="16" />,
                onClick: () => handleEdit(proj.name),
                label: 'Edit',
              },
              {
                icon: <Image src="/assets/logos/delete.svg" alt="Delete" className="w-4 h-4" width="16" height="16" />,
                onClick: () => handleDelete(proj.name),
                label: 'Delete',
              },
            ]}
            contentClassName="grid grid-cols-12 gap-3 bg-white shadow items-center p-3"
          >
            <div className="col-span-3">
              <div className="font-medium text-black">{proj.name}</div>
              <div className="text-xs text-gray-400">Created {proj.created}</div>
            </div>
            <div className="col-span-2">
              {(() => {
                const stageColors = getProjectStageColors(proj.stage);
                return (
                  <Badge className={`${stageColors.badge} ${stageColors.text} rounded-full text-xs`}>
                    {proj.stage}
                  </Badge>
                );
              })()}
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
              <div className="relative">
                <Progress value={proj.progress} />
              </div>
              <div className="text-xs text-[#6B7280] mt-1">{proj.progress}% complete</div>
            </div>
          </SlideableActionCard>
        ))}
      </div>
    </Card>
  );
}
