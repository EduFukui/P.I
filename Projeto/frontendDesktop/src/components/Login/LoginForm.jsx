import { useState } from "react";
import { EnvelopeIcon } from "@heroicons/react/24/outline";

import Logo from "../Register/Logo";
import InputField from "../Register/InputField";
import PasswordField from "../Register/PasswordField";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {

    const navigate = useNavigate();

    const [form, setForm] = useState({
        email: "",
        senha: "",
    });

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");

    function handleChange(e) {

        const { name, value } = e.target;

        setForm((old) => ({
            ...old,
            [name]: value,
        }));

        // Remove erro quando usuário começar a corrigir
        if (error) {
            setError("");
        }
    }

    async function handleSubmit(e) {

        e.preventDefault();

        setError("");

        // Validação
        if (!form.email.trim()) {
            setError("Digite seu e-mail.");
            return;
        }

        if (!form.senha) {
            setError("Digite sua senha.");
            return;
        }

        try {

            setLoading(true);

            const response = await fetch(
                "http://localhost:3000/auth/login",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json",
                    },

                    body: JSON.stringify({
                        email: form.email.trim(),
                        senha: form.senha,
                    }),
                }
            );

            const data = await response.json();

            // Login recusado pelo backend
            if (!response.ok) {

                throw new Error(
                    data.message ||
                    "E-mail ou senha inválidos."
                );
            }

            // Verifica se o backend realmente enviou o token
            if (!data.token) {
                throw new Error(
                    "O servidor não retornou o token de acesso."
                );
            }

            // Salva JWT
            localStorage.setItem(
                "token",
                data.token
            );

            // Salva usuário
            if (data.user) {

                localStorage.setItem(
                    "user",
                    JSON.stringify(data.user)
                );
            }

            console.log("Login realizado:", data.user);

            // Vai para o Dashboard
            navigate("/dashboard");

        } catch (error) {

            console.error("Erro no login:", error);

            setError(
                error.message ||
                "Não foi possível realizar o login."
            );

        } finally {

            setLoading(false);
        }
    }

    return (

        <section className="flex w-full items-center justify-center bg-[#131313] px-6 py-12 lg:w-1/2">

            <div className="w-full max-w-md">

                <div className="mb-10 lg:hidden">
                    <Logo />
                </div>

                <h2 className="text-4xl font-bold text-white">
                    Bem-vindo
                </h2>

                <p className="mt-2 text-gray-400">
                    Entre para acessar o sistema.
                </p>

                <form
                    onSubmit={handleSubmit}
                    className="mt-10 space-y-6"
                >

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

                    {/* Lembrar / Esqueci senha */}

                    <div className="flex items-center justify-between">

                        <label className="flex items-center gap-2 text-sm text-gray-400">

                            <input
                                type="checkbox"
                                className="accent-lime-400"
                            />

                            Lembrar-me

                        </label>

                        <button
                            type="button"
                            className="text-sm text-lime-400 hover:underline"
                        >
                            Esqueci minha senha
                        </button>

                    </div>

                    {/* Erro */}

                    {error && (

                        <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                            {error}
                        </div>

                    )}

                    {/* Entrar */}

                    <button
                        type="submit"
                        disabled={loading}
                        className="
                            w-full
                            rounded-xl
                            bg-lime-400
                            py-4
                            font-bold
                            text-black
                            transition
                            hover:brightness-110
                            disabled:cursor-not-allowed
                            disabled:opacity-50
                        "
                    >

                        {loading
                            ? "Entrando..."
                            : "Entrar"
                        }

                    </button>

                </form>

                {/* Cadastro */}

                <p className="mt-8 text-center text-gray-400">

                    Ainda não possui uma conta?

                    <button
                        type="button"
                        className="ml-2 font-semibold text-lime-400 hover:underline"
                        onClick={() => navigate("/register")}
                    >
                        Criar conta
                    </button>

                </p>

            </div>

        </section>

    );
}
