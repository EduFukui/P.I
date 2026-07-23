import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
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
    status: string;

    @Column({ type: "text" })
    descricao: string;

    @Column()
    dataRelatorio: Date;

    @ManyToOne(() => Usuarios)
    usuario: Usuarios;

    @ManyToOne(() => Problemas, (problema) => problema.relatorios)
    problema: Problemas;

    @ManyToOne(() => Imagens, (imagem) => imagem.relatorios, {
        nullable: true,
    })
    imagem: Imagens;

    @ManyToOne(() => Enderecos, (endereco) => endereco.relatorios)
    endereco: Enderecos;
}
