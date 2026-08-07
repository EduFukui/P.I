import { AppDataSource } from "../config/data-source";
import { Relatorios } from "../models/Relatorios";
import { Usuarios } from "../models/Usuarios";
import { Problemas } from "../models/Problemas";
import { Enderecos } from "../models/Enderecos";
import { Categorias } from "../models/Categorias";
import { Imagens } from "../models/Imagens";

export type CreateRelatorioData = {
    nome: string;
    categoriaId: number;
    prioridade: "Baixa" | "Média" | "Alta" | "Urgente";
    descricao: string;
    endereco: {
        cep: string;
        numero: string;
        complemento?: string;
        cidade: string;
        bairro: string;
        estado: string;
        pais: string;
        latitude: number;
        longitude: number;
    };
    imagens?: Array<{ nome: string; tipo: string; base64: string }>;
};

export type UpdateRelatorioData = Partial<Omit<CreateRelatorioData, "imagens" | "endereco">> & {
    status?: "Pendente" | "Em Andamento" | "Resolvido";
    endereco?: Partial<CreateRelatorioData["endereco"]>;
};

export class RelatorioService {
    private repoRelatorio = AppDataSource.getRepository(Relatorios);
    private repoImagem = AppDataSource.getRepository(Imagens);

    private relations = ["usuario", "problema", "problema.categoria", "endereco"];

    async list() {
        const relatorios = await this.repoRelatorio.find({
            relations: this.relations,
            order: { id: "DESC" },
        });

        const imageRows = await this.repoImagem
            .createQueryBuilder("imagem")
            .leftJoin("imagem.relatorio", "relatorio")
            .select("imagem.id", "id")
            .addSelect("imagem.nome", "nome")
            .addSelect("imagem.tipo", "tipo")
            .addSelect("relatorio.id", "relatorioId")
            .getRawMany();

        return relatorios.map((relatorio) => ({
            ...relatorio,
            imagens: imageRows
                .filter((imagem: any) => Number(imagem.relatorioId) === relatorio.id)
                .map((imagem: any) => ({
                    id: Number(imagem.id),
                    nome: imagem.nome,
                    tipo: imagem.tipo,
                })),
        }));
    }

    async getById(id: number) {
        const relatorio = await this.repoRelatorio.findOne({
            where: { id },
            relations: [...this.relations, "imagens"],
        });

        if (!relatorio) throw new Error("Relatório não encontrado");

        return {
            ...relatorio,
            imagens: (relatorio.imagens || []).map((imagem) => ({
                id: imagem.id,
                nome: imagem.nome,
                tipo: imagem.tipo,
            })),
        };
    }

    async getImage(id: number) {
        const imagem = await this.repoImagem.findOneBy({ id });
        if (!imagem) throw new Error("Imagem não encontrada");
        return imagem;
    }

    async create(usuarioId: number, data: CreateRelatorioData) {
        return AppDataSource.transaction(async (manager) => {
            const usuario = await manager.findOneBy(Usuarios, { id: usuarioId });
            if (!usuario) throw new Error("Usuário não encontrado");

            const categoria = await manager.findOneBy(Categorias, { id: data.categoriaId });
            if (!categoria) throw new Error("Categoria não encontrada. Selecione uma categoria cadastrada no sistema");

            let endereco = manager.create(Enderecos, {
                ...data.endereco,
                complemento: data.endereco.complemento || "",
            });
            endereco = await manager.save(Enderecos, endereco);

            let problema = manager.create(Problemas, {
                nome: data.nome,
                prioridade: data.prioridade,
                descricao: data.descricao,
                categoria,
                comentarioResolucao: null,
                avaliacaoUsuario: null,
                dataHoraResolucao: null,
                responsavelResolucao: null,
            });
            problema = await manager.save(Problemas, problema);

            let relatorio = manager.create(Relatorios, {
                status: "Pendente",
                descricao: data.descricao,
                dataRelatorio: new Date(),
                usuario,
                problema,
                endereco,
            });
            relatorio = await manager.save(Relatorios, relatorio);

            for (const arquivo of data.imagens || []) {
                const base64 = arquivo.base64.replace(/^data:[^;]+;base64,/, "");
                const buffer = Buffer.from(base64, "base64");

                if (buffer.length > 5 * 1024 * 1024) {
                    throw new Error(`A imagem ${arquivo.nome} ultrapassa o limite de 5 MB`);
                }

                const imagem = manager.create(Imagens, {
                    nome: arquivo.nome,
                    tipo: arquivo.tipo,
                    imagem: buffer,
                    relatorio,
                });
                await manager.save(Imagens, imagem);
            }

            const criado = await manager.findOne(Relatorios, {
                where: { id: relatorio.id },
                relations: ["usuario", "problema", "problema.categoria", "endereco", "imagens"],
            });

            if (!criado) throw new Error("Não foi possível carregar o relatório criado");

            return {
                ...criado,
                imagens: (criado.imagens || []).map((imagem) => ({
                    id: imagem.id,
                    nome: imagem.nome,
                    tipo: imagem.tipo,
                })),
            };
        });
    }

