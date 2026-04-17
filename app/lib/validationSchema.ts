import { z } from "zod";

export const userSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.string().min(1, "Please select a role"),
   skills: z
    .array(z.object({ value: z.string().min(1, "Skill cannot be empty") }))
    .min(1, "Add at least one skill"),
});

export type UserFormValues = z.infer<typeof userSchema>;
/*
 skills: z
    .array(z.string().min(1, "Skill cannot be empty"))
    .min(1, "Add at least one skill"),
*/