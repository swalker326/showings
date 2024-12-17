import { flushSync } from "react-dom";
import { format, isSameMonth, isToday } from "date-fns";
import { DayAppointments } from "./DayAppointments";
import type { SelectAppointment } from "../../db/schema";
import { Button } from "../ui/button";
import { useDateContext } from "~/hooks/DateContext";

interface CalendarDayProps {
  day: Date;
  appointments: SelectAppointment[];
}

export function CalendarDay({ day, appointments }: CalendarDayProps) {
  const { setSelectedDate, open, selectedDate } = useDateContext();
  return (
    <div
      className={`
        min-h-[100px] p-2 border border-gray-200
        ${!isSameMonth(day, new Date()) ? "bg-gray-50" : "bg-white"}
        ${isToday(day) ? "border-blue-500" : ""}
      `}
    >
      <div className="text-right">
        <Button
          variant="ghost"
          onClick={() => {
            flushSync(() => setSelectedDate(day));
            open();
          }}
          className={`
          text-sm ${
            isToday(day) ? "bg-gray-900 text-white rounded-full px-2 py-1" : ""
          }
          ${!isSameMonth(day, new Date()) ? "text-gray-400" : ""}
        `}
        >
          {format(day, "d")}
        </Button>
      </div>
      <DayAppointments appointments={appointments} />
    </div>
  );
}
