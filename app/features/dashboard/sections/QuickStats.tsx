import { Card } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { MessageCircle } from "lucide-react";
import Image from "next/image";
const stats = [
    { label: "Active Projects", value: 1 },
    { label: "Total Employees", value: 300 },
    { label: "Installed Games", value: 50 },
    { label: "Avg Score", value: 5 },
    { label: "Completion Rate", value: "80%" },
];

export default function QuickStats() {
    return (
        <Card className="col-span-2 flex flex-col gap-4 bg-white rounded-2xl p-5 shadow-sm"
        >
            <div className="flex items-center justify-between">
                <div className="text-sm text-gray-400">Quick statistics</div>
                <div
                    className="bg-[#f5f7ff] rounded-full p-1.5 flex items-center justify-center h-10 w-12"
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
                    <div
                        key={stat.label}
                        className="flex flex-col items-center py-2 px-1 rounded-2xl bg-white border border-black/5 shadow-sm"
                    >
                        <div className="text-lg sm:text-xl font-bold text-[#7FBA7A]">{stat.value}</div>
                        <div className="text-xs text-gray-500 text-center">{stat.label}</div>
                    </div>
                ))}
            </div>

        </Card>
    );
}
