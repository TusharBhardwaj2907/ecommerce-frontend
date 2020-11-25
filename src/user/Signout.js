import {API} from '../config'

export const Signout = (next) =>{
    if(typeof window !=='undefined'){
        localStorage.removeItem("jwt")
    }
    next()
    return fetch(`${API}/signout` , {
        method:"GET"
    })
    .then(res =>res)
    .catch(err=>err)
}