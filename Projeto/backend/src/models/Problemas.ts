import {
    Column,
    Entity,
    ManyToOne,
    OneToOne,
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
    prioridade: "Baixa" | "Média" | "Alta" | "Urgente";

    @Column({ type: "text" })
    descricao: string;

    @Column({ type: "text", nullable: true })
    comentarioResolucao: string | null;

    @Column({ nullable: true })
    avaliacaoUsuario: number | null;

    @Column({ nullable: true })
    dataHoraResolucao: Date | null;

    @Column({ nullable: true, length: 150 })
    responsavelResolucao: string | null;

    @ManyToOne(() => Categorias, (categoria) => categoria.problemas, {
        nullable: false,
    })
    categoria: Categorias;

    @OneToOne(() => Relatorios, (relatorio) => relatorio.problema)
    relatorio: Relatorios;
}
