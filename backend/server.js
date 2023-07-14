const express=require("express");
const dotenv=require("dotenv").config();
const cors=require("cors");
const bodyParser=require("body-parser");
// const sendEmail = require("./utils/sendEmail");
// const mysql =require('mysql');
const nodemailer =require("nodemailer");

//create app
const app=express();

//assigning port
const PORT =process.env.PORT|| 5000 ;
app.listen(PORT,()=>{
    console.log(`server running on  port ${PORT} ...`);//port
}) 

 // console.log('email host',process.env.EMAIL_HOST);
// console.log('email',process.env.EMAIL_USER);
// console.log('emial pass ',process.env.EMAIL_PASS);


//Middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());



const LoginApp=require('./LoginApi');// Login Api
app.use('/Login',LoginApp);

const SignApp=require('./SignupApi');//Signup Api
app.use('/signup',SignApp);

const Forget=require('./ForgottenApi');//forget password api
app.use('/forget',Forget);

const rents=require('./RentsApi');
app.use('/rents',rents);


//creating and connecting to db
//importing mongo 
const mclinet=require('mongodb').MongoClient;
mclinet.connect('mongodb://127.0.0.1/27017')
.then(dbref=>{
const dbobj=dbref.db('summerpodb');//connecting to required database;


const signupcolection=dbobj.collection('signup');//getting collection from db
const rentscollection=dbobj.collection('rents');

//setting for api
app.set('signupcolection',signupcolection);
app.set('rentscollection',rentscollection);

console.log("db successfully connected");
}).catch(err=>{console.log("err at db:"+err.message)});











//url error handling
let urlerrorHandler=(request,response,next)=>{
    response.send("invalid path")
}
app.use("*", urlerrorHandler);


//typo/errorhandling
const errorHandlingmiddleware=(error,request,response,next)=>{
response.send({message:error.message})
}
app.use( errorHandlingmiddleware)
