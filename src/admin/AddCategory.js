import React,{useState} from 'react'
import Layout from '../core/Layout'
import {API} from '../config'
import {isAuthenticated} from '../auth/helper'
import {Link} from 'react-router-dom'


const AddCategory = () =>{
    const [name,setName] = useState('')
    const [error , setError] = useState(false)
    const [success , setSuccess] = useState(false)

    const {user,token} = isAuthenticated()

    const handleChange = (e) =>{
        setError('')
        setName(e.target.value)
    }
    
    const clickSubmit = (e) => {
        e.preventDefault()
        setError('')
        setSuccess(false)
        createCategory(user._id , token , {name})
    }

    const createCategory = (userId , token , category) => {
        fetch(`${API}/category/create/${userId}` , {
            method:"POST",
            headers:{
                Accept:"application/json",
                "Content-type":"application/json",
                Authorization:`Bearer ${token}`
            },
            body:JSON.stringify(category)
        }).then(res=>res.json())
        .then(data=> {
            if(data.error){
                setError(true)
        }else{
            setError('')
            setSuccess(true)
        }
        }).catch(err=>console.log(err))
} 

    const showSuccess = () =>{
        if(success){
            return <h3 className="text-success">Category is created</h3>
        }
    }

    const showError = () =>{
        if(error){
            return <h3 className="text-danger">Category should be unique</h3>
        }
    }

    const goBack = () =>(
        <div className="mt-5">
            <Link to="/admin/dashboard" style={{color:"black"}}>Back to dashboard<i className="fa fa-hand-point-left"></i></Link>
        </div>
    )

    const newCategoryForm = () =>(
        <form onSubmit={clickSubmit}>
            {showSuccess()}
            {showError()}
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input type="text" className="form-control" value={name} autoFocus onChange={handleChange} required/>
            </div>
            <button className="btn btn-dark" style={{color:"orange"}}>Create Category</button>
            {goBack()}
        </form>
    )

    return (
        <Layout title="Create Category" description={`Hello ${user.name} , Ready to add a new category`} className="container-fluid">
            <div className="row">
                <div className="col-md-8 offset-md-2">{newCategoryForm()}</div>
            </div>
        </Layout>
    )
}
export default AddCategory