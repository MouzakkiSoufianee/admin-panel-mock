"use client";

import React, { useEffect, useRef, useState } from 'react';
import { Button } from './button';

export interface ActionMenuItem {
  label: string;
  value: string;
  onClick: () => void;
  variant?: 'default' | 'destructive';
  buttonVariant?: "primary" | "secondary" | "destructive" | "outline" | "link" | "ghost" | "gradient" | "black" | "lightgreen" | "purple_link" | "outlined_card_onHover" | "outlined_card" | "purple" | "menu_destructive" | "menu_outline";
  color?: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  separator?: boolean;
}

interface ActionMenuProps {
  trigger: React.ReactNode;
  items: ActionMenuItem[];
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  position?: 'left' | 'right';
  width?: string;
  size?: 'sm' | 'md' | 'lg';
  onStopPropagation?: (e: React.MouseEvent) => void;
}

export function ActionMenu({
  trigger,
  items,
  isOpen,
  onOpenChange,
  position = 'right',
  width = 'w-40',
  size = 'md',
}: ActionMenuProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isClickingInsideRef = useRef(false);

  // Handle mouse down to track if clicking inside
  useEffect(() => {
    const handleMouseDown = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      isClickingInsideRef.current = !!target.closest('[data-action-menu-container]');
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleMouseDown);
      return () => document.removeEventListener('mousedown', handleMouseDown);
    }
  }, [isOpen]);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!isClickingInsideRef.current) {
        onOpenChange(false);
      }
      isClickingInsideRef.current = false;
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
          className={`absolute ${positionClass} mt-0 mr-3 ${width} bg-white  rounded-[18px] shadow-card z-10 animate-in fade-in slide-in-from-top-4 zoom-in-95 duration-400`}
          onClick={(e) => e.stopPropagation()}
        >
          {items.map((item, index) => (
            <React.Fragment key={item.value}>
              {item.separator && (
                <div className="my-1 h-px bg-gray-200" />
              )}
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  if (!item.disabled) {
                    item.onClick();
                    // Delay close to allow action to complete
                    setTimeout(() => onOpenChange(false), 50);
                  }
                }}
                disabled={item.disabled}
                variant={item.buttonVariant || 'ghost'}
                size={size === 'sm' ? 'sm' : size === 'lg' ? 'xl' : 'default'}
                className="w-full justify-start gap-2"
              >
                {item.icon && <span className="shrink-0">{item.icon}</span>}
                <span>{item.label}</span>
              </Button>
            </React.Fragment>
          ))}
        </div>
      )}
    </div>
  );
}
