const express=require("express");
const dotenv=require("dotenv").config();
const cors=require("cors");
const bodyParser=require("body-parser");

const rents=express.Router();




//posting rental houses
rents.post("/post",async(request,response)=>{
    const rentsobj=request.app.get('rentscollection');
    let findobj=request.body;
    console.log(findobj);
    response.status(201).send("succesfully posted");
    await rentsobj.insertOne(findobj);
    console.log("succesfully done");
})



//getting rental houses
rents.get("/get",async(request,response)=>{
    const rentsobj=request.app.get('rentscollection');
    let obj=[];
    obj=await rentsobj.find({}).toArray();
    console.log("objesc"+obj[0].location);
    response.send({payload:obj,message:"array of hpuses"});
    console.log("succesfully done");
})














module.exports=rents;