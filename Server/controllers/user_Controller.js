const User = require('../models/user_Model');
const bcrypt = require('bcrypt');
const { tokenGenerated } = require('../utils/jwt');
const {userRegister, userLogin} = require('../validation/user_Validation');

const Register = async(req,res)=>{
    const {error} = userRegister(req.body);
    if(error){
        return res.status(400).json({status: "error", error: error.message});
    }

    try{
        const {username, email, mobilenumber, password, role} = req.body;

        if(!username || !email || !mobilenumber || !password){
            return res.status(400).json({status: "error", message: "All fields are required"});
        }

        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({status: "error", message: "User already exists"});
        }
        
        const hashPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username, email, mobilenumber, password: hashPassword, role:role||'user'});
        await newUser.save();

        const Token = tokenGenerated(newUser._id, newUser.role);
        res.json({status: "success", message: "User registered successfully", Token});
    }
    catch(error){
        console.error(error);
        res.status(500).json({status: "error", error: error.message});
    }
};


const Login = async(req,res) =>{
    const {error} = userLogin(req.body);
    if(error){
        return res.status(400).json({status: "error", error: error.message});
    }

    try{
        const { email, password } = req.body;
        const user = await User.findOne({email});
        
        if(!user){
            return res.status(400).json({status: "error", message: "Invalid username or password"});
        }
        
        const isSame = await bcrypt.compare(password, user.password);
        if(!isSame){
            return res.status(400).json({status: "error", message: "Invalid username or password"});
        }
        
        const Token = tokenGenerated(user._id, user.role);
        res.json({status: "success", message: "User logged in successfully", Token});
    }
    catch(error){
        console.error(error);
        res.status(500).json({status: "error", error: error.message});
    }
};

module.exports = {Register, Login};


