export interface Appointment {
  id: string;
  start: Date;
  end: Date;
  notes?: string;
}

export type CalendarView = "month" | "week" | "day";

export interface TimeRange {
  startTime: string;
  endTime: string;
}
