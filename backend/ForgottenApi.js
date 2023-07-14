const express=require("express");
const dotenv=require("dotenv").config();
const cors=require("cors");
const bodyParser=require("body-parser");
const sendEmail = require("./sendEmail");
const nodemailer =require("nodemailer");

const ForApp=express.Router();
let otp;



//forget password
ForApp.post("/Forgetpw",async(request,response)=>{
    const Signobj=request.app.get('signupcolection');
    let findobj=request.body;
    otp=request.body.OTP;
    console.log("request obj "+request.body.userdata.email);

    let fdbobj=await Signobj.findOne(findobj.email);
    console.log("user side pass :"+findobj.OTP);
    console.log("data obj:"+fdbobj);
    if(fdbobj){
        response.status(201).send("yes");
        let subject = request.body.OTP;
        let message='congtrass'                                 //sending emails
        let send_to =findobj.userdata.email
        let sent_from = process.env.EMAIL_USER
        let reply_to = findobj.userdata.email
        console.log("fogettapis sendemail")
        sendEmail(subject,message,send_to,sent_from,reply_to);

    }
    else{
        response.status(201).send("no");
    }
});



//otp verification
ForApp.post('/OTP',async(request,response)=>{
const Signobj=request.app.get('signupcolection');

console.log("otp at backend:"+request.body.OTP,otp)
if(otp===request.body.OTP){

    response.status(201).send("yes");

}
else{
    response.status(201).send("no");
}
})


//confirm password

ForApp.put('/confirm',async(request,response)=>{
    const Signobj=request.app.get('signupcolection');
    
    console.log("o w at confirming :"+request.body.password)
    console.log("mail at confirming :"+request.body.email)
    console.log("npw at confirming :"+request.body.confirmpw)
    if(request.body.password===request.body.confirmpw){
    
       
        let filter = { email: request.body.email }; // Create a filter object
        let obj;
       await Signobj.findOne(filter)
       .then(res=>{console.log("res:"+res)
          obj=res;                                  
    })
       .catch(err=>console.log("err at finding :"+err.message)); // Use the filter object in the findOne() method
        let obj1 = obj;
        console.log("objects are "+obj.email);
        obj1.password=request.body.password
        console.log("new pass :"+obj1.password)
        let update = { $set: { password: obj1.password } }; // Create the update object
        await Signobj.updateOne(filter, update)
        .then(res=>{
            console.log("res is"+res.acknowledged);
            response.status(201).send(res.acknowledged);
        })
        .catch(err=>{console.log("err at :"+err.message)})





        // console.log("obj email:" + obj);
        // obj1.password=request.body.password;
        // let res=await Signobj.UpdateOne(obj, { $set: {  obj1 } });
        // if(res)
        // {
        //     console.log("update is succesful");
        // }
    }
    else{
        response.status(201).send("no");
    }
    })





module.exports=ForApp;