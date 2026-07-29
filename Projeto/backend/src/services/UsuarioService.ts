import { Like, Not } from "typeorm";
import { AppDataSource } from "../config/data-source";
import { Usuarios } from "../models/Usuarios";

export class UsuarioService {
    private repoUsuario = AppDataSource.getRepository(Usuarios);

    async list(nomeCompleto?: string) {
        return this.repoUsuario.find({
            where: nomeCompleto
                ? { nomeCompleto: Like(`%${nomeCompleto}%`) }
                : {},
            relations: ["relatorios"],
        });
    }

    async getById(id: number) {
        const usuario = await this.repoUsuario.findOne({
            where: { id },
            relations: ["relatorios"],
        });

        if (!usuario) {
            throw new Error("Usuário não encontrado");
        }

        return usuario;
    }

    async create(data: Partial<Usuarios>) {
        const exists =
            (await this.repoUsuario.findOneBy({ cpf: data.cpf })) ||
            (await this.repoUsuario.findOneBy({ email: data.email })) ||
            (await this.repoUsuario.findOneBy({ telefone: data.telefone }));

        if (exists) {
            throw new Error("CPF, e-mail ou telefone já cadastrado");
        }

        const usuario = this.repoUsuario.create(data);

        return this.repoUsuario.save(usuario);
    }

    async update(id: number, data: Partial<Usuarios>) {
        const usuario = await this.repoUsuario.findOneBy({ id });

        if (!usuario) {
            throw new Error("Usuário não encontrado");
        }

        // Verifica CPF duplicado
        if (data.cpf) {
            const cpfExiste = await this.repoUsuario.findOne({
                where: {
                    cpf: data.cpf,
                    id: Not(id),
                },
            });

            if (cpfExiste) {
                throw new Error("CPF já cadastrado");
            }
        }

        // Verifica Email duplicado
        if (data.email) {
            const emailExiste = await this.repoUsuario.findOne({
                where: {
                    email: data.email,
                    id: Not(id),
                },
            });

            if (emailExiste) {
                throw new Error("E-mail já cadastrado");
            }
        }

        // Verifica Telefone duplicado
        if (data.telefone) {
            const telefoneExiste = await this.repoUsuario.findOne({
                where: {
                    telefone: data.telefone,
                    id: Not(id),
                },
            });

            if (telefoneExiste) {
                throw new Error("Telefone já cadastrado");
            }
        }

        await this.repoUsuario.update(id, data);

        return this.repoUsuario.findOne({
            where: { id },
            relations: ["relatorios"],
        });
    }

    async delete(id: number) {
        const usuario = await this.repoUsuario.findOneBy({ id });

        if (!usuario) {
            throw new Error("Usuário não encontrado");
        }

        return this.repoUsuario.delete(id);
    }
}