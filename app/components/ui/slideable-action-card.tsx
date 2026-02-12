"use client";

import React, { ReactNode } from 'react';
import { EllipsisVertical } from 'lucide-react';
import { Button } from './button';
import { Card } from './card';

export interface ActionButton {
  icon: ReactNode;
  onClick: () => void;
  label?: string;
  variant?: 'ghost' | 'secondary' | 'primary' | 'destructive' | 'outline' | 'link' | 'gradient' | 'black' | 'lightgreen' | 'purple_link' | 'outlined_card_onHover' | 'outlined_card' | 'purple' | 'menu_destructive' | 'menu_outline';
}

export interface SlideableActionCardProps {
  isExpanded: boolean;
  onToggleExpand: () => void;
  children: ReactNode;
  actions: ActionButton[];
  className?: string;
  contentClassName?: string;
  actionsContainerClassName?: string;
}

/**
 * SlideableActionCard - A reusable card component that slides left to reveal action buttons.
 * This component manages the sliding animation and displays action buttons behind the card.
 */
export function SlideableActionCard({
  isExpanded,
  onToggleExpand,
  children,
  actions,
  className = '',
  contentClassName = '',
  actionsContainerClassName = '',
}: SlideableActionCardProps) {
  return (
    <div className={`relative rounded-lg transition-all duration-300 ${className}`}>
      {/* Action Buttons - appears behind the sliding card */}
      <div
        className={`absolute top-0 right-0 h-full flex flex-col items-center justify-center gap-2 rounded-r-3xl p-3 bg-[#E3E3FE] z-0 ${actionsContainerClassName}`}
      >
        {actions.map((action, idx) => (
          <Button
            key={idx}
            variant={action.variant || 'ghost'}
            size="icon"
            onClick={action.onClick}
            title={action.label}
          >
            {action.icon}
          </Button>
        ))}
      </div>

      {/* Main Card Content - slides left when expanded */}
      <Card
        className={`relative z-10 shadow-xs !rounded-[18px] transition-all duration-300 transform !p-0 shadow-card overflow-hidden ${
          isExpanded ? '-translate-x-11' : 'translate-x-0'
        }`}
      >
        <div className={`w-full ${contentClassName}`}>
          {children}

          {/* Toggle Expand Button - part of grid */}
          <div className="col-span-1 flex items-center justify-end">
            <Button
              variant="ghost"
              size="icon"
              onClick={onToggleExpand}
            >
              <EllipsisVertical className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
