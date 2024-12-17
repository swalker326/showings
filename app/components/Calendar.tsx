import {
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameDay,
  parseISO
} from "date-fns";
import { CalendarHeader } from "./calendar/CalendarHeader";
import { CalendarDay } from "./calendar/CalendarDay";
import type { SelectAppointment } from "../db/schema";

interface CalendarProps {
  currentDate: Date;
  appointments: SelectAppointment[];
  onDateChange: (date: Date) => void;
  onAddAppointment: () => void;
  onSelectAppointment: (appointment: SelectAppointment) => void;
}

export function Calendar({
  currentDate,
  appointments,
  onDateChange,
  onAddAppointment,
  onSelectAppointment
}: CalendarProps) {
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

  return (
    <div className="bg-white text-black rounded-lg shadow p-6">
      <CalendarHeader
        currentDate={currentDate}
        onDateChange={onDateChange}
        onAddAppointment={onAddAppointment}
      />

      <div className="grid grid-cols-7 gap-1">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="text-center text-gray-500 font-medium py-2">
            {day}
          </div>
        ))}
        {days.map((day) => {
          const dayAppointments = appointments.filter((apt) => {
            const isSame = isSameDay(apt.start, day);
            return isSame;
          });

          return (
            <CalendarDay
              key={day.toString()}
              day={day}
              appointments={dayAppointments}
            />
          );
        })}
      </div>
    </div>
  );
}
