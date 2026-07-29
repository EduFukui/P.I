const API = "http://localhost:3000";

export async function api(path:string,options = {}){
    const token = localStorage.getItem('token')

    const res = await fetch(`${API}${path}`,{
        ...options,
        headers:{
            "Content-Type":"application/json",
            Authorization:token ? `Bearer ${token}` : ""
        }
    })
    return res.json()
}

