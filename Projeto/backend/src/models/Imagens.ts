import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Relatorios } from "./Relatorios";

@Entity("imagens")
export class Imagens {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 255 })
    nome: string;

    @Column("longblob")
    imagem: Buffer;

    @OneToMany(() => Relatorios, (relatorio) => relatorio.imagem)
    relatorios: Relatorios[];
}
