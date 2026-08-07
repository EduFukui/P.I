import {
    UserIcon,
    EnvelopeIcon,
    PhoneIcon,
    IdentificationIcon,
    LockClosedIcon,
} from "@heroicons/react/24/outline";

export default function ProfileFields({
    form,
    handleChange,
    handleSubmit,
    handleLogout,
}) {
    return (
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
                {/* Dados pessoais */}
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

                    {/* Nome completo */}
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
                                minLength={3}
                                maxLength={150}
                                required
                                className="w-full rounded-xl border border-[#333333] bg-[#252525] py-3 pl-12 pr-4 text-white outline-none focus:border-lime-400"
                            />
                        </div>
                    </div>

                    {/* CPF */}
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
                                inputMode="numeric"
                                maxLength={11}
                                required
                                className="w-full rounded-xl border border-[#333333] bg-[#252525] py-3 pl-12 pr-4 text-white outline-none focus:border-lime-400"
                            />
                        </div>
                    </div>

                    {/* Telefone */}
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
                                inputMode="numeric"
                                minLength={10}
                                maxLength={15}
                                required
                                className="w-full rounded-xl border border-[#333333] bg-[#252525] py-3 pl-12 pr-4 text-white outline-none focus:border-lime-400"
                            />
                        </div>
                    </div>

                    {/* E-mail */}
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
                                maxLength={150}
                                required
                                className="w-full rounded-xl border border-[#333333] bg-[#252525] py-3 pl-12 pr-4 text-white outline-none focus:border-lime-400"
                            />
                        </div>
                    </div>
                </div>

                {/* Alteração de senha */}
                <div className="border-t border-[#2a2a2a] pt-6">
                    <h3 className="font-bold">
                        Alterar senha
                    </h3>

                    <p className="mt-1 text-sm text-gray-500">
                        Deixe vazio caso não queira alterar sua senha.
                    </p>

                    <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">

                        {/* Nova senha */}
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
                                    minLength={8}
                                    maxLength={255}
                                    placeholder="••••••••"
                                    className="w-full rounded-xl border border-[#333333] bg-[#252525] py-3 pl-12 pr-4 text-white outline-none focus:border-lime-400"
                                />
                            </div>
                        </div>

                        {/* Confirmar senha */}
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
                                    minLength={form.senha ? 8 : undefined}
                                    maxLength={255}
                                    placeholder="••••••••"
                                    className="w-full rounded-xl border border-[#333333] bg-[#252525] py-3 pl-12 pr-4 text-white outline-none focus:border-lime-400"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Botões */}
                <div className="flex flex-wrap justify-end gap-4 border-t border-[#2a2a2a] pt-6">
                    <button
                        type="button"
                        onClick={handleLogout}
                        className="rounded-xl border border-[#333333] px-6 py-3 font-semibold text-gray-300 transition hover:bg-[#252525] hover:text-white"
                    >
                        Sair
                    </button>

                    <button
                        type="submit"
                        className="rounded-xl bg-lime-400 px-8 py-3 font-bold text-black transition hover:brightness-110"
                    >
                        Salvar alterações
                    </button>
                </div>
            </form>
        </div>
    );
}
