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

    const weeks = [];
    let days = [];

    for (let i = 0; i < startDay; i++) {
      days.push(<td key={`empty-${i}`}></td>);
    }

    for (let i = 1; i <= daysInMonth; i++) {
      if (days.length === 7) {
        weeks.push(<tr key={`week-${weeks.length}`}>{days}</tr>);
        days = [];
      }
      const date = new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth(),
        i
      );
      days.push(
        <td key={i} onClick={() => handleDateClick(date)}>
          {i}
        </td>
      );
    }

    if (days.length > 0) {
      weeks.push(<tr key={`week-${weeks.length}`}>{days}</tr>);
    }

    return (
      <table>
        <thead>
          <tr>
            <th className="calendarHeader" colSpan="7">
              <button
                className="calendarButton prev-button"
                onClick={handlePrevMonth}
              >
                {"<"}
              </button>
              {currentMonth.toLocaleString("default", { month: "long" })}{" "}
              {currentMonth.getFullYear()}
              <button
                className="calendarButton next-button"
                onClick={handleNextMonth}
              >
                {">"}
              </button>
            </th>
          </tr>
          <tr>
            <th>Dim</th>
            <th>Lun</th>
            <th>Mar</th>
            <th>Mer</th>
            <th>Jeu</th>
            <th>Ven</th>
            <th>Sam</th>
          </tr>
        </thead>
        <tbody>{weeks}</tbody>
      </table>
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
