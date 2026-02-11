"use client";

import React, { useState, ReactNode } from 'react';
import { ChevronDown, EllipsisVertical } from 'lucide-react';
import { Card } from './card';
import { ActionMenu, type ActionMenuItem } from './action-menu';

export interface ExpandableCardProps {
  id: string;
  title: string;
  startDate?: string;
  startTime?: string;
  endDate?: string;
  endTime?: string;
  children?: ReactNode;
  menuItems?: ActionMenuItem[];
  onMenuItemClick?: (value: string, id: string) => void;
  defaultExpanded?: boolean;
}

export function ExpandableCard({
  id,
  title,
  startDate,
  startTime,
  endDate,
  endTime,
  children,
  menuItems = [],
  onMenuItemClick,
  defaultExpanded = false,
}: ExpandableCardProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  const handleMenuClick = (item: ActionMenuItem) => {
    if (onMenuItemClick) {
      onMenuItemClick(item.value, id);
    } else if (item.onClick) {
      item.onClick();
    }
  };

  return (
    <Card className="bg-white shadow-xs border-[1px] rounded-[18px] overflow-visible !p-0 transition-all duration-300">
      {/* Card Header */}
      <div
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex w-full items-center justify-between rounded-[18px] border-[1px] !bg-[#FAFAFB] p-6 transition-colors cursor-pointer hover:bg-gray-100"
      >
        <div className="flex items-center gap-4">
          <button className="text-gray-400 hover:text-gray-600 transition-transform">
            <ChevronDown
              size={20}
              className={`transform text-[#7A86A1] transition-all duration-400 ${
                isExpanded ? 'rotate-0 scale-110' : '-rotate-90 scale-100'
              }`}
            />
          </button>
          <div>
            <h3 className="font-semibold text-gray-900">{title}</h3>
          </div>
        </div>

        {(startDate || endDate) && (
          <div className="flex items-center gap-8 text-sm text-gray-600">
            {startDate && (
              <div>
                <span className="font-medium text-gray-900">Start: </span>
                {startDate} {startTime && `at ${startTime}`}
              </div>
            )}
            {endDate && (
              <div>
                <span className="font-medium text-gray-900">End: </span>
                {endDate} {endTime && `at ${endTime}`}
              </div>
            )}
          </div>
        )}

        {menuItems.length > 0 && (
          <ActionMenu
            trigger={
              <button className="p-0 h-auto w-auto bg-transparent border-0 hover:opacity-70 transition-opacity focus:outline-none">
                <EllipsisVertical size={20} className="text-gray-500" />
              </button>
            }
            items={menuItems}
            isOpen={openMenuId === id}
            onOpenChange={(open) => setOpenMenuId(open ? id : null)}
            position="right"
          />
        )}
      </div>

      {/* Card Body - Expanded */}
      {isExpanded && children && (
        <div className="px-6 py-4 animate-in fade-in duration-500">
          {children}
        </div>
      )}
    </Card>
  );
}
