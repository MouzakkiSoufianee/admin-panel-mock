"use client";

import { useState } from "react";

interface NumberInputProps {
  value?: number;
  defaultValue?: number;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  onChange?: (value: number) => void;
  className?: string;
}

export default function NumberInput({
  value,
  defaultValue = 0,
  min,
  max,
  step = 1,
  disabled = false,
  onChange,
  className = "",
}: NumberInputProps) {
  const [internalValue, setInternalValue] = useState(defaultValue);

  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalValue;

  const clamp = (val: number) => {
    if (min !== undefined && val < min) return min;
    if (max !== undefined && val > max) return max;
    return val;
  };

  const updateValue = (val: number) => {
    const newValue = clamp(val);
    if (!isControlled) setInternalValue(newValue);
    onChange?.(newValue);
  };

  return (
    <div
      className={`flex items-center border rounded-[8px]  ${className}`}
    >
      

      <input
        type="number"
        value={currentValue}
        onChange={(e) => updateValue(Number(e.target.value))}
        disabled={disabled}
        min={min}
        max={max}
        step={step}
        className="w-16 text-center text-black outline-none [&::-webkit-outer-spin-button]:block [&::-webkit-inner-spin-button]:block [&::-webkit-outer-spin-button]:opacity-100 [&::-webkit-inner-spin-button]:opacity-100"
      />

      
    </div>
  );
}
export { NumberInput };