import React, { useEffect, useState } from 'react'
import Layout from '../core/Layout'
import {isAuthenticated} from '../auth/helper'
import {Link} from 'react-router-dom'
import {getOrders} from './apiUser'
import moment from 'moment'
import {API} from '../config'


function UserDashboard() {

    const [history , setHistory] = useState([])
    
    const {user:{_id,email,name,role , createdAt} , token} = isAuthenticated()

    
    const init=(userId,token) =>{
        getOrders(userId,token)
        .then(data => {
            if(data.error){
                console.log(data.error)
            }else{
                setHistory(data)
            }
        })
    }

    useEffect(()=>{
        init(_id , token)
    },[])

    const userLinks = ()=>{
        return (
            <div className="card bg-dark">
                <h4 className="card-header" style={{color:"orange"}}>User Links</h4>
                <ul className="list-group">
                    <strong><li className="list-group-item"><Link className="nav-link" to="/cart" style={{color:"black"}}><i className="fa fa-hand-point-right"></i>my cart</Link></li></strong>
                    <strong><li className="list-group-item"><Link className="nav-link" to={`/profile/${_id}`} style={{color:"black"}}><i className="fa fa-hand-point-right"></i> update profile</Link></li></strong>
                    {role===1 && <strong><li className="list-group-item"><Link className="nav-link" to={`/admin/dashboard`} style={{color:"black"}}><i className="fa fa-hand-point-right"></i> admin dashboard</Link></li></strong>}
                </ul>
            </div>
        )
    }

    const purchaseHistory = history => {
        return (
            <div className="card mb-5 bg-dark">
                <h3 className="card-header" style={{color:"orange"}}>Purchase history</h3>
                <ul className="list-group">
                    <li className="list-group-item">
                        {history.map((h, i) => {
                            return (
                                <div key={i} className="mt-3 mb-3">
                                    <hr/>
                                    <h4>{moment(h.createdAt).format("DD MMM YY")}</h4>
                                    {h.products.map((p, j) => {
                                        return (
                                            <div key={j}>
                                                <div className="card pmd-card">
                                                    <div className="card-body d-flex flex-row">
                                                        <div className="media-body">
                                                            <h5 className="card-title" style={{fontFamily:"serif"}}>{p.name}</h5>	
                                                            <h6>price: ₹{p.price}</h6>
                                                            <h6>status : {h.status}</h6>
                                                        </div>
                                                        <img className="ml-3" src={`${API}/product/photo/${p._id}`} width="82" height="82"/>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            );
                        }).reverse()}
                    </li>
                </ul>
            </div>
        );
    };
    

    return (
        <div>
            <Layout title="Dashboard" description={`Hello ${name}`} className="container-fluid">
                <div className="row">
                    <div className="col-12 col-sm-3 mb-5" style={{fontFamily:"serif"}}>
                        {userLinks()}
                    </div>
                    <div className="col-12 col-sm-9" style={{fontFamily:"serif"}}>
                        <div className="card mb-5 bg-dark">
                            <h3 className="card-header" style={{color:"orange"}}>User Information</h3>
                            <ul className="list-group">
                                <li className="list-group-item">{name}</li>
                                <li className="list-group-item">{email}</li>
                                <li className="list-group-item">{role===1?"admin":"registered User"}<i className="fa fa-check-circle" style={{color:"green"}}></i></li>
                            </ul>
                        </div>
                        {purchaseHistory(history)}
                    </div>
                </div>
            </Layout>
        </div>
    )
}

export default UserDashboard
