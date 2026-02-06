'use client';

import { ArenaCard } from './ArenaCard';
import type { Arena, ArenasProps } from '../types';

export function ArenaList({
  arenas,
  onEdit,
  onDiscover
}: {
  arenas: Arena[];
  onEdit?: (arenaId: string) => void;
  onDiscover?: (arenaId: string) => void;
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mr-10">
      {arenas.map((arena) => (
        <ArenaCard
          key={arena.id}
          arena={arena}
          onEdit={onEdit}
          onDiscover={onDiscover}
        />
      ))}
    </div>
  );
}
