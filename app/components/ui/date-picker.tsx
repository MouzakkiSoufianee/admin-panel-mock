import * as React from "react";
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isToday,
  isSameDay,
  isWithinInterval,
} from "date-fns";
import { ChevronLeft, ChevronRight, Calendar } from "lucide-react";
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
  format: dateFormat = "MMM dd, yyyy",
}: DatePickerProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [currentMonth, setCurrentMonth] = React.useState(
    value ? new Date(value) : new Date()
  );
  const containerRef = React.useRef<HTMLDivElement>(null);

  // Get all days in the month
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

  // Get starting day of week (0-6)
  const startingDayOfWeek = monthStart.getDay();

  // Create grid with empty cells for days from previous month
  const calendarDays = [
    ...Array(startingDayOfWeek).fill(null),
    ...daysInMonth,
  ];

  const isDateDisabled = (date: Date) => {
    if (minDate && date < minDate) return true;
    if (maxDate && date > maxDate) return true;
    return false;
  };

  const handlePrevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const handleDateClick = (date: Date) => {
    if (!isDateDisabled(date)) {
      onChange(date);
      setIsOpen(false);
    }
  };

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className="relative w-full">
      {/* Input Field */}
      <button
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={cn(
          "flex items-center w-full justify-between rounded-[20px] border border-gray-200 bg-white px-6 py-3 text-sm transition-all",
          "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2",
          
          className
        )}
      >
        <span
          className={cn(
            "text-sm",
            value ? "text-gray-900 font-medium" : "text-gray-500"
          )}
        >
          {value ? format(value, dateFormat) : placeholder}
        </span>
        <Calendar className="h-5 w-5 text-gray-500" />
      </button>

      {/* Calendar Dropdown */}
      {isOpen && !disabled && (
        <div className="absolute top-full right-0 z-50 mt-2 w-80 rounded-lg border border-gray-200 bg-white shadow-lg">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-gray-200 px-4 py-3">
            <button
              onClick={handlePrevMonth}
              className="rounded-md p-1.5  transition-colors"
              type="button"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <h2 className="text-sm font-semibold text-gray-900">
              {format(currentMonth, "MMMM yyyy")}
            </h2>
            <button
              onClick={handleNextMonth}
              className="rounded-md p-1.5 hover:bg-gray-100 transition-colors"
              type="button"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          {/* Weekday Labels */}
          <div className="grid grid-cols-7 gap-1 border-b border-gray-200 px-4 py-2">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div
                key={day}
                className="text-center text-xs font-medium text-gray-600 py-1"
              >
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1 p-4">
            {calendarDays.map((day, index) => {
              const isCurrentMonth = day && isSameMonth(day, currentMonth);
              const isSelected = day && value && isSameDay(day, value);
              const isCurrentDay = day && isToday(day);
              const isDayDisabled = day && isDateDisabled(day);

              return (
                <button
                  key={index}
                  onClick={() => day && handleDateClick(day)}
                  disabled={!day || !isCurrentMonth || isDayDisabled}
                  className={cn(
                    "h-8 w-8 rounded-md text-xs font-medium transition-all",
                    "disabled:text-gray-300 disabled:cursor-not-allowed",
                    // Non-current month days
                    !day || !isCurrentMonth ? "text-gray-300" : "text-gray-900",
                    // Selected day
                    isSelected &&
                      "bg-blue-500 text-white hover:bg-blue-600 shadow-sm",
                    // Today
                    isCurrentDay &&
                      !isSelected &&
                      "border-2 border-blue-500 text-blue-600",
                    // Hover state
                    day &&
                      isCurrentMonth &&
                      !isDayDisabled &&
                      !isSelected &&
                      "hover:bg-gray-100",
                    // Disabled state
                    isDayDisabled && "line-through opacity-50"
                  )}
                >
                  {day ? day.getDate() : ""}
                </button>
              );
            })}
          </div>

          {/* Footer with Today Button */}
          <div className="border-t border-gray-200 px-4 py-3 flex justify-between">
            <button
              onClick={() => setIsOpen(false)}
              className="px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
              type="button"
            >
              Close
            </button>
            <button
              onClick={() => {
                const today = new Date();
                if (!isDateDisabled(today)) {
                  handleDateClick(today);
                }
              }}
              disabled={isDateDisabled(new Date())}
              className="px-3 py-1.5 text-xs font-medium text-blue-600 hover:bg-blue-50 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              type="button"
            >
              Today
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export { DatePicker };
