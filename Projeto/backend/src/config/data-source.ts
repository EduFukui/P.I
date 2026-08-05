// Necessário para o TypeORM funcionar.
import "reflect-metadata";

// Importa o dotenv.
import * as dotenv from "dotenv";

// Importa o DataSource do TypeORM.
import { DataSource } from "typeorm";

// Importa as tabelas (models) do sistema.
import { Usuarios } from "../models/Usuarios";
import { Relatorios } from "../models/Relatorios";
import { Problemas } from "../models/Problemas";
import { Imagens } from "../models/Imagens";
import { Enderecos } from "../models/Enderecos";
import { Categorias } from "../models/Categorias";
import { AtribuicaoDoProblemas } from "../models/AtribuicaoDeProblemas";
import { DepartamentosResponsaveis } from "../models/DepartamentosResponsaveis";

// Lê as informações do arquivo .env.
dotenv.config();

// Cria a conexão com o banco de dados.
export const AppDataSource = new DataSource({

    // Tipo do banco.
    type: "mysql",

    // Endereço do banco.
    host: process.env.DB_HOST,

    // Nome do banco.
    database: process.env.DB_NAME,

    // Usuário do banco.
    username: process.env.DB_USER,

    // Senha do banco.
    password: process.env.DB_PASS,

    // Porta do banco.
    port: Number(process.env.DB_PORT),

    // Cria e atualiza as tabelas automaticamente.
    synchronize: true,

    // Mostra as consultas SQL no terminal.
    logging: true,

    // Lista das tabelas do sistema.
    entities: [
        Usuarios,
        Relatorios,
        Problemas,
        Imagens,
        Enderecos,
        Categorias,
        AtribuicaoDoProblemas,
        DepartamentosResponsaveis
    ],
});