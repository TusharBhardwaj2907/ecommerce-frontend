import React from 'react'

function Footer() {
    return (
        <div className="mt-5">
                <div className="footer bg-dark text-center p-3" style={{bottom:"0px", width:"100%"}}>
            <div>
                <a className="btn btn-social-icon btn-google" href="http://google.com/+"><i
                                    className="fa fa-google-plus fa-lg" style={{color:"orange"}}></i></a>
                            <a className="btn btn-social-icon btn-facebook" href="http://www.facebook.com/profile.php?id="><i
                                    className="fa fa-facebook fa-lg" style={{color:"orange"}}></i></a>
                            <a className="btn btn-social-icon btn-linkedin" href="http://www.linkedin.com/in/"><i
                                    className="fa fa-linkedin fa-lg" style={{color:"orange"}}></i></a>
                            <a className="btn btn-social-icon btn-twitter" href="http://twitter.com/"><i
                                    className="fa fa-twitter fa-lg" style={{color:"orange"}}></i></a>
                            <a className="btn btn-social-icon btn-youtube" href="http://youtube.com/"><i
                                    className="fa fa-youtube fa-lg" style={{color:"orange"}}></i></a>
                            <a className="btn btn-social-icon btn-envelope" href="mailto:vishawjeet20905@gmail.com"><i
                                    className="fa fa-envelope-o fa-lg" style={{color:"orange"}}></i></a>
            </div>
            <h4 style={{color:"orange" ,fontSize:"14px"}}>copyright 2000 <i className="fa fa-copyright"></i></h4>
        </div>
        </div>
    )
}

export default Footer
