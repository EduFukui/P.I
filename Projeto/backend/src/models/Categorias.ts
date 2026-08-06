// Importa os decorators do TypeORM.
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

// Importa a entidade Problemas.
import { Problemas } from "./Problemas";

// Define a tabela categorias.
@Entity("categorias")
export class Categorias {

    // ID da categoria.
    @PrimaryGeneratedColumn()
    id: number;

    // Nome da categoria.
    @Column({ nullable: false, length: 100 })
    nome: string;

    // Descrição da categoria.
    @Column({ type: "text", nullable: true })
    descricao: string;

    // Lista de problemas dessa categoria.
    @OneToMany(() => Problemas, (problema) => problema.categoria)
    problemas: Problemas[];
}