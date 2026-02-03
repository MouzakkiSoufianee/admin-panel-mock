import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/app/components/ui/button";

interface CollapseButtonProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

export function CollapseButton({ isCollapsed, onToggle }: CollapseButtonProps) {
  return (
    <Button
      size="icon"
      variant="ghost"
      className="border border-gray-300 shadow-sm absolute top-6 -right-8 z-50 size-8 p-1 bg-white/80 hover:bg-white transition-colors"
      onClick={onToggle}
    >
      {isCollapsed ? (
        <ChevronRight className="text-[#7B6EF6] size-5 transition-transform" />
      ) : (
        <ChevronLeft className="text-[#7B6EF6] size-5 transition-transform" />
      )}
    </Button>
  );
}
