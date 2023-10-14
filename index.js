const express=require("express");
const mongoose=require("mongoose");
const path=require("path");
const PORT=8000;
const {connectMongoDB}=require("./connect");
const urlRoute=require("./routes/url")
const staticRoute=require("./routes/staticRoute")
const app=express();

//connection 
connectMongoDB("mongodb://127.0.0.1:27017/shortURL")
.then(()=>console.log("connected to mongoDB"))
.catch((err)=>console.log(err));

//middleware
app.use(express.json())
app.use(express.urlencoded({extension:false}));

//views
app.set('view engine', 'ejs');
app.set("views",path.resolve("./views"));
app.use("/",staticRoute);
//routes
app.use("/url",urlRoute);
app.listen(PORT, ()=> console.log("listening"))