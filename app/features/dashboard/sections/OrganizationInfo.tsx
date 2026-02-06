import { Card } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import Image from "next/image";

export interface Organization {
    name: string;
    created: string;
    updated: string;
}

interface OrganizationInfoProps {
    org?: Organization;
    onConfig?: () => void;
}

const DEFAULT_ORG: Organization = {
    name: "Organization Name",
    created: "Jul 15, 2025",
    updated: "Jan 30, 2026",
};

export function OrganizationInfo({ org = DEFAULT_ORG, onConfig }: OrganizationInfoProps) {
    return (
        <Card className="col-span-1 flex flex-col items-center bg-white rounded-2xl w-full !p-2 sm:p-5 md:p-6 shadow-sm"
        >
            <div className="w-full  relative">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex-1">
                        <div className="text-sm text-gray-400">Organization information</div>
                        <div className="text-lg sm:text-xl font-bold text-black">{org.name}</div>
                        <div className="h-4" />
                        <div className="text-xs text-gray-400">Created: {org.created}</div>
                        <div className="text-xs text-gray-400">Last updated: {org.updated}</div>
                        <div className="h-4"></div>
                    </div>
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[rgba(206,206,254,0.5)] flex-shrink-0">
                        <Image
                            src="/assets/logos/organization-info-icon.svg"
                            alt="Organization Info"
                            width={24}
                            height={24}
                        />
                    </div>
                </div>
            </div>
            <div className="w-full flex flex-col items-center bg-[#CECEFE] rounded-lg p-3 sm:p-4 ">
                <Image
                    src="/assets/logos/Business Analysis.svg"
                    alt="Settings"
                    width={80}
                    height={80}
                    className="w-16 h-16 sm:w-24 sm:h-24 md:w-32 md:h-32 mb-2 sm:mb-3"
                    priority
                />
                <div className="text-sm sm:text-base md:text-lg text-black mb-3 text-center w-full">Configure organization settings</div>
                <Button
                    variant="black"
                    className="h-10 w-28 sm:w-32"
                    onClick={onConfig}
                >
                    Config
                </Button>
            </div>
        </Card>
    );
}
