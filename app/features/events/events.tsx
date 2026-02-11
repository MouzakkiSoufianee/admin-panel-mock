"use client";
import React, { useState, useEffect } from 'react';
import {
    Plus, Search
} from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select';
import { fetchEvents } from '@/app/data/api';
import type { Event } from '@/app/data/api';
import { Button, Card, ExpandableCard, Input } from '@/app';

export default function Events() {
    const [events, setEvents] = useState<Event[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [eventFilter, setEventFilter] = useState('all-events');

    // Fetch events from API
    useEffect(() => {
        const loadEvents = async () => {
            try {
                const fetchedEvents = await fetchEvents();
                setEvents(fetchedEvents);
            } catch (error) {
                console.error('Failed to fetch events:', error);
            } finally {
                setIsLoading(false);
            }
        };

        loadEvents();
    }, []);

    const handleAddEvent = () => {
        // Handle add event
        console.log('Add event clicked');
    };

    const handleDuplicate = (id: string) => {
        console.log('Duplicate event:', id);
    };

    const handleEdit = (id: string) => {
        console.log('Edit event:', id);
    };

    const handleDelete = (id: string) => {
        setEvents(events.filter((e) => e.id !== id));
    };

    return (
        <div className="min-h-screen bg-white p-8">
            {isLoading ? (
                <div className="flex items-center justify-center min-h-screen">
                    <p className="text-gray-500">Loading events...</p>
                </div>
            ) : (
                <>
                    {/* Header */}
                    <div className="mb-8">
                        <p className="text-h1 text-black">
                            Access and manage events assigned to employees across your organization.
                        </p>
                    </div>

                    {/* Controls */}
                    <div className="flex items-center justify-between mb-8 gap-4">
                        <div className="flex items-center gap-4 ">
                            <Select value={eventFilter} onValueChange={setEventFilter}     >
                                <SelectTrigger size="lg" className="h-9 !rounded-full text-gray-500 text-sm gap-1 px-3">
                                    <SelectValue placeholder="All events" />
                                </SelectTrigger>
                                <SelectContent align="start">
                                    <SelectItem value="all-events"> All events </SelectItem>
                                    <SelectItem value="option-1">Option 1</SelectItem>
                                    <SelectItem value="option-2">Option 2</SelectItem>
                                </SelectContent>
                            </Select>
                            <div className="relative flex-1">
                                <Search
                                    size={18}
                                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400"
                                />
                                <Input
                                    type="text"
                                    placeholder="Search events ..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 "
                                />
                            </div>
                            <span className="text-[#5A7BFF] bg-[#DDF3FF] rounded-[12.5px] pr-1 pl-1 text-h3">Total events 8</span>
                        </div>
                        <Button
                            variant="primary"
                            onClick={handleAddEvent}
                            className="flex items-center gap-2 px-6 py-2  text-white rounded-lg font-medium transition"
                        >
                            <Plus size={20} />
                            Add event
                        </Button>
                    </div>

                    {/* Recent Events */}
                    <div>
                        <Card className='border-[1px] shadow-card '>
                            <div className="space-y-4">
                                {events.map((event) => (
                                    <ExpandableCard
                                        key={event.id}
                                        id={event.id}
                                        title={event.title}
                                        startDate={event.startDate}
                                        startTime={event.startTime}
                                        endDate={event.endDate}
                                        endTime={event.endTime}
                                        menuItems={[
                                            {
                                                label: 'Duplicate',
                                                value: 'duplicate',
                                                onClick: () => handleDuplicate(event.id),
                                            },
                                            {
                                                label: 'Edit',
                                                value: 'edit',
                                                onClick: () => handleEdit(event.id),
                                            },
                                            {
                                                label: 'Delete',
                                                value: 'delete',
                                                onClick: () => handleDelete(event.id),
                                                variant: 'destructive',
                                            },
                                        ]}
                                    >
                                        <div className="grid grid-cols-2 gap-6 text-sm">
                                            <div>
                                                <p className="text-gray-600">
                                                    <span className="font-medium">Created: </span>
                                                    {event.created}
                                                </p>
                                                <p className="text-gray-600 mt-2">
                                                    <span className="font-medium">Duration: </span>
                                                    {event.duration}
                                                </p>
                                            </div>
                                            <div>
                                                <p className="text-gray-600">
                                                    <span className="font-medium">Event ID: </span>
                                                    {event.id}
                                                </p>
                                                <p className="text-gray-600 mt-2">
                                                    <span className="font-medium">Status: </span>
                                                    <span className="text-green-600 font-medium">
                                                        {event.status}
                                                    </span>
                                                </p>
                                            </div>
                                        </div>
                                    </ExpandableCard>
                                ))}
                            </div>
                        </Card>


                    </div>
                </>
            )}
        </div>
    );
}