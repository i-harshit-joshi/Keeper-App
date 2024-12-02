import React from "react";
import "./ShowKeeper.css"
import axios from "axios";

export const ShowKeeper = ({keeperList, setKeeperList}) => {
    function handleDeleteBtn (id){
        axios.post("http://locahost:3001/api/delete", {id})
        .then(res => setKeeperList(res.data))
    }
    return(
        <div className="ShowKeeper row">
            {keeperList.map(keeper => {
                return(
                <div className="KeeperCard col-md-3" key={keeper._id}>
                <h1 className="title">{keeper.title}<i className="deleteIcon fa fa-trash" onClick={()=>{
                    handleDeleteBtn(keeper._id)
                }}></i></h1>
                <textarea className="descriptionBox" name="description" value={keeper.description} readOnly/>
                
            </div>)
            })}
            
            
            
        </div>
    )
}