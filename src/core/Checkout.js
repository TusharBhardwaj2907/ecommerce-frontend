import React,{useState , useEffect} from 'react'
import {Link ,Redirect} from 'react-router-dom'
import {API} from '../config'
import {isAuthenticated} from '../auth/helper'
import DropIn from 'braintree-web-drop-in-react'
import {emptyCart} from './CartHelper'
import {createOrder} from './apiCore'
import {state} from './apiCore'


function Checkout({products , setRun=f=>f , run=undefined}) {

    const [data,setData] = useState({
        success:false,
        clientToken:null,
        error:'',
        instance:{},
        address:'',
        loading:false
    })
    const [add , setAdd] = useState({
        area:"",
        city:"",
        state:"",
        phoneNumber:""
    })

    const userId = isAuthenticated() && isAuthenticated().user._id
    const token = isAuthenticated() && isAuthenticated().token

    const getTotal = () =>{
        return products.reduce((currentValue, nextValue) => {
            return currentValue + nextValue.count * nextValue.price;
        }, 0);
    }

    const checkout = (id,token) =>{
        getClientToken(id,token)
        .then(res =>{setData({...data , clientToken:res.clientToken})})
        .catch(err =>{setData({...data , error:err})})
    }

    useEffect(()=>{
        checkout(userId,token)
    },[])

    const getClientToken =(id , token) =>{
        return fetch(`${API}/braintree/getToken/${id}`,{
            method:"GET",
            headers:{
                Accept:"application/json",
                "Content-Type":"application/json",
                Authorization:`Bearer ${token}`
            }
        }).then(res => {return res.json()})
    }
    const processPayment =(id , token , paymentData) =>{
        return fetch(`${API}/braintree/payment/${id}`,{
            method:"POST",
            headers:{
                Accept:"application/json",
                "Content-Type":"application/json",
                Authorization:`Bearer ${token}`
            },
            body:JSON.stringify(paymentData)
        }).then(res => {return res.json()})
    }


    let deliveryAddress=data.address
    const buy =() =>{
            setData({loading:true})
            let nonce
            let getNonce = data.instance.requestPaymentMethod()
                .then(res =>{
                    nonce = res.nonce
                    const paymentData = {
                        paymentMethodNonce:nonce,
                        amount:getTotal(products)
                    }
                processPayment(userId , token , paymentData)
                    .then(res => {
                        if(res.message){
                            setData({...data , error:res.message , loading:false})
                        }else{
                            const createOrderData = {
                                products:products,
                                transaction_id:res.transaction.id,
                                amount:res.transaction.amount,
                                address:deliveryAddress
                            }
                        createOrder(userId , token , createOrderData)
                            setData({...data , success:true})
                            emptyCart(()=>{
                                setRun(!run);
                                setData({loading:false , success:true})
                            })
                        }
                    }).catch(err => {setData({...data , loading:false , error:err.message})})
                }).catch(err=> {setData({...data , loading:false , error:err.message})})
}
    const showLoading =(loading) =>(
        <div className="alert alert-warning" style={{display:loading?'':"none"}}>
                    {loading && `Loading... please don't back or refresh the page`}
        </div>
    )

    const showError = (error) =>(
        <div className="alert alert-danger" style={{display:error?'':"none"}}>
            {error}
        </div>
    )

    const showSuccess = (success) =>(
        <div className="alert alert-info" style={{display:success?'':"none"}}>
            Transaction Successfull 
        </div>
    )

    const handleAddress = (name)=>(event) =>{
        setAdd({...add , [name]:event.target.value})
        makeAddress()
    }

    const makeAddress = () =>{
        let Add = add.area+" , " + add.city + " , "+ add.state+"    and     " +"phone number : " + add.phoneNumber
        setData({...data , address:Add})
    }

    const show = (a , p) =>(
        <div>
            <button onClick={buy} className="btn btn-success mt-2 mb-2 btn-block">Pay</button>   
        </div>       
    )

    const showDropIn = () =>(
        <div onBlur={()=>setData({...data , error:''})}>
            {data.clientToken!==null && products.length>0 ? (<div>
                <div className="group-group mb-3">
                    <label className="text-muted">Area:</label>
                    <input onChange={handleAddress('area')} className="form-control" value={add.area} placeholder="street and area" required/>
                    <label className="text-muted">City :</label>
                    <input onChange={handleAddress('city')} className="form-control" value={add.city} placeholder="city" required/>
                    <label className="text-muted">State :</label>
                    <select onChange={handleAddress('state')} className="btn btn-transparent form-control" style={{color:"black" , border:"1px black ridge"}}>
                        <option value="">select</option>
                        {state.map((state,i)=>(
                            <option key={i} value={state}>{state}</option>
                        ))}
                    </select>
                    <label className="text-muted">Phone No. :</label>
                    <input type="tel" onChange={handleAddress('phoneNumber')} className="form-control"  value={add.phoneNumber} maxLength="10" placeholder="+91" pattern="[0-9]{3}-[0-9]{4}-[0-9]{3}" required/>
                </div>
                <DropIn options={{authorization:data.clientToken , paypal:{flow:"vault"}}} onInstance={(instance) => (data.instance=instance)} />
                {add.city && add.phoneNumber.length===10 && add.state && show()}
            </div>):null}
        </div>
    )
    return (
        <div>
            <h2 className="mb-4">Your Cart Summary</h2>
            <hr/>
            <h3>Total : ₹{getTotal()}</h3>
            {showSuccess(data.success)}
            {showLoading(data.loading)}
            {showError(data.error)}
            {isAuthenticated() ? (showDropIn()) : (<Link to="/signin"><button className="btn btn-danger mt-2 mb-2">Please Signin for Checkout</button></Link>)}
        </div>
    )
}

export default Checkout
