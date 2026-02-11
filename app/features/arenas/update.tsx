'use client';

import { useCallback, useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { usePageTitle } from '@/app/contexts/page-title-context';
import { fetchArenaById, fetchProjectsByArenaId, fetchAvailableProjects } from '@/app/data/api';
import { Card } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Textarea } from '@/app/components/ui/text-area';
import { Badge } from '@/app/components/ui/badge';
import { MoveLeft, X, Check } from 'lucide-react';
import Image from 'next/image';
import { Checkbox } from '@/app/components/ui/checkbox';
import { ProjectsIcon } from '@/app/components/shared/sidebarSections/icons';
import { FileCheck } from 'lucide-react';
interface Project {
  id: string;
  name: string;
  status: string;
  createdDate: string;
}

export default function UpdateArenaPage() {
  const { setPageTitle } = usePageTitle();
  const router = useRouter();
  const params = useParams();
  const arenaId = params.id as string;

  // Form State
  const [arenaName, setArenaName] = useState('');
  const [description, setDescription] = useState('');
  const [arenaIcon, setArenaIcon] = useState<File | null>(null);
  const [isPublic, setIsPublic] = useState(true);
  const [selectedProjects, setSelectedProjects] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [currentAssignedProjects, setCurrentAssignedProjects] = useState<Project[]>([]);
  const [availableProjects, setAvailableProjects] = useState<Project[]>([]);

  useEffect(() => {
    setPageTitle('Update Arena');
  }, [setPageTitle]);

  // Fetch arena data on mount
  useEffect(() => {
    if (arenaId) {
      Promise.all([
        fetchArenaById(arenaId),
        fetchProjectsByArenaId(arenaId),
        fetchAvailableProjects(arenaId)
      ]).then(([arena, assignedProjects, unassignedProjects]) => {
        if (arena) {
          setArenaName(arena.name);
          setDescription(arena.description);
          setSelectedProjects(arena.projects || []);
        }
        
        // Map assigned projects
        const assignedWithDetails: Project[] = assignedProjects.map((p: any) => ({
          id: p.id,
          name: p.name,
          status: p.status,
          createdDate: p.createdDate
        }));
        setCurrentAssignedProjects(assignedWithDetails);
        
        // Map available projects
        const availableWithDetails: Project[] = unassignedProjects.map((p: any) => ({
          id: p.id,
          name: p.name,
          status: p.status,
          createdDate: p.createdDate
        }));
        setAvailableProjects(availableWithDetails);
        
        setIsLoading(false);
      });
    }
  }, [arenaId]);

  

  const toggleProjectSelection = useCallback((projectId: string) => {
    setSelectedProjects((prev) =>
      prev.includes(projectId)
        ? prev.filter((id) => id !== projectId)
        : [...prev, projectId]
    );
  }, []);

  

  

 

  const handleSave = () => {
    console.log({
      arenaName,
      description,
      
      
      isPublic,
      selectedProjects,
      tags
    });
  };

  return (
    <div className="min-h-screen bg-white p-6">
      {isLoading ? (
        <div className="flex items-center justify-center min-h-screen">
          <p className="text-gray-500">Loading arena details...</p>
        </div>
      ) : (
        <div className="mx-auto">
          <h1 className="text-xl font-bold text-black mb-1 ml-2">Update Arena</h1>
          <Button
            onClick={() => window.location.href = '/arena'}
            variant="purple_link"
            className="flex items-center gap-2 bg-white font-medium mb-4"
          >
            <MoveLeft size={16} />
            Back to arenas
          </Button>

        <div className="grid grid-cols-3 gap-6 mt-6">
          <div className="col-span-2 space-y-6">
            {/* Arena Details */}
            <Card className="p-6">
              <div className="flex items-center gap-4 mb-4">
              
              <h2 className="text-lg font-semibold text-black">Arena Details</h2>
              </div>
              <p className="text-sm text-gray-600 mb-6">
              Update basic information about your arena. The name will be automatically converted to lowercase for consistency.
              </p>

              <div className="mb-6">
              <label className="block text-sm text-black font-medium mb-2">*Arena name</label>
              <Input
                value={arenaName}
                onChange={(e) => setArenaName(e.target.value)}
                placeholder="e.g. arena-name"
                className="w-full !text-[#13133C]"
              />
              </div>

              <div className="mb-6">
              <label className="block text-sm text-black font-medium mb-2">Description</label>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe the purpose and context of this arena"
                rows={4}
                className="h-35 min-h-[80px] max-h-[320px] resize-y overflow-y-auto w-full !text-[#13133C]"
              />
              <p className="text-xs text-gray-500 mt-1">
                Optional: Provide context about this arena, its purpose and theme.
              </p>
              </div>

              
            </Card>

            

            {/* Assign Projects */}
            <Card className="p-6">
              <div className="mb-6">
                <h2 className="flex items-center  text-lg font-semibold text-black mb-2 gap-2"><ProjectsIcon color="black"  />  Assign Projects</h2>
                <p className="text-sm text-gray-600">
                  Add or remove projects assigned to this arena.
                </p>
              </div>

              {/* Currently Assigned Projects */}
              {currentAssignedProjects.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-sm font-semibold text-black mb-4">Current Assigned Projects</h3>
                  <div className="space-y-2">
                    {currentAssignedProjects.map((project) => (   
                        <div
                        key={project.id}
                        className="flex items-center p-3 border border-[#7BB6A7] rounded-2xl  cursor-pointer bg-green-50"
                        onClick={() => toggleProjectSelection(project.id)}
                        >
                        <Checkbox
                        className="!bg-[#7BB6A7]"
                          checked={selectedProjects.includes(project.id)}
                          onChange={() => toggleProjectSelection(project.id)}
                        />
                        <div className="flex-1 ml-4">
                          <p className="text-sm font-medium text-black">{project.name}</p>
                        </div>
                        <div className="flex-1 flex justify-center">
                          <Badge variant="default" className="text-xs bg-[#CFF0E8]  text-[#378874] ">
                            Currently Assigned
                          </Badge>
                        </div>
                        <div className="flex-1">
                          <p className="text-xs text-gray-600">Created {project.createdDate}</p>
                        </div>
                        <div className="flex-1 flex justify-end">
                          <Badge variant="default" className="text-xs">
                            {project.status}
                          </Badge>
                        </div>
                        </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Available Projects */}
              {availableProjects.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold text-black mb-4">Available Projects</h3>
                  <div className="mb-4 flex justify-between items-center">
                    <p className="text-sm text-gray-600">
                      {selectedProjects.length} of {currentAssignedProjects.length + availableProjects.length} projects selected
                    </p>
                    <div className="flex gap-2">
                        <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedProjects([...currentAssignedProjects.map((p) => p.id), ...availableProjects.map((p) => p.id)])}
                        className="text-xs"
                        >
                        Select All
                        </Button>

                        <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedProjects([])}
                        className="text-xs"
                        >
                        Clear All
                        </Button>
                    </div>
                  </div>

                  <div className=" space-y-2">
                    {availableProjects.map((project) => (   
                        <div
                        key={project.id}
                        className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
                        onClick={() => toggleProjectSelection(project.id)}
                        >
                        <Checkbox
                          checked={selectedProjects.includes(project.id)}
                          onChange={() => toggleProjectSelection(project.id)}
                        />
                        <div className="flex-1 ml-4">
                          <p className="text-sm font-medium text-black">{project.name}</p>
                        </div>
                        <div className="flex-1">
                          <p className="text-xs text-gray-600 text-center">Created {project.createdDate}</p>
                        </div>
                        <div className="flex-1 flex justify-end">
                          <Badge variant="default" className="text-xs">
                            {project.status}
                          </Badge>
                        </div>
                        </div>
                    ))}
                  </div>
                </div>
              )}
            </Card>

            {/* Action Buttons */}
            <div className="flex gap-4 justify-end">
              <Button variant="secondary">Cancel</Button>
              <Button variant="primary"  onClick={handleSave}>
                <FileCheck  />
                Save changes
              </Button>
            </div>
          </div>

          
          <div className="col-span-1">
            <div className="sticky top-6 space-y-6">
            <Card className="p-6 w-full rounded-xl">
                <h2 className="text-lg font-semibold text-black mb-6">Arena Status</h2>
                
                <div className="space-y-6">
                    <div>
                        <p className="text-xs text-gray-600 font-medium mb-2">Current Name</p>
                        <p className="text-sm font-semibold text-black">{arenaName || 'N/A'}</p>
                    </div>
                    
                    <div>
                        <p className="text-xs text-gray-600 font-medium mb-2">Assigned Projects</p>
                        <p className="text-sm font-semibold text-black">{selectedProjects.length}</p>
                    </div>
                    
                    <div>
                        <p className="text-xs text-gray-600 font-medium mb-2">Last Project</p>
                        <p className="text-sm font-semibold text-black">
                            {currentAssignedProjects.length > 0 
                                ? currentAssignedProjects[currentAssignedProjects.length - 1].createdDate 
                                : 'N/A'}
                        </p>
                    </div>
                </div>
            </Card>
              <Card className="p-6 w-full rounded-xl !border-[#C1CEFF] !bg-gray-100">
                <h2 className="text-lg font-semibold text-black mb-4">About Arenas</h2>
                <ul className="space-y-3 text-sm text-gray-700">
                  <li className="flex gap-2">
                    <span className="text-gray-400 flex-shrink-0">•</span>
                    <span>Changes are saved only when you click "Save Changes"</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-gray-400 flex-shrink-0">•</span>
                    <span>You can modify basic info and projects independently</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-gray-400 flex-shrink-0">•</span>
                    <span>Projects can only be assigned to one arena at a time</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-gray-400 flex-shrink-0">•</span>
                    <span>Removing all projects won't delete the arena</span>
                  </li>
                  
                </ul>
              </Card>
            </div>
          </div>
        </div>
        </div>
      )}
    </div>
  );
}
