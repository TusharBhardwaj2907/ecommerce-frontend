import React, { useEffect, useState } from 'react'
import Layout from '../core/Layout'
import {isAuthenticated} from '../auth/helper'
import {Link, Redirect} from 'react-router-dom'
import {getUser , update , updateUser} from './apiUser'


function Profile({match}) {

    const [userData , setUserData] = useState({
        name:'',
        email:'',
        error:false,
        success:false
    })

    const {token} = isAuthenticated()
    const {name , email , error , success} = userData
    
    const init = (userId) =>{
        getUser(userId , token)
        .then(data =>{
            if(data.error){
                setUserData({...userData , error:true})
            }else{
                setUserData({...userData , name:data.name , email:data.email})
            }
        })
    }

    useEffect(()=>{
        init(match.params.userId)
    },[])

    const handleChange =(name) => e =>{
        setUserData({...userData , error:false ,  [name]:e.target.value})
    }

    const redirectUser =(success) =>(
        <div>
            {success && <Redirect to="/user/dashboard" />}
        </div>
    )

    const clickSubmit =(e) =>{
        e.preventDefault()
        update(match.params.userId , token , {name,email})
        .then(data=>{
            if(data.error){
                console.log(data.error)
            }else{
                updateUser(data , ()=>{
                    setUserData({...userData , name:data.name , email:data.email ,success:true})
                })
            }
        })
    }

    const profileUpdate = (name , email) =>(
        <div className="card p-0" style={{fontFamily:"cursive"}}>
            <div className="card-body">
            <h2 className="mb-4  bg-dark card-header" style={{fontWeight:"700" , color:"orange"}}>Profile Update</h2>
            <form>
                <div className="form-group">
                    <label className="text-muted">Name</label>
                    <input type="text" onChange={handleChange("name")} value={name} className="form-control"/>
                </div>
                <div className="form-group">
                    <label className="text-muted">Email</label>
                    <input type="email" onChange={handleChange("email")} value={email} className="form-control"/>
                </div>
                <button onClick={clickSubmit} className="btn btn-dark" style={{color:"orange"}}>Update</button>
                <Link to="/user/dashboard"><button className="btn btn-dark ml-3" style={{color:"orange"}}>back</button></Link>
            </form>
            </div>
        </div>
    )

    return (
        <Layout title="User Page" description="Node React Ecommerce" className="container-fluid mb-5">
                {profileUpdate(name,email)}
                {redirectUser(userData.success)}
        </Layout>
    )
}

export default Profile
