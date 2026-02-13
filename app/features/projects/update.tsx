"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { usePageTitle } from "@/app/contexts/page-title-context";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Textarea } from "@/app/components/ui/text-area";
import { ProjectsIcon } from "@/app/components/shared/sidebarSections/icons";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/app/components/ui/select";

import { FileUpload, Dropzone, Trigger, } from '@/app/components/ui/file-upload';
import { QuickActions, QuickAction } from "@/app/features/dashboard/sections/QuickActions";
import { ArrowLeft, FileCheck, X } from "lucide-react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@/app/components/ui/date-picker";
import Image from "next/image";
import { fetchProjectById } from "@/app/data/api";

interface CreateProjectFormData {
    projectName: string;
    description: string;
    startDate: Date;
    endDate: Date;
    category: string;
    coverImage: File | null;
}

const PROJECT_CATEGORIES = [
    { value: "onboarding", label: "Onboarding" },
    { value: "training", label: "Training" },
    { value: "development", label: "Development" },
    { value: "marketing", label: "Marketing" },
    { value: "other", label: "Other" },
];

const QUICK_ACTIONS: QuickAction[] = [
    {
        label: "Add Arena",
        bgColor: "#8BC194",
    },
    {
        label: "Add resource",
        bgColor: "#7B7BFF",
    },
    {
        label: "Edit project",
        bgColor: "#7B7BFF",
    },
    {
        label: "Add event",
        bgColor: "#7B7BFF",
    },
];

