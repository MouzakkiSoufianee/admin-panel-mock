'use client';

import { useState } from 'react';
import { Card } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Badge } from '@/app/components/ui/badge';
import { EllipsisVertical, SquarePen, Eye } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { EventsIcon, ProjectsIcon } from '@/app/components/shared/sidebarSections/icons';
import type { Arena } from '../types';

interface ArenaCardProps {
  arena: Arena;
  onEdit?: (arenaId: string) => void;
  onDiscover?: (arenaId: string) => void;
}

export function ArenaCard({ arena, onEdit, onDiscover }: ArenaCardProps) {
  const router = useRouter();
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const handleEdit = () => {
    if (onEdit) {
      onEdit(arena.id);
    } else {
      router.push(`/arenas/${arena.id}`);
    }
  };

  const handleDiscover = () => {
    if (onDiscover) {
      onDiscover(arena.id);
    }
  };

  return (
    <div className="relative group">
      {/* Action Buttons - appears behind the sliding card */}
      <div className="flex absolute bottom-0 left-0 right-0 w-full flex-row items-center justify-between gap-2 rounded-b-2xl p-3 bg-[#CFCFFF] transition-opacity duration-300 -mt-2">
        <Button
          variant="outline"
          onClick={handleEdit}
          className="text-[#716DF0] hover:bg-blue-200 flex items-center gap-1"
        >
          <SquarePen className="w-4 h-4" />
          edit
        </Button>
        <Button
          variant="outline"
          onClick={handleDiscover}
          className="text-[#716DF0] flex items-center gap-1"
        >
          <Eye className="w-4 h-4" />
          Discover
        </Button>
      </div>

      {/* Main Card Content - slides up when expanded */}
      <Card
        className={`bg-white rounded-full shadow-md p-4 transition-all duration-300 transform cursor-pointer !rounded-[16px] shadow-sm hover:shadow-lg h-52 w-auto flex flex-col ${
          expandedId === arena.id ? '-translate-y-12' : 'translate-y-0'
        }`}
        onClick={() => setExpandedId(expandedId === arena.id ? null : arena.id)}
      >
        {/* Card Header with title and menu */}
        <div className="flex justify-between items-start mb-3 flex-shrink-0">
          <div className="flex-1 pr-2">
            <h3 className="text-md font-semibold text-[#7570F2] mb-1">
              {arena.name}
            </h3>
            <p className="text-xs text-gray-500 line-clamp-2">
              {arena.description}
            </p>
          </div>
        </div>
        <div className="flex-1"></div>

        {/* Date */}
        <div className="flex items-center gap-2 text-xs text-gray-500 flex-shrink-0">
          <div className="flex justify-center items-center gap-1 bg-green-100 text-green-700 rounded-full px-2 py-1">
            <ProjectsIcon color="green" />
            <span className="text-xs font-medium">
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
  );
}
