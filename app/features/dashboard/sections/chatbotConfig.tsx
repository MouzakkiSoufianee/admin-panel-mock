import Image from "next/image";
import { Button } from "@/app/components/ui/button";
import { Card } from "@/app/components/ui/card";

export default function ChatbotConfig() {
    return (
        <Card className="bg-white rounded-2xl p-5 shadow-sm">
            <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4">
                <div className="w-full">
                    {/* Icon and heading in a row */}
                    <div className="flex items-center gap-3 mb-2">
                        <div className="bg-[#f5f7ff] rounded-full p-1.5 flex items-center justify-center h-12 w-12">
                            <Image
                                src="/assets/logos/chatbot-logo.svg"
                                alt="chatbot"
                                width={24}
                                height={24}
                                style={{ objectFit: "contain" }}
                            />
                        </div>
                        <h3 className="text-[#6c63ff] m-0 font-semibold text-base sm:text-lg">
                            Chatbot Config
                        </h3>
                    </div>
                    <p className="text-gray-600 my-3 text-xs sm:text-sm leading-relaxed">
                        Set up chatbot responses to provide intelligent, role-based assistance and enhance user engagement across GamiTool.
                    </p>
                    <Button className="bg-[#7FBA7A] hover:bg-[#6fa86d]" variant="lightgreen">
                        Config chatbot
                    </Button>
                </div>
            </div>
        </Card>
    );
}
