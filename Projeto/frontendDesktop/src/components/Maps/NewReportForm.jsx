import { useEffect, useState } from "react";

const API_URL = "http://localhost:3000";

const initialForm = {
    nome: "",
    categoriaId: "",
    prioridade: "Média",
    descricao: "",
    cep: "",
    numero: "",
    complemento: "",
    bairro: "",
    cidade: "São Leopoldo",
    estado: "RS",
    pais: "Brasil",
};

function fileToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(String(reader.result));
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

export default function NewReportForm({
    markerPosition,
    setMarkerPosition,
    setNewReport,
    onReportCreated,
}) {
    const [form, setForm] = useState(initialForm);
    const [categorias, setCategorias] = useState([]);
    const [imagens, setImagens] = useState([]);
    const [sending, setSending] = useState(false);
    const [loadingCategories, setLoadingCategories] = useState(true);

    useEffect(() => {
        async function loadCategories() {
            try {
                const response = await fetch(`${API_URL}/category/list`);
                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.message || "Erro ao carregar categorias");
                }

                const lista = Array.isArray(data) ? data : [];
                setCategorias(lista);

                if (lista.length) {
                    setForm((old) => ({
                        ...old,
                        categoriaId: String(lista[0].id),
                    }));
                }
            } catch (error) {
                console.error("Erro ao carregar categorias:", error);
            } finally {
                setLoadingCategories(false);
            }
        }

        loadCategories();
    }, []);

    function handleChange(e) {
        const { name, value } = e.target;
        setForm((old) => ({ ...old, [name]: value }));
    }

    function handleImages(e) {
        const files = Array.from(e.target.files || []);

        if (files.length > 3) {
            alert("Você pode enviar no máximo 3 imagens.");
            e.target.value = "";
            return;
        }

        const invalid = files.find((file) => !file.type.startsWith("image/"));
        if (invalid) {
            alert("Selecione somente arquivos de imagem.");
            e.target.value = "";
            return;
        }

        const tooLarge = files.find((file) => file.size > 5 * 1024 * 1024);
        if (tooLarge) {
            alert(`A imagem ${tooLarge.name} ultrapassa 5 MB.`);
            e.target.value = "";
            return;
        }

        setImagens(files);
    }

    function closeNewReport() {
        setNewReport(false);
        setMarkerPosition(null);
        setForm(initialForm);
        setImagens([]);
    }

    async function handleSubmit(e) {
        e.preventDefault();

        if (!markerPosition) {
            alert("Clique no mapa para marcar o local da ocorrência.");
            return;
        }

        if (!form.categoriaId) {
            alert("Selecione uma categoria.");
            return;
        }

        const cep = form.cep.replace(/\D/g, "");
        if (cep.length !== 8) {
            alert("CEP deve conter exatamente 8 números.");
            return;
        }

        const token = localStorage.getItem("token");
        if (!token) {
            alert("Você precisa estar logado para criar um relatório.");
            return;
        }

        try {
            setSending(true);

            const imagensPayload = await Promise.all(
                imagens.map(async (file) => ({
                    nome: file.name,
                    tipo: file.type,
                    base64: await fileToBase64(file),
                }))
            );

            const response = await fetch(`${API_URL}/report/create`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    nome: form.nome.trim(),
                    categoriaId: Number(form.categoriaId),
                    prioridade: form.prioridade,
                    descricao: form.descricao.trim(),
                    endereco: {
                        cep,
                        numero: form.numero.trim(),
                        complemento: form.complemento.trim(),
                        bairro: form.bairro.trim(),
                        cidade: form.cidade.trim(),
                        estado: form.estado.trim().toUpperCase(),
                        pais: form.pais.trim(),
                        latitude: markerPosition[0],
                        longitude: markerPosition[1],
                    },
                    imagens: imagensPayload,
                }),
            });

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || "Erro ao criar relatório");
            }

            onReportCreated(data.data);
            setForm(initialForm);
            setImagens([]);
            alert("Relatório criado com sucesso!");
        } catch (error) {
            console.error("Erro ao criar relatório:", error);
            alert(error.message);
        } finally {
            setSending(false);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="p-6">
            <div className="mb-6">
                <p className="text-sm font-semibold uppercase tracking-widest text-lime-400">
                    Novo relatório
                </p>
                <h2 className="mt-2 text-2xl font-bold">Registrar ocorrência</h2>
                <p className="mt-2 text-sm text-gray-400">
                    O problema, endereço e imagens serão salvos junto ao relatório.
                </p>
            </div>

            <div className="space-y-4">
                <div>
                    <label className="mb-2 block text-sm font-semibold">Título</label>
                    <input
                        name="nome"
                        value={form.nome}
                        onChange={handleChange}
                        minLength={3}
                        maxLength={100}
                        required
                        placeholder="Ex.: Buraco na rua"
                        className="w-full rounded-xl border border-[#333] bg-[#252525] px-4 py-3 outline-none focus:border-lime-400"
                    />
                </div>

                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <label className="mb-2 block text-sm font-semibold">Categoria</label>
                        <select
                            name="categoriaId"
                            value={form.categoriaId}
                            onChange={handleChange}
                            required
                            disabled={loadingCategories || !categorias.length}
                            className="w-full rounded-xl border border-[#333] bg-[#252525] px-3 py-3 outline-none focus:border-lime-400 disabled:opacity-60"
                        >
                            {!categorias.length && (
                                <option value="">
                                    {loadingCategories ? "Carregando..." : "Nenhuma categoria"}
                                </option>
                            )}
                            {categorias.map((categoria) => (
                                <option key={categoria.id} value={categoria.id}>
                                    {categoria.nome}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-semibold">Prioridade</label>
                        <select
                            name="prioridade"
                            value={form.prioridade}
                            onChange={handleChange}
                            className="w-full rounded-xl border border-[#333] bg-[#252525] px-3 py-3 outline-none focus:border-lime-400"
                        >
                            <option>Baixa</option>
                            <option>Média</option>
                            <option>Alta</option>
                            <option>Urgente</option>
                        </select>
                    </div>
                </div>

                <div>
                    <label className="mb-2 block text-sm font-semibold">Descrição</label>
                    <textarea
                        name="descricao"
                        value={form.descricao}
                        onChange={handleChange}
                        minLength={10}
                        required
                        rows={4}
                        placeholder="Descreva o problema encontrado..."
                        className="w-full resize-none rounded-xl border border-[#333] bg-[#252525] px-4 py-3 outline-none focus:border-lime-400"
                    />
                </div>

                <div>
                    <label className="mb-2 block text-sm font-semibold">Imagens</label>
                    <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleImages}
                        className="w-full rounded-xl border border-[#333] bg-[#252525] px-3 py-3 text-sm text-gray-300 file:mr-3 file:rounded-lg file:border-0 file:bg-lime-400 file:px-3 file:py-2 file:font-semibold file:text-black"
                    />
                    <p className="mt-2 text-xs text-gray-500">Até 3 imagens, máximo de 5 MB cada.</p>
                    {imagens.length > 0 && (
                        <div className="mt-2 space-y-1 text-xs text-gray-400">
                            {imagens.map((file) => (
                                <p key={`${file.name}-${file.size}`}>• {file.name}</p>
                            ))}
                        </div>
                    )}
                </div>

                <div className="border-t border-[#333] pt-5">
                    <h3 className="mb-4 font-bold">Endereço</h3>

                    <div className="grid grid-cols-2 gap-3">
                        <input
                            name="cep"
                            value={form.cep}
                            onChange={(e) => {
                                const value = e.target.value.replace(/\D/g, "").slice(0, 8);
                                setForm((old) => ({ ...old, cep: value }));
                            }}
                            required
                            placeholder="CEP"
                            className="rounded-xl border border-[#333] bg-[#252525] px-4 py-3 outline-none focus:border-lime-400"
                        />
                        <input
                            name="numero"
                            value={form.numero}
                            onChange={handleChange}
                            maxLength={10}
                            required
                            placeholder="Número"
                            className="rounded-xl border border-[#333] bg-[#252525] px-4 py-3 outline-none focus:border-lime-400"
                        />
                    </div>

                    <input
                        name="complemento"
                        value={form.complemento}
                        onChange={handleChange}
                        maxLength={100}
                        placeholder="Complemento (opcional)"
                        className="mt-3 w-full rounded-xl border border-[#333] bg-[#252525] px-4 py-3 outline-none focus:border-lime-400"
                    />
                    <input
                        name="bairro"
                        value={form.bairro}
                        onChange={handleChange}
                        required
                        placeholder="Bairro"
                        className="mt-3 w-full rounded-xl border border-[#333] bg-[#252525] px-4 py-3 outline-none focus:border-lime-400"
                    />
                    <input
                        name="cidade"
                        value={form.cidade}
                        onChange={handleChange}
                        required
                        placeholder="Cidade"
                        className="mt-3 w-full rounded-xl border border-[#333] bg-[#252525] px-4 py-3 outline-none focus:border-lime-400"
                    />

                    <div className="mt-3 grid grid-cols-[90px_1fr] gap-3">
                        <input
                            name="estado"
                            value={form.estado}
                            onChange={handleChange}
                            required
                            maxLength={2}
                            placeholder="UF"
                            className="rounded-xl border border-[#333] bg-[#252525] px-4 py-3 uppercase outline-none focus:border-lime-400"
                        />
                        <input
                            name="pais"
                            value={form.pais}
                            onChange={handleChange}
                            required
                            placeholder="País"
                            className="rounded-xl border border-[#333] bg-[#252525] px-4 py-3 outline-none focus:border-lime-400"
                        />
                    </div>
                </div>

                <div className="rounded-xl border border-[#333] bg-[#252525] p-4">
                    <p className="text-xs uppercase text-gray-500">Local marcado</p>
                    {markerPosition ? (
                        <p className="mt-2 text-sm font-semibold text-lime-400">
                            {markerPosition[0].toFixed(6)}, {markerPosition[1].toFixed(6)}
                        </p>
                    ) : (
                        <p className="mt-2 text-sm text-yellow-400">Clique no mapa para selecionar</p>
                    )}
                </div>
            </div>

            <div className="mt-6 space-y-3">
                <button
                    type="submit"
                    disabled={sending || !categorias.length}
                    className="w-full rounded-xl bg-lime-400 py-4 font-bold text-black transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {sending ? "Enviando..." : "Enviar relatório"}
                </button>
                <button
                    type="button"
                    onClick={closeNewReport}
                    disabled={sending}
                    className="w-full rounded-xl border border-[#444] py-4 font-semibold text-gray-300 hover:bg-[#252525]"
                >
                    Cancelar
                </button>
            </div>
        </form>
    );
}
