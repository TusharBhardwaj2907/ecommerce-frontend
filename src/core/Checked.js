import React,{useState} from 'react'

function Checked({categories , handleCategory}) {
    const [checked , setChecked] = useState([])
    
    const handleChecked=(c)=>()=>{
        const currentCategoryId = checked.indexOf(c)
        const newCheckedCategoryId = [...checked]

        if(currentCategoryId===-1){
            newCheckedCategoryId.push(c)
        }else{
            newCheckedCategoryId.splice(currentCategoryId,1)
        }
        setChecked(newCheckedCategoryId)
        handleCategory(newCheckedCategoryId)
    }
    return categories && categories.map((category,i)=>(
                <li key={i} className="list-unstyled">                            
                    <input type="checkbox" onChange={handleChecked(category._id)} value={checked.indexOf(category._id===-1)} className="form-check-input"/>
                    <label className="form-control-label">{category.name}</label>
            </li>
            ))
}

export default Checked
