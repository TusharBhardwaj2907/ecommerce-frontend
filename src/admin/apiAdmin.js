import {API} from '../config'

export const getProduct = () =>{
    return fetch(`${API}/products?limit=50`,{
        method:"GET"
    }).then(res => {return res.json()})
}

export const getSingleProduct = (productId) =>{
    return fetch(`${API}/product/${productId}`,{
        method:"GET"
    }).then(res => {return res.json()})
}

export const deleteProduct = (productId , userId , token) =>{
    return fetch(`${API}/product/${productId}/${userId}`,{
        method:"DELETE",
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json",
            Authorization:`Bearer ${token}`
        }
    }).then(res => {return res.json()})
}

export const updateProduct = (productId , userId , token , product) =>{
    return fetch(`${API}/product/${productId}/${userId}`,{
        method:"PUT",
        headers:{
            Accept:"application/json",
            Authorization:`Bearer ${token}`,
        },
        body:product
    }).then(res => {return res.json()})
}