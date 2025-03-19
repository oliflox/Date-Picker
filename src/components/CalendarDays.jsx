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
  );
};

export default CalendarDays;
