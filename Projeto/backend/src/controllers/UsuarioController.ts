// Importa os tipos Request e Response do Express.
import { Request, Response } from "express";

// Importa o serviço de usuários.
import { UsuarioService } from "../services/UsuarioService";

// Importa o validador dos dados do usuário.
import { usuarioSchema } from "../validators/UsuarioValidator";

// Cria uma instância do serviço.
const service = new UsuarioService();

// Classe responsável pelos usuários.
export class UsuarioController {

    // Lista todos os usuários.
    async list(req: Request, res: Response) {
        try {
            // Pega o nome informado na busca.
            const nomeCompleto = req.query.nomeCompleto as string;

            // Busca os usuários.
            const usuarios = await service.list(nomeCompleto);

            // Retorna a lista.
            return res.status(200).json(usuarios);

        } catch (error: any) {

            // Retorna erro.
            return res.status(500).json({
                message: error.message,
            });
        }
    }

    // Busca um usuário pelo ID.
    async getById(req: Request, res: Response) {
        try {
            // Pega o ID da URL.
            const id = Number(req.params.id);

            // Busca o usuário.
            const usuario = await service.getById(id);

            // Retorna o usuário.
            return res.status(200).json(usuario);

        } catch (error: any) {

            // Retorna erro caso não encontre.
            return res.status(404).json({
                message: error.message,
            });
        }
    }

    // Cadastra um novo usuário.
    async create(req: Request, res: Response) {
        try {

            // Valida os dados enviados.
            const data = usuarioSchema.parse({
                ...req.body,

                // Todo usuário cadastrado será comum.
                funcao: "usuario",
            });

            // Salva o usuário.
            const usuario = await service.create(data);

            // Faz uma cópia dos dados.
            const safe = { ...usuario };

            // Remove a senha da resposta.
            delete (safe as any).senha;
            delete (safe as any).password;

            // Retorna os dados do usuário.
            return res.status(201).json({
                message: "Usuário cadastrado com sucesso.",
                user: safe,
            });

        } catch (error: any) {

            // Retorna erro.
            return res.status(400).json({
                message: error.message,
            });
        }
    }

    // Atualiza um usuário.
    async update(req: Request, res: Response) {
        try {

            // Pega o ID da URL.
            const id = Number(req.params.id);

            // Pega os novos dados.
            const data = req.body;

            // Atualiza o usuário.
            const usuario = await service.update(id, data);

            // Faz uma cópia dos dados.
            const safe = { ...usuario };

            // Remove a senha da resposta.
            delete (safe as any).senha;
            delete (safe as any).password;

            // Retorna o usuário atualizado.
            return res.status(200).json({
                data: safe,
            });

        } catch (error: any) {

            // Retorna erro.
            return res.status(400).json({
                message: error.message,
            });
        }
    }

    // Exclui um usuário.
    async delete(req: Request, res: Response) {
        try {

            // Remove o usuário pelo ID.
            await service.delete(
                Number(req.params.id)
            );

            // Retorna mensagem de sucesso.
            return res.status(200).json({
                message: "Usuário deletado com sucesso",
            });

        } catch (error: any) {

            // Retorna erro.
            return res.status(500).json({
                message: error.message,
            });
        }
    }
}