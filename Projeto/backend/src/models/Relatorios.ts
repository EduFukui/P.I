// Importa os decorators do TypeORM.
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

// Importa as entidades relacionadas.
import { Usuarios } from "./Usuarios";
import { Problemas } from "./Problemas";
import { Imagens } from "./Imagens";
import { Enderecos } from "./Enderecos";

// Define a tabela relatorios.
@Entity("relatorios")
export class Relatorios {

    // ID do relatório.
    @PrimaryGeneratedColumn()
    id: number;

    // Status do relatório.
    @Column({
        type: "enum",
        enum: ["Pendente", "Em Andamento", "Resolvido"],
        default: "Pendente",
    })
    status: string;

    // Descrição do relatório.
    @Column({ type: "text" })
    descricao: string;

    // Data em que o relatório foi criado.
    @Column()
    dataRelatorio: Date;

    // Usuário que fez o relatório.
    @ManyToOne(() => Usuarios)
    usuario: Usuarios;

    // Problema relacionado ao relatório.
    @ManyToOne(() => Problemas, (problema) => problema.relatorios)
    problema: Problemas;

    // Imagem do relatório.
    @ManyToOne(() => Imagens, (imagem) => imagem.relatorios, {
        nullable: true,
    })
    imagem: Imagens;

    // Endereço do relatório.
    @ManyToOne(() => Enderecos, (endereco) => endereco.relatorios)
    endereco: Enderecos;
}