import { Request, Response } from "express";
import { RelatorioService } from "../services/RelatorioService";
import { relatorioCreateSchema, relatorioUpdateSchema } from "../validators/RelatorioValidator";
import { verifyToken } from "../utils/jwt";
import { z } from "zod";

const service = new RelatorioService();

const imagensSchema = z.object({
    imagens: z.array(z.object({
        nome: z.string().trim().min(1).max(255),
        tipo: z.string().trim().min(1).max(100),
        base64: z.string().min(1),
    })).min(1).max(3),
});

export class RelatorioController {
    private getAuth(req: Request) {
        const authorization = req.headers.authorization;

        if (!authorization?.startsWith("Bearer ")) {
            throw new Error("Token não informado");
        }

        const payload = verifyToken(authorization.slice(7)) as {
            id?: number;
            funcao?: string;
        } | null;

        if (!payload?.id) throw new Error("Token inválido ou expirado");

        return {
            id: Number(payload.id),
            funcao: payload.funcao || "usuario",
        };
    }

    async list(_req: Request, res: Response) {
        try {
            return res.status(200).json(await service.list());
        } catch (error: any) {
            return res.status(500).json({ message: error.message });
        }
    }

    async getById(req: Request, res: Response) {
        try {
            return res.status(200).json(await service.getById(Number(req.params.id)));
        } catch (error: any) {
            return res.status(404).json({ message: error.message });
        }
    }

    async getImage(req: Request, res: Response) {
        try {
            const imagem = await service.getImage(Number(req.params.id));
            res.setHeader("Content-Type", imagem.tipo || "application/octet-stream");
            res.setHeader("Content-Disposition", `inline; filename=\"${imagem.nome}\"`);
            return res.send(imagem.imagem);
        } catch (error: any) {
            return res.status(404).json({ message: error.message });
        }
    }

    async create(req: Request, res: Response) {
        try {
            const auth = this.getAuth(req);
            const data = relatorioCreateSchema.parse(req.body);
            const relatorio = await service.create(auth.id, data);

            return res.status(201).json({
                message: "Relatório criado com sucesso.",
                data: relatorio,
            });
        } catch (error: any) {
            return res.status(400).json({ message: error.message });
        }
    }

    async update(req: Request, res: Response) {
        try {
            const auth = this.getAuth(req);
            const data = relatorioUpdateSchema.parse(req.body);
            const relatorio = await service.update(
                Number(req.params.id),
                auth.id,
                auth.funcao,
                data
            );

            return res.status(200).json({
                message: "Relatório atualizado com sucesso.",
                data: relatorio,
            });
        } catch (error: any) {
            return res.status(400).json({ message: error.message });
        }
    }

    async addImages(req: Request, res: Response) {
        try {
            const auth = this.getAuth(req);
            const { imagens } = imagensSchema.parse(req.body);
            const relatorio = await service.addImages(
                Number(req.params.id),
                auth.id,
                auth.funcao,
                imagens
            );

            return res.status(200).json({
                message: "Imagem adicionada com sucesso.",
                data: relatorio,
            });
        } catch (error: any) {
            return res.status(400).json({ message: error.message });
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const auth = this.getAuth(req);
            await service.delete(Number(req.params.id), auth.id, auth.funcao);
            return res.status(200).json({ message: "Relatório excluído com sucesso." });
        } catch (error: any) {
            return res.status(400).json({ message: error.message });
        }
    }
}
