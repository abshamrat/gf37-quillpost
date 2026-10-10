import { z } from "zod";

export const schema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
});

export const noteSchema = z.object({
  title: z.string().min(1),
  body: z.string().min(1),
});
