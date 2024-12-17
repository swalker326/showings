import React from "react";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { format } from "date-fns";
import { Button } from "../ui/button";
import { useDateContext } from "~/hooks/DateContext";

interface CalendarHeaderProps {
  currentDate: Date;
  onDateChange: (date: Date) => void;
  onAddAppointment: () => void;
}

export function CalendarHeader({
  currentDate,
  onDateChange,
  onAddAppointment
}: CalendarHeaderProps) {
  const { open } = useDateContext();
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-4">
        <Button
          onClick={() =>
            onDateChange(
              new Date(currentDate.setMonth(currentDate.getMonth() - 1))
            )
          }
          className="p-2 hover:bg-gray-100 rounded-full"
        >
          <ChevronLeft className="w-5 h-5" />
        </Button>
        <h2 className="text-xl font-semibold">
          {format(currentDate, "MMMM yyyy")}
        </h2>
        <Button
          onClick={() =>
            onDateChange(
              new Date(currentDate.setMonth(currentDate.getMonth() + 1))
            )
          }
          className="p-2 hover:bg-gray-100 rounded-full"
        >
          <ChevronRight className="w-5 h-5" />
        </Button>
      </div>
      <Button
        onClick={open}
        
      >
        <Plus className="w-4 h-4" />
        Add Showing
      </Button>
    </div>
  );
}
