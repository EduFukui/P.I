// Importa o Router do Express.
import { Router } from "express";

// Importa o controlador de autenticação.
import { AuthController } from "../controllers/AuthController";

// Cria as rotas de autenticação.
export const routesAuth = Router();

// Cria uma instância do controlador.
const userAuth = new AuthController();

// Rota para fazer login.
routesAuth.post("/login", userAuth.login.bind(userAuth));