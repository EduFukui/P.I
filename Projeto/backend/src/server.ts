import express from "express";
import cors from "cors";
import { AppDataSource } from "./config/data-source";
import { routes } from "./routes";

const app = express();
const PORT = process.env.PORT;

AppDataSource.initialize().then(() => {
    app.use(express.json());
    app.use(cors());
    app.use(routes);

    app.listen(PORT, () => {
        console.log(`Servidor rodando em: http://localhost:${PORT}`);
    });
});
