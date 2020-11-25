import React,{useState} from 'react'
import Layout from '../core/Layout'
import {API} from '../config'
import { Redirect } from 'react-router-dom'
import {isAuthenticated} from '../auth/helper'


function Signin() {

    const [values , setValues] = useState({
        email:'',
        password:'',
        error:'',
        loading:false,
        redirectToReferrer:false
    })

    const {email,password,error,loading ,redirectToReferrer} = values

    const {user} = isAuthenticated()

    const handleChange = (value) => (event) =>{
        setValues({...values , error:false , [value]:event.target.value})
    }

    const authenticate = (data , next) =>{
        if(typeof window !== 'undefined'){
            localStorage.setItem('jwt', JSON.stringify(data))
            next()
        }
    }


    const clickSubmit = (event) =>{
        event.preventDefault()
        setValues({...values , error:false , loading:true})
        signin({email , password})
    }

    const signin = (user) =>{
        fetch(`${API}/signin` , {
            method:"POST",
            headers:{
                Accept:'application/json',
                "Content-Type":"application/json"
            },
            body:JSON.stringify(user)
        }).then(res => {
            return res.json()
        }).then(data=>{
            if(data.error){
                setValues({...values , error:data.error , loading:false})
            }else{
                authenticate(data, ()=>{
                    setValues({...values , redirectToReferrer:true})
                })
            }
        })
        .catch(error=>error)
    }
    const redirectUser = ()=>{
        if(redirectToReferrer){
            if(user && user.role === 1){
                return <Redirect to="/admin/dashboard"/>
            }else{
                return <Redirect to="/user/dashboard"/>
            }
        }
        if(isAuthenticated()){
            <Redirect to="/" />
        }
    }
    return (
        <Layout title="Signin Page" description="Sign in to node react ecommerce app" className="container col-md-8 offset-md-2">
             <div className="alert alert-danger" style={{display:error?'':"none"}}>
                {error}
            </div>
            {loading && (<div className="alert alert-info"><h2>Loading...</h2></div>)}

            <form>
                <div className="form-group">
                    <label className="text-muted">Email</label>
                    <input type="email" onChange={handleChange('email')} className="form-control" value={email}/>
                </div>
                <div className="form-group">
                    <label className="text-muted">Password</label>
                    <input type="password" onChange={handleChange('password')} value={password} className="form-control"/>
                </div>
                <button onClick={clickSubmit} className="btn btn-dark " style={{color:'orange'}}>Submit</button>
            </form>
            {redirectUser()}
        </Layout>

    )
}

export default Signin
