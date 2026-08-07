import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
} from "typeorm";
import { Usuarios } from "./Usuarios";
import { Problemas } from "./Problemas";
import { Imagens } from "./Imagens";
import { Enderecos } from "./Enderecos";

@Entity("relatorios")
export class Relatorios {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: "enum",
        enum: ["Pendente", "Em Andamento", "Resolvido"],
        default: "Pendente",
    })
    status: "Pendente" | "Em Andamento" | "Resolvido";

    @Column({ type: "text" })
    descricao: string;

    @Column({ default: () => "CURRENT_TIMESTAMP" })
    dataRelatorio: Date;

    @ManyToOne(() => Usuarios, (usuario) => usuario.relatorios, {
        nullable: false,
    })
    usuario: Usuarios;

    @OneToOne(() => Problemas, (problema) => problema.relatorio, {
        nullable: false,
        onDelete: "CASCADE",
    })
    @JoinColumn()
    problema: Problemas;

    @OneToMany(() => Imagens, (imagem) => imagem.relatorio, {
        cascade: true,
    })
    imagens: Imagens[];

    @OneToOne(() => Enderecos, (endereco) => endereco.relatorio, {
        nullable: false,
        onDelete: "CASCADE",
    })
    @JoinColumn()
    endereco: Enderecos;
}
