import { Router } from "express";
import { routesUser } from "./userRoutes";

export const routes = Router();

routes.use("/user", routesUser);
