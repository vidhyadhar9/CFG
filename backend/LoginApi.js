const express=require("express");
const dotenv=require("dotenv").config();
const cors=require("cors");
const bodyParser=require("body-parser");
const sendEmail = require("./sendEmail");
const nodemailer =require("nodemailer");

const LoginApp=express.Router();
LoginApp.post('/Loginifo',async(request,response)=>{
    const Loginobj=request.app.get('signupcolection');
    let findobj=request.body;
    console.log("request obj"+request.body.password)


    let fdbobj= await Loginobj.findOne(findobj);            //finding user present or not

    console.log("user side password :"+findobj)             //user password

    // console.log(fdbobj.password)
    // console.log(typeof(fdbobj.password))
    // console.log(typeof(findobj.password))
    // console.log(fdbobj)



    if(fdbobj===null)
    {
        response.status(201).send("no user found");
        console.log("no user found");
    }
    else if(fdbobj.email===findobj.email&&fdbobj.password===findobj.password)   //verifing user present or not
    {
        response.status(201).send("succesfully loged in");
        console.log("logging succesfully done")
       
           
                
                console.log('userEMail '+fdbobj.email);
  
                let subject = 'ur login is successful'
                let message='congtrass'                                 //sending emails
                let send_to =fdbobj.email
                let sent_from = process.env.EMAIL_USER
                let reply_to = fdbobj.email
                sendEmail(subject,message,send_to,sent_from,reply_to);





                    // res.status(200).json({success:true,message:"email sent"})
                // }catch(error){
                //     console.log('error in catch' + error)
                // }
           
        







    }
 
})






module.exports=LoginApp;