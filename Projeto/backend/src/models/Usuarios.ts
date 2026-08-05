// Importa os decorators do TypeORM.
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

// Importa a entidade Relatórios.
import { Relatorios } from "./Relatorios";

// Define a tabela usuarios.
@Entity("usuarios")
export class Usuarios {

    // ID do usuário.
    @PrimaryGeneratedColumn()
    id: number;

    // Nome completo.
    @Column({ nullable: false, length: 150 })
    nomeCompleto: string;

    // CPF do usuário.
    @Column({ nullable: false, length: 11, unique: true })
    cpf: string;

    // Telefone do usuário.
    @Column({ nullable: false, length: 15, unique: true })
    telefone: string;

    // E-mail do usuário.
    @Column({ nullable: false, length: 150, unique: true })
    email: string;

    // Senha do usuário.
    @Column({ nullable: false, length: 255 })
    senha: string;

    // Data do cadastro.
    @Column({ default: () => "CURRENT_TIMESTAMP" })
    dataCadastro: Date;

    // Função do usuário.
    @Column({ type: "enum", enum: ["admin", "usuario"] })
    funcao!: "admin" | "usuario";

    // Lista de relatórios do usuário.
    @OneToMany(() => Relatorios, (relatorio) => relatorio.usuario)
    relatorios: Relatorios[];
}