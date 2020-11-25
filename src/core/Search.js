import React,{useState,useEffect} from 'react'
import {API} from '../config'
import query from 'query-string'
import Card from './Card'

function Search() {
    
    const [data,setData] =useState({
        categories:[],
        category:'',
        search:'',
        results:[],
        searched:false,
        loading:false
    })

    const {categories,category,search,results,searched}=data

    const list = params =>{
        const queries = query.stringify(params)
        return fetch(`${API}/products/search?${queries}`,{
            method:"GET"
        }).then(res=>{return res.json()})
    }

    const getCategory = () =>{
        return fetch(`${API}/category` , {
            method:"GET",
            header:{
                Accept:"application/json",
                "Content-Type":"application/json"
            }
        }).then(res=> {return res.json()})
    }

    const loadCategory=()=>{
        getCategory().then(res => {
            if(res.error){
                console.log(res.error)
            }else{
                setData({...data , categories:res})
            }
        })
    }

    const searchData=()=>{
       if(search){
        list({search:search,category:category})
        .then(res=>{
            if(res.error){
                console.log(res.error)
            }else{
                setData({...data , results:res , searched:true})
            }
        })
        .catch(err=>console.log(err))
       }
    }

    const submitHandler=(e)=>{
        e.preventDefault()
        searchData()
    }

    const handleChange=(name)=>(e)=>{
        setData({...data , [name]:e.target.value , searched:false , loading:true})
    }

    useEffect(()=>{
        loadCategory()
    },[])

    const resultMessage = (searched , resulted) =>{
        if(searched){
            if(resulted.length<=0){
                return `No product found , Please provide suitable category!!!`
            }
            if(resulted.length>0){
                    return `Found ${resulted.length} products`
            }
        }
    }

    const searchedresults = (results =[]) =>{
        return (
            <div>
                <h2 className="mt-4 mb-4">{resultMessage(searched,results)}</h2>
                <div className="row">
                    {searched && search.length!==0 && results.map((result,i)=>(
                        <div className="col-12 col-sm-4 col-md-4 col-xl-3 mb-5" key={i} id="cards">
                            <Card product={result} key={i}/>
                        </div>
                    ))}
                </div>
            </div>
        )
    }

    const searchForm=()=>(
        <form onSubmit={submitHandler}>
            <span className="input-group-text bg-dark" style={{padding:"3px"}}>
                <div className="input-group input-group-lg">
                    <div className="input-group-prepend">
                        <select className="btn" onChange={handleChange("category")} style={{color:"orange"}}>
                            <option className="bg-dark" value="Category">all</option>
                            {categories.map((category,i)=>(
                                <option key={i} value={category._id} className="bg-dark">{category.name}</option>
                            ))}
                        </select>
                    </div>
                    <input type="search" className="form-control" onChange={handleChange("search")} placeholder="Search"/>
                </div>
                <div className="btn input-group-append" style={{border:"none"}}>
                    <button className="btn btn-transparent">
                        <i className="fa fa-search fa-large" style={{color:"orange"}}></i>
                    </button>
                </div>
            </span>
        </form>
    )

    return (
        <div>
            <h3  style={{fontWeight:"700"}}>Search</h3>
            <div className="row text-center">
                <div className="container-fluid mb-3 mt-3" style={{margin:"0px"}}>
                    {searchForm()}
                </div>
                <div className="container-fluid mb-3 mt-3">
                    {searchedresults(results)}
                </div>
            </div>
            
        </div>
    )
}

export default Search
