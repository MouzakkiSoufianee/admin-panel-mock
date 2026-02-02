
import { Card } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Plus, Zap } from "lucide-react";
import Image from "next/image";
export default function QuickActions() {
  return (
    <Card
      className="col-span-1 flex flex-col items-start p-5 relative"
      style={{
      background: "#fff",
      borderRadius: 16,
      padding: 20,
      boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
      minHeight: 160,
      }}
    >
      <div className="flex items-center mb-6 justify-between w-full">
        <div className="text-l text-gray-400">Quick Actions</div>
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
        src="/assets/logos/vector.svg"
        alt="Activity"
        width={24}
        height={24}
        style={{ objectFit: "contain" }}
          />
        </div>
      </div>
      <div className="flex flex-col 2xl:flex-row items-center gap-3 2xl:gap-6 w-full">
      <Button
        variant="lightgreen"
        className="w-full 2xl:flex-1 flex items-center justify-center gap-2 rounded-2xl bg-white shadow-none"
        style={{ height: 44 }}
      >
        <span className="flex items-center justify-center rounded-full bg-[#8BC194] mr-2 flex-shrink-0">
        <Plus className="text-white w-6 h-6" />
        </span>
        <span className="text-base text-[#181945] font-normal truncate">Add project</span>
      </Button>
      <Button
        variant="outline"
        className="w-full 2xl:flex-1 flex items-center justify-center gap-2 rounded-2xl bg-white shadow-none"
        style={{ height: 44 }}
      >
        <span className="flex items-center justify-center rounded-full bg-[#7B7BFF] mr-2 flex-shrink-0">
        <Plus className="text-white w-6 h-6" />
        </span>
        <span className="text-base text-[#181945] font-normal truncate">Add Organization</span>
      </Button>
      </div>
    </Card>
  );
}
