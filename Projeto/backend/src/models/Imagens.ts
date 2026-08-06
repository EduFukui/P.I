// Importa os decorators do TypeORM.
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

// Importa a entidade Relatórios.
import { Relatorios } from "./Relatorios";

// Define a tabela imagens.
@Entity("imagens")
export class Imagens {

    // ID da imagem.
    @PrimaryGeneratedColumn()
    id: number;

    // Nome da imagem.
    @Column({ length: 255 })
    nome: string;

    // Arquivo da imagem.
    @Column("longblob")
    imagem: Buffer;

    // Lista de relatórios que usam essa imagem.
    @OneToMany(() => Relatorios, (relatorio) => relatorio.imagem)
    relatorios: Relatorios[];
}