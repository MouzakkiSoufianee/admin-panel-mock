"use client";

import React, { useEffect, useRef, useState } from 'react';

export interface ActionMenuItem {
  label: string;
  value: string;
  onClick: () => void;
  variant?: 'default' | 'destructive';
}

interface ActionMenuProps {
  trigger: React.ReactNode;
  items: ActionMenuItem[];
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  position?: 'left' | 'right';
  width?: string;
  onStopPropagation?: (e: React.MouseEvent) => void;
}

export function ActionMenu({
  trigger,
  items,
  isOpen,
  onOpenChange,
  position = 'right',
  width = 'w-40',
}: ActionMenuProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('[data-action-menu-container]')) {
        onOpenChange(false);
      }
    };

    if (isOpen) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [isOpen, onOpenChange]);

  const positionClass = position === 'left' ? 'left-0' : 'right-0';

  return (
    <div className="relative" ref={containerRef} data-action-menu-container>
      <div
        onClick={(e) => {
          e.stopPropagation();
          onOpenChange(!isOpen);
        }}
      >
        {trigger}
      </div>

      {isOpen && (
        <div
          className={`absolute ${positionClass} mt-0 mr-3 ${width} bg-white border border-gray-200 rounded-lg shadow-lg z-10 animate-in fade-in slide-in-from-top-4 zoom-in-95 duration-400`}
          onClick={(e) => e.stopPropagation()}
        >
          {items.map((item, index) => (
            <button
              key={item.value}
              onClick={(e) => {
                e.stopPropagation();
                item.onClick();
                onOpenChange(false);
              }}
              className={`w-full text-left px-4 py-2 hover:bg-gray-100 text-sm transition-colors ${
                item.variant === 'destructive'
                  ? 'text-red-600 border-t border-gray-200'
                  : 'text-gray-700'
              } ${index > 0 && item.variant === 'destructive' ? '' : ''}`}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
