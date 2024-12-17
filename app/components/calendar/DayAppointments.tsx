import type { SelectAppointment } from "../../db/schema";
import ShowingTrigger from "~/components/calendar/ShowingDialog";

interface DayAppointmentsProps {
  appointments: SelectAppointment[];
}

export function DayAppointments({ appointments }: DayAppointmentsProps) {
  return (
    <div className="mt-2">
      {appointments
        .sort((a, b) => (a.start.getTime() >= b.start.getTime() ? 1 : -1))
        .map((apt) => {
          return <ShowingTrigger key={apt.id} appointment={apt} />;
        })}
    </div>
  );
}
