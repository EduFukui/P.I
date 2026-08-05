// Importa o Router do Express.
import { Router } from "express";

// Importa as rotas de usuários.
import { routesUser } from "./userRoutes";

// Importa as rotas de autenticação.
import { routesAuth } from "./authRoutes";

// Cria o roteador principal.
export const routes = Router();

// Adiciona as rotas de usuários.
routes.use("/user", routesUser);

// Adiciona as rotas de autenticação.
routes.use("/auth", routesAuth);