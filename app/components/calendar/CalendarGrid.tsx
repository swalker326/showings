import React from "react";
import {
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameDay,
  parseISO
} from "date-fns";
import { CalendarDay } from "./CalendarDay";
import type { SelectAppointment } from "~/db/schema";

interface CalendarGridProps {
  currentDate: Date;
  appointments: SelectAppointment[];
  onSelectAppointment: (appointment: SelectAppointment) => void;
}

export function CalendarGrid({
  currentDate,
  appointments,
  onSelectAppointment
}: CalendarGridProps) {
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

  return (
    <div className="grid grid-cols-7 gap-1">
      {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
        <div key={day} className="text-center text-gray-500 font-medium py-2">
          {day}
        </div>
      ))}
      {days.map((day) => {
        const dayAppointments = appointments.filter((apt) =>
          isSameDay(apt.start, day)
        );

        return (
          <CalendarDay
            key={day.toString()}
            day={day}
            appointments={dayAppointments}
          />
        );
      })}
    </div>
  );
}
