import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Relatorios } from "./Relatorios";

@Entity("imagens")
export class Imagens {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 255 })
    nome: string;

    @Column({ length: 100 })
    tipo: string;

    // Imagem com blob
    @Column("longblob")
    imagem: Buffer;

    @ManyToOne(() => Relatorios, (relatorio) => relatorio.imagens, {
        onDelete: "CASCADE",
    })
    relatorio: Relatorios;
}
