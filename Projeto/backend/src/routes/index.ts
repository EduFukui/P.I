import { Router } from "express";
import { routesUser } from "./userRoutes";
import { routesAuth } from "./authRoutes";
import { routesReport } from "./reportRoutes";
import { routesCategory } from './categoriyRoutes';

export const routes = Router();

routes.use("/user", routesUser);
routes.use("/auth", routesAuth);
routes.use("/report", routesReport);
routes.use("/category", routesCategory);
