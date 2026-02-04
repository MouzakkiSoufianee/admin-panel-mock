import React, { ReactNode } from "react";
import Link from "next/link";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/app/components/ui/tooltip";
import { Button } from "@/app/components/ui/button";
import { usePathname } from "next/navigation";

interface NavItem {
  label: string;
  icon: ReactNode;
  href: string;
  isLogoIcon?: boolean;
}

interface MainNavigationProps {
  items: NavItem[];
  isCollapsed: boolean;
}

export function MainNavigation({ items, isCollapsed }: MainNavigationProps) {
  const pathname = usePathname();
  const isSelected = (href: string) => pathname === href;

  return (
    <nav className="flex flex-col gap-2">
      {items.map(({ label, icon: Icon, href, isLogoIcon }, idx) => (
        <React.Fragment key={label}>
          <Tooltip key={isCollapsed ? 'collapsed' : 'expanded'}>
            <TooltipTrigger asChild>
              <Link href={href} className="block w-full">
                <Button
                  variant="ghost"
                  className={`flex items-center justify-start w-full rounded-lg py-2 text-base font-medium transition-colors ${
                    isCollapsed ? 'px-0' : 'gap-3 px-3'
                  }
                    ${
                      isSelected(href)
                        ? "bg-white shadow-sm"
                        : "bg-[#7B6EF6] hover:bg-white/10"
                    }`}
                >
                  <span 
                    style={{
                      color: isSelected(href) ? '#575abe' : 'white',
                    }}
                    className="flex items-center gap-3"
                  >
                    {isLogoIcon && React.isValidElement(Icon)
                      ? React.cloneElement(Icon, { color: isSelected(href) ? '#575abe' : 'white' } as any)
                      : Icon}
                    {!isCollapsed && <span>{label}</span>}
                  </span>
                </Button>
              </Link>
            </TooltipTrigger>
            {isCollapsed && (
              <TooltipContent side="right">
                <span>{label}</span>
              </TooltipContent>
            )}
          </Tooltip>
          {idx === 0 && <div className="my-4 h-px w-full bg-white/30" />}
        </React.Fragment>
      ))}
    </nav>
  );
}
