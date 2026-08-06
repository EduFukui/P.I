// Importa o Express.
import express from "express";

// Importa o CORS.
import cors from "cors";

// Importa a conexão com o banco.
import { AppDataSource } from "./config/data-source";

// Importa as rotas da aplicação.
import { routes } from "./routes";

// Cria a aplicação.
const app = express();

// Define a porta do servidor.
const PORT = process.env.PORT;

// Inicia a conexão com o banco de dados.
AppDataSource.initialize().then(() => {

    // Permite receber dados em JSON.
    app.use(express.json());

    // Permite acesso de outras aplicações.
    app.use(cors());

    // Usa as rotas da aplicação.
    app.use(routes);

    // Inicia o servidor.
    app.listen(PORT, () => {
        console.log(`Servidor rodando em: http://localhost:${PORT}`);
    });
});