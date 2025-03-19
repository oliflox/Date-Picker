import React from "react";

const CalendarHeader = ({
  currentMonth,
  handlePrevMonth,
  handleNextMonth,
  handleMonthChange,
  handleYearChange,
}) => {
  return (
    <div className="calendarHeader">
      <button className="calendarButton prev-button" onClick={handlePrevMonth}>
        {"<"}
      </button>
      <select
        className="monthDropdown"
        value={currentMonth.getMonth()}
        onChange={handleMonthChange}
      >
        {Array.from({ length: 12 }, (_, index) => (
          <option key={index} value={index}>
            {new Date(0, index).toLocaleString("default", { month: "long" })}
          </option>
        ))}
      </select>
      <select
        className="yearDropdown"
        value={currentMonth.getFullYear()}
        onChange={handleYearChange}
      >
        {Array.from({ length: 150 }, (_, index) => {
          const year = 1900 + index;
          return (
            <option key={year} value={year}>
              {year}
            </option>
          );
        })}
      </select>
      <button className="calendarButton next-button" onClick={handleNextMonth}>
        {">"}
      </button>
    </div>
  );
};

export default CalendarHeader;
