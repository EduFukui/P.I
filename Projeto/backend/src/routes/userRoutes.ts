// Importa o Router do Express.
import { Router } from "express";

// Importa o controlador de usuários.
import { UsuarioController } from "../controllers/UsuarioController";

// Cria as rotas de usuários.
export const routesUser = Router();

// Cria uma instância do controlador.
const user = new UsuarioController();

// Rota para cadastrar um usuário.
routesUser.post("/create", user.create.bind(user));

// Rota para listar os usuários.
routesUser.get("/list", user.list.bind(user));

// Rota para atualizar um usuário.
routesUser.put("/update/:id", user.update.bind(user));

// Rota para excluir um usuário.
routesUser.delete("/delete/:id", user.delete.bind(user));

// Rota para buscar um usuário pelo ID.
routesUser.get("/:id", user.getById.bind(user));