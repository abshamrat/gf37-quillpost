import { getNotesByUser, insertNote } from "@/data-access/notes";
import { UserSession } from "./types";

export async function createNoteUseCase(
  authenticatedUser: UserSession,
  {
    title,
    body,
  }: {
    title: string;
    body: string;
  }
) {
  return await insertNote({
    userId: authenticatedUser.id,
    title,
    body,
    createdOn: new Date(),
  });
}

export async function getNotesForUserUseCase(authenticatedUser: UserSession) {
  return await getNotesByUser(authenticatedUser.id);
}
