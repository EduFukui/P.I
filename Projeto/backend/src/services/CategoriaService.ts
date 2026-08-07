import { AppDataSource } from "../config/data-source";
import { Categorias } from "../models/Categorias";

export class CategoriaService {
    private repository = AppDataSource.getRepository(Categorias);

    async list() {
        return this.repository.find({ order: { nome: "ASC" } });
    }

    async getById(id: number) {
        const categoria = await this.repository.findOneBy({ id });
        if (!categoria) throw new Error("Categoria não encontrada");
        return categoria;
    }

    async create(data: { nome: string; descricao?: string | null }) {
        const existente = await this.repository.findOneBy({ nome: data.nome });
        if (existente) throw new Error("Já existe uma categoria com esse nome");

        const categoria = this.repository.create({
            nome: data.nome,
            descricao: data.descricao || null,
        });
        return this.repository.save(categoria);
    }

    async update(id: number, data: { nome?: string; descricao?: string | null }) {
        const categoria = await this.getById(id);

        if (data.nome && data.nome !== categoria.nome) {
            const existente = await this.repository.findOneBy({ nome: data.nome });
            if (existente) throw new Error("Já existe uma categoria com esse nome");
        }

        this.repository.merge(categoria, data);
        return this.repository.save(categoria);
    }

    async delete(id: number) {
        const categoria = await this.repository.findOne({
            where: { id },
            relations: ["problemas"],
        });

        if (!categoria) throw new Error("Categoria não encontrada");
        if (categoria.problemas?.length) {
            throw new Error("Não é possível excluir uma categoria que já está sendo usada em relatórios");
        }

        await this.repository.remove(categoria);
    }
}
