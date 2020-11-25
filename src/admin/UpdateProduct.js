import React,{useState , useEffect} from 'react'
import Layout from '../core/Layout'
import {API} from '../config'
import {isAuthenticated} from '../auth/helper'
import {Redirect} from 'react-router-dom'
import {getSingleProduct , updateProduct} from './apiAdmin'


const UpdateProduct = ({match}) =>{
    const [loading , setLoading] = useState(false)
    const [values,setValues] = useState({
        name:'',
        description:'',
        price:'',
        categories:[],
        category:'',
        shipping:'',
        quantity:'',
        photo:'',
        error:false,
        createdProduct:false,
        redirectToProfile:false,
        formData:''
    })

    const {name,description,price,categories,category,quantity,error,createdProduct,redirectToProfile,formData} = values

    const {user,token} = isAuthenticated()

    
    useEffect(()=>{
        init(match.params.productId)
    },[])

    const init = (productId) =>{
        setLoading(true)
        getSingleProduct(productId)
        .then(data=>{
            setValues({...values ,name:data.name , description:data.description , price:data.price , shipping:data.shipping,quantity:data.quantity, category:data.category._id , formData:new FormData()})
            getCategory()    
            setLoading(false)
        })     
        .catch(err=>
        {
            setLoading(false)
            setValues({...values , error:true , loading:false})
        })
    }

    const getCategory = () =>{
        fetch(`${API}/category` , {
            method:"GET",
            header:{
                Accept:"application/json",
                "Content-Type":"application/json"
            }
        }).then(res=>res.json())
        .then(data=>setValues({ categories:data , formData:new FormData()}))
        .catch(err=>console.log(err))
    }

    const showError = () =>(
        <div className="alert alert-danger" style={{display:error?'':'none'}}>
            All fields are required!!!
        </div>
    )

    const showLoading = (load)=>(
        load && <h5 className="container alert alert-info">loading...</h5>
    )

    const showSuccess = () =>(
        <div className="alert alert-info" style={{display:createdProduct?'':'none'}}>
            <h2>Product is updated</h2>
        </div>
    )

    const clickSubmit=(e)=>{
        e.preventDefault()
        setLoading(true)
        setValues({...values , error:true,createdProduct:false, loading:true})
        updateProduct( match.params.productId , user._id,token,formData)
        .then(data => {
            if(data.error){
                setLoading(false)
                setValues({...values , error:true , createdProduct:false})
            }else{
                setLoading(false)
                setValues({...values , name:'',description:'',
                error:false,
                photo:'',
                price:'',
                quantity:'',
                loading:false,
                createdProduct:true,
                redirectToProfile:true
                })
            }
        }).catch(err=>console.log(err))
    }
    
    const handleChange=(name) => (event) =>{
        const value = name ==='photo' ? event.target.files[0] : event.target.value
        formData.set(name , value)
        setValues({...values , [name]:value})
    }

    const newPostForm = () =>(
        <form className="mb-3" onSubmit={clickSubmit}>
            <h4>Post Photo</h4>
            <div className="form-group">
                <label className="btn btn-secondary">
                <input type="file" onChange={handleChange('photo')} name="photo" accept="image/*"/>
                </label>
            </div>
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input type="text" onChange={handleChange('name')} className="form-control" value={name}/>
            </div>
            <div className="form-group">
                <label className="text-muted">Description</label>
                <textarea onChange={handleChange('description')} maxLength="200" className="form-control" value={description}/>
            </div>
            <div className="form-group">
                <label className="text-muted">Price</label>
                <input type="number" onChange={handleChange('price')} className="form-control" value={price}/>
            </div>
            <div className="form-group">
                <label className="text-muted">Category</label>
                <select onChange={handleChange("category")} className="form-control">
                <option>Please select</option>
                {categories && categories.map((n,i)=>(
                    <option value={n._id} key={i}>{n.name}</option>   
                ))}
                </select>
            </div>
            <div className="form-group">
                <label className="text-muted">Shipping</label>
                <select onChange={handleChange('shipping')} className="form-control">
                    <option>Please select</option>
                    <option value="0">No</option>
                    <option value="1">Yes</option>    
                </select>
            </div>
            <div className="form-group">
                <label className="text-muted">Quantity</label>
                <input type="number" onChange={handleChange('quantity')} className="form-control" value={quantity}/>
            </div>
            <button className="btn btn-dark" style={{color:"orange"}}>Update Product</button>
        </form>
    )
    return (
        <Layout title="Update Product" description={`Hello ${user.name} , Ready to add a new product`} className="container-fluid">
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    {showError()}
                    {loading && showLoading(loading)}
                    {showSuccess()}
                    {newPostForm()}
                </div>
            </div>
        </Layout>
    )
}
export default UpdateProduct