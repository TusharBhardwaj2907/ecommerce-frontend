import React from 'react'
import Menu from './Menu'
import './layout.css'
import Footer from './Footer'

function Layout(props) {
    return (
        <div>
            <Menu/>
            <div className="jumbotron bg-dark container-fluid" style={{borderRadius:"0px" ,color:"orange" , fontFamily:"serifs" , position:"relative"}}>
                <h2>{props.title}</h2>
                <q className="lead">{props.description}</q>
            </div>
            <div className={props.className}>
                {props.children}
            </div>
            <Footer/>
        </div>
    )
}

export default Layout
