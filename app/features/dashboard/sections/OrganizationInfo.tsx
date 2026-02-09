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
    name: "Organization name",
    created: "Jul 15, 2025",
    updated: "Jan 30, 2026",
};

export function OrganizationInfo({ org = DEFAULT_ORG, onConfig }: OrganizationInfoProps) {
    return (
        <Card className="col-span-1 flex flex-col items-center bg-white !rounded-[18px] shadow-card w-full sm:p-5 md:p-6 "

        >
            <div className="w-full">
                <div className="flex items-start justify-between w-full mb-4">
                    <div className="flex-1">
                        <div className="text-h3 text-gray mt-1">Organization information</div>
                        <div className="text-h2 text-black">{org.name}</div>
                    </div>
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-light-purple flex-shrink-0">
                        <Image
                            src="/assets/logos/organization-info-icon.svg"
                            alt="Organization Info"
                            width={24}
                            height={24}
                        />
                    </div>
                </div>

                <div className="flex flex-col">
                    <div>
                        <div className="text-h5 text-gray">Created: {org.created}</div>
                        <div className="text-h5 text-gray">Last updated: {org.updated}</div>
                        <div className="h-4"></div>
                    </div>
                </div>
            </div>
            <div className=" flex flex-col items-center bg-[#CECEFE] rounded-lg p-4 sm:p-4 ">
                <Image
                    src="/assets/logos/Business Analysis.svg"
                    alt="Settings"
                    width={171.189}
                    height={82.165}
                    className="mb-2 sm:mb-3"
                    style={{ width: '171.189px', height: '82.165px' }}
                    priority
                />
                <div className="text-h3 text-black mb-3 text-center w-full">Configure organization settings</div>
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
