import {API} from '../config' 

export const getUser =(id , token) =>{
    return fetch(`${API}/user/${id}`,{
        method:"GET",
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json",
            Authorization:`Bearer ${token}`
        }
    }).then(res => {return res.json()})
}


export const update =(id , token , user) =>{
    return fetch(`${API}/user/${id}`,{
        method:"PUT",
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json",
            Authorization:`Bearer ${token}`
        },
        body:JSON.stringify(user)
    }).then(res => {return res.json()})
}

export const updateUser = (user , next) =>{
    if(typeof window!=="undefined"){
        if(localStorage.getItem("jwt")){
            let auth = JSON.parse(localStorage.getItem("jwt"))
            auth.user=user
            localStorage.setItem("jwt" , JSON.stringify(auth))
            next()
        }
    }
}
export const getOrders =(id , token) =>{
    return fetch(`${API}/order/by/user/${id}`,{
        method:"GET",
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json",
            Authorization:`Bearer ${token}`
        }
    }).then(res => {return res.json()})
}