import { Card } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { MessageCircle } from "lucide-react";
import Image from "next/image";

export interface Stat {
  label: string;
  value: string | number;
}

interface QuickStatsProps {
  stats?: Stat[];
  title?: string;
}

const DEFAULT_STATS: Stat[] = [
    { label: "Active Projects", value: 1 },
    { label: "Total Employees", value: 300 },
    { label: "Installed Games", value: 50 },
    { label: "Avg Score", value: 5 },
    { label: "Completion Rate", value: "80%" },
];

export function QuickStats({ stats = DEFAULT_STATS, title = "Quick statistics" }: QuickStatsProps) {
    return (
        <Card className="flex flex-col gap-4 bg-white  !rounded-[18px] shadow-card p-5 "
        >
            <div className="flex items-center justify-between">
                <div className="text-h3 text-gray">{title}</div>
                <div
                    className="bg-light-purple rounded-full p-1.5 flex items-center justify-center h-10 w-12"
                >
                    <Image
                        src="/assets/logos/Activity.svg"
                        alt="Activity"
                        width={24}
                        height={24}
                        style={{ objectFit: "contain" }}
                    />
                </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 sm:gap-3">
                {stats.map((stat, idx) => (
                    <Card
                        key={stat.label}
                        className="flex flex-col gap-2 items-center py-2 px-1 rounded-[18px] bg-white border border-black/5"
                    >
                        <div className="text-stats text-light-green">{stat.value}</div>
                        <div className="text-h6 text-black text-center">{stat.label}</div>
                    </Card>
                ))}
            </div>

        </Card>
    );
}
