import { z } from "zod";

export const categoriaCreateSchema = z.object({
    nome: z.string().trim().min(2, "O nome deve ter pelo menos 2 caracteres").max(100),
    descricao: z.string().trim().max(500).optional().nullable(),
});

export const categoriaUpdateSchema = z.object({
    nome: z.string().trim().min(2, "O nome deve ter pelo menos 2 caracteres").max(100).optional(),
    descricao: z.string().trim().max(500).optional().nullable(),
});