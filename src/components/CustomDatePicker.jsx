import React, { useState, useEffect } from 'react';
import { Calendar, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, addMonths, subMonths, isSameMonth, isSameDay, isToday, parseISO } from 'date-fns';

const CustomDatePicker = ({ 
  selectedDate, 
  onDateSelect, 
  unavailableDates, 
  minDate, 
  placeholder, 
  className = '' 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(selectedDate ? new Date(selectedDate) : new Date());

  useEffect(() => {
    if (selectedDate) {
      setCurrentMonth(new Date(selectedDate));
    }
  }, [selectedDate]);

  const getDaysInMonth = () => {
    const start = startOfWeek(startOfMonth(currentMonth));
    const end = endOfWeek(endOfMonth(currentMonth));
    const days = [];
    let day = start;

    while (day <= end) {
      days.push(day);
      day = addDays(day, 1);
    }
    return days;
  };

  const isDateUnavailable = (date) => {
    const dateStr = format(date, 'yyyy-MM-dd');
    return unavailableDates?.includes(dateStr) || 
           (minDate && date < new Date(minDate));
  };

  const handleDateClick = (date) => {
    if (isDateUnavailable(date)) return;
    
    const dateStr = format(date, 'yyyy-MM-dd');
    onDateSelect(dateStr);
    setIsOpen(false);
  };

  const handlePrevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const days = getDaysInMonth();

  return (
    <div className={`relative ${className}`}>
      <div 
        className="w-full px-4 py-3 border rounded-lg cursor-pointer flex items-center justify-between bg-white"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={selectedDate ? 'text-gray-900' : 'text-gray-500'}>
          {selectedDate ? format(new Date(selectedDate), 'MMM dd, yyyy') : placeholder}
        </span>
        <Calendar className="w-5 h-5 text-gray-400" />
      </div>

      {isOpen && (
        <div className="absolute z-50 mt-1 w-full bg-white rounded-lg shadow-lg border border-gray-200">
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <button
                type="button"
                onClick={handlePrevMonth}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <h3 className="font-semibold text-gray-900">
                {format(currentMonth, 'MMMM yyyy')}
              </h3>
              <button
                type="button"
                onClick={handleNextMonth}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-7 gap-1 mb-2">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="text-center text-xs font-semibold text-gray-600 py-2">
                  {day}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-1">
              {days.map((day, idx) => {
                const isCurrentMonth = isSameMonth(day, currentMonth);
                const isSelected = selectedDate && isSameDay(day, new Date(selectedDate));
                const isUnavailable = isDateUnavailable(day);
                const isTodayDate = isToday(day);

                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleDateClick(day)}
                    disabled={isUnavailable}
                    className={`
                      p-2 text-sm rounded-lg transition-colors
                      ${!isCurrentMonth ? 'text-gray-400' : 'text-gray-900'}
                      ${isSelected ? 'bg-coral text-white font-semibold' : ''}
                      ${isUnavailable ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : ''}
                      ${!isSelected && !isUnavailable && isCurrentMonth ? 'hover:bg-gray-100' : ''}
                      ${isTodayDate && !isSelected ? 'bg-blue-50 text-blue-600 font-semibold' : ''}
                    `}
                  >
                    {format(day, 'd')}
                  </button>
                );
              })}
            </div>

            {unavailableDates?.length > 0 && (
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <div className="w-3 h-3 bg-gray-100 rounded"></div>
                  <span>Unavailable dates</span>
                </div>
              </div>
            )}

            <div className="mt-4 flex justify-end">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomDatePicker;
