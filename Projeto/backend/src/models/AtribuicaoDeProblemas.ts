import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Problemas } from "./Problemas";
import { DepartamentosResponsaveis } from "./DepartamentosResponsaveis";

@Entity("atribuicoes_problema")
export class AtribuicaoDoProblemas {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "text", nullable: true })
    observacoes: string;

    @Column()
    dataHoraAtribuicao: Date;

    @ManyToOne(() => Problemas, (problema) => problema.atribuicoes)
    problema: Problemas;

    @ManyToOne(
        () => DepartamentosResponsaveis,
        (departamento) => departamento.atribuicoes,
    )
    departamento: DepartamentosResponsaveis;
}
