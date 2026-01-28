"use client";
import React from "react";
import { Bell, Settings } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";

interface NavbarProps {
  isSidebarCollapsed: boolean;
  pageTitle?: string;
  orgName?: string;
}

export default function Navbar({ isSidebarCollapsed, pageTitle = "Dashboard", orgName = "ORG name" }: NavbarProps) {
  return (
    <header
      className={`fixed top-0 z-40 flex h-16 w-full items-center bg-white shadow-sm transition-all duration-300 ${
        isSidebarCollapsed ? "ml-20" : "ml-64"
      }`}
      style={{ minWidth: 0 }}
    >
      {/* Left: Logo & Title */}
      <div className="flex items-center gap-6 pl-6 min-w-[220px]">
        <div className="flex items-center gap-1">
          <span className="font-bold text-2xl text-[#7B6EF6]">Gami</span>
          <span className="font-light text-2xl">Panel</span>
        </div>
        <span className="font-medium text-lg text-gray-900">{pageTitle}</span>
        <select
          className="ml-4 rounded-xl border border-gray-200 px-3 py-1.5 text-sm text-gray-700 bg-white shadow focus:border-[#7B6EF6] focus:ring-1 focus:ring-[#7B6EF6] outline-none min-w-[120px]"
        >
          <option>{orgName}</option>
          {/* Add more orgs here */}
        </select>
      </div>
      {/* Center: Search */}
      <div className="flex-1 flex justify-center">
        <div className="relative w-80">
          <input
            type="text"
            placeholder="Search here ..."
            className="w-full rounded-full border border-gray-200 bg-gray-50 py-2 pl-10 pr-4 text-sm focus:border-[#7B6EF6] focus:ring-1 focus:ring-[#7B6EF6] outline-none"
          />
          <span className="absolute left-3 top-2.5 text-gray-400">
            <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeWidth="2" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1 0 6.5 6.5a7.5 7.5 0 0 0 10.6 10.6Z"/></svg>
          </span>
        </div>
      </div>
      {/* Right: Icons & Avatar */}
      <div className="flex items-center gap-6 pr-8">
        <Button variant="ghost" size="icon" className="relative">
          <Settings className="w-5 h-5 text-gray-500" />
        </Button>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="w-5 h-5 text-gray-500" />
          <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">6</span>
        </Button>
        <Avatar className="h-9 w-9">
          <AvatarImage src="/assets/logos/user-avatar.jpg" alt="User" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
