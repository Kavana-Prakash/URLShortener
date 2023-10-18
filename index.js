const express=require("express");
const path=require("path");
const cookieParser=require("cookie-parser");
const PORT=8000;

const {connectMongoDB}=require("./connect");

const urlRoute=require("./routes/url")
const staticRoute=require("./routes/staticRoute")
const userRoute = require("./routes/user")

const {restrictToLoggedInUser} = require("./middlewares/auth")

const app=express();

//connection 
connectMongoDB("mongodb://127.0.0.1:27017/shortURL")
.then(()=>console.log("connected to mongoDB"))
.catch((err)=>console.log(err));

//middleware
app.use(express.json())
app.use(express.urlencoded({extension:false}));
app.use(cookieParser());

//views
app.set('view engine', 'ejs');
app.set("views",path.resolve("./views"));

//routes
app.use("/url",restrictToLoggedInUser, urlRoute);
app.use("/user",userRoute);
app.use("/",staticRoute);



app.listen(PORT, ()=> console.log("listening"))