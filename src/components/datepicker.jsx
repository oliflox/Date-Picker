import React, { useState, useEffect, useRef } from "react";
import CalendarHeader from "./CalendarHeader";
import CalendarDays from "./CalendarDays";

const DatePicker = ({ Label, id, onChange }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const calendarRef = useRef(null);

  const handleDateClick = (date) => {
    setSelectedDate(date);
    setShowCalendar(false);
    if (onChange) {
      onChange(date);
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

  const handleMonthChange = (event) => {
    const selectedMonth = parseInt(event.target.value, 10);
    setCurrentMonth(new Date(currentMonth.getFullYear(), selectedMonth, 1));
  };

  const handleYearChange = (event) => {
    const selectedYear = parseInt(event.target.value, 10);
    setCurrentMonth(new Date(selectedYear, currentMonth.getMonth(), 1));
  };

  const handleClickOutside = (event) => {
    if (calendarRef.current && !calendarRef.current.contains(event.target)) {
      setShowCalendar(false);
    }
  };

  useEffect(() => {
    if (showCalendar) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showCalendar]);

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
