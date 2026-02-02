import React, { useState } from 'react';

interface ToggleProps {
    enabled: boolean;
    onToggle: (enabled: boolean) => void;
    label?: string;
    disabled?: boolean;
}

export const Toggle: React.FC<ToggleProps> = ({
    enabled,
    onToggle,
    label,
    disabled = false,
}) => {
    return (
        <div className="flex items-center gap-3">
            <button
                onClick={() => onToggle(!enabled)}
                disabled={disabled}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    enabled ? 'bg-blue-600' : 'bg-gray-300'
                } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
            >
                <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        enabled ? 'translate-x-6' : 'translate-x-1'
                    }`}
                />
            </button>
            {label && <label className="text-sm font-medium text-gray-700">{label}</label>}
        </div>
    );
};