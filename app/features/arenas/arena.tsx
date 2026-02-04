"use client";

import { useState } from "react";
import { Card } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Badge } from "@/app/components/ui/badge";
import { ChevronDown, EllipsisVertical, Plus, Search, Eye, SquarePen } from "lucide-react";
import Image from "next/image";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger  } from "@/app/components/ui/dropdown-menu";
import { Input } from "@/app/components/ui/input";
import { EventsIcon, ProjectsIcon } from "@/app/components/shared/sidebarSections/icons";

export interface Arena {
  id: string;
  name: string;
  description: string;
  projectCount: number;
  date: string;
  status?: string;
}

interface ArenasProps {
  arenas?: Arena[];
  onEdit?: (arenaId: string) => void;
  onDelete?: (arenaId: string) => void;
  onDiscover?: (arenaId: string) => void;
}

const DEFAULT_ARENAS: Arena[] = [
  {
    id: "1",
    name: "Rock your start Arena",
    description: "Arena description here",
    projectCount: 11,
    date: "Jul 15, 2025",
    status: "Active",
  },
  {
    id: "2",
    name: "Rock your start Arena",
    description: "Arena description here",
    projectCount: 11,
    date: "Jul 15, 2025",
    status: "Active",
  },
  {
    id: "3",
    name: "Rock your start Arena",
    description: "Arena description here",
    projectCount: 11,
    date: "Jul 15, 2025",
    status: "Active",
  },
  {
    id: "4",
    name: "Rock your start Arena",
    description: "Arena description here",
    projectCount: 11,
    date: "Jul 15, 2025",
    status: "Active",
  },
  {
    id: "5",
    name: "Rock your start Arena",
    description: "Arena description here",
    projectCount: 11,
    date: "Jul 15, 2025",
    status: "Active",
  },
  {
    id: "6",
    name: "Rock your start Arena",
    description: "Arena description here",
    projectCount: 11,
    date: "Jul 15, 2025",
    status: "Active",
  },
  {
    id: "7",
    name: "Rock your start Arena",
    description: "Arena description here",
    projectCount: 11,
    date: "Jul 15, 2025",
    status: "Active",
  },
  {
    id: "8",
    name: "Rock your start Arena",
    description: "Arena description here",
    projectCount: 11,
    date: "Jul 15, 2025",
    status: "Active",
  },
  {
    id: "9",
    name: "Rock your start Arena",
    description: "Arena description here",
    projectCount: 11,
    date: "Jul 15, 2025",
    status: "Active",
  },
  {
    id: "10",
    name: "Rock your start Arena",
    description: "Arena description here",
    projectCount: 11,
    date: "Jul 15, 2025",
    status: "Active",
  },
  {
    id: "11",
    name: "Rock your start Arena",
    description: "Arena description here",
    projectCount: 11,
    date: "Jul 15, 2025",
    status: "Active",
  },
  {
    id: "12",
    name: "Rock your start Arena",
    description: "Arena description here",
    projectCount: 11,
    date: "Jul 15, 2025",
    status: "Active",
  },
  {
    id: "13",
    name: "Rock your start Arena",
    description: "Arena description here",
    projectCount: 11,
    date: "Jul 15, 2025",
    status: "Active",
  },
  {
    id: "14",
    name: "Rock your start Arena",
    description: "Arena description here",
    projectCount: 11,
    date: "Jul 15, 2025",
    status: "Active",
  },
  {
    id: "15",
    name: "Rock your start Arena",
    description: "Arena description here",
    projectCount: 11,
    date: "Jul 15, 2025",
    status: "Active",
  },
  {
    id: "16",
    name: "Rock your start Arena",
    description: "Arena description here",
    projectCount: 11,
    date: "Jul 15, 2025",
    status: "Active",
  },
];

const DEFAULT_BADGES = [
  {
    id: "1",
    label: "Total Arenas",
    value: 8,
    bgColor: "bg-blue-100",
    textColor: "text-blue-600",
  },
  {
    id: "2",
    label: "Total Projects",
    value: 44,
    bgColor: "bg-green-100",
    textColor: "text-green-600",
  },
];

