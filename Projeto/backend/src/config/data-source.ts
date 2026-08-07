import "reflect-metadata";

import * as dotenv from "dotenv";

import { DataSource } from "typeorm";

import { Usuarios } from "../models/Usuarios";
import { Relatorios } from "../models/Relatorios";
import { Problemas } from "../models/Problemas";
import { Imagens } from "../models/Imagens";
import { Enderecos } from "../models/Enderecos";
import { Categorias } from "../models/Categorias";

dotenv.config();

export const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    port: Number(process.env.DB_PORT),
    synchronize: true,
    logging: true,
    entities: [Usuarios, Relatorios, Problemas, Imagens, Enderecos, Categorias],
});