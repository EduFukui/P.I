import { Router } from "express";

import { CategoriaController } from "../controllers/CategoriaController";
import { requireAdmin } from "../middlewares/authMiddleware";

export const routesCategory = Router();

const category = new CategoriaController();

routesCategory.get("/list", category.list.bind(category));
routesCategory.get("/:id", category.getById.bind(category));
routesCategory.post("/create", requireAdmin, category.create.bind(category));
routesCategory.put("/update/:id", requireAdmin, category.update.bind(category));
routesCategory.delete("/delete/:id", requireAdmin, category.delete.bind(category));
