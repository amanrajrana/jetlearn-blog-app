import { z } from "zod";

export const postSchema = z.object({
  title: z.string().min(3).max(100),
  content: z.string().min(10),
});

export type postSchemaType = z.infer<typeof postSchema>;
