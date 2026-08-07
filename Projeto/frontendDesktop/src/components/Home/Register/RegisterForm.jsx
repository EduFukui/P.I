import { useState } from "react";

import {
    UserIcon,
    EnvelopeIcon,
} from "@heroicons/react/24/outline";

import InputField from "./InputField";
import PasswordField from "./PasswordField";
import SubmitButton from "./SubmitButton";
import { useNavigate } from "react-router-dom";

export default function RegisterForm() {

    const navigate = useNavigate();

    const [form, setForm] = useState({
        nomeCompleto: "",
        cpf: "",
        telefone: "",
        email: "",
        senha: "",
        confirmarSenha: "",
        funcao: "usuario",
        terms: false,
    });

    function handleChange(e) {

        const { name, value, type, checked } = e.target;

        let newValue = value;

        // Formatação do CPF
        if (name === "cpf") {

            const numbers = value
                .replace(/\D/g, "")
                .slice(0, 11);

            newValue = numbers
                .replace(/(\d{3})(\d)/, "$1.$2")
                .replace(/(\d{3})(\d)/, "$1.$2")
                .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
        }

        setForm((old) => ({
            ...old,
            [name]:
                type === "checkbox"
                    ? checked
                    : newValue,
        }));
    }

    async function handleSubmit(e) {

        e.preventDefault();

        // Verifica os termos
        if (!form.terms) {
            alert("Você precisa aceitar os Termos de Uso.");
            return;
        }

        // Verifica senha
        if (form.senha !== form.confirmarSenha) {
            alert("As senhas não coincidem.");
            return;
        }

        // Remove pontos e hífen do CPF
        const cpfNumeros = form.cpf.replace(/\D/g, "");

        // CPF precisa ter exatamente 11 números
        if (cpfNumeros.length !== 11) {
            alert("O CPF deve conter 11 números.");
            return;
        }

        const body = {

            nomeCompleto: form.nomeCompleto,

            // Envia somente os 11 números
            cpf: cpfNumeros,

            telefone: form.telefone,

            email: form.email,

            senha: form.senha,

            // Cadastro público sempre será usuário
            funcao: "usuario",
        };

        try {

            const response = await fetch(
                "http://localhost:3000/user/create",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json",
                    },

                    body: JSON.stringify(body),
                }
            );

            const data = await response.json();

            if (!response.ok) {

                throw new Error(
                    data.message ||
                    "Erro ao cadastrar usuário."
                );
            }

            alert("Usuário cadastrado com sucesso!");

            navigate("/login");

        } catch (error) {

            alert(
                error.message ||
                "Erro ao conectar com o servidor."
            );
        }
    }

    return (

        <section className="flex w-full items-center justify-center bg-[#131313] px-6 py-12 lg:w-1/2">

            <div className="w-full max-w-md">

                <h2 className="text-3xl font-bold text-lime-400">
                    Criar nova conta
                </h2>

                <p className="mt-2 text-gray-400">
                    Preencha as informações abaixo.
                </p>

                <form
                    onSubmit={handleSubmit}
                    className="mt-10 space-y-6"
                >

                    {/* Nome */}

                    <InputField
                        name="nomeCompleto"
                        label="Nome Completo"
                        icon={UserIcon}
                        placeholder="Seu nome completo"
                        value={form.nomeCompleto}
                        onChange={handleChange}
                        minLength={3}
                        maxLength={150}
                    />

                    {/* CPF */}

                    <InputField
                        name="cpf"
                        label="CPF"
                        placeholder="000.000.000-00"
                        value={form.cpf}
                        onChange={handleChange}
                        inputMode="numeric"
                        maxLength={14}
                    />

                    {/* Telefone */}

                    <InputField
                        name="telefone"
                        label="Telefone"
                        placeholder="(51) 99999-9999"
                        value={form.telefone}
                        onChange={handleChange}
                        inputMode="numeric"
                        minLength={11}
                        maxLength={15}
                    />

                    {/* E-mail */}

                    <InputField
                        name="email"
                        label="E-mail"
                        icon={EnvelopeIcon}
                        type="email"
                        placeholder="email@exemplo.com"
                        value={form.email}
                        onChange={handleChange}
                    />

                    {/* Senha */}

                    <PasswordField
                        name="senha"
                        label="Senha"
                        placeholder="********"
                        value={form.senha}
                        onChange={handleChange}
                    />

                    {/* Confirmar senha */}

                    <PasswordField
                        name="confirmarSenha"
                        label="Confirmar Senha"
                        placeholder="********"
                        value={form.confirmarSenha}
                        onChange={handleChange}
                    />

                    {/* Termos */}

                    <label className="flex items-center gap-3 text-sm text-gray-400">

                        <input
                            type="checkbox"
                            name="terms"
                            checked={form.terms}
                            onChange={handleChange}
                            className="h-4 w-4 accent-lime-400"
                        />

                        Concordo com os Termos de Uso.

                    </label>

                    {/* Botão */}

                    <SubmitButton />

                    {/* Login */}

                    <p className="text-center text-sm text-gray-400">

                        Já possui uma conta?

                        <button
                            type="button"
                            className="ml-2 font-semibold text-lime-400 hover:underline"
                            onClick={() => navigate("/login")}
                        >
                            Entrar
                        </button>

                    </p>

                </form>

            </div>

        </section>

    );
}

