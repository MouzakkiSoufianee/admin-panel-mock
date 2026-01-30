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
        <Card className="col-span-2 flex flex-col gap-4 " style={{
            background: "#fff",
            borderRadius: 16,
            padding: 20,
            boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
        }}>
            <div className="flex items-center justify-between">
                <div className="text-l text-gray-400">Quick statistics</div>
                <div
                    style={{
                        background: "#f5f7ff",
                        borderRadius: 20,
                        padding: 5,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        height: 40,
                        width: 48,
                        marginLeft: 12,
                    }}
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
            <div className="grid grid-cols-5 gap-4">
                {stats.map((stat, idx) => (
                    <div
                        key={stat.label}
                        className="flex flex-col items-center py-2 rounded-2xl bg-white  border border-black/5 shadow-sm"
                    >
                        <div className="text-xl font-bold text-[#7FBA7A]">{stat.value}</div>
                        <div className="text-xs text-gray-500">{stat.label}</div>
                    </div>
                ))}
            </div>

        </Card>
    );
}
