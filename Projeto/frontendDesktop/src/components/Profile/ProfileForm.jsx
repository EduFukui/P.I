import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import ProfileHeader from "./ProfileHeader";
import ProfileCard from "./ProfileCard";
import ProfileFields from "./ProfileFields";
import DeleteAccount from "./DeleteAccount";

// Pega o token salvo no localStorage.
function getToken() {
    return localStorage.getItem("token");
}

// Pega o usuário salvo no localStorage.
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

// Remove os dados de autenticação do usuário.
function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
}

export default function ProfileForm() {
    const navigate = useNavigate();

    // Controla a tela de carregamento.
    const [loading, setLoading] = useState(true);

    // Guarda os dados do usuário logado.
    const [storedUser, setStoredUser] = useState(() => getUser());

    // Guarda os valores dos campos do formulário.
    const [form, setForm] = useState({
        nomeCompleto: "",
        cpf: "",
        telefone: "",
        email: "",
        senha: "",
        confirmarSenha: "",
    });

    // Busca os dados atualizados do usuário na API.
    useEffect(() => {
        async function loadUser() {
            const user = getUser();

            if (!user?.id) {
                setLoading(false);
                return;
            }

            try {
                const token = getToken();

                const response = await fetch(
                    `http://localhost:3000/user/${user.id}`,
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            ...(token && {
                                Authorization: `Bearer ${token}`,
                            }),
                        },
                    }
                );

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(
                        data.message || "Erro ao buscar usuário."
                    );
                }

                // Aceita diferentes formatos de resposta do backend.
                const usuario =
                    data.usuario ||
                    data.user ||
                    data.data ||
                    data;

                setStoredUser(usuario);

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
                console.error("Erro ao carregar usuário:", error);
                alert(error.message || "Erro ao carregar usuário.");
            } finally {
                setLoading(false);
            }
        }

        loadUser();
    }, []);

    // Atualiza os valores digitados no formulário.
    function handleChange(e) {
        const { name, value } = e.target;

        let newValue = value;

        // CPF aceita somente números e no máximo 11 dígitos.
        if (name === "cpf") {
            newValue = value.replace(/\D/g, "").slice(0, 11);
        }

        // Telefone aceita somente números e no máximo 15 dígitos.
        if (name === "telefone") {
            newValue = value.replace(/\D/g, "").slice(0, 15);
        }

        setForm((old) => ({
            ...old,
            [name]: newValue,
        }));
    }

    // Valida os campos antes de enviar para a API.
    function validateForm() {
        if (form.nomeCompleto.trim().length < 3) {
            alert("O nome deve ter pelo menos 3 caracteres.");
            return false;
        }

        const cpf = form.cpf.replace(/\D/g, "");

        if (cpf.length !== 11) {
            alert("CPF deve conter exatamente 11 números.");
            return false;
        }

        const telefone = form.telefone.replace(/\D/g, "");

        if (telefone.length < 10 || telefone.length > 15) {
            alert("Telefone deve conter entre 10 e 15 números.");
            return false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(form.email)) {
            alert("E-mail inválido.");
            return false;
        }

        if (form.senha && form.senha.length < 8) {
            alert("A senha deve ter pelo menos 8 caracteres.");
            return false;
        }

        if (form.senha !== form.confirmarSenha) {
            alert("As senhas não coincidem.");
            return false;
        }

        return true;
    }

    // Atualiza o usuário no backend.
    async function handleSubmit(e) {
        e.preventDefault();

        if (!storedUser?.id) {
            alert("Usuário não encontrado.");
            return;
        }

        if (!validateForm()) {
            return;
        }

        try {
            const token = getToken();

            const body = {
                nomeCompleto: form.nomeCompleto.trim(),
                cpf: form.cpf.replace(/\D/g, ""),
                telefone: form.telefone.replace(/\D/g, ""),
                email: form.email.trim(),
            };

            // Só envia a senha se o usuário realmente preencher o campo.
            if (form.senha.trim() !== "") {
                body.senha = form.senha;
            }

            const response = await fetch(
                `http://localhost:3000/user/update/${storedUser.id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        ...(token && {
                            Authorization: `Bearer ${token}`,
                        }),
                    },
                    body: JSON.stringify(body),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message || "Erro ao atualizar usuário."
                );
            }

            const usuarioAtualizado =
                data.usuario ||
                data.user ||
                data.data ||
                data;

            const novoUsuario = {
                ...storedUser,
                ...usuarioAtualizado,
                nomeCompleto: body.nomeCompleto,
                cpf: body.cpf,
                telefone: body.telefone,
                email: body.email,
            };

            setStoredUser(novoUsuario);

            localStorage.setItem(
                "user",
                JSON.stringify(novoUsuario)
            );

            setForm((old) => ({
                ...old,
                nomeCompleto: novoUsuario.nomeCompleto || "",
                cpf: novoUsuario.cpf || "",
                telefone: novoUsuario.telefone || "",
                email: novoUsuario.email || "",
                senha: "",
                confirmarSenha: "",
            }));

            alert("Usuário atualizado com sucesso!");
        } catch (error) {
            console.error("Erro ao atualizar usuário:", error);
            alert(error.message || "Erro ao atualizar usuário.");
        }
    }

    // Exclui a conta do usuário.
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
                        ...(token && {
                            Authorization: `Bearer ${token}`,
                        }),
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
                    data.message || "Erro ao excluir usuário."
                );
            }

            logout();
            alert("Conta excluída com sucesso!");
            navigate("/login");
        } catch (error) {
            console.error("Erro ao excluir usuário:", error);
            alert(error.message || "Erro ao excluir usuário.");
        }
    }

    // Faz logout e volta para a tela de login.
    function handleLogout() {
        logout();
        navigate("/login");
    }

    // Erros
    if (loading) {
        return (
            <div className="flex min-h-[60vh] items-center justify-center">
                <p className="text-gray-400">
                    Carregando usuário...
                </p>
            </div>
        );
    }

    return (
        <>
            <ProfileHeader />

            <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-6 xl:grid-cols-3">
                <ProfileCard
                    form={form}
                    storedUser={storedUser}
                />

                <ProfileFields
                    form={form}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    handleLogout={handleLogout}
                />
            </div>

            <DeleteAccount
                handleDelete={handleDelete}
            />
        </>
    );
}
