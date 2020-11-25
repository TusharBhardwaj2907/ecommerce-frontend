import React,{useState} from 'react'
import {API} from '../config'
import {Link} from 'react-router-dom' 
import { updateCartCount , removeFromCart} from './CartHelper'


function CartShow({result , setRun=f=>f , run=undefined}) {
    
    const [count,setCount] = useState(result.count)


    const adjustVolume = (resultid) =>(event) =>{
        setRun(!run)
        setCount(event.target.value<=1 ? 1:event.target.value)
        if(event.target.value>=1 && event.target.value<=result.quantity){
            updateCartCount(resultid , event.target.value)
        }
        if(event.target.value>=1 && event.target.value>result.quantity){
            updateCartCount(resultid , result.quantity)
            setCount(event.target.value<=result.quantity ? event.target.value:result.quantity)
        }
    }

    const showCartbuttonOption = ()=>{
        return <div className="d-inline-block ml-4">
            <div className="input-group mb-3">
                <input type="number" className="form-control" style={{maxWidth:"70px"}}  value={count} onChange={adjustVolume(result._id)}/>
            </div>
        </div>
    }

    const limit = (str) =>{
        if(str.length>40){
            return str=str.substring(0,40)+" "+"read more..." 
        }else{
            return str
        }
    }

    return (
        <div className="container-fluid">
            {result && ( 
                <div className="card pmd-card">
                <div className="card-body d-flex flex-row">
                    <div className="media-body">
                        <h3 className="card-title" style={{fontFamily:"cursive"}}>{result.name}</h3><hr/>
                        <p id="cartDesc" className="card-subtitle" style={{fontFamily:"cursive"}}>{limit(result.description)}</p>		
                    </div>
                    <img className="ml-3" src={`${API}/product/photo/${result._id}`} width="152" height="152"/>
                </div>
                <div className="card-footer">
                    <div className="d-inline-block mr-md-5">
                        <strong><h6 className="mt-2 mr-2 d-inline-block" >₹ {result.price}</h6></strong>
                        <strong><h6 className="mt-2 mr-2 d-inline-block"> ₹ <strike style={{color:"red"}}>{result.price*2} </strike></h6></strong>
                    </div>
                    <div className="d-inline-block">
                        <button onClick={()=>{removeFromCart(result._id) ; setRun(!run)}} className="btn btn-danger mt-2 mb-2 d-inline-block"><i className="fas fa-cart"></i>Remove</button>
                        {showCartbuttonOption()}
                        <Link to={`/product/${result._id}`}> <span className="d-inline-block ml-3"><button className="btn btn-dark" style={{color:"orange"}}><i className="fa fa-eye"></i>view</button></span></Link>
                    </div>
                </div>
            </div>
            )}
        </div>
    )
}

export default CartShow
