'use client';

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Clock } from 'lucide-react';

interface DateTimeRange {
  startDate: Date;
  endDate: Date;
}

interface DateCardProps {
  title?: string;
  onDateTimeChange?: (dateRange: DateTimeRange) => void;
  defaultStartDate?: Date;
  defaultEndDate?: Date;
  minDate?: Date;
  maxDate?: Date;
  showTime?: boolean;
  timeFormat?: '12' | '24';
  disabled?: boolean;
  className?: string;
}

export const DateCard: React.FC<DateCardProps> = ({
  title = 'Select Date Range',
  onDateTimeChange,
  defaultStartDate = new Date(),
  defaultEndDate = new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
  minDate,
  maxDate,
  showTime = true,
  timeFormat = '24',
  disabled = false,
  className = '',
}) => {
  const [startDate, setStartDate] = useState<Date>(defaultStartDate);
  const [endDate, setEndDate] = useState<Date>(defaultEndDate);
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date(defaultStartDate));
  const [selectedTab, setSelectedTab] = useState<'start' | 'end'>('start');

  const [startHour, setStartHour] = useState<string>(
    String(defaultStartDate.getHours()).padStart(2, '0')
  );
  const [startMinute, setStartMinute] = useState<string>(
    String(defaultStartDate.getMinutes()).padStart(2, '0')
  );
  const [startSecond, setStartSecond] = useState<string>(
    String(defaultStartDate.getSeconds()).padStart(2, '0')
  );

  const [endHour, setEndHour] = useState<string>(
    String(defaultEndDate.getHours()).padStart(2, '0')
  );
  const [endMinute, setEndMinute] = useState<string>(
    String(defaultEndDate.getMinutes()).padStart(2, '0')
  );
  const [endSecond, setEndSecond] = useState<string>(
    String(defaultEndDate.getSeconds()).padStart(2, '0')
  );

  const isDateDisabled = (date: Date): boolean => {
    if (minDate && date < minDate) return true;
    if (maxDate && date > maxDate) return true;
    return false;
  };

  const isDateInRange = (date: Date): boolean => {
    return date >= startDate && date <= endDate;
  };

  const handleDateSelect = (day: number) => {
    const newDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    if (isDateDisabled(newDate)) return;

    if (selectedTab === 'start') {
      setStartDate(newDate);
      updateDateTime('start', newDate, startHour, startMinute, startSecond);
    } else {
      setEndDate(newDate);
      updateDateTime('end', newDate, endHour, endMinute, endSecond);
    }
  };

  const handlePrevMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1)
    );
  };

  const handleNextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1)
    );
  };

  const updateDateTime = (
    type: 'start' | 'end',
    date: Date,
    h: string,
    m: string,
    s: string
  ) => {
    const updatedDate = new Date(date);
    updatedDate.setHours(
      timeFormat === '12' ? convertTo24Hour(h) : parseInt(h),
      parseInt(m),
      parseInt(s)
    );

    if (type === 'start') {
      const newStart = updatedDate;
      const newEnd = endDate;
      if (newStart <= newEnd) {
        setStartDate(newStart);
        onDateTimeChange?.({ startDate: newStart, endDate: newEnd });
      }
    } else {
      const newStart = startDate;
      const newEnd = updatedDate;
      if (newEnd >= newStart) {
        setEndDate(newEnd);
        onDateTimeChange?.({ startDate: newStart, endDate: newEnd });
      }
    }
  };

  const handleTimeChange = (
    type: 'start' | 'end',
    field: 'hour' | 'minute' | 'second',
    value: string
  ) => {
    if (type === 'start') {
      let newHour = startHour;
      let newMinute = startMinute;
      let newSecond = startSecond;

      if (field === 'hour') {
        newHour = value;
        setStartHour(value);
      } else if (field === 'minute') {
        newMinute = value;
        setStartMinute(value);
      } else {
        newSecond = value;
        setStartSecond(value);
      }

      updateDateTime('start', startDate, newHour, newMinute, newSecond);
    } else {
      let newHour = endHour;
      let newMinute = endMinute;
      let newSecond = endSecond;

      if (field === 'hour') {
        newHour = value;
        setEndHour(value);
      } else if (field === 'minute') {
        newMinute = value;
        setEndMinute(value);
      } else {
        newSecond = value;
        setEndSecond(value);
      }

      updateDateTime('end', endDate, newHour, newMinute, newSecond);
    }
  };

  const convertTo24Hour = (hour12: string): number => {
    const num = parseInt(hour12);
    return num === 12 ? 0 : num + 12;
  };

  const convertTo12Hour = (hour24: number): string => {
    return String(hour24 === 0 ? 12 : hour24 > 12 ? hour24 - 12 : hour24).padStart(2, '0');
  };

  const getDaysInMonth = (date: Date): number => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date): number => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const days = [];
  const firstDay = getFirstDayOfMonth(currentMonth);
  const daysInMonth = getDaysInMonth(currentMonth);

  // Empty cells for days before month starts
  for (let i = 0; i < firstDay; i++) {
    days.push(null);
  }

  // Days of the month
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  const monthName = currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' });
  
  const selectedDateDisplay = selectedTab === 'start' ? startDate : endDate;
  const displayHour = timeFormat === '12' 
    ? convertTo12Hour(parseInt(selectedTab === 'start' ? startHour : endHour)) 
    : selectedTab === 'start' ? startHour : endHour;
  const displayMin = selectedTab === 'start' ? startMinute : endMinute;
  const displaySec = selectedTab === 'start' ? startSecond : endSecond;
  const ampm = timeFormat === '12' 
    ? (parseInt(selectedTab === 'start' ? startHour : endHour) >= 12 ? 'PM' : 'AM') 
    : '';

  return (
    <div
      className={`w-full max-w-sm rounded-lg border border-gray-200 bg-white p-6 shadow-lg ${className}`}
    >
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
        <div className="mt-2 space-y-1 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <span className="font-medium">Start:</span>
            <span>
              {startDate.toLocaleDateString()} {showTime && `• ${startDate.toLocaleTimeString()}`}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-medium">End:</span>
            <span>
              {endDate.toLocaleDateString()} {showTime && `• ${endDate.toLocaleTimeString()}`}
            </span>
          </div>
        </div>
      </div>

      {/* Tab Selection */}
      <div className="mb-4 flex gap-2 rounded-lg bg-gray-100 p-1">
        <button
          onClick={() => setSelectedTab('start')}
          className={`flex-1 rounded py-2 px-3 text-sm font-medium transition-colors ${
            selectedTab === 'start'
              ? 'bg-white text-blue-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Start Date
        </button>
        <button
          onClick={() => setSelectedTab('end')}
          className={`flex-1 rounded py-2 px-3 text-sm font-medium transition-colors ${
            selectedTab === 'end'
              ? 'bg-white text-blue-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          End Date
        </button>
      </div>

      {/* Calendar */}
      <div className="space-y-4">
        {/* Month Navigation */}
        <div className="flex items-center justify-between">
          <button
            onClick={handlePrevMonth}
            disabled={disabled}
            className="rounded-lg p-2 hover:bg-gray-100 disabled:opacity-50"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <h3 className="font-semibold text-gray-900">{monthName}</h3>
          <button
            onClick={handleNextMonth}
            disabled={disabled}
            className="rounded-lg p-2 hover:bg-gray-100 disabled:opacity-50"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        {/* Day Headers */}
        <div className="grid grid-cols-7 gap-2 text-center text-xs font-medium text-gray-600">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <div key={day} className="py-1">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Days */}
        <div className="grid grid-cols-7 gap-2">
          {days.map((day, index) => {
            const dayDate = day ? new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day) : null;
            const isSelected =
              day === null
                ? false
                : selectedTab === 'start'
                  ? day === startDate.getDate() &&
                    startDate.getMonth() === currentMonth.getMonth() &&
                    startDate.getFullYear() === currentMonth.getFullYear()
                  : day === endDate.getDate() &&
                    endDate.getMonth() === currentMonth.getMonth() &&
                    endDate.getFullYear() === currentMonth.getFullYear();

            return (
              <button
                key={index}
                onClick={() => day && handleDateSelect(day)}
                disabled={disabled || (dayDate ? isDateDisabled(dayDate) : true)}
                className={`aspect-square rounded-lg text-sm font-medium transition-colors ${
                  day === null
                    ? 'invisible'
                    : isSelected
                      ? 'bg-blue-500 text-white hover:bg-blue-600'
                      : dayDate && isDateInRange(dayDate)
                        ? 'bg-blue-100 text-gray-900'
                        : isDateDisabled(dayDate!)
                          ? 'text-gray-300 cursor-not-allowed'
                          : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {day}
              </button>
            );
          })}
        </div>
      </div>

      {/* Time Selection */}
      {showTime && (
        <div className="mt-6 space-y-4 border-t border-gray-200 pt-4">
          <h3 className="text-sm font-semibold text-gray-900">
            {selectedTab === 'start' ? 'Start Time' : 'End Time'}
          </h3>
          <div className="flex gap-2">
            {/* Hour */}
            <div className="flex flex-col items-center">
              <label className="text-xs font-medium text-gray-600 mb-1">Hour</label>
              <input
                type="number"
                min={timeFormat === '12' ? '01' : '00'}
                max={timeFormat === '12' ? '12' : '23'}
                value={displayHour}
                onChange={(e) => {
                  const val = e.target.value.padStart(2, '0');
                  const newHour = timeFormat === '12'
                    ? String(convertTo24Hour(val))
                    : val;
                  handleTimeChange(selectedTab, 'hour', newHour);
                }}
                disabled={disabled}
                className="w-16 rounded-lg border border-gray-300 px-2 py-2 text-center text-sm focus:border-blue-500 focus:outline-none"
              />
            </div>

            {/* Separator */}
            <div className="flex items-end pb-2 text-gray-400">:</div>

            {/* Minute */}
            <div className="flex flex-col items-center">
              <label className="text-xs font-medium text-gray-600 mb-1">Minute</label>
              <input
                type="number"
                min="0"
                max="59"
                value={displayMin}
                onChange={(e) => {
                  const val = e.target.value.padStart(2, '0');
                  handleTimeChange(selectedTab, 'minute', val);
                }}
                disabled={disabled}
                className="w-16 rounded-lg border border-gray-300 px-2 py-2 text-center text-sm focus:border-blue-500 focus:outline-none"
              />
            </div>

            {/* Separator */}
            <div className="flex items-end pb-2 text-gray-400">:</div>

            {/* Second */}
            <div className="flex flex-col items-center">
              <label className="text-xs font-medium text-gray-600 mb-1">Second</label>
              <input
                type="number"
                min="0"
                max="59"
                value={displaySec}
                onChange={(e) => {
                  const val = e.target.value.padStart(2, '0');
                  handleTimeChange(selectedTab, 'second', val);
                }}
                disabled={disabled}
                className="w-16 rounded-lg border border-gray-300 px-2 py-2 text-center text-sm focus:border-blue-500 focus:outline-none"
              />
            </div>

            {/* AM/PM for 12-hour format */}
            {timeFormat === '12' && (
              <div className="flex flex-col items-center ml-1">
                <label className="text-xs font-medium text-gray-600 mb-1">Period</label>
                <select
                  value={parseInt(selectedTab === 'start' ? startHour : endHour) >= 12 ? 'PM' : 'AM'}
                  onChange={(e) => {
                    const isPM = e.target.value === 'PM';
                    const currentHour = parseInt(selectedTab === 'start' ? startHour : endHour);
                    let newHour = currentHour;

                    if (isPM && currentHour < 12) {
                      newHour = currentHour + 12;
                    } else if (!isPM && currentHour >= 12) {
                      newHour = currentHour - 12;
                    }

                    handleTimeChange(selectedTab, 'hour', String(newHour).padStart(2, '0'));
                  }}
                  disabled={disabled}
                  className="w-16 rounded-lg border border-gray-300 px-2 py-2 text-center text-sm focus:border-blue-500 focus:outline-none"
                >
                  <option>AM</option>
                  <option>PM</option>
                </select>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Reset Button */}
      <button
        onClick={() => {
          setStartDate(defaultStartDate);
          setEndDate(defaultEndDate);
          setCurrentMonth(new Date(defaultStartDate));
          setStartHour(String(defaultStartDate.getHours()).padStart(2, '0'));
          setStartMinute(String(defaultStartDate.getMinutes()).padStart(2, '0'));
          setStartSecond(String(defaultStartDate.getSeconds()).padStart(2, '0'));
          setEndHour(String(defaultEndDate.getHours()).padStart(2, '0'));
          setEndMinute(String(defaultEndDate.getMinutes()).padStart(2, '0'));
          setEndSecond(String(defaultEndDate.getSeconds()).padStart(2, '0'));
          onDateTimeChange?.({ startDate: defaultStartDate, endDate: defaultEndDate });
        }}
        disabled={disabled}
        className="mt-6 w-full rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-200 disabled:opacity-50"
      >
        Reset to Default
      </button>
    </div>
  );
};
