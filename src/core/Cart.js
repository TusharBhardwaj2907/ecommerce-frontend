import React,{useState , useEffect} from 'react'
import Layout from './Layout'
import CartShow from './CartShow'
import {Link} from 'react-router-dom'
import {getCart} from './CartHelper'
import Checkout from './Checkout'


function Cart() {


    const [cart , setCart] = useState([])
    const [run , setRun] = useState(false)

    useEffect(()=>{
      setCart(getCart())   
    },[run])

    const showCart = (cart) =>{
        return (
            <div className="col-12 col-sm-6 mt-5">
                <h2 className="mb-4">Cart</h2>
                <hr/>
                {cart.length===0 && <div>
                        <h4>Your cart is empty</h4>
                        <Link to="/shop"><h5>Continue Shopping <i className="fa fa-hand-point-left"></i></h5></Link>
                    </div>}
                {cart.length!==0 && cart.map(((carts,i)=>(
                <div className="mb-4" key={i}>
                     <CartShow result={carts} run={run} setRun={setRun}/>
                </div>))).reverse()}
                </div>
        )
    }

    return (
        <Layout title="Here's your cart" description="putting the cart before thehorse" className="container-fluid">
            <div className="row">
                {showCart(cart)}
                <div className="col-12 col-sm-6 mt-5">
                    <Checkout products={cart} setRun={setRun} run={run}/>
                </div>
            </div>
        </Layout>
    )
}

export default Cart
