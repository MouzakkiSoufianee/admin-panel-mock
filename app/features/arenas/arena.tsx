"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { usePageTitle } from "@/app/contexts/page-title-context";
import { arenaService } from "./services/arenaService";
import { ArenaList } from "./components/ArenaList";
import { Button } from "@/app/components/ui/button";
import { Badge } from "@/app/components/ui/badge";
import { Plus, Search } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select";
import { Input } from "@/app/components/ui/input";
import type { Arena, ArenasProps, Badge as BadgeType } from "./types";

const DEFAULT_BADGES: BadgeType[] = [
  {
    id: "1",
    label: "Total Arenas",
    value: 0,
    bgColor: "bg-[#DDF3FF]",
    textColor: "text-[#5A7BFF]",
  },
  {
    id: "2",
    label: "Total Projects",
    value: 0,
    bgColor: "bg-[#DFF8E1]",
    textColor: "text-[#358C3B]",
  },
];

export function Arena({
  arenas: initialArenas,
  onEdit,
  onDelete,
  onDiscover,
}: ArenasProps) {
  const router = useRouter();
  const { setPageTitle } = usePageTitle();
  const [filterDropdown, setFilterDropdown] = useState("all");
  const [arenas, setArenas] = useState<Arena[]>(initialArenas || []);
  const [badges, setBadges] = useState<BadgeType[]>(DEFAULT_BADGES);
  const [isLoading, setIsLoading] = useState(!initialArenas || initialArenas.length === 0);

  useEffect(() => {
    setPageTitle('Arenas');
  }, [setPageTitle]);

  // Fetch arenas and statistics from API
  useEffect(() => {
    const loadData = async () => {
      try {
        const [fetchedArenas, stats] = await Promise.all([
          arenaService.fetchAllArenas(),
          arenaService.fetchStatistics(),
        ]);
        setArenas(fetchedArenas);
        setBadges([
          {
            id: "1",
            label: "Total Arenas",
            value: stats.totalArenas,
            bgColor: "bg-blue-100",
            textColor: "text-blue-600",
          },
          {
            id: "2",
            label: "Total Projects",
            value: stats.totalProjects,
            bgColor: "bg-green-100",
            textColor: "text-green-600",
          },
        ]);
      } catch (error) {
        console.error('Failed to fetch arenas:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (!initialArenas || initialArenas.length === 0) {
      loadData();
    } else {
      setIsLoading(false);
    }
  }, [initialArenas]);

  const handleEdit = (arenaId: string) => {
    if (onEdit) {
      onEdit(arenaId);
    } else {
      router.push(`/arenas/update?id=${arenaId}`);
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
    <div className="p-4 sm:p-6 bg-white min-h-screen">
      {isLoading ? (
        <div className="flex items-center justify-center min-h-screen">
          <p className="text-gray-500">Loading arenas...</p>
        </div>
        
      ) : (
        <>
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
          <Select value={filterDropdown} onValueChange={setFilterDropdown}>
            <SelectTrigger size="lg" >
              <SelectValue />
            </SelectTrigger>
            <SelectContent align="start">
              <SelectItem value="all">All arenas</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex-1 max-w-xs relative">
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-6 h-6  text-gray-400" />
          <Input
            type="text"
            placeholder="Search arenas..."
            className="w-full pl-9 pr-3 py-2  border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex gap-2">
          {badges.map((badge) => (
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

          <Button variant="primary" className="h-9" onClick={() => router.push('/arenas/create')}>
            <Plus />
            Add Arena
          </Button>
        </div>

      </div>
      <div className="flex items-center ">
        <h2 className="text-black font-semibold mb-4">Recent Arenas</h2>
        <Button variant="purple_link" className="ml-auto mr-10">view all arenas</Button>
      </div>
      {/* Arenas Grid */}
      <ArenaList
        arenas={arenas}
        onEdit={handleEdit}
        onDiscover={handleDiscover}
      />
        </>
      )}
    </div>
  );
}
