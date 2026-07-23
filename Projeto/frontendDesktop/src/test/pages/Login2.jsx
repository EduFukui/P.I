// import React from 'react'
import { useNavigate } from 'react-router-dom';
import image from "../img/image.png"
function Login2() {
    const navigate = useNavigate();
    return (
        <div className='min-h-screen bg-black flex items-center justify-center'>
            <div className='flex w-2xl bg-[rgb(28,28,28)] rounded-2xl overflow-hidden'>
                {/* Lado Esquerdo: Formulario */}
                <div className='w-1/2 p-4  '>
                    <h1 className='font-bold flex text-white text-2xl justify-center mb-4'>TEAMVIEW</h1>
                    <input type="email" placeholder='Email' className='w-full bg-[#2e2d2d] rounded-[10px] p-2 placeholder: text-lime-100 mb-4 outline-none' />
                    <input type="password" placeholder="Password" className='w-full bg-[#2e2d2d] rounded-[10px] p-2 placeholder: text-lime-100 mb-4 outline-none' />
                    <button onClick={()=>navigate("/dashboard")} className='items-center w-full bg-lime-400 rounded-[10px] p-2 mb-4 hover: cursor-pointer hover:bg-lime-800 transition'>Login</button>
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

export default Login2