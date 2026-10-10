"use client";

import { createNoteAction } from "@/app/(main)/dashboard/actions";
import { LoaderButton } from "@/components/loader-button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Note } from "@/db/schema";
import { cn } from "@/lib/utils";
import { cardStyles } from "@/styles/common";
import { CheckIcon } from "lucide-react";
import { useState } from "react";
import { useServerAction } from "zsa-react";

export function CreateNoteForm({ initialNotes }: { initialNotes: Note[] }) {
  const { toast } = useToast();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [search, setSearch] = useState("");
  const [notes, setNotes] = useState(initialNotes);

  const { execute, isPending } = useServerAction(createNoteAction, {
    onError({ err }) {
      toast({
        title: "Something went wrong",
        description: err.message,
        variant: "destructive",
      });
    },
    onSuccess({ data }) {
      toast({
        title: "Note created",
        description: "Your note was saved",
      });
      setNotes((current) => [...data, ...current]);
      setTitle("");
      setBody("");
    },
  });

  const visibleNotes = search
    ? notes.filter((note) =>
        note.title.toLowerCase().includes(search.toLowerCase())
      )
    : notes;

  return (
    <div className="flex flex-col gap-8">
      <form
        onSubmit={(event) => {
          event.preventDefault();
          execute({ title, body });
        }}
        className={cn(cardStyles, "flex flex-col gap-4 p-6")}
      >
        <label className="flex flex-col gap-1">
          <span className="text-sm font-medium">Title</span>
          <Input value={title} onChange={(e) => setTitle(e.target.value)} />
        </label>

        <label className="flex flex-col gap-1">
          <span className="text-sm font-medium">Body</span>
          <Textarea
            rows={7}
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
        </label>

        <LoaderButton isLoading={isPending} disabled={!title || !body}>
          <CheckIcon className="h-4 w-4" /> Create Note
        </LoaderButton>
      </form>

      <Input
        placeholder="Search notes by title"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {visibleNotes.length === 0 ? (
        <div
          className={cn(
            cardStyles,
            "flex flex-col gap-8 justify-center items-center py-12 bg-neutral-100/50 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800"
          )}
        >
          <h2 className="text-2xl text-neutral-500 dark:text-neutral-400">
            No notes yet
          </h2>
        </div>
      ) : (
        <ul className="flex flex-col gap-4">
          {visibleNotes.map((note) => (
            <li key={note.id} className={cn(cardStyles, "p-6")}>
              <h3 className="text-lg font-semibold">{note.title}</h3>
              <p className="whitespace-pre-wrap text-neutral-600 dark:text-neutral-400">
                {note.body}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
