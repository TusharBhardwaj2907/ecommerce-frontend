import React from 'react'
import {API} from '../config'



function ShowImage({item,url}) {
    return (
        <img src={`${API}/${url}/photo/${item._id}`} alt="loading... please refresh" className="img-fluid mt-3" style={{width:"250px",
            height:"200px",
            borderBottom:"2px ridge"}}/>
    )
}

export default ShowImage
