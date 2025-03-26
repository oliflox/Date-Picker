import React from "react";

const CalendarDays = ({ currentMonth, handleDateClick }) => {
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

  const daysArray = [];

  for (let i = 0; i < startDay; i++) {
    daysArray.push(<div key={`empty-${i}`} className="calendarDay empty"></div>);
  }

  for (let i = 1; i <= daysInMonth; i++) {
    const date = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      i
    );
    daysArray.push(
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
    <div className="calendarDays">
      <div className="calendarWeekdays">
        {["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"].map((day, index) => (
          <div key={index}>{day}</div>
        ))}
      </div>
      <div className="calendarGrid">{daysArray}</div>
    </div>
  );
};

export default CalendarDays;
