// import React, { useState } from 'react'
// import { useNavigate } from 'react-router-dom';
import image from "../img/image.png"
// import { api } from '../../services/api';

export default function Register() {
    // const navigate = useNavigate();

    // const [email, setEmail] = useState("")
    // const [password, setPassword] = useState("")

    // async function handleLogin() {
    //     const data = await api("/auth/login", {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json"
    //         },
    //         body: JSON.stringify({ email, password })
    //     })
    //     if (data.token) {
    //         localStorage.setItem("token", data.token)
    //         navigate("/dashboard")
    //     } else {
    //         alert(data.message)
    //     }
    // }

    // button onClick={handleLogin}
    // input password value={password} onChange={e => setPassword(e.target.value)}
    // input email  value={email} onChange={e => setEmail(e.target.value)}
    return (
        <div className='min-h-screen bg-black flex items-center justify-center'>
            <div className='flex w-6xl bg-[rgb(28,28,28)] rounded-2xl overflow-hidden'>
                {/* Lado Esquerdo: Formulario */}
                <div className='w-1/2 p-4'>
                    <h1 className='font-bold flex text-white text-2xl justify-center mb-4'>Cadastro</h1>
                    <input type="name" placeholder="Nome" className='w-full bg-[#2e2d2d] rounded-[10px] p-2 placeholder: text-lime-100 mb-4 outline-none'/>
                    <input type="cpf" placeholder="CPF" className='w-full bg-[#2e2d2d] rounded-[10px] p-2 placeholder: text-lime-100 mb-4 outline-none'/>
                    <input type="phone" placeholder="Telefone" className='w-full bg-[#2e2d2d] rounded-[10px] p-2 placeholder: text-lime-100 mb-4 outline-none'/>
                    <input type="email" placeholder='Email' className='w-full bg-[#2e2d2d] rounded-[10px] p-2 placeholder: text-lime-100 mb-4 outline-none' />
                    <input type="password" placeholder="Password"  className='w-full bg-[#2e2d2d] rounded-[10px] p-2 placeholder: text-lime-100 mb-4 outline-none' />
                    <input type="table_number" placeholder="Numero da Mesa" className='w-full bg-[#2e2d2d] rounded-[10px] p-2 placeholder: text-lime-100 mb-4 outline-none'/>
                    <button  className='items-center w-full bg-lime-400 rounded-[10px] p-2 mb-4 hover: cursor-pointer hover:bg-lime-800 transition'>Login</button>
                    <p className='text-gray-500 text-center text-[14px]'>Não tem uma conta? <span className='text-lime-400'>Cadastre-se</span></p>
                </div>

                {/* Lado Direito: Imagem */}
                <div className='w-1/2'>
                    <img src={image} alt="" className='w-full h-full object-cover' />
                </div>
            </div>
        </div>
    )
}