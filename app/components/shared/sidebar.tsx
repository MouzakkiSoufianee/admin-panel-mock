
"use client";
import React, { useState, ReactNode } from "react";
import Link from "next/link";
import { LogOut, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { usePathname } from "next/navigation";
import { FolderHeart, LayoutDashboard, LandPlot, BriefcaseBusiness, Users, ChartSpline, CalendarDays, Bell, LayoutPanelLeft, Store } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/app/components/ui/tooltip";


interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}
export default function Sidebar({ isCollapsed, onToggle }: SidebarProps) {

  const pathname = usePathname();
  // Example nav items (replace with your actual navItems and bottomItems arrays)

  type NavItem = {
    label: string;
    icon: ReactNode;
    href: string;
  };
  const navItems: NavItem[] = [
    {
      label: "Favorite",
      icon: <FolderHeart />,
      href: "/favorite"
    },
    {
      label: "Dashboard",
      icon: (
        <Image
          src="/assets/logos/dashboard-icon.svg"
          alt="Dashboard"
          width={20}
          height={20}
          style={{ display: "inline-block" }}
        />
      ),
      href: "/dashboard"
    },
    {
      label: "Arenas",
      icon: (
        <Image
          src="/assets/logos/arenas-icon.svg"
          alt="Arenas"
          width={20}
          height={20}
          style={{ display: "inline-block" }}
        />
      ),
      href: "/arenas"
    },
    {
      label: "Projects", icon: <Image
        src="/assets/logos/projects.svg"
        alt="Projects"
        width={20}
        height={20}
        style={{ display: "inline-block" }}
      />,
      href: "/projects"
    },
    {
      label: "Employees", icon: <Users />,
      href: "/employees"
    },
    { label: "Global Analytics", icon: <ChartSpline />, href: "/globalAnalytics" },
    {
      label: "Events", icon: <Image
        src="/assets/logos/solar_calendar-outline.svg"
        alt="Events"
        width={20}
        height={20}
        style={{ display: "inline-block" }}
      />,
      href: "/events"
    },
    { label: "Notifications", icon: <Bell />, href: "/notifications" },
  ];

  
  const bottomItems = [
    {
      label: "MyApp", icon: <Image
        src="/assets/logos/myapp.svg"
        alt="MyApp"
        width={20}
        height={20}
        style={{ display: "inline-block" }}
      />, href: "/myapp"
    },
    {
      label: "MarketPlace", icon: <Image
        src="/assets/logos/marketplace.svg"
        alt="MarketPlace "
        width={20}
        height={20}
        style={{ display: "inline-block" }}
      />, href: "/marketplace"
    },
  ];
  return (
    <aside className={`flex h-screen ${isCollapsed ? 'w-20' : 'w-64'} flex-col justify-between bg-[#7B6EF6] py-6 px-4 text-white shadow-lg rounded-lg transition-all duration-300 relative`}>
      <div className="flex flex-col h-full">
        <div className="relative">
          <div className={`flex items-center px-2 ${isCollapsed ? 'justify-start' : ''} mb-12`}>
            {isCollapsed ? (
              <Image src="/assets/logos/short-gamitool-logo.svg" alt="GamiTool Logo" width={40} height={40} />
            ) : (
              <>
                <Image src="/assets/logos/GamiPanel-logo.svg" alt="GamiPanel Logo" width={140} height={40} />
              </>
            )}
          </div>
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
          <nav className="flex flex-col gap-2">
            {navItems.map(({ label, icon: Icon, href }, idx) => (
              <React.Fragment key={label}>
                <Tooltip key={isCollapsed ? 'collapsed' : 'expanded'}>
                  <TooltipTrigger asChild>
                    <Link href={href} className="block w-full">
                      <Button
                        variant="ghost"
                        className={`flex items-center justify-start w-full rounded-lg py-2 text-base font-medium transition-colors ${isCollapsed ? 'px-0' : 'gap-3 px-3'}
                          ${pathname === href
                            ? "bg-white text-[#7B6EF6] shadow-sm"
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
                {idx === 0 && <div className="my-4 h-px w-full bg-white/30" />}
              </React.Fragment>
            ))}
          </nav>
        </div>
        <div className="flex-1" />
        <div>
          <nav className="flex flex-col gap-3 mb-4">
            {bottomItems.map(({ label, icon: Icon, href }) => (
              <Tooltip key={label + (isCollapsed ? '-collapsed' : '-expanded')}>
                <TooltipTrigger asChild>
                  <Link href={href} className="block w-full">
                    <Button
                      variant="ghost"
                      className={`flex items-center justify-start w-full rounded-lg py-2 text-base font-medium transition-colors ${isCollapsed ? 'px-0' : 'gap-3 px-3'}
                      ${pathname === href
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
          {isCollapsed ? (
            <>
              <Button
                variant="ghost"
                size="icon"
                className="mb-2 p-1 rounded-md hover:bg-white/20 transition-colors w-full flex justify-center"
                aria-label="Logout"
                onClick={() => {/* TODO: handle logout */ }}
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
                onClick={() => {/* TODO: handle logout */ }}
              >
                <LogOut className="w-6 h-6 text-white/70" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
