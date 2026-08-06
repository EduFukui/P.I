import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../Logo";
import Form from "./Form";

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

                <Form
                    form={form}
                    error={error}
                    loading={loading}
                    onChange={handleChange}
                    onSubmit={handleSubmit}
                />

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
