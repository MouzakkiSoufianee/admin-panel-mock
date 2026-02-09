"use client"
import React, { useState } from "react";
import { Sidebar } from "./components/shared/sidebar"
import Navbar from "./components/shared/navbar";

export function LayoutClient({ children }: { children: React.ReactNode }) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
    <div className="flex h-screen">
      <Sidebar 
        isCollapsed={isSidebarCollapsed}
        onToggle={() => setIsSidebarCollapsed((prev) => !prev)}
      />
      <Navbar isSidebarCollapsed={isSidebarCollapsed} />
      <main className="flex-1 overflow-auto pt-16">{children}</main>
    </div>
  );
}
