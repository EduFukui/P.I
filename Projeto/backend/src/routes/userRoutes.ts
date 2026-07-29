import { Router } from "express";
import { UsuarioController } from "../controllers/UsuarioController";

export const routesUser = Router();

const user = new UsuarioController();

routesUser.post("/create", user.create.bind(user));
routesUser.get("/list", user.list.bind(user));
routesUser.put("/update/:id", user.update.bind(user));
routesUser.delete("/delete/:id", user.delete.bind(user));
