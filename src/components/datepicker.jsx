import React, { useState, useEffect, useRef, useCallback } from "react";
import CalendarHeader from "./CalendarHeader";
import CalendarDays from "./CalendarDays";

const DatePicker = ({ Label, id, onChange }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const calendarRef = useRef(null);

  const updateMonthOrYear = useCallback((type, value) => {
    setCurrentMonth((prev) => {
      const year = type === "year" ? value : prev.getFullYear();
      const month = type === "month" ? value : prev.getMonth();
      return new Date(year, month, 1);
    });
  }, []);

  const handleDateClick = useCallback(
    (date) => {
      setSelectedDate(date);
      setShowCalendar(false);
      onChange?.(date);
    },
    [onChange]
  );

  const handlePrevMonth = () =>
    updateMonthOrYear("month", currentMonth.getMonth() - 1);
  const handleNextMonth = () =>
    updateMonthOrYear("month", currentMonth.getMonth() + 1);
  const handleMonthChange = (event) =>
    updateMonthOrYear("month", parseInt(event.target.value, 10));
  const handleYearChange = (event) =>
    updateMonthOrYear("year", parseInt(event.target.value, 10));

  const handleClickOutside = useCallback(
    (event) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setShowCalendar(false);
      }
    },
    []
  );

  useEffect(() => {
    if (showCalendar) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showCalendar, handleClickOutside]);

  return (
    <div className="calendar">
      <div className="calendarInputContainer">
        {Label && <label className="calendarLabel">{Label}</label>}
        <input
          id={id}
          className="calendarInput"
          type="text"
          value={selectedDate ? selectedDate.toLocaleDateString() : ""}
          onFocus={() => setShowCalendar(true)}
          readOnly
        />
      </div>

      {showCalendar && (
        <>
          <div
            className="modalOverlay"
            onClick={() => setShowCalendar(false)}
          ></div>
          <div className="calendarContainer" ref={calendarRef}>
            <CalendarHeader
              currentMonth={currentMonth}
              handlePrevMonth={handlePrevMonth}
              handleNextMonth={handleNextMonth}
              handleMonthChange={handleMonthChange}
              handleYearChange={handleYearChange}
            />
            <CalendarDays
              currentMonth={currentMonth}
              handleDateClick={handleDateClick}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default DatePicker;
