import React from 'react'
import {API} from '../config'



function ShowImage({item,url}) {
    return (
        <img src={`${API}/${url}/photo/${item._id}`} alt="something went wrong , please refresh.." className="img-fluid mt-3" style={{width:"250px",
            height:"200px",
            borderBottom:"2px ridge"}}/>
    )
}

export default ShowImage
