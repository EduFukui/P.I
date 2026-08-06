// Importa a conexão com o banco de dados.
import { AppDataSource } from "../config/data-source";

// Importa a entidade Usuários.
import { Usuarios } from "../models/Usuarios";

// Importa a função para comparar senhas.
import { compare } from "bcrypt";

// Classe responsável pelo login.
export class AuthService {

    // Repositório da tabela usuários.
    private repoUsuario = AppDataSource.getRepository(Usuarios);

    // Faz o login do usuário.
    async login(email: string, senha: string) {

        // Procura o usuário pelo e-mail.
        const usuario = await this.repoUsuario.findOneBy({
            email,
        });

        // Verifica se o usuário existe.
        if (!usuario) {
            throw new Error("Credenciais inválidas");
        }

        // Compara a senha informada com a senha do banco.
        const senhaValida = await compare(
            senha,
            usuario.senha
        );

        // Verifica se a senha está correta.
        if (!senhaValida) {
            throw new Error("Credenciais inválidas");
        }

        // Retorna os dados do usuário.
        return usuario;
    }
}