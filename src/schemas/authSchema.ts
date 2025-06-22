import { z } from "zod";

export const loginSchema = z.object({
  cpf: z.string().min(11, "CPF inválido"),
  password: z.string().min(8),
});

export const registerSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(8, "Senha deve ter pelo menos 8 caracteres"),
  confirmPassword: z.string().min(8, "Senha deve ter pelo menos 8 caracteres"),
  cpf: z.string().min(11, "CPF inválido"),
});

export type LoginSchemaType = z.infer<typeof loginSchema>;
export type RegisterSchemaType = z.infer<typeof registerSchema>;
