// Importa os decorators do TypeORM.
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

// Importa as entidades relacionadas.
import { Problemas } from "./Problemas";
import { DepartamentosResponsaveis } from "./DepartamentosResponsaveis";

// Define a tabela no banco.
@Entity("atribuicoes_problema")
export class AtribuicaoDoProblemas {

    // ID da atribuição.
    @PrimaryGeneratedColumn()
    id: number;

    // Observações da atribuição.
    @Column({ type: "text", nullable: true })
    observacoes: string;

    // Data e hora da atribuição.
    @Column()
    dataHoraAtribuicao: Date;

    // Relaciona a atribuição com um problema.
    @ManyToOne(() => Problemas, (problema) => problema.atribuicoes)
    problema: Problemas;

    // Relaciona a atribuição com um departamento.
    @ManyToOne(
        () => DepartamentosResponsaveis,
        (departamento) => departamento.atribuicoes,
    )
    departamento: DepartamentosResponsaveis;
}