import React,{useState} from 'react'
import {API} from '../config'
import {Redirect} from 'react-router-dom'
import {addItem} from './CartHelper'


function ShowProduct({result}) {

    const [redirect , setredirect] = useState(false)

    const addToCart=()=>{
        addItem(result , ()=>{setredirect(true)})
    }
    const redirected = () =>{
        if(redirect){
            return <Redirect to="/cart"/>
        }
    }
    
    const rating = () =>(
        <div className="d-inline-block mt-2 mb-4 ml-2">
            <i className="fa fa-star" style={{color:result.sold>0?"orange":"black"}}></i>
            <i className="fa fa-star" style={{color:result.sold>=20?"orange":"black"}}></i>
            <i className="fa fa-star" style={{color:result.sold>=40?"orange":"black"}}></i>
            <i className="fa fa-star" style={{color:result.sold>=60?"orange":"black"}}></i>
            <i className="fa fa-star" style={{color:result.sold>=80?"orange":"black"}}></i>
            ({result.sold})
        </div>
    )

    return (
        <div className="container-fluid">
            {result && ( 
                <div className="card pmd-card">
                <div className="card-body d-flex flex-row">
                    <div className="media-body">
                        <h2 className="card-title" style={{fontFamily:"cursive"}}>{result.name}</h2><hr/>
                        <p className="card-subtitle" style={{fontFamily:"cursive"}}>{result.description}</p>		
                    </div>
                    <img className="ml-3" alt="something went wrong , please refresh.." src={`${API}/product/photo/${result._id}`} width="152" height="152"/>
                </div>
                <div className="card-footer">
                    <div className="d-inline-block mr-md-5">
                        <strong><h6 className="mt-2 mr-2 d-inline-block" >₹ {result.price}</h6></strong>
                        <strong><h6 className="mt-2 mr-2 d-inline-block"> ₹ <strike style={{color:"red"}}>{result.price*2} </strike></h6></strong>
                        <button className="btn btn-dark d-inline-block mr-2" onClick={addToCart} style={{color:"orange"}}><i  className="fa fa-shopping-cart"></i></button>
                        {rating()}
                    </div>
                   <div className="d-inline-block mr-md-5">
                   <i className="fa fa-warning fa-2x d-inline-block" data-toggle="popover" title="No-contact Delivery"
                        data-content="Delivery Associate will place the order on your doorstep and step back to maintain a 2-meter distance.No customer signatures are required at the time of delivery.For Pay-on-Delivery orders, we recommend paying using Credit card/Debit card/Netbanking via the pay-link sent via SMS at the time of delivery. To pay by cash, place cash on top of the delivery box and step back."></i>
                    <i className="fa fa-retweet fa-2x ml-2  d-inline-block" data-toggle="popover" title="10 Days Replacement Only"
                        data-content="10 Days Replacement, OnlyThis item is eligible for free replacement, within 10 days of delivery, in an unlikely event of damaged, defective or different item delivered to you. Please keep the item in its original condition, with outer box or case, accessories, CDs, user manual, warranty cards, scratch cards, and other accompaniments in manufacturer packaging for a successful return pick-up. We may contact you to ascertain the damage or defect in the product prior to issuing replacement."></i>
                    <i className="fa fa-truck fa-2x ml-2  d-inline-block" data-toggle="popover" title="Radhey Fast Delivery"
                        data-content="Radhey directly manages delivery for this product. Order delivery tracking to your doorstep is available."></i><br />
                   </div>
                   <h5 className="d-inline-block mr-md-2">Free delivery on orders over <i className="fa fa-rupee"></i>499</h5>
                </div>
            </div>
            )}
        {redirected()}
        </div>
    )
}

export default ShowProduct
