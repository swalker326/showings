import { Calendar } from "~/components/Calendar";
import { db } from "~/db";
import { Outlet, useLoaderData } from "react-router";
import { useCalendarNavigation } from "~/hooks/useCalendarNavigation";
import { useDateContext } from "~/hooks/DateContext";
import { useState } from "react";
import type { SelectAppointment } from "~/db/schema";
import { AppointmentModal } from "~/components/AppointmentModal";

export async function loader() {
  const appointments = await db.query.appointmentTable.findMany({
    where: (apt, { gte }) => {
      // first unix timestamp of the current month
      const currentMonth = new Date();
      currentMonth.setDate(1);
      currentMonth.setHours(0, 0, 0, 0);
      return gte(apt.start, currentMonth);
    }
  });
  return { appointments };
}

export default function Home() {
  const { appointments } = useLoaderData<typeof loader>();
  const { isOpen, open, close } = useDateContext();
  const { currentDate, setCurrentDate } = useCalendarNavigation();
  const [selectedAppointment, setSelectedAppointment] = useState<
    SelectAppointment | undefined
  >();

  const handleSaveAppointment = (appointment: SelectAppointment) => {
    // if (selectedAppointment) {
    //   updateAppointment(appointment);
    // } else {
    //   addAppointment(appointment);
    // }
  };
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">
            House Showings Calendar
          </h1>
        </div>

        <Calendar
          currentDate={currentDate}
          appointments={appointments ?? []}
          onDateChange={setCurrentDate}
          onAddAppointment={() => {
            setSelectedAppointment(undefined);
            open();
          }}
          onSelectAppointment={(appointment) => {
            setSelectedAppointment(appointment);
            open();
          }}
        />

        <AppointmentModal onSave={handleSaveAppointment} />
        <Outlet />
      </div>
    </div>
  );
}
