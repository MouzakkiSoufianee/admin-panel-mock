"use client";
import React, { useState, useEffect } from 'react';
import {
    Plus, Search, ChevronDown , EllipsisVertical
} from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select';
import { fetchEvents } from '@/app/data/api';
import type { Event } from '@/app/data/api';
import { Button, Card } from '@/app';

export default function Events() {
    const [events, setEvents] = useState<Event[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [eventFilter, setEventFilter] = useState('option-1');
    const [expandedId, setExpandedId] = useState<string | null>(null);

    // Fetch events from API
    useEffect(() => {
        const loadEvents = async () => {
            try {
                const fetchedEvents = await fetchEvents();
                setEvents(fetchedEvents);
                if (fetchedEvents.length > 0) {
                    setExpandedId(fetchedEvents[0].id);
                }
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

    const handleActionSelect = (action: string, id: string) => {
        if (action === 'duplicate') {
            handleDuplicate(id);
            return;
        }
        if (action === 'edit') {
            handleEdit(id);
            return;
        }
        if (action === 'delete') {
            handleDelete(id);
        }
    };

    const handleDelete = (id: string) => {
        setEvents(events.filter((e) => e.id !== id));
    };

    return (
        <div className="min-h-screen bg-gray-50 p-8">
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
                        <div className="flex items-center gap-4">
                            <Select value={eventFilter} onValueChange={setEventFilter}>
                                <SelectTrigger size="sm" className="h-9 !rounded-full text-gray-500 text-sm gap-1 px-3">
                                    <SelectValue placeholder="All events" />
                                </SelectTrigger>
                                <SelectContent align="start">
                                    <SelectItem value="option-1">Option 1</SelectItem>
                                    <SelectItem value="option-2">Option 2</SelectItem>
                                </SelectContent>
                            </Select>
                            <div className="relative flex-1">
                                <Search
                                    size={18}
                                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                                />
                                <input
                                    type="text"
                                    placeholder="Search events ..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                                />
                            </div>
                            <span className="text-blue-600 font-medium">Total events 8</span>
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

                        <div className="space-y-4">
                            {events.map((event) => (
                                <Card
                                    key={event.id}
                                    className="bg-white border border-gray-200 rounded-[18px] overflow-hidden !p-0 transition-all duration-300"
                                >
                                    {/* Card Header */}
                                    <div
                                        onClick={() =>
                                            setExpandedId(expandedId === event.id ? null : event.id)
                                        }
                                        className="flex w-full items-center justify-between rounded-t-[18px] !bg-[#FAFAFB] p-6 transition-colors"
                                    >
                                        <div className="flex items-center gap-4">
                                            <button className="text-gray-400 hover:text-gray-600 transition-transform">
                                                <ChevronDown
                                                    size={20}
                                                    className={`transform transition-transform duration-300 ${
                                                        expandedId === event.id ? 'rotate-180' : ''
                                                    }`}
                                                />
                                            </button>
                                            <div>
                                                <h3 className="font-semibold text-gray-900">
                                                    {event.title}
                                                </h3>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-8 text-sm text-gray-600">
                                            <div>
                                                <span className="font-medium text-gray-900">Start: </span>
                                                {event.startDate} at {event.startTime}
                                            </div>
                                            <div>
                                                <span className="font-medium text-gray-900">End: </span>
                                                {event.endDate} at {event.endTime}
                                            </div>
                                        </div>


                                        <Select
                                            onValueChange={(value) =>
                                                handleActionSelect(value, event.id)
                                            }
                                        >
                                            <SelectTrigger className="bg-white text-foreground border !border-gray-300 rounded-lg transition-colors focus:outline-none h-9 !rounded-full text-gray-500 text-sm gap-1 px-3">
                                                <EllipsisVertical />
                                            </SelectTrigger>
                                            <SelectContent align="end">
                                                <SelectItem value="duplicate">Duplicate</SelectItem>
                                                <SelectItem value="edit">Edit</SelectItem>
                                                <SelectItem value="delete">Delete</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    {/* Card Body - Expanded */}
                                    {expandedId === event.id && (
                                        <div className="px-6 py-4 animate-in fade-in slide-in-from-top-2 duration-300">
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

                                        </div>
                                    )}
                                </Card>
                            ))}
                        </div>
                    </div>
                </>
            )}
        </div>
    ); 
}