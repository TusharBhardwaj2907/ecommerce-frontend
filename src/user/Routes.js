import React from 'react'
import {BrowserRouter , Route , Switch} from 'react-router-dom'
import Signup from './Signup'
import Signin from './Signin'
import Home from '../core/Home'
import PrivateRoute from '../auth/PrivateRoute'
import Dashboard from './UserDashboard'
import AdminRoute from '../auth/AdminRoute'
import AdminDashboard from './AdminDashboard'
import AddCategory from '../admin/AddCategory'
import AddProduct from '../admin/AddProduct'
import Shop from '../core/Shop'
import Product from '../core/Product'
import Cart from '../core/Cart'
import Order from '../admin/Order'
import Profile from './Profile'
import ManageProducts from '../admin/ManageProducts'
import UpdateProduct from '../admin/UpdateProduct'


function Routes() {
    return (
       <BrowserRouter>
            <Switch>
                <Route exact path='/signin' component={Signin}/>
                <Route exact path='/signup' component={Signup}/>
                <Route exact path='/' component={Home}/>
                <Route exact path='/shop' component={Shop}/>
                <Route exact path="/cart" component={Cart}/>
                <Route exact path='/product/:productId' component={Product}/>
                <PrivateRoute path="/user/dashboard" exact component={Dashboard}/>
                <PrivateRoute path="/profile/:userId" exact component={Profile}/>
                <AdminRoute path='/admin/dashboard' exact component={AdminDashboard}/>
                <AdminRoute path='/admin/product/update/:productId' exact component={UpdateProduct}/>
                <AdminRoute path='/admin/products' exact component={ManageProducts}/>
                <AdminRoute exact path="/admin/orders" component={Order}/>
                <AdminRoute path='/create/category' exact component={AddCategory}/>
                <AdminRoute path='/create/product' exact component={AddProduct}/>
            </Switch>
       </BrowserRouter>
    )
}

export default Routes
