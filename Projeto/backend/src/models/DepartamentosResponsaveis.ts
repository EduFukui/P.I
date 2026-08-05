// Importa os decorators do TypeORM.
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

// Importa a entidade de atribuições.
import { AtribuicaoDoProblemas } from "./AtribuicaoDeProblemas";

// Define a tabela departamentos.
@Entity("departamentos")
export class DepartamentosResponsaveis {

    // ID do departamento.
    @PrimaryGeneratedColumn()
    id: number;

    // Nome do departamento.
    @Column({ nullable: false, length: 150 })
    nome: string;

    // Nome ou contato do responsável.
    @Column({ nullable: false, length: 150 })
    contatoResponsavel: string;

    // Lista de atribuições do departamento.
    @OneToMany(
        () => AtribuicaoDoProblemas,
        (atribuicao) => atribuicao.departamento,
    )
    atribuicoes: AtribuicaoDoProblemas[];
}