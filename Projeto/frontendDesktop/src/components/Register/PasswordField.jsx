import { useState } from "react";

import {
    LockClosedIcon,
    EyeIcon,
    EyeSlashIcon,
} from "@heroicons/react/24/outline";

export default function PasswordField({
    label,
    placeholder,
    value,
    onChange,
    name,
}) {

    const [show, setShow] = useState(false);

    return (

        <div className="space-y-2">

            <label className="text-sm font-semibold text-white">
                {label}
            </label>

            <div className="relative">

                <LockClosedIcon
                    className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500"
                />

                <input
                    name={name}
                    type={show ? "text" : "password"}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    className="
                        w-full
                        rounded-xl
                        border-2
                        border-transparent
                        bg-[#252525]
                        py-3
                        pl-12
                        pr-12
                        text-white
                        placeholder:text-gray-500
                        outline-none
                        transition-all
                        focus:border-lime-400
                        focus:bg-[#2B2B2B]
                    "
                />

                <button
                    type="button"
                    onClick={() => setShow(!show)}
                    className="
                        absolute
                        right-4
                        top-1/2
                        -translate-y-1/2
                        text-gray-500
                        hover:text-lime-400
                    "
                >

                    {show
                        ? <EyeSlashIcon className="h-5 w-5" />
                        : <EyeIcon className="h-5 w-5" />
                    }

                </button>

            </div>

        </div>

    );

}