import { LogOut } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { Avatar, AvatarFallback } from "@/app/components/ui/avatar";

interface UserProfileSectionProps {
  isCollapsed: boolean;
  onLogout?: () => void;
}

export function UserProfileSection({ isCollapsed, onLogout }: UserProfileSectionProps) {
  return (
    <>
      {isCollapsed ? (
        <>
          <Button
            variant="ghost"
            size="icon"
            className="mb-2 p-1 rounded-md hover:bg-white/20 transition-colors w-full flex justify-center"
            aria-label="Logout"
            onClick={onLogout}
          >
            <LogOut className="w-6 h-6 text-white/70" />
          </Button>
          <div className="flex items-center justify-center rounded-xl bg-white/10 px-0 py-2">
            <Avatar className="h-8 w-8 bg-white/80 text-[#7B6EF6] font-bold">
              <AvatarFallback>C</AvatarFallback>
            </Avatar>
          </div>
        </>
      ) : (
        <div className="flex items-center justify-between rounded-xl bg-white/10 px-3 py-2">
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8 bg-white/80 text-[#7B6EF6] font-bold">
              <AvatarFallback>C</AvatarFallback>
            </Avatar>
            <span className="font-medium text-white/90">Organization</span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="p-1 rounded-md hover:bg-white/20 transition-colors"
            aria-label="Logout"
            onClick={onLogout}
          >
            <LogOut className="w-6 h-6 text-white/70" />
          </Button>
        </div>
      )}
    </>
  );
}
