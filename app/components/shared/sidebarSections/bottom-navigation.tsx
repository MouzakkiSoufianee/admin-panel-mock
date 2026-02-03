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
  const isSelected = (href: string) => pathname === href;

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
                  isSelected(href)
                    ? "bg-white text-[#A855F7] shadow-sm"
                    : "bg-[#7B6EF6] text-white/80 hover:bg-white/10"
                }`}
              >
                <span className={`${
                  isSelected(href)
                    ? "[&>img]:brightness-0 [&>img]:saturate-200 [&>img]:hue-rotate-[60deg] [&>img]:opacity-100"
                    : "[&>img]:brightness-0 [&>img]:saturate-100 [&>img]:hue-rotate-0 [&>img]:opacity-60"
                }`} style={{color: isSelected(href) ? '#575abe' : '#9ca3af'}}>
                  {Icon}
                </span>
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
