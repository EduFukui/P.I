import { AppDataSource } from "../config/data-source";
import { Usuarios } from "../models/Usuarios";
import { compare } from "bcrypt";

export class AuthService {
    private repoUsuario = AppDataSource.getRepository(Usuarios);

    // Login
    async login(email: string, senha: string) {
        const usuario = await this.repoUsuario.findOneBy({
            email,
        });

        if (!usuario) {
            throw new Error("Credenciais inválidas");
        }

        const senhaValida = await compare(senha, usuario.senha);

        if (!senhaValida) {
            throw new Error("Credenciais inválidas");
        }

        return usuario;
    }
}
