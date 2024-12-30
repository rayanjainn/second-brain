import { z } from "zod";

export const UserSchema = z.object({
  username: z.string().min(3).max(10),
  password: z
    .string()
    .min(8)
    .max(20)
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/
    ),
});
export type UserType = z.infer<typeof UserSchema>;

export const ContentSchema = z.object({
  type: z.string(),
  title: z.string(),
  link: z.string().optional(),
  tags: z.array(z.string()).optional(),
});
export type ContentType = z.infer<typeof ContentSchema>;
