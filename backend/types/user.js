import { z } from "zod";

export const signUpSchema = z.object({
   username: z.string().email(),
   firstname: z.string(),
   lastname: z.string(),
   password: z.string(),
});

export const signInSchema = z.object({
   username: z.string().email(),
   password: z.string(),
});

export const updateUserSchema = z.object({
   firstname: z.string().optional(),
   lastname: z.string().optional(),
   password: z.string().optional(),
});
