
"use client";
import React, { ReactNode } from "react";
import { FolderHeart, Users, ChartSpline, Bell, Store } from "lucide-react";
import Image from "next/image";

import { LogoSection } from "./sidebarSections/logo-section";
import { CollapseButton } from "./sidebarSections/collapse-button";
import { MainNavigation } from "./sidebarSections/main-navigation";
import { BottomNavigation } from "./sidebarSections/bottom-navigation";
import { UserProfileSection } from "./sidebarSections/user-profile-section";


interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

export default function Sidebar({ isCollapsed, onToggle }: SidebarProps) {
  type NavItem = {
    label: string;
    icon: ReactNode;
    href: string;
    isLogoIcon?: boolean;
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
      href: "/dashboard",
      isLogoIcon: true
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
      href: "/arenas",
      isLogoIcon: true
    },
    {
      label: "Projects", icon: <Image
        src="/assets/logos/projects.svg"
        alt="Projects"
        width={20}
        height={20}
        style={{ display: "inline-block" }}
      />,
      href: "/projects",
      isLogoIcon: true
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

  const handleLogout = () => {
    // TODO: implement logout logic
  };
  return (
    <aside className={`flex h-screen ${isCollapsed ? 'w-20' : 'w-64'} flex-col justify-between bg-[#7B6EF6] py-6 px-4 text-white shadow-lg rounded-lg transition-all duration-300 relative`}>
      <div className="flex flex-col h-full">
        <div className="relative">
          {/* Logo Section */}
          <LogoSection isCollapsed={isCollapsed} />

          {/* Collapse Toggle Button */}
          <CollapseButton isCollapsed={isCollapsed} onToggle={onToggle} />

          {/* Main Navigation */}
          <MainNavigation items={navItems} isCollapsed={isCollapsed} />
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Bottom Section */}
        <div>
          {/* Bottom Navigation */}
          <BottomNavigation items={bottomItems} isCollapsed={isCollapsed} />

          {/* User Profile Section */}
          <UserProfileSection isCollapsed={isCollapsed} onLogout={handleLogout} />
        </div>
      </div>
    </aside>
  );}
