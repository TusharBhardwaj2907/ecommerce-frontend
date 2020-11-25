import React,{useState} from 'react'

function RadioBox({prices , handleCategory}) {

    const [value,setvalue] = useState(0)

    const handlePrice = (event) =>{
        handleCategory(event.target.value)
        setvalue(event.target.value)
    }

    return prices && prices.map((p,i)=>(
        <div key={i}>                            
            <input type="radio" onChange={handlePrice} value={`${p._id}`} name={p} className="mr-2 ml-2"/>
            <label className="form-control-label">{p.name}</label>
        </div>
    ))
}

export default RadioBox
