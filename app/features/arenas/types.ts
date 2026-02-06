export interface Arena {
  id: string;
  name: string;
  description: string;
  projectCount: number;
  date: string;
  status?: string;
  projects?: string[];
}

export interface Project {
  id: string;
  name: string;
  status: string;
  createdDate: string;
}

export interface Badge {
  id: string;
  label: string;
  value: number;
  bgColor: string;
  textColor: string;
}

export interface ArenasProps {
  arenas?: Arena[];
  onEdit?: (arenaId: string) => void;
  onDelete?: (arenaId: string) => void;
  onDiscover?: (arenaId: string) => void;
}

export interface ArenaFormData {
  arenaName: string;
  description: string;
  arenaIcon: File | null;
  isPublic: boolean;
  selectedProjects: string[];
  tags: string[];
}
