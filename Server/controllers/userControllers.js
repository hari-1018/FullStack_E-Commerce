const User = require('../models/userModel');
const asyncErrorResolver = require('../middlewares/asyncErrorResolver');
const CustomError = require('../utils/customErrors');
const bcrypt = require('bcrypt');
const { tokenGenerated } = require('../utils/jwt');
const {userRegister, userLogin} = require('../validation/userValidation');

// User Register
const Register = asyncErrorResolver(async(req,res)=>{
    const {error} = userRegister(req.body);
    if(error){
        throw new CustomError(error.message, 400);
    }
        const {username, email, mobilenumber, password, role} = req.body;

        const existingUser = await User.findOne({email});
        if(existingUser){
            throw new CustomError("User Already Existing, Try Again", 400)
        }
        
        const hashPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username, email, mobilenumber, password: hashPassword, role:role||'user'});
        await newUser.save();

        const Token = tokenGenerated(newUser);
        res.json({status: "success", message: "User registered successfully", Token});
    });


//User Login
const Login = asyncErrorResolver(async(req,res) =>{
    const {error} = userLogin(req.body);
    if(error){
        throw new CustomError(error.message, 400);
    }

        const { email, password } = req.body;
        const user = await User.findOne({email});
        
        if(!user || !(await bcrypt.compare(password, user.password))){
            throw new CustomError("Invalid Email or Password, Try Again", 400);
        }
        
        const Token = tokenGenerated(user);
        res.json({ status: "success", message: "User logged in successfully", Token });
    });

module.exports = {Register, Login};


