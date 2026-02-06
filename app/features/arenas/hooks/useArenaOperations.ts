"use client";
import { useState, useCallback } from 'react';
import { arenaService } from '../services/arenaService';
import { ArenaFormData } from '../types';

export function useArenaForm() {
  const [arenaName, setArenaName] = useState('');
  const [description, setDescription] = useState('');
  const [arenaIcon, setArenaIcon] = useState<File | null>(null);
  const [isPublic, setIsPublic] = useState(true);
  const [selectedProjects, setSelectedProjects] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const getFormData = useCallback((): ArenaFormData => ({
    arenaName,
    description,
    arenaIcon,
    isPublic,
    selectedProjects,
    tags
  }), [arenaName, description, arenaIcon, isPublic, selectedProjects, tags]);

  const resetForm = useCallback(() => {
    setArenaName('');
    setDescription('');
    setArenaIcon(null);
    setIsPublic(true);
    setSelectedProjects([]);
    setTags([]);
    setTagInput('');
  }, []);

  const setFormData = useCallback((data: Partial<ArenaFormData>) => {
    if (data.arenaName !== undefined) setArenaName(data.arenaName);
    if (data.description !== undefined) setDescription(data.description);
    if (data.arenaIcon !== undefined) setArenaIcon(data.arenaIcon);
    if (data.isPublic !== undefined) setIsPublic(data.isPublic);
    if (data.selectedProjects !== undefined) setSelectedProjects(data.selectedProjects);
    if (data.tags !== undefined) setTags(data.tags);
  }, []);

  return {
    // State
    arenaName,
    setArenaName,
    description,
    setDescription,
    arenaIcon,
    setArenaIcon,
    isPublic,
    setIsPublic,
    selectedProjects,
    setSelectedProjects,
    tags,
    setTags,
    tagInput,
    setTagInput,
    isLoading,
    setIsLoading,
    // Methods
    getFormData,
    resetForm,
    setFormData
  };
}

export function useArenaOperations() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createArena = useCallback(async (formData: ArenaFormData) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await arenaService.createArena(formData);
      if (!result.success) {
        setError(result.error || 'Failed to create arena');
      }
      return result;
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMsg);
      return { success: false, error: errorMsg };
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateArena = useCallback(async (arenaId: string, formData: ArenaFormData) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await arenaService.updateArena(arenaId, formData);
      if (!result.success) {
        setError(result.error || 'Failed to update arena');
      }
      return result;
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMsg);
      return { success: false, error: errorMsg };
    } finally {
      setIsLoading(false);
    }
  }, []);

  const deleteArena = useCallback(async (arenaId: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await arenaService.deleteArena(arenaId);
      if (!result.success) {
        setError(result.error || 'Failed to delete arena');
      }
      return result;
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMsg);
      return { success: false, error: errorMsg };
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    createArena,
    updateArena,
    deleteArena,
    isLoading,
    error
  };
}

export function useArenaList() {
  const [arenas, setArenas] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadArenas = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const fetchedArenas = await arenaService.fetchAllArenas();
      setArenas(fetchedArenas);
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to load arenas';
      setError(errorMsg);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    arenas,
    setArenas,
    isLoading,
    error,
    loadArenas
  };
}
