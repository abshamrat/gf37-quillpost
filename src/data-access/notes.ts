import { database } from "@/db";
import { NewNote, notes } from "@/db/schema";
import { UserId } from "@/use-cases/types";
import { desc, eq } from "drizzle-orm";

export async function insertNote(note: NewNote) {
  return await database.insert(notes).values(note).returning();
}

export async function getNotesByUser(userId: UserId) {
  return await database.query.notes.findMany({
    where: eq(notes.userId, userId),
    orderBy: [desc(notes.createdOn)],
  });
}
