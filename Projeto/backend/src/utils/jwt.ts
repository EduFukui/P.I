// Importa a biblioteca JWT.
import jwt from "jsonwebtoken";

// Importa o dotenv.
import * as dotenv from "dotenv";

// Carrega as variáveis do arquivo .env.
dotenv.config();

// Chave usada para criar o token.
const JWT_SECRET = process.env.JWT_SECRET || "default secret";

// Tempo de validade do token.
const JWT_EXPIRES_IN = Number(process.env.JWT_EXPIRES_IN || 86400);

// Gera um novo token.
export const generateToken = (payload: object) => {
    return jwt.sign(payload, JWT_SECRET, {
        expiresIn: JWT_EXPIRES_IN,
    });
};

// Verifica se o token é válido.
export const verifyToken = (token: string) => {
    try {
        // Retorna os dados do token.
        return jwt.verify(token, JWT_SECRET);
    } catch {
        // Retorna null se o token for inválido.
        return null;
    }
};