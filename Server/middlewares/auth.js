const asyncErrorResolver = require('./asyncErrorResolver');
const CustomError = require('../utils/customErrors')
const { verifyTokenGenerated } = require('../utils/jwt');

const authorize = asyncErrorResolver(async (req,res,next)=>{
    const token = req.headers['authorization']?.replace("Bearer ","")
    if(!token){
        throw new CustomError("Authorization denied.Token is required", 401);
    }
    const decodedToken = verifyTokenGenerated(token);

    if(!decodedToken || !decodedToken.id){
        throw new CustomError("Invalid Token. Try again", 401);
    }
    req.user = decodedToken;
    next();
});

module.exports = authorize;