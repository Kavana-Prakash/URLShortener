const express=require("express");
const router=express.Router();
const {handleCreateShortUrl, handleRedirectURL,handleGetAnalytics}=require("../controllers/url");

router.post("/",handleCreateShortUrl);
router.get("/:shorturl",handleRedirectURL)
router.get("/analytics/:shorturl",handleGetAnalytics)

module.exports=router;