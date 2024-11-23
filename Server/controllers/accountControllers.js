const Account = require('../models/accountModel');
const User = require('../models/userModel')
const asyncErrorResolver = require('../middlewares/asyncErrorResolver');
const CustomError = require('../utils/customErrors');



//View Profile
const getAccount = asyncErrorResolver(async (req, res) => {
    const userID = req.params.id;
    const account = await Account.findOne({userID});
  
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

  });
        return res.status(201).json({
            status: "Success",
            message: "Account created successfully",
            account
        });
    });







//Edit Profile
// const editAccount = asyncErrorResolver(async (req, res)=>{
//     const userID = req.params.id;

//     if(!mongoose.Types.ObjectId.isValid(userID)){
//         throw new CustomError("Invalid User ID", 400);
//     }

//     const {username, profileImage, mobile, deliveryAddress} = req.body;


//     const account = await Account.findOne({userID: mongoose.Types.ObjectId(userID)});
//     if(!account){
//         throw new CustomError(`No Account Found with this ${userID}`, 404);
//     }

//     account.username = username || account.username;
//     account.profileImage = profileImage || account.profileImage;
//     account.mobile = mobile || account.mobile;
//     account.deliveryAddress = {...account.deliveryAddress, ...deliveryAddress};

//     await account.save();
//     res.status(200).json({status:"Success", message:"Account Updated Successfully", account})
// });



module.exports = { getAccount, editAccount }