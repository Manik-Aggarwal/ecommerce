const ErrorHandler = require('../utils/errorhandler');

module.exports = (err, req, res, next)=>{
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Server Error";

    //wrong mongoDB id error
    if(err.name === "CastError"){
        const message = `Resource not found. Invalid: ${err.path}`;
        err = new ErrorHandler(message, 400);
    }

    //duplicate key error{email}
    if(err.code === 11000){
        const message = `Duplicate field value: ${Object.keys(err.keyValue)}`;
        err = new ErrorHandler(message, 400);
    }

    //wrong jwt token
    if(err.name === "JsonWebTokenError"){
        const message = `Invalid JWT token, Try again`;
        err = new ErrorHandler(message, 400);
    }

    //jwt expire error
    if(err.name === "TokenExpiredError"){
        const message = `Jsonwebtoken expired, Try again`;
        err = new ErrorHandler(message, 400);
    }

    res.status(err.statusCode).json({
        success:false,
        message:err.message,
        error:err.stack
    })
}