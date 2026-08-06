// Importa a biblioteca Zod.
import { z } from "zod";

// Cria as regras de validação do usuário.
export const usuarioSchema = z.object({

    // Valida o nome completo.
    nomeCompleto: z
        .string()
        .min(3, "O nome completo deve ter pelo menos 3 caracteres")
        .max(150, "O nome completo deve ter no máximo 150 caracteres"),

    // Valida o CPF.
    cpf: z
        .string()
        .regex(/^\d{11}$/, "CPF deve conter exatamente 11 dígitos"),

    // Valida o telefone.
    telefone: z
        .string()
        .regex(/^\d{10,15}$/, "Telefone deve conter entre 10 e 15 dígitos"),

    // Valida o e-mail.
    email: z
        .email("E-mail inválido")
        .max(150, "O e-mail deve ter no máximo 150 caracteres"),

    // Valida a senha.
    senha: z
        .string()
        .min(8, "A senha deve conter pelo menos 8 caracteres")
        .max(255, "A senha deve ter no máximo 255 caracteres"),

    // Valida a função do usuário.
    funcao: z.enum(["admin", "usuario"]),
});