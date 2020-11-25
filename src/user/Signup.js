import React,{useState} from 'react'
import {Link} from 'react-router-dom'
import Layout from '../core/Layout'
import {API} from '../config'

function Signup() {
    const [values , setValues] = useState({
        name:'',
        email:'',
        password:'',
        error:'',
        success:false
    })
    
    const {name , email , password , error , success} = values

    const handleChange = (name)=> event => {
        setValues({...values , error:false , [name]:event.target.value})
    }

    const clickSubmit = (event) =>{
        event.preventDefault()
        setValues({...values , error:false})
        signup({name , email , password})
    }

    const signup = (user) =>{
        fetch(`${API}/signup` , {
            method:"POST",
            headers:{
                Accept:'application/json',
                "Content-Type":"application/json"
            },
            body:JSON.stringify(user)
        }).then(res => {
            return res.json()
        }).then(data=>{
            if(data.err){
                setValues({...values , error:data.err , success:false})
            }else{
                setValues({...values , name:'' , email:'' , password:'' , error:'' , success:true})
            }
        })
        .catch(err=>console.log(err))
    }
    
    return (
        <Layout title="Signup Page" className="container col-md-8 offset-md-2" description="create your account">
            <div className="alert alert-danger" style={{display:error?'':"none"}}>
                {error}
            </div>
            <div className="alert alert-info" style={{display:success?'':"none"}}>
                New Account Is Created. <Link to="/signin">Signin</Link>
            </div>
            <form>
                <div className="form-group">
                    <label className="text-muted">Name</label>
                    <input type="text" onChange={handleChange('name')} className="form-control" value={name}/>
                </div>
                <div className="form-group">
                    <label className="text-muted">Email</label>
                    <input type="email" onChange={handleChange('email')} className="form-control" value={email}/>
                </div>
                <div className="form-group">
                    <label className="text-muted">Password</label>
                    <input type="password" onChange={handleChange('password')} value={password} className="form-control"/>
                </div>
                <button onClick={clickSubmit} className="btn btn-dark" style={{color:'orange'}}>create account</button>
                <h6 className="mt-3">already have an account? <Link to="/signin" style={{color:"orange" , fontFamily:"serif"}}>click here</Link></h6>
            </form>
        </Layout>
    ) 
}

export default Signup
