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

    const getproduct = (productId) =>{
            fetch(`${API}/product/${productId}`,{
            method:"GET",
            headers:{
                Accept:"application/json",
                "Content-Type":"application/json"
            }
        }).then(res=>res.json())
        .then(data=>setResult(data))
        .catch(err=>console.log(err))
    } 

    const relatedProduct = (productId) =>{
        fetch(`${API}/products/related/${productId}`,{
        method:"GET",
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json"
        }
    }).then(res=>res.json())
    .then(res=>setRelated(res))
    .catch(err=>console.log(err))
    } 

    

    useEffect(()=>{
        getproduct(productId)
        relatedProduct(productId)
    },[productId])

    return (
        <Layout title="Home Page" description="Node React Ecommerce" className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        {result.length!==0 && <ShowProduct result={result}/>}
                    </div>
                </div>
                <h3 className="text-muted mb-4 mt-4" style={{fontWeight:"700"}}>Related Products</h3>
                <div className="row">
                        {related.length===0 && <h4 className="container-fluid">no related products found</h4>}
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


