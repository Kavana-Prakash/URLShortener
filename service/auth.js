const jwt=require("jsonwebtoken");
const SECRET="URLShortener"

function setUser(user){
    
    return jwt.sign(user.toObject(),SECRET);//Mongoose returns a Mongoose document (also known as a model instance) when you query the
    // database using functions like findOne, but jwt expects only plain object
}
function getUser(token){
    if(!token)return null;
    try{
        return jwt.verify(token,SECRET);
    }
    catch(error){
        return null
    } 
   
}
module.exports={
    setUser,
    getUser,
}