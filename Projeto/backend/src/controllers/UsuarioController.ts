import { Request, Response } from "express";
import { UsuarioService } from "../services/UsuarioService";
import { usuarioSchema } from "../validators/UsuarioValidator";

const service = new UsuarioService();

export class UsuarioController {
    async list(req: Request, res: Response) {
        try {
            const nomeCompleto = req.query.nomeCompleto as string;
            const usuarios = await service.list(nomeCompleto);

            return res.status(200).json(usuarios);
        } catch (error: any) {
            return res.status(500).json({
                message: error.message,
            });
        }
    }

    async getById(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);

            const usuario = await service.getById(id);

            return res.status(200).json(usuario);
        } catch (error: any) {
            return res.status(404).json({
                message: error.message,
            });
        }
    }

    async create(req: Request, res: Response) {
        try {
            const data = usuarioSchema.parse(req.body);

            const usuario = await service.create(data);

            return res.status(201).json({
                data: usuario,
            });
        } catch (error: any) {
            return res.status(400).json({
                message: error.message,
            });
        }
    }

    async update(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            const data = req.body;

            const usuario = await service.update(id, data);

            return res.status(200).json({
                data: usuario,
            });
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
                message: "Usuário deletado com sucesso",
            });
        } catch (error: any) {
            return res.status(500).json({
                message: error.message,
            });
        }
    }
}
