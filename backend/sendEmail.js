const nodemailer =require("nodemailer");
const dotenv=require("dotenv").config();
const cors=require("cors");
const bodyParser=require("body-parser");




const sendEmail=async(subject,message,send_to,sent_from,reply_to)=>{

    const transporter=nodemailer.createTransport({
        host:process.env.EMAIL_HOST,
        Port:"587",
        service:'gmail',
        auth:{
            user:process.env.EMAIL_USER,
            pass:process.env.EMAIL_PASS,
        },
        tls:{
            rejectUnauthorized:false,
        }
    })

console.log("sendto: "+send_to);
console.log("sendfrom: "+sent_from);
// console.log("sendto: "+send_to);

    const options={
        from:sent_from,
        to:send_to,
        replyTo:reply_to,
        subject:subject,
        html:message,
        dsn:{
            id:'some random message specific id',
            return:'headers',
            notify:'success',
            recipient:'v.vidhyadharreddy9@gmail.com'
        }
    }



    //send Email
    transporter.sendMail(options,(err,info)=>{
        if(err){
            console.log("err in sendemail:"+err.message);
        }
        else{
            console.log(info)
        }
    })
}



module.exports=sendEmail;