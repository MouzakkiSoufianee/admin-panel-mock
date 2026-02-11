'use client';

import { useState, useCallback, useEffect } from 'react';
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
import { Heart, Zap, MessageSquarePlus, EllipsisVertical, Send } from 'lucide-react';
import { usePageTitle } from '@/app/contexts/page-title-context';

interface ChatMessage {
    id: string;
    type: 'bot' | 'user';
    content: string;
}

const MOCK_MESSAGES: ChatMessage[] = [
    {
        id: '1',
        type: 'bot',
        content: "Hello! I'm here to help. What can I do for you today?"
    },
    {
        id: '2',
        type: 'user',
        content: "Can you help me find the Q3 analytics report?"
    },
    {
        id: '3',
        type: 'bot',
        content: "Absolutely! I've located the Q3 Analytics in your Projects/Marketing/Reports folder. Shall I open it for you?"
    }

];

export default function ChatbotConfigPage() {
    const { setPageTitle } = usePageTitle();

    useEffect(() => {
        setPageTitle('Config Chatbot');
    }, [setPageTitle]);

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
        <div className="min-h-screen bg-white p-6">
            <div className=" mx-auto">
                <h1 className="text-xl font-bold text-black mb-1 ml-2">Config chatbot</h1>
                <Link href="/dashboard" className="flex items-center gap-2 text-[#7570F2]   font-medium mb-4">
                    
                    <MoveLeft size={16} />
                    Back to Dashboard
                </Link>

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
                            </div><fieldset></fieldset>
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
                                    <h2 className="text-lg font-semibold text-black">General Identity</h2>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-6 mb-6">
                                <div>
                                    <label className="block text-sm text-black font-medium mb-2">Chatbot name</label>
                                    <Input value={chatbotName} onChange={(e) => setChatbotName(e.target.value)} placeholder="Enter chatbot name" />
                                </div>
                                <div>
                                    <label className="block text-sm text-black font-medium mb-2">Primary language</label>
                                    <Input value={primaryLanguage} onChange={(e) => setPrimaryLanguage(e.target.value)} placeholder="Select language" />
                                </div>
                            </div>

                            <div className="mb-6">
                                <label className="block text-sm text-black font-medium mb-2">Description</label>
                                <Textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Describe the purpose and context of this chatbot" rows={4} className="h-35 min-h-[80px] max-h-[320px] resize-y overflow-y-auto" />
                                <p className="text-xs text-gray-500 mt-1">Optional: Provide context about this avatar, purpose and theme.</p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-black mb-4">Upload your chatbot icon</label>
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
                            </div>
                        </Card>

                        {/* Documentation */}
                        <Card className="p-6">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-2 ">
                                    <Image
                                        src="/assets/logos/documentation.svg"
                                        alt="General Identity"
                                        width={48}
                                        height={48}
                                    />
                                    <div>
                                        <h2 className="text-lg font-semibold text-black">Documentation</h2>
                                        <p className="text-sm text-gray-600">This will activate the bot across all connected channels.</p>
                                    </div>

                                </div>
                            </div>

                            <div className="mt-6">

                                <label className="block text-sm font-medium text-black mb-4">Upload documentation</label>
                                <FileUpload
                                    accept=".pdf,.doc,.docx,.txt"
                                    maxSize={10 * 1024 * 1024}
                                    onAccept={handleDocumentUpload}
                                    label="Drag and drop documentation here"

                                >
                                    <Dropzone className="flex flex-col items-center h-65 justify-center gap-2 py-8">
                                        <div className="text-sm text-black font-medium">
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
                                <div className="grid grid-cols-3  gap-4">
                                    {/* Helpful */}
                                    <Button
                                        onClick={() => setSelectedPersonality('helpful')}
                                        variant="outlined_card_onHover"
                                        className={`flex justify-start p-4 text-left transition-all h-full w-full !border-2 ${selectedPersonality === 'helpful'
                                            ? '!border-[#575abe] !bg-[rgba(206,206,254,0.5)] shadow-md shadow-blue-100/50'
                                            : '!border-gray-200 hover:!border-gray-400'
                                            }`}
                                    >
                                        <div className="flex flex-col gap-3 items-start">
                                            <Heart size={20} className="flex-shrink-0 mt-0.5" style={{ color: selectedPersonality === 'helpful' ? '#575abe' : '#9ca3af' }} />

                                            <h3 className="font-semibold text-sm mb-1">Helpful</h3>
                                            <p className="text-xs text-gray-600">Focuses on solving problems quickly.</p>

                                        </div>


                                    </Button>

                                    {/* Concise */}
                                    <Button
                                        onClick={() => setSelectedPersonality('concise')}
                                        variant="outlined_card_onHover"
                                        className={`flex  justify-start p-4 text-left transition-all h-full w-full !border-2 ${selectedPersonality === 'concise'
                                            ? '!border-[#575abe] !bg-[rgba(206,206,254,0.5)] shadow-md shadow-blue-100/50'
                                            : '!border-gray-200 hover:!border-gray-400'
                                            }`}
                                    >
                                        <div className="flex flex-col gap-3 items-start">
                                            <Zap size={20} className="flex-shrink-0" style={{ color: selectedPersonality === 'concise' ? '#575abe' : '#9ca3af' }} />
                                            <h3 className="font-semibold text-sm mb-1">Concise</h3>
                                            <p className="text-xs text-gray-600">Short punchy responses.</p>
                                        </div>
                                    </Button>


                                    {/* Curious */}
                                    <Button
                                        onClick={() => setSelectedPersonality('curious')}
                                        variant="outlined_card_onHover"
                                        className={`flex justify-start p-4 text-left transition-all h-full w-full !border-2 ${selectedPersonality === 'curious'
                                            ? '!border-[#575abe] !bg-[rgba(206,206,254,0.5)] shadow-md shadow-blue-100/50'
                                            : '!border-gray-200 hover:!border-gray-400'
                                            }`}
                                    >
                                        <div className="flex flex-col gap-3 items-start">
                                            <MessageSquarePlus size={20} className="flex-shrink-0 mt-0.5" style={{ color: selectedPersonality === 'curious' ? '#575abe' : '#9ca3af' }} />

                                            <h3 className="font-semibold text-sm mb-1">Curious</h3>
                                            <p className="text-xs text-gray-600">Asks follow-up questions.</p>

                                        </div>
                                    </Button>
                                </div>
                            </div>
                        </Card>

                        {/* Action Buttons */}
                        <div className="flex gap-4 justify-end">
                            <Button variant="secondary">Cancel</Button>
                            <Button variant="primary" className='bg-[#575abe]' onClick={handleSave}>
                                Save Changes
                            </Button>
                        </div>

                    </div>

                    <div className="col-span-1 row-span-3 ">
                        <Card className="col-span-1 p-6 h-fit w-full sticky rounded-t-3/4 top-6 md:max-h-[calc(100vh-100px)] overflow-y-auto">
                            <div className="bg-gray-100 -m-6 mb-4 px-6 py-4 rounded-t-3/4">
                                <div className="flex items-center justify-between gap-3 mb-4">
                                    <div className="flex items-center  gap-3">
                                        <div className="flex justify-center items-center w-8 h-8 rounded-full bg-[rgba(206,206,254,0.5)]">
                                            <Image
                                                src="/assets/logos/chatbot-logo.svg"
                                                alt="chatbot"
                                                width={24}
                                                height={24}
                                                style={{ objectFit: "contain" }}
                                            />
                                        </div>

                                        <div className="flex flex-col gap-1">
                                            <h2 className="text-lg font-semibold">Live Preview</h2>
                                            <span className="flex items-center gap-2 text-xs text-green-600">
                                                <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                                                Active now
                                            </span>
                                        </div>
                                    </div>
                                    <Button
                                        variant="ghost"
                                        size="icon"

                                    >
                                        <EllipsisVertical className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>
                            <div className="rounded-lg p-4 h-90 flex flex-col">
                                {/* Chat Messages */}
                                <div className="flex-1 overflow-y-auto mb-4 space-y-4">
                                    {MOCK_MESSAGES.map((message) => (
                                        <div
                                            key={message.id}
                                            className={`flex gap-3 ${message.type === 'user' ? 'justify-end' : 'justify-start'
                                                }`}
                                        >
                                            {message.type === 'bot' && (
                                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex-shrink-0 flex items-center justify-center text-white text-xs font-semibold">
                                                    {chatbotName?.charAt(0) || 'B'}
                                                </div>
                                            )}
                                            <div
                                                className={`rounded-2xl px-4 py-2 max-w-xs ${message.type === 'bot'
                                                    ? 'bg-gray-100 text-gray-800'
                                                    : 'bg-[#575abe] text-white'
                                                    }`}
                                            >
                                                <p className="text-sm">{message.content}</p>
                                            </div>
                                            {message.type === 'user' && (
                                                <div className="w-8 h-8 rounded-full bg-gray-300 flex-shrink-0"></div>
                                            )}
                                        </div>
                                    ))}
                                </div>

                                {/* Input Area */}
                                <div className="flex gap-2 items-center">
                                    <Input type="text" placeholder="Type a message..." className="flex-1 border border-gray-300 rounded-full px-4 py-2 text-sm outline-none" />
                                    <Button variant="primary" size="xl" className="flex-shrink-0 rounded-full ">
                                        <Send />
                                    </Button>
                                </div>
                            </div>

                        </Card>
                    </div>

                </div>
            </div>
        </div>
    );
}