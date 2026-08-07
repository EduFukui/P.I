export default function InputField({
    label,
    icon: Icon,
    type = "text",
    placeholder,
    value,
    onChange,
    name,
    minLength,
    maxLength,
    inputMode,
}) {

    return (

        <div className="space-y-2">

            <label className="text-sm font-semibold text-white">
                {label}
            </label>

            <div className="relative">

                {/* Ícone */}

                {Icon && (
                    <Icon
                        className="
                            absolute
                            left-4
                            top-1/2
                            h-5
                            w-5
                            -translate-y-1/2
                            text-gray-500
                        "
                    />
                )}

                <input
                    name={name}
                    type={type}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    minLength={minLength}
                    maxLength={maxLength}
                    inputMode={inputMode}
                    className="
                        w-full
                        rounded-xl
                        border-2
                        border-transparent
                        bg-[#252525]
                        py-3
                        pl-12
                        pr-4
                        text-white
                        placeholder:text-gray-500
                        outline-none
                        transition-all
                        focus:border-lime-400
                        focus:bg-[#2B2B2B]
                    "
                />

            </div>

        </div>

    );
}

