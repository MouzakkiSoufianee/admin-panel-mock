'use client';

import { useState, useCallback } from 'react';
import { Card } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Textarea } from '@/app/components/ui/text-area';
import { Toggle } from '@/app/components/ui/toggle';
import { Slider } from '@/app/components/ui/slider';
import { MoveLeft } from 'lucide-react';
import { FileUpload, Dropzone, Trigger, } from '@/app/components/ui/file-upload';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, Zap, MessageSquarePlus } from 'lucide-react';

export default function ChatbotConfigPage() {
    const [chatbotName, setChatbotName] = useState('Rocksey');
    const [primaryLanguage, setPrimaryLanguage] = useState('English (US)');
    const [description, setDescription] = useState('');
    const [chatbotIcon, setChatbotIcon] = useState<File | null>(null);
    const [documentFiles, setDocumentFiles] = useState<File[]>([]);
    const [isChatbotEnabled, setIsChatbotEnabled] = useState(true);
    const [isDocumentationEnabled, setIsDocumentationEnabled] = useState(false);
    const [responseTone, setResponseTone] = useState(70);
    const [selectedPersonality, setSelectedPersonality] = useState<'helpful' | 'concise' | 'curious'>('helpful');

    const handleIconUpload = useCallback((files: File[]) => {
        if (files.length > 0) {
            setChatbotIcon(files[0]);
        }
    }, []);

    const handleDocumentUpload = useCallback((files: File[]) => {
        setDocumentFiles((prev) => [...prev, ...files]);
    }, []);

    const removeDocument = useCallback((index: number) => {
        setDocumentFiles((prev) => prev.filter((_, i) => i !== index));
    }, []);

    const handleSave = () => {
        console.log({
            chatbotName,
            primaryLanguage,
            description,
            chatbotIcon,
            documentFiles,
            isChatbotEnabled,
            isDocumentationEnabled,
            responseTone,
            selectedPersonality,
        });
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className=" mx-auto">
                <h1 className="text-xl font-bold text-black mb-1">Config chatbot</h1>
                <Button onClick={() => window.location.href = "/dashboard"}
                    variant='link'
                    className="flex items-center gap-2 text-[#181945] borderless bg-white font-medium mb-4">
                    <MoveLeft size={16} />
                    Back to Dashboard
                </Button>

                <div className="grid grid-cols-3 gap-6 mt-6">



                    <div className="col-span-2 space-y-6">
                        {/* Enable Chatbot Service */}
                        <Card className="p-6">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-4">
                                    <Image
                                        src="/assets/logos/enableChatbot.svg"
                                        alt="Enable Chatbot Service"
                                        width={48}
                                        height={48}
                                    />
                                    <div>
                                        <h2 className="text-lg font-semibold">Enable Chatbot Service</h2>
                                        <p className="text-sm text-gray-600">This will activate the bot across all connected channels.</p>
                                    </div>
                                </div>
                                <Toggle enabled={isChatbotEnabled} onToggle={setIsChatbotEnabled} />
                            </div>
                        </Card>

                        {/* General Identity */}
                        <Card className="p-6">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-4">
                                    <Image
                                        src="/assets/logos/infos-logo.svg"
                                        alt="General Identity"
                                        width={20}
                                        height={20}
                                    />
                                    <h2 className="text-lg font-semibold">General Identity</h2>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-6 mb-6">
                                <div>
                                    <label className="block text-sm font-medium mb-2">Chatbot name</label>
                                    <Input value={chatbotName} onChange={(e) => setChatbotName(e.target.value)} placeholder="Enter chatbot name" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2">Primary language</label>
                                    <Input value={primaryLanguage} onChange={(e) => setPrimaryLanguage(e.target.value)} placeholder="Select language" />
                                </div>
                            </div>

                            <div className="mb-6">
                                <label className="block text-sm font-medium mb-2">Description</label>
                                <Textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Describe the purpose and context of this chatbot" rows={4} />
                                <p className="text-xs text-gray-500 mt-1">Optional: Provide context about this avatar, purpose and theme.</p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-4">Upload your chatbot icon</label>
                                <FileUpload
                                    accept="image/*"
                                    maxSize={5 * 1024 * 1024}
                                    onAccept={handleIconUpload}
                                    label="Drag and drop your file here"
                                >
                                    <Dropzone className="flex flex-col items-center justify-center gap-2 py-8">
                                        <div className="text-sm text-gray-600">
                                            Drag and drop your chatbot icon here
                                        </div>
                                        <div className="text-xs text-gray-500">or</div>
                                        <Trigger asChild>
                                            <Button variant="secondary" className="w-auto flex items-center gap-2">
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
                            </div>
                        </Card>

                        {/* Documentation */}
                        <Card className="p-6">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-2">
                                    <Image
                                        src="/assets/logos/documentation.svg"
                                        alt="General Identity"
                                        width={48}
                                        height={48}
                                    />
                                    <div>
                                        <h2 className="text-lg font-semibold">Documentation</h2>
                                        <p className="text-sm text-gray-600">This will activate the bot across all connected channels.</p>
                                    </div>

                                </div>
                                <Toggle enabled={isDocumentationEnabled} onToggle={setIsDocumentationEnabled} />
                            </div>

                            <div className="mt-6">

                                <label className="block text-sm font-medium mb-4">Upload documentation</label>
                                <FileUpload
                                    accept=".pdf,.doc,.docx,.txt"
                                    maxSize={10 * 1024 * 1024}
                                    onAccept={handleDocumentUpload}
                                    label="Drag and drop documentation here"

                                >
                                    <Dropzone className="flex flex-col items-center justify-center gap-2 py-8">
                                        <div className="text-sm text-gray-600">
                                            Drag and drop your documentation file here
                                        </div>
                                        <div className="text-xs text-gray-500">or</div>
                                        <Trigger asChild>
                                            <Button variant="secondary" className="w-auto">
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
                                {documentFiles.length > 0 && (
                                    <div className="mt-4 flex flex-wrap gap-2">
                                        {documentFiles.map((file, index) => (
                                            <div
                                                key={index}
                                                className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-full text-sm"
                                            >
                                                <span>{file.name}</span>
                                                <button
                                                    onClick={() => removeDocument(index)}
                                                    className="ml-1 text-gray-500 hover:text-gray-700 font-bold"
                                                >
                                                    ×
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}

                            </div>
                        </Card>

                        {/* Behavior & Personality */}
                        <Card className="p-6">
                            <div className="flex items-center gap-2 ">
                                <Image
                                    src="\assets\logos\behaviour-persnonality.svg"
                                    alt="Upload Icon"
                                    width={30}
                                    height={30}
                                />
                                <h2 className="text-lg font-semibold ">Behavior & Personality</h2>

                            </div>

                            {/* Response Tone Slider */}
                            <div className="mb-8">
                                <div className="flex items-center justify-between mb-3">
                                    <label className="text-sm font-medium">Response Tone</label>
                                    <span className="text-xs text-gray-500">
                                        {responseTone <= 33 ? 'Strict/Professional' : responseTone <= 66 ? 'Balanced' : 'Friendly & Enthusiastic'}
                                    </span>
                                </div>
                                <Slider
                                    value={responseTone}
                                    onChange={setResponseTone}
                                    lowLabel="Strict/Professional"
                                    highLabel="Humorous/Playful"
                                    thumbColor="#f1eef1"
                                    thumbBorder="4px solid #575abe"
                                    trackFilledColor="#575abe"
                                    trackEmptyColor="#e5e7eb"
                                />
                            </div>

                            {/* Personality Types */}
                            <div>
                                <label className="block text-sm font-medium mb-4">Personality Type</label>
                                <div className="grid grid-cols-3 gap-4">
                                    {/* Helpful */}
                                    <button
                                        onClick={() => setSelectedPersonality('helpful')}
                                        className={`p-4 rounded-lg border-2 text-left transition-all ${selectedPersonality === 'helpful'
                                            ? 'border-blue-600 bg-blue-50'
                                            : 'border-gray-200 bg-white hover:border-gray-300'
                                            }`}
                                    >
                                        <div className="flex items-start gap-2 mb-2">
                                            <Heart size={20} className="text-red-500" />
                                        </div>
                                        <h3 className="font-semibold text-sm mb-1">Helpful</h3>
                                        <p className="text-xs text-gray-600">Focuses on solving problems quickly.</p>
                                    </button>

                                    {/* Concise */}
                                    <button
                                        onClick={() => setSelectedPersonality('concise')}
                                        className={`p-4 rounded-lg border-2 text-left transition-all ${selectedPersonality === 'concise'
                                            ? 'border-blue-600 bg-blue-50'
                                            : 'border-gray-200 bg-white hover:border-gray-300'
                                            }`}
                                    >
                                        <div className="flex items-start gap-2 mb-2">
                                            <Zap size={20} className="text-yellow-500" />
                                        </div>
                                        <h3 className="font-semibold text-sm mb-1">Concise</h3>
                                        <p className="text-xs text-gray-600">Short punchy responses.</p>
                                    </button>

                                    {/* Curious */}
                                    <button
                                        onClick={() => setSelectedPersonality('curious')}
                                        className={`p-4 rounded-lg border-2 text-left transition-all ${selectedPersonality === 'curious'
                                            ? 'border-blue-600 bg-blue-50'
                                            : 'border-gray-200 bg-white hover:border-gray-300'
                                            }`}
                                    >
                                        <div className="flex items-start gap-2 mb-2">
                                            <MessageSquarePlus size={20} className="text-blue-500" />
                                        </div>
                                        <h3 className="font-semibold text-sm mb-1">Curious</h3>
                                        <p className="text-xs text-gray-600">Asks follow-up questions.</p>
                                    </button>
                                </div>
                            </div>
                        </Card>

                        {/* Action Buttons */}
                        <div className="flex gap-4 justify-end">
                            <Button variant="secondary">Cancel</Button>
                            <Button variant="primary" onClick={handleSave}>
                                Save Changes
                            </Button>
                        </div>

                    </div>

                    <div className="col-span-1 row-span-3 ">
                        <Card className="col-span-1 p-6 h-fit w-full sticky top-6">
                            <h2 className="text-lg font-semibold mb-4">Preview</h2>
                            <div className="bg-white border rounded-lg p-4 h-96 flex flex-col">
                                <div className="flex items-center gap-3 mb-4 pb-4 border-b">
                                    {chatbotIcon && (
                                        <img src={URL.createObjectURL(chatbotIcon)} alt="icon" className="w-10 h-10 rounded-full" />
                                    )}
                                    <div>
                                        <p className="font-semibold text-sm">{chatbotName}</p>
                                        <p className="text-xs text-gray-500">Online</p>
                                    </div>
                                </div>
                                <div className="flex-1 overflow-y-auto mb-4">
                                    <p className="text-xs text-gray-600 text-center mt-8">Chat preview will appear here</p>
                                </div>
                                <input type="text" placeholder="Type a message..." className="w-full border rounded px-3 py-2 text-sm" disabled />
                            </div>
                        </Card>
                    </div>

                </div>
            </div>
        </div>
    );
}