export function Arena({
  arenas = DEFAULT_ARENAS,
  onEdit,
  onDelete,
  onDiscover,
}: ArenasProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleEdit = (arenaId: string) => {
    if (onEdit) {
      onEdit(arenaId);
    } else {
      console.log("Edit:", arenaId);
    }
  };

  const handleDelete = (arenaId: string) => {
    if (onDelete) {
      onDelete(arenaId);
    } else {
      console.log("Delete:", arenaId);
    }
  };

  const handleDiscover = (arenaId: string) => {
    if (onDiscover) {
      onDiscover(arenaId);
    } else {
      console.log("Discover:", arenaId);
    }
  };

  return (
    <div className="p-4 sm:p-6 bg-gray-50 min-h-screen">
      <div className="mb-6 flex justify-between items-center ">
        <h2 className="text-lg text-black font-semibold">
          Overview of your organization and recent activity{" "}
          <span role="img" aria-label="wave">
            👋
          </span>
        </h2>
        
      </div>

      {/* Filter and Stats Bar */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6 items-center">
        <div className="flex gap-2 items-center">
            
          <DropdownMenu onOpenChange={setIsDropdownOpen}>
            <DropdownMenuTrigger asChild>
            <Button variant="outlined_card" className="flex items-center h-9 !rounded-full text-gray-500 text-sm gap-1 px-3">
                All arenas
                <ChevronDown className={`w-4 h-4 mt-0.5 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="text-gray-500" align="start">
              <DropdownMenuItem>All arenas</DropdownMenuItem>
              <DropdownMenuItem>Active</DropdownMenuItem>
              <DropdownMenuItem>Inactive</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="flex-1 max-w-xs relative">
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-6 h-6  text-gray-400"  />
          <Input
            type="text"
            placeholder="Search arenas..."
            className="w-full pl-9 pr-3 py-2  border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex gap-2">
          {DEFAULT_BADGES.map((badge) => (
            <Badge
              key={badge.id}
              variant="default"
              className={`${badge.bgColor} ${badge.textColor} rounded-full`}
            >
              {badge.label} {badge.value}
            </Badge>
          ))}
        </div>
        <div className="ml-auto mr-10">
            
            <Button variant="primary" className="h-9">
            <Plus/>
           Add Arena
        </Button>
        </div>
        
      </div>

      {/* Arenas Grid */}
      <h2 className="text-black font-semibold mb-4">Recent Arenas</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mr-10">
        {arenas.map((arena) => (
          <div key={arena.id} className="relative  group">
            {/* Action Buttons - appears behind the sliding card */}
            <div
              className={`flex absolute bottom-0 left-0 right-0 w-full flex-row items-center justify-between gap-2 rounded-b-2xl p-3 bg-[#CFCFFF] transition-opacity duration-300 -mt-2`}
            >
              <Button
              variant="outline"
              onClick={() => handleEdit(arena.id)}
              className="text-[#716DF0] hover:bg-blue-200 flex items-center gap-1"
              >
                <SquarePen className="w-4 h-4" />
              edit
              </Button>
              <Button
              variant="outline"
              onClick={() => handleDiscover(arena.id)}
              className="text-[#716DF0] flex items-center gap-1"
              >
                <Eye className="w-4 h-4" /> 
                Discover
              
              </Button>
            </div>
            {/* Main Card Content - slides up when expanded */}
            <Card
              className={`bg-white rounded-2xl shadow-md p-4 transition-all duration-300 transform cursor-pointer hover:shadow-lg ${
                expandedId === arena.id ? "-translate-y-12" : "translate-y-0"
              }`}
              onClick={() =>
                setExpandedId(expandedId === arena.id ? null : arena.id)
              }
            >
              {/* Card Header with title and menu */}
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1 pr-2">
                  <h3 className="text-md font-semibold text-[#7570F2] mb-1">
                    {arena.name}
                  </h3>
                  <p className="text-xs text-gray-500">{arena.description}</p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    setExpandedId(expandedId === arena.id ? null : arena.id);
                  }}
                  className="flex-shrink-0"
                >
                </Button>
              </div>
                  <div className="h-10"></div>
             


                {/* Date */}
                <div className="flex items-center gap-2 text-xs text-gray-500">
                    <div className="flex justify-center items-center gap-1 bg-green-100 text-green-700 rounded-full px-2 py-1">
                    <ProjectsIcon  color="green" />
                    <span className="text-xs font-medium ">
                      {arena.projectCount} Projects
                    </span>
                  </div>
                  <div className="flex items-center gap-1 ml-auto bg-gray-100 rounded-full px-2 py-1">
                    <EventsIcon color="gray" />
                  <span>{arena.date}</span>
                  </div>
                  
                </div>
              
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}
