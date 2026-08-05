// Importa os decorators do TypeORM.
import {
    Column,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from "typeorm";

// Importa as entidades relacionadas.
import { Categorias } from "./Categorias";
import { Relatorios } from "./Relatorios";
import { AtribuicaoDoProblemas } from "./AtribuicaoDeProblemas";

// Define a tabela problemas.
@Entity("problemas")
export class Problemas {

    // ID do problema.
    @PrimaryGeneratedColumn()
    id: number;

    // Nome do problema.
    @Column({ nullable: false, length: 100 })
    nome: string;

    // Prioridade do problema.
    @Column({
        type: "enum",
        enum: ["Baixa", "Média", "Alta", "Urgente"],
    })
    prioridade: string;

    // Descrição do problema.
    @Column({ type: "text" })
    descricao: string;

    // Comentário da resolução.
    @Column({ type: "text", nullable: true })
    comentarioResolucao: string;

    // Avaliação feita pelo usuário.
    @Column({ nullable: true })
    avaliacaoUsuario: number;

    // Data da resolução.
    @Column({ nullable: true })
    dataHoraResolucao: Date;

    // Responsável pela resolução.
    @Column({ nullable: true, length: 150 })
    responsavelResolucao: string;

    // Categoria do problema.
    @ManyToOne(() => Categorias, (categoria) => categoria.problemas)
    categoria: Categorias;

    // Lista de relatórios do problema.
    @OneToMany(() => Relatorios, (relatorio) => relatorio.problema)
    relatorios: Relatorios[];

    // Lista de atribuições do problema.
    @OneToMany(() => AtribuicaoDoProblemas, (atribuicao) => atribuicao.problema)
    atribuicoes: AtribuicaoDoProblemas[];
}