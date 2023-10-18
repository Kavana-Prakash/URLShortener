const express=require("express");
const staticRouter=express.Router();
const URL=require("../models/url");
staticRouter.get("/",async (req,res)=>{
    const allUrls=await URL.find({});
    return res.render('home',{
        urls:allUrls,
    })
})
staticRouter.get("/signup",async (req,res)=>{
    return res.render('signup')
})
staticRouter.get("/login",async (req,res)=>{
    return res.render('login')
})
module.exports=staticRouter;