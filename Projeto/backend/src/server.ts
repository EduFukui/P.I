import express from "express";
import cors from "cors";
import { AppDataSource } from "./config/data-source";
import { routes } from "./routes";

const app = express();
const PORT = process.env.PORT;

AppDataSource.initialize()
    .then(async () => {
        // Limite maior enviar imagens base64
        app.use(express.json({ limit: "20mb" }));
        app.use(cors());
        app.use(routes);

        app.listen(PORT, () => {
            console.log(`Servidor rodando em: http://localhost:${PORT}`);
        });
    })
    .catch((error) => {
        console.error("Erro ao iniciar o servidor:", error);
    });
