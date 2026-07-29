import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Relatorios } from "./Relatorios";

@Entity("enderecos")
export class Enderecos {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 8 })
    cep: string;

    @Column({ length: 10 })
    numero: string;

    @Column({ nullable: true, length: 100 })
    complemento: string;

    @Column({ length: 100 })
    cidade: string;

    @Column({ length: 100 })
    bairro: string;

    @Column({ length: 2 })
    estado: string;

    @Column({ length: 50 })
    pais: string;

    @Column("decimal", { precision: 9, scale: 6, nullable: true })
    longitude: number;

    @Column("decimal", { precision: 9, scale: 6, nullable: true })
    latitude: number;

    @OneToMany(() => Relatorios, (relatorio) => relatorio.endereco)
    relatorios: Relatorios[];
}
