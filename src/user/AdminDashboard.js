import React from 'react'
import Layout from '../core/Layout'
import {isAuthenticated} from '../auth/helper'
import {Link} from 'react-router-dom'


function AdminDashboard() {
    
    const {user:{email,name,role}} = isAuthenticated()

    const adminLinks = ()=>{
        return (
            <div className="card">
                <h4 className="card-header bg-dark" style={{color:"orange"}}>Admin Links</h4>
                <ul className="list-group">
                    <strong><li className="list-group-item"><Link className="nav-link" to="/create/category" style={{color:"black"}}><i className="fa fa-hand-point-right"></i>create category</Link></li></strong>
                    <strong><li className="list-group-item"><Link className="nav-link" to="/create/product" style={{color:"black"}}><i className="fa fa-hand-point-right"></i> create product</Link></li></strong>
                    <strong><li className="list-group-item"><Link className="nav-link" to="/admin/orders" style={{color:"black"}}><i className="fa fa-hand-point-right"></i>view orders</Link></li></strong>
                    <strong><li className="list-group-item"><Link className="nav-link" to="/admin/products" style={{color:"black"}}><i className="fa fa-hand-point-right"></i>manage products</Link></li></strong>
                    <strong><li className="list-group-item"><Link className="nav-link" to="/user/dashboard" style={{color:"black"}}><i className="fa fa-hand-point-right"></i>user dashboard</Link></li></strong>
                </ul>
            </div>
        )
    }

    return (
        <div>
            <Layout title="Dashboard" description={`Hello ${name}`} className="container-fluid">
                <div className="row" style={{fontFamily:"cursive"}}>
                    <div className="col-12 col-sm-4 mb-5">
                        {adminLinks()}
                    </div>
                    <div className="col-12 col-sm-8">
                        <div className="card mb-5 bg-dark">
                            <h3 className="card-header" style={{color:"orange"}}>Admin Information</h3>
                            <ul className="list-group">
                                <li className="list-group-item">{name}</li>
                                <li className="list-group-item">{email}</li>
                                <li className="list-group-item">{role===1?"Admin":"Registered User"}<i className="fa fa-check-circle" style={{color:"green"}}></i></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </Layout>
        </div>
    )
}

export default AdminDashboard
