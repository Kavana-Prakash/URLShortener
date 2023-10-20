const {getUser}=require("../service/auth")
async function restrictToLoggedInUser(req,res,next){
    //const uid=req.cookies?.utoken;
    const uid=req.headers["authorization"]
    if(!uid)return res.render("login",{error:"Please login"});
    const token=uid.split('Bearer ')[1]
    const user = getUser(uid);
    if(!user) return res.render("login",{error:"Please login"});

    req.user=user;
    next();
}
async function handleSimpleAuthNoRestrict(req,res,next){
    const uid=req.headers["authorization"]
   
    const token=uid.split('Bearer ')[1]
    //console.log(uid.split('Bearer ')[1]);
    const user = getUser(token);
    //console.log(user);
    req.user=user;
    next();
}

module.exports={
    restrictToLoggedInUser,
    handleSimpleAuthNoRestrict,
}