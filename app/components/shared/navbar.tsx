"use client";
import React from "react";
import { Bell, Settings } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "../ui/select";
import { usePageTitle } from "../../contexts/page-title-context";

interface NavbarProps {
  isSidebarCollapsed: boolean;
  orgName?: string;
}

export default function Navbar({ isSidebarCollapsed, orgName = "ORG name" }: NavbarProps) {
  const { pageTitle } = usePageTitle();
  return (
    
    <header
      className={`fixed top-0 z-40 flex h-16 bg-white shadow-sm transition-all duration-300
    ${isSidebarCollapsed ? "left-20" : "left-64"} right-0`}
      style={{ minWidth: 0 }}
    >
      {/* Left: Logo & Title */}
      <div className="flex items-center gap-6 pl-6 min-w-[220px]">
        <span className="font-medium text-lg text-gray-900">{pageTitle}</span>
        <div className="ml-4 min-w-[120px]">
          <Select>
            <SelectTrigger className="!rounded-md !border-gray-300 !bg-white h-9 text-sm gap-1 px-3">
              <SelectValue placeholder={orgName} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={orgName}>{orgName}</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      {/* Center: Search */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-80">
        <div className="relative">
          <Input
            type="text"
            placeholder="Search here ..."
            className="w-full rounded-full border border-gray-200 bg-gray-50 py-2 pl-10 pr-4 text-sm focus:border-[#7B6EF6] focus:ring-1 focus:ring-[#7B6EF6] outline-none"
          />
          <span className="absolute left-3 top-2.5 text-gray-400">
            <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeWidth="2" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1 0 6.5 6.5a7.5 7.5 0 0 0 10.6 10.6Z" /></svg>
          </span>
        </div>
      </div>
      {/* Right: Icons & Avatar */}
      <div className="flex items-center gap-6 pr-8 min-w-[120px] ml-auto">
        <Button variant="ghost" size="icon" className="relative">
          <Settings className="w-5 h-5 text-gray-500" />
        </Button>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="w-5 h-5 text-gray-500" />
          <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">6</span>
        </Button>
        <Avatar className=" h-9 w-9"> 
          <AvatarImage src="/assets/logos/Mask group.svg" alt="Organization" />
        </Avatar>
      </div>
    </header>
    
  );
}
