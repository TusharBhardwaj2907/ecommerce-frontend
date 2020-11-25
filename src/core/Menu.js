import React from 'react'
import {Link , withRouter} from 'react-router-dom'
import {Signout} from '../user/Signout'
import {isAuthenticated} from '../auth/helper'
import {itemTotal}  from './CartHelper'


const isActive = (history,path)=>{
    if(history.location.pathname===path){
        return {color : "#ffffff" , fontFamily:"serifs"}
    }else{
        return { color: "#ff9900" , fontFamily:"serifs"}
    }
}

function Menu({history}) {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top" style={{position:"relative"}}>
            <a className="navbar-brand" style={{color:"#ff9900", fontSize:"25px" , fontFamily:"serifs"}} href="/"><i className="fa fa-shopping-basket"></i>Radhey Supermart</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar"><span className="navbar-toggler-icon"></span></button>
        <div className="collapse navbar-collapse" id="navbar">
            <ul className="nav ">
                <li className="nav-item" ><Link className="nav-link" style={isActive(history,'/')} to="/"><i className="fa fa-home"></i>Home</Link></li>
                <li className="nav-item"><Link className="nav-link" style={isActive(history,'/shop')} to="/shop"><i className="fa fa-shopping-bag"></i>Shop</Link></li>
                <li className="nav-item"><Link className="nav-link" style={isActive(history,'/cart')} to="/cart"><i className="fa fa-shopping-cart"></i><sup><small style={{fontWeight:"500px",fontSize:"13px"}} className="cart-badge">{itemTotal()}</small></sup></Link></li>
               {isAuthenticated() && isAuthenticated().user.role===0 && (
                     <li className="nav-item" ><Link className="nav-link" style={isActive(history,'/user/dashboard')} to="/user/dashboard"><i className="fa fa-bars"></i>Dashboard</Link></li>
               ) }
                {isAuthenticated() && isAuthenticated().user.role===1 && (
                     <li className="nav-item" ><Link className="nav-link" style={isActive(history,'/admin/dashboard')} to="/admin/dashboard"><i className="fa fa-clipboard-list"></i>Dashboard</Link></li>
               ) }
                {!isAuthenticated() && (
                    <>
                        <li className="nav-item" ><Link className="nav-link" style={isActive(history,'/signin')} to="/signin"><i className="fa fa-sign-in"></i>Signin</Link></li>
                        <li className="nav-item" ><Link className="nav-link" style={isActive(history,'/signup')} to="/signup"><i className="fa fa-sign-in"></i>Signup</Link></li>
                    </>    
                )}
                {isAuthenticated() && (
                    <li className="nav-item" ><span className="nav-link" style={{cursor:'pointer' , color:'#ff9900'}} onClick={()=>Signout(()=>{
                        history.push("/")
                    })}><i className="fa fa-sign-out"></i>Signout</span></li>
                )}
            </ul>
        </div>
        </nav>
            )
}

export default withRouter(Menu)
