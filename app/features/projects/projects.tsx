"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { usePageTitle } from "@/app/contexts/page-title-context";
import { fetchProjects, fetchStatistics } from "@/app/data/api";
import { Card } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Badge } from "@/app/components/ui/badge";
import { Progress } from "@/app/components/ui/progress";
import { getProjectStageColors, getProjectStatusColors } from "@/app/utils/helpers";
import { Plus, Search, Heart, SquarePen, Eye } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select";
import { Input } from "@/app/components/ui/input";
import Image from "next/image";
export interface Project {
  id: string;
  name: string;
  description: string;
  status: "Active" | "Onboarding" | "Engagement" | "Training" | "Completed" | "Unlocked" | "Pre-Onboarding";
  stage?: string;
  category?: string;
  createdDate: string;
  participantCount?: number;
  image?: string;
  isFavorite?: boolean;
}

interface ProjectsProps {
  projects?: Project[];
  onEdit?: (projectId: string) => void;
  onDelete?: (projectId: string) => void;
  onViewDetails?: (projectId: string) => void;
}

const DEFAULT_BADGES = [
  {
    id: "1",
    label: "Active Quests",
    value: 0,
    bgColor: "bg-blue-100",
    textColor: "text-blue-600",
  },
  {
    id: "2",
    label: "Completed",
    value: 0,
    bgColor: "bg-purple-100",
    textColor: "text-purple-600",
  },
];

