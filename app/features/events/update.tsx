"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { usePageTitle } from "@/app/contexts/page-title-context";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { QuickActions, QuickAction } from "@/app/features/dashboard/sections/QuickActions";
import { ArrowLeft, Edit , FileCheck   } from "lucide-react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@/app/components/ui/date-picker";
import NumberInput from "@/app/components/ui/numberInput";
import { fetchEventById } from "@/app/data/api";

interface UpdateEventFormData {
  totalEvents: number;
  eventTitle: string;
  startDate: Date | null;
  endDate: Date | null;
  startTime: string;
  endTime: string;
  eventUrl: string;
}

const QUICK_ACTIONS: QuickAction[] = [
  {
    label: "Add Arena",
    bgColor: "#7BB6A7",
  },
  {
    label: "Edit project",
    bgColor: "#716DF0",
    icon: <Edit className="text-white w-6 h-6" />,
  },
  {
    label: "Add resource",
    bgColor: "#A855F7",
  },
  {
    label: "Add event",
    bgColor: "#5A7BFF",
  },
];

export function UpdateEvent() {
  const { setPageTitle } = usePageTitle();
  const router = useRouter();
  const searchParams = useSearchParams();
  const eventId = searchParams.get("id");

  const [formData, setFormData] = useState<UpdateEventFormData>({
    totalEvents: 1,
    eventTitle: "",
    startDate: null,
    endDate: null,
    startTime: "00:00",
    endTime: "00:00",
    eventUrl: "",
  });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setPageTitle("Update event");
  }, [setPageTitle]);

  // Fetch event data on mount
  useEffect(() => {
    const loadEventData = async () => {
      if (!eventId) {
        setIsLoading(false);
        return;
      }

      try {
        const eventData = await fetchEventById(eventId);
        
        if (eventData) {
          setFormData({
            totalEvents: 1,
            eventTitle: eventData.title,
            startDate: new Date(eventData.startDate),
            endDate: new Date(eventData.endDate),
            startTime: eventData.startTime,
            endTime: eventData.endTime,
            eventUrl: "",
          });
        }
      } catch (error) {
        console.error("Failed to load event:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadEventData();
  }, [eventId]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleStartDateChange = (newValue: Date | null) => {
    setFormData((prev) => ({
      ...prev,
      startDate: newValue,
    }));
  };

  const handleEndDateChange = (newValue: Date | null) => {
    setFormData((prev) => ({
      ...prev,
      endDate: newValue,
    }));
  };

  const handleUpdateEvent = async () => {
    if (!eventId) return;

    try {
      // Format data for API
      const updateData = {
        title: formData.eventTitle,
        startDate: formData.startDate?.toISOString().split('T')[0] || "",
        endDate: formData.endDate?.toISOString().split('T')[0] || "",
        startTime: formData.startTime,
        endTime: formData.endTime,
      };

      // Make API call
      const response = await fetch(`/api/events/${eventId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updateData),
      });

      if (response.ok) {
        console.log("Event updated successfully");
        router.push('/events');
      } else {
        console.error("Failed to update event");
      }
    } catch (error) {
      console.error("Error updating event:", error);
    }
  };

  const handleCancel = () => {
    router.back();
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500">Loading event...</p>
      </div>
    );
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <div className="p-4 sm:p-6 bg-white min-h-screen bg-white">
        <p className="text-h1 text-black mb-1 ml-2">Update event</p>

        {/* Header with Back Button */}
        <div className="mb-6 flex items-center gap-3">
          <Link
            href="/events"
            className="flex items-center gap-2 text-sm text-purple"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to events</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Form Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information Card */}
            <Card className="!rounded-[18px]  border border-[#EBEBEB] shadow-card">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-800">
                  Basic information
                </CardTitle>
                <p className="text-sm text-gray-500 mt-1">
                  Update a new event details assigned to employees across your organization.
                </p>
              </CardHeader>
              <CardContent className="space-y-5">
                {/* Enter total event */}
                <div className="flex items-center gap-2 ">
                  <label className="block text-sm font-medium text-gray-700 ">
                    *Enter total event
                  </label>
                  <NumberInput
                    value={formData.totalEvents}
                    onChange={(value) =>
                      setFormData((prev) => ({
                        ...prev,
                        totalEvents: value,
                      }))
                    }
                    min={1}
                    step={1}
                    className=" w-20 border-gray-300 border-[1px] border-[#E5E7EB] "
                  />
                </div>
                <Card className="border border-[1px] border-[#D9D9D9] shadow-card p-6">
                  <div className="space-y-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        *Event title
                      </label>
                      <Input
                        type="text"
                        name="eventTitle"
                        placeholder="e.g. feedback question"
                        value={formData.eventTitle}
                        onChange={handleInputChange}
                        className="w-full border-[1px] border-[#D9D9D9] !rounded-[20px]"
                      />
                      <p className="text-xs text-gray-500 mt-2">
                        Edit a unique, descriptive name for the event
                      </p>
                    </div>

                    {/* Start date and End date */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Start date ( Optional )
                        </label>
                        <DatePicker
                          value={formData.startDate}
                          onChange={handleStartDateChange}
                          placeholder="Jul 15, 2025"
                        />
                        <p className="text-xs text-gray-500 mt-2">
                          Event start date ( required )
                        </p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          End date ( Optional )
                        </label>
                        <DatePicker
                          value={formData.endDate}
                          onChange={handleEndDateChange}
                          placeholder="Jul 15, 2025"
                        />
                        <p className="text-xs text-gray-500 mt-2">
                          Event end date ( required )
                        </p>
                      </div>
                    </div>

                    {/* Start time and End time */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Start Time ( Optional )
                        </label>
                        <div className="relative">
                          <Input
                            type="time"
                            name="startTime"
                            value={formData.startTime}
                            onChange={handleInputChange}
                            className="w-full [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:right-4 [&::-webkit-calendar-picker-indicator]:cursor-pointer pr-12 border-[1px] border-[#D9D9D9] !rounded-[20px]"
                          />
                        </div>
                        <p className="text-xs text-gray-500 mt-2">
                          Event start time ( required )
                        </p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          End time ( Optional )
                        </label>
                        <div className="relative">
                          <Input
                            type="time"
                            name="endTime"
                            value={formData.endTime}
                            onChange={handleInputChange}
                            className="w-full [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:right-4 [&::-webkit-calendar-picker-indicator]:cursor-pointer pr-12 border-[1px] border-[#D9D9D9] !rounded-[20px]"
                          />
                        </div>
                        <p className="text-xs text-gray-500 mt-2">
                          Event end time ( required )
                        </p>
                      </div>
                    </div>

                    {/* Event URL */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Event URL ( Optional )
                      </label>
                      <Input
                        type="text"
                        name="eventUrl"
                        placeholder="Enter workflow ID to the link this event"
                        value={formData.eventUrl}
                        onChange={handleInputChange}
                        className="w-full border-[1px] border-[#D9D9D9] !rounded-[20px]"
                      />
                      <p className="text-xs text-gray-500 mt-2">
                        link to related resources, meeting rooms, or documents
                      </p>
                    </div>
                  </div>
                </Card>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 pt-4">
              <Button
                variant="outline"
                size="xl"
                className="rounded-full !text-gray-600 border-gray-300"
                onClick={handleCancel}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                size="xl"
                className="rounded-full"
                onClick={handleUpdateEvent}
              >
                <FileCheck  /> 
                Save changes
              </Button>
            </div>
          </div>

          {/* Quick Actions Sidebar */}
          <div className="col-span-1">
            <QuickActions
              actions={QUICK_ACTIONS}
              title="Quick actions"
            />
          </div>
        </div>
      </div>
    </LocalizationProvider>
  );
}
