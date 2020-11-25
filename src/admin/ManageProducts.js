import React,{useEffect, useState} from 'react'
import Layout from '../core/Layout'
import {isAuthenticated} from '../auth/helper'
import {Link} from 'react-router-dom'
import {getProduct , deleteProduct } from '../admin/apiAdmin'

function ManageProducts() {

    const [products , getProducts] = useState([])

    const {user , token} =isAuthenticated()

    const loadProducts = () =>{
        getProduct()
        .then(data => {
            if(data.error){
                console.log(data.error)
            }else{
                getProducts(data)
            }
        })
    }

    const destroy = (productId) =>{
        deleteProduct(productId , user._id , token)
            .then(data => {
                if(data.error){
                    console.log(data.error)
                }else{
                    loadProducts()
                }
            })
    }

    useEffect(()=>{
        loadProducts()
    },[])

    return (
        <Layout title="Update product Page" description="Node React Ecommerce" className="container-fluid">
                <h2 className="mb-4" style={{fontWeight:"700"}}>Update Products</h2>
                <div className="row" style={{fontFamily:"cursive"}}>
                    <div className="col-12">
                        <ul className="list-group">
                            {products.map((p , i) =>(
                                <li key={i} className="list-group-item d-flex justify-content-between align-item-center">
                                    <strong>{p.name}</strong>
                                    <Link to={`/admin/product/update/${p._id}`}>
                                        <span className="badge badge-warning badge-pill">Update</span>
                                        <span className="badge badge-danger badge-pill" onClick={() => destroy(p._id)}>Delete</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <Link to="/admin/dashboard"><button className="btn btn-dark ml-3 mt-3" style={{color:"orange"}}>back</button></Link>
        </Layout>
    )
}

export default ManageProducts