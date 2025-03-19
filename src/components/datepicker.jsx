import React, { useState, useEffect, useRef } from "react";

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

  const renderCalendar = () => {
    const startOfMonth = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      1
    );
    const endOfMonth = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth() + 1,
      0
    );
    const startDay = startOfMonth.getDay();
    const daysInMonth = endOfMonth.getDate();

    const days = [];

    for (let i = 0; i < startDay; i++) {
      days.push(<div key={`empty-${i}`} className="calendarDay empty"></div>);
    }

    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth(),
        i
      );
      days.push(
        <button
          key={i}
          className="calendarDay"
          onClick={() => handleDateClick(date)}
        >
          {i}
        </button>
      );
    }

    return (
      <div className="calendarWrapper">
        <div className="calendarHeader">
          <button
            className="calendarButton prev-button"
            onClick={handlePrevMonth}
          >
            {"<"}
          </button>
          <span>
            {currentMonth.toLocaleString("default", { month: "long" })}{" "}
            {currentMonth.getFullYear()}
          </span>
          <button
            className="calendarButton next-button"
            onClick={handleNextMonth}
          >
            {">"}
          </button>
        </div>
        <div className="calendarDays">
          <div className="calendarWeekdays">
            <div>Dim</div>
            <div>Lun</div>
            <div>Mar</div>
            <div>Mer</div>
            <div>Jeu</div>
            <div>Ven</div>
            <div>Sam</div>
          </div>
          <div className="calendarGrid">{days}</div>
        </div>
      </div>
    );
  };

  return (
    <div className="calendar">
      <div className="calendarInputContainer">
        {Label && (
          <label className="calendarLabel" >
            {Label}
          </label>
        )}
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
            {renderCalendar()}
          </div>
        </>
      )}
    </div>
  );
};

export default DatePicker;
