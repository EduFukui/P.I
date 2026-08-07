export default function ProfileCard({ form, storedUser }) {
    return (
        <div className="rounded-2xl border border-[#2a2a2a] bg-[#181818] p-6">
            <div className="flex flex-col items-center text-center">

                {/* Avatar com a primeira letra do nome */}
                <div className="flex h-24 w-24 items-center justify-center rounded-full bg-lime-400 text-4xl font-bold text-black">
                    {form.nomeCompleto
                        ? form.nomeCompleto.charAt(0).toUpperCase()
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
    );
}
