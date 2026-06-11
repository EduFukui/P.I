
function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-linear-gradient-to-r from-green-400 to-blue-500">
        <div className="flex flex-col">
            <h1 className="text-3xl font-bold">
                MUDA SL
            </h1>
            <div>
                <image src="https://www.mudasl.com.br/wp-content/uploads/2021/11/logo-muda-sl.png" alt="Logo da Muda SL" className="w-64 h-auto"></image>
                <div></div>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Clique aqui
                </button>
            </div>
        </div>
    </div>
  )
}

export default Home