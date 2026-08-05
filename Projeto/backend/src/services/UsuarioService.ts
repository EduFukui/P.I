// Importa operadores do TypeORM.
import { Like, Not } from "typeorm";

// Importa a conexão com o banco.
import { AppDataSource } from "../config/data-source";

// Importa a entidade Usuários.
import { Usuarios } from "../models/Usuarios";

// Classe responsável pelos usuários.
export class UsuarioService {

    // Repositório da tabela usuários.
    private repoUsuario = AppDataSource.getRepository(Usuarios);

    // Lista todos os usuários.
    async list(nomeCompleto?: string) {
        return this.repoUsuario.find({
            // Busca pelo nome, se informado.
            where: nomeCompleto
                ? { nomeCompleto: Like(`%${nomeCompleto}%`) }
                : {},

            // Carrega também os relatórios do usuário.
            relations: ["relatorios"],
        });
    }

    // Busca um usuário pelo ID.
    async getById(id: number) {
        const usuario = await this.repoUsuario.findOne({
            where: { id },
            relations: ["relatorios"],
        });

        // Verifica se o usuário existe.
        if (!usuario) {
            throw new Error("Usuário não encontrado");
        }

        return usuario;
    }

    // Cadastra um novo usuário.
    async create(data: Partial<Usuarios>) {

        // Verifica se CPF, e-mail ou telefone já existem.
        const exists =
            (await this.repoUsuario.findOneBy({ cpf: data.cpf })) ||
            (await this.repoUsuario.findOneBy({ email: data.email })) ||
            (await this.repoUsuario.findOneBy({ telefone: data.telefone }));

        if (exists) {
            throw new Error("CPF, e-mail ou telefone já cadastrado");
        }

        // Cria o usuário.
        const usuario = this.repoUsuario.create(data);

        // Salva no banco.
        return this.repoUsuario.save(usuario);
    }

    // Atualiza um usuário.
    async update(id: number, data: Partial<Usuarios>) {

        // Procura o usuário.
        const usuario = await this.repoUsuario.findOneBy({ id });

        // Verifica se o usuário existe.
        if (!usuario) {
            throw new Error("Usuário não encontrado");
        }

        // Verifica se o CPF já está em uso.
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

        // Verifica se o e-mail já está em uso.
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

        // Verifica se o telefone já está em uso.
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

        // Atualiza os dados do usuário.
        await this.repoUsuario.update(id, data);

        // Retorna o usuário atualizado.
        return this.repoUsuario.findOne({
            where: { id },
            relations: ["relatorios"],
        });
    }

    // Exclui um usuário.
    async delete(id: number) {

        // Procura o usuário.
        const usuario = await this.repoUsuario.findOneBy({ id });

        // Verifica se o usuário existe.
        if (!usuario) {
            throw new Error("Usuário não encontrado");
        }

        // Remove o usuário.
        return this.repoUsuario.delete(id);
    }
}