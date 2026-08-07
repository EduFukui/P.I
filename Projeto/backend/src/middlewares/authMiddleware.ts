import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt";

export function requireAdmin(req: Request, res: Response, next: NextFunction) {
    try {
        const authorization = req.headers.authorization;

        // Verifica se existe um token e se ele possui o formato Bearer.
        if (!authorization?.startsWith("Bearer ")) {
            return res.status(401).json({
                message: "Token não informado",
            });
        }

        // Remove o prefixo "Bearer " e valida o token JWT.
        const payload = verifyToken(authorization.slice(7)) as {
            funcao?: string;
        } | null;

        // Verifica se o token é válido.
        if (!payload) {
            return res.status(401).json({
                message: "Token inválido ou expirado",
            });
        }

        // Verifica se o usuário possui a função de administrador.
        if (payload.funcao !== "admin") {
            return res.status(403).json({
                message: "Apenas administradores podem acessar essa rota",
            });
        }

        //NextStage
        next();
    } catch (error) {
        return res.status(401).json({
            message: "Token inválido",
        });
    }
}
