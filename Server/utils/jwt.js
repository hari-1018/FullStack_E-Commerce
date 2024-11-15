const jwt = require('jsonwebtoken');
const tokenGenerated = (user)=>{
    const payload = {
        id: user._id,
        email: user.email,
        role: user.role,
    }
    return jwt.sign(payload, process.env.JWT_SECRET, 
        { expiresIn: process.env.JWT_EXPIRATION_TIME});
}

const verifytokenGenerated = (token)=>{
    return jwt.verify(token, process.env.JWT_SECRET);
};

module.exports = {tokenGenerated, verifytokenGenerated};