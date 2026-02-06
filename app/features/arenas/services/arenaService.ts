import { fetchArenas, fetchStatistics, fetchArenaById, fetchProjectsByArenaId, fetchAvailableProjects } from '@/app/data/api';
import { Arena, Project, Badge } from '../types';

export const arenaService = {
  async fetchAllArenas(): Promise<Arena[]> {
    try {
      return await fetchArenas();
    } catch (error) {
      console.error('Failed to fetch arenas:', error);
      return [];
    }
  },

  async fetchStatistics() {
    try {
      return await fetchStatistics();
    } catch (error) {
      console.error('Failed to fetch statistics:', error);
      return { totalArenas: 0, totalProjects: 0 };
    }
  },

  async fetchArenaWithDetails(arenaId: string): Promise<{ arena: Arena | null; projects: Project[] }> {
    try {
      const [arena, projects] = await Promise.all([
        fetchArenaById(arenaId),
        fetchProjectsByArenaId(arenaId)
      ]);
      return { arena, projects };
    } catch (error) {
      console.error('Failed to fetch arena details:', error);
      return { arena: null, projects: [] };
    }
  },

  async fetchAvailableProjectsForArena(arenaId: string): Promise<Project[]> {
    try {
      return await fetchAvailableProjects(arenaId);
    } catch (error) {
      console.error('Failed to fetch available projects:', error);
      return [];
    }
  },

  async createArena(formData: any): Promise<{ success: boolean; error?: string }> {
    try {
      // API call would go here
      console.log('Creating arena:', formData);
      return { success: true };
    } catch (error) {
      console.error('Failed to create arena:', error);
      return { success: false, error: 'Failed to create arena' };
    }
  },

  async updateArena(arenaId: string, formData: any): Promise<{ success: boolean; error?: string }> {
    try {
      // API call would go here
      console.log('Updating arena:', arenaId, formData);
      return { success: true };
    } catch (error) {
      console.error('Failed to update arena:', error);
      return { success: false, error: 'Failed to update arena' };
    }
  },

  async deleteArena(arenaId: string): Promise<{ success: boolean; error?: string }> {
    try {
      // API call would go here
      console.log('Deleting arena:', arenaId);
      return { success: true };
    } catch (error) {
      console.error('Failed to delete arena:', error);
      return { success: false, error: 'Failed to delete arena' };
    }
  }
};
