import { Router } from "express";
import { CategoriaController } from './../controllers/CategoriaController';

export const routesCategory = Router();
const category = new CategoriaController();

routesCategory.get("/list", category.list.bind(category));
routesCategory.get("/:id", category.getById.bind(category));
routesCategory.post("/create", category.create.bind(category));
routesCategory.put("/update/:id", category.update.bind(category));
routesCategory.delete("/delete/:id", category.delete.bind(category));
