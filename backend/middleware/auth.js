const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

exports.isAuthenticatedUser = catchAsyncErrors(async(req,res,next)=>{
    const {token} = req.cookies;
    // console.log(token);

    if(!token){
        return next(new ErrorHandler("Please login to access resource",401));
    }
    
    const decodeddata = jwt.verify(token,process.env.JWT_SECRET);

    req.user = await User.findById(decodeddata.id);//line 52 from userModel.js

    next();
});

exports.authorizeRoles = (...roles)=>{
    return (req,res,next)=>{
        if(!roles.includes(req.user.role)){
            return next(new ErrorHandler(`Role: ${req.user.role} is not authorized to access this route`,403));
        }
        next();
    }
}