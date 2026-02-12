
import { Card } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Plus, Zap } from "lucide-react";
import Image from "next/image";

export interface QuickAction {
  label: string;
  icon?: React.ReactNode;
  bgColor?: string;
  onClick?: () => void;
}

interface QuickActionsProps {
  actions?: QuickAction[];
  title?: string;
}

const DEFAULT_ACTIONS: QuickAction[] = [
  {
    label: "Add project",
    bgColor: "#8BC194",
  },
  {
    label: "Add Organization",
    bgColor: "#7B7BFF",
  },
];

export function QuickActions({ actions = DEFAULT_ACTIONS, title = "Quick Actions"  }: QuickActionsProps) {
  return (
    <Card
      className="col-span-1 flex flex-col items-start !p-7 relative !rounded-[18px] shadow-card"
    >
      <div className="flex items-center mb-6 justify-between w-full">
        <div className="text-h3 text-gray">{title}</div>
        <div className="bg-light-purple rounded-full h-10 w-10 flex items-center justify-center"><Image
          src="/assets/logos/vector.svg"
          alt="Activity"
          width={24}
          height={24}
          style={{ objectFit: "contain" }}
        /></div>
        
      </div>
      <div className="flex flex-col 2xl:grid 2xl:grid-cols-2 items-start gap-3 2xl:gap-6 w-full">
        {actions.map((action, idx) => (
          <Button
            key={idx}
            variant={idx === 0 ? "lightgreen" : "purple"}
            className="w-full 2xl:w-full flex justify-start gap-2 rounded-[18px] bg-white shadow-none"
            style={{ height: 44 }}
            onClick={action.onClick}
          >
            <span className="flex items-center justify-center rounded-full mr-2 flex-shrink-0" style={{ background: action.bgColor, width: "32px", height: "32px" }}>
              {action.icon || <Plus className="text-white w-6 h-6" />}
            </span>
            <span className="text-base text-[#181945] font-normal truncate">{action.label}</span>
          </Button>
        ))}
      </div>
    </Card>
  );
}
