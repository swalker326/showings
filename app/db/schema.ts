import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const appointmentTable = sqliteTable("appointments", {
  id: integer("id").primaryKey(),
  start: integer("start", { mode: "timestamp" }).notNull(),
  end: integer("end", { mode: "timestamp" }).notNull(),
  notes: text("notes")
});

export type InsertAppointment = typeof appointmentTable.$inferInsert;
export type SelectAppointment = typeof appointmentTable.$inferSelect;
