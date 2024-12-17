import { X } from "lucide-react";
import type { SelectAppointment } from "~/db/schema";
import { parseWithZod, getZodConstraint } from "@conform-to/zod";
import { CreateAppointmentSchema, type action } from "~/routes/api.showing";
import { useForm, getFormProps, getInputProps } from "@conform-to/react";
import { useActionData, useFetcher } from "react-router";
import { useDateContext } from "~/hooks/DateContext";
import { endOfDay, format } from "date-fns";

interface AppointmentModalProps {
  onSave: (appointment: SelectAppointment) => void;
  appointment?: SelectAppointment;
}

export function AppointmentModal({
  onSave,
  appointment
}: AppointmentModalProps) {
  const { isOpen, close, selectedDate } = useDateContext();
  const lastResult = useActionData<typeof action>();
  const fetcher = useFetcher();
  const [form, fields] = useForm({
    constraint: getZodConstraint(CreateAppointmentSchema),
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: CreateAppointmentSchema });
    },
    defaultValue: {
      // date: currentDate.toISOString().split("T")[0]
      date: format(selectedDate, "yyyy-MM-dd")
    }
  });

  if (!isOpen) {
    return null;
  }
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">
            {appointment ? "Edit Showing" : "New Showing"}
          </h2>
          <button
            type="button"
            onClick={close}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <fetcher.Form
          method="post"
          {...getFormProps(form)}
          action="/api/showing"
        >
          <div>
            <label htmlFor={fields.start.id}>Start</label>
            <input {...getInputProps(fields.start, { type: "time" })} />
            <div id={fields.start.errorId}>{fields.start.errors}</div>
          </div>
          <div>
            <label htmlFor={fields.end.id}>End</label>
            <input {...getInputProps(fields.end, { type: "time" })} />
            <div id={fields.end.errorId}>{fields.end.errors}</div>
          </div>
          <input {...getInputProps(fields.date, { type: "date" })} />

          <button
            className="flex items-center gap-2 bg-blue-600  px-4 py-2 text-white rounded-lg hover:bg-blue-700 float-right"
            type="submit"
          >
            Add
          </button>
        </fetcher.Form>
      </div>
    </div>
  );
}
