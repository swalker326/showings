import { Button } from "~/components/ui/button";
import type { SelectAppointment } from "~/db/schema";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "~/components/ui/dialog";
import { format } from "date-fns";
import { useFetcher } from "react-router";

export default function ShowingTrigger({
  appointment
}: {
  appointment: SelectAppointment;
}) {
  const fetcher = useFetcher();
  return (
    <Dialog modal>
      <DialogTrigger asChild>
        <Button className="w-full" variant="outline">
          {format(appointment.start, "h:mm a")} -{" "}
          {format(appointment.end, "h:mm a")}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            Showing {format(appointment.start, "EEE, MMM do ")}
          </DialogTitle>
          <DialogDescription>
            <strong>{format(appointment.start, "h:mm a")}</strong> -{" "}
            <strong>{format(appointment.end, "h:mm a")}</strong>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => console.log("Edit")}>
            Edit
          </Button>
          <fetcher.Form method="delete" action="/api/showing/">
            <Button
              type="submit"
              variant="outline"
              // onClick={deleteShowing(appointment.id)}
            >
              Delete
            </Button>
            <input type="hidden" name="id" value={appointment.id} />
          </fetcher.Form>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
