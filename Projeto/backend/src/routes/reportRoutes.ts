import { Router } from "express";
import { RelatorioController } from "../controllers/RelatorioController";

export const routesReport = Router();
const report = new RelatorioController();

routesReport.post("/create", report.create.bind(report));
routesReport.get("/list", report.list.bind(report));
routesReport.get("/image/:id", report.getImage.bind(report));
routesReport.put("/update/:id", report.update.bind(report));
routesReport.post("/:id/images", report.addImages.bind(report));
routesReport.delete("/delete/:id", report.delete.bind(report));
routesReport.get("/:id", report.getById.bind(report));
