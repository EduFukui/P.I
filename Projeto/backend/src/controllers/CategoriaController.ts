import { Request, Response } from "express";
import { CategoriaService } from "../services/CategoriaService";
import { categoriaCreateSchema, categoriaUpdateSchema } from "../validators/CategoriaValidator";

const service = new CategoriaService();

export class CategoriaController {
    async list(_req: Request, res: Response) {
        try {
            return res.status(200).json(await service.list());
        } catch (error: any) {
            return res.status(500).json({
                message: error.message,
            });
        }
    }

    async getById(req: Request, res: Response) {
        try {
            return res
                .status(200)
                .json(await service.getById(Number(req.params.id)));
        } catch (error: any) {
            return res.status(404).json({
                message: error.message,
            });
        }
    }

    async create(req: Request, res: Response) {
        try {
            const data = categoriaCreateSchema.parse(req.body);

            return res.status(201).json(await service.create(data));
        } catch (error: any) {
            return res.status(400).json({
                message: error.message,
            });
        }
    }

    async update(req: Request, res: Response) {
        try {
            const data = categoriaUpdateSchema.parse(req.body);

            return res
                .status(200)
                .json(await service.update(Number(req.params.id), data));
        } catch (error: any) {
            return res.status(400).json({
                message: error.message,
            });
        }
    }

    async delete(req: Request, res: Response) {
        try {
            await service.delete(Number(req.params.id));

            return res.status(200).json({
                message: "Categoria excluída com sucesso",
            });
        } catch (error: any) {
            return res.status(400).json({
                message: error.message,
            });
        }
    }
}
