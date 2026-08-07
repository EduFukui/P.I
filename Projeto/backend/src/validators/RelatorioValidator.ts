import { z } from "zod";

const enderecoSchema = z.object({
    cep: z.string().regex(/^\d{8}$/, "CEP deve conter exatamente 8 dígitos"),
    numero: z.string().trim().min(1, "Informe o número").max(10),
    complemento: z.string().trim().max(100).optional().default(""),
    cidade: z.string().trim().min(2, "Informe a cidade").max(100),
    bairro: z.string().trim().min(2, "Informe o bairro").max(100),
    estado: z.string().trim().length(2, "Estado deve conter 2 caracteres").transform((v) => v.toUpperCase()),
    pais: z.string().trim().min(2, "Informe o país").max(50),
    latitude: z.number().min(-90).max(90),
    longitude: z.number().min(-180).max(180),
});

const imagemSchema = z.object({
    nome: z.string().trim().min(1).max(255),
    tipo: z.string().trim().min(1).max(100),
    base64: z.string().min(1, "Imagem inválida"),
});

export const relatorioCreateSchema = z.object({
    nome: z.string().trim().min(3, "O título deve ter pelo menos 3 caracteres").max(100),
    categoriaId: z.number().int().positive("Selecione uma categoria válida"),
    prioridade: z.enum(["Baixa", "Média", "Alta", "Urgente"]),
    descricao: z.string().trim().min(10, "A descrição deve ter pelo menos 10 caracteres"),
    endereco: enderecoSchema,
    imagens: z.array(imagemSchema).max(3, "Envie no máximo 3 imagens").optional().default([]),
});

export const relatorioUpdateSchema = z.object({
    nome: z.string().trim().min(3).max(100).optional(),
    categoriaId: z.number().int().positive().optional(),
    prioridade: z.enum(["Baixa", "Média", "Alta", "Urgente"]).optional(),
    descricao: z.string().trim().min(10).optional(),
    status: z.enum(["Pendente", "Em Andamento", "Resolvido"]).optional(),
    endereco: enderecoSchema.partial().optional(),
});
