import { Router } from "express";
import { routesUser } from "./userRoutes";
import { routesAuth } from "./authRoutes";
import { routesCategory } from './categoriyRoutes';

export const routes = Router();

routes.use("/user", routesUser);
routes.use("/auth", routesAuth);
routes.use("/category", routesCategory);
