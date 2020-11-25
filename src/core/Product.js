import React,{useState,useEffect} from 'react'
import Layout from './Layout'
import {API} from '../config'
import ShowProduct from './ShowProduct'
import { useParams } from 'react-router-dom'
import Card from './Card'


function Product() {

    const {productId}  = useParams()
    const [result , setResult] = useState([])
    const [related , setRelated] = useState([])
    const [loading , setLoading] = useState(false)
    const [error , setError] = useState(false)

    const getproduct = (productId) =>{
            setLoading(true)
            fetch(`${API}/product/${productId}`,{
            method:"GET",
            headers:{
                Accept:"application/json",
                "Content-Type":"application/json"
            }
        }).then(res=>res.json())
        .then(data=>{
            setLoading(false)
            setResult(data)
        })
        .catch(err=>{
            setLoading(false)
            setError(true)
        })
    } 

    const relatedProduct = (productId) =>{
        setLoading(true)
        fetch(`${API}/products/related/${productId}`,{
        method:"GET",
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json"
        }
    }).then(res=>res.json())
    .then(res=>{
        setLoading(false)
        setRelated(res)
    })
    .catch(err=>{
        setLoading(false)
        setError(true)
    })
    } 

    const showLoading = (load) =>(
        load && <h5 className="container alert alert-info bg-dark" style={{color:"orange"}}>Loading...</h5>
    )

    const showError = er =>(
        er && <h5 className="container alert alert-danger">Oops , something went wrong!!!</h5>
    )

    

    useEffect(()=>{
        getproduct(productId)
        relatedProduct(productId)
    },[productId])

    return (
        <Layout title="Home Page" description="Node React Ecommerce" className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        {showLoading(loading)}
                        {showError(error)}
                        {result.length!==0 && <ShowProduct result={result}/>}
                    </div>
                </div>
                <h3 className="text-muted mb-4 mt-4" style={{fontWeight:"700"}}>Related Products</h3>
                <div className="row">
                        {showLoading(loading)}
                        {showError(error)}
                        {related.length===0 && !loading && <h4 className="container-fluid">no related products found</h4>}
                        {related.length!==0 && related.map((relate,i)=>(
                            <div className="col-12 col-sm-4 col-md-4 col-xl-3 mb-5 text-center" key={i}>
                                <Card product={relate}/>
                            </div>
                        ))}
                </div>
        </Layout>
    )
}

export default Product


