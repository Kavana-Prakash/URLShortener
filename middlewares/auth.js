const {getUser}=require("../service/auth")
async function restrictToLoggedInUser(req,res,next){
    const uid=req.cookies.utoken;
    if(!uid)return res.render("login",{error:"Please login"});
    const user = getUser(uid);
    if(!user) return res.render("login",{error:"Please login"});

    req.user=user;
    next();
}
async function handleSimpleAuthNoRestrict(req,res,next){
    const uid=req.cookies.utoken;
   
    const user = getUser(uid);
    
    req.user=user;
    next();
}

module.exports={
    restrictToLoggedInUser,
    handleSimpleAuthNoRestrict,
}