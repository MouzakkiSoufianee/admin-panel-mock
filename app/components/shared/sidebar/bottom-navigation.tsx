import React, { ReactNode } from "react";
import Link from "next/link";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/app/components/ui/tooltip";
import { Button } from "@/app/components/ui/button";
import { usePathname } from "next/navigation";

interface NavItem {
  label: string;
  icon: ReactNode;
  href: string;
}

interface BottomNavigationProps {
  items: NavItem[];
  isCollapsed: boolean;
}

export function BottomNavigation({ items, isCollapsed }: BottomNavigationProps) {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-3 mb-4">
      {items.map(({ label, icon: Icon, href }) => (
        <Tooltip key={label + (isCollapsed ? '-collapsed' : '-expanded')}>
          <TooltipTrigger asChild>
            <Link href={href} className="block w-full">
              <Button
                variant="ghost"
                className={`flex items-center justify-start w-full rounded-lg py-2 text-base font-medium transition-colors ${
                  isCollapsed ? 'px-0' : 'gap-3 px-3'
                }
                ${
                  pathname === href
                    ? "bg-white text-[#A855F7] shadow-sm"
                    : "bg-[#7B6EF6] text-white/80 hover:bg-white/10"
                }`}
              >
                {Icon}
                {!isCollapsed && <span className="text-left">{label}</span>}
              </Button>
            </Link>
          </TooltipTrigger>
          {isCollapsed && (
            <TooltipContent side="right">
              <span>{label}</span>
            </TooltipContent>
          )}
        </Tooltip>
      ))}
    </nav>
  );
}
