import { EnvelopeIcon } from "@heroicons/react/24/outline";

import InputField from "../Register/InputField";
import PasswordField from "../Register/PasswordField";

export default function Form({
    form,
    error,
    loading,
    onChange,
    onSubmit,
}) {
    return (
        <form
            onSubmit={onSubmit}
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
                onChange={onChange}
            />

            {/* Senha */}

            <PasswordField
                name="senha"
                label="Senha"
                placeholder="********"
                value={form.senha}
                onChange={onChange}
            />

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
                {loading ? "Entrando..." : "Entrar"}
            </button>

        </form>
    );
}

