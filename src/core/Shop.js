import React,{useState,useEffect} from 'react'
import Layout from './Layout'
import {API} from '../config'
import {withRouter} from 'react-router-dom'
import Checked from './Checked'
import {prices} from './FixedPrices'
import RadioBox from './RadioBox'
import Card from './Card'


function Shop(props) {

    const [showMenu  , setShowMenu] = useState(false)
    const [loading , setLoading] = useState(false)
    const [categories,setCategories] = useState([])
    const [error,setError] = useState(false)
    const [limit,setlimit]=useState(6)
    const [skip,setSkip]=useState(0)
    const [size,setSize] = useState(0)
    const [filtered , setFiltered] = useState([])
    const [myFilters,setmyFilters] = useState({
        filters:{category:[] , price:[]}
    })

    useEffect(()=>{
        getAllCategory()
        loadFilterResults()
    },[])

    const getAllCategory = ()=>{
        getCategory().then(data=>{
            if(data.error){
                setError(true)
            }else{
                setCategories(data)
            }
        })
        .catch(err=>console.log(err))
    }

    const loadFilterResults=(newFilters)=>{
        setLoading(true)
        getFiltersProduct(skip,limit,newFilters).then(data=>{
            if(data.error){
                setError(data.error)
            }else{
                setLoading(false)
                setFiltered(data)
                setSize(data.size)
                setSkip(0)
            }
        })
    }

    const loadMore=(newFilters)=>{
        let toSkip = skip+limit
        getFiltersProduct(toSkip,limit,newFilters.filters).then(data=>{
            if(data.error){
                setError(data.error)
            }else{
                setFiltered(data)
                setSize(data.size)
                setSkip(0)
            }
        })
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

    const getFiltersProduct = (skip,limit,filters={}) =>{
        const data={
            skip,
            limit,
            filters
        }
        return fetch(`${API}/products/by/search`,{
            method:"POST",
            headers:{
                Accept:"application/json",
                "Content-Type":"application/json"
            },
            body:JSON.stringify(data)
        }).then(res=>{return res.json()})
    }

    const handleCategory=(filters , filterBy) => {
        const newFilters = {...myFilters}
        newFilters.filters[filterBy]=filters

        if(filterBy=="price"){
            let pricevalue = handlePrice(filters)
            newFilters.filters[filterBy]=pricevalue
        }

        loadFilterResults(myFilters.filters)

        setmyFilters(newFilters)
    }

    const notFound = () =>{
        return (
            <h5 className="container">Products not found!!!</h5>
        )
    }

    const handlePrice=(value)=>{
        const data = prices
        let arr=[]
        for(let key in data){
            if(data[key]._id === parseInt(value)){
                arr=data[key].arr
            }
        }
        return arr
    }

    const showFilter = () =>{
        setShowMenu(!showMenu)
    }

    const showLoading = (loading) =>(
        loading && <h5 className="container">loading...</h5>
    )

    const show = showMenu ? "show": ""

    return (
        <Layout title="Shop Page" description="Here you shop what you want" className="container-fluid mb-5">
            <div className="row">
                <div className="col-12 col-sm-3 mb-3">
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark pmd-navbar pmd-z-depth" onClick={showFilter}>
                    <h6 className="navbar-brand float-left">Filter</h6>  
                </nav>
                <section className={"collapse" + show} id="pmd-main">
                    <aside id="basicSidebar" className="pmd-sidebar bg-light pmd-z-depth" role="navigation">
                        <ul className="nav flex-column pmd-sidebar-nav">
                            <li className="nav-item">
                                <a className="nav-link" data-toggle="collapse" href="#profile" role="button" aria-expanded="true" aria-controls="inbox">
                                    <i className="fa fa-filter float-left pmd-list-icon pmd-sm" style={{color:"black"}}></i>
                                    <span className="media-body " style={{color:"black"}}>Filter by categories</span>
                                    <i className="fa fa-ellipsis-v md-light float-right ml-2 pmd-sm" style={{color:"black"}}></i>
                                </a>
                                <ul className="collapse show" id="profile">
                                    <Checked categories={categories} handleCategory={filters => handleCategory(filters,"category")}/>
                                </ul>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" data-toggle="collapse" href="#profile1" role="button" aria-expanded="true" aria-controls="inbox">
                                    <i className="fa fa-filter float-left pmd-list-icon pmd-sm" style={{color:"black"}}></i>
                                    <span className="media-body" style={{color:"black"}}>Filter by price</span>
                                    <i className="fa fa-ellipsis-v float-right md-light ml-2 pmd-sm" style={{color:"black"}}></i>
                                </a>
                                <ul className="collapse show" id="profile1">
                                    <RadioBox prices={prices} handleCategory={filters => handleCategory(filters, "price")}/>
                                </ul>
                            </li>
                        </ul>
                    </aside>
                </section> 
            </div>
                <div className="col-12 col-sm-9">
                    <h4 className="mb-4">Products</h4>
                    <div className="row text-center">
                        {filtered.length===0 && loading && showLoading(loading)}
                        {filtered.length===0 && !loading && notFound()}
                        {
                            filtered && filtered.map((product,i)=>(
                                <div key={i} className="col-12 col-sm-4 mt-3 mb-3">
                                    <Card product={product}/>
                                </div>
                            ))
                        }
                    </div>
                    <hr/>
                    {filtered.length===0 && <button className="btn btn-dark" style={{color:"orange"}} onClick={props.history.goBack} >back</button>}
                        {filtered.length!==0 && filtered.length>=limit && (<button onClick={loadMore} className="btn btn-warning mb-5">Load More</button>)}
                </div>
            </div>
        </Layout>
    )
}

export default withRouter(Shop)
