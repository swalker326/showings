import { parseWithZod } from "@conform-to/zod";
import type { ActionFunctionArgs } from "react-router";
import { db } from "~/db";
import { appointmentTable } from "~/db/schema";
import { z } from "zod";
import { eq } from "drizzle-orm";

export const CreateAppointmentSchema = z.object({
  start: z.string(),
  end: z.string(),
  date: z.string(),
  notes: z.string().optional()
});

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const method = request.method;
  switch (method) {
    case "POST": {
      const submission = parseWithZod(formData, {
        schema: CreateAppointmentSchema
      });
      if (submission.status !== "success") {
        return submission.reply();
      }
      const start = new Date(
        `${submission.value.date}T${submission.value.start}`
      );
      const end = new Date(`${submission.value.date}T${submission.value.end}`);
      await db
        .insert(appointmentTable)
        .values({ ...submission.value, start, end })
        .returning({
          id: appointmentTable.id
        });

      return submission.reply({ resetForm: true });
    }
    case "DELETE": {
      const id = formData.get("id") as string;
      if (!id) {
        throw new Response("Missing ID", { status: 400 });
      }
      await db
        .delete(appointmentTable)
        .where(eq(appointmentTable.id, Number.parseInt(id)));
      return new Response("Deleted", { status: 200 });
    }
    case "default": {
      return new Response("Method not allowed", { status: 405 });
    }
  }
}
