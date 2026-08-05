import {
    Column,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from "typeorm";

import { Categorias } from "./Categorias";
import { Relatorios } from "./Relatorios";

@Entity("problemas")
export class Problemas {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false, length: 100 })
    nome: string;

    @Column({
        type: "enum",
        enum: ["Baixa", "Média", "Alta", "Urgente"],
    })
    prioridade: string;

    @Column({ type: "text" })
    descricao: string;

    @Column({ type: "text", nullable: true })
    comentarioResolucao: string;

    @Column({ nullable: true })
    avaliacaoUsuario: number;

    @Column({ nullable: true })
    dataHoraResolucao: Date;

    @Column({ nullable: true, length: 150 })
    responsavelResolucao: string;

    @ManyToOne(() => Categorias, (categoria) => categoria.problemas)
    categoria: Categorias;

    @OneToMany(() => Relatorios, (relatorio) => relatorio.problema)
    relatorios: Relatorios[];
}
