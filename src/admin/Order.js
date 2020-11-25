import React, { useEffect, useState } from 'react'
import {API} from '../config'
import {isAuthenticated} from '../auth/helper'
import Layout from '../core/Layout'
import moment from 'moment'
import {Link} from 'react-router-dom'

function Order() {

    const [orders , setorders] = useState([])
    const [status , setStatus] = useState([])
    const [showMenu , setShowMenu] = useState(false)
    const [loading , setLoading] = useState(false)

    const {user , token} = isAuthenticated()

    const getOrders = (userId , t) =>{
        setLoading(true)
        return fetch(`${API}/order/list/${userId}` , {
            method:"GET",
            headers:{
                Accept:"application/json",
                "Content-Type":"application/json",
                Authorization:`Bearer ${t}`
            }
        }).then(res => {return res.json()})
    }

    const editStatus = (userId , t , orderId , status) =>{
        setLoading(true)
        return fetch(`${API}/order/${orderId}/status/${userId}` , {
            method:"PUT",
            headers:{
                Accept:"application/json",
                "Content-Type":"application/json",
                Authorization:`Bearer ${t}`
            },
            body:JSON.stringify({status , orderId})
        }).then(res => {return res.json()})
    }

    const getStatus = (userId , t) =>{
        setLoading(true)
        return fetch(`${API}/order/status-value/${userId}` , {
            method:"GET",
            headers:{
                Accept:"application/json",
                "Content-Type":"application/json",
                Authorization:`Bearer ${t}`
            }
        }).then(res => {return res.json()})
    }

    const listOfOrders = () =>{
        getOrders(user._id, token)
        .then(data => {
            setLoading(false)
            setorders(data)
        })
        .catch(err => console.log(err))
    }
    const loadStatus = () =>{
        getStatus(user._id, token)
        .then(data => {
            setLoading(false)
            setStatus(data)})
        .catch(err => console.log(err))
    }

    useEffect(()=>{
        listOfOrders()
        loadStatus()
    },[])

    const showLoading =load =>(
        load && <h5 className="container alert alert-info bg-dark" style={{color:"orange"}}>Loading...</h5>
    )

    const showOrdersLength = (orders) =>{
        if(orders.length>0){
            return (
            <h3 className="card-header bg-dark" style={{color:"orange"}}>Total Orders :{orders.length}</h3>
            )
        }else{
            return (
                <h3 className="card-header bg-dark" style={{color:"orange"}}>{loading ? "loading...":"No orders yet"}</h3>
            )
        }
    }

    const showInput = (key , value) =>(
        <div className="input-group mb-2 mr-sm-2">
            <div className="input-group-prepend">
                <div className="input-group-text bg-dark" style={{color:"orange"}}>
                    {key}
                </div>
            </div>
                <input type="text" value={value} className="form-control bg-dark" style={{color:"orange"}} readOnly/>
        </div>
    )

    const handleChange =(e , orderId) =>{
        editStatus(user._id , token , orderId , e.target.value)
        .then(data => {
            if(data.error){
                console.log("Status update failed")
            }else{
                listOfOrders()
            }
        })
    }

    const showStatus =(o) =>(
        <div className="form-group">
            <h3 className="mark mb-4">Status : {o.status}</h3>
            <select className="form-control" onChange={(e)=>handleChange(e,o._id)}>
                <option>Update Status</option>
                {status.map((s,i)=>(
                    <option key={i} value={s}>{s}</option>
                ))}
            </select>
        </div>
    )

    const showToggle =() =>{
        setShowMenu(!showMenu)
    }
    const show = showMenu ? "show":""

    return (
        <Layout title="Orders Page" description="Node React Ecommerce" className="container-fluid">
                {showLoading(loading)}
                <div className="card">
                    {showOrdersLength(orders)}
                    {orders.length>0 && orders.map((o,i)=>{
                        return (
                            <div className="card" key={i} style={{fontFamily:"cursive"}}>
                                <h3 className="card-header bg-dark" style={{color:"orange"}} onClick={showToggle} data-toggle="collapse"><span className="">Order Id : {o._id}</span></h3>
                                <div className={"card-body collapse" + show} >
                                {o.user!==null && <ul className="list-group">
                                    <li className="list-group-item">Status : {showStatus(o)}</li>
                                    <li className="list-group-item">Transaction Id : {o.transaction_id}</li>
                                    <li className="list-group-item">Amount : ₹ {o.amount}</li>
                                    <li className="list-group-item">Ordered By : {o.user.name}</li>
                                    <li className="list-group-item">Ordered on : {moment(o.createdAt).fromNow()}</li>
                                    <li className="list-group-item">Delivery Address : {o.address}</li>
                                </ul>}
                                <h3 className="mt-4 mb-4 font-italic">Total products in the order : {o.products.length}</h3>
                                {o.products.map((p,j)=>(
                                    <div className="mb-4 card" key={j} style={{padding:"20px" , fontFamily:"cursive"}}>
                                        {showInput('Product name' , p.name)}
                                        {showInput('Product id' , p._id)}
                                        {showInput('Product total' , p.count)}
                                        {showInput('Product price' , p.price)}
                                    </div>
                                ))}
                                </div>
                            </div>
                        )
                    }).reverse()}
                </div>
                <Link to="/admin/dashboard"><button className="btn btn-dark ml-3 mt-3 " style={{color:"orange"}}>back</button></Link>
        </Layout>
    )
}

export default Order
