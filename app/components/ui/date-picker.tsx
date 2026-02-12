import * as React from "react";
import { DatePicker as MuiDatePicker } from "@mui/x-date-pickers";
import { cn } from "@/app/utils/helpers";

interface DatePickerProps {
  value: Date | null;
  onChange: (date: Date | null) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  minDate?: Date;
  maxDate?: Date;
  format?: string;
}

function DatePicker({
  value,
  onChange,
  placeholder = "Select date",
  className,
  disabled = false,
  minDate,
  maxDate,
  format = "MM/dd/yyyy",
}: DatePickerProps) {
  return (
    <MuiDatePicker
      value={value}
      onChange={onChange}
      disabled={disabled}
      minDate={minDate}
      maxDate={maxDate}
      format={format}
    
      slotProps={{
        textField: {
          variant: "outlined",
          size: "small",
          fullWidth: true,
          placeholder: placeholder,
          className: cn(
            "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground",
            "rounded-[20px] px-6 py-3 text-sm transition-[color,box-shadow]",
            "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
            "focus-visible:ring-ring/20 focus-visible:ring-[3px]",
            "placeholder:text-gray",
            "!border-0 !rounded-[20px] !bg-white",
            className
          ),
          sx: {
            "& .MuiOutlinedInput-root": {
              borderRadius: "20px",
              fontSize: "0.875rem",
              "& fieldset": {
                borderColor: "#e5e7eb",
                borderRadius: "20px",
              },
              "&:hover fieldset": {
                borderColor: "#d1d5db",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#5a7bff",
              },
            },
            "& .MuiOutlinedInput-input": {
              padding: "10px 12px",
              fontSize: "0.875rem",
            },
          },
        },
      }}
    />
  );
}

export { DatePicker };
