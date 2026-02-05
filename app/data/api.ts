import mockData from './mockData.json';

export interface Arena {
  id: string;
  name: string;
  description: string;
  projectCount: number;
  date: string;
  status?: string;
  icon?: string;
  members: string[];
  projects: string[];
}

export interface Project {
  id: string;
  name: string;
  description: string;
  status: string;
  createdDate: string;
  arenaId: string;
  members: string[];
  difficulty: string;
  progress: number;
}

export interface Member {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar: string;
  status: string;
  joinDate: string;
}

// Simulate API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Fetch all arenas
 * @returns Promise<Arena[]>
 */
export const fetchArenas = async (): Promise<Arena[]> => {
  await delay(300);
  return mockData.arenas as Arena[];
};

/**
 * Fetch a single arena by ID
 * @param id - Arena ID
 * @returns Promise<Arena | null>
 */
export const fetchArenaById = async (id: string): Promise<Arena | null> => {
  await delay(500);
  const arena = mockData.arenas.find((a: any) => a.id === id);
  return arena || null;
};

/**
 * Fetch all projects
 * @returns Promise<Project[]>
 */
export const fetchProjects = async (): Promise<Project[]> => {
  await delay(300);
  return mockData.projects as Project[];
};

/**
 * Fetch projects by arena ID
 * @param arenaId - Arena ID
 * @returns Promise<Project[]>
 */
export const fetchProjectsByArenaId = async (arenaId: string): Promise<Project[]> => {
  await delay(400);
  return mockData.projects.filter((p: any) => p.arenaId === arenaId) as Project[];
};

/**
 * Fetch unassigned projects (available for assignment)
 * @param arenaId - Current arena ID (to exclude already assigned projects)
 * @returns Promise<Project[]>
 */
export const fetchAvailableProjects = async (arenaId: string): Promise<Project[]> => {
  await delay(400);
  const currentArena = mockData.arenas.find((a: any) => a.id === arenaId) as any;
  const assignedProjectIds = currentArena?.projects || [];
  
  return mockData.projects.filter((p: any) => !assignedProjectIds.includes(p.id)) as Project[];
};

/**
 * Fetch a single project by ID
 * @param id - Project ID
 * @returns Promise<Project | null>
 */
export const fetchProjectById = async (id: string): Promise<Project | null> => {
  await delay(500);
  const project = mockData.projects.find((p: any) => p.id === id);
  return project || null;
};

/**
 * Fetch all members
 * @returns Promise<Member[]>
 */
export const fetchMembers = async (): Promise<Member[]> => {
  await delay(300);
  return mockData.members as Member[];
};

/**
 * Fetch a single member by ID
 * @param id - Member ID
 * @returns Promise<Member | null>
 */
export const fetchMemberById = async (id: string): Promise<Member | null> => {
  await delay(400);
  const member = mockData.members.find((m: any) => m.id === id);
  return member || null;
};

/**
 * Fetch members by arena ID
 * @param arenaId - Arena ID
 * @returns Promise<Member[]>
 */
export const fetchMembersByArenaId = async (arenaId: string): Promise<Member[]> => {
  await delay(400);
  const arena = mockData.arenas.find((a: any) => a.id === arenaId) as any;
  if (!arena) return [];
  
  return mockData.members.filter((m: any) => arena.members.includes(m.id)) as Member[];
};

/**
 * Fetch statistics
 * @returns Promise<any>
 */
export const fetchStatistics = async () => {
  await delay(300);
  return mockData.statistics;
};

/**
 * Get mock data object (raw)
 */
export const getMockData = () => mockData;
