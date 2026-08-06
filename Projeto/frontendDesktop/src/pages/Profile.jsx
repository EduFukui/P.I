import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    UserIcon,
    EnvelopeIcon,
    PhoneIcon,
    IdentificationIcon,
    LockClosedIcon,
    TrashIcon,
    ArrowLeftIcon,
} from "@heroicons/react/24/outline";

import Sidebar from "../components/SideBar";
import TopBar from "../components/TopBar";


function getToken() {
    return localStorage.getItem("token");
}

function getUser() {
    const user = localStorage.getItem("user");

    if (!user) {
        return null;
    }

    try {
        return JSON.parse(user);
    } catch {
        return null;
    }
}

function isAuthenticated() {
    return !!getToken();
}

function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
}


export default function Profile() {

    const navigate = useNavigate();

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [loading, setLoading] = useState(true);

    const storedUser = getUser();

    const [form, setForm] = useState({
        nomeCompleto: "",
        cpf: "",
        telefone: "",
        email: "",
        senha: "",
        confirmarSenha: "",
    });


    useEffect(() => {

        async function loadUser() {

            if (!storedUser?.id) {
                setLoading(false);
                return;
            }

            try {

                const token = getToken();

                const response = await fetch(
                    `http://localhost:3000/user/${storedUser.id}`,
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(
                        data.message || "Erro ao buscar usuário"
                    );
                }

                const usuario =
                    data.usuario ||
                    data.user ||
                    data;

                setForm({
                    nomeCompleto: usuario.nomeCompleto || "",
                    cpf: usuario.cpf || "",
                    telefone: usuario.telefone || "",
                    email: usuario.email || "",
                    senha: "",
                    confirmarSenha: "",
                });

                localStorage.setItem(
                    "user",
                    JSON.stringify(usuario)
                );

            } catch (error) {

                console.error(error);

                alert(error.message);

            } finally {

                setLoading(false);

            }
        }

        loadUser();

    }, []);


    function handleChange(e) {

        const { name, value } = e.target;

        setForm((old) => ({
            ...old,
            [name]: value,
        }));
    }


    async function handleSubmit(e) {

        e.preventDefault();

        if (form.senha !== form.confirmarSenha) {
            alert("As senhas não coincidem.");
            return;
        }

        if (!storedUser?.id) {
            alert("Usuário não encontrado.");
            return;
        }

        try {

            const token = getToken();

            const body = {
                nomeCompleto: form.nomeCompleto,
                cpf: form.cpf.replace(/\D/g, ""),
                telefone: form.telefone.replace(/\D/g, ""),
                email: form.email,
            };

            if (form.senha.trim() !== "") {
                body.senha = form.senha;
            }

            if (form.nomeCompleto.trim().length < 3) {
                alert("O nome deve ter pelo menos 3 caracteres.");
                return;
            }

            const cpf = form.cpf.replace(/\D/g, "");

            if (cpf.length !== 11) {
                alert("CPF deve conter exatamente 11 números.");
                return;
            }

            const telefone = form.telefone.replace(/\D/g, "");

            if (telefone.length < 10 || telefone.length > 15) {
                alert("Telefone deve conter entre 10 e 15 números.");
                return;
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!emailRegex.test(form.email)) {
                alert("E-mail inválido.");
                return;
            }

            if (form.senha && form.senha.length < 6) {
                alert("A senha deve ter pelo menos 6 caracteres.");
                return;
            }

            const response = await fetch(
                `http://localhost:3000/user/update/${storedUser.id}`,
                {
                    method: "PUT",

                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },

                    body: JSON.stringify(body),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message || "Erro ao atualizar usuário"
                );
            }

            const usuarioAtualizado =
                data.usuario ||
                data.user ||
                data;

            const novoUsuario = {
                ...storedUser,
                ...usuarioAtualizado,
                nomeCompleto: form.nomeCompleto,
                cpf: body.cpf,
                telefone: body.telefone,
                email: form.email,
            };

            localStorage.setItem(
                "user",
                JSON.stringify(novoUsuario)
            );

            setForm((old) => ({
                ...old,
                senha: "",
                confirmarSenha: "",
            }));

            alert("Usuário atualizado com sucesso!");

        } catch (error) {

            console.error(error);

            alert(error.message);
        }
    }


    async function handleDelete() {

        const confirmar = window.confirm(
            "Tem certeza que deseja excluir sua conta?"
        );

        if (!confirmar) {
            return;
        }

        if (!storedUser?.id) {
            alert("Usuário não encontrado.");
            return;
        }

        try {

            const token = getToken();

            const response = await fetch(
                `http://localhost:3000/user/delete/${storedUser.id}`,
                {
                    method: "DELETE",

                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            let data = {};

            try {
                data = await response.json();
            } catch {
                data = {};
            }

            if (!response.ok) {
                throw new Error(
                    data.message || "Erro ao excluir usuário"
                );
            }

            logout();

            alert("Conta excluída com sucesso!");

            navigate("/login");

        } catch (error) {

            console.error(error);

            alert(error.message);
        }
    }


    function handleLogout() {

        logout();

        navigate("/login");
    }


    if (loading) {

        return (
            <div className="flex min-h-screen items-center justify-center bg-[#111111] text-white">

                <p className="text-gray-400">
                    Carregando usuário...
                </p>

            </div>
        );
    }


    return (

        <div className="min-h-screen bg-[#111111] text-white">

            <Sidebar
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
            />

            <main className="min-h-screen p-8">

                <TopBar
                    setSidebarOpen={setSidebarOpen}
                />


                <div className="mb-8 flex items-center justify-between">

                    <div>

                        <h1 className="text-3xl font-bold">
                            Meu Perfil
                        </h1>

                        <p className="mt-2 text-gray-400">
                            Gerencie suas informações pessoais e sua conta.
                        </p>

                    </div>

                    <button
                        type="button"
                        onClick={() => navigate("/dashboard")}
                        className="flex items-center gap-2 rounded-xl border border-[#333333] px-4 py-3 text-gray-300 transition hover:bg-[#252525] hover:text-white"
                    >

                        <ArrowLeftIcon className="h-5 w-5" />

                        Voltar

                    </button>

                </div>


                <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-6 xl:grid-cols-3">


                    <div className="rounded-2xl border border-[#2a2a2a] bg-[#181818] p-6">

                        <div className="flex flex-col items-center text-center">

                            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-lime-400 text-4xl font-bold text-black">

                                {form.nomeCompleto
                                    ? form.nomeCompleto
                                        .charAt(0)
                                        .toUpperCase()
                                    : "U"}

                            </div>


                            <h2 className="mt-5 text-xl font-bold">

                                {form.nomeCompleto || "Usuário"}

                            </h2>


                            <p className="mt-1 break-all text-sm text-gray-500">

                                {form.email || "Sem e-mail"}

                            </p>


                            <span className="mt-4 rounded-full bg-lime-400/10 px-4 py-2 text-sm font-semibold uppercase text-lime-400">

                                {storedUser?.funcao || "usuario"}

                            </span>

                        </div>


                        <div className="mt-8 border-t border-[#2a2a2a] pt-6">

                            <p className="text-xs uppercase tracking-wider text-gray-500">
                                ID do usuário
                            </p>

                            <p className="mt-2 font-semibold">
                                #{storedUser?.id || "—"}
                            </p>

                        </div>

                    </div>


                    <div className="rounded-2xl border border-[#2a2a2a] bg-[#181818] p-8 xl:col-span-2">

                        <h2 className="text-xl font-bold">
                            Informações pessoais
                        </h2>

                        <p className="mt-1 text-sm text-gray-500">
                            Atualize seus dados pessoais.
                        </p>


                        <form
                            onSubmit={handleSubmit}
                            className="mt-8 space-y-6"
                        >

                            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">


                                <div>

                                    <label className="mb-2 block text-sm font-semibold">
                                        Nome completo
                                    </label>

                                    <div className="relative">

                                        <UserIcon className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500" />

                                        <input
                                            name="nomeCompleto"
                                            value={form.nomeCompleto}
                                            onChange={handleChange}
                                            className="w-full rounded-xl border border-[#333333] bg-[#252525] py-3 pl-12 pr-4 text-white outline-none focus:border-lime-400"
                                        />

                                    </div>

                                </div>


                                <div>

                                    <label className="mb-2 block text-sm font-semibold">
                                        CPF
                                    </label>

                                    <div className="relative">

                                        <IdentificationIcon className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500" />

                                        <input
                                            name="cpf"
                                            value={form.cpf}
                                            onChange={handleChange}
                                            className="w-full rounded-xl border border-[#333333] bg-[#252525] py-3 pl-12 pr-4 text-white outline-none focus:border-lime-400"
                                        />

                                    </div>

                                </div>


                                <div>

                                    <label className="mb-2 block text-sm font-semibold">
                                        Telefone
                                    </label>

                                    <div className="relative">

                                        <PhoneIcon className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500" />

                                        <input
                                            name="telefone"
                                            value={form.telefone}
                                            onChange={handleChange}
                                            className="w-full rounded-xl border border-[#333333] bg-[#252525] py-3 pl-12 pr-4 text-white outline-none focus:border-lime-400"
                                        />

                                    </div>

                                </div>


                                <div>

                                    <label className="mb-2 block text-sm font-semibold">
                                        E-mail
                                    </label>

                                    <div className="relative">

                                        <EnvelopeIcon className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500" />

                                        <input
                                            name="email"
                                            type="email"
                                            value={form.email}
                                            onChange={handleChange}
                                            className="w-full rounded-xl border border-[#333333] bg-[#252525] py-3 pl-12 pr-4 text-white outline-none focus:border-lime-400"
                                        />

                                    </div>

                                </div>

                            </div>


                            <div className="border-t border-[#2a2a2a] pt-6">

                                <h3 className="font-bold">
                                    Alterar senha
                                </h3>

                                <p className="mt-1 text-sm text-gray-500">
                                    Deixe vazio caso não queira alterar sua senha.
                                </p>


                                <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">


                                    <div>

                                        <label className="mb-2 block text-sm font-semibold">
                                            Nova senha
                                        </label>

                                        <div className="relative">

                                            <LockClosedIcon className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500" />

                                            <input
                                                name="senha"
                                                type="password"
                                                value={form.senha}
                                                onChange={handleChange}
                                                className="w-full rounded-xl border border-[#333333] bg-[#252525] py-3 pl-12 pr-4 text-white outline-none focus:border-lime-400"
                                            />

                                        </div>

                                    </div>


                                    <div>

                                        <label className="mb-2 block text-sm font-semibold">
                                            Confirmar senha
                                        </label>

                                        <div className="relative">

                                            <LockClosedIcon className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500" />

                                            <input
                                                name="confirmarSenha"
                                                type="password"
                                                value={form.confirmarSenha}
                                                onChange={handleChange}
                                                className="w-full rounded-xl border border-[#333333] bg-[#252525] py-3 pl-12 pr-4 text-white outline-none focus:border-lime-400"
                                            />

                                        </div>

                                    </div>

                                </div>

                            </div>


                            <div className="flex flex-wrap justify-end gap-4 border-t border-[#2a2a2a] pt-6">

                                <button
                                    type="button"
                                    onClick={handleLogout}
                                    className="rounded-xl border border-[#333333] px-6 py-3 font-semibold text-gray-300"
                                >
                                    Sair
                                </button>


                                <button
                                    type="submit"
                                    className="rounded-xl bg-lime-400 px-8 py-3 font-bold text-black"
                                >
                                    Salvar alterações
                                </button>

                            </div>

                        </form>

                    </div>

                </div>


                <div className="mx-auto mt-6 w-full max-w-7xl rounded-2xl border border-red-500/20 bg-[#181818] p-6">

                    <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

                        <div>

                            <h2 className="font-bold text-red-400">
                                Excluir conta
                            </h2>

                            <p className="mt-1 text-sm text-gray-500">
                                A exclusão da conta é permanente e não poderá ser desfeita.
                            </p>

                        </div>


                        <button
                            type="button"
                            onClick={handleDelete}
                            className="flex items-center gap-2 rounded-xl border border-red-500 px-5 py-3 font-semibold text-red-400"
                        >

                            <TrashIcon className="h-5 w-5" />

                            Excluir conta

                        </button>

                    </div>

                </div>

            </main>

        </div>
    );
}