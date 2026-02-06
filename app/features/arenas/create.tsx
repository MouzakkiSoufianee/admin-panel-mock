'use client';

import { useCallback, useState, useEffect } from 'react';
import { usePageTitle } from '@/app/contexts/page-title-context';
import { Card } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Textarea } from '@/app/components/ui/text-area';
import { Badge } from '@/app/components/ui/badge';
import { MoveLeft, X, Check } from 'lucide-react';
import Image from 'next/image';
import { Checkbox } from '@/app/components/ui/checkbox';
import { ProjectsIcon } from '@/app/components/shared/sidebarSections/icons';
interface Project {
  id: string;
  name: string;
  status: string;
  createdDate: string;
}

export default function CreateArenaPage() {
  const { setPageTitle } = usePageTitle();

  useEffect(() => {
    setPageTitle('Create Arena');
  }, [setPageTitle]);

  // Form State
  const [arenaName, setArenaName] = useState('');
  const [description, setDescription] = useState('');
  const [arenaIcon, setArenaIcon] = useState<File | null>(null);
  const [isPublic, setIsPublic] = useState(true);
  const [selectedProjects, setSelectedProjects] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');

  // Mock available projects
  const availableProjects: Project[] = [
    {
      id: '1',
      name: 'Rock your start',
      status: 'Onboarding',
      createdDate: 'Jul 15, 2025'
    },
    {
      id: '2',
      name: 'Rock your start',
      status: 'Onboarding',
      createdDate: 'Jul 15, 2025'
    },
    {
      id: '3',
      name: 'Rock your start',
      status: 'Onboarding',
      createdDate: 'Jul 15, 2025'
    }
  ];

  

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
      <div className="mx-auto">
        <h1 className="text-xl font-bold text-black mb-1 ml-2">Create New Arena</h1>
        <Button
          onClick={() => window.location.href = '/arenas'}
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
              Provide basic information about your arena. The name will be automatically converted to lowercase for consistency.
              </p>

              <div className="mb-6">
              <label className="block text-sm text-black font-medium mb-2">*Arena name</label>
              <Input
                value={arenaName}
                onChange={(e) => setArenaName(e.target.value)}
                placeholder="e.g. arena-name"
                className="w-full"
              />
              </div>

              <div className="mb-6">
              <label className="block text-sm text-black font-medium mb-2">Description</label>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe the purpose and context of this arena"
                rows={4}
                className="h-35 min-h-[80px] max-h-[320px] resize-y overflow-y-auto w-full"
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
                  Optionally assign existing projects to this arena. You can also do this later.
                </p>
              </div>

              <div className="mb-4 flex justify-between items-center">
                <p className="text-sm text-gray-600">
                  {selectedProjects.length} of {availableProjects.length} projects selected
                </p>
                <div className="flex gap-2">
                    <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedProjects(availableProjects.map((p) => p.id))}
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
                    <p className="text-sm font-medium text-black ml-4 flex-1">{project.name}</p>
                    <p className="text-xs text-gray-600 flex-1">Created {project.createdDate}</p>
                    <Badge variant="default" className="text-xs">
                      {project.status}
                    </Badge>
                    </div>
                ))}
              </div>
            </Card>

            {/* Action Buttons */}
            <div className="flex gap-4 justify-end">
              <Button variant="secondary">Cancel</Button>
              <Button variant="primary"  onClick={handleSave}>
                Create Arena
              </Button>
            </div>
          </div>

          
          <div className="col-span-1 row-span-3">
          <div className="col-span-1 row-span-3">
            <Card className="p-6 h-fit w-full sticky top-6 md:max-h-[calc(100vh-100px)] overflow-y-auto rounded-xl !border-[#C1CEFF] !bg-gray-100">
              <h2 className="text-lg font-semibold text-black mb-4">About Arenas</h2>
              <ul className="space-y-3 text-sm text-gray-700">
                <li className="flex gap-2">
                  <span className="text-gray-400 flex-shrink-0">•</span>
                  <span>Arenas provide thematic contexts for gamified projects experiences</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-gray-400 flex-shrink-0">•</span>
                  <span>Each arena can be assigned to multiple projects</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-gray-400 flex-shrink-0">•</span>
                  <span>Arena names are automatically converted to lowercase for consistency</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-gray-400 flex-shrink-0">•</span>
                  <span>You can only delete arenas that have no assigned projects</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-gray-400 flex-shrink-0">•</span>
                  <span>Use descriptive names that reflect the theme or department</span>
                </li>
              </ul>
            </Card>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
}
