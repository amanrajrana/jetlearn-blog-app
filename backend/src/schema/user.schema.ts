import { z } from "zod";

export const userSchema = z.object({
  username: z.string().min(3).max(35),
  password: z.string().min(6),
});

export type userSchemaType = z.infer<typeof userSchema>;
