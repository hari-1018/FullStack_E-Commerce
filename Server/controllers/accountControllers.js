const Account = require('../models/accountModel');
const User = require('../models/userModel')
const asyncErrorResolver = require('../middlewares/asyncErrorResolver');
const CustomError = require('../utils/customErrors');



//View Profile
const getAccount = asyncErrorResolver(async (req, res) => {
    const userID = req.params.id;
    let account = await Account.findOne({userID}).populate("userID", "username email mobilenumber");
  
    if (!account) {
      throw new CustomError("Profile not found", 404);  
    }

    res.status(200).json({
        status: "Success",
        message: "Account Details Fetched Successfully",
        account
    });
});


// Edit Profile
const editAccount = asyncErrorResolver(async (req, res) => {
    const userID = req.params.id;

    const updatedData = req.body;

    const account = await Account.findOneAndUpdate({ userID }, updatedData, {
    new: true,
    upsert: true,

  }).populate("userID", "username email mobilenumber");
        return res.status(201).json({
            status: "Success",
            message: "Account created successfully",
            account
        });
    })



module.exports = { getAccount, editAccount }