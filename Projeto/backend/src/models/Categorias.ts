import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Problemas } from "./Problemas";

@Entity("categorias")
export class Categorias {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false, length: 100, unique: true })
    nome: string;

    @Column({ type: "text", nullable: true })
    descricao: string | null;

    @OneToMany(() => Problemas, (problema) => problema.categoria)
    problemas: Problemas[];
}
