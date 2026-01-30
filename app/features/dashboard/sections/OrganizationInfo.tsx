import { Card } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import Image from "next/image";

// Mock data (replace with API data when available)
const mockOrg = {
    name: "Organization Name",
    created: "Jul 15, 2025",
    updated: "Jan 30, 2026",
};

export default function OrganizationInfo() {
    return (
        <Card className="col-span-1 flex flex-col items-center  "
            style={{
            background: "#fff",
            borderRadius: 16,
            padding: 20,
            boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
            // Removed fixed height and width for natural sizing
            }}
        >
            <div className="w-full mb-4 relative ">
                <div className="flex items-center justify-between">
                    <div>
                        
                        <div className="text-l text-gray-400 ">Organization  information</div>
                        
                        <div className="text-l font-bold text-black">{mockOrg.name}</div>
                        <div className="h-4" /> {/* Small vertical space */}
                        <div className="text-xs text-gray-400">Created: {mockOrg.created}</div>
                        <div className="text-xs text-gray-400">Last updated: {mockOrg.updated}</div>
                    </div>
                </div>
                <div className="absolute top-0 right-0 flex items-center justify-center w-10 h-10 rounded-full bg-[rgba(206,206,254,0.5)]">
                    <Image
                        src="/assets/logos/organization-info-icon.svg"
                        alt="Organization Info"
                        width={24}
                        height={24}
                        className="text-gray-400"
                    />
                </div>
            </div>
         <div className="w-82 h-55 flex flex-col items-center  bg-[#CECEFE] rounded-lg p-4">
                <Image
                    src="/assets/logos/Business Analysis.svg"
                    alt="Settings"
                    width={80}
                    height={80}
                    className="w-40 h-20 mb-2"
                    priority
                />
                <div className="text-xl text-black mb-2 text-center w-full">Configure organization settings</div>
                <Button
                    variant="black"
                    className="mx-auto h-10 w-35"
                >
                    Config
                </Button>
            </div>
        </Card>
    );
}
