const shortUrl = require("shortid");
const URL = require("../models/url");
async function handleCreateShortUrl(req,res){
    const body = req.body;
    if(!body.url) return res.status(400).json({msg:"URL is required"})
    const shortID=shortUrl.generate();
    await URL.create({
        shortId: shortID,
        redirectURL:body.url,
        visitHistory:[]
    })
    return res.render('home',{id:shortID,});
    //return res.status(201).json({msg:"created"})
}

async function handleRedirectURL(req, res){
    const shortId=req.params.shorturl;
    const object=await URL.findOneAndUpdate({
        shortId:shortId
      },
      {$push:{
         visitHistory:{timestamp:Date.now()},
        },
      }
    )
    return res.redirect(object.redirectURL);
}

async function handleGetAnalytics(req,res){
    const shortId=req.params.shorturl;
    const object=await URL.findOne({shortId:shortId});
    return res.json({
        numOfClicks:object.visitHistory.length,
        analytics:object.visitHistory,
    })
}
module.exports={
    handleCreateShortUrl,
    handleRedirectURL,
    handleGetAnalytics,
}