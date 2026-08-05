// Importa os decorators do TypeORM.
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

// Importa a entidade Relatórios.
import { Relatorios } from "./Relatorios";

// Define a tabela enderecos.
@Entity("enderecos")
export class Enderecos {

    // ID do endereço.
    @PrimaryGeneratedColumn()
    id: number;

    // CEP do endereço.
    @Column({ length: 8 })
    cep: string;

    // Número do endereço.
    @Column({ length: 10 })
    numero: string;

    // Complemento do endereço.
    @Column({ nullable: true, length: 100 })
    complemento: string;

    // Cidade.
    @Column({ length: 100 })
    cidade: string;

    // Bairro.
    @Column({ length: 100 })
    bairro: string;

    // Estado.
    @Column({ length: 2 })
    estado: string;

    // País.
    @Column({ length: 50 })
    pais: string;

    // Longitude da localização.
    @Column("decimal", { precision: 9, scale: 6, nullable: true })
    longitude: number;

    // Latitude da localização.
    @Column("decimal", { precision: 9, scale: 6, nullable: true })
    latitude: number;

    // Lista de relatórios desse endereço.
    @OneToMany(() => Relatorios, (relatorio) => relatorio.endereco)
    relatorios: Relatorios[];
}