    async update(id: number, usuarioId: number, funcao: string, data: UpdateRelatorioData) {
        const relatorio = await this.repoRelatorio.findOne({
            where: { id },
            relations: ["usuario", "problema", "problema.categoria", "endereco"],
        });

        if (!relatorio) throw new Error("Relatório não encontrado");
        if (funcao !== "admin" && relatorio.usuario.id !== usuarioId) {
            throw new Error("Você não pode alterar este relatório");
        }

        if (data.categoriaId) {
            const categoria = await AppDataSource.getRepository(Categorias).findOneBy({ id: data.categoriaId });
            if (!categoria) throw new Error("Categoria não encontrada");
            relatorio.problema.categoria = categoria;
        }

        if (data.nome !== undefined) relatorio.problema.nome = data.nome;
        if (data.prioridade !== undefined) relatorio.problema.prioridade = data.prioridade;
        if (data.descricao !== undefined) {
            relatorio.descricao = data.descricao;
            relatorio.problema.descricao = data.descricao;
        }
        if (data.status !== undefined) {
            if (funcao !== "admin") throw new Error("Apenas administradores podem alterar o status");
            relatorio.status = data.status;
        }
        if (data.endereco) Object.assign(relatorio.endereco, data.endereco);

        await AppDataSource.getRepository(Problemas).save(relatorio.problema);
        await AppDataSource.getRepository(Enderecos).save(relatorio.endereco);
        await this.repoRelatorio.save(relatorio);

        return this.getById(id);
    }

    async addImages(id: number, usuarioId: number, funcao: string, imagens: Array<{ nome: string; tipo: string; base64: string }>) {
        const relatorio = await this.repoRelatorio.findOne({ where: { id }, relations: ["usuario", "imagens"] });
        if (!relatorio) throw new Error("Relatório não encontrado");
        if (funcao !== "admin" && relatorio.usuario.id !== usuarioId) throw new Error("Você não pode alterar este relatório");

        const total = (relatorio.imagens?.length || 0) + imagens.length;
        if (total > 3) throw new Error("Cada relatório pode ter no máximo 3 imagens");

        for (const arquivo of imagens) {
            const base64 = arquivo.base64.replace(/^data:[^;]+;base64,/, "");
            const buffer = Buffer.from(base64, "base64");
            if (buffer.length > 5 * 1024 * 1024) throw new Error(`A imagem ${arquivo.nome} ultrapassa 5 MB`);
            await this.repoImagem.save(this.repoImagem.create({
                nome: arquivo.nome,
                tipo: arquivo.tipo,
                imagem: buffer,
                relatorio,
            }));
        }

        return this.getById(id);
    }

    async delete(id: number, usuarioId: number, funcao: string) {
        const relatorio = await this.repoRelatorio.findOne({
            where: { id },
            relations: ["usuario", "problema", "endereco", "imagens"],
        });

        if (!relatorio) throw new Error("Relatório não encontrado");
        if (funcao !== "admin" && relatorio.usuario.id !== usuarioId) {
            throw new Error("Você não pode excluir este relatório");
        }

        await AppDataSource.transaction(async (manager) => {
            if (relatorio.imagens?.length) await manager.remove(Imagens, relatorio.imagens);
            await manager.remove(Relatorios, relatorio);
            await manager.remove(Problemas, relatorio.problema);
            await manager.remove(Enderecos, relatorio.endereco);
        });
    }
}
