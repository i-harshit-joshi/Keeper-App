import React, { useState } from "react";
import "./AddKeeper.css"
import axios from "axios";

export const AddKeeper = ({setKeeperList}) =>{
    console.log(setKeeperList);
    const [keeperObj, setKeeperObj] = useState({
        title: "",
        description: ""
    })
    const handleChange = (e)=>{
        const {name, value} = e.target
        setKeeperObj({
            ...keeperObj,
            [name]: value
        })
    }
    const add = (e)=>{
        if(keeperObj.title){
            // setKeeperList(keeperObj);
                
           axios.post("http://localhost:3001/api/addNew", keeperObj)
           .then(res => console.log(res))
           .catch(err => console.log(err))
          
            
        }
        setKeeperObj({
            title: "",
            description: ""
        })
    }
    return(
        <div className="AddKeeper">
            <input 
            className="inputBox titleInput" 
            type="text" 
            name="title"
            autoComplete="off"
            placeholder="Add Title"
            onChange={handleChange}
            value={keeperObj.title}
            />
            <textarea 
            className="inputBox description"
            name="description" 
            placeholder="Add description here"
            onChange={handleChange}
            value={keeperObj.description}
            />
            <div className="addButton" onClick={add}>Add</div>

            
        </div>
    )
}