"use client";

import React, { useState } from 'react';
import { Plus, Search, MoreVertical, Trash2, Edit } from 'lucide-react';
import { Button } from '@/app/components//ui/button';
import { Input } from '@/app/components/ui/input';
import { Badge } from '@/app/components/ui/badge';
import { SlideableActionCard } from '@/app/components/ui/slideable-action-card';
import Image from 'next/image';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select';
import { Card } from '@/app';
import { fetchResources } from '@/app/data/api';
 

interface Resource {
    id: string;
    title: string;
    format: string;
    size: string;
}

export default function ResourcesPage() {
    const [resources, setResources] = useState<Resource[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [expandedId, setExpandedId] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    React.useEffect(() => {
        const loadResources = async () => {
            try {
                const apiResources = await fetchResources();
                setResources(apiResources);
            } catch (error) {
                console.error("Failed to fetch resources:", error);
            } finally {
                setLoading(false);
            }
        };

        loadResources();
    }, []);

    const handleEdit = (resourceId: string) => {
        console.log("Edit:", resourceId);
    };

    const handleDelete = (resourceId: string) => {
        console.log("Delete:", resourceId);
    };

    return (
        <div className="min-h-screen bg-white p-6">
            <div className="w-full">
                {/* Header */}
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Resources</h1>
                    <p className="text-gray-600">
                        Manage resources shared with employees across your organization.
                    </p>
                </div>

                {/* Controls */}
                <div className="flex flex-col gap-4 mb-6">
                    <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3 flex-wrap">
                            <Select defaultValue="all">
                                <SelectTrigger className="w-32">
                                    <SelectValue placeholder="All resources" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All resources</SelectItem>
                                </SelectContent>
                            </Select>

                            <div className="relative flex-1 min-w-[250px]">
                                <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                                <Input
                                    placeholder="Search resources ..."
                                    className="pl-10 w-full"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>

                            <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                                Total resources {resources.length}
                            </Badge>
                        </div>

                        <Button variant='primary' onClick={() => window.location.href = '/resources/create'}>
                            <Plus className="w-4 h-4" />
                            Add resources
                        </Button>
                    </div>
                </div>

                {/* Recent Resources Section */}
                <div className="flex flex-col flex-1">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-h1 font-semibold text-gray-900">
                            All Resources
                        </h2>
                        <Button variant='purple_link' >
                            View all resources
                        </Button>
                    </div>

                    {/* Resources Table */}
                    <Card className="flex-1 border-[1px]  shadow-card">
                        <div className="space-y-3 p-6 h-full">
                            {resources.map((resource) => (
                                <SlideableActionCard
                                    key={resource.id}
                                    isExpanded={expandedId === resource.id}
                                    onToggleExpand={() => setExpandedId(expandedId === resource.id ? null : resource.id)}
                                    actions={[
                                        {
                                            icon: <Image src="/assets/logos/edit.svg" alt="Edit" className="w-4 h-4" width="16" height="16" />  ,
                                            onClick: () => handleEdit(resource.id),
                                            label: 'Edit',
                                        },
                                        {
                                            icon: <Image src="/assets/logos/delete.svg" alt="Delete" className="w-4 h-4" width="16" height="16" />,
                                            onClick: () => handleDelete(resource.id),
                                            label: 'Delete',
                                        },
                                    ]}
                                    contentClassName="grid grid-cols-5 gap-4 bg-white items-center p-3  "
                                    actionsContainerClassName="justify-center -space-y-2"
                                >
                                    <div className="col-span-2">
                                        <p className="font-medium text-gray-900">{resource.title}</p>
                                    </div>
                                    <div className="col-span-1">
                                        <span className="text-gray-600 text-sm">{resource.format}</span>
                                    </div>
                                    <div className="col-span-1">
                                        <span className="text-gray-600 text-sm">{resource.size}</span>
                                    </div>
                                </SlideableActionCard>
                            ))}
                        </div>
                    </Card>
                    
                </div>
            </div>
        </div>
    );
}