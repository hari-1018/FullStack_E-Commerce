const asyncErrorResolver = require('../middlewares/asyncErrorResolver');
const CustomError = require('../utils/customErrors')
const { verifyTokenGenerated } = require('../utils/jwt');

const authorize = asyncErrorResolver(async (req,res)=>{
    const token = req.headers['authorization']?.replace("Bearer ","")
    if(!token){
        throw new CustomError("Authorization denied.Token is required", 401);
    }
    const useToken = verifyTokenGenerated(token);
    req.user = useToken;
    next();
})

module.exports = authorize;