const express=require("express");
const dotenv=require("dotenv").config();
const cors=require("cors");
const bodyParser=require("body-parser");
const sendEmail = require("./sendEmail");
const nodemailer =require("nodemailer");


const SignApp=express.Router();
SignApp.post("/Signupinfo",async (request,response)=>{
    const Signobj=request.app.get('signupcolection');
    let findobj=request.body;
    console.log("request obj "+request.body.password);

    let fdbobj=await Signobj.findOne(findobj);
    console.log("user side pass"+findobj);
    if(fdbobj)
    {
        response.status(201).send("user already exists");
        console.log("user already exists");
       

    }
    else if(fdbobj===null){
        response.status(201).send("succesfully signedup");
        console.log("succesfully done");
        Signobj.insertOne(findobj);

        //mailing 
                        
       if(fdbobj===null)
       {
        let subject = 'signup  is successful'
        let message='congtrass'                                 //sending emails
        let send_to =findobj.email
        let sent_from = process.env.EMAIL_USER
        let reply_to = findobj.email
        sendEmail(subject,message,send_to,sent_from,reply_to);
       }
    }
   
})
module.exports=SignApp;