const express=require("express");
const mongoose=require("mongoose");
const PORT=8000;
const {connectMongoDB}=require("./connect");
const router=require("./routes/url")
const app=express();

//connection 
connectMongoDB("mongodb://127.0.0.1:27017/shortURL")
.then(()=>console.log("connected to mongoDB"))
.catch((err)=>console.log(err));

//middleware
app.use(express.json())

//routes
app.use("/url",router);
app.listen(PORT, ()=> console.log("listening"))