import React, { CSSProperties } from 'react';

interface SliderProps {
    min?: number;
    max?: number;
    value: number;
    onChange: (value: number) => void;
    label?: string;
    lowLabel?: string;
    highLabel?: string;
    thumbColor?: string;
    thumbBorder?: string;
    trackFilledColor?: string;
    trackEmptyColor?: string;
    className?: string;
}

const sliderStyles = (thumbBorder?: string, thumbColor?: string) => `
  .slider-input::-webkit-slider-thumb {
    appearance: none;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    cursor: pointer;
    box-shadow: 0 2px 4px rgba(24, 25, 69, 0.3);
    background: ${thumbColor || '#181945'};
    ${thumbBorder ? `border: ${thumbBorder};` : ''}
  }
  
  .slider-input::-moz-range-thumb {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    cursor: pointer;
    box-shadow: 0 2px 4px rgba(24, 25, 69, 0.3);
    background: ${thumbColor || '#181945'};
    ${thumbBorder ? `border: ${thumbBorder};` : 'border: none;'}
  }
  
  .slider-input::-moz-range-track {
    background: transparent;
    border: none;
  }
`;

export const Slider: React.FC<SliderProps> = ({
    min = 0,
    max = 100,
    value,
    onChange,
    label,
    lowLabel,
    highLabel,
    thumbColor = '#181945',
    thumbBorder,
    trackFilledColor = '#e814ba',
    trackEmptyColor = '#e5e7eb',
    className = '',
}) => {
    const sliderStyle: CSSProperties = {
        background: `linear-gradient(to right, ${trackFilledColor} 0%, ${trackFilledColor} ${value}%, ${trackEmptyColor} ${value}%, ${trackEmptyColor} 100%)`,
    };

    return (
        <div className={className}>
            <style>{sliderStyles(thumbBorder, thumbColor)}</style>
            {label && (
                <div className="flex items-center justify-between mb-3">
                    <label className="text-sm font-medium">{label}</label>
                </div>
            )}
            <input
                type="range"
                min={min}
                max={max}
                value={value}
                onChange={(e) => onChange(Number(e.target.value))}
                className="slider-input w-full h-2 rounded-lg appearance-none cursor-pointer"
                style={{
                    ...sliderStyle,
                }}
            />
            {(lowLabel || highLabel) && (
                <div className="flex justify-between text-xs text-gray-500 mt-2">
                    <span>{lowLabel}</span>
                    <span>{highLabel}</span>
                </div>
            )}
        </div>
    );
};
