import { useState } from "react";

const API_URL = "http://localhost:3000";

const initialForm = {
    nome: "",
    categoria: "Pavimentação",
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

function SidePainel({
    selectedReport,
    setSelectedReport,
    newReport,
    setNewReport,
    markerPosition,
    setMarkerPosition,
    onReportCreated,
}) {
    const [form, setForm] = useState(initialForm);
    const [sending, setSending] = useState(false);

    function handleChange(e) {
        const { name, value } = e.target;

        setForm((old) => ({
            ...old,
            [name]: value,
        }));
    }

    function closeNewReport() {
        setNewReport(false);
        setMarkerPosition(null);
        setForm(initialForm);
    }

    async function handleCreateReport(e) {
        e.preventDefault();

        if (!markerPosition) {
            alert("Clique no mapa para marcar o local da ocorrência.");
            return;
        }

        const cep = form.cep.replace(/\D/g, "");

        if (cep.length !== 8) {
            alert("CEP deve conter exatamente 8 números.");
            return;
        }

        if (form.descricao.trim().length < 10) {
            alert("A descrição deve ter pelo menos 10 caracteres.");
            return;
        }

        const token = localStorage.getItem("token");

        if (!token) {
            alert("Você precisa estar logado para criar um relatório.");
            return;
        }

        try {
            setSending(true);

            const response = await fetch(`${API_URL}/report/create`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    nome: form.nome.trim(),
                    categoria: form.categoria,
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
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Erro ao criar relatório");
            }

            setForm(initialForm);
            onReportCreated(data.data);
            alert("Relatório criado com sucesso!");
        } catch (error) {
            console.error("Erro ao criar relatório:", error);
            alert(error.message);
        } finally {
            setSending(false);
        }
    }

    return (
        <aside className="w-[380px] shrink-0 overflow-y-auto border-l border-[#2a2a2a] bg-[#1b1b1b]">
            {!selectedReport && !newReport && (
                <div className="flex h-full items-center justify-center p-8 text-center">
                    <div>
                        <h2 className="mb-3 text-2xl font-bold">
                            Nenhuma ocorrência
                        </h2>
                        <p className="text-gray-400">
                            Clique em um marcador
                            <br />
                            para visualizar os detalhes.
                        </p>
                    </div>
                </div>
            )}

            {newReport && (
                <form onSubmit={handleCreateReport} className="p-6">
                    <div className="mb-6">
                        <p className="text-sm font-semibold uppercase tracking-widest text-lime-400">
                            Novo relatório
                        </p>
                        <h2 className="mt-2 text-2xl font-bold">
                            Registrar ocorrência
                        </h2>
                        <p className="mt-2 text-sm text-gray-400">
                            Preencha os dados e clique no mapa para marcar o local.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="mb-2 block text-sm font-semibold">
                                Título
                            </label>
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
                                <label className="mb-2 block text-sm font-semibold">
                                    Categoria
                                </label>
                                <select
                                    name="categoria"
                                    value={form.categoria}
                                    onChange={handleChange}
                                    className="w-full rounded-xl border border-[#333] bg-[#252525] px-3 py-3 outline-none focus:border-lime-400"
                                >
                                    <option>Pavimentação</option>
                                    <option>Iluminação</option>
                                    <option>Limpeza Urbana</option>
                                    <option>Sinalização</option>
                                    <option>Outros</option>
                                </select>
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-semibold">
                                    Prioridade
                                </label>
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
                            <label className="mb-2 block text-sm font-semibold">
                                Descrição
                            </label>
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

                        <div className="border-t border-[#333] pt-5">
                            <h3 className="mb-4 font-bold">Endereço</h3>

                            <div className="grid grid-cols-2 gap-3">
                                <input
                                    name="cep"
                                    value={form.cep}
                                    onChange={(e) => {
                                        const value = e.target.value
                                            .replace(/\D/g, "")
                                            .slice(0, 8);
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
                            <p className="text-xs uppercase text-gray-500">
                                Local marcado
                            </p>
                            {markerPosition ? (
                                <p className="mt-2 text-sm font-semibold text-lime-400">
                                    {markerPosition[0].toFixed(6)}, {markerPosition[1].toFixed(6)}
                                </p>
                            ) : (
                                <p className="mt-2 text-sm text-yellow-400">
                                    Clique no mapa para selecionar
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="mt-6 space-y-3">
                        <button
                            type="submit"
                            disabled={sending}
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
            )}

            {selectedReport && !newReport && (
                <div className="p-6">
                    <div className="mb-6">
                        <p className="text-sm font-semibold uppercase tracking-widest text-lime-400">
                            Ocorrência
                        </p>
                        <h2 className="mt-2 text-2xl font-bold">
                            {selectedReport.title}
                        </h2>
                        <p className="mt-1 text-sm text-gray-500">
                            {selectedReport.protocol}
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="rounded-xl bg-[#252525] p-4">
                            <p className="text-xs uppercase text-gray-500">
                                Categoria
                            </p>
                            <p className="mt-2 font-semibold">
                                {selectedReport.category}
                            </p>
                        </div>

                        <div className="rounded-xl bg-[#252525] p-4">
                            <p className="text-xs uppercase text-gray-500">
                                Prioridade
                            </p>
                            <p
                                className={`mt-2 font-semibold ${
                                    selectedReport.priority === "Urgente" ||
                                    selectedReport.priority === "Alta"
                                        ? "text-red-400"
                                        : selectedReport.priority === "Média"
                                          ? "text-yellow-400"
                                          : "text-green-400"
                                }`}
                            >
                                ● {selectedReport.priority}
                            </p>
                        </div>
                    </div>

                    <div className="mt-4 rounded-xl bg-[#252525] p-4">
                        <p className="text-xs uppercase text-gray-500">
                            Status
                        </p>
                        <p className="mt-2 font-semibold text-lime-400">
                            {selectedReport.status}
                        </p>
                    </div>

                    <div className="mt-4 rounded-xl bg-[#252525] p-4">
                        <p className="text-xs uppercase text-gray-500">
                            Reportado
                        </p>
                        <p className="mt-2">{selectedReport.reported}</p>
                    </div>

                    {selectedReport.endereco && (
                        <div className="mt-4 rounded-xl bg-[#252525] p-4">
                            <p className="text-xs uppercase text-gray-500">
                                Endereço
                            </p>
                            <p className="mt-2 leading-6 text-gray-300">
                                {selectedReport.endereco.bairro} - {selectedReport.endereco.cidade}/{selectedReport.endereco.estado}
                                <br />
                                CEP {selectedReport.endereco.cep} • Nº {selectedReport.endereco.numero}
                            </p>
                        </div>
                    )}

                    <h3 className="mb-3 mt-8 text-lg font-semibold">
                        Descrição
                    </h3>
                    <p className="leading-7 text-gray-400">
                        {selectedReport.description}
                    </p>

                    <div className="mt-10">
                        <button
                            onClick={() => setSelectedReport(null)}
                            className="w-full rounded-xl border border-red-500 py-4 font-semibold text-red-400 transition hover:bg-red-500 hover:text-white"
                        >
                            Fechar
                        </button>
                    </div>
                </div>
            )}
        </aside>
    );
}

export default SidePainel;
