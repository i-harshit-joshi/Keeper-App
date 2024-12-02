import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import { Keeper } from "./Models/keeperModel.js";

const app = express();
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://localhost:27017/keeperAppDB")
.then(()=>console.log("DB Connected"))
.catch((err)=>console.log(err))

app.get("/api/getAll", async (req,res)=>{
    try{
    let response = await Keeper.find({})
    console.log(response)
    res.status(200).json(response);

    } catch(err){
        console.log(err)
    }
        
    
    
});
app.post("/api/addNew",async (req,res)=>{
    try{
    const {title, description} = req.body;
    const keeperObj = new Keeper({
        title: title,
        description: description
    })
    let savedInput =  await keeperObj.save()
    console.log(savedInput)
}catch(err){
    console.log(err)
}
})
app.post("/api/delete",async (req,res)=>{
    const {id} = req.body;
    await Keeper.deleteOne({_id: id}, async ()=>{
        try{
            let response = await Keeper.find({})
            console.log(response)
            res.status(200).json(response);
        
            } catch(err){
                console.log(err)
            }   
    })
})

app.listen(3001,()=>{
    console.log("Ruuning on port 3001");
})