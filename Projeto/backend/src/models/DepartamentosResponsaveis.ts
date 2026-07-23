import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { AtribuicaoDoProblemas } from "./AtribuicaoDeProblemas";

@Entity("departamentos")
export class DepartamentosResponsaveis {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false, length: 150 })
    nome: string;

    @Column({ nullable: false, length: 150 })
    contatoResponsavel: string;

    @OneToMany(
        () => AtribuicaoDoProblemas,
        (atribuicao) => atribuicao.departamento,
    )
    atribuicoes: AtribuicaoDoProblemas[];
}
