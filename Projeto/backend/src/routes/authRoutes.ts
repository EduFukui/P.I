import { Router } from "express";
import { AuthController } from "../controllers/AuthController";

export const routesAuth = Router();

const userAuth = new AuthController();

routesAuth.post("/login", userAuth.login.bind(userAuth));

