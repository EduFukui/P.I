// Importa os tipos Request e Response do Express.
import { Request, Response } from "express";

// Importa o serviço de login.
import { AuthService } from "../services/AuthService";

// Importa a função que gera o token JWT.
import { generateToken } from "../utils/jwt";

// Cria uma instância do serviço.
const service = new AuthService();

// Classe responsável pelo login.
export class AuthController {

    // Método de login.
    async login(req: Request, res: Response) {
        try {

            // Pega o e-mail e a senha enviados.
            const { email, senha } = req.body;

            // Verifica se os campos foram preenchidos.
            if (!email || !senha) {
                return res.status(400).json({
                    message: "E-mail e senha são obrigatórios.",
                });
            }

            // Verifica se o usuário existe.
            const user = await service.login(
                email,
                senha
            );

            // Gera o token do usuário.
            const token = generateToken({
                id: user.id,
                funcao: user.funcao,
            });

            // Faz uma cópia dos dados do usuário.
            const safe = { ...user };

            // Remove a senha antes de enviar.
            delete (safe as any).senha;
            delete (safe as any).password;

            // Retorna os dados do usuário e o token.
            return res.status(200).json({
                message: "Login realizado com sucesso.",
                user: safe,
                token,
            });

        } catch (error: any) {

            // Retorna erro caso o login falhe.
            return res.status(401).json({
                message: error.message,
            });
        }
    }
}