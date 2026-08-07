import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

import { Relatorios } from "./Relatorios";

@Entity("usuarios")
export class Usuarios {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false, length: 150 })
    nomeCompleto: string;

    @Column({ nullable: false, length: 11, unique: true })
    cpf: string;

    @Column({ nullable: false, length: 15, unique: true })
    telefone: string;

    @Column({ nullable: false, length: 150, unique: true })
    email: string;

    @Column({ nullable: false, length: 255 })
    senha: string;

    @Column({ default: () => "CURRENT_TIMESTAMP" })
    dataCadastro: Date;

    @Column({ type: "enum", enum: ["admin", "usuario"] })
    funcao!: "admin" | "usuario";

    @OneToMany(() => Relatorios, (relatorio) => relatorio.usuario)
    relatorios: Relatorios[];
}