export function Projects({
  projects: initialProjects,
  onEdit,
  onDelete,
  onViewDetails,
}: ProjectsProps) {
  const router = useRouter();
  const { setPageTitle } = usePageTitle();
  const [filterDropdown, setFilterDropdown] = useState("all-projects");
  const [sortBy, setSortBy] = useState("newest");
  const [arenaFilter, setArenaFilter] = useState("all-arenas");
  const [projects, setProjects] = useState<Project[]>(initialProjects || []);
  const [badges, setBadges] = useState(DEFAULT_BADGES);
  const [isLoading, setIsLoading] = useState(!initialProjects || initialProjects.length === 0);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState("");
  const [hoveredProjectId, setHoveredProjectId] = useState<string | null>(null);

  useEffect(() => {
    setPageTitle('Projects');
  }, [setPageTitle]);

  // Fetch projects and statistics from API
  useEffect(() => {
    const loadData = async () => {
      try {
        const [fetchedProjects, stats] = await Promise.all([
          fetchProjects(),
          fetchStatistics(),
        ]);

        // Transform API projects to component format
        const transformedProjects: Project[] = fetchedProjects.map((project: any) => ({
          id: project.id,
          name: project.name,
          description: project.description,
          status: (project.status as Project["status"]) || "Active",
          stage: project.stage,
          createdDate: project.createdDate,


          participantCount: project.members?.length || 0,
        }));

        setProjects(transformedProjects);
        const activeProjects = stats.totalProjects - stats.completedProjects;
        setBadges([
          {
            id: "1",
            label: "Active Quests",
            value: activeProjects,
            bgColor: "bg-blue-100",
            textColor: "text-blue-600",
          },
          {
            id: "2",
            label: "Completed",
            value: stats.completedProjects || 0,
            bgColor: "bg-purple-100",
            textColor: "text-purple-600",
          },
        ]);
      } catch (error) {
        console.error('Failed to fetch projects:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (!initialProjects || initialProjects.length === 0) {
      loadData();
    } else {
      setIsLoading(false);
    }
  }, [initialProjects]);

  const handleToggleFavorite = (projectId: string) => {
    setFavorites((prev) => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(projectId)) {
        newFavorites.delete(projectId);
      } else {
        newFavorites.add(projectId);
      }
      return newFavorites;
    });
  };

  const filteredProjects = projects.filter((project) =>
    project.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-4 sm:p-6 bg-white min-h-screen">
      {isLoading ? (
        <div className="flex items-center justify-center min-h-screen">
          <p className="text-gray-500">Loading projects...</p>
        </div>
      ) : (
        <>
          {/* Header */}
          <div className="mb-6 flex justify-between items-center">
            <h2 className="text-lg text-black font-semibold">
              Manage your gamified projects{" "}
              <span role="img" aria-label="celebration">
                👏
              </span>
            </h2>
          </div>

          {/* Filter and Stats Bar */}
          <div className="flex flex-col sm:flex-row gap-3 mb-8 items-center">
            {/* Filter Dropdowns */}
            <div className="flex gap-2 items-center flex-wrap">
              <Select value={filterDropdown} onValueChange={setFilterDropdown}>
                <SelectTrigger size="lg" className="h-9 !rounded-full text-gray-500 text-sm gap-1 px-3">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent align="start">
                  <SelectItem value="all-projects">All projects</SelectItem>
                  <SelectItem value="active-quests">Active quests</SelectItem>
                  <SelectItem value="completed-quests">Completed quests</SelectItem>
                  <SelectItem value="unlocked-quests">Unlocked quests</SelectItem>
                  <SelectItem value="drafts">Drafts</SelectItem>
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger size="lg" className="h-9 !rounded-full text-gray-500 text-sm gap-1 px-3">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent align="start">
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="oldest">Oldest</SelectItem>
                  <SelectItem value="most-popular">Most Popular</SelectItem>
                </SelectContent>
              </Select>

              <Select value={arenaFilter} onValueChange={setArenaFilter}>
                <SelectTrigger size="lg" className="h-9 !rounded-full text-gray-500 text-sm gap-1 px-3">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent align="start">
                  <SelectItem value="all-arenas">All arenas</SelectItem>
                  <SelectItem value="arena-1">Arena 1</SelectItem>
                  <SelectItem value="arena-2">Arena 2</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-xs relative">
              <Input
                type="text"
                placeholder="Search quest"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />

            </div>

            {/* Add Project Button */}
            <div className="ml-auto mr-4">
              <Button variant="primary" className="text-h3 h-9 w-50 " onClick={() => router.push('/projects/create')}>
                <Plus className="w-6 h-6" />
                Add project
              </Button>
            </div>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {filteredProjects.map((project) => {
              const stageMap: Record<string, string> = {
                "onboarding": "Onboarding",
                "engagement": "Engagement",
                "training": "Training",
                "pre-onboarding": "PreOnboarding"
              };
              const normalizedStage = stageMap[(project as any).stage?.toLowerCase()] || "Onboarding";
              const stageColors = getProjectStageColors(normalizedStage);
              const statusColors = getProjectStatusColors(project.status);
              const isHovered = hoveredProjectId === project.id;
              
              return (
                <div 
                  key={project.id} 
                  className="relative group"
                  onMouseEnter={() => setHoveredProjectId(project.id)}
                  onMouseLeave={() => setHoveredProjectId(null)}
                >
                  {/* Action Buttons - appears behind the sliding card */}
                  <div className="flex absolute bottom-0 left-0 right-0 w-full flex-row items-center justify-between gap-3 rounded-b-[30px] px-6 pt-8 pb-3 bg-[#CFCFFF] transition-opacity duration-300 -mt-1">
                    <Button
                      
                      variant="primary"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (onEdit) {
                          onEdit(project.id);
                        } else {
                          router.push(`/projects/update?id=${project.id}`);
                        }
                      }}
                      className="!text-[#716DF0] !bg-white flex items-center gap-1"
                    >
                      <SquarePen className="w-4 h-4" />
                      Edit
                    </Button>
                    <Button
                      variant="primary"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (onViewDetails) {
                          onViewDetails(project.id);
                        } else {
                          router.push(`/projects/${project.id}`);
                        }
                      }}
                      className="!text-[#716DF0] !bg-white flex items-center gap-1"
                    >
                      <Eye className="w-4 h-4" />
                      View
                    </Button>
                  </div>

                  {/* Project Card */}
                  <Card
                    className={`${stageColors?.bg || 'bg-gray-100'} !rounded-[30px] !shadow-pj  !p-0 transition-all duration-300 transform overflow-hidden flex flex-col h-full  ${
                      isHovered ? '-translate-y-14' : 'translate-y-0'
                    }`}
                  >
                    {/* Image/Icon Area */}
                    <div className={`${stageColors?.bg || 'bg-gray-100'} h-32 w-full flex items-center justify-center relative overflow-hidden`}>
                      {project.image ? (
                        <Image src={project.image} alt={project.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="text-4xl">🎯</div>
                      )}
                      {/* Status Badge */}
                      <Badge className={`absolute top-3 right-3 text-xs font-medium rounded-full ${statusColors?.bg} ${statusColors?.text}`}>
                        {project.status}
                      </Badge>
                    </div>

                    {/* Content Area */}
                    <div className="bg-white p-4 flex flex-col flex-1">
                      {/* Title and Heart */}
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-sm font-semibold text-gray-800 flex-1 pr-2">
                          {project.name}
                        </h3>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleToggleFavorite(project.id);
                          }}
                          className="flex-shrink-0"
                        >
                          <Heart
                            className={`w-5 h-5  transition-colors ${favorites.has(project.id)
                                ? `fill-current ${stageColors?.text || 'text-red-500'}`
                                : `${stageColors?.text || 'text-gray-300'} hover:opacity-80`
                              }`}
                          />
                        </button>
                      </div>

                      {/* Description */}
                      <p className="text-xs text-gray-500 mb-3 line-clamp-2 flex-1">
                        {project.description}
                      </p>

                      {/* Tags and Info */}
                      <div className="space-y-2">
                        {/* Status Badge and Date */}
                        <div className="flex justify-between items-center">
                          <Badge
                            variant="default"
                            className={`${stageColors?.badge || 'bg-gray-100'} ${stageColors?.text || 'text-gray-700'} rounded-full text-xs`}
                          >
                            {project.stage}
                          </Badge>
                          <p className="text-xs text-gray-500">{project.createdDate}</p>
                        </div>

                        {/* Participants Count and Progress Bar */}
                        <div className="flex items-center justify-between gap-2">
                          <p className="text-xs text-gray-600">
                            +{project.participantCount || 0} participants
                          </p>
                          <div className="w-16">
                            <Progress
                              variant="gradient"
                              value={Math.min((project.participantCount || 0) * 10, 100)}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
