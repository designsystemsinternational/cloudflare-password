import { z } from "zod";

export const envSchema = z.object({
  SECRET: z.string().min(6),
  PASSWORD: z.string().min(1),
});

export type EnvSchema = z.infer<typeof envSchema>;
