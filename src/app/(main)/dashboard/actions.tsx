"use server";

import { rateLimitByKey } from "@/lib/limiter";
import { authenticatedAction } from "@/lib/safe-action";
import { createGroupUseCase } from "@/use-cases/groups";
import { createNoteUseCase } from "@/use-cases/notes";
import { noteSchema, schema } from "./validation";
import { revalidatePath } from "next/cache";

export const createGroupAction = authenticatedAction
  .createServerAction()
  .input(schema)
  .handler(async ({ input: { name, description }, ctx: { user } }) => {
    await rateLimitByKey({
      key: `${user.id}-create-group`,
    });
    await createGroupUseCase(user, {
      name,
      description,
    });
    revalidatePath("/dashboard");
  });

export const createNoteAction = authenticatedAction
  .createServerAction()
  .input(noteSchema)
  .handler(async ({ input: { title, body }, ctx: { user } }) => {
    await rateLimitByKey({
      key: `${user.id}-create-note`,
    });
    revalidatePath("/dashboard/notes");
    return await createNoteUseCase(user, {
      title,
      body,
    });
  });
