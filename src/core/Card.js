import React from 'react'
import {Link} from 'react-router-dom'
import ShowImage from './ShowImage'
import {addItem } from './CartHelper'
import './css/card.css'


function Card({product }) {

    const addToCart=()=>{
        addItem(product , ()=>{})
    }


        return (
            <div>
                {product && <div className="card card-cascade card-ecommerce">
                    <div className="view view-cascade overlay">
                        <ShowImage item={product} url="product"/>
                        <a href={`/product/${product._id}`}>
                            <div className="mask rgba-white-slight"></div>
                        </a>
                    </div>
                        <div className="card-body card-body-cascade text-center">
                            <h4 className="card-title"><strong>{product.name}</strong></h4>
                            <div className="mt-3">
                                <strong><span className="float-left mt-2">₹ {product.price} <span className="discount">₹<strike>{product.price * 2}{product.quantity>50 && product.quantity>0 ? <span className="badge badge-pill badge-success">in stock</span>:<span className="badge badge-pill badge-info">limited</span>}{product.quantity<=0 && <span className="badge badge-pill badge-danger">out of stock</span>}</strike></span></span></strong>
                                <Link to={`/product/${product._id}`}> <span className="float-right"><button className="btn btn-dark" style={{color:"orange"}}><i className="fa fa-eye"></i>view</button></span></Link>
                                <button className="btn btn-dark" onClick={addToCart}><span className="float-right mr-0"><Link to="/cart"><i className="fa fa-shopping-cart" style={{color:"orange"}}></i></Link></span></button> 
                            </div>
                        </div>
                        
                    </div>
                } 
            </div>           
            )
}

export default Card
