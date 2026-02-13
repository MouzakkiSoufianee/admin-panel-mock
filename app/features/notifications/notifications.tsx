"use client";

import React, { use, useState } from 'react';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/app/components/ui/select';
import { Badge } from '@/app/components/ui/badge';
import { SlideableActionCard } from '@/app/components/ui/slideable-action-card';
import { Search, Trash2, Archive, Plus } from 'lucide-react';

interface Notification {
    id: string;
    title: string;
    module: string;
    category: string;
    priority: 'High' | 'Medium' | 'Low';
    channels: string;
    timestamp: string;
}

export default function NotificationsPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState('all');
    const [expandedCardId, setExpandedCardId] = useState<string | null>(null);

    const handleAddEvent = () => {
        console.log('Add notification');
    };

    const notifications: Notification[] = [
        {
            id: '1',
            title: 'New task assigned',
            module: 'Tasks',
            category: 'Project',
            priority: 'High',
            channels: 'Email',
            timestamp: '2 hours ago',
        },
        {
            id: '2',
            title: 'Meeting reminder',
            module: 'Calendar',
            category: 'Event',
            priority: 'Medium',
            channels: 'Push',
            timestamp: '30 minutes ago',
        },
        {
            id: '3',
            title: 'Document update',
            module: 'Documents',
            category: 'Project',
            priority: 'Low',
            channels: 'Email',
            timestamp: '1 hour ago',
        },
    ];

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case 'High':
                return 'bg-red-100 text-red-800';
            case 'Medium':
                return 'bg-yellow-100 text-yellow-800';
            case 'Low':
                return 'bg-green-100 text-green-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="p-8 bg-gray-50 min-h-screen">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Notifications</h1>
                <p className="text-gray-600">Manage your notifications and preferences</p>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-between mb-8 gap-4">
                <div className="flex items-center gap-4">
                    <Select value={filterType} onValueChange={setFilterType}>
                        <SelectTrigger size="lg" className="h-9 !rounded-full text-gray-500 text-sm gap-1 px-3">
                            <SelectValue placeholder="Filter" />
                        </SelectTrigger>
                        <SelectContent align="start">
                            <SelectItem value="all">All notifications</SelectItem>
                            <SelectItem value="unread">Unread</SelectItem>
                            <SelectItem value="high">High Priority</SelectItem>
                        </SelectContent>
                    </Select>
                    <div className="relative flex-1">
                        <Search
                            size={18}
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400"
                        />
                        <Input
                            type="text"
                            placeholder="Search notifications..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300"
                        />
                    </div>
                    <Badge className="!text-[#5A7BFF] bg-[#DDF3FF] rounded-[12.5px] pr-1 text-h3">
                        Total notifications: {notifications.length}
                    </Badge>
                </div>
                <Button
                    variant="primary"
                    onClick={handleAddEvent}
                    className="flex items-center gap-2 px-6 py-2 text-white rounded-lg font-medium transition"
                >
                    <Plus size={20} />
                    Create notification
                </Button>
            </div>

            <div className="space-y-3">
                {/* Table Header */}
                <div className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr_80px] gap-4 px-4 py-3 border-[1px] border-gray-300 bg-gray-50 rounded-lg font-semibold text-gray-700 text-sm items-center justify-items-center">
                    <div className="text-center">Achievement</div>
                    <div className="text-center">Module</div>
                    <div className="text-center">Category</div>
                    <div className="text-center">Priority</div>
                    <div className="text-center">Channels</div>
                    <div className="text-center">Actions</div>
                </div>

                {/* Table Rows */}
                {notifications.map((notification) => (
                    <SlideableActionCard
                        key={notification.id}
                        isExpanded={expandedCardId === notification.id}
                        onToggleExpand={() => setExpandedCardId(expandedCardId === notification.id ? null : notification.id)}
                        actions={[
                            {
                                icon: <Archive size={18} />,
                                onClick: () => console.log('Archive:', notification.id),
                                label: 'Archive',
                                variant: 'ghost',
                            },
                            {
                                icon: <Trash2 size={18} />,
                                onClick: () => console.log('Delete:', notification.id),
                                label: 'Delete',
                                variant: 'destructive',
                            },
                        ]}
                    >
                        <div className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr_80px] gap-4 px-4 py-3 items-center justify-items-center">
                            <div className="text-sm text-gray-900 text-center">
                                <p className="font-medium">{notification.title}</p>
                                <p className="text-xs text-gray-500">{notification.timestamp}</p>
                            </div>
                            <div className="text-sm text-gray-600 text-center">{notification.module}</div>
                            <div className="text-sm text-gray-600 text-center">{notification.category}</div>
                            <div className="text-sm text-gray-600 text-center">{notification.priority}</div>
                            <div className="text-sm text-gray-600 text-center">{notification.channels}</div>
                            <div></div>
                        </div>
                    </SlideableActionCard>
                ))}
            </div>
        </div>
    );
}