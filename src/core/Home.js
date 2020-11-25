import React,{useState,useEffect} from 'react'
import Layout from './Layout'
import {API} from '../config'
import Card from './Card'
import Search from './Search'


function Home() {

    const [productsBySell, setproductsBySell]= useState([])
    const [productsByArrival , setproductsByArrival] = useState([])
    const [error,setError] = useState(false)
    const [loading , setLoading] = useState(false)

    const getProducts = (sortBy) =>{
        return fetch(`${API}/products?sortBy=${sortBy}&order=desc&limit=6`,{
            method:"GET"
        }).then(res=> {return res.json()})
    }

    const getProductBySell = () =>{
        setLoading(true)
        getProducts('sold').then(data=>{
            if(data.error){
                setError(data.error)
            }else{
                setproductsBySell(data)
                setLoading(false)
            }
        }).catch(err=>console.log(err))
    }

    const getProductByArrival = () =>{
        setLoading(true)
        getProducts('createdAt').then(data=>{
            if(data.error){
                setError(data.error)
            }else{
                setproductsByArrival(data)
                setLoading(false)
            }
        }).catch(err=>console.log(err))
    }

    useEffect(()=>{
        getProductByArrival()
        getProductBySell()
    },[])

    const showLoading = (load) =>(
        load && <h5 className="mt-4 container alert alert-info bg-dark" style={{color:"orange"}}>please wait a moment...</h5>
    )


    return (
        <Layout title="Home Page" description="IN A WORLD FULL OF TRENDS. I WANT TO REMAIN A CLASSIC" cites="IMAN" className="container-fluid">
                <h2 className="mb-4" style={{fontWeight:"700"}}>Best Sellers</h2>
                {showLoading(loading)}
                <div className="row text-center">
                        {productsBySell.map((product,i)=>(
                            <div className=" col-12 col-sm-4 col-md-4 col-xl-3 mb-5" key={i} id="cards">
                            <Card  product={product}/>
                            </div>))}
                </div>
                <h2 className="mb-4" style={{fontWeight:"700"}}>New Arrivals</h2>
                {showLoading(loading)}
                <div className="row text-center">
                    {productsByArrival.map((product,i)=>(
                        <div key={i} className="col-12 col-sm-4 col-md-4 col-xl-3 mb-5" id="cards">
                        <Card product={product}/>
                    </div>))}
                </div>
                <Search/>
        </Layout>
    )
}

export default Home