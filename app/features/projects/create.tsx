"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePageTitle } from "@/app/contexts/page-title-context";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Textarea } from "@/app/components/ui/text-area";
import { DateCard } from "@/app/components/ui/dateCard";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import {
  FileUpload,
  FileUploadDropzone,
  FileUploadTrigger,
  FileUploadList,
  FileUploadItem,
  FileUploadItemPreview,
  FileUploadItemMetadata,
} from "@/app/components/ui/file-upload";
import { QuickActions, QuickAction } from "@/app/features/dashboard/sections/QuickActions";
import { ArrowLeft } from "lucide-react";

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

export function CreateProject() {
  const { setPageTitle } = usePageTitle();
  const [formData, setFormData] = useState<CreateProjectFormData>({
    projectName: "",
    description: "",
    startDate: new Date(),
    endDate: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
    category: "onboarding",
    coverImage: null,
  });

  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  useEffect(() => {
    setPageTitle("Create new project for your teams");
  }, [setPageTitle]);

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

  const handleCreateProject = () => {
    console.log("Creating project with data:", formData);
    // Add your API call here
  };

  const handleCancel = () => {
    // Navigate back to projects
  };

  return (
    <div className="p-4 sm:p-6 bg-white min-h-screen">
      {/* Header with Back Button */}
      <div className="mb-6 flex items-center gap-3">
        <Link
          href="/projects"
          className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to projects</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 2xl:grid-cols-3 gap-6">
        {/* Main Form Section */}
        <div className="2xl:col-span-2 space-y-6">
          {/* Basic Information Card */}
          <Card className="rounded-2xl border border-gray-200">
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
                  <Input
                    type="date"
                    value={formData.startDate.toISOString().split("T")[0]}
                    className="w-full"
                  />
                  <p className="text-xs text-gray-500 mt-2">
                    Project start date (required)
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    *End date
                  </label>
                  <Input
                    type="date"
                    value={formData.endDate.toISOString().split("T")[0]}
                    className="w-full"
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
                  <SelectTrigger className="w-full rounded-2xl h-10">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {PROJECT_CATEGORIES.map((cat) => (
                      <SelectItem key={cat.value} value={cat.value}>
                        {cat.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-xs text-gray-500 mt-2">
                  Select a project type to customize the experience for your users
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Upload Project Cover */}
          <Card className="rounded-2xl border border-gray-200">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-800">
                Upload your project cover
              </CardTitle>
            </CardHeader>
            <CardContent>
              <FileUpload className="w-full">
                <FileUploadDropzone className="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center hover:border-blue-400 transition-colors">
                  <div className="flex flex-col items-center justify-center gap-3">
                    <div className="text-gray-400">
                      <svg
                        className="w-12 h-12 mx-auto mb-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-gray-700 font-medium">
                        Drag and drop your file here
                      </p>
                      <p className="text-sm text-gray-500">or</p>
                    </div>
                    <FileUploadTrigger asChild>
                      <Button variant="outline" size="sm" className="rounded-full">
                        Browse Files
                      </Button>
                    </FileUploadTrigger>
                  </div>
                </FileUploadDropzone>
                <FileUploadList className="mt-4 space-y-2">
                  {/* Files will be displayed here automatically */}
                </FileUploadList>
              </FileUpload>
            </CardContent>
          </Card>

          {/* Assign to Arena Section */}
          <Card className="rounded-2xl border border-gray-200">
            <CardHeader>
              <div className="flex items-center gap-2">
                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-purple-100">
                  <span className="text-sm">📍</span>
                </div>
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
                <SelectTrigger className="w-full rounded-2xl h-10">
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
          <div className="flex gap-3 pt-4">
            <Button
              variant="outline"
              size="xl"
              className="flex-1 rounded-full"
              onClick={handleCancel}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              size="xl"
              className="flex-1 rounded-full"
              onClick={handleCreateProject}
            >
              Create Project
            </Button>
          </div>
        </div>

        {/* Quick Actions Sidebar */}
        <div className="2xl:col-span-1">
          <QuickActions
            actions={QUICK_ACTIONS}
            title="Quick actions"
          />
        </div>
      </div>
    </div>
  );
}