export function UpdateProject() {
    const { setPageTitle } = usePageTitle();
    const router = useRouter();
    const searchParams = useSearchParams();
    const projectId = searchParams.get("id");

    const [formData, setFormData] = useState<CreateProjectFormData>({
        projectName: "",
        description: "",
        startDate: new Date(),
        endDate: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
        category: "onboarding",
        coverImage: null,
    });

    const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
    const [coverImagePreview, setCoverImagePreview] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setPageTitle("Update Project");
    }, [setPageTitle]);

    // Fetch project data on mount
    useEffect(() => {
        const loadProjectData = async () => {
            if (!projectId) {
                setIsLoading(false);
                return;
            }

            try {
                const projectData = await fetchProjectById(projectId);
                
                if (projectData) {
                    setFormData({
                        projectName: projectData.name,
                        description: projectData.description || "",
                        startDate: projectData.startDate ? new Date(projectData.startDate) : new Date(),
                        endDate: projectData.endDate ? new Date(projectData.endDate) : new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
                        category: projectData.stage || "onboarding",
                        coverImage: null,
                    });
                }
            } catch (error) {
                console.error("Failed to load project:", error);
            } finally {
                setIsLoading(false);
            }
        };

        loadProjectData();
    }, [projectId]);

    const handleIconUpload = useCallback((files: File[]) => {
        if (files.length > 0) {
            const file = files[0];
            setFormData((prev) => ({
                ...prev,
                coverImage: file,
            }));
            setUploadedFiles([file]);
        }
    }, []);

    const handleRemoveFile = () => {
        setFormData((prev) => ({
            ...prev,
            coverImage: null,
        }));
        setUploadedFiles([]);
        setCoverImagePreview(null);
    };
    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleCategoryChange = (value: string) => {
        setFormData((prev) => ({
            ...prev,
            category: value,
        }));
    };

    const handleDateChange = (dateRange: { startDate: Date; endDate: Date }) => {
        setFormData((prev) => ({
            ...prev,
            startDate: dateRange.startDate,
            endDate: dateRange.endDate,
        }));
    };

    const handleCreateProject = async () => {
        if (!projectId) return;

        try {
            const updateData = {
                name: formData.projectName,
                description: formData.description,
                startDate: formData.startDate?.toISOString().split('T')[0] || "",
                endDate: formData.endDate?.toISOString().split('T')[0] || "",
                category: formData.category,
            };

            const response = await fetch(`/api/projects/${projectId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updateData),
            });

            if (response.ok) {
                console.log("Project updated successfully");
                router.push('/projects');
            } else {
                console.error("Failed to update project");
            }
        } catch (error) {
            console.error("Error updating project:", error);
        }
    };

    const handleCancel = () => {
        router.back();
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p className="text-gray-500">Loading project...</p>
            </div>
        );
    }

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <div className="p-4 sm:p-6 bg-white min-h-screen">
                <p className="text-h1  text-black mb-1 ml-2">Edit a project for your teams</p>
                {/* Header with Back Button */}
                <div className="mb-6 flex items-center gap-3">
                    <Link
                        href="/projects"
                        className="flex items-center gap-2 text-sm text-purple"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        <span>Back to projects</span>
                    </Link>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Main Form Section */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Basic Information Card */}
                        <Card className="rounded-[30px] border border-gray-200">
                            <CardHeader>
                                <CardTitle className="text-lg font-semibold text-gray-800">
                                    Basic Information
                                </CardTitle>
                                <p className="text-sm text-gray-500 mt-1">
                                    Provide the essential details for your project
                                </p>
                            </CardHeader>
                            <CardContent className="space-y-5">
                                {/* Project Name */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        *Project name
                                    </label>
                                    <Input
                                        type="text"
                                        name="projectName"
                                        placeholder="e.g. project name"
                                        value={formData.projectName}
                                        onChange={handleInputChange}
                                        className="w-full"
                                    />
                                    <p className="text-xs text-gray-500 mt-2">
                                        Choose a unique, descriptive name for your project
                                    </p>
                                </div>

                                {/* Description */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Description
                                    </label>
                                    <Textarea
                                        name="description"
                                        placeholder="Describe the purpose and goals of this project..."
                                        value={formData.description}
                                        onChange={handleInputChange}
                                        className="w-full resize-none"
                                        rows={5}
                                    />
                                    <p className="text-xs text-gray-500 mt-2">
                                        Optional description to help team members understand the project's purpose
                                    </p>
                                </div>

                                {/* Date Range */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            *Start date
                                        </label>
                                        <DatePicker
                                            value={formData.startDate}
                                            onChange={(newValue) => {
                                                if (newValue) {
                                                    setFormData((prev) => ({
                                                        ...prev,
                                                        startDate: newValue,
                                                    }));
                                                }
                                            }}
                                            placeholder="Select start date"
                                        />
                                        <p className="text-xs text-gray-500 mt-2">
                                            Project start date (required)
                                        </p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            *End date
                                        </label>
                                        <DatePicker
                                            value={formData.endDate}
                                            onChange={(newValue) => {
                                                if (newValue) {
                                                    setFormData((prev) => ({
                                                        ...prev,
                                                        endDate: newValue,
                                                    }));
                                                }
                                            }}
                                            placeholder="Select end date"
                                        />
                                        <p className="text-xs text-gray-500 mt-2">
                                            Project end date (required)
                                        </p>
                                    </div>
                                </div>

                                {/* Project Category */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        *Project Category
                                    </label>
                                    <Select value={formData.category} onValueChange={handleCategoryChange}>
                                        <SelectTrigger className="w-full  h-10">
                                            <SelectValue placeholder="Select a category" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {PROJECT_CATEGORIES.map((cat) => (
                                                <SelectItem key={cat.value} value={cat.value}>
                                                    <p className="text-black">{cat.label}</p>
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <p className="text-xs text-gray-500 mt-2">
                                        Select a project type to customize the experience for your users
                                    </p>
                                </div>

                                {/* Upload Project Cover */}
                                <div >
                                    <h3 className="text-h1 font-semibold text-gray-800 mb-2">
                                        Upload your project cover
                                    </h3>
                                    <FileUpload
                                        accept="image/*"
                                        maxSize={5 * 1024 * 1024}
                                        onAccept={handleIconUpload}
                                        label="Drag and drop your file here"
                                    >
                                        <Dropzone className="flex flex-col h-65 items-center justify-center gap-2 py-8">
                                            <div className="text-sm text-black font-medium">
                                                Drag and drop your chatbot icon here
                                            </div>
                                            <div className="text-xs text-gray-500">or</div>
                                            <Trigger asChild>
                                                <Button variant="secondary" className="w-auto flex items-center gap-2 text-gray-600">
                                                    <Image
                                                        src="/assets/logos/browse-files.svg"
                                                        alt="Upload Icon"
                                                        width={15}
                                                        height={15}
                                                    />
                                                    Browse Files
                                                </Button>
                                            </Trigger>

                                        </Dropzone>
                                    </FileUpload>

                                    {uploadedFiles.length > 0 && (
                                        <div className="mt-3 flex items-center justify-between gap-2 bg-gray-50 px-3 py-2 rounded-lg border border-gray-200 w-fit">
                                            <div className="text-xs font-medium text-gray-700 truncate max-w-xs">
                                                {uploadedFiles[0].name}
                                            </div>
                                            <Button
                                            
                                                onClick={handleRemoveFile}
                                                className="flex items-center justify-center w-4 h-4 rounded-full !bg-gray-400 hover:text-gray-800 transition-colors flex-shrink-0"
                                                type="button"
                                            >
                                                <X strokeWidth={1.25} className="bg-white" />
                                                  
                                            </Button>
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card> 

                        {/* Assign to Arena Section */}
                        <Card className="rounded-[30px] border border-gray-200">
                            <CardHeader>
                                <div className="flex items-center gap-2">
                                    <ProjectsIcon color="black" />
                                    <CardTitle className="text-lg font-semibold text-gray-800">
                                        Assign your project to an arena
                                    </CardTitle>
                                </div>
                                <p className="text-sm text-gray-500 mt-2">
                                    Select where your project will take place to start managing your teams
                                </p>
                            </CardHeader>
                            <CardContent>
                                <Select>
                                    <SelectTrigger className="w-full rounded-[30px] h-10">
                                        <SelectValue placeholder="Select an arena" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="arena1">Arena 1</SelectItem>
                                        <SelectItem value="arena2">Arena 2</SelectItem>
                                        <SelectItem value="arena3">Arena 3</SelectItem>
                                    </SelectContent>
                                </Select>
                                <p className="text-xs text-gray-500 mt-2">
                                    An arena is a virtual environment designed to host your projects
                                </p>
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
                                onClick={handleCreateProject}
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
