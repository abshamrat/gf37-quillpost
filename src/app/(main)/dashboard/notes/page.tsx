import { PageHeader } from "@/components/page-header";
import { assertAuthenticated } from "@/lib/session";
import { cn } from "@/lib/utils";
import { cardStyles, pageTitleStyles } from "@/styles/common";
import { getNotesForUserUseCase } from "@/use-cases/notes";
import { CreateNoteForm } from "./create-note-form";

export default async function NotesPage() {
  const user = await assertAuthenticated();
  const notes = await getNotesForUserUseCase(user);

  return (
    <>
      <PageHeader>
        <h1 className={pageTitleStyles}>Notes</h1>
      </PageHeader>

      <div className="container mx-auto min-h-screen py-12 max-w-2xl">
        <div
          className={cn(
            cardStyles,
            "flex flex-col gap-8 justify-center items-center py-12 bg-neutral-100/50 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800"
          )}
        >
          <CreateNoteForm initialNotes={notes} />
        </div>
      </div>
    </>
  );
}
