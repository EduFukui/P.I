import { Router } from "express";
import { routesUser } from "./userRoutes";
import { routesAuth } from "./authRoutes";

export const routes = Router();

routes.use("/user", routesUser);
routes.use("/auth", routesAuth);
