'use client';
import { useState } from 'react';
import { ArrowLeft, Plus } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import NumberInput from '@/app/components/ui/numberInput';
import { FileUpload, Dropzone, Trigger } from '@/app/components/ui/file-upload';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import Link from 'next/link';
import Image from 'next/image';
import { QuickActions, QuickAction } from "@/app/features/dashboard/sections/QuickActions";

const QUICK_ACTIONS: QuickAction[] = [
    {
        label: "Add Arena",
        bgColor: "#8BC194",
    },
    {
        label: "Create project",
        bgColor: "#7B7BFF",
    },
    {
        label: "Add event",
        bgColor: "#7B7BFF",
    },
    {
        label: "Add resource",
        bgColor: "#8BC194",
    },
];




export default function CreateResource() {
    const [totalResource, setTotalResource] = useState(1);
    const [resourceTitle, setResourceTitle] = useState('');
    const [uploadedFile, setUploadedFile] = useState<File | null>(null);

    const handleFileUpload = (files: File[]) => {
        if (files.length > 0) {
            const file = files[0];
            setUploadedFile(file);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission
        console.log({
            totalResource,
            resourceTitle,
            uploadedFile,
        });
    };

    return (
        <div className="p-4 sm:p-6 bg-white min-h-screen">
            <p className="text-h1 text-black mb-6 ml-2">Add new resource</p>
            {/* Header with Back Button */}
            <div className="mb-6 flex items-center gap-3">
                <Link
                    href="/resources"
                    className="flex items-center gap-2 text-sm text-purple"
                >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back to resources</span>
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
                                Add resources shared with employees across your organization.
                            </p>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-5">
                                {/* Total Resource */}
                                <div>
                                    <div className="flex items-center gap-4 mb-2">
                                        <label className="text-sm font-medium text-gray-700">
                                            *Enter total resource
                                        </label>
                                        <div >
                                            <NumberInput
                                                value={totalResource}
                                                onChange={setTotalResource}
                                                min={1}
                                            />
                                        </div>
                                    </div>

                                </div>
                                <Card className='border-[1px]'>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            *Resource title
                                        </label>
                                        <p className="text-xs text-gray-500 mb-2">Choose a unique, descriptive name for the resource</p>
                                        <Input
                                            type="text"
                                            placeholder="e.g. feedback question"
                                            value={resourceTitle}
                                            onChange={(e) => setResourceTitle(e.target.value)}
                                            className="w-full"
                                        />
                                    </div>

                                    {/* File Upload */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            *Upload file
                                        </label>
                                        <FileUpload
                                            accept="image/*,video/*"
                                            maxSize={50 * 1024 * 1024}
                                            onAccept={handleFileUpload}
                                            label="Drag and drop your file here"
                                        >
                                            <Dropzone className="flex flex-col h-65 items-center justify-center gap-2 py-8">
                                                <div className="text-sm text-black font-medium">
                                                    Drag and drop your resource file here
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

                                        <p className="text-h5 text-gray mt-3">
                                            Only support :
                                        </p>

                                        <p className="text-h5 text-gray">
                                            Images : JPEG, PNG, GIF, SVG
                                        </p>
                                        <p className="text-h5 text-gray">
                                            Videos : MP4, WebM, OGG, AVI, MOV (thumbnails required)
                                        </p>
                                        {uploadedFile && (
                                            <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-[18px]">
                                                <p className="text-green-800 text-sm"><span className="font-semibold">File uploaded:</span> {uploadedFile.name}</p>
                                            </div>
                                        )}
                                    </div>
                                </Card>
                                {/* Resource Title */}

                            </form>
                        </CardContent>
                    </Card>

                    {/* Action Buttons */}
                    <div className="flex justify-end gap-3 ">
                        <Button
                            variant="outline"
                            size="xl"
                            className="rounded-full !text-gray-600 border-gray-300"
                            onClick={() => window.history.back()}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="primary"
                            size="xl"
                            className="rounded-full"
                            onClick={handleSubmit}
                        >
                            <Plus className="w-6 h-6" />
                            Add resource
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
    );
}