// depositMoney
import { z } from "zod";

export const depositMoneySchema = z.object({
   balance: z.number().positive("Amount must be in positive number"),
});

export const transferSchema = z.object({
   amount: z.number().positive(),
   to: z.string(),
});
