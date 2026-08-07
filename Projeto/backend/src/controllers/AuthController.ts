import { Request, Response } from "express";
import { AuthService } from "../services/AuthService";
import { generateToken } from "../utils/jwt";

const service = new AuthService();

export class AuthController {
    // Login
    async login(req: Request, res: Response) {
        try {
            const { email, senha } = req.body;

            if (!email || !senha) {
                return res.status(400).json({
                    message: "E-mail e senha são obrigatórios.",
                });
            }

            const user = await service.login(email, senha);

            const token = generateToken({
                id: user.id,
                funcao: user.funcao,
            });

            const safe = { ...user };
            delete (safe as any).senha;
            delete (safe as any).password;

            return res.status(200).json({
                message: "Login realizado com sucesso.",
                user: safe,
                token,
            });
        } catch (error: any) {
            return res.status(401).json({
                message: error.message,
            });
        }
    }
}
