
"use client";
import React, { ReactNode } from "react";
import { FolderHeart, Users, ChartSpline, Bell } from "lucide-react";
import Image from "next/image";

import { LogoSection } from "./sidebarSections/logo-section";
import { CollapseButton } from "./sidebarSections/collapse-button";
import { MainNavigation } from "./sidebarSections/main-navigation";
import { BottomNavigation } from "./sidebarSections/bottom-navigation";
import { UserProfileSection } from "./sidebarSections/user-profile-section";
import {
  DashboardIcon,
  ArenasIcon,
  ProjectsIcon,
  EventsIcon,
  MyAppIcon,
  MarketplaceIcon,
  FolderOpenIcon,
} from "./sidebarSections/icons";

export interface NavItem {
  label: string;
  icon: ReactNode;
  href: string;
  isLogoIcon?: boolean;
}

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
  navItems?: NavItem[];
  bottomItems?: NavItem[];
  onLogout?: () => void;
}

export function Sidebar({ 
  isCollapsed, 
  onToggle,
  navItems,
  bottomItems,
  onLogout
}: SidebarProps) {
  // Default nav items if not provided
  const defaultNavItems: NavItem[] = [
    {
      label: "Favorite",
      icon: <FolderHeart />,
      href: "/favorite"
    },
    {
      label: "Dashboard",
      icon: <DashboardIcon color="blue" />,
      href: "/dashboard",
      isLogoIcon: true
    },
    {
      label: "Arenas",
      icon: <ArenasIcon color="white" />,
      href: "/arenas",
      isLogoIcon: true
    },
    {
      label: "Projects",
      icon: <ProjectsIcon color="white" />,
      href: "/projects",
      isLogoIcon: true
    },
    {
      label: "Employees", icon: <Users />,
      href: "/employees",
      isLogoIcon: true
    },
    { label: "Global Analytics", icon: <ChartSpline />, href: "/globalAnalytics", isLogoIcon: true },
    {
      label: "Events",
      icon: <EventsIcon color="white" />,
      href: "/events",
      isLogoIcon: true
    },
        { label: "Notifications", icon: <Bell />, href: "/notifications", isLogoIcon: true },

    {
      label: "Resources",
      icon: <FolderOpenIcon color="white" />,
      href: "/resources",
      isLogoIcon: true
    },
  ];

  const defaultBottomItems: NavItem[] = [
    {
      label: "MyApp",
      icon: <MyAppIcon color="white" />,
      href: "/myapp",
      isLogoIcon: true
    },
    {
      label: "MarketPlace",
      icon: <MarketplaceIcon color="white" />,
      href: "/marketplace",
      isLogoIcon: true
    },
  ];

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    }
  };

  return (
    <aside className={`flex h-screen ${isCollapsed ? 'w-20' : 'w-64'} flex-col justify-between bg-[#716DF0] py-6 px-4 text-white shadow-lg rounded-lg transition-all duration-300 relative`}>
      <div className="flex flex-col h-full">
        <div className="relative">
          {/* Logo Section */}
          <LogoSection isCollapsed={isCollapsed} />

          {/* Collapse Toggle Button */}
          <CollapseButton isCollapsed={isCollapsed} onToggle={onToggle} />

          {/* Main Navigation */}
          <MainNavigation items={navItems || defaultNavItems} isCollapsed={isCollapsed} />
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Bottom Section */}
        <div>
          {/* Bottom Navigation */}
          <BottomNavigation items={bottomItems || defaultBottomItems} isCollapsed={isCollapsed} />

          {/* User Profile Section */}
          <UserProfileSection isCollapsed={isCollapsed} onLogout={handleLogout} />
        </div>
      </div>
    </aside>
  );
}
